import React, {useState} from 'react';
import {Platform, SafeAreaView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {Header} from '../../components';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import {forgotPassword} from '../../modules/auth/actions';
import mainStyles from '../../views/Styles';

if (Platform.OS === 'ios') {
  Icon.loadFont();
}

const ForgotPasswordScreen = props => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[mainStyles.authContainer]}>
      <Header title="Forgot Password" haveBackBtn={true} />
      <View style={[mainStyles.authContainer, styles.topMargin]}>
        <CustomTextInput
          value={email}
          placeholder="Email address"
          onChangeText={text => setEmail(text)}
        />
        <CustomButton
          text={'Send password'}
          type={'pink'}
          onPress={() => dispatch(forgotPassword(email))}
          style={styles.signupButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = ScaledSheet.create({
  topMargin: {
    marginTop: '20@vs',
  },
  text: {
    fontSize: '30@ms',
    fontWeight: '900',
    marginVertical: '25@vs',
  },
  signupButton: {
    marginVertical: '10@vs',
  },
  hintTextView: {
    marginTop: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintTextClickable: {
    color: Colors.main_colors.yellowText,
    fontWeight: '900',
    fontSize: '15@ms',
  },
  hintText: {
    fontSize: '15@ms',
    color: Colors.main_colors.whiteText,
  },
  forgotView: {
    width: '100%',
    paddingHorizontal: Layout.paddingHorizontal,
  },
  forgotText: {
    textAlign: 'right',
    color: Colors.main_colors.forgotTextColor,
    fontWeight: '900',
  },
});
