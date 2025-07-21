import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FlipCard from './FlipCard';
import DotIndicator from './components/DotIndicator'; // adjust path if different
import data from './assets/99names.json'; // your local data file

const { width, height } = Dimensions.get('window');

export default function App() {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputIndex, setInputIndex] = useState('');

  const scrollToIndex = (index) => {
    if (index >= 0 && index < data.length) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <FlipCard {...item} />
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
          console.warn('Scroll failed for index', info.index);
          setTimeout(() => {
            flatListRef.current.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }, 300);
        }}
      />


      <View style={styles.footer}>
        <Text style={styles.cardCount}>Card {currentIndex + 1} of {data.length}</Text>

        {/* DOT INDICATOR HERE */}
        <DotIndicator
          total={data.length}
          currentIndex={currentIndex}
          maxVisible={7}
        />

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Go to #"
            keyboardType="number-pad"
            value={inputIndex}
            onChangeText={setInputIndex}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => scrollToIndex(Number(inputIndex) - 1)} style={styles.goButton}>
            <Text style={styles.goText}>Go</Text>
          </TouchableOpacity>
        </View>
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
  cardCount: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  input: {
    height: 40,
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  goButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  goText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
