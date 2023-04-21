import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import shuffle from '@app/utils/shuffle';

import WordPair from './word-pair';

const swap = (wordPair: string[]) => [wordPair[1], wordPair[0]];

const counter = (i: number, shift: number, length: number) => {
  return ((i - length / 2 + shift) % (length / 2)) + length / 2;
};

const WpaTest = (props: any) => {
  const {wordPairs, onEnd} = props;
  const [index, setIndex] = useState<number>(-1);
  const resultRef = useRef<any[]>([]);
  const [confidence, setConfidence] = useState<boolean>(false);
  const randomPairs = useRef<any[]>([]);

  useEffect(() => {
    randomPairs.current = [];
    const shift = Math.floor((Math.random() * wordPairs.length) / 2 - 1);
    const isSwapped = [];
    for (let i = 0; i < wordPairs.length; i++) {
      isSwapped.push(i % 2 === 0);
    }
    shuffle(isSwapped, 0, wordPairs.length / 2);
    shuffle(isSwapped, wordPairs.length / 2, wordPairs.length);
    for (let i = 0; i < wordPairs.length; i++) {
      if (i < wordPairs.length / 2) {
        randomPairs.current.push({
          pair: isSwapped[i] ? swap(wordPairs[i]) : wordPairs[i],
          swapped: isSwapped[i],
          rearranged: false,
        });
      } else {
        randomPairs.current.push({
          pair: isSwapped[i]
            ? [
                wordPairs[counter(i, shift, wordPairs.length)][1],
                wordPairs[i][0],
              ]
            : [
                wordPairs[i][0],
                wordPairs[counter(i, shift, wordPairs.length)][1],
              ],
          swapped: isSwapped[i],
          rearranged: true,
        });
      }
    }
    shuffle(randomPairs.current);
    setIndex(0);
  }, [wordPairs]);

  const onChoice = (isOld: boolean) => () => {
    resultRef.current.push({
      wordPair: randomPairs.current[index].pair,
      swapped: randomPairs.current[index].swapped,
      rearranged: randomPairs.current[index].rearranged,
      isCorrect: isOld === !randomPairs.current[index].rearranged,
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
      onEnd(resultRef.current);
    }
  };

  return index >= 0 ? (
    <View style={styles.container}>
      <View style={styles.words}>
        <WordPair wordPair={randomPairs.current[index].pair} swap={false} />
      </View>
      <View>
        {!confidence ? (
          <View style={styles.questionBox}>
            <Text style={styles.textCenter} variant="titleMedium">
              Did these words belong to the
              <Text style={{fontWeight: 'bold'}}> same</Text> pair or
              <Text style={{fontWeight: 'bold'}}> different</Text>?
            </Text>
            <View style={styles.buttons}>
              <Button key="OLD" onPress={onChoice(true)} mode="contained">
                SAME
              </Button>
              <Button key="NEW" onPress={onChoice(false)} mode="contained">
                DIFFERENT
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.questionBox}>
            <Text style={styles.textCenter} variant="titleMedium">
              How confident are you in your answer?
            </Text>
            <View style={styles.buttons}>
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
            </View>
          </View>
        )}
      </View>
    </View>
  ) : (
    <Text>Loading...</Text>
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
  textCenter: {
    textAlign: 'center',
  },
  questionBox: {
    flex: 1,
    rowGap: 10,
  },
});
