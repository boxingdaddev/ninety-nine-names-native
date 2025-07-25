import { useState } from 'react';

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState({
    loved: [],
    studied: [],
    memorized: [],
  });

  const toggle = (type, id) => {
    setBookmarks((prev) => {
      const exists = prev[type].includes(id);
      return {
        ...prev,
        [type]: exists ? prev[type].filter((i) => i !== id) : [...prev[type], id],
      };
    });
  };

  return {
    bookmarks,
    toggleLove: (id) => toggle('loved', id),
    toggleStudy: (id) => toggle('studied', id),
    toggleMemorized: (id) => toggle('memorized', id),
  };
}
