import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import data from './assets/99names.json';
import FlipCard from './FlipCard';

export default function App() {
  const [index, setIndex] = useState(0);
  const current = data[index];

  return (
    <SafeAreaView style={styles.container}>
      <FlipCard {...current} />
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setIndex((i) => (i - 1 + data.length) % data.length)} style={styles.button}>
          <Text style={styles.buttonText}>◀ Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIndex((i) => (i + 1) % data.length)} style={styles.button}>
          <Text style={styles.buttonText}>Next ▶</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cardNumber}>
        Card {index + 1} of {data.length}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  controls: { flexDirection: 'row', marginTop: 24 },
  button: { backgroundColor: '#D4AF37', padding: 12, borderRadius: 8, marginHorizontal: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  cardNumber: { marginTop: 16, fontSize: 12, color: '#555' },
});

