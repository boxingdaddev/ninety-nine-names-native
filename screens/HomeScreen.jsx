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
  const [showBookmarks, setShowBookmarks] = useState(false);
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };

  const counts = {
    loved: bookmarks.loved.length,
    studied: bookmarks.studied.length,
    memorized: bookmarks.memorized.length
  };

  const toggleView = () => {
    setShowBookmarks(prev => !prev);
    // Reset index when switching view
    setCurrentIndex(0);
    flatListRef.current?.scrollToIndex({ index: 0, animated: false });
  };

  // Choose data based on toggle
  const displayedNames = showBookmarks
    ? names.filter(item =>
        bookmarks.loved.includes(item.id) ||
        bookmarks.studied.includes(item.id) ||
        bookmarks.memorized.includes(item.id)
      )
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
              counts={counts}
              onSummaryToggle={toggleView}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
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
