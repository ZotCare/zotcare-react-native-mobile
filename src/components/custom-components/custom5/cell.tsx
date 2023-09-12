import React, {forwardRef, useImperativeHandle} from 'react';
import {Image, ImageSourcePropType, Pressable, StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import images from '@assets/images';

type Props = {
  image: ImageSourcePropType;
  onFlip?: () => void;
  disabled?: boolean;
};

const FLIP_TIME = 200;

const Cell = forwardRef((props: Props, ref) => {
  const {image, disabled, onFlip} = props;
  const spin = useSharedValue<number>(0);

  useImperativeHandle(ref, () => {
    return {
      close,
    };
  });

  const flip = () => {
    if (!disabled) {
      spin.value = spin.value ? 0 : 1;
    }
    onFlip && onFlip();
  };
  const close = () => {
    if (!disabled) {
      spin.value = 0;
    }
  };

  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {duration: FLIP_TIME}),
        },
      ],
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {duration: FLIP_TIME}),
        },
      ],
    };
  }, []);

  return (
    <Pressable onPress={flip} style={styles.container}>
      {({pressed}) => (
        <>
          <Animated.View
            style={[
              styles.front,
              pressed && disabled && styles.frontPressed,
              styles.tile,
              rStyle,
            ]}>
            <Image source={images.logoSmall} style={styles.frontImage} />
          </Animated.View>
          <Animated.View style={[styles.back, styles.tile, bStyle]}>
            <Image source={image} style={styles.frontImage} />
          </Animated.View>
        </>
      )}
    </Pressable>
  );
});

export default Cell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 100,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    minWidth: 50,
    minHeight: 50,
  },
  front: {
    width: '100%',
    height: '100%',
    backgroundColor: '#16309a',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  frontPressed: {
    backgroundColor: '#0a1649',
  },
  frontImage: {
    resizeMode: 'contain',
    width: '80%',
    height: '80%',
  },
  back: {
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  tile: {
    borderWidth: 2,
    borderRadius: 8,
  },
});
