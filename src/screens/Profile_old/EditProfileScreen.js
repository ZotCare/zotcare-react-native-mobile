import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {Header} from '../../components';
import Colors from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationService} from '../../navigation';
import {
  getUUID,
  getProfile,
  getProfileSuccess,
} from '../../modules/profile/selectors';
import * as profileActions from '../../modules/profile/actions';
import CustomAvatar from '../../components/CustomAvatar';
import {Switch, Searchbar, IconButton} from 'react-native-paper';
import {
  pickSingleForProfile,
  pickSingleWithCameraProfile,
} from '../../libs/imageApi';
import mainStyles from '../../views/Styles';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Layout from '../../constants/Layout';
import {deleteAccount, signOut} from '../../modules/auth/actions';

const EditProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const uuid = useSelector(state => getUUID(state));
  const profile = useSelector(state => getProfile(state));
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const visible2 = useSelector(getProfileSuccess);
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [name, setName] = useState(profile.name ?? '');
  const [biography, setBiography] = useState(profile.biography ?? '');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      NavigationService.navigate('tab', {screen: 'Home'});
      return true;
    });
  });

  useEffect(() => {
    if (uuid) {
      dispatch(profileActions.getProfile());
    }
  }, [uuid]);

  const imageSelectComponent = () => {
    return (
      <View style={styles.container}>
        <CustomButton
          text={'Choose from Library...'}
          type={'white'}
          onPress={() => {
            pickSingleForProfile(true, true, image => {
              setVisible(false);
              dispatch(profileActions.setProfilePhoto(image));
            });
          }}
          style={{marginHorizontal: 0}}
        />
        <CustomButton
          text={'Take Photo...'}
          type={'white'}
          onPress={() => {
            pickSingleWithCameraProfile(true, false, 'photo', image => {
              setVisible(false);
              dispatch(profileActions.setProfilePhoto(image));
            });
          }}
          style={{marginHorizontal: 0}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[mainStyles.authContainer]}>
      <ScrollView>
        <Header title="Settings" haveBackBtn />

        <CustomModal
          visible={visible}
          onBackdropPress={() => setVisible(false)}
          component={imageSelectComponent()}
        />
        <CustomModal
          visible={visible2}
          component={
            <Text
              style={{
                fontSize: 17,
                fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
                color: Colors.main_colors.whiteText,
                textAlign: 'center',
              }}>
              {'Profile updated successfully'}
            </Text>
          }
        />
        <TouchableOpacity onPress={() => setVisible(true)}>
          <CustomAvatar
            name={profile.name}
            image={{uri: profile.avatar}}
            size={120}
            fontSize={40}
          />
          <Text
            style={[
              {textAlign: 'center', paddingTop: verticalScale(5)},
              mainStyles.textBold,
            ]}>
            Edit image
          </Text>
        </TouchableOpacity>
        <CustomTextInput
          value={name}
          style={{marginTop: verticalScale(20)}}
          placeholder="Name"
          onChangeText={text => setName(text)}
        />

        <CustomTextInput
          value={biography}
          style={{marginTop: verticalScale(20)}}
          placeholder="Biography"
          onChangeText={text => setBiography(text)}
        />
        <CustomButton
          text={'Save changes'}
          type={'pink'}
          onPress={() => {
            dispatch(profileActions.setProfile({name, biography}));
          }}
          style={{
            marginVertical: verticalScale(15),
            marginBottom: verticalScale(25),
          }}
        />

        <CustomButton
          text={'Change password'}
          type={'white'}
          onPress={() => {
            NavigationService.navigate('ChangePassword');
          }}
        />
        <CustomButton
          text={'Logout'}
          type={'orange'}
          onPress={() => {
            setVisibleLogout(true);
          }}
        />
        <CustomButton
          text={'Delete account'}
          type={'orange'}
          onPress={() => {
            setVisibleDelete(true);
          }}
        />
      </ScrollView>
      <CustomModal
        visible={visibleLogout}
        hasButtons
        onBackdropPress={() => setVisibleLogout(false)}
        component={
          <Text
            style={{
              fontSize: 17,
              fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
              color: Colors.main_colors.whiteText,
              textAlign: 'center',
            }}>
            {'Are you sure you want to logout?'}
          </Text>
        }
        whiteText={'No'}
        pinkText={'Yes'}
        onPinkButtonPress={() => dispatch(signOut())}
        onWhiteButtonPress={() => setVisibleLogout(false)}
      />
      <CustomModal
        visible={visibleDelete}
        hasButtons
        onBackdropPress={() => setVisibleDelete(false)}
        component={
          <Text
            style={{
              fontSize: 17,
              fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
              color: Colors.main_colors.whiteText,
              textAlign: 'center',
            }}>
            {'Are you sure you want to delete your account?'}
          </Text>
        }
        whiteText={'No'}
        pinkText={'Yes'}
        onPinkButtonPress={() => {
          setVisibleDelete(false);
          setTimeout(() => refRBSheet.current.open(), 500);
        }}
        onWhiteButtonPress={() => setVisibleDelete(false)}
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    height: '100%',
  },
  btnsBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
    marginBottom: 10,
  },
  mic: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 5,
    backgroundColor: Colors.backgroundColor,
  },
  fab: {
    position: 'absolute',
    backgroundColor: Colors.primaryColor,
  },
  texts: {textAlign: 'center'},
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  surface: {
    // marginHorizontal: "20@s",
    // paddingTop: "10@vs",
    paddingBottom: '10@vs',
    height: '150@ms',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    paddingHorizontal: '20@s',
    elevation: 2,
    borderRadius: 10,
  },
});
