import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import shuffle from '../../../utils/shuffle';
import WordPair from './word-pair';

const WpaTest = (props: any) => {
  const {wordPairs} = props;
  const [index, setIndex] = useState<number>(0);
  const isSwappedRef = useRef<boolean[]>([]);
  const resultRef = useRef<any[]>([]);
  const [confidence, setConfidence] = useState<boolean>(false);

  useEffect(() => {
    for (let i = 0; i < wordPairs.length; i++) {
      isSwappedRef.current.push(i < wordPairs.length / 2);
    }
    shuffle(isSwappedRef.current);
  }, [wordPairs]);

  const onChoice = (isOld: boolean) => () => {
    resultRef.current.push({
      wordPair: wordPairs[index],
      isCorrect: isOld === isSwappedRef.current[index],
      choiceTime: new Date().getTime(),
    });
    setConfidence(true);
  };

  const onSelectConfidence = (confidenceLevel: string) => () => {
    resultRef.current[index].confidence = confidenceLevel;
    resultRef.current[index].confidenceTime = new Date().getTime();
    setConfidence(false);
    if (index < wordPairs.length - 1) {
      setIndex(index + 1);
    } else {
      props.onEnd(resultRef.current);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.words}>
        <WordPair
          wordPair={wordPairs[index]}
          swap={isSwappedRef.current[index]}
        />
      </View>
      <View style={styles.buttons}>
        {!confidence ? (
          <>
            <Button key="OLD" onPress={onChoice(true)} mode="contained">
              OLD
            </Button>
            <Button key="NEW" onPress={onChoice(false)} mode="contained">
              NEW
            </Button>
          </>
        ) : (
          <>
            <Button
              key="LOW"
              onPress={onSelectConfidence('LOW')}
              mode="contained">
              LOW
            </Button>
            <Button
              key="MODERATE"
              onPress={onSelectConfidence('MODERATE')}
              mode="contained">
              MODERATE
            </Button>
            <Button
              key="HIGH"
              onPress={onSelectConfidence('HIGH')}
              mode="contained">
              HIGH
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

WpaTest.prototype = {
  wordPairs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default WpaTest;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  words: {
    flexGrow: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
});