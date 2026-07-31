import fs from 'fs';
import path from 'path';

const novelPath = 'c:/Users/adovan/Documents/belajar_coding/Altrea/novel/Altrea - Kitab Penciptaan.md';
const text = fs.readFileSync(novelPath, 'utf-8');

// Chapter headings in Indonesian ordinals/numbers
const jilidRegex = /^Jilid\s+([A-Za-z0-9\s]+?):\s*(.+)$/gm;

// Split by "Jilid " headings
const rawSections = text.split(/(?=^Jilid\s+)/m);

const chapters = {};

rawSections.forEach((sec, idx) => {
  const trimmed = sec.trim();
  if (!trimmed) return;

  const match = trimmed.match(/^Jilid\s+([A-Za-z0-9\s]+?):\s*(.+?)$/m);
  if (match) {
    const chapterNum = idx; // 1-indexed based on section position
    // Remove the title heading line from body
    const lines = trimmed.split('\n');
    const body = lines.slice(1).join('\n').trim();
    chapters[chapterNum] = body;
  }
});

console.log(`Parsed ${Object.keys(chapters).length} chapters.`);

// Save to src/content/chapters-full.json
const outputPath = './src/content/chapters-full.json';
fs.mkdirSync('./src/content', { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(chapters, null, 2), 'utf-8');
console.log('Saved to', outputPath);
