import { ornaments } from '../components/ornament.js';
import arcsData from '../data/arcs.json';
import { getProgress } from '../utils/storage.js';

const RACES = [
  { name: 'Auren', altrea: 'Auren', desc: 'Yang lahir dari tekanan telapak tangan Duraen. Lambat berbicara, dalam berpikir. Mewariskan kebijaksanaan melalui tulang.', color: '#8b7355', icon: 'M8,2 Q12,0 16,2 L18,10 Q12,14 6,10 Z' },
  { name: 'Sylvaren', altrea: 'Sylvaren', desc: 'Yang lahir dari celah antara empat napas. Mata cermin sempurna yang memantulkan kebenaran terdalam. Mendengarkan apa yang tidak berani bersuara.', color: '#60519b', icon: 'M9,2 L10,7 L15,5 L12,9 L16,11 L11,11 L12,16 L9,13 L6,16 L7,11 L2,11 L6,9 L3,5 L8,7 Z' },
  { name: 'Vraen', altrea: 'Vraen', desc: 'Yang lahir dari ledakan cahaya oranye Ignar. Tidak bisa berdiam diri — kreativitas adalah fungsi biologis seperti bernapas.', color: '#c2603a', icon: 'M9,2 L10,8 L16,6 L11,10 L15,15 L9,12 L6,16 L6,10 L1,12 L6,7 Z' },
  { name: 'Vauren', altrea: 'Vauren', desc: 'Yang lahir dari kebiasaan hidup berdampingan. Tidak setengah dari keduanya, melainkan versi dari apa yang keduanya bisa menjadi.', color: '#5a9e6f', icon: 'M9,1 Q14,4 16,9 Q14,14 9,17 Q4,14 2,9 Q4,4 9,1 Z' },
  { name: 'Thael', altrea: 'Thael', desc: 'Yang datang dari laut. Berpikir dalam arus, bukan lapisan. Responsif tanpa kehilangan esensi. Hidup di permukaan antara hal-hal.', color: '#3a7ab5', icon: 'M9,2 Q16,2 16,9 Q16,16 9,16 Q2,16 2,9 Q2,2 9,2 M9,2 Q9,9 9,16 M2,9 Q9,9 16,9' },
  { name: 'Naevh', altrea: 'Naevh', desc: 'Yang turun dari langit. Memberi nama pada dirinya sendiri dari bahasa yang lebih tua dari semua bahasa. Matanya adalah jendela ke langit malam.', color: '#bfc0d1', icon: 'M9,1 L10,7 L16,5 L11,10 L15,16 L9,13 L3,16 L7,10 L2,5 L8,7 Z' }
];

const LOCATIONS = [
  { name: 'Danau Veirn', altrea: 'Veirn', desc: 'Memantulkan apa yang paling dalam tersimpan di hatimu — bukan wajahmu.' },
  { name: 'Dataran Aevorn', altrea: 'Aevorn', desc: 'Tanah tembaga yang menyimpan rasa, bukan sekadar peristiwa.' },
  { name: 'Hutan Isyael', altrea: 'Isyael', desc: 'Pohon yang tumbuh dari udara. Waktu berjalan berbeda di dalamnya.' },
  { name: 'Vaerundal', altrea: 'Vaerundal', desc: 'Kota pertama. "Tempat di mana kita setuju untuk berhenti berjalan."' },
];

const NAPAS = [
  { name: 'Ignar', desc: 'Api. Ambisi. Keinginan untuk ada.', color: '#c2603a' },
  { name: 'Vael', desc: 'Air. Memori. Rindu yang tak bertepi.', color: '#3a7ab5' },
  { name: 'Solmae', desc: 'Angin. Harapan. Rahasia di setiap tikungan nasib.', color: '#5a9e6f' },
  { name: 'Duraen', desc: 'Tanah. Kesabaran abadi. Cinta yang tidak perlu diucapkan.', color: '#8b7355' },
];

