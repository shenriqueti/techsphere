document.getElementById('loginBtn').addEventListener('click', function() {
    const erroDiv = document.getElementById('erro');
    erroDiv.innerHTML = '';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Simulação de login
    if (username === 'aluno' && password === '1234') {
        // Sucesso: salvar usuário e redirecionar para area-usuario.html
        localStorage.setItem('loggedUser', username);
        window.location.href = 'area-usuario.html';
    } else {
        // Falha: mostrar mensagem de erro
        erroDiv.innerHTML = 'Usuário ou senha inválidos.';
        erroDiv.style.display = 'block';
    }
});
