import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import FlipCard from '../components/FlipCard';
import DotIndicator from '../components/DotIndicator';

const { width } = Dimensions.get('window');

export default function HomeScreen({
  names,
  bookmarks,
  toggleLove,
  toggleStudy,
  toggleMemorized
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null); // Track active filter
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };

  // Reset scroll position whenever category changes
  const handleSetActiveCategory = (category) => {
    // Always scroll to beginning of new dataset
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    setCurrentIndex(0);
    setActiveCategory(category);
  };

  // Filter cards based on activeCategory
  const displayedNames =
    activeCategory === 'loved'
      ? names.filter((item) => bookmarks.loved.includes(item.id))
      : activeCategory === 'studied'
        ? names.filter((item) => bookmarks.studied.includes(item.id))
        : activeCategory === 'memorized'
          ? names.filter((item) => bookmarks.memorized.includes(item.id))
          : names;

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
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        // Key changes when category changes to avoid ghost frame
        keyExtractor={(item) => `${activeCategory || 'all'}-${item.id}`}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: 'center' }}>
            <FlipCard
              {...item}
              isLoved={bookmarks.loved.includes(item.id)}
              toggleLoveBookmark={() => toggleLove(item.id)}
              isStudied={bookmarks.studied.includes(item.id)}
              toggleStudyBookmark={() => toggleStudy(item.id)}
              isMemorized={bookmarks.memorized.includes(item.id)}
              toggleMemorized={() => toggleMemorized(item.id)}
              counts={{
                loved: bookmarks.loved.length,
                studied: bookmarks.studied.length,
                memorized: bookmarks.memorized.length,
              }}
              activeCategory={activeCategory}
              setActiveCategory={handleSetActiveCategory} // use wrapped setter
            />
          </View>
        )}
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
