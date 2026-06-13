<<<<<<< HEAD
document
  .getElementById("loginBtn")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const erroDiv = document.getElementById("erro");
    erroDiv.innerHTML = "";
    erroDiv.style.display = "none";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      erroDiv.innerHTML = "Preencha usuário e senha.";
      erroDiv.style.display = "block";
      return;
    }
    try {
      const resposta = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: username, senha: password }),
      });

      const dados = await resposta.json();

      if (dados.sucesso) {
        localStorage.setItem("loggedUser", username);
        window.location.href = "area-usuario.html";
      } else {
        erroDiv.innerHTML =
          dados.erro || dados.mensagem || "usuário ou senha inválidos";
        erroDiv.style.display = "block";
      }
    } catch (error) {
      console.error("deu ruim na api:", error);
      erroDiv.innerHTML = "erro ao conectar com o servidor.";
      erroDiv.style.display = "block";
    }
  });
=======
document.getElementById('loginBtn').addEventListener('click', async function (event) {
  event.preventDefault();

  const erroDiv = document.getElementById('erro');
  erroDiv.innerHTML = '';
  erroDiv.style.display = 'none';

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    erroDiv.innerHTML = 'Preencha usuário e senha.';
    erroDiv.style.display = 'block';
    return;
  }

  try {
    const resposta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: username, senha: password })
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      // Guardar dados temporários para o 2FA
      sessionStorage.setItem('userId', dados.userId);
      sessionStorage.setItem('perfil', dados.perfil);
      sessionStorage.setItem('desafio2FA', dados.desafio);
      sessionStorage.setItem('campoDsafio', dados.campoDsafio);

      // Redirecionar para a página de 2FA
      window.location.href = '2fa.html';
    } else {
      erroDiv.innerHTML = dados.erro || 'Usuário ou senha inválidos.';
      erroDiv.style.display = 'block';
    }
  } catch (error) {
    console.error('Erro ao conectar:', error);
    erroDiv.innerHTML = 'Erro ao conectar com o servidor.';
    erroDiv.style.display = 'block';
  }
});
>>>>>>> feat/meus-dados
