import {useEffect, useRef, useState} from 'react';
import {Button, Text} from 'react-native-paper';

import uniqueRandom from '../../../utils/unique-random';
import rstObjects from './rst-objects';
import RuleSwitchTask from './rule-switch-task';

enum StageType {
  Loading,
  Practice,
  Test,
  OppositePractice,
  OppositeTest,
  BothSidesPractice,
  BothSidesTest,
}

const Custom4 = (props: any) => {
  const {
    practiceRounds,
    singleTestRounds,
    bothSidesPracticeRounds,
    BothSideRounds,
    onEnd,
  } = props;
  const [stage, setStage] = useState(StageType.Loading);
  const objectRef = useRef<any>();
  const oppositeObjectRef = useRef<any>();
  const resultRef = useRef<any[]>([]);

  useEffect(() => {
    const [objectIndex, oppositeObjectIndex] = uniqueRandom(
      0,
      rstObjects.length - 1,
      2,
    );
    [objectRef.current, oppositeObjectRef.current] = [
      rstObjects[objectIndex],
      rstObjects[oppositeObjectIndex],
    ];
    setStage(StageType.Practice);
  }, []);

  const handleStageEnd = (stageResult: any) => {
    resultRef.current.push(stageResult);
    switch (stage) {
      case StageType.Practice:
        setStage(StageType.Test);
        break;
      case StageType.Test:
        setStage(StageType.OppositePractice);
        break;
      case StageType.OppositePractice:
        setStage(StageType.OppositeTest);
        break;
      case StageType.OppositeTest:
        setStage(StageType.BothSidesPractice);
        break;
      case StageType.BothSidesPractice:
        setStage(StageType.BothSidesTest);
        break;
      case StageType.BothSidesTest:
        onEnd(resultRef.current, true);
        break;
    }
  };

  return stage === StageType.Practice ? (
    <RuleSwitchTask
      key={StageType.Practice}
      mode="practice"
      length={practiceRounds}
      object1={objectRef.current}
      type="same"
      onEnd={handleStageEnd}
    />
  ) : stage === StageType.Test ? (
    <RuleSwitchTask
      key={StageType.Test}
      mode="test"
      length={singleTestRounds}
      object1={objectRef.current}
      type="same"
      onEnd={handleStageEnd}
    />
  ) : stage === StageType.OppositePractice ? (
    <RuleSwitchTask
      key={StageType.OppositePractice}
      mode="practice"
      length={practiceRounds}
      object1={oppositeObjectRef.current}
      type="different"
      onEnd={handleStageEnd}
    />
  ) : stage === StageType.OppositeTest ? (
    <RuleSwitchTask
      key={StageType.OppositeTest}
      mode="test"
      length={singleTestRounds}
      object1={oppositeObjectRef.current}
      type="different"
      onEnd={handleStageEnd}
    />
  ) : stage === StageType.BothSidesPractice ? (
    <RuleSwitchTask
      key={StageType.BothSidesPractice}
      mode="practice"
      length={bothSidesPracticeRounds}
      object1={objectRef.current}
      object2={oppositeObjectRef.current}
      type="both"
      onEnd={handleStageEnd}
    />
  ) : stage === StageType.BothSidesTest ? (
    <RuleSwitchTask
      key={StageType.BothSidesTest}
      mode="test"
      length={BothSideRounds}
      object1={objectRef.current}
      object2={oppositeObjectRef.current}
      type="both"
      onEnd={handleStageEnd}
    />
  ) : (
    <Text> Loading </Text>
  );
};

export default Custom4;
