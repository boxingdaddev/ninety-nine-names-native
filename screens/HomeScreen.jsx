import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import FlipCard from '../components/FlipCard';
import DotIndicator from '../components/DotIndicator';

const { width } = Dimensions.get('window');

// Throttle utility
const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

export default function HomeScreen({
  names,
  bookmarks,
  toggleLove,
  toggleStudy,
  toggleMemorized
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };

  const handleMomentumScrollBegin = () => setIsScrolling(true);

  const handleMomentumScrollEnd = () => {
    setIsScrolling(false);
    if (pendingUpdate) {
      setPendingUpdate(false);
      setActiveCategory((prev) => prev);
    }
  };

  // Throttled category setter for blue icon filters
  const throttledSetActiveCategory = throttle((category) => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    setCurrentIndex(0);
    setActiveCategory(category);
  }, 200);

  // Safe toggle wrapper for gold icons
  const safeToggle = (callback) => {
    if (isScrolling) {
      setPendingUpdate(true);
    }
    callback();
  };

  // Throttled bookmark toggles (gold icons)
  const throttledToggleLove = (id) => safeToggle(() => throttle(toggleLove, 200)(id));
  const throttledToggleStudy = (id) => safeToggle(() => throttle(toggleStudy, 200)(id));
  const throttledToggleMemorized = (id) =>
    safeToggle(() => throttle(toggleMemorized, 200)(id));

  // Compute filtered list
  let displayedNames =
    activeCategory === 'loved'
      ? names.filter((item) => bookmarks.loved.includes(item.id))
      : activeCategory === 'studied'
        ? names.filter((item) => bookmarks.studied.includes(item.id))
        : activeCategory === 'memorized'
          ? names.filter((item) => bookmarks.memorized.includes(item.id))
          : names;

  // If filtered view is empty, insert dummy card to trigger safe exit
  const isDummy = activeCategory && displayedNames.length === 0;
  if (isDummy) {
    displayedNames = [
      {
        id: 'dummy',
        name: '',
        transliteration: '',
        title: '',
        description: '',
        verse: '',
        reference: '',
      },
    ];
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={displayedNames}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        keyExtractor={(item) => item.id.toString()}
        extraData={{ bookmarks, activeCategory }}
        renderItem={({ item }) => {
          // Detect dummy card → exit filter on next tick
          if (item.id === 'dummy') {
            setTimeout(() => {
              setActiveCategory(null);
              setCurrentIndex(0);
              flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            }, 0);
            return <View style={{ width }} />;
          }

          return (
            <View style={{ width, alignItems: 'center' }}>
              <FlipCard
                {...item}
                isLoved={bookmarks.loved.includes(item.id)}
                toggleLoveBookmark={() => throttledToggleLove(item.id)}
                isStudied={bookmarks.studied.includes(item.id)}
                toggleStudyBookmark={() => throttledToggleStudy(item.id)}
                isMemorized={bookmarks.memorized.includes(item.id)}
                toggleMemorized={() => throttledToggleMemorized(item.id)}
                counts={{
                  loved: bookmarks.loved.length,
                  studied: bookmarks.studied.length,
                  memorized: bookmarks.memorized.length,
                }}
                activeCategory={activeCategory}
                setActiveCategory={throttledSetActiveCategory}
              />
            </View>
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 40,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <DotIndicator total={displayedNames.length} currentIndex={currentIndex} />
      </View>
    </View>
  );
}
