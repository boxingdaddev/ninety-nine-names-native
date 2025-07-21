import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import CardFlip from 'react-native-card-flip';
import MoonBadge from './components/MoonBadge';

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
}) {
  const fallbackRef = useRef();
  const cardRef = passedRef || fallbackRef;

  return (
    <TouchableWithoutFeedback onPress={() => cardRef.current?.flip()}>
      <View style={styles.flipWrapper}>
        <CardFlip style={styles.cardContainer} ref={cardRef}>
          {/* FRONT */}
          <View style={[styles.card, styles.front]}>
            <MoonBadge number={id} />
            <Text style={styles.arabic}>{name}</Text>
            <Text style={styles.translit}>{transliteration}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* BACK */}
          <View style={[styles.card, styles.back]}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.verse}>
              "{verse}"
            </Text>
            <Text style={styles.reference}>{reference}</Text>
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
});
