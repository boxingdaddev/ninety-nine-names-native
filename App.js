import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import namesData from './assets/data/99names.json';
import useBookmarks from './hooks/useBookmarks';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const { bookmarks, toggleLove, toggleStudy, toggleMemorized } = useBookmarks();
  const [names, setNames] = useState([]);

  useEffect(() => {
    setNames(namesData); // Alphabetical JSON order
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HomeScreen
          names={names}
          bookmarks={bookmarks}
          toggleLove={toggleLove}
          toggleStudy={toggleStudy}
          toggleMemorized={toggleMemorized}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
