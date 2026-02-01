// ===== config =====
const PER_PAGE = 3;
const FADE_DURATION = 300;

// ===== elements =====
const section = document.querySelector('.studies');
const list = document.querySelector('.studies__card-list');
const items = [...list.children];

const prevBtn = document.querySelector('.pagination__prev');
const nextBtn = document.querySelector('.pagination__next');
const pagesList = document.querySelector('.pagination__list');

// ===== state =====
let currentPage = 1;
const totalPages = Math.ceil(items.length / PER_PAGE);

// ===== init =====
renderPages();
updatePage({ scroll: false });

// ===== functions =====
function renderPages() {
  pagesList.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    pagesList.insertAdjacentHTML(
      'beforeend',
      `<li><button class="pagination__page" data-page="${i}" type="button">${i}</button></li>`
    );
  }

  pagesList.addEventListener('click', onPageClick);
}

function onPageClick(e) {
  const btn = e.target.closest('.pagination__page');
  if (!btn) return;

  goToPage(Number(btn.dataset.page));
}

function updatePage({ scroll }) {
  animateFade(() => {
    updateItemsVisibility();
    updateControls();
    if (scroll) scrollToSection();
  });
}

function updateItemsVisibility() {
  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  items.forEach((item, i) => {
    item.style.display = i >= start && i < end ? '' : 'none';
  });
}

function updateControls() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  pagesList.querySelectorAll('.pagination__page').forEach(btn => {
    btn.classList.toggle('is-active', Number(btn.dataset.page) === currentPage);
  });
}

function goToPage(page) {
  if (page === currentPage) return;

  currentPage = page;
  updatePage({ scroll: true });
}

// ===== animation =====
function animateFade(callback) {
  items.forEach(i => i.classList.add('is-hidden'));

  setTimeout(() => {
    callback();
    requestAnimationFrame(() =>
      items.forEach(i => i.classList.remove('is-hidden'))
    );
  }, FADE_DURATION);
}

function scrollToSection() {
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== events =====
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) goToPage(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) goToPage(currentPage + 1);
});
