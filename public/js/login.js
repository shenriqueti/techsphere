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
