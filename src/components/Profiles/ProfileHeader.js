\import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Avatar, Button, Card, Surface} from 'react-native-paper';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';

import Colors from '../../constants/Colors';
import {
  pickSingleForProfile,
  pickSingleWithCameraProfile,
} from '../../libs/imageApi';
import {signOut} from '../../modules/auth/actions';

const ProfileHeader = ({
  image,
  btnText,
  onPress,
  imageSelected,
  image_selectable = false,
  onMessagePress,
}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const messageBtn =
    btnText == 'Following' ? (
      <Button
        mode="contained"
        color={Colors.primaryColor}
        style={[styles.btn, {top: '-40%'}]}
        onPress={() => onMessagePress()}>
        message
      </Button>
    ) : null;

  return (
    <Card style={styles.profileBox}>
      <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Surface style={[styles.surface]}>
          <View style={styles.container}>
            <Button
              icon=""
              contentStyle={styles.button}
              style={[{marginVertical: verticalScale(10), width: '100%'}]}
              mode="contained"
              dark={true}
              onPress={() => {
                pickSingleForProfile(true, true, image => {
                  setVisible(false);
                  imageSelected(image);
                });
              }}>
              {'Choose from Library...'}
            </Button>
            <Button
              icon=""
              contentStyle={styles.button}
              style={[{marginVertical: verticalScale(10), width: '100%'}]}
              mode="contained"
              dark={true}
              onPress={() => {
                pickSingleWithCameraProfile(true, false, 'photo', image => {
                  setVisible(false);
                  imageSelected(image);
                });
              }}>
              {'Take Photo...'}
            </Button>
          </View>
        </Surface>
      </Modal>
      <TouchableOpacity onPress={() => image_selectable && setVisible(true)}>
        <Avatar.Image
          size={moderateScale(100)}
          style={{margin: '3%'}}
          source={{uri: image}}
        />
      </TouchableOpacity>

      {messageBtn}

      {btnText == 'Edit' && (
        <Button
          mode="contained"
          color={Colors.primaryColor}
          style={[styles.btn, {top: '-40%'}]}
          onPress={() => dispatch(signOut())}>
          {'Logout'}
        </Button>
      )}
      <Button
        mode="contained"
        color={Colors.primaryColor}
        style={styles.btn}
        onPress={() => onPress()}>
        {btnText}
      </Button>
    </Card>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  profileBox: {
    width: '85%',
    alignSelf: 'flex-end',
    borderRadius: 0,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderColor: Colors.textOnBackgroundColor,
    backgroundColor: Colors.secondaryColorLight,
    elevation: 3,
  },
  btn: {
    textDecorationColor: Colors.secondaryColor,
    alignSelf: 'flex-end',
    marginHorizontal: '10%',
    marginTop: '-15%',
    marginBottom: '3%',
  },
});
