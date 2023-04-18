import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const convert_tens = (num: number) => {
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  const teens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  if (num < 10) {
    return ones[num];
  } else if (num >= 10 && num < 20) {
    return teens[num - 10];
  } else {
    return tens[Math.floor(num / 10)] + ' ' + ones[num % 10];
  }
};

const numToWords = (num: number) => {
  if (num === 0) {
    return 'zero';
  } else {
    return convert_hundreds(num);
  }
};

const convert_hundreds = (num: number) => {
  const ones = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  if (num > 99) {
    return ones[Math.floor(num / 100)] + ' hundred ' + convert_tens(num % 100);
  } else {
    return convert_tens(num);
  }
};

const Countdown = (props: any) => {
  const {time, onCountdownEnd} = props;
  const [countdown, setCountdown] = useState<number>(time);
  const timerRef = useRef<number>(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current <= 0) {
        onCountdownEnd();
        clearInterval(timerId);
      } else {
        setCountdown(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [onCountdownEnd]);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.text}>
        {numToWords(countdown)}
      </Text>
    </View>
  );
};

Countdown.Props = {
  time: PropTypes.number.isRequired,
  onCountdownEnd: PropTypes.func.isRequired,
};

const styles = ScaledSheet.create({
  container: {flex: 1, justifyContent: 'center', backgroundColor: 'red'},
  text: {textAlign: 'center'},
});

export default Countdown;
