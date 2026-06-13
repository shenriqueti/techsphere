// ── Verificar sessão ──
const userId = sessionStorage.getItem('loggedUserId');
const perfil = sessionStorage.getItem('loggedPerfil');

if (!userId) {
  window.location.href = 'login.html';
}

// ── Toast ──
function showToast(msg, tipo = 'erro') {
  let toast = document.getElementById('toast-area');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-area';
    toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;padding:1rem 1.5rem;border-radius:8px;font-weight:600;z-index:9999;display:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.background = tipo === 'sucesso' ? '#00bf7f' : '#ff4444';
  toast.style.color = '#fff';
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

// ── Modal de alteração de senha ──
function abrirModalSenha() {
  let modal = document.getElementById('modal-senha');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-senha';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:1000;';
    modal.innerHTML = `
      <div style="background:var(--cor-fundo-card,#1a1a2e);border:1px solid var(--cor-borda,#333);border-radius:16px;padding:2rem;max-width:420px;width:90%;">
        <h3 style="margin-bottom:1.5rem;">Alterar Senha</h3>
        <label>Senha atual</label>
        <input type="password" id="senhaAtual" style="width:100%;padding:0.7rem;margin:0.5rem 0 1rem;border-radius:8px;border:1px solid #444;background:#0a0a1a;color:#fff;" />
        <label>Nova senha</label>
        <input type="password" id="novaSenha" style="width:100%;padding:0.7rem;margin:0.5rem 0 1rem;border-radius:8px;border:1px solid #444;background:#0a0a1a;color:#fff;" />
        <label>Confirmar nova senha</label>
        <input type="password" id="confirmarNovaSenha" style="width:100%;padding:0.7rem;margin:0.5rem 0 1.5rem;border-radius:8px;border:1px solid #444;background:#0a0a1a;color:#fff;" />
        <div style="display:flex;gap:1rem;justify-content:flex-end;">
          <button id="btnCancelarSenha" style="padding:0.6rem 1.2rem;border-radius:8px;border:1px solid #666;background:transparent;color:#fff;cursor:pointer;">Cancelar</button>
          <button id="btnSalvarSenha" style="padding:0.6rem 1.2rem;border-radius:8px;border:none;background:#00bfff;color:#000;font-weight:700;cursor:pointer;">Salvar</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    document.getElementById('btnCancelarSenha').addEventListener('click', () => { modal.style.display = 'none'; });
    document.getElementById('btnSalvarSenha').addEventListener('click', alterarSenha);
  }
  modal.style.display = 'flex';
}

async function alterarSenha() {
  const senhaAtual = document.getElementById('senhaAtual').value;
  const novaSenha = document.getElementById('novaSenha').value;
  const confirmarNovaSenha = document.getElementById('confirmarNovaSenha').value;

  if (!senhaAtual || !novaSenha || !confirmarNovaSenha) { showToast('Preencha todos os campos.'); return; }
  if (novaSenha.length < 8) { showToast('Nova senha deve ter ao menos 8 caracteres.'); return; }
  if (novaSenha !== confirmarNovaSenha) { showToast('As novas senhas não coincidem.'); return; }

  try {
    const resp = await fetch(`/api/alterar-senha/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senhaAtual, novaSenha, confirmarNovaSenha })
    });
    const dados = await resp.json();
    if (resp.ok) {
      showToast('Senha alterada com sucesso!', 'sucesso');
      document.getElementById('modal-senha').style.display = 'none';
    } else {
      showToast(dados.message || 'Erro ao alterar senha.');
    }
  } catch (err) {
    showToast('Erro ao conectar com o servidor.');
  }
}

// ── Carregar dados ──
const formMeusDados = document.getElementById('form-meus-dados');
const btnSalvar = document.getElementById('btn-salvar');
const tituloPrincipal = document.getElementById('titulo-principal');

async function carregarDadosUsuario() {
  try {
    btnSalvar.disabled = true;
    const response = await fetch(`/api/meus-dados/${userId}`);
    if (response.status === 404) { showToast('Usuário não encontrado.'); return; }
    if (!response.ok) throw new Error('Erro ao carregar dados');

    const dados = await response.json();
    if (tituloPrincipal && dados.nome) tituloPrincipal.textContent = `Bem-vindo, ${dados.nome}!`;

    const campos = ['nome', 'email', 'cpf', 'celular'];
    campos.forEach(c => {
      const el = document.getElementById(c);
      if (el && dados[c]) el.value = dados[c];
    });
  } catch (error) {
    console.error(error);
    showToast('Erro ao carregar dados. Verifique se o servidor está rodando.');
  } finally {
    btnSalvar.disabled = false;
  }
}

async function atualizarDadosUsuario(event) {
  event.preventDefault();
  const dados = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    cpf: document.getElementById('cpf').value.trim(),
    celular: document.getElementById('celular').value.trim()
  };
  if (!dados.nome || !dados.email || !dados.cpf || !dados.celular) {
    showToast('Preencha todos os campos.'); return;
  }
  try {
    btnSalvar.disabled = true;
    const response = await fetch(`/api/meus-dados/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    const resultado = await response.json();
    if (response.ok) {
      showToast('Dados atualizados com sucesso!', 'sucesso');
      if (dados.nome && tituloPrincipal) tituloPrincipal.textContent = `Bem-vindo, ${dados.nome}!`;
    } else {
      showToast(resultado.message || 'Erro ao atualizar dados.');
    }
  } catch (err) {
    showToast('Erro ao conectar com o servidor.');
  } finally {
    btnSalvar.disabled = false;
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = 'login.html';
}

// ── Adicionar botão de alteração de senha ──
window.addEventListener('DOMContentLoaded', () => {
  carregarDadosUsuario();
  if (formMeusDados) formMeusDados.addEventListener('submit', atualizarDadosUsuario);
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Inserir botão de trocar senha (apenas perfil Comum)
  const btnContainer = document.querySelector('.buttons-container');
  if (btnContainer) {
    const btnSenha = document.createElement('button');
    btnSenha.type = 'button';
    btnSenha.textContent = 'Alterar Senha';
    btnSenha.className = 'btn-descricao';
    btnSenha.style.cssText = 'margin-left:1rem;padding:0.8rem 2rem;font-size:1rem;background:transparent;border:1px solid var(--cor-neon-azul,#00bfff);color:var(--cor-neon-azul,#00bfff);';
    btnSenha.addEventListener('click', abrirModalSenha);
    btnContainer.appendChild(btnSenha);
  }
});
