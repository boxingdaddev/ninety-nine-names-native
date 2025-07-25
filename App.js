import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import namesData from './assets/data/99names.json';
import HomeScreen from './screens/HomeScreen';
import useBookmarks from './components/hooks/useBookmarks';

export default function App() {
  // Initialize bookmark hook
  const {
    loved,
    studied,
    memorized,
    toggleLove,
    toggleStudy,
    toggleMemorized,
    getCounts,
    getFilteredData
  } = useBookmarks();

  // Prepare bookmarks object for HomeScreen
  const bookmarks = { loved, studied, memorized };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <HomeScreen
        names={namesData}
        bookmarks={bookmarks}
        toggleLove={toggleLove}
        toggleStudy={toggleStudy}
        toggleMemorized={toggleMemorized}
      />
    </SafeAreaView>
  );
}
