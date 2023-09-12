import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import shuffle from '@app/utils/shuffle';
import images from '@assets/images';

import Grid from './grid';
import {getGrid} from './helper';
import memImages from './mem-images';

type Props = {
  rows: number;
  cols: number;
  startIndex: number;
  onEnd: (result: any) => void;
};
const Testing = (props: Props) => {
  const {rows, cols, startIndex, onEnd} = props;
  const sequence = useRef<number[]>([...Array(rows * cols).keys()]);
  const [count, setCount] = useState<number>(-1);
  const result = useRef<any>({
    mode: 'testing',
    start_index: startIndex,
    grid: getGrid(startIndex, rows, cols),
    start_time: new Date().getTime(),
    sequence: [],
  });

  useEffect(() => {
    result.current.sequence.push({
      start: new Date().getTime(),
    });
    shuffle(sequence.current);
    setCount(0);
  }, []);

  const onChoice = (row: number, col: number) => {
    result.current.sequence[result.current.sequence.length - 1] = {
      ...result.current.sequence[result.current.sequence.length - 1],
      time: new Date().getTime(),
      subjResp: {
        row,
        col,
      },
      trueLoc: {
        row: Math.floor(sequence.current[count] / cols),
        col: sequence.current[count] % cols,
      },
      isCorrect: row * cols + col === sequence.current[count],
    };
    setCount(current => current + 1);
    if (count >= rows * cols - 1) {
      onEnd(result.current);
    } else {
      result.current.sequence.push({
        start: new Date().getTime(),
      });
    }
  };

  const getImage = (index: number) => {
    if (index < 0 || index >= sequence.current.length) {
      return images.logoSmall;
    }
    return memImages[(sequence.current[index] + startIndex) % memImages.length]
      .source;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text variant="titleLarge">Where was this picture?</Text>
        <Image source={getImage(count)} style={styles.image} />
      </View>
      <View style={styles.grid}>
        <Grid
          disabled={true}
          rows={rows}
          cols={cols}
          startIndex={startIndex}
          onFlip={onChoice}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  grid: {
    flex: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default Testing;
