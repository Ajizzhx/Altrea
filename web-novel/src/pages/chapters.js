import arcsData from '../data/arcs.json';
import chaptersData from '../data/chapters.json';
import { ornaments } from '../components/ornament.js';
import { getProgress, isCompleted, isBookmarked } from '../utils/storage.js';

export function renderChapters() {
  const progress = getProgress();
  const totalRead = progress.completed.length;
  const pct = Math.round((totalRead / 32) * 100);

  return `
<div class="chapters-page">
  <!-- Header -->
  <header class="chapters-header">
    <div class="chapters-header__bg" aria-hidden="true"></div>
    <div class="container">
      <div class="chapters-header__ornament" aria-hidden="true">
        ${ornaments.separator({ width: 280 })}
      </div>
      <p class="section-eyebrow">Kitab Celah · Resonansi Celah</p>
      <h1 class="chapters-header__title">Daftar Jilid</h1>
      <p class="chapters-header__sub">Kitab Pertama: Sebelum Nama Ada Sejarah</p>
      <div class="chapters-header__ornament" aria-hidden="true">
        ${ornaments.separator({ width: 280 })}
      </div>

      ${totalRead > 0 ? `
      <div class="chapters-progress" role="progressbar" aria-valuenow="${totalRead}" aria-valuemin="0" aria-valuemax="32" aria-label="${totalRead} dari 32 jilid selesai">
        <div class="chapters-progress__bar">
          <div class="chapters-progress__fill" style="width:${pct}%"></div>
        </div>
        <div class="chapters-progress__info">
          <span class="chapters-progress__text">${totalRead} <span class="text-gold">dari</span> 32 jilid</span>
          <span class="chapters-progress__pct">${pct}%</span>
        </div>
      </div>
      ` : `
      <p class="chapters-header__hint">Belum ada jilid yang dibaca. Mulai perjalananmu.</p>
      `}
    </div>
  </header>

  <!-- Filter -->
  <nav class="chapters-filter" aria-label="Filter berdasarkan bagian cerita">
    <div class="container">
      <div class="chapters-filter__inner" role="list">
        <button class="chapters-filter__btn is-active" data-arc="all" role="listitem" aria-pressed="true">
          <span>Semua Jilid</span>
        </button>
        ${arcsData.arcs.map(arc => `
        <button class="chapters-filter__btn" data-arc="${arc.id}" role="listitem" aria-pressed="false" style="--arc-color:${arc.color}">
          <span class="chapters-filter__arc-dot" aria-hidden="true"></span>
          <span>Arc ${arc.id}</span>
          <span class="chapters-filter__arc-name">${arc.title}</span>
        </button>
        `).join('')}
      </div>
    </div>
  </nav>

  <!-- Chapter List -->
  <main class="chapters-main" id="main-content">
    <div class="container">
      ${arcsData.arcs.map(arc => `
      <section class="arc-section" data-arc="${arc.id}" aria-labelledby="arc-${arc.id}-title">
        <div class="arc-section__header">
          <div class="arc-section__ornament" aria-hidden="true">
            ${ornaments.arcHeader({ color: arc.color, width: 500 })}
          </div>
          <div class="arc-section__info">
            <span class="arc-section__number" style="color:${arc.color}">Bagian ${arc.id}</span>
            <h2 class="arc-section__title" id="arc-${arc.id}-title">${arc.title}</h2>
            <p class="arc-section__altrea text-gold">${arc.altreaTitle}</p>
            <p class="arc-section__meaning"><em>${arc.altreaMeaning}</em></p>
          </div>
          <div class="arc-section__ornament" aria-hidden="true">
            ${ornaments.arcHeader({ color: arc.color, width: 500 })}
          </div>
        </div>

        <div class="chapter-grid" role="list">
          ${arc.chapters.map(chId => {
            const ch = chaptersData.chapters.find(c => c.id === chId);
            if (!ch) return '';
            const done = isCompleted(chId);
            const bookmarked = isBookmarked(chId);
            const isLast = progress.lastRead === chId;
            return `
          <article class="chapter-card ${done ? 'is-completed' : ''} ${isLast ? 'is-current' : ''}" 
            data-arc="${arc.id}" role="listitem" style="--arc-color:${arc.color}">
            <div class="chapter-card__corner chapter-card__corner--tl" aria-hidden="true">${ornaments.corner('tl', { color: arc.color, size: 18 })}</div>
            <div class="chapter-card__corner chapter-card__corner--br" aria-hidden="true">${ornaments.corner('br', { color: arc.color, size: 18 })}</div>
            
            <div class="chapter-card__header">
              <span class="chapter-card__num" aria-label="Jilid ke-${ch.id}">${String(ch.id).padStart(2,'0')}</span>
              <div class="chapter-card__badges">
                ${done ? `<span class="badge badge--read" aria-label="Sudah dibaca">✓ Selesai</span>` : ''}
                ${isLast ? `<span class="badge badge--arc" aria-label="Terakhir dibaca">Terakhir dibaca</span>` : ''}
                ${bookmarked ? `<span class="badge badge--read" aria-label="Ditandai">⊙ Ditandai</span>` : ''}
              </div>
            </div>

            <h3 class="chapter-card__title">
              <a href="#/read/${ch.id}" class="chapter-card__link" aria-label="Baca Jilid ${ch.id}: ${ch.title}">
                ${ch.title}
              </a>
            </h3>
            <p class="chapter-card__altrea">${ch.altreaTitle}</p>
            <p class="chapter-card__excerpt">${ch.excerpt}</p>

            <div class="chapter-card__footer">
              <span class="chapter-card__time" aria-label="Estimasi ${ch.readingTime} menit membaca">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zm.5 5.207V3a.5.5 0 00-1 0v3.5a.5.5 0 00.247.433l2 1.154.5-.866L6.5 6.207z"/></svg>
                ~${ch.readingTime} menit
              </span>
              <a href="#/read/${ch.id}" class="chapter-card__read-btn" aria-label="Baca jilid ${ch.id}">
                ${done ? 'Baca ulang →' : 'Mulai baca →'}
              </a>
            </div>
          </article>
          `;
          }).join('')}
        </div>
      </section>
      `).join('')}
    </div>
  </main>
</div>
`;
}
