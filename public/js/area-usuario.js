// Verificar se o usuário está logado (opcional para testes)
let loggedUser = localStorage.getItem('loggedUser');
if (!loggedUser) {
    // Para fins de teste, permite acesso mesmo sem login
    loggedUser = 'Usuario Teste';
    console.log('Modo teste: usuário não logado, usando nome padrão.');
}

// ID do documento no Firestore (temporário para testes)
const TEST_USER_ID = 'usuario_teste_123';

// Elementos do DOM
const formMeusDados = document.getElementById('form-meus-dados');
const btnSalvar = document.getElementById('btn-salvar');
const tituloPrincipal = document.getElementById('titulo-principal');

// Campos do formulário
const camposFormulario = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    cpf: document.getElementById('cpf'),
    celular: document.getElementById('celular')
};

// Exibir ingressos (simulação)
const ticketsList = document.getElementById('tickets-list');
ticketsList.innerHTML = `Você ainda não possui ingressos. <a href="cadastro.html">Comprar Ingressos</a>`;

// Função para atualizar o título principal com o nome do usuário
function atualizarTituloPrincipal(nomeUsuario) {
    if (tituloPrincipal) {
        tituloPrincipal.textContent = `Bem-vindo, ${nomeUsuario}!`;
    }
}

// Função para buscar dados do usuário no Firestore
async function carregarDadosUsuario() {
    try {
        btnSalvar.disabled = true;
        btnSalvar.value = 'Carregando...';
        
        const response = await fetch(`/api/meus-dados/${TEST_USER_ID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 404) {
            alert('Usuário não encontrado. Certifique-se de que o documento existe no Firestore.');
            return;
        }

        if (!response.ok) {
            throw new Error('Erro ao carregar dados');
        }

        const dados = await response.json();
        
        // Preencher os campos do formulário com os dados do banco
        if (dados.nome) {
            camposFormulario.nome.value = dados.nome;
            // Atualizar título principal com o nome do usuário
            atualizarTituloPrincipal(dados.nome);
        }
        if (dados.email) camposFormulario.email.value = dados.email;
        if (dados.cpf) camposFormulario.cpf.value = dados.cpf;
        if (dados.celular) camposFormulario.celular.value = dados.celular;

        console.log('Dados carregados com sucesso:', dados);
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar dados do usuário. Verifique se o servidor está rodando.');
    } finally {
        btnSalvar.disabled = false;
        btnSalvar.value = 'Salvar Alterações';
    }
}

// Função para atualizar dados do usuário no Firestore
async function atualizarDadosUsuario(event) {
    event.preventDefault();
    
    // Coletar dados do formulário
    const dadosAtualizados = {
        nome: camposFormulario.nome.value.trim(),
        email: camposFormulario.email.value.trim(),
        cpf: camposFormulario.cpf.value.trim(),
        celular: camposFormulario.celular.value.trim()
    };

    // Validação básica
    if (!dadosAtualizados.nome || !dadosAtualizados.email || !dadosAtualizados.cpf || !dadosAtualizados.celular) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        btnSalvar.disabled = true;
        btnSalvar.value = 'Salvando...';

        const response = await fetch(`/api/meus-dados/${TEST_USER_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)
        });

        const resultado = await response.json();

        if (response.ok) {
            alert('Dados atualizados com sucesso!');
            console.log('Dados atualizados:', resultado);
            // Atualizar título principal com o novo nome se foi alterado
            if (dadosAtualizados.nome) {
                atualizarTituloPrincipal(dadosAtualizados.nome);
            }
        } else {
            throw new Error(resultado.message || 'Erro ao atualizar dados');
        }

    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        alert('Erro ao atualizar dados: ' + error.message);
    } finally {
        btnSalvar.disabled = false;
        btnSalvar.value = 'Salvar Alterações';
    }
}

// Função de logout
function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'login.html';
}

// Adicionar evento ao botão de logout
document.getElementById('logoutBtn').addEventListener('click', logout);

// Adicionar evento de submit no formulário
if (formMeusDados) {
    formMeusDados.addEventListener('submit', atualizarDadosUsuario);
}

// Carregar dados ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarDadosUsuario);