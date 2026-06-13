require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
const bcrypt = require('bcrypt');

// ──────────────────────────────────────────────
// Firebase Admin Setup
// ──────────────────────────────────────────────
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const app = express();
const db = admin.firestore();

const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

// ──────────────────────────────────────────────
// Middleware
// ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ──────────────────────────────────────────────
// Middleware de Autenticação (Rotas Admin)
// ──────────────────────────────────────────────
function autenticarMaster(req, res, next) {
  const userId = req.headers['x-user-id'];
  const perfil = req.headers['x-user-perfil'];

  if (!userId || perfil !== 'master') {
    return res.status(403).json({ message: 'Acesso restrito ao perfil Master.' });
  }
  req.userId = userId;
  next();
}

// ──────────────────────────────────────────────
// Rota: Página inicial
// ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ──────────────────────────────────────────────
// ROTA POST /api/cadastro — Registrar usuário comum
// ──────────────────────────────────────────────
app.post('/api/cadastro', async (req, res) => {
  try {
    const {
      nome, nome_mae, email, cpf, data_nascimento,
      celular, genero, cep, numero, rua, complemento,
      bairro, cidade, estado, login, senha, confirmar_senha
    } = req.body;

    // Campos obrigatórios
    if (!nome || !nome_mae || !email || !cpf || !data_nascimento ||
        !celular || !genero || !cep || !numero || !rua ||
        !bairro || !cidade || !estado || !login || !senha || !confirmar_senha) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
    }

    // Validação de nome (15–80 chars)
    const nomeClean = nome.trim();
    if (nomeClean.length < 15 || nomeClean.length > 80) {
      return res.status(400).json({ message: 'Nome deve ter entre 15 e 80 caracteres.' });
    }

    // Senha mínimo 8 chars
    if (senha.length < 8) {
      return res.status(400).json({ message: 'A senha deve ter no mínimo 8 caracteres.' });
    }

    if (senha !== confirmar_senha) {
      return res.status(400).json({ message: 'As senhas não coincidem.' });
    }

    // Verificar login duplicado
    const loginExistente = await db.collection('cadastro').where('login', '==', login).get();
    if (!loginExistente.empty) {
      return res.status(409).json({ message: 'Este login já está em uso.' });
    }

    // Hash da senha com bcrypt
    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

    await db.collection('cadastro').add({
      nome: nomeClean,
      nome_mae,
      email,
      cpf,
      data_nascimento,
      celular,
      genero,
      cep,
      numero,
      rua,
      complemento: complemento || '',
      bairro,
      cidade,
      estado,
      login,
      senha: senhaHash,
      perfil: 'comum',
      criadoEm: new Date(),
      bloqueado: false,
      tentativas2FA: 0
    });

    res.status(201).json({ message: 'Cadastro realizado com sucesso!' });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ message: 'Erro interno ao realizar cadastro.' });
  }
});

// ──────────────────────────────────────────────
// ROTA POST /api/login — Autenticar usuário
// ──────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({ sucesso: false, erro: 'Informe usuário e senha.' });
    }

    // Buscar por login
    const snapshot = await db.collection('cadastro').where('login', '==', usuario).get();

    if (snapshot.empty) {
      return res.status(401).json({ sucesso: false, erro: 'Usuário ou senha inválidos.' });
    }

    const docSnap = snapshot.docs[0];
    const userData = docSnap.data();

    // Verificar bloqueio
    if (userData.bloqueado) {
      return res.status(403).json({ sucesso: false, erro: 'Conta bloqueada por excesso de tentativas incorretas. Contate o suporte.' });
    }

    // Verificar senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, userData.senha);
    if (!senhaValida) {
      return res.status(401).json({ sucesso: false, erro: 'Usuário ou senha inválidos.' });
    }

    // Login OK — preparar desafio 2FA
    const desafios = [];
    if (userData.cep) desafios.push({ campo: 'cep', pergunta: 'Qual o CEP cadastrado na sua conta?' });
    if (userData.nome_mae) desafios.push({ campo: 'nome_mae', pergunta: 'Qual o nome da sua mãe?' });
    if (userData.data_nascimento) desafios.push({ campo: 'data_nascimento', pergunta: 'Qual a sua data de nascimento? (AAAA-MM-DD)' });
    if (desafios.length === 0) desafios.push({ campo: 'cep', pergunta: 'Qual o CEP cadastrado na sua conta?' });

    const desafio = desafios[Math.floor(Math.random() * desafios.length)];

    // Salvar o desafio ativo e resetar tentativas 2FA
    await docSnap.ref.update({
      desafio2FAAtivo: desafio.campo,
      tentativas2FA: 0,
      sessaoTemp: Date.now()
    });

    res.status(200).json({
      sucesso: true,
      userId: docSnap.id,
      perfil: userData.perfil || 'comum',
      desafio: desafio.pergunta,
      campoDsafio: desafio.campo
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ sucesso: false, erro: 'Erro interno no servidor.' });
  }
});

