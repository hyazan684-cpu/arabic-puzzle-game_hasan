import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

type Props = {
  onFinish?: () => void;
  duration?: number; // milliseconds
};

export default function AnimatedSplash({ onFinish, duration = 1200 }: Props) {
  useEffect(() => {
    const t = setTimeout(() => {
      onFinish && onFinish();
    }, duration);
    return () => clearTimeout(t);
  }, [onFinish, duration]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/splash.png')} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b3b66',
  },
  image: {
    width: Math.min(400, width - 40),
    height: Math.min(400, width - 40),
  },
});
