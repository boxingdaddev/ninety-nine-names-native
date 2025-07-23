# Bookmark System & Scoped Shuffle Logic

This document outlines the planned implementation of the bookmarking system, scoped shuffle behavior, and dynamic bookmark icon for navigation.

---

## 1. Scoped Shuffle Logic

- Shuffle affects only the **active card set**:
  - **All Cards View**: Shuffle all 99 names
  - **Bookmark View** (Favorites / Studying / Memorized): Shuffle only the filtered bookmarked cards
- **Memorized counter remains global** (`x of 99 memorized`)
- Prevents confusion since card numbers are removed and shuffle behaves intuitively per view

---

## 2. Dynamic Bookmark Icon (Right-Side Navigation)

### Left-Side Icons (Existing)
- ❤️ / 📖 / 🧠 toggles save states
- Gold = saved, Gray = unsaved
- Present on both sides of the card for symmetry

### Right-Side Icon (New)
- **Default State (No bookmarks):**
  - Bookmark outline (Gray #ccc)
  - Tap = no action

- **Single Bookmark Type Saved:**
  - Icon shows that bookmark (e.g., ❤️ in gold)
  - Tap = enter that bookmark view
  - Tap again (or back nav) = exit to all cards

- **Multiple Bookmark Types Saved:**
  - Icon cycles through saved types on tap (❤️ → 📖 → 🧠)
  - When desired icon is visible, tap again to enter that bookmark view
  - Tap again to exit view

---

## 3. Visual & Color Cycle (ASCII Sketch)

```
[ Outline ] (Gray #ccc) --tap--> [ ❤️ Heart ] (Gold #D4AF37)
          --tap--> [ 📖 Book ] (Gold #D4AF37)
          --tap--> [ 🧠 Brain ] (Gold #D4AF37)
          --tap--> (loops back to Outline if no bookmarks active)
```

- Gray = inactive (no bookmarks)
- Gold = active (at least one bookmark of that type saved)
- Cycle continues until desired category appears → second tap enters that view

---

## 4. Interaction Summary

- **Left side:** Toggle bookmarks (❤️ / 📖 / 🧠)
- **Right side:** Navigate bookmarks (cycle + enter/exit)
- **Shuffle button:** Scoped to current view (all vs filtered)
- **Memorized counter:** Always global (`x of 99 memorized`)

---

## 5. Next Steps Checklist

### Bookmark Storage & Logic
- [ ] Implement `useBookmarks` hook using AsyncStorage
- [ ] Add toggle functions for ❤️ / 📖 / 🧠
- [ ] Ensure bookmarks persist across sessions

### Dynamic Bookmark Icon
- [ ] Add right-side icon that updates dynamically
- [ ] Implement cycling behavior between saved types
- [ ] Handle single vs multiple bookmark categories
- [ ] Add tap-to-enter and tap-to-exit logic

### Scoped Shuffle
- [ ] Adjust shuffle to respect active view (all cards vs filtered bookmarks)
- [ ] Verify counter (`x of 99 memorized`) remains global

### UI Updates
- [ ] Ensure icons are mirrored on both sides of the card
- [ ] Place memorized counter in bookmark view header
- [ ] Test icon color transitions (Gray → Gold)

---
