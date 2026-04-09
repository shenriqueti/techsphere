// Modal Functions
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
  }
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
  }
}

function abrirModalExitIntent() {
  const modalId = 'modalExitIntent';
  const modal = document.getElementById(modalId);
  if (modal) {
    const mensagemElement = modal.querySelector('.modal-mensagem');
    if (mensagemElement) {
      mensagemElement.textContent = "Já vai? Não perca a chance de garantir seu ingresso para o TechSphere!";
    }
    modal.style.display = 'flex';
  }
}

// Event Listeners
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

document.addEventListener('DOMContentLoaded', function() {
  // Events Data
  const eventos = {
    1: {titulo: 'CURSO SOFTWARE DEFENSE LITE',
        descricao: 'Licenciamento do sistema, compatibilidade dos dispositivos  de vídeo monitoramento, funcionalidades de reconhecimento facial e leitura de placas,monitoramento em tempo real de eventos de segurança, expansões do sistema, ambiente operacional de gestão, gerenciamento de centrais de alarme, partições e zonas e monitoramento em tempo real.',
        data:'28 mai - 2026 • 09:00 / 17:00',
        local:'Estr. do Timbó, 268, Rio de Janeiro - RJ',
        link:'https://www.sympla.com.br/evento/curso-software-defense-lite/3370692?share_id=copiarlink',
        img: './images/Defense Lite.jpg' },

    2: {titulo: 'II InovafitoBrasil Summit: biodiversidade para o desenvolvimento de novas tecnologias para o SUS',
        descricao: 'Explore a inovação no uso da biodiversidade brasileira para desenvolver novas tecnologias para o SUS! Participe da segunda edição do InovafitoBrasil Summit, evento promovido pela Biominas Brasil e pela Sociedade Brasileira de Farmacognosia. O encontro reúne especialistas, setor produtivo e gestores públicos para discutir inovação em fitoterápicos e bioativos, com foco na saúde humana e no fortalecimento do SUS, com palestras, debates sobre desafios regulatórios, mercado, escalonamento tecnológico e feira de projetos e startups.',
        data:'14 abr - 2026 • 08:30 > 15 abr - 2026 • 16:40',
        local:'Local: Casa Firjan, Rio de Janeiro - RJ',
        link:'https://www.sympla.com.br/evento/ii-inovafitobrasil-summit-biodiversidade-para-o-desenvolvimento-de-novas-tecnologias-para-o-sus/3278156?share_id=copiarlink',
        img: './images/II InovafitoBrasil Summit.jpg' },

    3: {titulo:'Tech Hub Conf 2026',
        descricao: 'O Tech Hub Conf é um evento único e enriquecedor para a comunidade de tecnologia, com foco no aprimoramento de habilidades, conexões significativas e inspiração, será um ponto de encontro para profissionais de TI.O Tech Hub Conf oferecerá uma programação variada, repleta de palestras e workshops técnicos ministrados por profissionais renomados, abordando tópicos relevantes e atuais. Além disso, teremos ignite talks, open spaces, momentos de conversas e coffee breaks para estimular interações e trocas de ideias.O objetivo é proporcionar uma experiência enriquecedora, onde você poderá aprimorar suas habilidades técnicas, ampliar seu conhecimento e estabelecer conexões duradouras com outros desenvolvedores da região.Para ficar por dentro das novidades, nós acompanhe nas redes sociais:Site: https://techhubjf.org/confLinkedIn:  https://www.linkedin.com/company/tech-hub-conf/Instagram:  https://www.instagram.com/techhubconf/',
        data:'30 mai - 2026 • 08:30 / 19:00',
        local:'Local:Nosso Moinho, Juiz de Fora - MG',
        link:'https://www.sympla.com.br/evento/tech-hub-conf-2026/3325416?share_id=copiarlink',
        img: './images/techHub.png' },

    4: {titulo: 'Treinamento: Boas Práticas de Instalação e Manutenção em Data Center - Lightera | Furukawa',
        descricao: 'Garanta a máxima performance e confiabilidade da sua infraestrutura crítica! O treinamento de Boas Práticas de Instalação e Manutenção em Data Center reúne a expertise e a tecnologia de ponta da Lightera | Furukawa para capacitar profissionais no manuseio, instalação e certificação de redes de alta densidade.Em um ambiente onde a disponibilidade de dados é vital, dominar as técnicas corretas de cabeamento estruturado e organização de infraestrutura é o diferencial que evita falhas operacionais e reduz custos de manutenção.',
        data:'Data / hora: 14 abr - 2026 • 08:30 / 12:30',
        local:'Local: R. São Francisco Xavier, 896, Rio de Janeiro - RJ',
        link:'https://www.sympla.com.br/evento/treinamento-boas-praticas-de-instalacao-e-manutencao-em-data-center-lightera-furukawa/3322478?share_id=copiarlink',
        img: './images/DataCenter.png' },

    5: {titulo:'RPA e AI TECH RJ 2026', 
        descricao: 'RPA e AI TECH RJ 202604 e 05 de agosto – Centro de Convenções Prodigy Santos Dumont6ª edição do maior evento de RPA, Hyper Automação e Inteligência Artificial do Rio de Janeiro. Transforme sua carreira dominando o futuro da Automação Inteligente. A transformação digital deixou de ser tendência para se tornar prioridade estratégica, e as tecnologias de RPA, Hyper Automation e Inteligência Artificial estão na linha de frente desta revolução. O RPA & AI Tech – Rio de Janeiro 2026 chega à sua sexta edição consolidado como o principal evento da região para profissionais e empresas que desejam entender, aplicar e liderar os avanços da automação inteligente. Durante dois dias intensos de conteúdo, você terá acesso a palestras, painéis, estudos de caso e demonstrações práticas sobre as tecnologias que hoje movem a eficiência, a inovação e a competitividade nas organizações de todos os portes e segmentos. Este é o evento para quem deseja ir além do básico, compreender o que vem por aí em Intelligent Automation e se posicionar na linha de frente da inovação.',
        data:'04 ago - 2026 • 08:00 / 05 ago - 2026 • 19:00',
        local:'PRODIGY Hotel Santos Dumont, Rio de Janeiro - RJ',
        link:'https://www.sympla.com.br/evento/rpa-e-ai-tech-rj-2026/3225055?share_id=copiarlink',
        img: './images/RPA&AI.png' },

    6: {titulo: 'Instale controle de acesso com reconhecimento facial',
        descricao: 'Este treinamento visa capacitar profissionais para operar de maneira eficiente os controladores de acesso facial em conjunto com software Incontrol web, fornecendo amplos conhecimentos técnicos e práticos, com ênfase na instalação, configuração e uso das principais funcionalidades desta solução dedicada ao sistema de controlador de acesso Intelbras.',
        data:'20 mai - 2026 • 09:00 / 17:00',
        local:'Local: SDE Nova Iguaçu, Nova Iguaçu - RJ',
        link:'https://www.sympla.com.br/evento/instale-controle-de-acesso-com-reconhecimento-facial/3348711?share_id=copiarlink',
        img: './images/reconhecimentoFacial.png' },

    7: {titulo: '26º CURSO DE PILOTO DE DRONE',
        descricao: 'A Arboni Tecnologia é uma empresa de referência nacional na área de drones profissionais, especializada em formação de pilotos, treinamentos técnicos e consultoria estratégica para operações com drones. Com sede no estado do Rio de Janeiro e estrutura física própria, oferecemos cursos presenciais e personalizados, com certificação e foco em resultados práticos. Já capacitamos dezenas de alunos que hoje atuam nas áreas de segurança, eventos, monitoramento aéreo e filmagens profissionais. Todos os nossos produtos são originais, lacrados, homologados pela Anatel, com nota fiscal, garantia oficial e suporte técnico direto na loja. Nosso diferencial está na excelência da formação: nossos treinamentos combinam prática real, simulações operacionais e acompanhamento individual, tornando o aluno apto a atuar de forma profissional, legalizada e com total confiança. Se você busca formação séria, tecnologia de ponta e um suporte que continua depois do curso, a Arboni é o seu próximo passo rumo ao alto nível.',
        data:'11 abr - 2026 • 08:00 / 18:00',
        local:'Local: SELETO HOTEL EXPRESS, Piraí - RJ',
        link:'https://www.sympla.com.br/evento/instale-controle-de-acesso-com-reconhecimento-facial/3348711?share_id=copiarlink',
        img: './images/drone.jpg' },

    8: {titulo: 'Workshop de Lovable - Desenvolvimento Ágil de Soluções Digitais',
        descricao: 'Participe do Workshop de Lovable - Desenvolvimento Ágil de Soluções Digitais e aprenda, de forma prática e dinâmica, como criar produtos digitais eficientes utilizando metodologias ágeis. O evento reúne profissionais e entusiastas da tecnologia para explorar ferramentas, boas práticas e estratégias que aceleram o desenvolvimento de soluções inovadoras, promovendo colaboração, criatividade e foco em resultados.',
        data:'27 abr - 2026 • 14:00 / 29 abr - 2026 • 17:00',
        local:'Local: Centro Regional de Inovação e Transferência de Tecnologia UFJF, Juiz de Fora - MG',
        link:'https://www.sympla.com.br/evento/workshop-de-lovable-desenvolvimento-agil-de-solucoes-digitais/3368779?share_id=copiarlink',
        img: './images/LOVABLE.jpg' }
  };

  // Event Modal Logic
  document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.matches('.btn-descricao[data-acao="abrir"]')) {
      const id = target.getAttribute('data-id');
      const evento = eventos[id];
      if (evento) {
        document.getElementById('mTitulo').textContent = evento.titulo;
        document.getElementById('mDescricao').textContent = evento.descricao;
        document.getElementById('mData').textContent = evento.data;
        document.getElementById('mLocal').textContent = evento.local;
        document.getElementById('mImg').src = evento.img;
        document.getElementById('modal').style.display = 'flex';
        const botaoLink = document.getElementById('mCaminho');
        botaoLink.href = evento.link || '#';
      }
    }
  });

  // Filter Logic
  const filterButtons = document.querySelectorAll('.filtros button');
  const cartoes = document.querySelectorAll('.intro .card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      cartoes.forEach(cartao => {
        cartao.style.display = 'none';
        if (filter === 'all' || cartao.getAttribute('data-category') === filter) {
          cartao.style.display = 'flex';
        }
      });
    });
  });

  if (filterButtons.length > 0) {
    filterButtons[0].click();
  }

  // Slideshow Logic
  const slidesContainer = document.getElementById('slides');
  const pontosContainer = document.getElementById('pontos');
  const slides = slidesContainer.querySelectorAll('.slide');
  let currentSlide = 0;
  let autoSlideInterval;

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

  startAutoSlide();

  const banner = document.querySelector('.banner-apresentacao');
  banner.addEventListener('mouseenter', stopAutoSlide);
  banner.addEventListener('mouseleave', startAutoSlide);

  // Exit Intent Modal
  let exitIntentTriggered = false;

  document.documentElement.addEventListener('mouseleave', function() {
    if (!exitIntentTriggered) {
      abrirModalExitIntent();
      exitIntentTriggered = true;
    }
  });

  const closeButtonExit = document.getElementById('fecharModalExit');
  if (closeButtonExit) {
    closeButtonExit.addEventListener('click', () => fecharModal('modalExitIntent'));
  }
});
