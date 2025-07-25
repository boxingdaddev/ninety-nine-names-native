import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useBookmarks() {
  const [loved, setLoved] = useState([]);
  const [studied, setStudied] = useState([]);
  const [memorized, setMemorized] = useState([]);

  // Toggle helper
  const toggle = (list, setList, id) => {
    setList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleLove = (id) => toggle(loved, setLoved, id);
  const toggleStudy = (id) => toggle(studied, setStudied, id);
  const toggleMemorized = (id) => toggle(memorized, setMemorized, id);

  // Load saved bookmarks on app start
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('@bookmarkData');
        if (saved) {
          const parsed = JSON.parse(saved);
          setLoved(parsed.loved || []);
          setStudied(parsed.studied || []);
          setMemorized(parsed.memorized || []);
        }
      } catch (e) {
        console.log('Failed to load bookmarks', e);
      }
    })();
  }, []);

  // Save bookmarks whenever arrays change
  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(
          '@bookmarkData',
          JSON.stringify({ loved, studied, memorized })
        );
      } catch (e) {
        console.log('Failed to save bookmarks', e);
      }
    };
    save();
  }, [loved, studied, memorized]);

  // Counts for blue icons
  const getCounts = () => ({
    lovedCount: loved.length,
    studiedCount: studied.length,
    memorizedCount: memorized.length,
  });

  // Filtered data for bookmark-only view
  const getFilteredData = (names) => {
    const bookmarkedIds = new Set([...loved, ...studied, ...memorized]);
    return names.filter((item) => bookmarkedIds.has(item.id));
  };

  return {
    loved,
    studied,
    memorized,
    toggleLove,
    toggleStudy,
    toggleMemorized,
    getCounts,
    getFilteredData,
  };
}
