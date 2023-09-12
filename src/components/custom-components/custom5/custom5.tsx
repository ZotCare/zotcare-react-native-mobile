import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useRef} from 'react';
import {useEffect, useState} from 'react';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {Text} from 'react-native-paper';

import memImages from './mem-images';
import Prompt from './prompt';
import Testing from './testing';
import Training from './training';

enum State {
  Loading,
  Training,
  TrainingPrompt,
  Testing,
  TestingPrompt,
}

const Custom5 = (props: any) => {
  const {rows, cols, trainingRounds, trainingTime, mode, onEnd} = props;
  const [stage, setStage] = useState<State>(State.Loading);
  const [sequenceStart, setSequenceStart] = useState<number>(0);
  const {getItem: getSequenceIndex, setItem: setSequenceIndex} =
    useAsyncStorage('@memtest_sequence_index');
  const [trainingRound, setTrainingRounds] = useState<number>(trainingRounds);

  const result = useRef<any[]>([]);

  useEffect(() => {
    (async () => {
      if (mode === 'training') {
        const sequenceIndex = await getSequenceIndex();
        let randomSequenceIndex = null;
        if (sequenceIndex === null) {
          randomSequenceIndex = Math.floor(Math.random() * memImages.length);
        } else {
          randomSequenceIndex =
            (+sequenceIndex + rows * cols) % memImages.length;
        }
        await setSequenceIndex(randomSequenceIndex.toString());
        setSequenceStart(randomSequenceIndex);
        setStage(State.TrainingPrompt);
      } else if (mode === 'testing') {
        const trainedSequenceIndex = await getSequenceIndex();
        if (trainedSequenceIndex) {
          setSequenceStart(+trainedSequenceIndex);
          setStage(State.TestingPrompt);
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
  }, []);

  const onTrainingEnd = (trainingResult: any) => {
    result.current.push(trainingResult);
    setTrainingRounds(current => current - 1);
    if (trainingRound <= 1) {
      setStage(State.TestingPrompt);
    } else {
      setStage(State.TrainingPrompt);
    }
  };

  const getTrainingPrompt = () => {
    if (trainingRound === trainingRounds) {
      return 'Ready to learn the pictures?';
    } else {
      return 'Ready to learn the pictures again?';
    }
  };

  const onTestEnd = (testResult: any) => {
    result.current.push(testResult);
    onEnd(result.current, true);
  };

  return stage === State.Loading ? (
    <Text>Loading...</Text>
  ) : stage === State.TrainingPrompt ? (
    <Prompt
      text={getTrainingPrompt()}
      onClick={() => setStage(State.Training)}
    />
  ) : stage === State.Training ? (
    <Training
      rows={rows}
      cols={cols}
      startIndex={sequenceStart}
      trainingTime={trainingTime}
      onEnd={onTrainingEnd}
      key={trainingRound}
    />
  ) : stage === State.TestingPrompt ? (
    <Prompt
      text="Now you will be tested on the pictures"
      onClick={() => setStage(State.Testing)}
    />
  ) : stage === State.Testing ? (
    <Testing
      rows={rows}
      cols={cols}
      startIndex={sequenceStart}
      onEnd={onTestEnd}
    />
  ) : null;
};

export default Custom5;
