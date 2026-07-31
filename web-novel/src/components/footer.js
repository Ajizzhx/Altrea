import { ornaments } from './ornament.js';

export function renderFooter() {
  return `
<footer class="footer" role="contentinfo">
  <div class="footer__fog"></div>
  <div class="container">
    <div class="footer__mandala">
      ${ornaments.mandalaLg({ size: 80, color: '#c9a84c' })}
    </div>
    <div class="footer__separator">
      ${ornaments.separator({ width: 400 })}
    </div>
    <p class="footer__quote">
      <em>"Di Altrea, tidak ada yang pernah benar-benar hilang. Hanya berpindah ke lapisan yang lebih dalam."</em>
    </p>
    <nav class="footer__nav" aria-label="Footer navigation">
      <a href="#/" class="footer__link">
        <span class="footer__link-altrea">Aevorn</span>
        <span>Beranda</span>
      </a>
      <span class="footer__dot" aria-hidden="true">·</span>
      <a href="#/chapters" class="footer__link">
        <span class="footer__link-altrea">Kitab Celah</span>
        <span>Jilid</span>
      </a>
      <span class="footer__dot" aria-hidden="true">·</span>
      <a href="#/glossary" class="footer__link">
        <span class="footer__link-altrea">Kitab Nama</span>
        <span>Glossarium</span>
      </a>
    </nav>
    <p class="footer__credit">
      Karya <strong>ALSTRINE</strong>
      <span class="footer__separator-inline" aria-hidden="true">·</span>
      <span class="footer__altrea-credit">Resonansi Pertama © 2026</span>
    </p>
    <p class="footer__sub">Kitab Pertama: Sebelum Nama Ada Sejarah</p>
  </div>
</footer>`;
}
