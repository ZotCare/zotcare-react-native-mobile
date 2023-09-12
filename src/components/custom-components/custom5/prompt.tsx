import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

type Props = {
  text: string;
  onClick: () => void;
};

const Prompt = (props: Props) => {
  const {text, onClick} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text} variant="titleLarge">
        {text}
      </Text>
      <Button mode="contained" onPress={onClick}>
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default Prompt;
