# Ninety-Nine Names Native
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A React Native (Expo) app displaying the 99 Names of Allah with flip-card functionality, shuffle mode, and bookmarking (favorites, studying, memorized).

---

## Features

- Flip cards with tap gesture (front/back)
- Shuffle mode (toggle shuffle/alphabetical)
- Bookmark system:
  - ❤️ Favorites
  - 📖 Studying
  - 🧠 Memorized
- Enlarged Arabic typography with fallback scaling for long names
- Offline-first data from `99names.json`

---

## Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd ninety-nine-names-native
```

### 2. Install dependencies
Project uses `npm-shrinkwrap.json` for exact version locking:
```bash
npm ci --legacy-peer-deps
```

### 3. Run the app
```bash
npx expo start --tunnel
```
- Scan QR code with **Expo Go** on your phone
- Or press `w` to preview in browser

---

## Dependency Locking with `npm-shrinkwrap.json`

This project ignores `package-lock.json` in favor of shrinkwrap to ensure consistent installs across all machines.

### Why shrinkwrap?
- Guarantees exact dependencies (works with npm + CI/CD)
- Prevents accidental upgrades during `npm install`
- Essential for React Native native module compatibility

### Using on a new machine
```bash
npm ci --legacy-peer-deps
npx expo start --tunnel
```

### Updating intentionally
```bash
npm install package-name@latest
npm shrinkwrap
git add package.json npm-shrinkwrap.json
git commit -m "Update dependencies"
git push
```

---

## Development Notes

- `node_modules/` is ignored
- Expo caches (`.expo/`, `web-build/`, `dist/`) are ignored
- `package-lock.json` is intentionally ignored; use shrinkwrap

---

# Temporarily move shrinkwrap
mv npm-shrinkwrap.json npm-shrinkwrap.json.bak

# Install package, bypassing peer dependency conflicts
npm install <package-name> --legacy-peer-deps

# Regenerate shrinkwrap
npm shrinkwrap

# Remove backup
rm npm-shrinkwrap.json.bak

## Additional Documentation

For deeper architecture and roadmap, see [ARCHITECTURE.md](ARCHITECTURE.md).

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2025 Adam Makhyoun
