import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Notifier, NotifierComponents} from 'react-native-notifier';

import Countdown from '../../cognitive_tasks/finger-tapping/countdown';
import FingerTapTest from '../../cognitive_tasks/finger-tapping/Finger-tap-test';

enum State {
  off,
  on,
}

const sequences = [
  '12134',
  '12413',
  '12431',
  '13142',
  '13243',
  '13423',
  '14132',
  '14213',
  '14231',
  '23143',
  '23241',
  '23142',
  '21434',
  '21342',
  '21234',
  '24132',
  '24314',
  '24231',
  '31242',
  '31421',
  '31243',
  '32413',
  '32431',
  '32314',
  '34121',
  '34213',
  '34124',
  '41324',
  '41423',
  '41213',
  '42312',
  '42314',
  '42132',
  '43142',
  '43421',
  '43124',
];

const Custom1 = (props: any) => {
  const {sequence, repeat, duration, onEnd} = props;
  const [state, setState] = useState<State>(State.off);
  const count = useRef<number>(1);
  const allInputsRef = useRef<string[]>([]);
  const allStrokesRef = useRef<number[][]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const {getItem: getSequence, setItem: setSequence} = useAsyncStorage(
    '@ftt_trained_sequence',
  );
  const {getItem: getRepeatedSequence, setItem: setRepeatedSequence} =
    useAsyncStorage('@ftt_repeat');
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
        const getRepeated = JSON.parse((await getRepeatedSequence()) || '[]');
        let randomSequence = null;
        while (randomSequence == null || getRepeated.includes(randomSequence)) {
          randomSequence =
            sequences[Math.floor(Math.random() * sequences.length)];
        }
        setFinalSequence(randomSequence);
        await setSequence(randomSequence);
        await setRepeatedSequence(
          JSON.stringify([...getRepeated, randomSequence]),
        );
      } else if (sequence === 'testing') {
        const trainedSequence = await getSequence();
        if (trainedSequence) {
          setFinalSequence(trainedSequence);
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
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence]);

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
