// Máscaras não aplicadas devido à ausência da biblioteca Inputmask

// Funções de validação
function showError(id, message) {
    const errorSpan = document.getElementById(id);
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
}

function hideError(id) {
    const errorSpan = document.getElementById(id);
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
}

function validateNome() {
    const nome = document.getElementById('nome').value.trim();
    if (nome.length < 2) {
        showError('nome-error', 'Nome deve ter pelo menos 2 caracteres.');
        return false;
    } else {
        hideError('nome-error');
        return true;
    }
}

function validateNomeMae() {
    const nomeMae = document.getElementById('nome_mae').value.trim();
    if (nomeMae.length < 2) {
        showError('nome_mae-error', 'Nome da mãe deve ter pelo menos 2 caracteres.');
        return false;
    } else {
        hideError('nome_mae-error');
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showError('email-error', 'Email válido é obrigatório.');
        return false;
    } else {
        hideError('email-error');
        return true;
    }
}

function validateCPF() {
    const cpf = document.getElementById('cpf').value.trim();
    if (!cpf || !validarCPF(cpf)) {
        showError('cpf-error', 'CPF válido é obrigatório.');
        return false;
    } else {
        hideError('cpf-error');
        return true;
    }
}

function validateDataNascimento() {
    const dataNascimento = document.getElementById('data_nascimento').value;
    if (!dataNascimento) {
        showError('data_nascimento-error', 'Data de nascimento é obrigatória.');
        return false;
    } else {
        hideError('data_nascimento-error');
        return true;
    }
}

function validateCelular() {
    const celular = document.getElementById('celular').value.trim();
    if (!celular) {
        showError('celular-error', 'Celular é obrigatório.');
        return false;
    } else {
        hideError('celular-error');
        return true;
    }
}



function validateGenero() {
    const genero = document.querySelector('input[name="genero"]:checked');
    if (!genero) {
        showError('genero-error', 'Gênero é obrigatório.');
        return false;
    } else {
        hideError('genero-error');
        return true;
    }
}

function validateCep() {
    const cep = document.getElementById('cep').value.trim();
    if (!cep) {
        showError('cep-error', 'CEP é obrigatório.');
        return false;
    } else {
        hideError('cep-error');
        return true;
    }
}

function validateNumero() {
    const numero = document.getElementById('numero').value.trim();
    if (!numero) {
        showError('numero-error', 'Número é obrigatório.');
        return false;
    } else {
        hideError('numero-error');
        return true;
    }
}

function validateRua() {
    const rua = document.getElementById('rua').value.trim();
    if (!rua) {
        showError('rua-error', 'Rua é obrigatória.');
        return false;
    } else {
        hideError('rua-error');
        return true;
    }
}

function validateComplemento() {
    const complemento = document.getElementById('complemento').value.trim();
    // Opcional, então sempre válido
    hideError('complemento-error');
    return true;
}

function validateBairro() {
    const bairro = document.getElementById('bairro').value.trim();
    if (!bairro) {
        showError('bairro-error', 'Bairro é obrigatório.');
        return false;
    } else {
        hideError('bairro-error');
        return true;
    }
}

function validateCidade() {
    const cidade = document.getElementById('cidade').value.trim();
    if (!cidade) {
        showError('cidade-error', 'Cidade é obrigatória.');
        return false;
    } else {
        hideError('cidade-error');
        return true;
    }
}

function validateEstado() {
    const estado = document.getElementById('estado').value.trim();
    if (!estado) {
        showError('estado-error', 'Estado é obrigatório.');
        return false;
    } else {
        hideError('estado-error');
        return true;
    }
}

function validateLogin() {
    const login = document.getElementById('login').value.trim();
    if (login.length < 4) {
        showError('login-error', 'Login deve ter pelo menos 4 caracteres.');
        return false;
    } else {
        hideError('login-error');
        return true;
    }
}

function validateSenha() {
    const senha = document.getElementById('senha').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(senha)) {
        showError('senha-error', 'Senha deve ter pelo menos 8 caracteres, incluindo 1 maiúscula, 1 minúscula, 1 número e 1 especial.');
        return false;
    } else {
        hideError('senha-error');
        return true;
    }
}

function validateConfirmarSenha() {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar_senha').value;
    if (senha !== confirmarSenha) {
        showError('confirmar_senha-error', 'Confirmação de senha não coincide.');
        return false;
    } else {
        hideError('confirmar_senha-error');
        return true;
    }
}

// Adicionar event listeners para validação em tempo real
document.getElementById('nome').addEventListener('blur', validateNome);
document.getElementById('nome_mae').addEventListener('blur', validateNomeMae);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('cpf').addEventListener('blur', validateCPF);
document.getElementById('data_nascimento').addEventListener('blur', validateDataNascimento);
document.getElementById('celular').addEventListener('blur', validateCelular);

document.querySelectorAll('input[name="genero"]').forEach(radio => radio.addEventListener('change', validateGenero));
document.getElementById('cep').addEventListener('blur', validateCep);
document.getElementById('numero').addEventListener('blur', validateNumero);
document.getElementById('rua').addEventListener('blur', validateRua);
document.getElementById('complemento').addEventListener('blur', validateComplemento);
document.getElementById('bairro').addEventListener('blur', validateBairro);
document.getElementById('cidade').addEventListener('blur', validateCidade);
document.getElementById('estado').addEventListener('blur', validateEstado);
document.getElementById('login').addEventListener('blur', validateLogin);
document.getElementById('senha').addEventListener('blur', validateSenha);
document.getElementById('confirmar_senha').addEventListener('blur', validateConfirmarSenha);

// Limpar erros ao digitar
document.getElementById('nome').addEventListener('input', () => hideError('nome-error'));
document.getElementById('nome_mae').addEventListener('input', () => hideError('nome_mae-error'));
document.getElementById('email').addEventListener('input', () => hideError('email-error'));
document.getElementById('cpf').addEventListener('input', () => hideError('cpf-error'));
document.getElementById('data_nascimento').addEventListener('input', () => hideError('data_nascimento-error'));
document.getElementById('celular').addEventListener('input', () => hideError('celular-error'));

document.getElementById('cep').addEventListener('input', () => hideError('cep-error'));
document.getElementById('numero').addEventListener('input', () => hideError('numero-error'));
document.getElementById('rua').addEventListener('input', () => hideError('rua-error'));
document.getElementById('complemento').addEventListener('input', () => hideError('complemento-error'));
document.getElementById('bairro').addEventListener('input', () => hideError('bairro-error'));
document.getElementById('cidade').addEventListener('input', () => hideError('cidade-error'));
document.getElementById('estado').addEventListener('input', () => hideError('estado-error'));
document.getElementById('login').addEventListener('input', () => hideError('login-error'));
document.getElementById('senha').addEventListener('input', () => hideError('senha-error'));
document.getElementById('confirmar_senha').addEventListener('input', () => hideError('confirmar_senha-error'));

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const isValid = validateNome() && validateNomeMae() && validateEmail() && validateCPF() && validateDataNascimento() &&
                    validateCelular() && validateGenero() && validateCep() && validateNumero() &&
                    validateRua() && validateComplemento() && validateBairro() && validateCidade() && validateEstado() &&
                    validateLogin() && validateSenha() && validateConfirmarSenha();

    if (isValid) {
        // Se tudo ok, pode enviar ou simular
        alert('Usuário cadastrado');
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

// Toggle para mostrar/ocultar senha
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});
