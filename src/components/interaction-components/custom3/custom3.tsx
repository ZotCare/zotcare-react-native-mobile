import {useEffect, useRef, useState} from 'react';
import {Text} from 'react-native-paper';

import shuffle from '../../../utils/shuffle';
import Ospan from './ospan';

const Custom3 = (props: any) => {
  const {equationTime, letterTime, trialsRange, onEnd} = props;
  const roundsRef = useRef<number[]>([]);
  const [round, setRound] = useState<number>(0);
  const resultRef = useRef<any[]>([]);
  const [stage, setStage] = useState<'loading' | 'ready'>('loading');

  useEffect(() => {
    for (let i = trialsRange[0]; i <= trialsRange[1]; i++) {
      roundsRef.current.push(i);
    }
    shuffle(roundsRef.current);
    setStage('ready');
  }, []);

  const onEvaluate = (result: any) => {
    resultRef.current.push(result);
    if (round < roundsRef.current.length - 1) {
      setRound(round + 1);
    } else {
      onEnd(resultRef.current, true);
    }
  };

  return stage === 'loading' ? (
    <Text>Loading...</Text>
  ) : (
    <Ospan
      key={round}
      rounds={roundsRef.current[round]}
      equationTime={equationTime}
      letterTime={letterTime}
      onEnd={onEvaluate}
    />
  );
};

export default Custom3;
