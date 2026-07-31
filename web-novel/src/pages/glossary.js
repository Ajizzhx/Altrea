import glossaryData from '../data/glossary.json';
import { ornaments } from '../components/ornament.js';

const CATEGORIES = [
  { id: 'all', label: 'Semua', altrea: 'Aevorn' },
  { id: 'ras', label: 'Ras & Makhluk', altrea: 'Vaedh-Celah' },
  { id: 'lokasi', label: 'Lokasi', altrea: 'Kaelith' },
  { id: 'konsep', label: 'Konsep', altrea: 'Resonansi' },
  { id: 'karakter', label: 'Karakter', altrea: 'Nama' },
  { id: 'napas', label: 'Empat Napas', altrea: 'Vael-Ignar' },
  { id: 'bahasa', label: 'Bahasa Altrea', altrea: 'Vaerith' },
];

const CATEGORY_COLORS = {
  ras: '#60519b',
  lokasi: '#3a7ab5',
  konsep: '#c9a84c',
  karakter: '#5a9e6f',
  napas: '#c2603a',
  bahasa: '#bfc0d1',
};

export function renderGlossary(searchQuery = '') {
  return `
<div class="glossary-page">
  <!-- Header -->
  <header class="glossary-header">
    <div class="glossary-header__bg" aria-hidden="true"></div>
    <div class="container">
      <div class="glossary-header__ornament" aria-hidden="true">
        ${ornaments.separator({ width: 300 })}
      </div>
      <p class="section-eyebrow">Kitab Nama · Vael-Aevorn</p>
      <h1 class="glossary-header__title">Glossarium Dunia Altrea</h1>
      <p class="glossary-header__sub">"Nama adalah perjanjian antara yang menamai dan yang dinamai."</p>
      <div class="glossary-header__ornament" aria-hidden="true">
        ${ornaments.separator({ width: 300 })}
      </div>

      <!-- Search -->
      <div class="glossary-search" role="search">
        <label for="glossary-search-input" class="sr-only">Cari dalam glossarium</label>
        <div class="glossary-search__wrapper">
          <svg class="glossary-search__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <circle cx="7" cy="7" r="5"/><path d="m11 11 3 3"/>
          </svg>
          <input 
            type="search" 
            id="glossary-search-input"
            class="glossary-search__input"
            placeholder="Cari nama, konsep, tempat..."
            value="${searchQuery}"
            aria-label="Cari dalam glossarium"
            autocomplete="off"
          />
          <span class="glossary-search__hint">Menemukan</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Filter Tabs -->
  <nav class="glossary-filter" aria-label="Filter kategori glossarium">
    <div class="container">
      <div class="glossary-filter__tabs" role="tablist">
        ${CATEGORIES.map(cat => `
        <button class="glossary-filter__tab ${cat.id === 'all' ? 'is-active' : ''}"
          role="tab" aria-selected="${cat.id === 'all'}" 
          data-category="${cat.id}"
          aria-controls="glossary-entries"
          title="${cat.altrea}">
          <span class="glossary-filter__altrea">${cat.altrea}</span>
          <span class="glossary-filter__label">${cat.label}</span>
        </button>
        `).join('')}
      </div>
    </div>
  </nav>

  <!-- Entries -->
  <main class="glossary-main" id="main-content">
    <div class="container">
      <div class="glossary-count" role="status" aria-live="polite" id="glossary-count">
        <span id="glossary-count-num">${glossaryData.entries.length}</span> entri
      </div>
      <div class="glossary-grid" id="glossary-entries" role="list">
        ${glossaryData.entries.map((entry, i) => `
        <article 
          class="glossary-card reveal reveal-delay-${(i%5)+1}"
          data-category="${entry.category}"
          data-name="${entry.name.toLowerCase()}"
          data-altrea="${entry.altreaName.toLowerCase()}"
          data-desc="${entry.description.toLowerCase()}"
          role="listitem"
          style="--entry-color:${CATEGORY_COLORS[entry.category] || '#c9a84c'}"
        >
          <div class="glossary-card__corner glossary-card__corner--tl" aria-hidden="true">
            ${ornaments.corner('tl', { color: CATEGORY_COLORS[entry.category] || '#c9a84c', size: 16 })}
          </div>
          <div class="glossary-card__corner glossary-card__corner--br" aria-hidden="true">
            ${ornaments.corner('br', { color: CATEGORY_COLORS[entry.category] || '#c9a84c', size: 16 })}
          </div>
          
          <div class="glossary-card__header">
            <span class="glossary-card__category badge" style="color:${CATEGORY_COLORS[entry.category]};border-color:${CATEGORY_COLORS[entry.category]}40;background:${CATEGORY_COLORS[entry.category]}15">
              ${getCategoryLabel(entry.category)}
            </span>
            ${entry.firstChapter ? `
            <a href="#/read/${entry.firstChapter}" class="glossary-card__chapter-link" aria-label="Pertama muncul di Jilid ${entry.firstChapter}">
              Jilid ${entry.firstChapter} →
            </a>` : ''}
          </div>

          <h2 class="glossary-card__name">${entry.name}</h2>
          <p class="glossary-card__altrea text-gold">${entry.altreaName}</p>
          <p class="glossary-card__desc">${entry.description}</p>

          ${entry.relatedEntries?.length ? `
          <div class="glossary-card__related">
            <span class="glossary-card__related-label">Lihat juga:</span>
            ${entry.relatedEntries.slice(0,3).map(rel => `
            <button class="glossary-card__related-tag" data-search="${rel}" aria-label="Cari ${rel}">${rel.replace(/-/g,' ')}</button>
            `).join('')}
          </div>
          ` : ''}
        </article>
        `).join('')}
      </div>
      <div class="glossary-empty" id="glossary-empty" hidden>
        <div class="glossary-empty__ornament" aria-hidden="true">
          ${ornaments.mandalaSm()}
        </div>
        <p class="glossary-empty__text">Tidak ada entri yang cocok dengan pencarianmu.</p>
        <p class="glossary-empty__sub"><em>"Mungkin nama itu belum lahir."</em></p>
      </div>
    </div>
  </main>
</div>
`;
}

function getCategoryLabel(cat) {
  const labels = { ras: 'Ras', lokasi: 'Lokasi', konsep: 'Konsep', karakter: 'Karakter', napas: 'Napas', bahasa: 'Bahasa' };
  return labels[cat] || cat;
}
