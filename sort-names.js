const fs = require('fs');

// Path to your JSON file
const filePath = './assets/99names.json';

// Load the file
const rawData = fs.readFileSync(filePath, 'utf-8');
let names = JSON.parse(rawData);

// Sort by transliteration (case-insensitive)
// List of common prefixes to ignore
const prefixes = ['Al-', 'Ar-', 'As-', 'Az-', 'An-', 'Ad-', 'At-', 'Ash-', 'Ab-', 'Adh-'];

// Function to strip prefix for sorting
function getSortKey(name) {
    const lower = name.toLowerCase();
    for (const prefix of prefixes) {
        if (lower.startsWith(prefix.toLowerCase())) {
            return lower.slice(prefix.length);
        }
    }
    return lower;
}

names.sort((a, b) => {
    return getSortKey(a.transliteration).localeCompare(getSortKey(b.transliteration));
});

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(names, null, 2), 'utf-8');

console.log('✅ 99names.json sorted by transliteration.');