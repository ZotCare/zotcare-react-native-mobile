import React, { useState } from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  Text,
  Pressable
} from 'react-native';
import {
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
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirm] = useState("")
  const otp = useSelector(state => getCode(state))
  const email = NavigationService.getActiveRouteParams()?.email
  const code = NavigationService.getActiveRouteParams()?.code
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[mainStyles.authContainer]}>
        <Header title="Reset password" haveBackBtn={true} />
        <View style={[mainStyles.authContainer, styles.topMargin]}>          
          <CustomTextInput
            value={password}
            placeholder="New password"
            onChangeText={(text)=>setPassword(text)}
            secureTextEntry
          />
          <CustomTextInput
            value={password_confirmation}
            placeholder="Confirm password"
            onChangeText={(text)=>setPasswordConfirm(text)}
            secureTextEntry
          />
          <Text>{otp}</Text>
          <CustomButton
            text={"Reset password"}
            type={"pink"} 
            onPress={()=>dispatch(resetPassword({email, code, password, password_confirmation}))}
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
    marginVertical: "20@vs"
  },
  hintTextView: {
    marginTop: "20@vs",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  hintTextClickable: {
    color: Colors.main_colors.yellowText,
    fontWeight: "900",
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
    fontWeight: "900"
  }
});
