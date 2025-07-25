import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function DotIndicator({
  total,
  currentIndex,
  maxVisible = 7,
}) {
  if (total <= 1) return null;

  // Show one dot per card if small total
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

  // Proportional dot logic
  const progress = currentIndex / (total - 1);
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
    backgroundColor: '#D4AF37', // gold
    transform: [{ scale: 1.4 }],
  },
  inactiveDot: {
    backgroundColor: '#2952CC', // bright blue
    opacity: 0.5,
  },
});
