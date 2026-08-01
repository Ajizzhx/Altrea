<div align="center">

# 📜 ALTREA — Kitab Penciptaan
## Dokumen Teknis Proyek

**Versi:** 1.0.0 &nbsp;|&nbsp; **Terakhir Diperbarui:** 2026-08-01 &nbsp;|&nbsp; **Status:** ✅ Release  
**Penulis:** ALSTRINE &nbsp;|&nbsp; **Live:** [altrea-pied.vercel.app](https://altrea-pied.vercel.app/)

</div>

---

# Daftar Isi

1. [Dokumen Requirement (SRS)](#1--dokumen-requirement-srs)
2. [Arsitektur Teknis](#2--arsitektur-teknis)
3. [Desain UI/UX](#3--desain-uiux)
4. [Design System & Token](#4--design-system--token)
5. [Spesifikasi Halaman](#5--spesifikasi-halaman)
6. [Data & Content Schema](#6--data--content-schema)
7. [State Management](#7--state-management)
8. [Performance & SEO](#8--performance--seo)
9. [Aksesibilitas](#9--aksesibilitas)
10. [Roadmap & Changelog](#10--roadmap--changelog)
11. [Inventaris File](#11--inventaris-file)

---

# 1 — Dokumen Requirement (SRS)

## 1.1 Ringkasan Proyek

**Altrea: Kitab Penciptaan** adalah web novel kosmologi fantasy interaktif yang menyajikan 32 jilid cerita penciptaan dunia Altrea dalam format baca digital berbasis browser. Proyek ini bertujuan menghadirkan pengalaman membaca yang *imersif* — bukan sekadar menampilkan teks, melainkan menghilangkan jarak antara pembaca dan dunia Altrea melalui estetika visual yang khas.

## 1.2 Visi Desain

> *"Seperti Danau Veirn yang memantulkan kejujuran — antarmuka ini bukan sekadar wadah teks, melainkan perpanjangan dunia yang diceritakannya."*

- **Atmosfer**: Dark mystical cathedral × celestial ancient codex × Islamic geometric ornament
- **Emosi Target**: Tenang, agung, misterius, intim
- **Referensi Visual**: Stained glass katedral gelap + ornamen emas geometrik Islam + palette ungu kosmik

## 1.3 Target Pengguna

| Segmen | Karakteristik | Kebutuhan Utama |
|--------|--------------|-----------------|
| **Pembaca Fantasy** | 16–35 tahun, terbiasa web novel | Kenyamanan baca, estetika imersif |
| **Pembaca Kasual** | Ditemukan via share/social media | Kesan pertama kuat, navigasi intuitif |
| **Koleksionis Lore** | Menghargai worldbuilding mendalam | Glossarium, progress tracking, detail dunia |

## 1.4 Functional Requirements

### FR-01: Landing Page
| ID | Requirement | Status |
|----|-------------|--------|
| FR-01.1 | Hero section dengan judul animasi, tagline, dan particle system | ✅ Selesai |
| FR-01.2 | Ornamen SVG animasi (arch frame + mandala berputar) | ✅ Selesai |
| FR-01.3 | CTA: "Mulai Membaca" + "Lihat Semua Jilid" | ✅ Selesai |
| FR-01.4 | Sinopsis singkat dunia Altrea (centered, dengan ornamen) | ✅ Selesai |
| FR-01.5 | Tab kategori interaktif: Ras, Lokasi, Konsep, Napas | ✅ Selesai |
| FR-01.6 | Preview 6 Arc cerita dengan kartu ilustrasi 2D Concept Art | ✅ Selesai |
| FR-01.7 | Parallax background dunia (`world-bg.jpg`) | ✅ Selesai |
| FR-01.8 | Light rays stained glass effect + shooting stars + star particles | ✅ Selesai |

### FR-02: Halaman Daftar Jilid
| ID | Requirement | Status |
|----|-------------|--------|
| FR-02.1 | Grid 32 jilid dengan judul, excerpt, dan estimasi waktu baca | ✅ Selesai |
| FR-02.2 | Status baca (Sudah / Belum) dari `localStorage` | ✅ Selesai |
| FR-02.3 | Filter berdasarkan 6 Arc cerita (sticky filter bar) | ✅ Selesai |
| FR-02.4 | Progress bar keseluruhan novel (persentase) | ✅ Selesai |
| FR-02.5 | Badge "Selesai" dan "Ditandai" per jilid | ✅ Selesai |
| FR-02.6 | Animasi hover card dengan ornamen emas | ✅ Selesai |

### FR-03: Halaman Baca (Reader)
| ID | Requirement | Status |
|----|-------------|--------|
| FR-03.1 | Render teks utuh Markdown ke HTML (32 jilid penuh) | ✅ Selesai |
| FR-03.2 | Reading progress bar horizontal di atas halaman | ✅ Selesai |
| FR-03.3 | Kontrol ukuran font: S / M / L / XL | ✅ Selesai |
| FR-03.4 | 4 mode membaca: Dark, Void, Purple, Sepia | ✅ Selesai |
| FR-03.5 | Navigasi prev/next jilid | ✅ Selesai |
| FR-03.6 | Breadcrumb posisi: "Jilid X dari 32" | ✅ Selesai |
| FR-03.7 | Bookmark jilid (simpan/hapus di localStorage) | ✅ Selesai |
| FR-03.8 | Auto-save progress "Terakhir Dibaca" | ✅ Selesai |
| FR-03.9 | Drop cap pada paragraf pertama | ✅ Selesai |
| FR-03.10 | Pull quotes untuk dialog penting | ✅ Selesai |
| FR-03.11 | Ornamental divider SVG pengganti `<hr>` | ✅ Selesai |
| FR-03.12 | Floating controls (Desktop: sidebar kanan, Mobile: FAB + dropdown sheet) | ✅ Selesai |
| FR-03.13 | Header arch frame dengan ilustrasi Arc + gradient fade | ✅ Selesai |
| FR-03.14 | Estimasi waktu baca per jilid | ✅ Selesai |

### FR-04: Halaman Glossarium
| ID | Requirement | Status |
|----|-------------|--------|
| FR-04.1 | Daftar entri: Ras, Lokasi, Konsep, Karakter, Napas, Bahasa | ✅ Selesai |
| FR-04.2 | Pencarian realtime (instant filter saat mengetik) | ✅ Selesai |
| FR-04.3 | Filter kategori interaktif dengan tab toggle | ✅ Selesai |
| FR-04.4 | Tag relasi antar-entri (klik tag → pencarian instan) | ✅ Selesai |
| FR-04.5 | Rujukan ke jilid terkait (tautan langsung ke reader) | ✅ Selesai |
| FR-04.6 | Mendukung query parameter URL (`#/glossary?q=veirn`) | ✅ Selesai |

### FR-05: Komponen Global
| ID | Requirement | Status |
|----|-------------|--------|
| FR-05.1 | Navbar glassmorphism sticky dengan blur saat scroll | ✅ Selesai |
| FR-05.2 | Menu mobile hamburger dengan overlay fullscreen | ✅ Selesai |
| FR-05.3 | Progress pill di navbar (X/32 jilid selesai) | ✅ Selesai |
| FR-05.4 | Tombol "Lanjutkan Membaca" di navbar | ✅ Selesai |
| FR-05.5 | Footer dengan ornamen mandala dan copyright | ✅ Selesai |
| FR-05.6 | Skip-link aksesibilitas ("Lewati ke konten utama") | ✅ Selesai |
| FR-05.7 | Scroll reveal animation (IntersectionObserver) | ✅ Selesai |

## 1.5 Non-Functional Requirements

| Kategori | Spesifikasi | Status |
|----------|-------------|--------|
| **Performance** | First Contentful Paint < 2s | ✅ |
| **Responsiveness** | Mobile 320px hingga Desktop 2560px | ✅ |
| **Accessibility** | WCAG 2.1 AA (kontras, keyboard nav, ARIA labels) | ✅ |
| **Browser Support** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | ✅ |
| **SEO** | Meta tags lengkap, Open Graph tags | ✅ |
| **Storage** | `localStorage` untuk progress, bookmark, preferensi | ✅ |
| **Bahasa UI** | Bahasa Indonesia (i18n Inggris: *future*) | ⏳ |

---

# 2 — Arsitektur Teknis

## 2.1 Stack Teknologi

| Lapisan | Teknologi | Versi | Fungsi |
|---------|-----------|-------|--------|
| **Bundler** | Vite | 8.2.x | Dev server, HMR, production build |
| **Language** | Vanilla JavaScript | ES2022+ | Logika aplikasi, routing, DOM rendering |
| **Styling** | Vanilla CSS | CSS Custom Properties | Design tokens, modular stylesheets |
| **Animation** | GSAP | 3.15.x | Animasi kompleks (deklaratif) |
| **Markdown** | Marked.js | 18.x | Parsing novel Markdown → HTML |
| **SVG** | Inline SVG | — | Ornamen, mandala, ikon (zero HTTP request) |
| **Hosting** | Vercel | — | CDN global, SPA rewrite |
| **VCS** | Git + GitHub | — | Source control, repository publik |

## 2.2 Arsitektur Direktori

```
Altrea/
├── novel/
│   └── Altrea - Kitab Penciptaan.md          # Source teks utuh novel (117 KB)
│
├── web-novel/
│   ├── public/                                # Aset statis (tidak diproses Vite)
│   │   ├── favicon.svg                        #   Ikon tab browser
│   │   ├── hero-bg.jpg                        #   Background hero landing (1015 KB)
│   │   ├── world-bg.jpg                       #   Background parallax dunia (882 KB)
│   │   ├── og-image.jpg                       #   Open Graph social preview (787 KB)
│   │   ├── icons.svg                          #   Sprite sheet ikon SVG
│   │   └── images/                            #   Ilustrasi 2D Concept Art
│   │       ├── arc-1.jpg … arc-6.jpg          #     Satu per Arc (6 file, ~800 KB masing-masing)
│   │
│   ├── src/
│   │   ├── main.js                            # Entry point, hash router, page lifecycle
│   │   │
│   │   ├── components/                        # Komponen UI reusable
│   │   │   ├── navbar.js                      #   Glassmorphism navbar + mobile menu
│   │   │   ├── footer.js                      #   Footer ornamen + copyright
│   │   │   └── ornament.js                    #   SVG generator: archFrame, lancipFrame,
│   │   │                                      #   mandala, cornerOrnament, separator, dll.
│   │   │
│   │   ├── pages/                             # Halaman SPA (render + behavior terpisah)
│   │   │   ├── landing.js                     #   Landing page template
│   │   │   ├── landing-behaviors.js           #   Particle system, light rays, tab switcher
│   │   │   ├── chapters.js                    #   Daftar jilid template
│   │   │   ├── chapters-behaviors.js          #   Arc filter, progress badges
│   │   │   ├── reader.js                      #   Reader page template
│   │   │   ├── reader-behaviors.js            #   Font/mode controls, bookmark, scroll-to-top
│   │   │   ├── glossary.js                    #   Glossarium template
│   │   │   └── glossary-behaviors.js          #   Realtime search, category filter
│   │   │
│   │   ├── data/                              # Data statis JSON
│   │   │   ├── arcs.json                      #   Definisi 6 Arc (id, title, chapters, warna)
│   │   │   ├── chapters.json                  #   Metadata 32 jilid (judul, excerpt, waktu baca)
│   │   │   └── glossary.json                  #   Entri glossarium (ras, lokasi, konsep, dll.)
│   │   │
│   │   ├── content/
│   │   │   └── chapters-full.json             #   Teks utuh 32 jilid (119 KB, key "1"–"32")
│   │   │
│   │   ├── styles/                            # CSS Modular
│   │   │   ├── tokens.css                     #   Design tokens (warna, font, spacing, dll.)
│   │   │   ├── index.css                      #   Reset, base global, utilitas, animasi
│   │   │   ├── navbar.css                     #   Navbar + mobile menu styles
│   │   │   ├── footer.css                     #   Footer styles
│   │   │   ├── landing.css                    #   Hero, sinopsis, tabs, arc cards
│   │   │   ├── chapters.css                   #   Grid jilid, filter bar, chapter cards
│   │   │   ├── reader.css                     #   Tipografi baca, kontrol, mode, arch frame
│   │   │   └── glossary.css                   #   Glossary cards, search, kategori
│   │   │
│   │   └── utils/                             # Utilitas JavaScript
│   │       ├── storage.js                     #   localStorage wrapper (namespace `altrea_`)
│   │       ├── parser.js                      #   Marked.js config + drop cap, pull quote, divider
│   │       └── reading-time.js                #   Estimasi waktu baca (200 kata/menit)
│   │
│   ├── index.html                             # HTML shell (SEO meta, OG tags, font preload)
│   ├── parse-novel.js                         # Script Node.js: parse novel.md → chapters-full.json
│   ├── vercel.json                            # Konfigurasi Vercel SPA rewrite
│   ├── package.json                           # Dependencies: vite, marked, gsap
│   └── .gitignore                             # node_modules, dist
│
└── README.md                                  # Dokumentasi publik GitHub
```

## 2.3 Routing (Hash-Based SPA)

Router diimplementasikan langsung di `main.js` menggunakan `window.location.hash`:

| Hash Route | Halaman | Handler |
|------------|---------|---------|
| `#/` | Landing Page | `renderLanding()` |
| `#/chapters` | Daftar Jilid | `renderChapters()` |
| `#/read/:id` | Halaman Baca (jilid 1–32) | `renderReader(id)` |
| `#/glossary` | Glossarium | `renderGlossary()` |
| `#/glossary?q=keyword` | Glossarium + pencarian | `renderGlossary(q)` |

**Alur Navigasi:**
```
hashchange event
  → navigate()
    → parse hash + extract path & params
    → renderPage(pageKey, renderFn)
      → update document.title
      → cleanup floating controls
      → render: navbar + page + footer → inject ke #app
      → scroll to top
      → init navbar behaviors
      → init IntersectionObserver (scroll reveal)
      → init page-specific behaviors (dynamic import)
```

## 2.4 Pattern Render + Behavior

Setiap halaman menggunakan *separation of concerns* dengan 2 file:

| File | Tanggung Jawab |
|------|---------------|
| `pages/<name>.js` | **Template**: Menghasilkan string HTML berdasarkan data JSON. Pure function, tanpa efek samping. |
| `pages/<name>-behaviors.js` | **Interaktivitas**: Menginisialisasi event listeners, animasi, dan DOM manipulation setelah halaman ter-mount. Di-load via `dynamic import()`. |

**Keuntungan:**
- Code splitting: behavior JS hanya dimuat ketika halaman terkait diakses.
- Testability: template dapat diuji tanpa browser.
- Readability: pemisahan jelas antara *apa yang ditampilkan* vs *bagaimana ia berperilaku*.

## 2.5 Dependency Graph

```
index.html
  └── src/main.js (entry point)
        ├── components/navbar.js ──→ data/arcs.json, utils/storage.js
        ├── components/footer.js ──→ components/ornament.js
        ├── components/ornament.js (standalone SVG generator)
        │
        ├── pages/landing.js ──→ data/arcs.json, data/chapters.json,
        │   │                     data/glossary.json, ornament.js, storage.js
        │   └── [lazy] landing-behaviors.js
        │
        ├── pages/chapters.js ──→ data/chapters.json, data/arcs.json,
        │   │                      utils/storage.js, ornament.js
        │   └── [lazy] chapters-behaviors.js
        │
        ├── pages/reader.js ──→ data/chapters.json, data/arcs.json,
        │   │                    content/chapters-full.json, ornament.js,
        │   │                    utils/parser.js, utils/storage.js,
        │   │                    utils/reading-time.js
        │   │                    └── marked (external)
        │   └── [lazy] reader-behaviors.js ──→ utils/storage.js
        │
        ├── pages/glossary.js ──→ data/glossary.json, ornament.js
        │   └── [lazy] glossary-behaviors.js
        │
        └── styles/*.css (all imported statically in main.js)
```

---

# 3 — Desain UI/UX

## 3.1 Filosofi Desain

Desain Altrea dibangun di atas tiga pilar:

1. **Imersif**: Setiap elemen visual — warna, ornamen, tipografi — merepresentasikan dunia novel. Background gelap = kegelapan purba Altrea. Pendaran emas = ornamen peradaban. Ungu = Resonansi Celah.

2. **Tidak Menghalangi Bacaan**: Mode membaca prioritaskan kenyamanan mata. Tidak ada elemen dekoratif di area teks utama. Tipografi *Cormorant Garamond* dipilih karena keterbacaan tinggi untuk prosa panjang.

3. **Responsif & Aksesibel**: Layout menyesuaikan dari layar 320px (mobile) hingga 2560px (ultrawide). Kontrol membaca berubah bentuk (sidebar → FAB dropdown) berdasarkan viewport.

## 3.2 Layout & Wireframe

### Landing Page
```
┌──────────────────────────────────────────────┐
│ NAVBAR [ALTREA logo] [Beranda|Jilid|Glossarium] [Progress] [Lanjutkan] [☰] │
├──────────────────────────────────────────────┤
│                                              │
│         ╔══════════════════════╗              │
│         ║   ◇ ALTREA ◇        ║              │
│         ║   Kitab Penciptaan   ║  ← hero-bg  │
│         ║   ────◇────          ║    parallax  │
│         ╚══════════════════════╝              │
│                                              │
│   "Pada mulanya, Altrea bukan kegelapan..."  │
│   [Mulai Membaca]  [Lihat Semua Jilid]       │
│                                              │
│  ── ◈ Sinopsis ◈ ──                          │
│  Teks sinopsis ...                           │
│                                              │
│  ── ◈ Kenali Altrea ◈ ──                     │
│  [Ras ▾] [Lokasi ▾] [Konsep ▾] [Napas ▾]    │
│  ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ Card 1 │ │ Card 2 │ │ Card 3 │            │
│  └────────┘ └────────┘ └────────┘            │
│                                              │
│  ── ◈ 6 Arc Cerita ◈ ──                      │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐   │
│  │  Arc I    │ │  Arc II   │ │  Arc III   │   │
│  │  [img]    │ │  [img]    │ │  [img]     │   │
│  └───────────┘ └───────────┘ └───────────┘   │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐   │
│  │  Arc IV   │ │  Arc V    │ │  Arc VI    │   │
│  └───────────┘ └───────────┘ └───────────┘   │
│                                              │
│ FOOTER [mandala ornamen] © 2026 ALSTRINE     │
└──────────────────────────────────────────────┘
```

### Halaman Baca (Reader)
```
┌──────────────────────────────────────────────┐
│ ██████████████░░░░░░ 65%  ← reading progress │
├──────────────────────────────────────────────┤
│ NAVBAR [ALTREA] [Beranda|Jilid|Glossarium]   │
├──────────────────────────────────────────────┤
│                                              │
│          ╭─────────────╮                     │
│          │  Arc Image  │  ← arch frame       │
│          │  (gradient  │    dengan gradient   │
│          │    fade)    │    fade di bawah     │
│          ╰─────────────╯                     │
│                                              │
│    Kitab Celah · Kelahiran Dunia · Jilid 1   │
│                                              │
│    ──────── ◇ ────────                       │
│                                              │
│     P ada mulanya, Altrea bukan        ┌──┐  │
│     kegelapan...                       │📑│  │
│                                        │A │  │
│     [paragraf teks novel]              │A │  │ ← floating
│     [paragraf teks novel]              │A │  │   controls
│     [paragraf teks novel]              │A │  │   (desktop)
│                                        │◐ │  │
│     ────── ◇ ──────                    │● │  │
│                                        │◈ │  │
│     [paragraf teks novel]              │○ │  │
│                                        │↑ │  │
│                                        └──┘  │
│                                              │
│    ◈ Tamat Jilid 1 ◈                         │
│    [← Sebelumnya]  [Semua Jilid]  [→ Berikut]│
│                                              │
│ FOOTER                                       │
└──────────────────────────────────────────────┘
```

### Reader — Mobile (< 768px)
```
┌────────────────────┐
│ NAVBAR [ALTREA] [☰] │
├────────────────────┤
│                    │
│    ╭──────────╮    │
│    │ Arc Img  │    │
│    ╰──────────╯    │
│                    │
│  P ada mulanya...  │
│                    │
│  [teks novel]      │
│  [teks novel]      │
│  [teks novel]      │
│                    │
│              ╭──╮  │
│              │⚙️│  │ ← FAB toggle
│              ╰──╯  │
│  (tap FAB ↑)       │
│         ╭────────╮ │
│         │ 📑 A A │ │ ← dropdown
│         │ A A    │ │   sheet
│         │ ◐ ● ◈ ○│ │
│         │   ↑    │ │
│         ╰────────╯ │
└────────────────────┘
```

## 3.3 Efek Visual & Animasi

### Particle System (Landing Page)
- **Stardust**: 120 partikel emas semi-transparan bergerak perlahan ke atas (`position: absolute`, random placement, CSS animation infinite).
- **Shooting Stars**: 3 garis diagonal cepat (`linear-gradient` + animasi translate diagonal + fade).
- **Light Rays**: 6 berkas cahaya vertikal berwarna emas/ungu transparan, bergoyang perlahan (`rotate` animation, origin: top center).

### Scroll Reveal (IntersectionObserver)
- **`.reveal`**: `opacity: 0 → 1` + `translateY(30px → 0)`, threshold 10%.
- **`.reveal-left`**: `translateX(-30px → 0)` variant.
- **Stagger**: Setiap card dalam grid di-observe secara individual, animasi bertingkat alami.

### Micro-Animations
- **Card Hover**: `translateY(-4px)` + `border-color: gold` + `box-shadow: gold glow`.
- **Mandala Rotation**: `rotate(360deg)` per 30 detik, `linear`, `infinite`.
- **Page Enter**: `opacity: 0 → 1` + `translateY(16px → 0)`, `400ms ease`.
- **Mobile Sheet**: `opacity: 0 → 1` + `translateY(10px → 0)` + `scale(0.95 → 1)`, `200ms cubic-bezier(0.16, 1, 0.3, 1)`.

## 3.4 Mode Membaca

| Mode | Background | Teks | Aksen | Keterangan |
|------|-----------|------|-------|------------|
| **Dark** (default) | `#1e202c` | `#bfc0d1` | `#60519b` | Mode malam standar |
| **Void** | `#0a0b13` | `#e8e9f5` | `#7b6bbf` | Kontras maksimum, AMOLED |
| **Purple** | `#1a1528` | `#d4ceee` | `#8b7acf` | Tematik kosmik Sylvaren |
| **Sepia** | `#1e1912` | `#d4c5a0` | `#b8864a` | Nuansa hangat klasik |

---

# 4 — Design System & Token

## 4.1 Palet Warna

### Core Dark
| Token | Hex | Peran |
|-------|-----|-------|
| `--color-void` | `#0a0b13` | Latar terdalam (reading mode Void) |
| `--color-abyss` | `#1e202c` | Background utama |
| `--color-depth` | `#272839` | Surface kartu, panel |
| `--color-surface` | `#31323e` | Tombol, kontrol |
| `--color-mist` | `#3d3e50` | Border, garis pemisah |
| `--color-fog` | `#4a4b60` | Border hover |

### Gold (Ornamen)
| Token | Hex | Peran |
|-------|-----|-------|
| `--color-gold` | `#c9a84c` | Ornamen emas primer |
| `--color-gold-light` | `#e4c97e` | Highlight, glow |
| `--color-gold-pale` | `#f0dfa0` | Aksen terang |
| `--color-gold-dim` | `#8b6f2e` | Shadow, teks sekunder |
| `--color-gold-dark` | `#5c4820` | Aksen gelap |

### Purple (Resonansi Celah)
| Token | Hex | Peran |
|-------|-----|-------|
| `--color-resonance` | `#60519b` | Aksen ungu utama |
| `--color-resonance-dim` | `#3d3168` | Hover, deeper |
| `--color-resonance-glow` | `#7b6bbf` | Glow effect |
| `--color-resonance-pale` | `#a090d8` | Aksen terang |

### Teks
| Token | Hex | Peran |
|-------|-----|-------|
| `--color-starlight` | `#bfc0d1` | Teks utama body |
| `--color-moonlight` | `#e8e9f5` | Heading, emphasis |
| `--color-daylight` | `#f4f4f8` | Teks terang maksimum |
| `--color-twilight` | `#7a7b8c` | Teks sekunder, placeholder |

### Semantik (Empat Napas)
| Token | Hex | Elemen |
|-------|-----|--------|
| `--color-ignar` | `#c2603a` | Api / Vraen / Arc IV |
| `--color-vael` | `#3a7ab5` | Air / Thael / Arc V |
| `--color-solmae` | `#5a9e6f` | Angin / harapan |
| `--color-duraen` | `#8b7355` | Tanah / Auren / Arc I |

## 4.2 Tipografi

| Token | Font Family | Penggunaan |
|-------|------------|------------|
| `--font-display` | Cinzel Decorative | Logo "ALTREA", judul hero |
| `--font-heading` | Cinzel | Judul jilid, heading section |
| `--font-body` | Cormorant Garamond | Teks novel, paragraf |
| `--font-ui` | Inter | Elemen UI (badge, tombol, filter) |
| `--font-accent` | IM Fell English | Kutipan, pull quotes, subtitle Altrea |

**Skala Font:**
| Token | Ukuran |
|-------|--------|
| `--text-xs` | 0.6875rem |
| `--text-sm` | 0.8125rem |
| `--text-base` | 1rem |
| `--text-md` | 1.125rem |
| `--text-lg` | 1.25rem |
| `--text-xl` | 1.5rem |
| `--text-2xl` | 1.875rem |
| `--text-3xl` | 2.25rem |
| `--text-4xl` | 3rem |
| `--text-hero` | 5rem |

**Skala Membaca (Reader):**
| Token | Ukuran | Kontrol |
|-------|--------|---------|
| `--reading-sm` | 1.0625rem | Tombol "A" kecil |
| `--reading-md` | 1.1875rem | Tombol "A" sedang (default) |
| `--reading-lg` | 1.3125rem | Tombol "A" besar |
| `--reading-xl` | 1.5rem | Tombol "A" sangat besar |

## 4.3 Spacing & Layout

| Token | Ukuran | Penggunaan Umum |
|-------|--------|----------------|
| `--space-1` | 0.25rem | Gap minimal |
| `--space-2` | 0.5rem | Padding tombol |
| `--space-4` | 1rem | Padding card |
| `--space-8` | 2rem | Gap antar section |
| `--space-16` | 4rem | Margin section besar |
| `--space-32` | 8rem | Padding hero vertikal |
| `--container-max` | 1280px | Max width container |
| `--content-max` | 820px | Max width konten section |
| `--reader-max` | 700px | Max width area baca |
| `--navbar-height` | 72px | Tinggi navbar fixed |

## 4.4 Sistem Ornamen SVG

Semua ornamen di-generate oleh `ornament.js` sebagai inline SVG string, tanpa file eksternal:

| Ornamen | Fungsi | Parameter |
|---------|--------|-----------|
| `archFrame()` | Frame Gothic Arch (header reader, hero) | width, height, color, opacity, animated |
| `lancipFrame()` | Frame lancip/diamond (kartu, entri glossary) | width, height, color, opacity |
| `mandalaLarge()` | Mandala berputar besar (divider section) | size, color, animated |
| `mandalaSmall()` | Mandala kecil (divider teks) | size, color |
| `cornerOrnament()` | Sudut dekoratif (kartu, panel) | position, size, color |
| `separator()` | Garis horizontal ornamental | width, color |
| `dotChain()` | Rantai titik dekoratif | width, color |

---

# 5 — Spesifikasi Halaman

## 5.1 Landing Page (`landing.js`)

**URL**: `#/`  
**Title**: "Altrea: Kitab Penciptaan"

**Sections (urut vertikal):**
1. **Hero** — Full viewport, `hero-bg.jpg` parallax, particle system (stars + light rays + shooting stars), ornamen arch frame, judul "ALTREA" (Cinzel Decorative), subtitle "Kitab Penciptaan", tagline puitis, 2 tombol CTA.
2. **Sinopsis** — Judul + 3 paragraf ringkasan dunia Altrea. Centered, ornamen separator. Background: `world-bg.jpg` parallax kontinu.
3. **Dunia Altrea (Tabs)** — 4 tab interaktif (Ras, Lokasi, Konsep, Napas). Setiap tab memuat grid kartu dari `glossary.json` yang difilter per kategori.
4. **Arc Preview** — Grid 3×2 kartu dengan ilustrasi Arc 2D Concept Art, ornamen lancip frame, judul Arc + bahasa Altrea + deskripsi singkat.
5. **Footer**

## 5.2 Daftar Jilid (`chapters.js`)

**URL**: `#/chapters`  
**Title**: "Daftar Jilid — Altrea"

**Sections:**
1. **Header** — Judul "Daftar Jilid" + Progress bar global (X/32 selesai, Y%).
2. **Filter Bar** — Tombol: [Semua] [Arc I] [Arc II] [Arc III] [Arc IV] [Arc V] [Arc VI]. Sticky on scroll.
3. **Arc Groups** — Diulang per Arc yang aktif. Setiap grup: header Arc (ornamen + nama + rentang jilid) + grid chapter cards.
4. **Chapter Card** — Nomor jilid (besar, gold), judul, excerpt kalimat pertama, estimasi waktu baca, badge status (Selesai ✓ / Ditandai 🔖).

## 5.3 Halaman Baca (`reader.js`)

**URL**: `#/read/:id` (id = 1–32)  
**Title**: "Membaca — Altrea"

**Sections:**
1. **Reading Progress Bar** — Horizontal bar di atas, lebar proporsional terhadap scroll posisi.
2. **Reader Header** — Arch frame dengan ilustrasi Arc + gradient fade bottom, breadcrumb metadata (nama kitab · nama Arc · Jilid X).
3. **Content Area** — Markdown yang di-parse menjadi HTML. Drop cap paragraf pertama, pull quotes (`<blockquote>` → styled div), ornamental divider SVG (pengganti `<hr>`).
4. **Reader Footer** — Mandala ornamen + "Tamat Jilid X" + navigasi [← Sebelumnya] [Semua Jilid] [Berikutnya →].
5. **Floating Controls** — Desktop: sidebar fixed kanan (bookmark, 4 font size, 4 mode, scroll-to-top). Mobile: FAB toggle + glassmorphism dropdown sheet.

## 5.4 Glossarium (`glossary.js`)

**URL**: `#/glossary` atau `#/glossary?q=keyword`  
**Title**: "Glossarium — Altrea"

**Sections:**
1. **Header** — Judul "Glossarium Dunia Altrea" + ornamen mandala + input pencarian realtime.
2. **Category Tabs** — [Semua] [Ras] [Lokasi] [Konsep] [Karakter] [Napas] [Bahasa].
3. **Cards Grid** — Kartu entri glossarium: nama (Cinzel), kategori badge berwarna, deskripsi, tag relasi (klik → filter), tautan jilid referensi.

---

# 6 — Data & Content Schema

## 6.1 `arcs.json`

```json
{
  "arcs": [
    {
      "id": 1,
      "slug": "arc-kelahiran",
      "title": "Kelahiran Dunia",
      "altreaTitle": "Resonansi Pertama",
      "altreaMeaning": "Getaran pertama yang melahirkan segalanya",
      "chapters": [1, 2, 3, 4],
      "color": "#8b7355",
      "colorName": "duraen",
      "description": "Sebelum ada nama, sebelum ada waktu...",
      "thumbnail": "/images/arc-1.jpg"
    }
    // ... 6 Arc total
  ]
}
```

## 6.2 `chapters.json`

```json
{
  "chapters": [
    {
      "id": 1,
      "arc": 1,
      "title": "Sebelum Cahaya Ada Nama",
      "altreaTitle": "Aeval Aevorn",
      "excerpt": "Pada mulanya, Altrea bukan kegelapan...",
      "file": "01.md",
      "readingTime": 4
    }
    // ... 32 jilid total
  ]
}
```

## 6.3 `glossary.json`

```json
{
  "entries": [
    {
      "id": "auren",
      "name": "Auren",
      "altreaName": "Auren",
      "category": "ras",
      "description": "Ras pertama Altrea...",
      "firstAppears": 4,
      "related": ["duraen", "sylvaren", "vraen"],
      "color": "#8b7355"
    }
    // ... 40+ entri
  ]
}
```

## 6.4 `chapters-full.json`

```json
{
  "1": "Pada mulanya, Altrea bukan kegelapan.\n\nKegelapan setidaknya...",
  "2": "Mereka adalah kesadaran purba...",
  // ... key "1" s/d "32" (1-indexed)
}
```

Di-generate oleh `parse-novel.js` dari file `novel/Altrea - Kitab Penciptaan.md`.

---

# 7 — State Management

## 7.1 localStorage Schema

Semua key menggunakan prefix `altrea_` untuk menghindari konflik:

### `altrea_progress`
```json
{
  "lastRead": 7,
  "completed": [1, 2, 3, 4, 5, 6, 7],
  "bookmarks": [3, 7]
}
```

| Field | Tipe | Keterangan |
|-------|------|------------|
| `lastRead` | `number \| null` | ID jilid terakhir dibaca. Digunakan untuk tombol "Lanjutkan" di navbar |
| `completed` | `number[]` | Array ID jilid yang sudah selesai dibaca |
| `bookmarks` | `number[]` | Array ID jilid yang ditandai oleh pembaca |

### `altrea_prefs`
```json
{
  "fontSize": "md",
  "readingMode": "dark"
}
```

| Field | Tipe | Nilai Valid | Default |
|-------|------|------------|---------|
| `fontSize` | `string` | `"sm"`, `"md"`, `"lg"`, `"xl"` | `"md"` |
| `readingMode` | `string` | `"dark"`, `"void"`, `"purple"`, `"sepia"` | `"dark"` |

## 7.2 API Storage (`utils/storage.js`)

| Fungsi | Deskripsi |
|--------|-----------|
| `storage.get(key, fallback)` | Baca dari localStorage dengan fallback |
| `storage.set(key, value)` | Tulis ke localStorage (JSON.stringify) |
| `storage.remove(key)` | Hapus key dari localStorage |
| `getProgress()` | Return objek progress (lastRead, completed, bookmarks) |
| `markChapterComplete(id)` | Tandai jilid selesai + update lastRead |
| `toggleBookmark(id)` | Toggle bookmark jilid (add/remove) |
| `isBookmarked(id)` | Cek apakah jilid di-bookmark |
| `isCompleted(id)` | Cek apakah jilid sudah selesai |
| `getPrefs()` | Return preferensi membaca (fontSize, readingMode) |
| `setPrefs(updates)` | Update preferensi (merge dengan existing) |

---

# 8 — Performance & SEO

## 8.1 Strategi Optimasi

| Aspek | Implementasi |
|-------|-------------|
| **Code Splitting** | Behavior JS per halaman di-load via `dynamic import()` — hanya dimuat saat dibutuhkan |
| **Font Loading** | Google Fonts dengan `display=swap` + `preconnect` |
| **Image Assets** | JPG untuk foto/ilustrasi, inline SVG untuk ornamen |
| **CSS** | Semua CSS diimpor statik di `main.js` → Vite bundle menjadi 1 file CSS (~50 KB gzip: ~9 KB) |
| **JS Bundle** | Total ~233 KB (gzip: ~71 KB), mayoritas dari `marked.js` |
| **Static Hosting** | Vercel CDN global, SPA rewrite (`vercel.json`) |

## 8.2 Build Output

```
dist/index.html                                1.69 KB  (gzip: 0.77 KB)
dist/assets/index-{hash}.css                  49.64 KB  (gzip: 8.68 KB)
dist/assets/chapters-behaviors-{hash}.js        0.45 KB  (gzip: 0.26 KB)
dist/assets/glossary-behaviors-{hash}.js        1.11 KB  (gzip: 0.52 KB)
dist/assets/landing-behaviors-{hash}.js         1.69 KB  (gzip: 0.73 KB)
dist/assets/reader-behaviors-{hash}.js          2.89 KB  (gzip: 1.08 KB)
dist/assets/index-{hash}.js                  233.04 KB  (gzip: 70.89 KB)
```

## 8.3 SEO & Meta Tags

```html
<!-- Primary Meta -->
<title>Altrea: Kitab Penciptaan</title>
<meta name="description" content="Kitab kosmologi dunia Altrea...">
<meta name="author" content="ALSTRINE">
<meta name="keywords" content="Altrea, web novel, fantasy, kitab penciptaan, ALSTRINE">

<!-- Open Graph -->
<meta property="og:type" content="book">
<meta property="og:title" content="Altrea: Kitab Penciptaan">
<meta property="og:description" content="Pada mulanya, Altrea bukan kegelapan...">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:locale" content="id_ID">
```

Setiap navigasi halaman mengubah `document.title` secara dinamis sesuai konteks halaman.

---

# 9 — Aksesibilitas

| Requirement | Implementasi |
|------------|-------------|
| **Skip Link** | `<a href="#main-content" class="skip-link">Lewati ke konten utama</a>` |
| **Keyboard Nav** | Tab order logis, focus visible dengan outline warna resonansi |
| **ARIA Labels** | Semua tombol interaktif memiliki `aria-label` deskriptif |
| **ARIA Roles** | `role="navigation"`, `role="toolbar"`, `role="group"` |
| **ARIA States** | `aria-pressed` pada tombol toggle, `aria-expanded` pada FAB mobile |
| **Heading Hierarchy** | Satu `<h1>` per halaman, heading berurutan |
| **Semantic HTML** | `<nav>`, `<main>`, `<footer>`, `<article>` |
| **Color Contrast** | Semua teks ≥ 4.5:1 (WCAG AA) |
| **Font Minimum** | 16px base, mendukung browser zoom |
| **Alt Text** | Semua gambar memiliki `alt` deskriptif |
| **Hidden Decorative** | Ornamen SVG menggunakan `aria-hidden="true"` |

---

# 10 — Roadmap & Changelog

## 10.1 Changelog (Rilis Saat Ini)

### v1.0.0 — Initial Release (2026-08-01)
- ✅ Landing page lengkap: hero, sinopsis, tab dunia, arc cards, particle system, light rays
- ✅ 32 jilid teks utuh terimport dan dapat dibaca penuh
- ✅ 4 mode membaca: Dark, Void, Purple, Sepia
- ✅ 4 ukuran font: S, M, L, XL
- ✅ Floating controls desktop (sidebar kanan) + mobile FAB dropdown sheet
- ✅ Glossarium 40+ entri dengan pencarian realtime dan filter kategori
- ✅ Daftar jilid dengan filter Arc, progress bar, dan badge status
- ✅ Bookmark & progress tracking via localStorage
- ✅ 6 ilustrasi 2D Concept Art untuk setiap Arc
- ✅ Responsif: 320px – 2560px
- ✅ Deploy live di Vercel: [altrea-pied.vercel.app](https://altrea-pied.vercel.app/)

## 10.2 Roadmap Masa Depan

### v1.1 — Polish & Enhancement
| Fitur | Prioritas | Keterangan |
|-------|-----------|------------|
| Fitur multi-bahasa (i18n English) | 🔴 Tinggi | Sistem pengalihan bahasa UI ke English |
| Service Worker (Offline Reading) | 🟡 Sedang | Konten tersedia setelah load pertama |
| Lighthouse Audit & Optimasi | 🟡 Sedang | Target skor ≥ 90 semua kategori |
| Structured Data (JSON-LD) | 🟢 Rendah | Schema.org Book markup |

### v1.2 — Reader Enhancements
| Fitur | Prioritas | Keterangan |
|-------|-----------|------------|
| Reading streak tracker | 🟡 Sedang | Hitung hari berturut-turut membaca |
| Anotasi / catatan pribadi | 🟡 Sedang | Catatan per jilid, disimpan di localStorage |
| Night reading auto-dim | 🟢 Rendah | Otomatis redupkan berdasarkan jam |
| Ambient sound (opsional) | 🟢 Rendah | Musik latar loopable, toggle on/off |
| Export / cetak PDF per jilid | 🟢 Rendah | Menggunakan browser print API |

### v2.0 — Platform Expansion
| Fitur | Prioritas | Keterangan |
|-------|-----------|------------|
| PWA (Progressive Web App) | 🟡 Sedang | Install di home screen, push notification |
| Peta Interaktif Dunia Altrea | 🟡 Sedang | SVG map clickable dengan tooltip |
| Timeline Interaktif | 🟢 Rendah | Kronologi peristiwa dunia Altrea |
| Komentar per jilid (Disqus/Giscus) | 🟢 Rendah | Diskusi pembaca per jilid |
| Analytics pembacaan | 🟢 Rendah | Statistik jilid terpopuler, waktu baca rata-rata |

---

# 11 — Inventaris File

## 11.1 File Sumber (Source)

| File | Ukuran | Fungsi |
|------|--------|--------|
| `src/main.js` | 4.3 KB | Entry point, hash router, page lifecycle |
| `src/components/navbar.js` | 4.2 KB | Navbar glassmorphism + mobile menu |
| `src/components/footer.js` | 1.5 KB | Footer ornamen + copyright |
| `src/components/ornament.js` | 9.2 KB | SVG ornamen generator (8 tipe) |
| `src/pages/landing.js` | 11.8 KB | Landing page template |
| `src/pages/landing-behaviors.js` | 2.6 KB | Particle system, tab switcher |
| `src/pages/chapters.js` | 6.0 KB | Daftar jilid template |
| `src/pages/chapters-behaviors.js` | 0.7 KB | Arc filter handler |
| `src/pages/reader.js` | 8.9 KB | Reader page template |
| `src/pages/reader-behaviors.js` | 4.5 KB | Font/mode controls, bookmark, FAB |
| `src/pages/glossary.js` | 5.9 KB | Glossarium template |
| `src/pages/glossary-behaviors.js` | 2.1 KB | Search, category filter |
| `src/utils/storage.js` | 1.7 KB | localStorage wrapper |
| `src/utils/parser.js` | 1.6 KB | Markdown parser + tipografi khusus |
| `src/utils/reading-time.js` | 0.4 KB | Estimasi waktu baca |

## 11.2 File Stylesheet (CSS)

| File | Ukuran | Cakupan |
|------|--------|---------|
| `src/styles/tokens.css` | 5.6 KB | Semua design tokens (CSS Custom Properties) |
| `src/styles/index.css` | 8.7 KB | Reset, base global, utilitas, animasi |
| `src/styles/navbar.css` | 6.1 KB | Navbar desktop + mobile + reading info |
| `src/styles/footer.css` | 2.3 KB | Footer layout + ornamen |
| `src/styles/landing.css` | 16.4 KB | Hero, sinopsis, tabs, arc cards, parallax |
| `src/styles/chapters.css` | 7.6 KB | Grid jilid, filter bar, chapter cards |
| `src/styles/reader.css` | 12.4 KB | Reader area, kontrol, mode, arch, FAB |
| `src/styles/glossary.css` | 7.0 KB | Glossary cards, search bar, kategori |

## 11.3 File Data (JSON)

| File | Ukuran | Isi |
|------|--------|-----|
| `src/data/arcs.json` | 2.7 KB | Definisi 6 Arc (metadata + warna + thumbnail) |
| `src/data/chapters.json` | 7.1 KB | Metadata 32 jilid (judul, excerpt, waktu baca) |
| `src/data/glossary.json` | 18.3 KB | 40+ entri glossarium (ras, lokasi, konsep, dll.) |
| `src/content/chapters-full.json` | 119.4 KB | Teks utuh 32 jilid (1-indexed) |

## 11.4 Aset Statis (Public)

| File | Ukuran | Fungsi |
|------|--------|--------|
| `public/hero-bg.jpg` | 1015 KB | Background hero landing page |
| `public/world-bg.jpg` | 882 KB | Background parallax sinopsis + dunia |
| `public/og-image.jpg` | 787 KB | Open Graph social media preview |
| `public/favicon.svg` | 0.6 KB | Ikon tab browser |
| `public/icons.svg` | 4.9 KB | Sprite sheet ikon SVG |
| `public/images/arc-1.jpg` | 799 KB | Ilustrasi Arc I: Kelahiran Dunia |
| `public/images/arc-2.jpg` | 868 KB | Ilustrasi Arc II: Anak-Anak Celah |
| `public/images/arc-3.jpg` | 865 KB | Ilustrasi Arc III: Yang Tidur |
| `public/images/arc-4.jpg` | 773 KB | Ilustrasi Arc IV: Musim Perang |
| `public/images/arc-5.jpg` | 803 KB | Ilustrasi Arc V: Kelahiran Baru |
| `public/images/arc-6.jpg` | 937 KB | Ilustrasi Arc VI: Yang Kelima |

---

<div align="center">

*Dokumen ini merupakan referensi teknis lengkap untuk proyek Altrea — Kitab Penciptaan.*  
*Terakhir diperbarui: 2026-08-01 oleh ALSTRINE.*

</div>
