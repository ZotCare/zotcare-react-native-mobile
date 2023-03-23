import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import shuffle from '../../../utils/shuffle';
import Equation from '../../cognitive_tasks/ospan/equation';

const generateEquation = () => {
  let a = Math.floor(Math.random() * 15);
  let b = Math.floor(Math.random() * 15);
  const operator = Math.random() > 0.5 ? '+' : '-';
  if (operator === '-' && a < b) {
    [a, b] = [b, a];
  }
  const result = operator === '+' ? a + b : a - b;
  let wrongResult = Math.floor(Math.random() * 30);
  while (wrongResult === result) {
    wrongResult = Math.floor(Math.random() * 30);
  }
  const isCorrect = Math.random() >= 0.5;
  return {
    a,
    b,
    operator,
    result: isCorrect ? result : wrongResult,
    isCorrect,
  };
};

const generateLetters = (length: number) => {
  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  shuffle(alphabet);
  return alphabet.slice(0, length);
};

const Custom3 = (props: any) => {
  const {rounds, equationTime, letterTime, onEnd} = props;
  const [stage, setStage] = useState('loading');
  const stageRef = useRef('loading');
  const roundRef = useRef(0);
  const lettersRef = useRef<string[]>([]);
  const equationsRef = useRef<any[]>([]);
  const resultRef = useRef<any[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    lettersRef.current = generateLetters(rounds);
    equationsRef.current = Array.from({length: rounds}, () =>
      generateEquation(),
    );
    changeStage('equation');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStage = (nextStage: string) => {
    stageRef.current = nextStage;
    setStage(nextStage);
    if (nextStage === 'equation' || nextStage === 'letter') {
      setTimeout(
        () => {
          onStageEnd();
        },
        nextStage === 'equation' ? equationTime * 1000 : letterTime * 1000,
      );
    }
  };
  const onStageEnd = () => {
    if (stageRef.current === 'input') {
      onEnd();
    } else if (stageRef.current === 'equation') {
      changeStage('letter');
    } else if (stageRef.current === 'letter') {
      changeStage('evaluation');
    } else if (stageRef.current === 'evaluation') {
      if (roundRef.current >= rounds - 1) {
        changeStage('input');
      } else {
        changeStage('equation');
        roundRef.current++;
      }
    }
  };

  const onEvaluate = (correct: boolean) => () => {
    resultRef.current.push({
      equation: equationsRef.current[roundRef.current],
      letter: lettersRef.current[roundRef.current],
      correctAnswer:
        equationsRef.current[roundRef.current].isCorrect === correct,
      time: new Date().getTime(),
    });
    onStageEnd();
  };

  const onInputSubmit = () => {
    resultRef.current.push({
      input,
      time: new Date().getTime(),
    });
    onEnd(resultRef.current, true);
  };

  return (
    <View style={styles.container}>
      {stage === 'equation' && (
        <Equation equation={equationsRef.current[roundRef.current]} />
      )}
      {stage === 'letter' && (
        <Text style={styles.text} variant={'displayLarge'}>
          {lettersRef.current[roundRef.current]}
        </Text>
      )}
      {stage === 'evaluation' && (
        <View style={styles.buttons}>
          <Button onPress={onEvaluate(true)} mode="contained">
            Correct
          </Button>
          <Button onPress={onEvaluate(false)} mode="contained">
            Incorrect
          </Button>
        </View>
      )}
      {stage === 'input' && (
        <View>
          <TextInput
            placeholder="Enter the sequence of letters"
            mode="outlined"
            onChangeText={text => {
              setInput(text);
            }}
            value={input}
          />
          <Button onPress={onInputSubmit} mode="contained">
            Submit
          </Button>
        </View>
      )}
    </View>
  );
};

export default Custom3;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
});
