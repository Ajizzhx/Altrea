/**
 * SVG Ornament Generator
 * Returns inline SVG strings for various ornamental elements
 */

export const ornaments = {
  /**
   * Geometric arch frame (Islamic Gothic style)
   * Used for: hero, chapter headers
   */
  archFrame(opts = {}) {
    const {
      width = 320, height = 480,
      color = '#c9a84c', opacity = 0.8,
      animated = false
    } = opts;
    const anim = animated ? `<animateTransform attributeName="transform" type="scale" values="1;1.005;1" dur="4s" repeatCount="indefinite"/>` : '';
    return `<svg viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" 
      class="ornament-arch-frame" aria-hidden="true" style="width:${width}px;max-width:100%">
      <!-- Outer frame -->
      <path d="M20,${height-20} L20,100 Q20,20 ${width/2},20 Q${width-20},20 ${width-20},100 L${width-20},${height-20} Z"
        stroke="${color}" stroke-width="1.5" stroke-opacity="${opacity}" fill="none"/>
      <!-- Inner frame -->
      <path d="M36,${height-36} L36,108 Q36,36 ${width/2},36 Q${width-36},36 ${width-36},108 L${width-36},${height-36} Z"
        stroke="${color}" stroke-width="0.8" stroke-opacity="${opacity * 0.5}" fill="none"/>
      <!-- Corner accents TL -->
      <path d="M20,${height-20} L20,${height-50} M20,${height-20} L50,${height-20}" stroke="${color}" stroke-width="2" stroke-opacity="${opacity}"/>
      <!-- Corner accents TR -->
      <path d="M${width-20},${height-20} L${width-20},${height-50} M${width-20},${height-20} L${width-50},${height-20}" stroke="${color}" stroke-width="2" stroke-opacity="${opacity}"/>
      <!-- Bottom center ornament -->
      <polygon points="${width/2},${height-8} ${width/2-6},${height-20} ${width/2+6},${height-20}" 
        fill="${color}" fill-opacity="${opacity * 0.7}"/>
      <!-- Top peak -->
      <circle cx="${width/2}" cy="18" r="4" fill="none" stroke="${color}" stroke-width="1.5" stroke-opacity="${opacity}"/>
      <circle cx="${width/2}" cy="18" r="1.5" fill="${color}" fill-opacity="${opacity}"/>
      ${anim}
    </svg>`;
  },

  /**
   * Diamond/lancip frame
   * Used for: chapter cards, glossary entries
   */
  lancipFrame(opts = {}) {
    const {
      width = 200, height = 280,
      color = '#c9a84c', opacity = 0.7
    } = opts;
    return `<svg viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="ornament-lancip-frame" aria-hidden="true">
      <path d="M${width/2},8 L${width-12},30 L${width-12},${height-30} L${width/2},${height-8} L12,${height-30} L12,30 Z"
        stroke="${color}" stroke-width="1" stroke-opacity="${opacity}" fill="none"/>
      <path d="M${width/2},16 L${width-22},34 L${width-22},${height-34} L${width/2},${height-16} L22,${height-34} L22,34 Z"
        stroke="${color}" stroke-width="0.5" stroke-opacity="${opacity * 0.5}" fill="none"/>
      <!-- Corner diamonds -->
      <polygon points="${width/2},2 ${width/2+4},8 ${width/2},14 ${width/2-4},8" fill="${color}" fill-opacity="${opacity * 0.8}"/>
      <polygon points="${width/2},${height-2} ${width/2+4},${height-8} ${width/2},${height-14} ${width/2-4},${height-8}" fill="${color}" fill-opacity="${opacity * 0.8}"/>
    </svg>`;
  },

  /**
   * Large mandala divider
   */
  mandalaLg(opts = {}) {
    const { color = '#c9a84c', size = 120 } = opts;
    const r = size / 2;
    return `<svg viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="ornament-mandala-lg" aria-hidden="true" style="width:${size}px;height:${size}px">
      <g class="mandala-rotate-slow">
        <!-- Outer ring -->
        <circle cx="${r}" cy="${r}" r="${r-4}" stroke="${color}" stroke-width="0.5" stroke-opacity="0.4"/>
        <!-- 8-pointed star outer -->
        ${Array.from({length:8}, (_,i) => {
          const a = (i * 45) * Math.PI/180;
          const a2 = ((i * 45) + 22.5) * Math.PI/180;
          const x1 = r + (r-8) * Math.sin(a), y1 = r - (r-8) * Math.cos(a);
          const x2 = r + (r-20) * Math.sin(a2), y2 = r - (r-20) * Math.cos(a2);
          const x3 = r + (r-8) * Math.sin(a + Math.PI/4), y3 = r - (r-8) * Math.cos(a + Math.PI/4);
          return `<path d="M${r},${r} L${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} Z" 
            fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="0.5" stroke-opacity="0.5"/>`;
        }).join('')}
        <!-- Inner ring -->
        <circle cx="${r}" cy="${r}" r="${r-30}" stroke="${color}" stroke-width="0.8" stroke-opacity="0.5"/>
        <!-- 8-pointed star inner -->
        ${Array.from({length:8}, (_,i) => {
          const a = (i * 45 + 22.5) * Math.PI/180;
          const x = r + (r-30) * Math.sin(a), y = r - (r-30) * Math.cos(a);
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="${color}" fill-opacity="0.6"/>`;
        }).join('')}
        <!-- Center -->
        <circle cx="${r}" cy="${r}" r="${r-46}" stroke="${color}" stroke-width="1" stroke-opacity="0.6"/>
        <circle cx="${r}" cy="${r}" r="4" fill="${color}" fill-opacity="0.7"/>
      </g>
      <style>
        .mandala-rotate-slow {
          transform-origin: ${r}px ${r}px;
          animation: mandalaRotate 30s linear infinite;
        }
        @keyframes mandalaRotate { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .mandala-rotate-slow { animation: none; }
        }
      </style>
    </svg>`;
  },

  /**
   * Small mandala (inline text divider)
   */
  mandalaSm(opts = {}) {
    const { color = '#c9a84c', size = 40 } = opts;
    const r = size / 2;
    return `<svg viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="ornament-mandala-sm" aria-hidden="true" style="width:${size}px;height:${size}px;display:inline-block;vertical-align:middle">
      <g class="mandala-sm-rotate">
        <circle cx="${r}" cy="${r}" r="${r-3}" stroke="${color}" stroke-width="0.5" stroke-opacity="0.5"/>
        ${Array.from({length:8}, (_,i) => {
          const a = (i * 45) * Math.PI/180;
          const x = r + (r-6) * Math.sin(a), y = r - (r-6) * Math.cos(a);
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.5" fill="${color}" fill-opacity="0.5"/>`;
        }).join('')}
        <circle cx="${r}" cy="${r}" r="3" fill="${color}" fill-opacity="0.6"/>
      </g>
      <style>
        .mandala-sm-rotate {
          transform-origin: ${r}px ${r}px;
          animation: mandalaRotate 20s linear infinite;
        }
      </style>
    </svg>`;
  },

  /**
   * Corner ornament (4-sided)
   */
  corner(pos = 'tl', opts = {}) {
    const { color = '#c9a84c', size = 24 } = opts;
    const transforms = {
      'tl': '',
      'tr': `transform="rotate(90, ${size/2}, ${size/2})"`,
      'br': `transform="rotate(180, ${size/2}, ${size/2})"`,
      'bl': `transform="rotate(270, ${size/2}, ${size/2})"`
    };
    return `<svg viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="ornament-corner ornament-corner--${pos}" aria-hidden="true" style="width:${size}px;height:${size}px">
      <g ${transforms[pos] || ''}>
        <path d="M2,${size-2} L2,8 Q2,2 8,2 L${size-2},2" stroke="${color}" stroke-width="1.5" fill="none" stroke-opacity="0.8"/>
        <path d="M5,${size-5} L5,10 Q5,5 10,5 L${size-5},5" stroke="${color}" stroke-width="0.5" fill="none" stroke-opacity="0.4"/>
        <circle cx="2" cy="2" r="2" fill="${color}" fill-opacity="0.7"/>
      </g>
    </svg>`;
  },

  /**
   * Horizontal separator with center ornament
   */
  separator(opts = {}) {
    const { color = '#c9a84c', width = 300 } = opts;
    const mid = width / 2;
    return `<svg viewBox="0 0 ${width} 20" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="ornament-separator" aria-hidden="true" style="width:100%;max-width:${width}px">
      <line x1="0" y1="10" x2="${mid-16}" y2="10" stroke="${color}" stroke-width="0.5" stroke-opacity="0.6"/>
      <polygon points="${mid},3 ${mid+5},10 ${mid},17 ${mid-5},10" fill="none" stroke="${color}" stroke-width="1" stroke-opacity="0.8"/>
      <polygon points="${mid},6 ${mid+3},10 ${mid},14 ${mid-3},10" fill="${color}" fill-opacity="0.5"/>
      <line x1="${mid+16}" y1="10" x2="${width}" y2="10" stroke="${color}" stroke-width="0.5" stroke-opacity="0.6"/>
      <circle cx="${mid-20}" cy="10" r="2" fill="${color}" fill-opacity="0.4"/>
      <circle cx="${mid+20}" cy="10" r="2" fill="${color}" fill-opacity="0.4"/>
    </svg>`;
  },

  /**
   * Arc header divider (larger, for arc sections)
   */
  arcHeader(opts = {}) {
    const { color = '#c9a84c', width = 600 } = opts;
    return `<svg viewBox="0 0 ${width} 32" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="ornament-arc-header" aria-hidden="true" style="width:100%;max-width:${width}px">
      <line x1="0" y1="16" x2="${width*0.3}" y2="16" stroke="${color}" stroke-width="0.5" stroke-opacity="0.4"/>
      <path d="M${width*0.3},16 Q${width*0.35},4 ${width*0.4},16 Q${width*0.45},28 ${width*0.5},16 Q${width*0.55},4 ${width*0.6},16 Q${width*0.65},28 ${width*0.7},16"
        stroke="${color}" stroke-width="0.8" fill="none" stroke-opacity="0.7"/>
      <line x1="${width*0.7}" y1="16" x2="${width}" y2="16" stroke="${color}" stroke-width="0.5" stroke-opacity="0.4"/>
      <circle cx="${width*0.5}" cy="16" r="3" fill="${color}" fill-opacity="0.6"/>
    </svg>`;
  }
};
