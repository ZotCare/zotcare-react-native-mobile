import React, { useState } from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  Text,
  Pressable
} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet, verticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mainStyles from '../../views/Styles'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import Colors from "../../constants/Colors"
import { Header } from "../../components";
import Layout from '../../constants/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../modules/auth/actions';
import { NavigationService } from '../../navigation'
import { getCode } from '../../modules/auth/selectors';

if (Platform.OS === 'ios') {
  Icon.loadFont();
}

const ResetPasswordScreen = props => {
  const [code, setOTP] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirm] = useState("")
  const otp = useSelector(state => getCode(state))
  const email = NavigationService.getActiveRouteParams()?.email
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[mainStyles.authContainer]}>
        <Header title="Verification" haveBackBtn={true} />
        <View style={[mainStyles.authContainer, styles.topMargin]}>   
          <Text style={{marginHorizontal: scale(20), fontSize: moderateScale(15), marginBottom: verticalScale(10)}}>{"A One Time Password (OTP) has been sent to your email. Please enter to verify your account."}</Text>       
          <CustomTextInput
            value={code}
            placeholder="OTP Code"
            onChangeText={(text)=>setOTP(text)}
          />
          <Text>{otp}</Text>
          <CustomButton
            text={"Verify"}
            type={"pink"} 
            onPress={()=>NavigationService.navigate("ResetPassword", {email, code})}
            style={styles.signupButton}
          />          
        </View>
      </SafeAreaView>
  );
};

export default ResetPasswordScreen

const styles = ScaledSheet.create({
  topMargin: {
    marginTop: "10@vs"
  },    
  text: {
    fontSize: "30@ms",
    fontWeight: '900',
    marginVertical: "25@vs"
  },
  signupButton: {
    // marginVertical: "20@vs"
  },
  hintTextView: {
    marginTop: "20@vs",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  hintTextClickable: {
    color: Colors.main_colors.yellowText,
    fontWeight: Platform.OS == "ios" ? '900' : "bold",
    fontSize: "15@ms",
  },
  hintText: {
    fontSize: "15@ms",
    color: Colors.main_colors.whiteText
  },
  forgotView: {
    width: "100%",
    paddingHorizontal: Layout.paddingHorizontal,
  },
  forgotText: {
    textAlign: "right",
    color: Colors.main_colors.forgotTextColor,
    fontWeight: Platform.OS == "ios" ? '900' : "bold"
  }
});
