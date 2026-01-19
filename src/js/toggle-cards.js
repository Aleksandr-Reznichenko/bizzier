const cards = document.querySelectorAll('.studies__card');
const mq = window.matchMedia('(max-width: 1023px)');

cards.forEach(card => {
  card.addEventListener('click', e => {
    if (!mq.matches) return;

    e.stopPropagation();

    const isActive = card.classList.contains('is-active');

    cards.forEach(c => c.classList.remove('is-active'));

    if (!isActive) {
      card.classList.add('is-active');
    }
  });
});

document.addEventListener('click', () => {
  if (!mq.matches) return;

  cards.forEach(card => card.classList.remove('is-active'));
});
