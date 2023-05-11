import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Notifier, NotifierComponents} from 'react-native-notifier';

import Countdown from './countdown';
import FingerTapTest from './Finger-tap-test';
import sequences from './sequences';

enum State {
  loading,
  off,
  on,
}

const Custom1 = (props: any) => {
  const {sequence, repeat, duration, onEnd} = props;
  const [state, setState] = useState<State>(State.loading);
  const count = useRef<number>(1);
  const allInputsRef = useRef<string[]>([]);
  const allStrokesRef = useRef<number[][]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const {getItem: getSequenceIndex, setItem: setSequenceIndex} =
    useAsyncStorage('@ftt_trained_sequence_index');
  const [finalSequence, setFinalSequence] = useState<string>(sequence);

  const onCounterFinish = () => {
    setState(State.on);
  };

  const onTappingEnd = (inputSequence: string, strokes: number[]) => {
    allInputsRef.current.push(inputSequence);
    allStrokesRef.current.push(strokes);
    if (count.current < repeat) {
      count.current++;
      setState(State.off);
    } else {
      onEnd(
        {input: allInputsRef.current, strokes: allStrokesRef.current},
        true,
      );
      setIsFinished(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (sequence === 'training') {
        const sequenceIndex = await getSequenceIndex();
        let randomSequenceIndex = null;
        if (sequenceIndex === null) {
          randomSequenceIndex = Math.floor(Math.random() * sequences.length);
        } else {
          randomSequenceIndex = (+sequenceIndex + 1) % sequences.length;
        }
        await setSequenceIndex(randomSequenceIndex.toString());
        setFinalSequence(sequences[randomSequenceIndex]);
      } else if (sequence === 'testing') {
        const trainedSequenceIndex = await getSequenceIndex();
        if (trainedSequenceIndex) {
          setFinalSequence(sequences[+trainedSequenceIndex]);
        } else {
          Notifier.showNotification({
            title: 'No trained sequence found',
            description: 'You need to have a training sequence to test',
            Component: NotifierComponents.Alert,
            componentProps: {
              alertType: 'error',
            },
          });
        }
      }
      setState(State.on);
    })();
  }, []);

  return (
    <>
      {!isFinished && (
        <View style={{flex: 1}}>
          {state === State.off && (
            <Countdown time={duration} onCountdownEnd={onCounterFinish} />
          )}
          {state === State.on && (
            <FingerTapTest
              sequence={finalSequence}
              duration={duration}
              onEnd={onTappingEnd}
            />
          )}
        </View>
      )}
    </>
  );
};

export default Custom1;
