import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, ProgressBar, Text} from 'react-native-paper';

const stringToDashed = (str: string) => {
  return str.split('').join('-');
};

const FingerTapTest = (props: any) => {
  const {sequence, duration, onEnd} = props;
  const input = useRef<string>('');
  const strokes = useRef<number[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const startTimeRef = useRef<number>(new Date().getTime());

  useEffect(() => {
    const timeout = setTimeout(() => {
      onEnd({
        input: input.current,
        strokes: strokes.current,
        startTime: startTimeRef.current,
      });
    }, duration * 1000);
    return () => clearTimeout(timeout);
  }, []);

  const addValue = (value: number) => () => {
    input.current += value;
    strokes.current.push(new Date().getTime());
    setProgress((input.current.length % 11) / 11);
  };

  const dashSequence = stringToDashed(sequence);

  return (
    <View style={styles.container}>
      <View style={styles.sequenceArea}>
        <Text style={styles.sequenceText} variant={'displayMedium'}>
          {dashSequence}
        </Text>
      </View>
      <ProgressBar style={styles.progress} progress={progress} />
      <View style={styles.tappingArea}>
        <Button
          style={styles.actionButton}
          labelStyle={styles.actionLabel}
          mode={'elevated'}
          onPress={addValue(1)}>
          <Text variant="displayMedium">1</Text>
        </Button>
        <Button
          style={styles.actionButton}
          labelStyle={styles.actionLabel}
          mode={'elevated'}
          onPress={addValue(2)}>
          <Text variant="displayMedium">2</Text>
        </Button>
        <Button
          style={styles.actionButton}
          labelStyle={styles.actionLabel}
          mode={'elevated'}
          onPress={addValue(3)}>
          <Text variant="displayMedium">3</Text>
        </Button>
        <Button
          style={styles.actionButton}
          labelStyle={styles.actionLabel}
          mode={'elevated'}
          onPress={addValue(4)}>
          <Text variant="displayMedium">4</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  sequenceArea: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  sequenceText: {textAlign: 'center'},
  progress: {height: 10, marginHorizontal: 50, maxWidth: 600, width: '100%'},
  tappingArea: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 500,
    width: '100%',
  },
  actionButton: {
    width: 120,
    textAlign: 'center',
  },
  actionLabel: {
    lineHeight: Platform.OS === 'android' ? 52 : 60,
  },
});

export default FingerTapTest;