export function renderLanding() {
  const progress = getProgress();
  const hasStarted = progress.completed.length > 0;

  return `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__bg"></div>
  <div class="hero__particles" id="particles" aria-hidden="true"></div>
  <div class="hero__stained" aria-hidden="true">
    ${renderStainedGlass()}
  </div>
  <div class="hero__vignette" aria-hidden="true"></div>

  <div class="hero__content">
    <div class="hero__frame" aria-hidden="true">
      ${ornaments.archFrame({ width: 340, height: 500, animated: true })}
    </div>
    <div class="hero__text">
      <p class="hero__eyebrow reveal">— Karya ALSTRINE —</p>
      <h1 class="hero__title reveal reveal-delay-1" id="hero-title">
        <span class="hero__title-main">ALTREA</span>
        <span class="hero__title-sub">Kitab Penciptaan</span>
      </h1>
      <div class="hero__divider reveal reveal-delay-2" aria-hidden="true">
        ${ornaments.separator({ width: 280 })}
      </div>
      <p class="hero__tagline reveal reveal-delay-3">
        <em>"Pada mulanya, Altrea bukan kegelapan.<br>Kegelapan setidaknya memiliki kehadiran."</em>
      </p>
      <div class="hero__cta reveal reveal-delay-4">
        <a href="#/read/1" class="btn btn--primary hero__btn-primary">
          ${hasStarted ? `
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 2l8 5-8 5V2z"/></svg>
          Lanjutkan Membaca` : `
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 2l8 5-8 5V2z"/></svg>
          Mulai Membaca`}
        </a>
        <a href="#/chapters" class="btn btn--gold">
          Lihat Semua Jilid
        </a>
      </div>
    </div>
  </div>

  <div class="hero__scroll-hint" aria-hidden="true">
    <div class="hero__scroll-line"></div>
    <span class="hero__scroll-text">Gulir ke bawah</span>
  </div>
</section>

<!-- Sinopsis -->
<section class="section sinopsis" aria-labelledby="sinopsis-title">
  <div class="container">
    <div class="sinopsis__ornament-left" aria-hidden="true">
      ${ornaments.lancipFrame({ width: 80, height: 200, opacity: 0.4 })}
    </div>
    <div class="sinopsis__content">
      <div class="section-header reveal">
        <p class="section-eyebrow">Vael-Aevorn · Tentang Dunia Ini</p>
        <h2 class="section-title" id="sinopsis-title">Dunia yang Lahir dari Resonansi</h2>
        <div class="divider" aria-hidden="true"></div>
      </div>
      <div class="sinopsis__text reveal reveal-delay-1">
        <p>Pada mulanya, Altrea bukan kegelapan. Ia adalah ketiadaan yang sempurna — ruang antara dua tarikan napas yang belum pernah ada, keheningan di antara dua nada yang belum pernah lahir. Lalu sesuatu bergerak. Bukan makhluk. Bukan tuhan. Ia adalah <strong>Resonansi Pertama</strong>.</p>
        <p>Dari Resonansi itu lahirlah empat kesadaran purba: <strong>Ignar</strong> yang membakar, <strong>Vael</strong> yang menyimpan, <strong>Solmae</strong> yang berputar, dan <strong>Duraen</strong> yang menopang. Dari pergumulan mereka, terbentuklah sebuah dunia — dan dari dunia itu, lahirlah yang pertama berjalan.</p>
        <p><em>Kitab Penciptaan</em> adalah catatan tentang awal segalanya: ras-ras pertama yang muncul, kota yang dibangun di atas punggung kesadaran kuno, perang yang lahir dari kesalahpahaman, dan sesuatu yang turun dari langit untuk melengkapi yang selama ini terasa belum selesai.</p>
        <p class="sinopsis__altrea-note"><em>— "Di Altrea, tidak ada yang pernah benar-benar hilang. Hanya berpindah ke lapisan yang lebih dalam." —</em></p>
      </div>
    </div>
    <div class="sinopsis__ornament-right" aria-hidden="true">
      ${ornaments.lancipFrame({ width: 80, height: 200, opacity: 0.4 })}
    </div>
  </div>
</section>

<!-- Kenali Altrea: 3 Tabs -->
<section class="section world-section" aria-labelledby="world-title">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-eyebrow">Aevorn-Orn · Kenali Dunia</p>
      <h2 class="section-title" id="world-title">Dunia Altrea</h2>
      <div class="divider" aria-hidden="true"></div>
    </div>

    <div class="world-tabs" role="tablist" aria-label="Kategori dunia Altrea">
      <button class="world-tab is-active" role="tab" aria-selected="true" aria-controls="tab-ras" id="tab-btn-ras" data-tab="ras">
        <span class="world-tab__altrea">Vaedh-Celah</span>
        <span class="world-tab__label">Ras &amp; Makhluk</span>
      </button>
      <button class="world-tab" role="tab" aria-selected="false" aria-controls="tab-lokasi" id="tab-btn-lokasi" data-tab="lokasi">
        <span class="world-tab__altrea">Kaelith-Veirn</span>
        <span class="world-tab__label">Lokasi</span>
      </button>
      <button class="world-tab" role="tab" aria-selected="false" aria-controls="tab-napas" id="tab-btn-napas" data-tab="napas">
        <span class="world-tab__altrea">Ignar-Duraen</span>
        <span class="world-tab__label">Empat Napas</span>
      </button>
    </div>

    <!-- Ras -->
    <div id="tab-ras" role="tabpanel" aria-labelledby="tab-btn-ras" class="world-panel is-active">
      <div class="race-grid">
        ${RACES.map((r, i) => `
        <article class="race-card reveal reveal-delay-${(i%4)+1}" style="--race-color:${r.color}">
          <div class="race-card__corner race-card__corner--tl" aria-hidden="true">${ornaments.corner('tl', { color: r.color, size: 20 })}</div>
          <div class="race-card__corner race-card__corner--tr" aria-hidden="true">${ornaments.corner('tr', { color: r.color, size: 20 })}</div>
          <div class="race-card__icon" aria-hidden="true">
            <svg viewBox="0 0 18 18" fill="none" stroke="${r.color}" stroke-width="1" width="36" height="36">
              <path d="${r.icon}"/>
            </svg>
          </div>
          <h3 class="race-card__name">${r.name}</h3>
          <p class="race-card__altrea">${r.altrea}</p>
          <p class="race-card__desc">${r.desc}</p>
          <a href="#/glossary?q=${encodeURIComponent(r.name.toLowerCase())}" class="race-card__link">Pelajari lebih →</a>
        </article>
        `).join('')}
      </div>
    </div>

    <!-- Lokasi -->
    <div id="tab-lokasi" role="tabpanel" aria-labelledby="tab-btn-lokasi" class="world-panel" hidden>
      <div class="location-grid">
        ${LOCATIONS.map((l, i) => `
        <article class="location-card reveal reveal-delay-${(i%4)+1}">
          <div class="location-card__corner" aria-hidden="true">${ornaments.corner('tl', { size: 18 })}</div>
          <h3 class="location-card__name">${l.name}</h3>
          <p class="location-card__altrea text-gold">${l.altrea}</p>
          <p class="location-card__desc">${l.desc}</p>
        </article>
        `).join('')}
      </div>
    </div>

    <!-- Napas -->
    <div id="tab-napas" role="tabpanel" aria-labelledby="tab-btn-napas" class="world-panel" hidden>
      <div class="napas-grid">
        ${NAPAS.map((n, i) => `
        <article class="napas-card reveal reveal-delay-${(i%4)+1}" style="--napas-color:${n.color}">
          <div class="napas-card__glow" aria-hidden="true"></div>
          <h3 class="napas-card__name">${n.name}</h3>
          <p class="napas-card__desc">${n.desc}</p>
        </article>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- Arc Preview -->
<section class="section arc-preview" aria-labelledby="arc-title">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-eyebrow">Resonansi-Celah · Perjalanan</p>
      <h2 class="section-title" id="arc-title">Enam Bagian Kisah</h2>
      <div class="divider" aria-hidden="true"></div>
    </div>
    <div class="arc-grid">
      ${arcsData.arcs.map((arc, i) => `
      <a href="#/chapters" class="arc-card reveal reveal-delay-${(i%3)+1}" style="--arc-color:${arc.color}" aria-label="${arc.title}: ${arc.altreaTitle}">
        <div class="arc-card__bg" style="background-image:url('/images/arc-${arc.id}.jpg')" aria-hidden="true"></div>
        <div class="arc-card__overlay" aria-hidden="true"></div>
        <div class="arc-card__content">
          <div class="arc-card__number">Arc ${arc.id}</div>
          <h3 class="arc-card__title">${arc.title}</h3>
          <p class="arc-card__altrea">${arc.altreaTitle}</p>
          <p class="arc-card__meaning"><em>${arc.altreaMeaning}</em></p>
          <p class="arc-card__range">Jilid ${arc.chapters[0]}–${arc.chapters[arc.chapters.length-1]}</p>
        </div>
        <div class="arc-card__bar"></div>
      </a>
      `).join('')}
    </div>
    <div class="arc-preview__cta reveal">
      ${ornaments.separator({ width: 300 })}
      <a href="#/read/1" class="btn btn--primary arc-preview__btn">
        Mulai dari Awal — Jilid Pertama
      </a>
    </div>
  </div>
</section>
`;
}

function renderStainedGlass() {
  // CSS-based stained glass effect
  return `<div class="stained-glass">
    <div class="stained-pane stained-pane--1"></div>
    <div class="stained-pane stained-pane--2"></div>
    <div class="stained-pane stained-pane--3"></div>
    <div class="stained-arch stained-arch--1"></div>
    <div class="stained-arch stained-arch--2"></div>
    <div class="stained-arch stained-arch--3"></div>
    <div class="stained-light"></div>
  </div>`;
}
