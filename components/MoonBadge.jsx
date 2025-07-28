import React from 'react';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

export default function MoonBadge({ number, activeCategory }) {
  // Color toggle: gold default, blue when in bookmark mode
  const fillColor = activeCategory ? '#2952CC' : '#D4AF37';

  return (
    <View
      style={[
        styles.wrapper,
        activeCategory ? styles.leftPosition : styles.rightPosition,
      ]}
    >
      <Svg width={80} height={80} viewBox="0 0 100 100">
        {/* Crescent Moon Path */}
        <Path
          d="M70,50
             A35,35 0 1,1 40,15
             A28,28 0 1,0 70,50Z"
          fill={fillColor}
        />
        <SvgText
          x="50"
          y="58"
          fontSize="18"
          fill="#fffdf2"
          fontWeight="bold"
          textAnchor="middle"
        >
          {String(number ?? '')}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 12,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightPosition: {
    right: 12,
  },
  leftPosition: {
    left: 33,
  },
});
