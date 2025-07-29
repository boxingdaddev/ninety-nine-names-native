import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import namesData from './assets/data/99names.json';
import HomeScreen from './screens/HomeScreen';
import useBookmarks from './components/hooks/useBookmarks';

// Font import
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

export default function App() {
  // Load fonts FIRST and block render until loaded
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null; // Could add splash screen here later
  }

  return <AppContent />;
}

function AppContent() {
  // Now safe to call useBookmarks AFTER fonts are loaded
  const {
    loved,
    studied,
    memorized,
    toggleLove,
    toggleStudy,
    toggleMemorized,
    getCounts,
    getFilteredData,
  } = useBookmarks();

  const bookmarks = { loved, studied, memorized };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f5e7' }}>
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
