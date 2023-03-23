import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useEffect, useRef, useState} from 'react';

import shuffle from '../../../utils/shuffle';
import Present from '../../cognitive_tasks/word-pair/present';
import WpaTest from '../../cognitive_tasks/word-pair/wpa-test';
import words from './words';

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
  const {mode, length, duration, onEnd, start, end} = props;
  const {getItem: getStartIndex, setItem: setStartIndex} =
    useAsyncStorage('@wpa_start_index');
  const {getItem: getShuffleIndexes, setItem: setShuffleIndexes} =
    useAsyncStorage('@wpa_shuffle_indexes');
  const pairsRef = useRef<string[][]>([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    (async () => {
      if (mode === 'present') {
        let startIndex = +((await getStartIndex()) || -1);
        if (!startIndex || startIndex <= -1) {
          startIndex = Math.floor(Math.random() * words.length);
        } else {
          startIndex = (+startIndex + length * 2) % words.length;
        }
        console.log('start index', startIndex);
        await setStartIndex(startIndex.toString());
        pairsRef.current = getPairs(length, startIndex);
        setState('present');
        const shuffleSeq = getShuffleSequence(length);
        await setShuffleIndexes(JSON.stringify(shuffleSeq));
      } else if (mode === 'test') {
        const shuffleSeq = JSON.parse((await getShuffleIndexes()) || '[]');
        const startIndex = +((await getStartIndex()) || -1);
        console.log('start index', startIndex);
        const pairs = getPairs(length, startIndex);
        const shuffledPairs = [];
        for (let i = start; i < end; i++) {
          shuffledPairs.push(pairs[shuffleSeq[i]]);
        }
        pairsRef.current = shuffledPairs;
        setState('test');
      }
    })();
  }, []);

  const onPresentEnd = () => {
    setState('end');
    onEnd({pairs: pairsRef.current}, true);
  };

  const onTestEnd = (result: any) => {
    setState('end');
    onEnd(result, true);
  };

  return state === 'present' ? (
    <Present
      wordPairs={pairsRef.current}
      duration={duration}
      onEnd={onPresentEnd}
    />
  ) : state === 'test' ? (
    <WpaTest wordPairs={pairsRef.current} onEnd={onTestEnd} />
  ) : null;
};

export default Custom2;
