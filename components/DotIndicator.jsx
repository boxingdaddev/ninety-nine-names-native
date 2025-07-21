import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function DotIndicator({ total, currentIndex, maxVisible = 7 }) {
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(0, currentIndex - half);
  let end = Math.min(total, start + maxVisible);

  // If we're near the end, shift the window back
  if (end - start < maxVisible) {
    start = Math.max(0, end - maxVisible);
  }

  const indicators = Array.from({ length: end - start }, (_, i) => {
    const index = start + i;
    const isActive = index === currentIndex;

    return (
      <View
        key={index}
        style={[
          styles.dot,
          isActive ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    );
  });

  return <View style={styles.container}>{indicators}</View>;
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
