import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {Surface} from 'react-native-paper';
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';

export default CustomModal = ({
  hasButtons,
  visible,
  whiteText,
  pinkText,
  onWhiteButtonPress,
  onPinkButtonPress,
  onBackdropPress,
  component,
}) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onBackdropPress}>
      <Surface style={[styles.surface, {height: verticalScale(130)}]}>
        {component}
        {hasButtons && (
          <View style={styles.buttonsView}>
            <CustomButton
              text={pinkText}
              onPress={onPinkButtonPress}
              style={{flex: 1}}
            />
            <CustomButton
              text={whiteText}
              onPress={onWhiteButtonPress}
              style={{flex: 1}}
            />
          </View>
        )}
      </Surface>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  surface: {
    // marginHorizontal: "20@s",
    // paddingTop: "10@vs",
    //  height: "150@ms",
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: '20@s',
    //  paddingTop: "20@vs",
    elevation: 2,
  },
  buttonsView: {
    marginTop: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
