// ── Inputmask para telefone (+55)XX-XXXXXXXX ──
window.addEventListener('DOMContentLoaded', () => {
  const celularInput = document.getElementById('celular');
  if (celularInput && typeof Inputmask !== 'undefined') {
    Inputmask('(+55)99-99999999').mask(celularInput);
  }
});

// ── Helpers de erro ──
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) { el.textContent = message; el.style.display = 'block'; }
}
function hideError(id) {
  const el = document.getElementById(id);
  if (el) { el.textContent = ''; el.style.display = 'none'; }
}

// ── Toast ──
function showToast(msg, tipo = 'erro') {
  let toast = document.getElementById('toast-cadastro');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-cadastro';
    toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;padding:1rem 1.5rem;border-radius:8px;font-weight:600;z-index:9999;display:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = tipo === 'sucesso' ? '#00bf7f' : '#ff4444';
  toast.style.color = '#fff';
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

// ── Validações ──
function validateNome() {
  const nome = document.getElementById('nome').value.trim();
  if (nome.length < 15 || nome.length > 80) {
    showError('nome-error', 'Nome deve ter entre 15 e 80 caracteres.');
    return false;
  }
  hideError('nome-error'); return true;
}
function validateNomeMae() {
  const v = document.getElementById('nome_mae').value.trim();
  if (v.length < 2) { showError('nome_mae-error', 'Nome da mãe deve ter pelo menos 2 caracteres.'); return false; }
  hideError('nome_mae-error'); return true;
}
function validateEmail() {
  const v = document.getElementById('email').value.trim();
  if (!v || !/\S+@\S+\.\S+/.test(v)) { showError('email-error', 'Email válido é obrigatório.'); return false; }
  hideError('email-error'); return true;
}
function validateCPF() {
  const v = document.getElementById('cpf').value.trim();
  if (!v || !validarCPF(v)) { showError('cpf-error', 'CPF inválido.'); return false; }
  hideError('cpf-error'); return true;
}
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
function validateDataNascimento() {
  const v = document.getElementById('data_nascimento').value;
  if (!v) { showError('data_nascimento-error', 'Data de nascimento é obrigatória.'); return false; }
  hideError('data_nascimento-error'); return true;
}
function validateCelular() {
  const v = document.getElementById('celular').value.replace(/\D/g, '');
  if (v.length < 10) { showError('celular-error', 'Celular inválido. Use (+55)XX-XXXXXXXX.'); return false; }
  hideError('celular-error'); return true;
}
function validateGenero() {
  const v = document.querySelector('input[name="genero"]:checked');
  if (!v) { showError('genero-error', 'Gênero é obrigatório.'); return false; }
  hideError('genero-error'); return true;
}
function validateCep() {
  const v = document.getElementById('cep').value.trim();
  if (!v) { showError('cep-error', 'CEP é obrigatório.'); return false; }
  hideError('cep-error'); return true;
}
function validateNumero() {
  const v = document.getElementById('numero').value.trim();
  if (!v) { showError('numero-error', 'Número é obrigatório.'); return false; }
  hideError('numero-error'); return true;
}
function validateRua() {
  const v = document.getElementById('rua').value.trim();
  if (!v) { showError('rua-error', 'Rua é obrigatória.'); return false; }
  hideError('rua-error'); return true;
}
function validateBairro() {
  const v = document.getElementById('bairro').value.trim();
  if (!v) { showError('bairro-error', 'Bairro é obrigatório.'); return false; }
  hideError('bairro-error'); return true;
}
function validateCidade() {
  const v = document.getElementById('cidade').value.trim();
  if (!v) { showError('cidade-error', 'Cidade é obrigatória.'); return false; }
  hideError('cidade-error'); return true;
}
function validateEstado() {
  const v = document.getElementById('estado').value.trim();
  if (!v) { showError('estado-error', 'Estado é obrigatório.'); return false; }
  hideError('estado-error'); return true;
}
function validateLogin() {
  const v = document.getElementById('login').value.trim();
  if (v.length < 4) { showError('login-error', 'Login deve ter pelo menos 4 caracteres.'); return false; }
  hideError('login-error'); return true;
}
function validateSenha() {
  const v = document.getElementById('senha').value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(v)) {
    showError('senha-error', 'Senha deve ter mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 especial.');
    return false;
  }
  hideError('senha-error'); return true;
}
function validateConfirmarSenha() {
  const s = document.getElementById('senha').value;
  const c = document.getElementById('confirmar_senha').value;
  if (s !== c) { showError('confirmar_senha-error', 'Confirmação de senha não coincide.'); return false; }
  hideError('confirmar_senha-error'); return true;
}

