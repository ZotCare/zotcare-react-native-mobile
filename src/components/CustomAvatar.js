import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';

import Colors from '../constants/Colors';
import Layout from '../constants/view';

export default CustomAvatar = ({name, image, size, fontSize, style = {}}) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primaryColor,
        },
        style,
      ]}>
      {!!image.uri && (
        <Avatar.Image
          size={moderateScale(size)}
          source={image}
          style={{backgroundColor: Colors.main_colors.noImageBackground}}
        />
      )}
      {!image.uri && (
        <Avatar.Text
          size={moderateScale(size)}
          labelStyle={{fontSize: fontSize}}
          style={{
            color: Colors.textOnPrimaryColor,
            backgroundColor: Colors.main_colors.noImageBackground,
          }}
          label={!!name && name.length > 0 ? name[0] : ''}
        />
      )}
    </View>
  );
};
