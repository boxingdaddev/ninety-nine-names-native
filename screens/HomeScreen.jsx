import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FlipCard from '../components/FlipCard';
import DotIndicator from '../components/DotIndicator';
import AZIcon from '../components/AZIcon';
import shuffleNames from '../utils/shuffle-names';

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
  const [isShuffled, setIsShuffled] = useState(true);
  const [shuffledNames, setShuffledNames] = useState([]);

  const flatListRef = useRef(null);

  useEffect(() => {
    setShuffledNames(shuffleNames(names));
  }, [names]);

  const handleToggleAlphabetical = () => {
    if (isShuffled) {
      setIsShuffled(false);
      setCurrentIndex(0);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    } else {
      setShuffledNames(shuffleNames(names));
      setIsShuffled(true);
      setCurrentIndex(0);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  };

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

  const throttledSetActiveCategory = throttle((category) => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    setCurrentIndex(0);
    setActiveCategory(category);
  }, 200);

  const safeToggle = (callback) => {
    if (isScrolling) {
      setPendingUpdate(true);
    }
    callback();
  };

  const throttledToggleLove = (id) => safeToggle(() => throttle(toggleLove, 200)(id));
  const throttledToggleStudy = (id) => safeToggle(() => throttle(toggleStudy, 200)(id));
  const throttledToggleMemorized = (id) =>
    safeToggle(() => throttle(toggleMemorized, 200)(id));

  let baseNames = isShuffled ? shuffledNames : names;

  let displayedNames =
    // Removed loved filter branch (blue heart) for cleaner bookmark mode
    // activeCategory === 'loved'
    //   ? baseNames.filter((item) => bookmarks.loved.includes(item.id))
    activeCategory === 'studied'
      ? baseNames.filter((item) => bookmarks.studied.includes(item.id))
      : activeCategory === 'memorized'
      ? baseNames.filter((item) => bookmarks.memorized.includes(item.id))
      : baseNames;


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
      {/* A-Z Toggle (bottom-right) */}
      <TouchableOpacity
        onPress={handleToggleAlphabetical}
        style={{
          position: 'absolute',
          bottom: 160,
          right: 70,
          zIndex: 10,
        }}
        hitSlop={10}
      >
        <AZIcon isShuffled={isShuffled} size={48} />
      </TouchableOpacity>

      {/* FlipCard List */}
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
        extraData={{ bookmarks, activeCategory, isShuffled }}
        renderItem={({ item }) => {
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

      {/* Brain Counter (only memorized mode) */}
      {activeCategory === 'memorized' && (
        <View
          style={{
            position: 'absolute',
            bottom: 85, // above DotIndicator
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text style={styles.brainCounter}>
            {bookmarks.memorized.length} of 99 Memorized
          </Text>
        </View>
      )}

      {/* Dot Indicator (unchanged logic) */}
      <View
        style={{
          position: 'absolute',
          bottom: 60,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <DotIndicator
          total={displayedNames.length}
          currentIndex={currentIndex}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brainCounter: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D4AF37',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