// ──────────────────────────────────────────────
// ROTA POST /api/2fa — Validar segundo fator
// ──────────────────────────────────────────────
app.post('/api/2fa', async (req, res) => {
  try {
    const { userId, resposta } = req.body;

    if (!userId || !resposta) {
      return res.status(400).json({ sucesso: false, erro: 'Dados incompletos.' });
    }

    const docRef = db.collection('cadastro').doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ sucesso: false, erro: 'Usuário não encontrado.' });
    }

    const userData = doc.data();

    // Verificar se há sessão temporária válida (máx 10 min)
    if (!userData.sessaoTemp || (Date.now() - userData.sessaoTemp) > 600000) {
      return res.status(401).json({ sucesso: false, erro: 'Sessão expirada. Faça login novamente.' });
    }

    // Verificar bloqueio
    if (userData.bloqueado) {
      return res.status(403).json({ sucesso: false, erro: 'Conta bloqueada. Contate o suporte.' });
    }

    const campoDsafio = userData.desafio2FAAtivo;
    const valorEsperado = (userData[campoDsafio] || '').toString().trim().toLowerCase();
    const respostaUsuario = resposta.toString().trim().toLowerCase();

    const acertou = valorEsperado === respostaUsuario;

    // Registrar log de autenticação
    await db.collection('logs_autenticacao').add({
      userId,
      login: userData.login,
      data_hora: new Date(),
      desafio_2fa: campoDsafio,
      sucesso: acertou,
      perfil: userData.perfil || 'comum'
    });

    if (!acertou) {
      const novasTentativas = (userData.tentativas2FA || 0) + 1;

      if (novasTentativas >= 3) {
        await docRef.update({ bloqueado: true, tentativas2FA: novasTentativas });
        return res.status(403).json({
          sucesso: false,
          bloqueado: true,
          erro: 'Número máximo de tentativas atingido. Sua conta foi bloqueada.'
        });
      }

      await docRef.update({ tentativas2FA: novasTentativas });
      return res.status(401).json({
        sucesso: false,
        tentativasRestantes: 3 - novasTentativas,
        erro: `Resposta incorreta. Tentativas restantes: ${3 - novasTentativas}.`
      });
    }

    // 2FA OK — limpar dados temporários e criar sessão real
    await docRef.update({
      tentativas2FA: 0,
      desafio2FAAtivo: null,
      sessaoTemp: null,
      ultimoLogin: new Date()
    });

    res.status(200).json({
      sucesso: true,
      userId,
      perfil: userData.perfil || 'comum',
      nome: userData.nome
    });

  } catch (error) {
    console.error('Erro no 2FA:', error);
    res.status(500).json({ sucesso: false, erro: 'Erro interno no servidor.' });
  }
});

// ──────────────────────────────────────────────
// ROTA GET /api/meus-dados/:id — Buscar dados do usuário
// ──────────────────────────────────────────────
app.get('/api/meus-dados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('cadastro').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const data = doc.data();
    delete data.senha;
    delete data.desafio2FAAtivo;
    delete data.sessaoTemp;

    res.status(200).json({ id: doc.id, ...data });

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  }
});

// ──────────────────────────────────────────────
// ROTA PUT /api/meus-dados/:id — Atualizar dados do usuário
// ──────────────────────────────────────────────
app.put('/api/meus-dados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    delete dados.senha;
    delete dados.perfil;
    delete dados.criadoEm;
    delete dados.confirmar_senha;
    delete dados.bloqueado;

    dados.atualizadoEm = new Date();

    await db.collection('cadastro').doc(id).set(dados, { merge: true });
    res.status(200).json({ message: 'Dados atualizados com sucesso!' });

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar dados.' });
  }
});

// ──────────────────────────────────────────────
// ROTA PUT /api/alterar-senha/:id — Alteração de senha (perfil Comum)
// ──────────────────────────────────────────────
app.put('/api/alterar-senha/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { senhaAtual, novaSenha, confirmarNovaSenha } = req.body;

    if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
      return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    if (novaSenha.length < 8) {
      return res.status(400).json({ message: 'A nova senha deve ter no mínimo 8 caracteres.' });
    }

    if (novaSenha !== confirmarNovaSenha) {
      return res.status(400).json({ message: 'As novas senhas não coincidem.' });
    }

    const doc = await db.collection('cadastro').doc(id).get();
    if (!doc.exists) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const userData = doc.data();

    // Verificar senha atual com bcrypt
    const senhaValida = await bcrypt.compare(senhaAtual, userData.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha atual incorreta.' });
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, SALT_ROUNDS);
    await doc.ref.update({ senha: novaSenhaHash, atualizadoEm: new Date() });
    res.status(200).json({ message: 'Senha alterada com sucesso!' });

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ message: 'Erro ao alterar senha.' });
  }
});

