import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const stringToDashed = (str: string) => {
  return str.split('').join('-');
};

const FingerTapTest = (props: any) => {
  const {sequence, duration, onEnd} = props;
  const input = useRef<string>('');
  const strokes = useRef<number[]>([]);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onEnd(input.current, strokes.current);
    }, duration * 1000);
    return () => clearTimeout(timeout);
  }, [duration, onEnd]);

  const addValue = (value: number) => () => {
    input.current += value;
    strokes.current.push(new Date().getTime());
    setProgress((input.current.length % 11) / 11);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sequenceArea}>
        <Text style={styles.sequenceText} variant={'displayMedium'}>
          {stringToDashed(sequence)}
        </Text>
      </View>
      <ProgressBar style={styles.progress} progress={progress} />
      <View style={styles.tappingArea}>
        <Button
          style={styles.actionButton}
          mode={'elevated'}
          onPress={addValue(1)}>
          <Text variant="titleLarge">1</Text>
        </Button>
        <Button
          style={styles.actionButton}
          mode={'elevated'}
          onPress={addValue(2)}>
          <Text variant="titleLarge">2</Text>
        </Button>
        <Button
          style={styles.actionButton}
          mode={'elevated'}
          onPress={addValue(3)}>
          <Text variant="titleLarge">3</Text>
        </Button>
        <Button
          style={styles.actionButton}
          mode={'elevated'}
          onPress={addValue(4)}>
          <Text variant="titleLarge">4</Text>
        </Button>
      </View>
    </View>
  );
};

FingerTapTest.propTypes = {
  sequence: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onEnd: PropTypes.func.isRequired,
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  sequenceArea: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  sequenceText: {textAlign: 'center'},
  progress: {height: 10, marginHorizontal: 50},
  tappingArea: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '50@vs',
  },
  actionButton: {
    width: 100,
    textAlign: 'center',
  },
});

export default FingerTapTest;
