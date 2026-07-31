export function initChapters() {
  const filterBtns = document.querySelectorAll('.chapters-filter__btn');
  const arcSections = document.querySelectorAll('.arc-section');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      const arc = btn.dataset.arc;
      arcSections.forEach(section => {
        if (arc === 'all' || section.dataset.arc === arc) {
          section.style.display = '';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
}
