# Architecture Overview

## Project Structure
```
ninety-nine-names-native/
│
├── App.js                 # Entry point (FlatList, shuffle, navigation)
├── FlipCard.jsx           # Flip card component: front/back design, bookmarking icons
├── DotIndicator.jsx       # Dots for current card index
├── sort-names.js          # Alphabetical sorting utility
├── 99names.json           # Local data: Arabic, transliteration, meaning
│
├── components/
│   └── MoonBadge.jsx      # Decorative badge (currently unused)
│
├── package.json           # Dependencies and scripts
├── npm-shrinkwrap.json    # Locked dependency versions
├── .gitignore             # Ignored files (node_modules, caches, package-lock)
└── README.md              # Setup and usage guide
```

---

## Key Files

### App.js
- Loads names from `99names.json`
- Manages shuffle vs alphabetical toggle
- Renders `FlipCard` via FlatList
- Tracks and updates current index

### FlipCard.jsx
- Flip animation using `react-native-card-flip`
- Shows Arabic, transliteration, and meaning
- Integrates ❤️, 📖, 🧠 bookmarking UI
- Scales Arabic text for extra-long names

### DotIndicator.jsx
- Renders dots for navigation
- Dynamically groups dots when > max visible (e.g., 99 names)

### sort-names.js
- Provides alphabetical sorting and restore to original order

---

## Data Flow

1. **Data source**: `99names.json`
2. **App.js**: Loads & sorts/shuffles → passes data to `FlipCard`
3. **FlipCard.jsx**: Handles flip UI and bookmarking interactions
4. **DotIndicator.jsx**: Shows current position visually

---

## Future Plans & Roadmap

### Bookmark Storage System
- Persist ❤️, 📖, 🧠 states with AsyncStorage
- Provide screens to view filtered bookmarks
- Add memorization counter (“x of 99 memorized”)

### Advanced Shuffle Controls
- Support shake-to-shuffle (expo-sensors)
- Swipe up/down to shuffle
- Reset to alphabetical toggle

### Typography & Layout
- Custom Arabic fonts (optional)
- Dynamic font scaling for long names

### Performance
- Optimize FlatList with windowing
- Cache sorted/shuffled arrays
- Improve dot indicator rendering

### Code Structure
- Extract state logic into hooks/context
- Prepare screens for multi-view navigation

### Internationalization
- Add multi-language support for translations

### Testing
- Unit tests with Jest
- E2E gesture tests with Detox

---

## Planned Folder Reorganization

```
ninety-nine-names-native/
├── App.js
├── 99names.json
│
├── components/      # UI building blocks
│   ├── FlipCard.jsx
│   ├── DotIndicator.jsx
│   └── MoonBadge.jsx
│
├── hooks/           # State and logic hooks
│   ├── useBookmarks.js
│   └── useShuffle.js
│
├── screens/         # Full-screen layouts (future)
│   ├── HomeScreen.jsx
│   └── BookmarksScreen.jsx
│
├── utils/           # Helper utilities
│   └── sort-names.js
│
└── assets/          # Fonts, images, etc.
```

### Transition Steps
1. Create folders: `components`, `hooks`, `screens`, `utils`
2. Move files (e.g., `FlipCard.jsx` → `components/`)
3. Update imports in `App.js` to match new paths
