// Verificar se o usuário está logado
const loggedUser = localStorage.getItem('loggedUser');
if (!loggedUser) {
    window.location.href = 'login.html';
}

// Exibir dados do usuário
const userDataDiv = document.getElementById('user-data');
userDataDiv.innerHTML = `<p>Olá, ${loggedUser}!</p>`;

// Atualizar mensagem de boas-vindas no header
const welcomeMessage = document.getElementById('welcome-message');
welcomeMessage.textContent = `Bem-vindo, ${loggedUser}!`;

// Exibir ingressos (simulação)
const ticketsList = document.getElementById('tickets-list');
ticketsList.innerHTML = `Você ainda não possui ingressos. <a href="cadastro.html">Comprar Ingressos</a>`;

// Função de logout
function logout() {
    localStorage.removeItem('loggedUser');
    window.location.href = 'login.html';
}

// Adicionar evento ao botão de logout
document.getElementById('logoutBtn').addEventListener('click', logout);
