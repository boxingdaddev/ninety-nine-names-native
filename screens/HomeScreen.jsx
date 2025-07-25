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
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={names}
        horizontal
        pagingEnabled
        snapToInterval={width}            // Full screen width snap
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
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Dot Indicator centered below card */}
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <DotIndicator total={names.length} currentIndex={currentIndex} />
      </View>
    </View>
  );
}
