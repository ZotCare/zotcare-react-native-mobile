import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const WordPair = (props: any) => {
  const {wordPair, swap} = props;

  let invert = swap ? 1 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.text} variant="headlineMedium">
        {wordPair[invert]}
      </Text>
      <Text style={styles.text} variant="headlineSmall">
        +
      </Text>
      <Text style={styles.text} variant="headlineMedium">
        {wordPair[1 - invert]}
      </Text>
    </View>
  );
};

WordPair.propTypes = {
  wordPair: PropTypes.arrayOf(PropTypes.string).isRequired,
  swap: PropTypes.bool,
};

WordPair.defaultProps = {
  swap: false,
};

export default WordPair;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  text: {
    textAlign: 'center',
  },
});
