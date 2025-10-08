document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const erroDiv = document.getElementById('erro');
    erroDiv.innerHTML = '';

    const nome = document.getElementById('nome').value.trim();
    const nomeMae = document.getElementById('nome_mae').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const dataNascimento = document.getElementById('data_nascimento').value;
    const celular = document.getElementById('celular').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const complemento = document.getElementById('complemento').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar_senha').value;
    const genero = document.querySelector('input[name="genero"]:checked');

    let erros = [];

    // Validações básicas
    if (!nome) erros.push('Nome completo é obrigatório.');
    if (!nomeMae) erros.push('Nome da mãe é obrigatório.');
    if (!email || !/\S+@\S+\.\S+/.test(email)) erros.push('Email válido é obrigatório.');
    if (!cpf || !validarCPF(cpf)) erros.push('CPF válido é obrigatório.');
    if (!dataNascimento) erros.push('Data de nascimento é obrigatória.');
    if (!celular) erros.push('Celular é obrigatório.');
    if (!telefone) erros.push('Telefone fixo é obrigatório.');
    if (!genero) erros.push('Gênero é obrigatório.');
    if (!cep) erros.push('CEP é obrigatório.');
    if (!numero) erros.push('Número é obrigatório.');
    if (!rua) erros.push('Rua é obrigatória.');
    if (!bairro) erros.push('Bairro é obrigatório.');
    if (!cidade) erros.push('Cidade é obrigatória.');
    if (!estado) erros.push('Estado é obrigatório.');
    if (!login) erros.push('Login é obrigatório.');
    if (!senha || senha.length < 6) erros.push('Senha deve ter pelo menos 6 caracteres.');
    if (senha !== confirmarSenha) erros.push('Confirmação de senha não coincide.');

    if (erros.length > 0) {
        erroDiv.innerHTML = erros.join('<br>');
        erroDiv.style.display = 'block';
    } else {
        // Se tudo ok, pode enviar ou simular
        alert('Formulário enviado com sucesso!');
        // this.submit(); // descomente para enviar realmente
    }
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}
