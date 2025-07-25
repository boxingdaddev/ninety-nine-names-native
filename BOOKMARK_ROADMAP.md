# Bookmark Feature Roadmap

## Current Implementation
- Three bookmark types:
  - ❤️ **Favorites**
  - 📖 **Studying**
  - 🧠 **Memorized**
- Managed via `useBookmarks.js` hook in `hooks/`
- State only (not persisted yet)

---

## Future Improvements

### 1. Persistence
- Save bookmarks to device storage using `AsyncStorage`
- Optionally sync to cloud (e.g., Firebase) for multi-device use

### 2. Filtering and Views
- Dedicated screens to view only Favorites, Studying, or Memorized cards
- Counter badges (e.g., “12/99 memorized”)

### 3. Enhanced UX
- Visual highlights (e.g., colored border) when bookmarked
- Sort bookmarks or review by category
- Progress tracking (study goals, memorization streaks)

---

## Next Steps
- Add AsyncStorage integration
- Build bookmark filter screens
- Integrate with navigation (e.g., React Navigation for multiple screens)