// ──────────────────────────────────────────────
// ROTA POST /api/cadastro-empresa — Registrar empresa
// ──────────────────────────────────────────────
app.post('/api/cadastro-empresa', async (req, res) => {
  try {
    const {
      empresa, objetivo, cnpj, hora, celular, email,
      cep, numero, rua, complemento, bairro, cidade, estado,
      login, senha, confirmar_senha
    } = req.body;

    if (!empresa || !cnpj || !celular || !email || !cep || !numero || !rua || !bairro || !cidade || !estado) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
    }

    let senhaHash = null;
    if (login && senha) {
      if (senha.length < 8) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 8 caracteres.' });
      }
      if (senha !== confirmar_senha) {
        return res.status(400).json({ message: 'As senhas não coincidem.' });
      }
      senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
    }

    await db.collection('empresas').add({
      empresa: empresa.trim(),
      objetivo: objetivo ? objetivo.trim() : '',
      cnpj: cnpj.trim(),
      hora: hora ? hora.trim() : '',
      celular: celular.trim(),
      email: email.trim(),
      cep: cep.trim(),
      numero: numero.trim(),
      rua: rua.trim(),
      complemento: complemento ? complemento.trim() : '',
      bairro: bairro.trim(),
      cidade: cidade.trim(),
      estado: estado.trim(),
      login: login ? login.trim() : '',
      senha: senhaHash,
      criadoEm: new Date()
    });

    res.status(201).json({ message: 'Empresa cadastrada com sucesso!' });

  } catch (error) {
    console.error('Erro no cadastro de empresa:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar empresa.' });
  }
});

// ──────────────────────────────────────────────
// ROTA POST /api/cadastro-evento — Registrar evento
// ──────────────────────────────────────────────
app.post('/api/cadastro-evento', async (req, res) => {
  try {
    const {
      evento, linkIngresso, data, hora, descricao,
      cep, numero, rua, complemento, bairro, cidade, estado
    } = req.body;

    if (!evento || !data || !descricao || !cep || !numero || !rua || !bairro || !cidade || !estado) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
    }

    await db.collection('eventos').add({
      evento: evento.trim(),
      linkIngresso: linkIngresso ? linkIngresso.trim() : '',
      data: data.trim(),
      hora: hora ? hora.trim() : '',
      descricao: descricao.trim(),
      cep: cep.trim(),
      numero: numero.trim(),
      rua: rua.trim(),
      complemento: complemento ? complemento.trim() : '',
      bairro: bairro.trim(),
      cidade: cidade.trim(),
      estado: estado.trim(),
      criadoEm: new Date()
    });

    res.status(201).json({ message: 'Evento cadastrado com sucesso!' });

  } catch (error) {
    console.error('Erro no cadastro de evento:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar evento.' });
  }
});

// ──────────────────────────────────────────────
// ROTA GET /api/usuarios — Listar usuários (Master)
// ──────────────────────────────────────────────
app.get('/api/usuarios', autenticarMaster, async (req, res) => {
  try {
    const { busca } = req.query;

    let query = db.collection('cadastro').where('perfil', '==', 'comum');
    const snapshot = await query.get();

    let usuarios = snapshot.docs.map(doc => {
      const data = doc.data();
      delete data.senha;
      delete data.desafio2FAAtivo;
      delete data.sessaoTemp;
      return { id: doc.id, ...data };
    });

    if (busca) {
      const buscaLower = busca.toLowerCase();
      usuarios = usuarios.filter(u =>
        u.nome && u.nome.toLowerCase().includes(buscaLower)
      );
    }

    res.status(200).json(usuarios);

  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
});

// ──────────────────────────────────────────────
// ROTA DELETE /api/usuarios/:id — Excluir usuário (Master)
// ──────────────────────────────────────────────
app.delete('/api/usuarios/:id', autenticarMaster, async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('cadastro').doc(id).get();

    if (!doc.exists) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const userData = doc.data();
    if (userData.perfil === 'master') {
      return res.status(403).json({ message: 'Não é permitido excluir um usuário Master.' });
    }

    await doc.ref.delete();
    res.status(200).json({ message: 'Usuário excluído com sucesso.' });

  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro ao excluir usuário.' });
  }
});

// ──────────────────────────────────────────────
// ROTA GET /api/logs — Logs de autenticação (Master)
// ──────────────────────────────────────────────
app.get('/api/logs', autenticarMaster, async (req, res) => {
  try {
    const snapshot = await db.collection('logs_autenticacao')
      .orderBy('data_hora', 'desc')
      .limit(200)
      .get();

    const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(logs);

  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    res.status(500).json({ message: 'Erro ao buscar logs.' });
  }
});

// ──────────────────────────────────────────────
// Iniciar servidor
// ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor TechSphere rodando em http://localhost:${PORT}`);
});