// ===============================
// UTILIDADES
// ===============================
function $(id) {
    return document.getElementById(id);
}

function onlyNumbers(value) {
    return value.replace(/\D/g, '');
}

function showError(id, message) {
    const el = $(id);
    if (!el) return;
    el.textContent = message;
    el.style.display = 'block';
}

function hideError(id) {
    const el = $(id);
    if (!el) return;
    el.textContent = '';
    el.style.display = 'none';
}

// ===============================
// MÁSCARAS
// ===============================
function maskCPF(value) {
    value = onlyNumbers(value).slice(0, 11);
    return value
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskCelular(value) {
    value = onlyNumbers(value).slice(0, 11);
    return value
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
}

function maskCEP(value) {
    value = onlyNumbers(value).slice(0, 8);
    return value.replace(/(\d{5})(\d)/, '$1-$2');
}

// ===============================
// APLICAR MÁSCARAS
// ===============================
function applyMask(id, maskFn) {
    const input = $(id);
    if (!input) return;

    input.addEventListener('input', () => {
        input.value = maskFn(input.value);
    });
}

applyMask('cpf', maskCPF);
applyMask('celular', maskCelular);
applyMask('cep', maskCEP);

// ===============================
// APENAS NÚMEROS
// ===============================
function allowOnlyNumbers(id) {
    const input = $(id);
    if (!input) return;

    input.addEventListener('input', () => {
        input.value = onlyNumbers(input.value);
    });
}

allowOnlyNumbers('numero');

// ===============================
// VALIDAÇÕES
// ===============================
function validateField(id, errorId, message, condition) {
    const input = $(id);
    if (!input) return true;

    const value = input.value;

    if (!condition(value)) {
        showError(errorId, message);
        return false;
    }

    hideError(errorId);
    return true;
}

function validateNome() {
    return validateField('nome', 'nome-error', 'Nome deve ter pelo menos 2 caracteres.', v => v.trim().length >= 2);
}

function validateNomeMae() {
    return validateField('nome_mae', 'nome_mae-error', 'Nome da mãe deve ter pelo menos 2 caracteres.', v => v.trim().length >= 2);
}

function validateEmail() {
    return validateField('email', 'email-error', 'Email inválido.', v => /\S+@\S+\.\S+/.test(v));
}


function validateCPF() {
    const cpf = $('cpf').value.replace(/\D/g, '');

    if (cpf.length !== 11 || !validarCPF(cpf)) {
        showError('cpf-error', 'CPF inválido.');
        return false;
    }

    hideError('cpf-error');
    return true;
}


function validateDataNascimento() {
    const dataInput = $('data_nascimento').value;

    if (!dataInput) {
        showError('data_nascimento-error', 'Data de nascimento é obrigatória.');
        return false;
    }

    const hoje = new Date();
    const nascimento = new Date(dataInput);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    if (idade < 12) {
        showError('data_nascimento-error', 'Você deve ter pelo menos 12 anos.');
        return false;
    }

    if (idade > 100) {
        showError('data_nascimento-error', 'Data inválida!');
        return false;
    }

    hideError('data_nascimento-error');
    return true;
}

function validateCelular() {
    const celular = onlyNumbers($('celular').value);

    if (celular.length !== 11) {
        showError('celular-error', 'Celular inválido.');
        return false;
    }

    hideError('celular-error');
    return true;
}

function validateGenero() {
    const genero = document.querySelector('input[name="genero"]:checked');
    if (!genero) {
        showError('genero-error', 'Gênero é obrigatório.');
        return false;
    }
    hideError('genero-error');
    return true;
}

function validateCep() {
    const cep = onlyNumbers($('cep').value);

    if (cep.length !== 8) {
        showError('cep-error', 'CEP inválido.');
        return false;
    }

    hideError('cep-error');
    return true;
}

function validateNumero() {
    return validateField('numero', 'numero-error', 'Número obrigatório.', v => v !== "");
}

function validateRua() {
    return validateField('rua', 'rua-error', 'Rua obrigatória.', v => v !== "");
}

function validateBairro() {
    return validateField('bairro', 'bairro-error', 'Bairro obrigatório.', v => v !== "");
}

function validateCidade() {
    return validateField('cidade', 'cidade-error', 'Cidade obrigatória.', v => v !== "");
}

function validateEstado() {
    return validateField('estado', 'estado-error', 'Selecione um estado.', v => v !== "");
}

function validateLogin() {
    return validateField('login', 'login-error', 'Login mínimo 4 caracteres.', v => v.trim().length >= 4);
}

function validateSenha() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return validateField('senha', 'senha-error', 'Senha fraca.', v => regex.test(v));
}

function validateConfirmarSenha() {
    const senha = $('senha').value;
    return validateField('confirmar_senha', 'confirmar_senha-error', 'Senhas não coincidem.', v => v === senha);
}

// ===============================
// EVENTOS
// ===============================
function addValidation(id, fn) {
    const input = $(id);
    if (!input) return;

    input.addEventListener('blur', fn);
    input.addEventListener('input', () => hideError(`${id}-error`));
}

[
    'nome','nome_mae','email','cpf','celular',
    'cep','numero','rua','bairro','cidade','estado',
    'login','senha','confirmar_senha'
].forEach(id => {
    addValidation(id, window[`validate${id.charAt(0).toUpperCase() + id.slice(1)}`] || (() => true));
});

// DATA com change (melhor)
$('data_nascimento').addEventListener('change', validateDataNascimento);

// Gênero
document.querySelectorAll('input[name="genero"]').forEach(r =>
    r.addEventListener('change', validateGenero)
);

// ===============================
// CPF TEMPO REAL (🔥 PRINCIPAL)
// ===============================
$('cpf').addEventListener('input', () => {
    hideError('cpf-error');

    let cpf = onlyNumbers($('cpf').value);

    if (cpf.length === 11) {
        if (!validarCPF(cpf)) {
            showError('cpf-error', 'CPF inválido.');
        }
    }
});

// ===============================
// SUBMIT
// ===============================
const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const valid =
            validateNome() &&
            validateNomeMae() &&
            validateEmail() &&
            validateCPF() &&
            validateDataNascimento() &&
            validateCelular() &&
            validateGenero() &&
            validateCep() &&
            validateNumero() &&
            validateRua() &&
            validateBairro() &&
            validateCidade() &&
            validateEstado() &&
            validateLogin() &&
            validateSenha() &&
            validateConfirmarSenha();

        if (valid) {
            alert('Usuário cadastrado!');
        }
    });
}

// ===============================
// VALIDADOR DE CPF (🔥 ESSENCIAL)
// ===============================
function validarCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++)
        soma += parseInt(cpf[i]) * (10 - i);

    resto = (soma * 10) % 11;
    if (resto >= 10) resto = 0;

    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;

    for (let i = 0; i < 10; i++)
        soma += parseInt(cpf[i]) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto >= 10) resto = 0;

    return resto === parseInt(cpf[10]);
}

// ===============================
// TOGGLE SENHA
// ===============================
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
        const input = $(this.dataset.target);
        if (!input) return;

        input.type = input.type === 'password' ? 'text' : 'password';
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});