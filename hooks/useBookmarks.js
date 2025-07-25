import { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // For future persistence

export default function useBookmarks() {
  const [loved, setLoved] = useState([]);
  const [studied, setStudied] = useState([]);
  const [memorized, setMemorized] = useState([]);

  const toggle = (list, setList, id) => {
    setList(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleLove = (id) => toggle(loved, setLoved, id);
  const toggleStudy = (id) => toggle(studied, setStudied, id);
  const toggleMemorized = (id) => toggle(memorized, setMemorized, id);

  const getCounts = () => ({
    lovedCount: loved.length,
    studiedCount: studied.length,
    memorizedCount: memorized.length,
  });

  const getFilteredData = (names) => {
    const bookmarkedIds = new Set([...loved, ...studied, ...memorized]);
    return names.filter(item => bookmarkedIds.has(item.id));
  };

  return {
    loved,
    studied,
    memorized,
    toggleLove,
    toggleStudy,
    toggleMemorized,
    getCounts,
    getFilteredData
  };
}
