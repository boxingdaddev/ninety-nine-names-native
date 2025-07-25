# Transition Steps – July 2025 Reorganization

## Goal
Reorganize the project into a maintainable structure, simplify code, and remove unstable shuffle logic for an immediate production push.

---

## What Changed

### Folder Reorganization
- Created `components/`, `screens/`, `hooks/`, `utils/`, and `assets/data/`
- Moved `FlipCard`, `DotIndicator`, and `MoonBadge` to `components/`
- Created `HomeScreen.jsx` for horizontal swipe logic
- Extracted bookmark logic into `useBookmarks.js`

### Feature Adjustments
- Removed `sort-names.js` (alphabetical order handled by JSON)
- Removed shuffle logic (vertical swipe) for stability
- Horizontal swipe implemented via `FlatList` with proper snapping

### Styling Fixes
- Cards centered at 85% width with background margins
- Dot indicator repositioned to bottom center (`bottom: 40`)
- Special-case font size for long Arabic names (ID 20)

---

## Future Steps
- Reintroduce shuffle using Gesture API (vertical swipe)
- Implement bookmark filtering and counters
- Add local persistence (AsyncStorage) for bookmarks
- Consider multiple screens (settings, bookmark views)
