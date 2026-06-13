document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  });
});

// ── Toast ──
function showToast(msg, tipo = 'erro') {
  let toast = document.getElementById('toast-evento');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-evento';
    toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;padding:1rem 1.5rem;border-radius:8px;font-weight:600;z-index:9999;display:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = tipo === 'sucesso' ? '#00bf7f' : '#ff4444';
  toast.style.color = '#fff';
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

// ── Validações básicas ──
function validarCampos() {
  const evento = document.getElementById('evento').value.trim();
  const data = document.getElementById('data').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const cep = document.getElementById('Cep').value.trim();
  const numero = document.getElementById('numero').value.trim();
  const rua = document.getElementById('rua').value.trim();
  const bairro = document.getElementById('bairro').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value.trim();

  if (!evento || !data || !descricao || !cep || !numero || !rua || !bairro || !cidade || !estado) {
    showToast('Preencha todos os campos obrigatórios.');
    return false;
  }
  return true;
}

// ── Busca de CEP via ViaCEP ──
const campoCep = document.getElementById('Cep');
if (campoCep) {
  campoCep.addEventListener('blur', async () => {
    const cep = campoCep.value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resp.json();
      if (dados.erro) { showToast('CEP não encontrado.'); return; }
      document.getElementById('rua').value = dados.logradouro || '';
      document.getElementById('bairro').value = dados.bairro || '';
      document.getElementById('cidade').value = dados.localidade || '';
      document.getElementById('estado').value = dados.uf || '';
    } catch (e) {
      console.error('Erro ao buscar CEP:', e);
    }
  });
}

// ── Submit ──
document.querySelector('.buttons-container input[type="submit"]').addEventListener('click', async (e) => {
  e.preventDefault();
  if (!validarCampos()) return;

  const linkIngresso = document.getElementById('link-ingresso');
  const hora = document.getElementById('hora');
  const complemento = document.getElementById('complemento');

  const dados = {
    evento: document.getElementById('evento').value.trim(),
    linkIngresso: linkIngresso ? linkIngresso.value.trim() : '',
    data: document.getElementById('data').value.trim(),
    hora: hora ? hora.value.trim() : '',
    descricao: document.getElementById('descricao').value.trim(),
    cep: document.getElementById('Cep').value.trim(),
    numero: document.getElementById('numero').value.trim(),
    rua: document.getElementById('rua').value.trim(),
    complemento: complemento ? complemento.value.trim() : '',
    bairro: document.getElementById('bairro').value.trim(),
    cidade: document.getElementById('cidade').value.trim(),
    estado: document.getElementById('estado').value.trim()
  };

  try {
    const resp = await fetch('/api/cadastro-evento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    const resultado = await resp.json();

    if (resp.ok) {
      showToast('Evento cadastrado com sucesso!', 'sucesso');
      setTimeout(() => { window.location.href = 'index.html'; }, 2000);
    } else {
      showToast(resultado.message || 'Erro ao cadastrar evento.');
    }
  } catch (err) {
    console.error(err);
    showToast('Erro ao conectar com o servidor.');
  }
});