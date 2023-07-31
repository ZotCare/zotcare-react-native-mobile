import PropTypes from 'prop-types';
import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import RstContext from './rst-context';

type RstFeedbackProps = {
  mode: 'practice' | 'test';
  isCorrect: boolean;
  feedbackDuration?: number;
  testPauseDuration?: number;
  onEnd: () => void;
};

const RstFeedback = (props: RstFeedbackProps) => {
  const {mode, isCorrect, onEnd} = props;
  const {feedbackDuration, testPauseDuration} = useContext(RstContext);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        onEnd();
      },
      mode === 'practice'
        ? (feedbackDuration || 1) * 1000
        : (testPauseDuration || 3) * 1000,
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {mode === 'practice' ? (
        <View
          style={[
            styles.container,
            {backgroundColor: isCorrect ? 'green' : 'red'},
          ]}>
          <Text style={styles.textCenter} variant="titleLarge">
            {isCorrect ? 'Correct' : 'Incorrect'}
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

RstFeedback.propTypes = {
  mode: PropTypes.oneOf(['practice', 'test']).isRequired,
  isCorrect: PropTypes.bool.isRequired,
  feedbackDuration: PropTypes.number,
  testPauseDuration: PropTypes.number,
  onEnd: PropTypes.func.isRequired,
};

RstFeedback.defaultProps = {
  feedbackDuration: 3,
  testPauseDuration: 1,
};

export default RstFeedback;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textCenter: {
    textAlign: 'center',
  },
});
