/**
 * Script para criar o usuário Master diretamente no Firestore.
 * Executar UMA VEZ via: node criar_usuario_master.js
 *
 * O usuário Master é criado diretamente no banco (não via formulário),
 * conforme exigido pelos requisitos do projeto.
 */

const admin = require('firebase-admin');
const crypto = require('crypto');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

function hashSenha(senha) {
  return crypto.createHash('sha256').update(senha + 'techsphere_salt_2026').digest('hex');
}

async function criarMaster() {
  const login = 'admin_master';
  const senha = 'Master@2026';

  // Verificar se já existe
  const existente = await db.collection('cadastro').where('login', '==', login).get();
  if (!existente.empty) {
    console.log('⚠️  Usuário master já existe. Nenhuma alteração feita.');
    process.exit(0);
  }

  await db.collection('cadastro').add({
    nome: 'Administrador Master TechSphere',
    nome_mae: 'Sistema',
    email: 'master@techsphere.com.br',
    cpf: '00000000000',
    data_nascimento: '1990-01-01',
    celular: '(+55)21-999999999',
    genero: 'nao_informado',
    cep: '00000000',
    numero: '0',
    rua: 'Sistema',
    complemento: '',
    bairro: 'Sistema',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    login,
    senha: hashSenha(senha),
    perfil: 'master',
    bloqueado: false,
    tentativas2FA: 0,
    criadoEm: new Date()
  });

  console.log('✅ Usuário master criado com sucesso!');
  console.log(`   Login: ${login}`);
  console.log(`   Senha: ${senha}`);
  console.log('   ⚠️  Altere a senha após o primeiro acesso!');
  process.exit(0);
}

criarMaster().catch(err => {
  console.error('Erro ao criar master:', err);
  process.exit(1);
});
