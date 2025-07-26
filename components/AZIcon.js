import * as React from 'react';
import Svg, { Path, Line, Text } from 'react-native-svg';

export default function AZIcon({
  isShuffled = true,
  size = 48,
}) {
  // Define colors
  const blue = '#2952CC';
  const gold = '#D4AF37';

  // Toggle colors based on isShuffled
  const aColor = isShuffled ? blue : gold;
  const zColor = isShuffled ? gold : blue;
  const dashColor = aColor;
  const upArrowColor = zColor;
  const downArrowColor = aColor;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      {/* Up Arrow */}
      <Path
        d="M32 6 L40 18 H24 Z"
        fill={upArrowColor}
      />

      {/* Down Arrow */}
      <Path
        d="M32 58 L40 46 H24 Z"
        fill={downArrowColor}
      />

      {/* A Letter */}
      <Text
        x="16"
        y="38"
        fontSize="18"
        fontWeight="bold"
        fill={aColor}
      >
        A
      </Text>

      {/* Z Letter */}
      <Text
        x="36"
        y="38"
        fontSize="18"
        fontWeight="bold"
        fill={zColor}
      >
        Z
      </Text>

      {/* Dash */}
      <Line
        x1="28"
        y1="32"
        x2="36"
        y2="32"
        stroke={dashColor}
        strokeWidth="2"
      />
    </Svg>
  );
}
