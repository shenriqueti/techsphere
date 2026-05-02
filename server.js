const express = require('express'); // Esse framework serve para criar servidores e APIs no Node.js de forma fácil.
const cors = require('cors'); // Permite que um site acesse outro site
const admin = require('firebase-admin'); //É a biblioteca oficial do Firebase para Node.js (Com ele a gente consegue:Salvar dados no Firestore,Autenticar usuários e Gerenciar banco)

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

 