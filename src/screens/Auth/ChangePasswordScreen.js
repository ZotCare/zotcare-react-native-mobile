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
import { changePassword } from '../../modules/auth/actions';

if (Platform.OS === 'ios') {
  Icon.loadFont();
}

const ChangePasswordScreen = props => {
  const [current_password, setCurrentPassword] = useState("")
  const [new_password, setNewPassword] = useState("")
  const [new_password_confirmation, setNewPasswordConfirm] = useState("")

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[mainStyles.authContainer]}>
        <Header title="Change password" haveBackBtn={true} />
        <View style={[mainStyles.authContainer, styles.topMargin]}>          
          <CustomTextInput
            value={current_password}
            placeholder="Current Password"
            onChangeText={(text)=>setCurrentPassword(text)}
          />
          <CustomTextInput
            value={new_password}
            placeholder="New password"
            onChangeText={(text)=>setNewPassword(text)}
            secureTextEntry
          />
          <CustomTextInput
            value={new_password_confirmation}
            placeholder="Confirm password"
            onChangeText={(text)=>setNewPasswordConfirm(text)}
            secureTextEntry
          />
          <CustomButton
            text={"Reset password"}
            type={"pink"} 
            onPress={()=>dispatch(changePassword({current_password, new_password, new_password_confirmation}))}
            style={styles.signupButton}
          />          
        </View>
      </SafeAreaView>
  );
};

export default ChangePasswordScreen

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
