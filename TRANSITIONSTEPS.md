# Transition Steps: Folder Reorganization

This document outlines how to reorganize the project from a flat structure into a scalable folder layout (components, hooks, utils, screens).

---

## 1. Why Transition?

- **Scalability**: Easier to add new features (screens, hooks) without clutter.
- **Clarity**: UI components, logic hooks, and helpers are clearly separated.
- **Maintainability**: Future contributors can quickly navigate the codebase.

---

## 2. Step-by-Step Plan

### Step 1: Prepare New Folders
```bash
mkdir components hooks screens utils assets
```

---

### Step 2: Move Files
```bash
mv FlipCard.jsx components/
mv DotIndicator.jsx components/
mv sort-names.js utils/
# If MoonBadge.jsx is reintroduced → components/
```

---

### Step 3: Update Imports
Update file paths in `App.js` (and other affected files):

```javascript
import FlipCard from './components/FlipCard';
import DotIndicator from './components/DotIndicator';
import sortNames from './utils/sort-names';
```

---

### Step 4: Test App
Run Expo in tunnel mode and verify the app works:

```bash
npx expo start --tunnel
```

- Ensure cards flip correctly
- Verify shuffle toggle
- Check bookmark icons still function

---

### Step 5: Commit Changes
```bash
git add .
git commit -m "Restructure project into components/hooks/utils/screens"
git push
```

---

## 3. Post-Transition Checklist

- `.gitignore` still ignores `node_modules/`, caches, and `package-lock.json`
- `npm-shrinkwrap.json` is present and committed
- App works on all machines (test on laptop + desktop)

---
