const express = require('express'); // Esse framework serve para criar servidores e APIs no Node.js de forma fácil.
const cors = require('cors'); // Permite que um site acesse outro site
const admin = require('firebase-admin'); //É a biblioteca oficial do Firebase para Node.js (Com ele a gente consegue:Salvar dados no Firestore,Autenticar usuários e Gerenciar banco)
const path = require('path');


//Configuração do Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");
const { message } = require('statuses');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

// Inicializa o Firestore (Banco de Dados NoSQL)
const app = express(); // Cria a aplicação/servidor usando o Express
const db = admin.firestore(); // Cria a conexão com o banco Firestore (onde você vai salvar os dados)

// Middleware
app.use(cors()); // Permite que o Frontend acesse a API
app.use(express.json()); // Permite que o servidor entenda dados em formato JSON enviados nas requisições (ex: fetch do frontend)
// Libera os arquivos estáticos (HTML, CSS, JS, Imagens) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal: quando acessar localhost:3000, abre o index.html direto
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ROTA GET: Busca os dados de um usuário específico na coleção 'cadastro'
app.get('/api/meus-dados/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Busca o documento pelo ID na coleção 'cadastro'
        const docRef = db.collection('cadastro').doc(userId);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        
        // Retorna os dados do documento
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
        
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar dados do usuário' });
    }
});

// ROTA PUT: Atualiza os dados de um usuário específico (ou cria se não existir)
app.put('/api/meus-dados/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const dadosAtualizados = req.body;
        
        // Remove campos que não devem ser atualizados
        delete dadosAtualizados.criadoEm;
        delete dadosAtualizados.confirmar_senha;
        
        // Adiciona data da última atualização
        dadosAtualizados.atualizadoEm = new Date();
        
        // Usa set com merge para criar ou atualizar o documento
        await db.collection('cadastro').doc(userId).set(dadosAtualizados, { merge: true });
        
        res.status(200).json({ message: 'Dados atualizados com sucesso!' });
        
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar dados do usuário' });
    }
});

 // ROTA POST: Recebe os dados do formulário e salva no Firebase
app.post('/api/cadastro', async (req,res) => {
    try{
      // Extrai os dados enviados pelo Frontend
      const {nome,nome_mae,email,cpf,data_nascimento,celular,genero,cep,numero,rua,complemento,bairro,cidade,estado,login,senha,confirmar_senha} = req.body;

      if(!nome || !nome_mae || !email || !cpf || !data_nascimento || !celular || !genero || !cep || !numero || !rua || !complemento || !bairro || !cidade || !estado || !login || !senha || !confirmar_senha ) {
        // Verifica se algum campo está vazio
  
        return res.status(400).json({message: 'Preencha todos os campos'});  
        // Retorna erro 400 (requisição inválida) com mensagem em JSON
        // return interrompe a execução aqui

      }  
    

      // Salva no Firestore
      await db.collection('cadastro').add({
        // Acessa a coleção "usuarios" no banco
        // add() cria um novo documento com ID automático
        nome,
        nome_mae,
        email,
        cpf,
        data_nascimento,
        celular,
        genero,
        cep,
        numero,
        rua,
        complemento,
        bairro,
        cidade,
        estado,
        login,
        senha,
        confirmar_senha,
        criadoEm: new Date() // Salva a data atual de criação

      });
      res.status(201).json({ message: 'Cadastro realizado com sucesso!'});  // Retorna status 201 (criado com sucesso) + mensagem em JSON
    
    
    
    
    }catch(error){
      console.error(error);
      // Mostra o erro no terminal (backend)

      res.status(500).json({ message: 'Erro ao salvar no Firebase' });
        // Retorna erro 500 (erro interno do servidor)
    }



})

// INICIA O SERVIDOR
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

 