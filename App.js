import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
} from 'react-native';
import FlipCard from './FlipCard';
import DotIndicator from './components/DotIndicator';
import data from './assets/99names.json';

const { width } = Dimensions.get('window');

export default function App() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jumpingToIndex, setJumpingToIndex] = useState(false);
  const [inputOverride, setInputOverride] = useState(null);
  const [studyList, setStudyList] = useState([]); // ✅ Study bookmarks
  const [loveList, setLoveList] = useState([]);
  const [memorizedList, setMemorizedList] = useState([]);


  const scrollToIndex = (index) => {
    if (index >= 0 && index < data.length) {
      setInputOverride(index + 1);
      setJumpingToIndex(true);
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
      setTimeout(() => {
        setJumpingToIndex(false);
        setInputOverride(null);
      }, 400);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const verticalSwipe = Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
        return verticalSwipe && Math.abs(gestureState.dy) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50 || gestureState.dy < -50) {
          const randomIndex = Math.floor(Math.random() * data.length);
          scrollToIndex(randomIndex);
        }
      },
    })
  ).current;

  const renderItem = ({ item, index }) => (
    <View style={styles.cardWrapper} {...panResponder.panHandlers}>
      <FlipCard
        {...item}
        currentIndex={currentIndex}
        isActive={index === currentIndex}
        onJumpToIndex={scrollToIndex}
        inputOverride={inputOverride}

        // ✅ STUDY
        isStudied={studyList.includes(item.id)}
        toggleStudyBookmark={() => {
          setStudyList((prev) =>
            prev.includes(item.id)
              ? prev.filter((id) => id !== item.id)
              : [...prev, item.id]
          );
        }}

        // ✅ LOVE
        isLoved={loveList.includes(item.id)}
        toggleLoveBookmark={() => {
          setLoveList((prev) =>
            prev.includes(item.id)
              ? prev.filter((id) => id !== item.id)
              : [...prev, item.id]
          );
        }}

        // ✅ MEMORIZED
        isMemorized={memorizedList.includes(item.id)}
        toggleMemorized={() => {
          setMemorizedList((prev) =>
            prev.includes(item.id)
              ? prev.filter((id) => id !== item.id)
              : [...prev, item.id]
          );
        }}
      />
    </View>
  );


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }, 300);
        }}
      />

      <View style={styles.footer}>
        <DotIndicator
          total={data.length}
          currentIndex={currentIndex}
          maxVisible={7}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf2',
  },
  cardWrapper: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 80,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
