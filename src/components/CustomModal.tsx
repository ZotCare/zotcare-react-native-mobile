import React from 'react';
import {View} from 'react-native';
import {Button, Modal, Surface} from 'react-native-paper';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';

type Props = {
  hasButtons?: boolean;
  visible: boolean;
  primaryText?: string;
  secondaryText?: string;
  onPrimaryButtonPress?: () => void;
  onSecondaryButtonPress?: () => void;
  onBackdropPress: () => void;
  component?: React.ReactNode;
};

const CustomModal = ({
  hasButtons,
  visible,
  primaryText,
  secondaryText,
  onPrimaryButtonPress,
  onSecondaryButtonPress,
  onBackdropPress,
  component,
}: Props) => {
  return (
    <Modal visible={visible} onDismiss={onBackdropPress}>
      <Surface style={[styles.surface, {height: verticalScale(130)}]}>
        {component}
        {hasButtons && (
          <View style={styles.buttonsView}>
            <Button onPress={onSecondaryButtonPress}>{secondaryText}</Button>
            <Button onPress={onPrimaryButtonPress}>{primaryText}</Button>
          </View>
        )}
      </Surface>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  surface: {
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: '20@s',
    elevation: 2,
  },
  buttonsView: {
    marginTop: '20@vs',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomModal;
