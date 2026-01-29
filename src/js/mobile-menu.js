const refs = {
  backdrop: document.querySelector('.backdrop'),
  menu: document.querySelector('.menu'),
  openBtn: document.querySelector('.js-open-menu'),
  closeBtn: document.querySelector('.js-close-menu'),
  links: document.querySelectorAll('.menu__link, .menu__btn'),
};

const openMenu = () => {
  refs.backdrop.classList.add('is-open');
  refs.menu.classList.add('is-open');
  document.body.classList.add('no-scroll');
  refs.openBtn?.setAttribute('aria-expanded', 'true');
};

const closeMenu = () => {
  refs.backdrop.classList.remove('is-open');
  refs.menu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  refs.openBtn?.setAttribute('aria-expanded', 'false');
};

const isMenuOpen = () => refs.backdrop.classList.contains('is-open');

// Open / close buttons
refs.openBtn?.addEventListener('click', openMenu);
refs.closeBtn?.addEventListener('click', closeMenu);

// Close on backdrop click
refs.backdrop?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeMenu();
});

// Close on link / button click
refs.links.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isMenuOpen()) {
    closeMenu();
  }
});

// Close if screen becomes >= 768px
const mq = window.matchMedia('(min-width: 768px)');
mq.addEventListener('change', e => {
  if (e.matches && isMenuOpen()) {
    closeMenu();
  }
});
