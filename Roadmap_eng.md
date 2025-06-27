# 📍 MarkPaste Roadmap

This document outlines ideas, planned enhancements, and features for MarkPaste. It’s a living guide that evolves with the project — focused on great user experience, scalable architecture, and productivity.

---

## ✅ Current Phase: CRUD foundation

- [x] Local SQLite database via Tauri plugin
- [x] Split tables: `categories` and `snippets`
- [x] Seed database with sample data
- [x] `useSnippets()` hook with dynamic grouping
- [x] Sidebar renders real database data
- [x] Create snippet via “New” button
- [x] Preparing update functionality with `updateSnippet`

---

## 🚧 Planned Improvements (short term)

### Sidebar & UX
- [ ] Expand/collapse category folders in sidebar
- [ ] Show empty categories
- [ ] Right-click context menu in sidebar:
  - New category
  - Rename
  - Delete
- [ ] Drag-and-drop snippets between categories

### Editor
- [ ] Open snippet when clicked in sidebar
- [ ] Edit title/content in editor
- [ ] “Save” button persists to database (`updateSnippet`)
- [ ] “Delete snippet” button
- [ ] Category dropdown or autocomplete

---

## 💡 Future Ideas (medium/long term)

### Organization & UI
- [ ] Custom colors or icons for categories
- [ ] Favorite/starred snippets
- [ ] Tag support per snippet

### Usability & Performance
- [ ] Search by title, content or tag
- [ ] Quick filtering by category or tag
- [ ] Dark/light theme toggle

### Backup & Interoperability
- [ ] Import/export snippets as `.json` or `.md`
- [ ] Export full database (`markpaste.db`)
- [ ] Future sync support (e.g. Git or local storage)

### Internationalization
- [ ] Language selector for UI translation (🇧🇷 Portuguese, 🇺🇸 English, etc.)

---

## ✨ Bonus Features to Explore

- [ ] Reopen last-used snippet on app load
- [ ] General settings panel
- [ ] Smooth open/close animation for folders
- [ ] Keyboard shortcuts (`Ctrl + N`, `Ctrl + S`, etc.)

---

_This roadmap will evolve along with the codebase. Every step we take makes MarkPaste more powerful and user-friendly_ 🚀
