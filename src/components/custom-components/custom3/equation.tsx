import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const Equation = (props: any) => {
  const {equation} = props;

  return (
    <Text style={styles.text} variant={'displayLarge'}>
      {equation.a} {equation.operator} {equation.b} = {equation.result}
    </Text>
  );
};

export default Equation;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
