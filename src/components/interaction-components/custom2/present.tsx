import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import shuffle from '@app/utils/shuffle';

import WordPair from './word-pair';

type Stage = 'ready' | 'present' | 'seperator';

const Present = (props: any) => {
  const {wordPairs, duration, seperatorDuration, onEnd} = props;
  const [index, setIndex] = useState<number>(0);
  const countRef = React.useRef(0);
  const [swapped, setSwapped] = useState<boolean>(false);
  const [stage, setStage] = useState<Stage>('ready');

  useEffect(() => {
    shuffle(wordPairs);
  }, [wordPairs]);

  useEffect(() => {
    if (stage === 'present') {
      setSwapped(Math.random() < 0.5);
      const timer = setTimeout(() => {
        if (countRef.current < wordPairs.length - 1) {
          setStage('seperator');
        } else {
          onEnd();
          clearTimeout(timer);
        }
      }, duration * 1000);
      return () => clearTimeout(timer);
    } else if (stage === 'seperator') {
      const timer = setTimeout(() => {
        countRef.current++;
        setIndex(countRef.current);
        setStage('present');
      }, seperatorDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [index, stage]);

  const onReady = () => {
    setStage('present');
  };

  return stage === 'ready' ? (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.readyText}>
        Ready to learn the pairs....
      </Text>
      <Button mode="contained" onPress={onReady}>
        I am ready
      </Button>
    </View>
  ) : stage === 'present' ? (
    <WordPair wordPair={wordPairs[index]} swap={swapped} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.readyText} variant="headlineLarge">
        +
      </Text>
    </View>
  );
};

Present.propTypes = {
  wordPairs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  duration: PropTypes.number,
  seperatorDuration: PropTypes.number,
  onEnd: PropTypes.func,
};

Present.defaultProps = {
  duration: 5,
  seperatorDuration: 1,
  onEnd: () => {},
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
