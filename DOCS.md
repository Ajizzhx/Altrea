# 📚 DOKUMENTASI LENGKAP SPESIFIKASI & ARSITEKTIUR ALTREA

> **Proyek**: Altrea — Kitab Penciptaan (Web Novel Kosmologi Interaktif)  
> **Penulis Karya**: ALSTRINE  
> **Versi**: 1.0.0 (Produksi)  
> **Lisensi**: Hak Cipta © 2026 ALSTRINE  

---

## 📋 DAFTAR ISI

1. [Visi Produk & Persyaratan Sistem](#1-visi-produk--persyaratan-sistem)
2. [Arsitektur Sistem & Data Flow](#2-arsitektur-sistem--data-flow)
3. [Desain UI/UX & Tokens System](#3-desain-uiux--tokens-system)
4. [Arsitektur Konten & Kosmologi Altrea](#4-arsitektur-konten--kosmologi-altrea)
5. [Komponen & Fitur Interaktif Utama](#5-komponen--fitur-interaktif-utama)
6. [Pengurai Markdown & Tipografi](#6-pengurai-markdown--tipografi)
7. [Infrastruktur, CI/CD & Deployment](#7-infrastruktur-cicd--deployment)

---

## 1. VISI PRODUK & PERSYARATAN SISTEM

### 1.1 Visi Produk
**Altrea — Kitab Penciptaan** dibangun untuk menyajikan karya novel kosmologi fantasy ciptaan **ALSTRINE** dalam bentuk aplikasi web novel digital berkelas (*Progressive Web Novel App*). Aplikasi ini menggabungkan kedalaman naratif epik 32 Jilid dengan pengalaman visual imersif bergaya **Dark Celestial Aesthetic**, animasi berkas cahaya katedral (*stained glass*), bingkai ornamen emas geometris purba (*Gothic Arch & Islamic Mandala*), serta sistem baca yang responsif di desktop maupun perangkat seluler.

### 1.2 Persyaratan Fungsional (*Functional Requirements*)

| Modul | Deskripsi Persyaratan |
| :--- | :--- |
| **Sistem Membaca (Reader)** | • Memuat seluruh teks utuh 32 Jilid tanpa pemotongan.<br>• Menyediakan 4 mode tampilan baca (*Dark, Void, Purple, Sepia*).<br>• Menyediakan 4 ukuran font (*Small, Medium, Large, Extra Large*).<br>• Menyimpan kemajuan membaca & bookmark secara otomatis.<br>• Toolbar mengambang di desktop dan Floating Action Button (FAB) + Dropdown Sheet di HP. |
| **Katalog Jilid (Chapters)** | • Menampilkan 32 Jilid yang terbagi dalam 6 Arc Cerita.<br>• Fitur *Sticky Arc Filter* untuk menyaring jilid berdasarkan Arc.<br>• Indikator estimasi waktu baca, excerpt, dan status pembacaan (*Selesai/Ditandai*).<br>• Progress Bar persentase penyelesaian novel secara keseluruhan. |
| **Glossarium Interaktif (Glossary)**| • Pencarian teks secara *realtime* (nama entri, istilah Altrea, deskripsi).<br>• Tab kategori (*Semua, Ras, Lokasi, Konsep, Karakter, Napas, Bahasa*).<br>• Rujukan silang tag relasi entri dan tautan langsung ke jilid terkait. |
| **Landing Page Imersif** | • Hero Banner puitis dengan efek cahaya *stained glass* & debu bintang (*particle system*).<br>• Ilustrasi lanskap 2D Concept Art dengan transisi *seamless parallax*.<br>• Ringkasan kosmologi Empat Napas Dunia dan Enam Ras Purba. |

---

## 2. ARSITEKTUR SISTEM & DATA FLOW

Aplikasi ini dirancang menggunakan arsitektur **Single Page Application (SPA)** berbasis Vanilla JavaScript (ES2022) dan Vite 5 tanpa *dependency bloat*, menghasilkan performa tinggi dengan *bundle size* super cepat.

### 2.1 Diagram Alur Aplikasi (*Application Architecture*)

```mermaid
flowgraph TD
    User([Pengunjung]) --> Router{Hash Router main.js}
    
    Router -->|'/'| Landing[Landing Page]
    Router -->|'/chapters'| Chapters[Katalog Jilid]
    Router -->|'/read/:id'| Reader[Halaman Membaca]
    Router -->|'/glossary'| Glossary[Glossarium Interaktif]

    subgraph Data Layer
        ArcsData[(arcs.json)]
        ChaptersFull[(chapters-full.json)]
        GlossaryData[(glossary.json)]
        StorageUtils[(storage.js - LocalStorage)]
    end

    Landing --> ArcsData
    Chapters --> ArcsData
    Chapters --> ChaptersFull
    Chapters --> StorageUtils
    Reader --> ChaptersFull
    Reader --> StorageUtils
    Glossary --> GlossaryData

    subgraph Renderer & Parser
        MarkdownParser[Custom Markdown Parser & Typography]
        SVGOrnaments[SVG Ornament Generator]
    end

    Reader --> MarkdownParser
    Landing --> SVGOrnaments
    Reader --> SVGOrnaments
    Chapters --> SVGOrnaments
```

### 2.2 Struktur Direktori Project

```bash
Altrea/
├── novel/
│   └── Altrea - Kitab Penciptaan.md     # Sumber naskah mentah 32 Jilid
├── web-novel/
│   ├── public/                           # Aset statis (Hero, World, Arc 1-6 Art)
│   ├── src/
│   │   ├── components/                   # Modular Component (Navbar, Footer, SVG Ornaments)
│   │   │   ├── footer.js
│   │   │   ├── navbar.js
│   │   │   └── ornament.js
│   │   ├── content/
│   │   │   └── chapters-full.json        # Data teks utuh 32 Jilid (Parsed)
│   │   ├── data/                         # Metadata JSON
│   │   │   ├── arcs.json
│   │   │   ├── chapters.json
│   │   │   └── glossary.json
│   │   ├── pages/                        # Page Renderers & Behaviors
│   │   │   ├── chapters.js & chapters-behaviors.js
│   │   │   ├── glossary.js & glossary-behaviors.js
│   │   │   ├── landing.js & landing-behaviors.js
│   │   │   └── reader.js & reader-behaviors.js
│   │   ├── styles/                       # CSS Tokens & Module Stylesheets
│   │   │   ├── tokens.css
│   │   │   ├── index.css
│   │   │   ├── navbar.css
│   │   │   ├── landing.css
│   │   │   ├── chapters.css
│   │   │   ├── reader.css
│   │   │   └── glossary.css
│   │   └── utils/                        # Core Utilities
│   │       ├── parser.js
│   │       ├── reading-time.js
│   │       └── storage.js
│   ├── index.html                        # HTML Shell dengan OpenGraph SEO Tags
│   ├── main.js                           # Entry Point & Hash Router
│   ├── parse-novel.js                    # Node.js Automation Parser
│   ├── package.json
│   └── vercel.json                       # SPA Rewrite Rule
├── .github/workflows/
│   └── deploy.yml                        # CI/CD GitHub Actions Workflow
├── README.md                             # Dokumentasi Ringkas GitHub
└── DOCS.md                               # Dokumentasi Spesifikasi Utama
```

---

## 3. DESAIN UI/UX & TOKENS SYSTEM

Desain aplikasi mengadopsi palet warna **Dark Celestial Aesthetic** dengan ornaments emas yang memancarkan kesan purba dan elegan.

### 3.1 Token Warna Utama (`tokens.css`)

```css
:root {
  /* Core Dark Palette */
  --color-void:           #0a0b13; /* Hitam Angkasa */
  --color-abyss:          #1e202c; /* Biru Gelap Kedalaman */
  --color-depth:          #272839; /* Warna Kartu & Kontainer */
  --color-surface:        #31323e; /* Elemen Interaktif & Button */
  --color-mist:           #3d3e50; /* Border & Pembatas Dim */

  /* Gold & Resonansi Palette */
  --color-gold:           #c9a84c; /* Emas Utama Ornamen */
  --color-gold-light:     #e4c97e; /* Emas Terang Highlighting */
  --color-gold-dim:       #8b6f2e; /* Emas Dim Pembatas */
  --color-resonance:      #60519b; /* Ungu Resonansi Celah */
  --color-resonance-glow: #7b6bbf; /* Pendaran Ungu */

  /* Empat Napas Palette */
  --color-ignar:          #c2603a; /* Api (Oranye-Merah) */
  --color-vael:           #3a7ab5; /* Air (Biru Samudra) */
  --color-solmae:         #5a9e6f; /* Angin (Hijau Harapan) */
  --color-duraen:         #8b7355; /* Tanah (Cokelat Batu) */

  /* Tipografi Text */
  --color-starlight:      #bfc0d1; /* Teks Sekunder */
  --color-moonlight:      #e8e9f5; /* Judul Utama */
  --color-daylight:       #f4f4f8; /* Teks Paragraf Baca */
}
```

### 3.2 Sistem Tipografi

1. **Heading & Title**: `Cinzel Decorative`, `Cinzel`, Serif Spacing (Letter-spacing: `0.15em` - `0.25em`).
2. **Text Paragraf Baca**: `Cinzel` / `Lora` / `Georgia`, Serif Font (Line-height: `1.8` - `2.0`).
3. **Sub-title & Bahasa Altrea**: `Cormorant Garamond`, Italic Accent.

---

## 4. ARSITEKTUR KONTEN & KOSMOLOGI ALTREA

### 4.1 Arsitektur 6 Arc Cerita

Seluruh 32 Jilid cerita dikelompokkan ke dalam 6 Arc besar:

```markdown
┌────────────────────────────────────────────────────────────────────────┐
│                        ALTREA: KITAB PENCIPTAAN                        │
├──────────────┬────────────────────────┬──────────────────┬─────────────┤
│ ARC          │ JUDUL UTAMA            │ BAHASA ALTREA    │ CAKUPAN     │
├──────────────┼────────────────────────┼──────────────────┼─────────────┤
│ Arc I        │ Resonansi Pertama      │ Aeval-Aevorn     │ Jilid 1–5   │
│ Arc II       │ Kebangkitan            │ Aevorn-Orn       │ Jilid 6–10  │
│ Arc III      │ Peradaban Pertama      │ Vaerundal-Vraedh │ Jilid 11–17 │
│ Arc IV       │ Yang Tidur             │ Sol-Vaelen       │ Jilid 18–22 │
│ Arc V        │ Perang Nama            │ Nael-Thassor     │ Jilid 23–28 │
│ Arc VI       │ Yang Turun dari Langit │ Aeth-Vaelis      │ Jilid 29–32 │
└──────────────┴────────────────────────┴──────────────────┴─────────────┘
```

### 4.2 Empat Napas Dunia (*The Four Breaths*)
- **Ignar** (Api) — Napas dorongan, amarah, dan keinginan untuk ada.
- **Vael** (Air) — Napas memori, kenangan, dan rindu yang tak bertepi.
- **Solmae** (Angin) — Napas kebebasan, rahasia takdir, dan perubahan.
- **Duraen** (Tanah) — Napas kesabaran abadi, topangan, dan keteguhan batu.

### 4.3 Enam Ras Altrea
1. **Auren** — Bangkit dari bekas telapak tangan Duraen; bertubuh kekar, kulit tanah liat, dan bermata dua warna.
2. **Sylvaren** — Lahir dari celah napas; bermata cermin yang memantulkan kebenaran jiwa.
3. **Vraen** — Lahir dari nyala Ignar; bertubuh api membara dan bernaluri pencipta.
4. **Vauren** — Ras campuran Auren dan Sylvaren penghuni dataran rendah.
5. **Thael** — Penjaga pesisir Samudra Thessarne.
6. **Naevh** — Ras bercahaya perak yang turun dari langit malam.

---

## 5. KOMPONEN & FITUR INTERAKTIF UTAMA

### 5.1 Mode Membaca Interaktif (*Reader Controls*)
- **Skema Warna Display**:
  - `Dark`: Background `#1e202c`, Teks `#f4f4f8`
  - `Void`: Background `#0a0b13`, Teks `#e8e9f5`
  - `Purple`: Background `#181524`, Teks `#e4dcf7`
  - `Sepia`: Background `#241e17`, Teks `#f0e4d0`
- **Ukuran Font**:
  - `Small`: `0.95rem`
  - `Medium`: `1.1rem` (Default)
  - `Large`: `1.25rem`
  - `Extra Large`: `1.4rem`
- **Responsif Seluler (Mobile FAB Dropdown)**:
  - Di layar HP (≤ 768px), tombol kontrol diubah menjadi satu **Floating Action Button (FAB)** emas di kanan bawah.
  - Mengetuk FAB akan membuka **Glassmorphism Dropdown Sheet** di bagian bawah tanpa menutupi area membaca teks novel.

### 5.2 Pencarian Glossarium Realtime
- Menggunakan fungsi pemfilteran gabungan (*category match* + *search query match*).
- Mengeksekusi penyaringan instan baik melalui kata kunci yang diketik pada input search maupun melalui klik tag rujukan antar entri.

---

## 6. PENGURAI MARKDOWN & TIPOGRAFI

File `parse-novel.js` bertugas mengurai naskah mentah `Altrea - Kitab Penciptaan.md` menjadi struktur JSON utuh `chapters-full.json`.

### 6.1 Elemen Tipografi Khusus
- **Drop Cap**: Huruf pertama pada awal paragraf jilid dihiasi gaya *Drop Cap* emas berukuran 3.5x.
- **Pull Quotes**: Blok kalimat puitis dalam tanda petik ganda otomatis diubah menjadi *Pull Quote* terpusat dengan garis aksen emas.
- **Ornamental Dividers**: Pembatas paragraf `---` diubah menjadi ikon ornamen geometrik SVG.

---

## 7. INFRASTRUKTUR, CI/CD & DEPLOYMENT

### 7.1 Konfigurasi Vercel (`vercel.json`)
Untuk mendukung *Client-side Hash & HTML5 History Routing* di Vercel:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 7.2 Automation GitHub Actions (`.github/workflows/deploy.yml`)
Workflow otomatis dikonfigurasi untuk melakukan kompilasi Vite dan publikasi otomatis ke GitHub Pages saat terjadi `push` ke branch `master`:

```yaml
name: Deploy Altrea Web Novel to GitHub Pages

on:
  push:
    branches: [ main, master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install & Build
        run: |
          cd web-novel
          npm ci
          npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './web-novel/dist'
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

---

<div align="center">

  <p><i>Dokumentasi ini dibuat untuk memastikan integritas arsitektur dan kualitas karya <b>Altrea — Kitab Penciptaan</b>.</i></p>
  <p><b>Hak Cipta © 2026 ALSTRINE. All Rights Reserved.</b></p>

</div>
