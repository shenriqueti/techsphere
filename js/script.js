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
    1: { titulo: 'AI Future Summit', descricao: 'Painéis sobre modelos generativos, MLOps e aplicações éticas de IA. Data: 10/10 - Dia inteiro - Local: Auditório Principal', img: './images/future_of_ai.jpg' },
    2: { titulo: 'Cloud & DevOps Conference', descricao: 'Workshops hands-on sobre infraestrutura como código e abstração. Data: 10/10 - Dia inteiro - Local: Sala de Workshops', img: './images/cloudDev.jpg' },
    3: { titulo: 'Cybersecurity Day', descricao: 'CTF, laboratórios práticos e painéis com especialistas em defesa cibernética. Data: 10/10 - Dia inteiro - Local: Sala de Segurança', img: './images/cybersecurity.jpg' },
    4: { titulo: 'IA no Futuro', descricao: 'Palestra sobre tendências e inovações em inteligência artificial. Data: 10/10 - 14h - Local: Auditório Principal', img: './images/future_of_ai.jpg' },
    5: { titulo: 'Hands-on em Cloud', descricao: 'Workshop prático sobre computação em nuvem e DevOps. Data: 10/10 - 16h - Local: Sala de Workshops', img: './images/cloudDev.jpg' },
    6: { titulo: 'Blockchain para Iniciantes', descricao: 'Palestra introdutória sobre blockchain e criptomoedas. Data: 11/10 - 10h - Local: Auditório Principal', img: './images/cybersecurity.jpg' }
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

  // Filtrin da Agenda
  const filterButtons = document.querySelectorAll('.filtros button');
  const cartoes = document.querySelectorAll('.intro .card');

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

  // Slideshow baby!
  const slidesContainer = document.getElementById('slides');
  const pontosContainer = document.getElementById('pontos');
  const slides = slidesContainer.querySelectorAll('.slide');
  let currentSlide = 0;
  let autoSlideInterval;

  // cria indicadores
  slides.forEach((_, index) => {
    const ponto = document.createElement('div');
    ponto.classList.add('ponto');
    if (index === 0) ponto.classList.add('ativo');
    ponto.addEventListener('click', () => showSlide(index));
    pontosContainer.appendChild(ponto);
  });

  const pontos = pontosContainer.querySelectorAll('.ponto');

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    pontos.forEach((ponto, i) => {
      ponto.classList.toggle('ativo', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Starta auto-rotação
  startAutoSlide();

  // Pause no hover
  const banner = document.querySelector('.banner-apresentacao');
  banner.addEventListener('mouseenter', stopAutoSlide);
  banner.addEventListener('mouseleave', startAutoSlide);
});
