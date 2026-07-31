import { toggleBookmark, setPrefs, getPrefs } from '../utils/storage.js';

export function initReader() {
  // Move #reader-controls to document.body so position:fixed is relative to window, not animated container
  const controls = document.getElementById('reader-controls');
  if (controls && controls.parentElement !== document.body) {
    document.body.appendChild(controls);
  }

  initReadingProgress();
  initReaderControls();
  initScrollToTop();
}

function initReadingProgress() {
  const content = document.getElementById('reader-content');
  const fill = document.getElementById('reading-progress-fill');
  const bar = document.getElementById('reading-progress');
  if (!content || !fill) return;

  const update = () => {
    const rect = content.getBoundingClientRect();
    const contentHeight = content.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrolled = -rect.top + windowHeight * 0.3;
    const pct = Math.min(100, Math.max(0, (scrolled / contentHeight) * 100));
    fill.style.width = pct + '%';
    bar?.setAttribute('aria-valuenow', Math.round(pct));
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initReaderControls() {
  const page = document.getElementById('reader-page');
  const prefs = getPrefs();

  // Bookmark
  const bookmarkBtn = document.getElementById('ctrl-bookmark');
  bookmarkBtn?.addEventListener('click', () => {
    const chId = parseInt(window.location.hash.match(/\/read\/(\d+)/)?.[1]);
    if (!chId) return;
    const isNowBookmarked = toggleBookmark(chId);
    bookmarkBtn.setAttribute('aria-pressed', String(isNowBookmarked));
    const svg = bookmarkBtn.querySelector('svg');
    if (svg) svg.setAttribute('fill', isNowBookmarked ? 'currentColor' : 'none');
    showToast(isNowBookmarked ? 'Jilid ditandai · Vael' : 'Tanda dihapus');
  });

  // Font size
  document.querySelectorAll('.reader-ctrl-font').forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.font;
      document.querySelectorAll('.reader-ctrl-font').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      const inner = document.querySelector('.reader-content__inner');
      if (inner) {
        inner.className = inner.className.replace(/reader-font-\w+/, '');
        inner.classList.add(`reader-font-${size}`);
      }
      setPrefs({ fontSize: size });
    });
  });

  // Reading mode
  document.querySelectorAll('.reader-ctrl-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      document.querySelectorAll('.reader-ctrl-mode').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      if (page) page.setAttribute('data-reading-mode', mode);
      setPrefs({ readingMode: mode });
    });
  });

  // Mobile dropdown panel toggle
  const toggleBtn = document.getElementById('ctrl-toggle');
  const panel = document.getElementById('controls-panel');

  toggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    panel?.classList.toggle('is-open', !isOpen);
  });

  // Close panel on click outside (mobile)
  document.addEventListener('click', (e) => {
    if (panel?.classList.contains('is-open') && !e.target.closest('#reader-controls')) {
      toggleBtn?.setAttribute('aria-expanded', 'false');
      panel?.classList.remove('is-open');
    }
  });
}

function initScrollToTop() {
  const btn = document.getElementById('ctrl-top');
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showToast(message) {
  const existing = document.getElementById('reader-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'reader-toast';
  toast.className = 'reader-toast';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 400);
    }, 2000);
  });
}
