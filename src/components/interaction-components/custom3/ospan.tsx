import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import shuffle from '@app/utils/shuffle';

import Equation from './equation';

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

type Props = {
  rounds: number;
  equationTime: number;
  letterTime: number;
  onEnd: (result: any) => void;
};

const Ospan = (props: Props) => {
  const {rounds, equationTime, letterTime, onEnd} = props;
  const [stage, setStage] = useState('loading');
  const stageRef = useRef('loading');
  const roundRef = useRef(0);
  const [round, setRound] = useState<number>(0);
  const lettersRef = useRef<string[]>([]);
  const equationsRef = useRef<any[]>([]);
  const resultRef = useRef<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [showButtons, setShowButtons] = useState<boolean>(true);

  useEffect(() => {
    lettersRef.current = generateLetters(rounds);
    for (let i = 0; i < rounds; i++) {
      equationsRef.current.push(generateEquation());
    }
    changeStage('equation');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStage = (nextStage: string) => {
    stageRef.current = nextStage;
    setStage(nextStage);
    setShowButtons(true);
    if (nextStage === 'equation' || nextStage === 'letter') {
      const timeout = setTimeout(
        () => {
          onStageEnd();
        },
        nextStage === 'equation' ? equationTime * 1000 : letterTime * 1000,
      );
      return () => clearTimeout(timeout);
    }
  };
  const onStageEnd = () => {
    if (stageRef.current === 'input') {
      onEnd(resultRef.current);
    } else if (stageRef.current === 'equation') {
      if (resultRef.current.length < roundRef.current + 1) {
        resultRef.current.push({
          equation: equationsRef.current[roundRef.current],
          letter: lettersRef.current[roundRef.current],
          correctAnswer: false,
          missed: true,
        });
      }
      changeStage('letter');
    } else if (stageRef.current === 'letter') {
      if (roundRef.current >= rounds - 1) {
        changeStage('input');
      } else {
        changeStage('equation');
        roundRef.current++;
        setRound(roundRef.current);
      }
    }
  };

  const onEvaluate = (correct: boolean) => () => {
    setShowButtons(false);
    resultRef.current.push({
      equation: equationsRef.current[roundRef.current],
      letter: lettersRef.current[roundRef.current],
      correctAnswer:
        equationsRef.current[roundRef.current].isCorrect === correct,
      missed: false,
      time: new Date().getTime(),
    });
  };

  const onInputSubmit = () => {
    resultRef.current.push({
      input,
      time: new Date().getTime(),
    });
    onEnd(resultRef.current);
  };

  return (
    <View style={styles.container}>
      {stage === 'equation' && (
        <>
          <Equation equation={equationsRef.current[round]} />
          <View style={styles.buttons}>
            <Button
              disabled={!showButtons}
              onPress={onEvaluate(true)}
              mode="contained">
              <Text variant="titleLarge" style={styles.actionLabel}>
                Correct
              </Text>
            </Button>
            <Button
              disabled={!showButtons}
              onPress={onEvaluate(false)}
              mode="contained">
              <Text variant="titleLarge" style={styles.actionLabel}>
                Incorrect
              </Text>
            </Button>
          </View>
        </>
      )}
      {stage === 'letter' && (
        <Text style={styles.text} variant={'displayLarge'}>
          {lettersRef.current[roundRef.current]}
        </Text>
      )}
      {stage === 'input' && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter the sequence of letters"
            mode="outlined"
            onChangeText={text => {
              text = text.toUpperCase();
              setInput(text);
            }}
            value={input}
            autoCapitalize="characters"
            autoCorrect={false}
            autoComplete="off"
          />
          <Button onPress={onInputSubmit} mode="contained">
            <Text variant="titleLarge" style={styles.actionLabel}>
              Submit
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
};

Ospan.propTypes = {
  rounds: PropTypes.number.isRequired,
  equationTime: PropTypes.number,
  letterTime: PropTypes.number,
  onEnd: PropTypes.func.isRequired,
};

Ospan.defaultProps = {
  equationTime: 3,
  letterTime: 2,
};

export default Ospan;

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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    color: 'white',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
  },
});
