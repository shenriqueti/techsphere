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

function allowOnlyNumbers(id) {
    const input = $(id);
    if (!input) return;

    input.addEventListener('input', () => {
        input.value = onlyNumbers(input.value);
    });
}

allowOnlyNumbers('numero');

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
            const formData = {
                nome: $('nome').value,
                nome_mae: $('nome_mae').value,
                email: $('email').value,
                cpf: onlyNumbers($('cpf').value),
                data_nascimento: $('data_nascimento').value,
                celular: onlyNumbers($('celular').value),
                genero: document.querySelector('input[name="genero"]:checked')?.value,
                cep: onlyNumbers($('cep').value),
                numero: $('numero').value,
                rua: $('rua').value,
                complemento: $('complemento').value,
                bairro: $('bairro').value,
                cidade: $('cidade').value,
                estado: $('estado').value,
                login: $('login').value,
                senha: $('senha').value
            };

            fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message);

                if (data.message.includes('sucesso')) {
                    window.location.href = '/login.html';
                }
            })
            .catch(() => {
                alert('Erro ao conectar com o servidor');
            });
        }
    });
}