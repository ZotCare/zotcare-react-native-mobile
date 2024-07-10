import {useEffect, useRef, useState} from 'react';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import TutorialPage from './TutorialPage';
import DigitSpan from './DigitSpan';

const Custom6 = (props: any) => {
  const [showTutorial, setShowTutorial] = useState(true);
  const {gridSize, tileDelay, sequenceDelay, onEnd} = props;

  // When next clicked, don't show tutorial anymore & switch to game
  const nextClicked = () => {
    setShowTutorial(false);
  }

  // Either show the TutorialPage, or start game when 'Next' clicked
  return (
    <View style={styles.mainContainer}>
      {showTutorial ? (<TutorialPage onNext={nextClicked} />) : 
        (<DigitSpan gridSize={gridSize} tileDelay={tileDelay} sequenceDelay={sequenceDelay} onEnd={onEnd} />)}
    </View>
  );  
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Custom6;
