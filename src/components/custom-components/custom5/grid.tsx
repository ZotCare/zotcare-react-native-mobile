import React, {useRef} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import Cell from './cell';
import memImages from './mem-images';

type Props = {
  rows: number;
  cols: number;
  startIndex: number;
  disabled?: boolean;
  onFlip: (row: number, col: number) => void;
};

const Grid = (props: Props) => {
  const {rows, cols, startIndex, disabled, onFlip} = props;
  const ref = useRef<any>(new Array(rows * cols).fill(null));

  const getImage = (row: number, col: number, start: number) => {
    const index = start + row * cols + col;
    return memImages[index % memImages.length].source;
  };

  const onFlipCell = (row: number, col: number) => {
    return () => {
      onFlip(row, col);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (!(i === row && j === col)) {
            ref.current[i * cols + j].close();
          }
        }
      }
    };
  };

  return (
    <View style={styles.container}>
      {Array.from({length: rows}).map((_, i) => (
        <View key={i} style={styles.row}>
          {Array.from({length: cols}).map((_, j) => {
            return (
              <Cell
                disabled={disabled}
                key={rows + i * cols + j}
                image={getImage(i, j, startIndex)}
                ref={element => {
                  ref.current[i * cols + j] = element;
                }}
                onFlip={onFlipCell(i, j)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 10,
  },
  row: {
    flex: 1,
    maxHeight: 100,
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
  },
});
export default Grid;
