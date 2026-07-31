import arcsData from '../data/arcs.json';
import { getProgress } from '../utils/storage.js';

/**
 * Navbar component
 * States: default | scrolled | reading
 */
export function renderNavbar(activePage = 'home', chapterNum = null) {
  const progress = getProgress();
  const totalRead = progress.completed.length;
  const pct = Math.round((totalRead / 32) * 100);

  const isReading = activePage === 'reader';

  return `
<a href="#main-content" class="skip-link">Lewati ke konten utama</a>
<nav class="navbar" id="navbar" role="navigation" aria-label="Navigasi utama">
  <div class="navbar__inner">
    <a href="#/" class="navbar__logo" aria-label="Altrea - Beranda">
      <span class="navbar__logo-text">ALTREA</span>
      <span class="navbar__logo-sub">Kitab Penciptaan</span>
    </a>

    <ul class="navbar__links" role="list">
      <li><a href="#/" class="navbar__link ${activePage==='home'?'is-active':''}" data-altrea="Aevorn">Beranda</a></li>
      <li><a href="#/chapters" class="navbar__link ${activePage==='chapters'||isReading?'is-active':''}" data-altrea="Kitab Celah">Jilid</a></li>
      <li><a href="#/glossary" class="navbar__link ${activePage==='glossary'?'is-active':''}" data-altrea="Kitab Nama">Glossarium</a></li>
    </ul>

    ${isReading && chapterNum ? `
    <div class="navbar__reading-info">
      <span class="navbar__chapter-label">Jilid ${chapterNum}</span>
    </div>
    ` : ''}

    <div class="navbar__actions">
      ${totalRead > 0 && !isReading ? `
      <a href="#/chapters" class="navbar__progress-pill" title="${totalRead} dari 32 jilid selesai">
        <span class="navbar__progress-fill" style="width:${pct}%"></span>
        <span class="navbar__progress-text">${totalRead}/32</span>
      </a>
      ` : ''}
      ${progress.lastRead && !isReading ? `
      <a href="#/read/${progress.lastRead}" class="btn btn--gold navbar__resume" aria-label="Lanjutkan membaca jilid ${progress.lastRead}">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <path d="M3 2l8 5-8 5V2z"/>
        </svg>
        Lanjutkan
      </a>
      ` : ''}
      <button class="navbar__hamburger" id="navbar-toggle" aria-label="Buka menu" aria-expanded="false" aria-controls="navbar-mobile">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  <div class="navbar__mobile" id="navbar-mobile" role="dialog" aria-label="Menu navigasi" hidden>
    <div class="navbar__mobile-inner">
      <ul class="navbar__mobile-links" role="list">
        <li><a href="#/" class="navbar__mobile-link">
          <span class="navbar__mobile-altrea">Aevorn</span>
          <span class="navbar__mobile-label">Beranda</span>
        </a></li>
        <li><a href="#/chapters" class="navbar__mobile-link">
          <span class="navbar__mobile-altrea">Kitab Celah</span>
          <span class="navbar__mobile-label">Daftar Jilid</span>
        </a></li>
        <li><a href="#/glossary" class="navbar__mobile-link">
          <span class="navbar__mobile-altrea">Kitab Nama</span>
          <span class="navbar__mobile-label">Glossarium</span>
        </a></li>
      </ul>
      <p class="navbar__mobile-quote">"Nama adalah perjanjian antara yang menamai dan yang dinamai."</p>
    </div>
  </div>
</nav>`;
}

/**
 * Attach navbar behaviors after render
 */
export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbar-toggle');
  const mobile = document.getElementById('navbar-mobile');

  // Scroll effect
  const onScroll = () => {
    navbar?.classList.toggle('is-scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.classList.toggle('is-open', !isOpen);
    if (mobile) {
      mobile.hidden = isOpen;
    }
  });

  // Close mobile on link click
  mobile?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.classList.remove('is-open');
      if (mobile) mobile.hidden = true;
    });
  });
}
