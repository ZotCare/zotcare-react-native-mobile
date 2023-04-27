import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import shuffle from '@app/utils/shuffle';

import WordPair from './word-pair';

const Present = (props: any) => {
  const {wordPairs, duration, onEnd} = props;
  const [index, setIndex] = useState<number>(-1);
  const countRef = React.useRef(0);
  const [swapped, setSwapped] = useState<boolean>(false);

  useEffect(() => {
    shuffle(wordPairs);
  }, [wordPairs]);

  useEffect(() => {
    if (index >= 0) {
      const interval = setInterval(() => {
        if (countRef.current < wordPairs.length - 1) {
          countRef.current++;
          setSwapped(Math.random() < 0.5);
          setIndex(countRef.current);
        } else {
          onEnd();
          clearInterval(interval);
        }
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [index]);

  const onReady = () => {
    setIndex(0);
  };

  return index < 0 ? (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.readyText}>
        Ready to learn the pairs....
      </Text>
      <Button mode="contained" onPress={onReady}>
        I am ready
      </Button>
    </View>
  ) : (
    <WordPair wordPair={wordPairs[index]} swap={swapped} />
  );
};

Present.propTypes = {
  wordPairs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  duration: PropTypes.number.isRequired,
  onEnd: PropTypes.func.isRequired,
};

export default Present;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    gap: 30,
  },
  readyText: {
    textAlign: 'center',
  },
});
