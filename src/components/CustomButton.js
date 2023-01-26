import React, {useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {Button} from 'react-native-paper';
import Layout from '../constants/Layout';

export default CustomButton = ({
  icon,
  text,
  onPress,
  buttonColor = '#fff',
  style,
  labelStyle = {color: '#fff'},
}) => {
  const [focus, setFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Button
        icon={icon ?? ''}
        style={[style]}
        contentStyle={{height: '100%'}}
        // labelStyle={[{fontWeight: '900'}, labelStyle]}
        // color={buttonColor}
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