// ── Busca de CEP via ViaCEP ──
document.getElementById('cep').addEventListener('blur', async () => {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  if (cep.length !== 8) return;
  try {
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resp.json();
    if (dados.erro) { showToast('CEP não encontrado.'); return; }
    document.getElementById('rua').value = dados.logradouro || '';
    document.getElementById('bairro').value = dados.bairro || '';
    document.getElementById('cidade').value = dados.localidade || '';
    document.getElementById('estado').value = dados.uf || '';
    hideError('rua-error'); hideError('bairro-error'); hideError('cidade-error'); hideError('estado-error');
  } catch (e) {
    console.error('Erro ao buscar CEP:', e);
  }
});

// ── Event listeners blur ──
const campos = ['nome','nome_mae','email','cpf','data_nascimento','celular','cep','numero','rua','bairro','cidade','estado','login','senha','confirmar_senha'];
const validators = { nome: validateNome, nome_mae: validateNomeMae, email: validateEmail, cpf: validateCPF,
  data_nascimento: validateDataNascimento, celular: validateCelular, cep: validateCep, numero: validateNumero,
  rua: validateRua, bairro: validateBairro, cidade: validateCidade, estado: validateEstado,
  login: validateLogin, senha: validateSenha, confirmar_senha: validateConfirmarSenha };

campos.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('blur', validators[id]);
    el.addEventListener('input', () => hideError(id + '-error'));
  }
});
document.querySelectorAll('input[name="genero"]').forEach(r => r.addEventListener('change', validateGenero));

// ── Toggle senha ──
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', function () {
    const input = document.getElementById(this.getAttribute('data-target'));
    if (input.type === 'password') { input.type = 'text'; this.classList.replace('fa-eye', 'fa-eye-slash'); }
    else { input.type = 'password'; this.classList.replace('fa-eye-slash', 'fa-eye'); }
  });
});

// ── Submit ──
document.getElementById('form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const tudo = validateNome() & validateNomeMae() & validateEmail() & validateCPF() &
               validateDataNascimento() & validateCelular() & validateGenero() & validateCep() &
               validateNumero() & validateRua() & validateBairro() & validateCidade() &
               validateEstado() & validateLogin() & validateSenha() & validateConfirmarSenha();

  if (!tudo) { showToast('Corrija os erros antes de enviar.'); return; }

  const dados = {
    nome: document.getElementById('nome').value.trim(),
    nome_mae: document.getElementById('nome_mae').value.trim(),
    email: document.getElementById('email').value.trim(),
    cpf: document.getElementById('cpf').value.trim(),
    data_nascimento: document.getElementById('data_nascimento').value,
    celular: document.getElementById('celular').value.trim(),
    genero: document.querySelector('input[name="genero"]:checked').value,
    cep: document.getElementById('cep').value.trim(),
    numero: document.getElementById('numero').value.trim(),
    rua: document.getElementById('rua').value.trim(),
    complemento: document.getElementById('complemento').value.trim(),
    bairro: document.getElementById('bairro').value.trim(),
    cidade: document.getElementById('cidade').value.trim(),
    estado: document.getElementById('estado').value.trim(),
    login: document.getElementById('login').value.trim(),
    senha: document.getElementById('senha').value,
    confirmar_senha: document.getElementById('confirmar_senha').value
  };

  const btnSubmit = this.querySelector('[type="submit"]');
  btnSubmit.disabled = true;
  btnSubmit.value = 'Cadastrando...';

  try {
    const resp = await fetch('/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    const resultado = await resp.json();

    if (resp.ok) {
      showToast('Cadastro realizado com sucesso! Redirecionando...', 'sucesso');
      setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    } else {
      showToast(resultado.message || 'Erro ao cadastrar.');
      btnSubmit.disabled = false;
      btnSubmit.value = 'Cadastrar';
    }
  } catch (err) {
    console.error(err);
    showToast('Erro ao conectar com o servidor.');
    btnSubmit.disabled = false;
    btnSubmit.value = 'Cadastrar';
  }
});
