import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

type RstFeedbackProps = {
  mode: 'practice' | 'test';
  isCorrect: boolean;
  onEnd: () => void;
};

const RstFeedback = (props: RstFeedbackProps) => {
  const {mode, isCorrect, onEnd} = props;

  useEffect(() => {
    const timer = setTimeout(
      () => {
        onEnd();
      },
      mode === 'practice' ? 3000 : 1000,
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
  onEnd: PropTypes.func.isRequired,
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
