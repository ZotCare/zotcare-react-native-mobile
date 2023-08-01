import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import shuffle from '@app/utils/shuffle';

import RstFeedback from './rst-feedback';
import RstPresent from './rst-present';

type Position = {
  placement: 'left' | 'right';
  object: string;
  same: boolean;
};

const RuleSwitchTask = (props: any) => {
  const {mode, length, object1, object2, type, onEnd} = props;
  const roundRef = useRef<number>(0);
  const [round, setRound] = useState<number>(0);
  const [stage, setStage] = useState<'decision' | 'feedback' | 'instruction'>(
    'instruction',
  );
  const positioningSequenceRef = useRef<Position[]>([]);
  const resultRef = useRef<any[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const startTime = useRef<number>(0);

  useEffect(() => {
    if (type === 'same' || type === 'different') {
      for (let i = 0; i < length; i++) {
        positioningSequenceRef.current.push({
          placement: i < length / 2 ? 'left' : 'right',
          object: object1.source,
          same: type === 'same',
        });
      }
    } else {
      for (let i = 0; i < length; i++) {
        positioningSequenceRef.current.push({
          placement: i < length / 2 ? 'left' : 'right',
          object: i % 2 === 0 ? object1.source : object2.source,
          same: i % 2 === 0,
        });
      }
    }
    shuffle(positioningSequenceRef.current);
  }, [length, object1, object2, type]);

  const onDecisionEnd = (decision: 'left' | 'right') => () => {
    const wasCorrect =
      (decision === positioningSequenceRef.current[round].placement) ===
      positioningSequenceRef.current[round].same;
    resultRef.current.push({
      decisionTime: new Date().getTime(),
      startTime: startTime.current,
      decision,
      isCorrect: wasCorrect,
      type,
      mode,
      placementType: positioningSequenceRef.current[round].same
        ? 'congruent'
        : 'incongruent',
    });
    setIsCorrect(wasCorrect);
    setStage('feedback');
  };

  const onFeedbackEnd = () => {
    roundRef.current += 1;
    setRound(roundRef.current);
    if (roundRef.current < length) {
      setStage('decision');
      startTime.current = new Date().getTime();
    } else {
      onEnd(resultRef.current);
    }
  };

  const getInstructionText = () => {
    if (type === 'same') {
      return `Tap on the button that’s on the same side as the ${object1.name}.`;
    } else if (type === 'different') {
      return `Tap on the button that’s on the opposite side of the ${object1.name}.`;
    } else {
      return `If you see ${object1.name}, tap on the same side. If you see a ${object2.name}, tap on the opposite side`;
    }
  };

  const startTest = () => {
    resultRef.current.push({
      startTime: new Date().getTime(),
      mode,
      object1: object1.name,
      object2: object2?.name ?? null,
    });
    setStage('decision');
    startTime.current = new Date().getTime();
  };

  return (
    <View style={styles.container}>
      {stage === 'instruction' ? (
        <View style={styles.instructionBox}>
          <Text variant="titleLarge">{getInstructionText()}</Text>
          <Button mode="contained" onPress={startTest}>
            Start
          </Button>
        </View>
      ) : stage === 'decision' ? (
        <RstPresent
          object={positioningSequenceRef.current[round].object}
          position={positioningSequenceRef.current[round].placement}
          onPress={onDecisionEnd}
        />
      ) : (
        <RstFeedback mode={mode} isCorrect={isCorrect} onEnd={onFeedbackEnd} />
      )}
    </View>
  );
};

RuleSwitchTask.propTypes = {
  mode: PropTypes.oneOf(['practice', 'test']).isRequired,
  length: PropTypes.number.isRequired,
  object1: PropTypes.object.isRequired,
  object2: PropTypes.object,
  type: PropTypes.oneOf(['same', 'different', 'both']).isRequired,
  evenSplit: PropTypes.bool,
  onEnd: PropTypes.func.isRequired,
};

RuleSwitchTask.defaultProps = {
  object2: null,
  evenSplit: false,
};

export default RuleSwitchTask;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  instructionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15,
  },
  imagesRow: {
    width: '100%',
  },
  buttonsRow: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
