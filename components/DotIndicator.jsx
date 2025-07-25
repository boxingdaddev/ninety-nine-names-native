import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function DotIndicator({
  total,
  currentIndex,
  maxVisible = 7,
}) {
  if (total <= 1) return null;

  // If total cards are less than maxVisible, one dot per card
  if (total <= maxVisible) {
    return (
      <View style={styles.container}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  }

  // For larger lists, map current progress proportionally to dots
  const progress = currentIndex / (total - 1); // range 0 to 1
  const activeDotIndex = Math.round(progress * (maxVisible - 1));

  return (
    <View style={styles.container}>
      {Array.from({ length: maxVisible }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === activeDotIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: '#D4AF37',
    transform: [{ scale: 1.4 }],
  },
  inactiveDot: {
    backgroundColor: '#e6d9aa',
    opacity: 0.5,
  },
});
