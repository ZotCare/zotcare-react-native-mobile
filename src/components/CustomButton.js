import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

import Layout from '../constants/Layout';

export default ({icon, text, onPress, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Button
        icon={icon ?? ''}
        style={[style]}
        contentStyle={{height: '100%'}}
        mode="contained"
        onPress={onPress}
        uppercase={false}>
        {text}
      </Button>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: '40@vs',
    minWidth: '120@s',
    marginHorizontal: Layout.marginHorizontal,
    marginVertical: '5@vs',
  },
});
