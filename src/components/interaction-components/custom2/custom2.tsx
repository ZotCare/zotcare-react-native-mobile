import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {Notifier, NotifierComponents} from 'react-native-notifier';

import shuffle from '@app/utils/shuffle';

import Present from './present';
import words from './words';
import WpaTest from './wpa-test';

const getShuffleSequence = (length: number) => {
  const sequence = [];
  for (let i = 0; i < length; i++) {
    sequence.push(i);
  }
  shuffle(sequence);
  return sequence;
};

const getPairs = (length: number, startIndex: number) => {
  const pairs = [];
  for (let i = 0; i < length; i++) {
    pairs.push([
      words[(startIndex + i) % words.length],
      words[(startIndex + i + length) % words.length],
    ]);
  }
  return pairs;
};

const Custom2 = (props: any) => {
  const {
    mode,
    length,
    duration,
    seperator_duration: seperatorDuration,
    onEnd,
    rounds,
  } = props;
  const {getItem: getStartIndex, setItem: setStartIndex} =
    useAsyncStorage('@wpa_start_index');
  const {getItem: getShuffleIndexes, setItem: setShuffleIndexes} =
    useAsyncStorage('@wpa_shuffle_indexes');
  const pairsRef = useRef<string[][]>([]);
  const [state, setState] = useState('loading');
  const [round, setRound] = useState(0);

  useEffect(() => {
    (async () => {
      if (mode === 'present') {
        let startIndex = +((await getStartIndex()) || -1);
        if (!startIndex || startIndex <= -1) {
          startIndex = Math.floor(Math.random() * words.length);
        } else {
          startIndex = (+startIndex + length * 2) % words.length;
        }
        await setStartIndex(startIndex.toString());
        pairsRef.current = getPairs(length, startIndex);
        setState('present');
        const shuffleSeq = getShuffleSequence(length);
        await setShuffleIndexes(JSON.stringify(shuffleSeq));
      } else if (mode.startsWith('test')) {
        const shuffleSeq = JSON.parse((await getShuffleIndexes()) || '[]');
        const startIndex = +((await getStartIndex()) || -1);
        if (!startIndex || startIndex <= -1) {
          Notifier.showNotification({
            title: 'No trained sequence found',
            description: 'You need to have a training sequence to test',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'error',
            },
          });
          return;
        }
        const pairs = getPairs(length, startIndex);
        const shuffledPairs = [];
        for (let i = 0; i < length; i++) {
          shuffledPairs.push(pairs[shuffleSeq[i]]);
        }
        if (mode === 'test2') {
          shuffledPairs.reverse();
        }
        pairsRef.current = shuffledPairs;
        setState('test');
      }
    })();
  }, []);

  const onPresentEnd = () => {
    if (round < rounds - 1) {
      setRound(round + 1);
      setState('present');
    } else {
      setState('end');
      onEnd({pairs: pairsRef.current}, true);
    }
  };

  const onTestEnd = (result: any) => {
    setState('end');
    onEnd(result, true);
  };

  return state === 'present' ? (
    <Present
      key={round.toString()}
      wordPairs={pairsRef.current}
      duration={duration}
      seperatorDuration={seperatorDuration}
      onEnd={onPresentEnd}
    />
  ) : state === 'test' ? (
    <WpaTest wordPairs={pairsRef.current} onEnd={onTestEnd} />
  ) : null;
};

export default Custom2;
