import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import { FontAwesome5 } from '@expo/vector-icons';
import MoonBadge from './MoonBadge';

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
  isStudied,
  toggleStudyBookmark,
  isLoved,
  toggleLoveBookmark,
  isMemorized,
  toggleMemorized,
}) {
  const cardRef = passedRef || React.useRef();

  return (
    <TouchableWithoutFeedback onPress={() => cardRef.current?.flip()}>
      <View style={styles.flipWrapper}>
        <CardFlip style={styles.cardContainer} ref={cardRef}>
          {/* FRONT */}
          <View style={[styles.card, styles.front]}>
            <MoonBadge />

            <View style={styles.iconRowFront}>
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

            <Text style={id === 20 ? styles.arabicLong : styles.arabic}>{name}</Text>
            <Text style={styles.translit}>{transliteration}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* BACK */}
          <View style={[styles.card, styles.back]}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.verse}>"{verse}"</Text>
            <Text style={styles.reference}>{reference}</Text>

            <View style={styles.iconRowBack}>
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
    fontSize: 54,
    color: '#D4AF37',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  arabicLong: {
    fontSize: 42,
    color: '#D4AF37',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  translit: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 0,
  },
  title: {
    fontSize: 18,
    color: '#222',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    color: '#444',
  },
  verse: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  reference: {
    fontSize: 12,
    textAlign: 'right',
    color: '#777',
    marginTop: 10,
    fontWeight: '500',
  },
  iconRowFront: {
    flexDirection: 'row',
    gap: 18,
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  iconRowBack: {
    flexDirection: 'row',
    gap: 18,
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});
