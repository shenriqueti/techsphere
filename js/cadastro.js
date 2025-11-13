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

function mascaraCPF() {
    const inputCPF = document.getElementById('cpf');
const cpfErro = document.getElementById('cpfErro');

if(cpf || validarCPF(cpf)) {
    // === Máscara do CPF ===
cpf.addEventListener('input', function () {
  let valor = this.value.replace(/\D/g, ''); // Remove tudo que não é número

  if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

  // Adiciona a formatação conforme digita
  if (valor.length > 9) {
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  } else if (valor.length > 6) {
    valor = valor.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  } else if (valor.length > 3) {
    valor = valor.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  }

  this.value = valor;
});

}
if (!cpf || !validarCPF(cpf)) {
        showError('cpf-error', 'CPF válido é obrigatório.');
        
        return false;
    } else {
        hideError('cpf-error');
        
        return true;
    }


}

function validateDataNascimento() {
    const dataNascimentoInput = document.getElementById('data_nascimento');
    const dataNascimento = dataNascimentoInput.value;

    if (!dataNascimento) {
        showError('data_nascimento-error', 'Data de nascimento é obrigatória.');
        return false;
    }

    // Converte a data digitada para um objeto Date
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    // Calcula idade
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajusta se o aniversário ainda não chegou neste ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    // Verifica se é menor de 18
    if (idade < 18) {
        showError('data_nascimento-error', 'Você deve ter pelo menos 18 anos.');
        return false;
    }

    hideError('data_nascimento-error');
    return true;
}

// Oculta o erro automaticamente quando o usuário altera o campo
document.getElementById('data_nascimento').addEventListener('input', () => hideError('data_nascimento-error'));


function validateCelular() {
    const inputCelular = document.getElementById('celular');
    let valor = inputCelular.value.replace(/\D/g, ''); // remove tudo que não é número

    // === Máscara ===
    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length > 10) {
        // Formato (00) 00000-0000
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (valor.length > 6) {
        // Formato (00) 0000-0000
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (valor.length > 2) {
        valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
        valor = valor.replace(/^(\d*)/, '($1');
    }

    inputCelular.value = valor;

    // === Validação ===
    const celular = valor.replace(/\D/g, '');
    if (!celular) {
        showError('celular-error', 'O número de celular é obrigatório.');
        return false;
    }
    if (celular.length !== 11) {
        showError('celular-error', 'Digite um número válido com 11 dígitos.');
        return false;
    }

    hideError('celular-error');
    return true;
}

// Oculta erro automaticamente ao digitar e aplica a máscara em tempo real
document.getElementById('celular').addEventListener('input', function() {
    validateCelular();
    hideError('celular-error');
});






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
    const inputCep = document.getElementById('cep');
    let cep = inputCep.value.replace(/\D/g, ''); // remove tudo que não for número

    // === Máscara ===
    if (cep.length > 8) cep = cep.slice(0, 8);
    if (cep.length > 5) {
        inputCep.value = cep.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
    } else {
        inputCep.value = cep;
    }

    // === Validação ===
    if (!cep) {
        showError('cep-error', 'CEP é obrigatório.');
        return false;
    }

    // ✅ Corrigido: agora ele valida somente os números, ignorando o traço
    if (cep.length !== 8) {
        showError('cep-error', 'Digite um CEP válido com 8 números.');
        return false;
    }

    hideError('cep-error');
    return true;
}

// Aplica máscara e remove erro ao digitar
document.getElementById('cep').addEventListener('input', () => {
    validateCep();
    hideError('cep-error');
});



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
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(senha)) {
        showError('senha-error', 'Senha deve ter pelo menos 8 caracteres, incluindo 1 maiúscula, 1 minúscula.');
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
