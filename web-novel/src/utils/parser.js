import { marked } from 'marked';

/**
 * Parse Markdown content into HTML with Altrea-specific formatting
 */
marked.setOptions({
  breaks: true,
  gfm: true
});

export function parseChapter(markdown) {
  // Split into paragraphs
  const html = marked.parse(markdown);
  return html;
}

/**
 * Process HTML to add Altrea-specific styles:
 * - Drop cap on first paragraph
 * - Pull quotes on lines starting with >
 * - Section break ornaments on --- 
 */
export function processReaderHTML(html) {
  // Add drop cap class to first paragraph
  let processed = html.replace(
    /^(<p>)(.)/,
    '<p class="drop-cap">$2'
  );

  // Wrap blockquotes as pull quotes
  processed = processed.replace(
    /<blockquote>\s*<p>(.*?)<\/p>\s*<\/blockquote>/gs,
    '<div class="pull-quote" role="blockquote"><div class="pull-quote__line"></div><p>$1</p><div class="pull-quote__line"></div></div>'
  );

  // Replace <hr> with ornamental divider
  processed = processed.replace(
    /<hr\s*\/?>/g,
    `<div class="ornament-break" aria-hidden="true">
      <svg viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="24">
        <line x1="0" y1="12" x2="45" y2="12" stroke="#c9a84c" stroke-width="0.5" opacity="0.6"/>
        <polygon points="60,4 64,12 60,20 56,12" fill="none" stroke="#c9a84c" stroke-width="0.8"/>
        <polygon points="60,7 63,12 60,17 57,12" fill="none" stroke="#c9a84c" stroke-width="0.5" opacity="0.5"/>
        <line x1="75" y1="12" x2="120" y2="12" stroke="#c9a84c" stroke-width="0.5" opacity="0.6"/>
      </svg>
    </div>`
  );

  return processed;
}
