import {default as RNCSlider} from '@react-native-community/slider';
import React from 'react';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  default?: number;
  onValueChange?: (value: number) => void;
};

const Slider = (props: Props) => {
  const {min, max, step, default: def, onValueChange} = props;

  return (
    <RNCSlider
      tapToSeek={true}
      minimumValue={min || 0}
      maximumValue={max || 100}
      step={step || 1}
      value={def}
      onSlidingComplete={onValueChange}
      testID={'slider'}
    />
  );
};

export default Slider;
