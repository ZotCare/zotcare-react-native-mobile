import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {BackHandler, Platform, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Button, HelperText, Surface, TextInput} from 'react-native-paper';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import Colors from '../../constants/Colors';
import {registerProfile} from '../../modules/auth/actions';
import * as ProfileActions from '../../modules/profile/constants';
import {NavigationService} from '../../navigation';

const SetProfileScreen = props => {
  const [show, setShow] = useState(Platform.OS === 'ios');
  const [step, setStep] = useState(1);

  useEffect(() => {
    //console.log(props.profile)
    //console.log("dob", (!!props.profile.dob && props.profile.dob !== "") ? new Date(props.profile.dob) : new Date())
  }, []);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        NavigationService.getNavigator().goBack();
        return true;
      });
    });

    props.navigation.addListener('blur', () =>
      BackHandler.removeEventListener('hardwareBackPress', () => {
        NavigationService.getNavigator().goBack();
        return true;
      }),
    );
  }, []);

  const hasErrors = () => {
    let resp = 0;
    if (
      props.profile.email.startsWith('#init') ||
      props.profile.email === '' ||
      !props.profile.email.includes('@')
    ) {
      resp |= 1;
    }
    if (
      props.profile.username.startsWith('#init') ||
      props.profile.username == ''
    ) {
      resp |= 2;
    }
    if (props.profile.first_name == '') {
      resp |= 4;
    }
    if (props.profile.last_name == '') {
      resp |= 8;
    }
    if (!props.profile.dob) {
      resp |= 16;
    }

    //console.log("resp", resp, resp & 4)
    return resp;
  };

  return (
    <View style={[styles.container]}>
      <ScrollView />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerProfile: () => {
      dispatch(registerProfile());
    },
    setProfile: profile => {
      dispatch({type: ProfileActions.SET_PROFILE_SUCCESS, payload: profile});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetProfileScreen);

const styles = ScaledSheet.create({
  surface: {
    elevation: 6,
    // marginHorizontal: "5@s",
    borderRadius: 10,
    paddingHorizontal: '10@s',
    backgroundColor: '#fefefe',
    alignItems: 'stretch',
    paddingVertical: '10@vs',
    justifyContent: 'flex-start',
  },
  inputText: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primaryColorDark,
    marginVertical: '5@vs',
    width: '100%',
    overflow: 'hidden',
  },
  phone: {
    marginVertical: '5@vs',
    width: '100%',
    height: '50@vs',
    overflow: 'hidden',
  },
  inputText2: {
    width: '90%',
    color: Colors.textOnBackgroundColor,
    backgroundColor: Colors.textOnPrimaryColor,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center',
    padding: '30@s',
    alignItems: 'stretch',
  },
  viewContainer: {
    alignSelf: 'stretch',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 50,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
  },
  bottomView: {
    height: '100@vs',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: '60@vs',
    marginHorizontal: '30@s',
    alignItems: 'center',
  },
  content: {
    marginVertical: '10@vs',
    width: '100%',
    height: '50@vs',
    fontSize: '12@ms',
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: Colors.secondaryColor,
    paddingHorizontal: '10@s',
  },
  button: {
    // marginVertical: "10@vs",
    width: '100%',
    height: '40@vs',
  },
  buttonBottom: {
    color: Colors.primaryColor,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  bottom: {
    position: 'absolute',
    bottom: '0@vs',
    left: '30@vs',
    right: '30@vs',
  },
  contentBottom: {
    paddingHorizontal: '10@s',
    marginVertical: '10@vs',
    height: '40@vs',
  },
  picker: {
    position: 'absolute',
    bottom: 0,
  },
  codeText: {
    position: 'absolute',
    top: '15@vs',
    left: '30%',
    fontSize: '16@ms',
    textAlign: 'center',
    lineHeight: '30@vs',
  },
  text: {
    fontWeight: 'bold',
    fontSize: '12@ms',
    textAlign: 'left',
    marginTop: '15@vs',
  },
  titleText: {
    fontSize: '15@ms',
    marginTop: '10@vs',
    textAlign: 'center',
  },
});
