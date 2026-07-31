import chaptersData from '../data/chapters.json';
import arcsData from '../data/arcs.json';
import chaptersFullData from '../content/chapters-full.json';
import { ornaments } from '../components/ornament.js';
import { getPrefs, markChapterComplete, isBookmarked, toggleBookmark } from '../utils/storage.js';
import { processReaderHTML } from '../utils/parser.js';

export async function renderReader(chapterId) {
  const ch = chaptersData.chapters.find(c => c.id === chapterId);
  if (!ch) return `<div class="container" style="padding:8rem 0;text-align:center"><h2>Jilid tidak ditemukan.</h2><a href="#/chapters" class="btn btn--gold">Kembali</a></div>`;

  const arc = arcsData.arcs.find(a => a.id === ch.arc);
  const prefs = getPrefs();
  const bookmarked = isBookmarked(chapterId);

  const prev = chaptersData.chapters.find(c => c.id === chapterId - 1);
  const next = chaptersData.chapters.find(c => c.id === chapterId + 1);

  // Get full text from parsed JSON
  const rawContent = chaptersFullData[chapterId] || chaptersFullData[String(chapterId)] || generatePlaceholderContent(ch);
  const { marked } = await import('marked');
  let html = marked.parse(rawContent);
  html = processReaderHTML(html);

  markChapterComplete(chapterId);

  return `
<div class="reader-page" data-reading-mode="${prefs.readingMode}" data-font-size="${prefs.fontSize}" id="reader-page">
  <!-- Reading progress bar -->
  <div class="reading-progress" id="reading-progress" role="progressbar" aria-label="Progress membaca" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
    <div class="reading-progress__fill" id="reading-progress-fill"></div>
  </div>

  <!-- Chapter header -->
  <header class="reader-header">
    <div class="reader-header__ornament" aria-hidden="true">
      ${ornaments.archFrame({ width: 260, height: 360, color: arc?.color || '#c9a84c' })}
    </div>
    <div class="reader-header__content">
      <nav class="reader-breadcrumb" aria-label="Lokasi dalam novel">
        <a href="#/chapters" class="reader-breadcrumb__link">Kitab Celah</a>
        <span class="reader-breadcrumb__sep" aria-hidden="true">·</span>
        <span class="reader-breadcrumb__arc" style="color:${arc?.color}">${arc?.title}</span>
        <span class="reader-breadcrumb__sep" aria-hidden="true">·</span>
        <span class="reader-breadcrumb__current" aria-current="page">Jilid ${ch.id}</span>
      </nav>
      <p class="reader-header__num" style="color:${arc?.color}" aria-label="Jilid ke-${ch.id}">
        Jilid ${String(ch.id).padStart(2,'0')}
      </p>
      <h1 class="reader-header__title" id="chapter-title">${ch.title}</h1>
      <p class="reader-header__altrea text-gold">${ch.altreaTitle}</p>
      <div class="reader-header__meta">
        <span class="reader-header__arc">${arc?.altreaTitle || ''}</span>
        <span class="reader-header__sep" aria-hidden="true">·</span>
        <span class="reader-header__time">~${ch.readingTime} menit membaca</span>
        <span class="reader-header__sep" aria-hidden="true">·</span>
        <span class="reader-header__progress-text">${ch.id} dari 32</span>
      </div>
      <div class="reader-header__divider" aria-hidden="true">
        ${ornaments.separator({ width: 240, color: arc?.color || '#c9a84c' })}
      </div>
    </div>
  </header>

  <!-- Content -->
  <article class="reader-content" id="reader-content" aria-labelledby="chapter-title">
    <div class="reader-content__inner reader-font-${prefs.fontSize}">
      ${html}
    </div>
  </article>

  <!-- Chapter footer -->
  <footer class="reader-footer">
    <div class="reader-footer__ornament" aria-hidden="true">
      ${ornaments.mandalaLg({ size: 80, color: arc?.color || '#c9a84c' })}
    </div>
    <p class="reader-footer__end">— Tamat Jilid ${ch.id}: ${ch.title} —</p>
    <div class="reader-footer__divider" aria-hidden="true">
      ${ornaments.separator({ width: 300 })}
    </div>
    <nav class="reader-nav" aria-label="Navigasi antar jilid">
      ${prev ? `
      <a href="#/read/${prev.id}" class="reader-nav__btn reader-nav__btn--prev" aria-label="Jilid sebelumnya: ${prev.title}">
        <span class="reader-nav__dir">← Jilid Sebelumnya</span>
        <span class="reader-nav__title">${prev.title}</span>
      </a>
      ` : `<div class="reader-nav__spacer"></div>`}
      <a href="#/chapters" class="reader-nav__all" aria-label="Kembali ke daftar jilid">
        ${ornaments.mandalaSm()}
        <span>Semua Jilid</span>
      </a>
      ${next ? `
      <a href="#/read/${next.id}" class="reader-nav__btn reader-nav__btn--next" aria-label="Jilid berikutnya: ${next.title}">
        <span class="reader-nav__dir">Jilid Berikutnya →</span>
        <span class="reader-nav__title">${next.title}</span>
      </a>
      ` : `<div class="reader-nav__spacer"></div>`}
    </nav>
  </footer>

  <!-- Floating controls -->
  <div class="reader-controls" id="reader-controls" role="toolbar" aria-label="Kontrol membaca">
    <button class="reader-ctrl-btn" id="ctrl-bookmark" aria-label="${bookmarked ? 'Hapus tandai' : 'Tandai jilid ini'}" aria-pressed="${bookmarked}" title="${bookmarked ? 'Hapus tandai' : 'Tandai'}">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="${bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M3 2h10v13l-5-3-5 3V2z"/>
      </svg>
    </button>

    <div class="reader-ctrl-group" role="group" aria-label="Ukuran teks">
      <button class="reader-ctrl-btn reader-ctrl-font ${prefs.fontSize === 'sm' ? 'is-active' : ''}" data-font="sm" aria-label="Teks kecil" aria-pressed="${prefs.fontSize==='sm'}">A</button>
      <button class="reader-ctrl-btn reader-ctrl-font ${prefs.fontSize === 'md' ? 'is-active' : ''}" data-font="md" aria-label="Teks sedang" aria-pressed="${prefs.fontSize==='md'}">A</button>
      <button class="reader-ctrl-btn reader-ctrl-font ${prefs.fontSize === 'lg' ? 'is-active' : ''}" data-font="lg" aria-label="Teks besar" aria-pressed="${prefs.fontSize==='lg'}">A</button>
      <button class="reader-ctrl-btn reader-ctrl-font ${prefs.fontSize === 'xl' ? 'is-active' : ''}" data-font="xl" aria-label="Teks sangat besar" aria-pressed="${prefs.fontSize==='xl'}">A</button>
    </div>

    <div class="reader-ctrl-group" role="group" aria-label="Mode membaca">
      <button class="reader-ctrl-btn reader-ctrl-mode ${prefs.readingMode === 'dark' ? 'is-active' : ''}" data-mode="dark" aria-label="Mode gelap" aria-pressed="${prefs.readingMode==='dark'}" title="Mode Gelap">◐</button>
      <button class="reader-ctrl-btn reader-ctrl-mode ${prefs.readingMode === 'void' ? 'is-active' : ''}" data-mode="void" aria-label="Mode void" aria-pressed="${prefs.readingMode==='void'}" title="Mode Void">●</button>
      <button class="reader-ctrl-btn reader-ctrl-mode ${prefs.readingMode === 'purple' ? 'is-active' : ''}" data-mode="purple" aria-label="Mode ungu" aria-pressed="${prefs.readingMode==='purple'}" title="Mode Ungu">◈</button>
      <button class="reader-ctrl-btn reader-ctrl-mode ${prefs.readingMode === 'sepia' ? 'is-active' : ''}" data-mode="sepia" aria-label="Mode sepia" aria-pressed="${prefs.readingMode==='sepia'}" title="Mode Sepia">○</button>
    </div>

    <button class="reader-ctrl-btn" id="ctrl-top" aria-label="Kembali ke atas" title="Ke atas">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M8 12V4M4 8l4-4 4 4"/>
      </svg>
    </button>
  </div>
</div>
`;
}

function generatePlaceholderContent(ch) {
  return `*[Konten jilid ${ch.id}: "${ch.title}" akan segera tersedia.]*

${ch.excerpt}

---

*— Tamat Jilid ${ch.id} —*`;
}
