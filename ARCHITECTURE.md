# Ninety-Nine Names Native – Architecture

## Overview
This React Native (Expo) app displays the 99 Names of Allah as interactive flashcards with horizontal swipe navigation. Users can bookmark cards into three categories (❤️ Favorites, 📖 Studying, 🧠 Memorized).  

The app is designed to be modular and scalable, with separate folders for components, screens, hooks, utilities, and assets.

Counter and organize mode, to see how many card you have studied, how many you have committed to memory, and how many names remain waiting to be learned.

---

## Folder Structure

project-root/
│
├── App.js                    # Entry point
├── assets/
│   └── data/99names.json     # Static names data
│
├── components/               # Reusable UI + hooks
│   ├── FlipCard.jsx          # Front/back flashcard
│   ├── DotIndicator.jsx      # Page indicator
│   ├── MoonBadge.jsx         # Decorative badge (card front)
│   └── hooks/                # Bookmark logic & custom hooks
│       └── useBookmarks.js   # Bookmark state + persistence (AsyncStorage)
│
├── screens/
│   └── HomeScreen.jsx        # Main screen with FlatList and horizontal navigation
│
└── utils/
    └── shuffle-names.js      # Future shuffle feature

---

## Data Flow

1. **App.js**
   - Imports `99names.json`
   - Initializes bookmark state via `useBookmarks`
   - Renders `HomeScreen` with prepared data

2. **HomeScreen.jsx**
   - Displays cards using `FlatList` (horizontal paging)
   - Tracks current index for DotIndicator
   - (Future) Can reintroduce vertical swipe shuffle

3. **FlipCard.jsx**
   - Displays Arabic, transliteration, meaning, verse, and reference
   - Handles front/back flip on tap
   - Bookmark icons trigger updates via callbacks from `App.js`

4. **DotIndicator.jsx**
   - Shows active card position
   - Supports large lists by chunking dots if needed

---

## Styling Notes

- Cards use **0.85 width factor** to show background margins for aesthetics
- Dot indicator is **centered and positioned** near bottom (`bottom: 40`)
- Special handling for **long Arabic names** (e.g., ID 20) with smaller font

---

## Current Limitations

- Shuffle logic removed for now (vertical swipe reserved for future)
- Data assumes **JSON is pre-sorted alphabetically**

---

## Future Enhancements

- Reintroduce vertical swipe shuffle (random vs alphabetical)
- Bookmark filters and dedicated bookmark screens
- Persist bookmarks (AsyncStorage or cloud sync)
- Dynamic font scaling for varying screen sizes
---

## Developer Quickstart

install dependencies respecting the shrink wrap
npm ci --legacy-peer-deps
