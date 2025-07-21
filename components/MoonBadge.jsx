import React from 'react';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

export default function MoonBadge({ number }) {
  return (
    <View style={styles.wrapper}>
      <Svg width={80} height={80} viewBox="0 0 100 100">
        {/* Balanced elegant crescent moon */}
        <Path
          d="M70,50
             A35,35 0 1,1 40,15
             A28,28 0 1,0 70,50Z"
          fill="#D4AF37"
        />
        <SvgText
          x="50"
          y="58"
          fontSize="18"
          fill="#fffdf2"
          fontWeight="bold"
          textAnchor="middle"
        >
          {number}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
