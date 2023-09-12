import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import Grid from './grid';
import {getGrid} from './helper';

type Props = {
  rows: number;
  cols: number;
  startIndex: number;
  trainingTime: number;
  onEnd: (result: any) => void;
};

const Training = (props: Props) => {
  const {rows, cols, startIndex, trainingTime, onEnd} = props;
  const timerRef = useRef<number>(trainingTime);
  const openedRef = useRef<any>(new Set<number>(Array(rows * cols).keys()));

  const result = useRef<any>({
    mode: 'training',
    start_index: startIndex,
    grid: getGrid(startIndex, rows, cols),
    start_time: new Date().getTime(),
    sequence: [],
  });

  useEffect(() => {
    if (trainingTime <= 0) {
      return;
    }
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 1) {
        endTraining();
        clearInterval(timerId);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFlip = (row: number, col: number) => {
    if (openedRef.current.size === 0) {
      endTraining();
    }
    result.current.sequence.push({row, col, time: new Date().getTime()});
    openedRef.current.delete(row * cols + col);
  };

  const endTraining = () => {
    onEnd(result.current);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.text}>
        Learn the location of the pictures
      </Text>
      <View style={styles.grid}>
        <Grid rows={rows} cols={cols} startIndex={startIndex} onFlip={onFlip} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Training;
