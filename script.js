const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

// Abre e fecha o menu de navegacao no celular.
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Fecha o menu depois que o visitante escolhe uma secao da pagina.
document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.section-heading, .service-card, .about-visual, .about-copy, .project, .contact-form');

let lastScrollY = window.scrollY;
let scrollingDown = false;

// Identifica se a pagina esta sendo rolada para baixo ou para cima.
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  scrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;
}, { passive: true });

// Mostra os elementos ao entrar na tela e prepara a animacao para repetir
// quando o visitante rolar para fora e voltar para a mesma secao.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (scrollingDown) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.add('visible', 'no-reveal-animation');
        requestAnimationFrame(() => entry.target.classList.remove('no-reveal-animation'));
      }
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  item.style.transitionDelay = `${index * 60}ms`;
  revealObserver.observe(item);
});

const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');

// Reune os dados do formulario e abre uma conversa no WhatsApp.
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const message = `Ola, sou ${data.get('name')}. Tenho interesse em ${data.get('service')}. ${data.get('message') || ''}`;
  const whatsappUrl = `https://wa.me/5538991281610?text=${encodeURIComponent(message)}`;
  formNote.textContent = 'Abrindo o WhatsApp...';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});