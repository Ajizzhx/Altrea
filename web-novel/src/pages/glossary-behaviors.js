export function initGlossary() {
  const searchInput = document.getElementById('glossary-search-input');
  const filterTabs = document.querySelectorAll('.glossary-filter__tab');
  const cards = document.querySelectorAll('.glossary-card');
  const countEl = document.getElementById('glossary-count-num');
  const emptyEl = document.getElementById('glossary-empty');

  let activeCategory = 'all';
  let searchQuery = searchInput?.value.trim().toLowerCase() || '';

  function filterCards() {
    let visible = 0;
    cards.forEach(card => {
      const catMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
      const searchMatch = !searchQuery ||
        card.dataset.name?.includes(searchQuery) ||
        card.dataset.altrea?.includes(searchQuery) ||
        card.dataset.desc?.includes(searchQuery);

      const show = catMatch && searchMatch;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (countEl) countEl.textContent = visible;
    if (emptyEl) emptyEl.hidden = visible > 0;
  }

  // Category filter
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.dataset.category;
      filterCards();
    });
  });

  // Search
  let debounce;
  searchInput?.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      searchQuery = searchInput.value.trim().toLowerCase();
      filterCards();
    }, 200);
  });

  // Related tag click → search
  document.querySelectorAll('.glossary-card__related-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const query = tag.dataset.search.replace(/-/g, ' ');
      if (searchInput) {
        searchInput.value = query;
        searchQuery = query;
        filterCards();
        searchInput.focus();
      }
    });
  });

  // Initialize with any pre-filled search
  if (searchQuery) filterCards();
}
