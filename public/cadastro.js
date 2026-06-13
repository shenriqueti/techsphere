document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        nome_mae: document.getElementById('nome_mae').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        celular: document.getElementById('celular').value,
        genero: document.querySelector('input[name="genero"]:checked')?.value,
        cep: document.getElementById('cep').value,
        numero: document.getElementById('numero').value,
        rua: document.getElementById('rua').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        login: document.getElementById('login').value,
        senha: document.getElementById('senha').value,
        confirmar_senha: document.getElementById('confirmar_senha').value
    };

    try {
        const resposta = await fetch('http://localhost:3000/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert(resultado.message);
            document.getElementById('form').reset();
        } else {
            alert(resultado.message);
        }

    } catch (erro) {
        alert('Erro ao conectar com o servidor');
    }
});




