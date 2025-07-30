import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import FlipCard from '../components/FlipCard';
import DotIndicator from '../components/DotIndicator';
import AZIcon from '../components/AZIcon';
import { FontAwesome5 } from '@expo/vector-icons';
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

// Animated FontAwesome5 for folder color
const AnimatedFontAwesome5 = Animated.createAnimatedComponent(FontAwesome5);

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

  // Organize mode
  const [isOrganized, setIsOrganized] = useState(false);

  // Folder pulse animation (blue shades)
  const folderPulseAnim = useRef(new Animated.Value(0)).current;

  // Animate folder pulse when organized AND main deck active
  useEffect(() => {
    if (isOrganized && activeCategory === null) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(folderPulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(folderPulseAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      folderPulseAnim.stopAnimation();
      folderPulseAnim.setValue(0);
    }
  }, [isOrganized, activeCategory]);

  const folderColor = folderPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1E3A8A', '#2952CC'], // darker to lighter blue
  });

  const flatListRef = useRef(null);

  // Initialize shuffled names
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

  const handleToggleOrganize = () => {
    setIsOrganized((prev) => !prev);
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

  // Base deck logic
  let baseNames = isShuffled ? shuffledNames : names;

  // Filter main deck ONLY if organized mode is active
  let filteredBaseNames = isOrganized
    ? baseNames.filter(
        (item) =>
          !bookmarks.studied.includes(item.id) &&
          !bookmarks.memorized.includes(item.id)
      )
    : baseNames;

  let displayedNames =
    activeCategory === 'studied'
      ? baseNames.filter((item) => bookmarks.studied.includes(item.id))
      : activeCategory === 'memorized'
      ? baseNames.filter((item) => bookmarks.memorized.includes(item.id))
      : filteredBaseNames;

  // Auto-return to main deck if category becomes empty
  useEffect(() => {
    if (activeCategory && displayedNames.length === 0) {
      setActiveCategory(null);
      setCurrentIndex(0);
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  }, [activeCategory, displayedNames.length]);

  // Clamp currentIndex whenever deck length changes
  useEffect(() => {
    if (currentIndex >= displayedNames.length) {
      setCurrentIndex(displayedNames.length > 0 ? displayedNames.length - 1 : 0);
    }
  }, [displayedNames.length, activeCategory]);

  // Safe value for display (prevents "4 of 3")
  const safeIndex = Math.min(currentIndex + 1, displayedNames.length);

  return (
    <View style={{ flex: 1 }}>
      {/* Folder (Organize) Icon - bottom-right */}
      <TouchableOpacity
        onPress={() => {
          if (activeCategory === null) {
            handleToggleOrganize();
          }
        }}
        style={{
          position: 'absolute',
          bottom: 160,
          right: 70,
          zIndex: 10,
        }}
        hitSlop={10}
      >
        <AnimatedFontAwesome5
          name="folder"
          size={48}
          solid
          color={
            activeCategory === null
              ? isOrganized
                ? folderColor
                : '#D4AF37'
              : isOrganized
              ? '#2952CC'
              : '#D4AF37'
          }
        />
      </TouchableOpacity>

      {/* A-Z Toggle (bottom-left) */}
      <TouchableOpacity
        onPress={handleToggleAlphabetical}
        style={{
          position: 'absolute',
          bottom: 160,
          left: 70,
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
        extraData={{ bookmarks, activeCategory, isShuffled, isOrganized }}
        renderItem={({ item }) => (
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
        )}
      />

      {/* Main deck counter (activeCategory null) */}
      {activeCategory === null && (
        <View
          style={{
            position: 'absolute',
            bottom: 85,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text style={styles.brainCounter}>
            {safeIndex} of {displayedNames.length}
          </Text>
        </View>
      )}

      {/* Studied counter */}
      {activeCategory === 'studied' && (
        <View
          style={{
            position: 'absolute',
            bottom: 85,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text style={styles.brainCounter}>
            Studying {safeIndex} of {bookmarks.studied.length}
          </Text>
        </View>
      )}

      {/* Memorized counter */}
      {activeCategory === 'memorized' && (
        <View
          style={{
            position: 'absolute',
            bottom: 85,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text style={styles.brainCounter}>
            {bookmarks.memorized.length} of 99 Memorized
          </Text>
        </View>
      )}

      {/* Dot Indicator */}
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
