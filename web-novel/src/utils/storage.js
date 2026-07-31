/**
 * localStorage wrapper with namespace
 */
const NS = 'altrea_';

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(NS + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
    } catch { /* quota exceeded */ }
  },
  remove(key) {
    localStorage.removeItem(NS + key);
  }
};

// ── Progress helpers ─────────────────────────────────────────
export function getProgress() {
  return storage.get('progress', {
    lastRead: null,
    completed: [],
    bookmarks: []
  });
}

export function markChapterComplete(id) {
  const p = getProgress();
  if (!p.completed.includes(id)) p.completed.push(id);
  p.lastRead = id;
  storage.set('progress', p);
}

export function toggleBookmark(id) {
  const p = getProgress();
  const idx = p.bookmarks.indexOf(id);
  if (idx === -1) p.bookmarks.push(id);
  else p.bookmarks.splice(idx, 1);
  storage.set('progress', p);
  return p.bookmarks.includes(id);
}

export function isBookmarked(id) {
  return getProgress().bookmarks.includes(id);
}

export function isCompleted(id) {
  return getProgress().completed.includes(id);
}

// ── Preferences ──────────────────────────────────────────────
export function getPrefs() {
  return storage.get('prefs', {
    fontSize: 'md',
    readingMode: 'dark'
  });
}

export function setPrefs(updates) {
  const prefs = getPrefs();
  storage.set('prefs', { ...prefs, ...updates });
}
