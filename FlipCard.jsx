import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import MoonBadge from './components/MoonBadge';
import { FontAwesome5 } from '@expo/vector-icons'; // ✅ book icon

const { width } = Dimensions.get('window');

export default function FlipCard({
  id,
  name,
  transliteration,
  title,
  description,
  verse,
  reference,
  cardRef: passedRef,
  currentIndex,
  onJumpToIndex,
  isActive,
  inputOverride,
  isStudied,
  toggleStudyBookmark,
  isLoved,
  toggleLoveBookmark,
  isMemorized,
  toggleMemorized,

}) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState('');
  const cardRef = passedRef || React.useRef();

  const handleSubmit = () => {
    const num = parseInt(input);
    if (!isNaN(num) && num >= 1 && num <= 99) {
      onJumpToIndex(num - 1);
    }
    setEditing(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => cardRef.current?.flip()}>
      <View style={styles.flipWrapper}>
        <CardFlip style={styles.cardContainer} ref={cardRef}>
          {/* FRONT */}
          <View style={[styles.card, styles.front]}>
            <MoonBadge number={id} />

            <View style={styles.numberWrapper}>
              {!editing ? (
                <TouchableOpacity
                  onPress={() => {
                    setInput((inputOverride ?? id).toString());
                    setEditing(true);
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.cardNumber}>{inputOverride ?? id}</Text>
                </TouchableOpacity>
              ) : (
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  autoFocus
                  keyboardType="number-pad"
                  onSubmitEditing={handleSubmit}
                  onBlur={() => setEditing(false)}
                  style={styles.cardNumberInput}
                  cursorColor="#D4AF37"
                />
              )}
            </View>

            <Text style={styles.arabic}>{name}</Text>
            <Text style={styles.translit}>{transliteration}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* BACK */}
          <View style={[styles.card, styles.back]}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.verse}>"{verse}"</Text>
            <Text style={styles.reference}>{reference}</Text>

            {/* 📖 3 Icons */}
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={toggleLoveBookmark} hitSlop={10}>
                <FontAwesome5
                  name="heart"
                  size={22}
                  solid
                  color={isLoved ? '#D4AF37' : '#ccc'}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleStudyBookmark} hitSlop={10}>
                <FontAwesome5
                  name="book-open"
                  size={22}
                  color={isStudied ? '#D4AF37' : '#ccc'}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleMemorized} hitSlop={10}>
                <FontAwesome5
                  name="brain"
                  size={22}
                  color={isMemorized ? '#D4AF37' : '#ccc'}
                />
              </TouchableOpacity>
            </View>


          </View>
        </CardFlip>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  flipWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: width * 0.85,
    height: width * 1.1,
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  front: {
    backgroundColor: '#fffaf0',
    borderColor: '#D4AF37',
    borderWidth: 2,
  },
  back: {
    backgroundColor: '#fdfdfd',
    borderColor: '#D4AF37',
    borderWidth: 2,
  },
  arabic: {
    fontSize: 42,
    color: '#D4AF37',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  translit: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
  },
  title: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    color: '#444',
  },
  verse: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
  reference: {
    fontSize: 12,
    textAlign: 'right',
    color: '#777',
    marginTop: 10,
  },
  numberWrapper: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 22,
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  cardNumberInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D4AF37',
    width: 40,
    textAlign: 'center',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 18,
    position: 'absolute',
    bottom: 12,
    right: 12,
  },

});
