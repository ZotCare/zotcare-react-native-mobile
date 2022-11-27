import React, {useState} from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  Text,
  Pressable,
  Image
} from 'react-native';
import {
  ScaledSheet, verticalScale, scale
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mainStyles from '../../views/Styles'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import Colors from "../../constants/Colors"
import { NavigationService } from '../../navigation'
import Layout from '../../constants/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../modules/auth/actions';
import images from '../../assets/images';

if (Platform.OS === 'ios') {
  Icon.loadFont();
}

const LoginScreen = props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[mainStyles.authContainer]}>
        <View style={[styles.topMargin, styles.topTextView]}>
          <Text style={styles.topText}>{"ZotCare App"}</Text>
          <Image
            source={images.logo}
            style={{marginTop: verticalScale(-10), height: scale(300), aspectRatio: 1}}
          />
        </View>
        <View style={[mainStyles.authContainer, styles.topMargin]}>
          <CustomTextInput
            placeholder="Username"
            onChangeText={(text)=>setUsername(text)}
            value={username}
          />
          <CustomTextInput
            placeholder="Password"
            onChangeText={(text)=>setPassword(text)}
            value={password}
            secureTextEntry
          />
          
          <CustomButton
            text={"Log in"}
            buttonColor={Colors.main_colors.secondaryColor} 
            onPress={()=>{
              dispatch(signIn({username, password, login_type: "app"}))}}
            style={styles.signupButton}
          />                    
        </View>
      </SafeAreaView>
  );
};

export default LoginScreen

const styles = ScaledSheet.create({
  topTextView: {
    alignItems: "center",
    justifyContent: "center",    
  }, 
  topText: {
    fontSize: "20@ms",
    fontWeight: '900',
    color: Colors.main_colors.whiteText
  },
  topMargin: {
    marginTop: "20@vs"
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
    color: Colors.main_colors.purpleText,
    fontWeight: "900",
    fontSize: "15@ms",
  },
  hintText: {
    fontSize: "15@ms",
    color: Colors.main_colors.blackText
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
