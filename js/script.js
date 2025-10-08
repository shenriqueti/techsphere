// Função para abrir o modal, mantida do seu código original
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
  }
}

// Função para fechar o modal, mantida do seu código original
function fecharModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
  }
}

// Event listener para fechar o modal clicando fora ou na tecla ESC
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
};

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  }
});

// Lógica para os modais de EVENTOS e filtros da PROGRAMAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    
  const eventos = {
    1: { titulo: 'AI Future Summit', descricao: 'Painéis sobre modelos generativos, MLOps e aplicações éticas de IA.', img: './images/future_of_ai.jpg' },
    2: { titulo: 'Cloud & DevOps Conference', descricao: 'Workshops hands-on sobre infraestrutura como código e abstração.', img: './images/cloudDev.jpg' },
    3: { titulo: 'Cybersecurity Day', descricao: 'CTF, laboratórios práticos e painéis com especialistas em defesa cibernética.', img: './images/cybersecurity.jpg' },
    4: { titulo: 'Frontend Dev Live', descricao: 'Demonstrações, práticas de performance e acessibilidade com live coding.', img: './images/frontend.jpg' }
  };

  document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Lógica para abrir o modal de eventos
    if (target.matches('.btn-descricao[data-acao="abrir"]')) {
      const id = target.getAttribute('data-id');
      const evento = eventos[id];
      if (evento) {
        document.getElementById('mTitulo').textContent = evento.titulo;
        document.getElementById('mDescricao').textContent = evento.descricao;
        document.getElementById('mImg').src = evento.img;
        document.getElementById('modal').style.display = 'flex';
      }
    }
  });

  // Filtros da Programação
  const filterButtons = document.querySelectorAll('.filtros button');
  const cartoes = document.querySelectorAll('.programacao .cartao');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      cartoes.forEach(cartao => {
        cartao.style.display = 'none'; // Esconde todos primeiro
        if (filter === 'all' || cartao.getAttribute('data-category') === filter) {
          cartao.style.display = 'flex'; // Mostra apenas os que correspondem
        }
      });
    });
  });
  
  if (filterButtons.length > 0) {
      filterButtons[0].click();
  }
});