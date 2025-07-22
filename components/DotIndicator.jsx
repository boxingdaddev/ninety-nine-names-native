import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function DotIndicator({
  total,
  currentIndex,
  maxVisible = 7,
}) {
  if (total <= 1) return null;

  // If total is less than maxVisible, just show 1 dot per card
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

  // For longer lists, chunk the dots based on range
  const chunkSize = Math.ceil(total / maxVisible);
  const dotCount = maxVisible;
  const activeDotIndex = Math.floor(currentIndex / chunkSize);

  return (
    <View style={styles.container}>
      {Array.from({ length: dotCount }).map((_, i) => (
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
