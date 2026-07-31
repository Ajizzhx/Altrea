# 📖 Altrea — Kitab Penciptaan (Web Novel)

Web novel interaktif berbasis browser untuk novel kosmologi fantasy ***Altrea — Kitab Penciptaan*** karya **ALSTRINE**.

Live Preview: [http://localhost:5173/](http://localhost:5173/)

## 🎨 Fitur Utama

- 🏛️ **Atmosfer Dark Celestial**: Tema katedral gelap, stained glass animation, particle system, dan ornamen geometrik emas (Gothic arch & Islamic mandala).
- 📜 **32 Jilid Lengkap**: Teks utuh seluruh 32 jilid dengan tipografi premium (*Cinzel Decorative*, *Cinzel*, *Cormorant Garamond*).
- 🔖 **Fitur Membaca Advanced**:
  - Reading Progress Bar di top bar
  - Drop Cap & Pull Quotes otomatis
  - 4 Ukuran Font (S / M / L / XL)
  - 4 Mode Membaca (*Dark*, *Void*, *Purple*, *Sepia*)
  - Bookmark & Progress tracker berbasis `localStorage`
- 📚 **Daftar Jilid & Filter Arc**: Filter interaktif 6 Arc cerita dengan status *Selesai / Terakhir Dibaca / Ditandai*.
- 📖 **Glossarium Dunia**: Pencarian *realtime* nama ras, karakter, lokasi, konsep, dan bahasa Altrea beserta rujukan jilid.

## 🛠️ Stack Teknologi

- **Core**: Vite 5 + Vanilla JavaScript (ES2022+)
- **Styling**: CSS Custom Properties (Design Tokens) + CSS Modules
- **Parser**: Marked.js + Custom Altrea Typography Parser
- **Deployment**: Vercel & GitHub Pages ready

## 🚀 Panduan Jalankan & Deploy

### Jalankan Lokal
```bash
cd web-novel
npm install
npm run dev
```

### Deploy ke Vercel (Rekomendasi)
```bash
# Opsi 1: Pakai Vercel CLI
npx vercel

# Opsi 2: Connect via dashboard Vercel
# Import repository GitHub ini ke Vercel, pilih Root Directory: web-novel
```

### Deploy ke GitHub Pages
```bash
# Cukup git push ke branch main / master:
git add .
git commit -m "feat: initial commit Altrea Web Novel by ALSTRINE"
git push origin main
```
Workflow GitHub Actions akan otomatis melakukan build dan mempublikasikan web novel kamu ke GitHub Pages!

---

*Altrea: Kitab Penciptaan © 2026 ALSTRINE*
