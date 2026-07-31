/**
 * Landing page behaviors: particles, tabs, etc.
 */
export function initLanding() {
  initParticles();
  initWorldTabs();
}

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = window.matchMedia('(max-width: 768px)').matches ? 50 : 100;
  const particles = [];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const isGold = Math.random() > 0.6;
    const isStar = Math.random() > 0.85;
    p.className = `particle ${isGold ? 'particle--gold' : 'particle--purple'} ${isStar ? 'particle--star' : ''}`;

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = isStar ? Math.random() * 3 + 1 : Math.random() * 2 + 0.5;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 10;

    p.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${Math.random() * 0.6 + 0.1};
    `;

    container.appendChild(p);
    particles.push(p);
  }

  // Shooting stars
  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'particle particle--shooting';
    star.style.cssText = `
      left: ${Math.random() * 60 + 10}%;
      top: ${Math.random() * 40}%;
      animation-duration: ${Math.random() * 1.5 + 0.8}s;
    `;
    container.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
  }

  setInterval(createShootingStar, 4000);
  setTimeout(createShootingStar, 1500);
}

function initWorldTabs() {
  const tabs = document.querySelectorAll('.world-tab');
  const panels = document.querySelectorAll('.world-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => {
        p.classList.remove('is-active');
        p.hidden = true;
      });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) {
        panel.classList.add('is-active');
        panel.hidden = false;

        // Re-trigger reveal animations
        panel.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          requestAnimationFrame(() => {
            setTimeout(() => el.classList.add('visible'), 50);
          });
        });
      }
    });
  });
}
