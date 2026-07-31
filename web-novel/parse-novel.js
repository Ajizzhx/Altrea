import fs from 'fs';

const novelPath = 'c:/Users/adovan/Documents/belajar_coding/Altrea/novel/Altrea - Kitab Penciptaan.md';
const text = fs.readFileSync(novelPath, 'utf-8');

// Split by "Jilid " headings
const rawSections = text.split(/(?=^Jilid\s+)/m);

const chapters = {};
let chapterIndex = 0;

rawSections.forEach((sec) => {
  const trimmed = sec.trim();
  if (!trimmed) return;

  const match = trimmed.match(/^Jilid\s+([A-Za-z0-9\s]+?):\s*(.+?)$/m);
  if (match) {
    chapterIndex++;
    // Remove the title heading line from body
    const lines = trimmed.split('\n');
    const body = lines.slice(1).join('\n').trim();
    chapters[chapterIndex] = body;
  }
});

console.log(`Parsed ${Object.keys(chapters).length} chapters.`);
console.log(`Keys: ${Object.keys(chapters).join(', ')}`);

// Save to src/content/chapters-full.json
const outputPath = './src/content/chapters-full.json';
fs.mkdirSync('./src/content', { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(chapters, null, 2), 'utf-8');
console.log('Saved to', outputPath);
