import { renderNavbar, initNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderLanding } from './pages/landing.js';
import { renderChapters } from './pages/chapters.js';
import { renderReader } from './pages/reader.js';
import { renderGlossary } from './pages/glossary.js';
import './styles/index.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/landing.css';
import './styles/chapters.css';
import './styles/reader.css';
import './styles/glossary.css';

const app = document.getElementById('app');

// ── Route definitions ────────────────────────────────────────
const routes = {
  '/':          { page: 'home',     render: renderLanding },
  '/chapters':  { page: 'chapters', render: renderChapters },
  '/glossary':  { page: 'glossary', render: renderGlossary },
};

// ── Router ───────────────────────────────────────────────────
async function navigate() {
  const hash = window.location.hash.slice(1) || '/';
  const url = new URL(hash, 'http://x');
  const path = url.pathname;

  // Reading route: #/read/:id
  const readMatch = path.match(/^\/read\/(\d+)$/);
  if (readMatch) {
    const id = parseInt(readMatch[1]);
    await renderPage('reader', async () => renderReader(id), id);
    return;
  }

  // Glossary with search param
  if (path === '/glossary') {
    const q = url.searchParams.get('q') || '';
    await renderPage('glossary', () => renderGlossary(q));
    return;
  }

  const route = routes[path] || routes['/'];
  await renderPage(route.page, route.render);
}

async function renderPage(pageKey, renderFn, param = null) {
  // Update document title
  const titles = {
    home: 'Altrea: Kitab Penciptaan',
    chapters: 'Daftar Jilid — Altrea',
    glossary: 'Glossarium — Altrea',
    reader: `Membaca — Altrea`
  };
  document.title = titles[pageKey] || 'Altrea';

  // Cleanup any floating reader controls from body when switching pages
  document.getElementById('reader-controls')?.remove();

  // Render
  const navHTML = renderNavbar(pageKey, param);
  const pageHTML = await renderFn();
  const footHTML = renderFooter();

  app.innerHTML = `
    ${navHTML}
    <main id="main-content" class="page" tabindex="-1">
      ${pageHTML}
    </main>
    ${footHTML}
  `;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Init behaviors
  initNavbar();
  // Delay observer to next frame so DOM layout is complete
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initRevealObserver();
    });
  });
  initPageBehaviors(pageKey);
}

// ── IntersectionObserver for scroll reveals ──────────────────
function initRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
    observer.observe(el);
  });
}

// ── Page-specific behaviors ──────────────────────────────────
function initPageBehaviors(pageKey) {
  if (pageKey === 'home') initLandingBehaviors();
  if (pageKey === 'reader') initReaderBehaviors();
  if (pageKey === 'chapters') initChaptersBehaviors();
  if (pageKey === 'glossary') initGlossaryBehaviors();
}

function initLandingBehaviors() {
  // Dynamic import to keep landing JS separate
  import('./pages/landing-behaviors.js').then(m => m.initLanding?.());
}

function initReaderBehaviors() {
  import('./pages/reader-behaviors.js').then(m => m.initReader?.());
}

function initChaptersBehaviors() {
  import('./pages/chapters-behaviors.js').then(m => m.initChapters?.());
}

function initGlossaryBehaviors() {
  import('./pages/glossary-behaviors.js').then(m => m.initGlossary?.());
}

// ── Boot ─────────────────────────────────────────────────────
window.addEventListener('hashchange', navigate);
navigate();
