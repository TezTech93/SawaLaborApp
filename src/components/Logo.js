import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Text } from 'react-native-svg';
import Colors from '../constants/Colors';

const Logo = ({ size = 100 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill={Colors.primary} />
        <Circle cx="50" cy="50" r="35" fill={Colors.secondary} />
        <Text
          x="50"
          y="40"
          textAnchor="middle"
          fill={Colors.white}
          fontSize="18"
          fontWeight="bold"
        >
          SL
        </Text>
        <Text
          x="50"
          y="60"
          textAnchor="middle"
          fill={Colors.white}
          fontSize="10"
        >
          SabaLabor
        </Text>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Logo;