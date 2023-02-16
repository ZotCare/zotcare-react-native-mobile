import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {ScaledSheet, verticalScale, scale} from 'react-native-size-matters';
import {Button, TextInput} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import Layout from '../../constants/Layout';
import {useDispatch} from 'react-redux';
import {signIn} from '../../modules/auth/actions';
import images from '../../assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View style={[styles.topMargin, styles.topTextView]}>
        <Text style={styles.topText}>{'ZotCare'}</Text>
        <Image
          source={images.logo}
          style={{
            marginTop: verticalScale(10),
            height: scale(200),
            aspectRatio: 1,
          }}
        />
      </View>
      <View style={[styles.topMargin]}>
        <TextInput
          label="Username"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />

        <Button
          style={styles.topMargin}
          mode="contained-tonal"
          onPress={() => {
            dispatch(signIn({username, password, login_type: 'app'}));
          }}>
          Log in &nbsp;
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = ScaledSheet.create({
  topTextView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontSize: '20@ms',
    fontWeight: '900',
  },
  topMargin: {
    marginTop: '20@vs',
  },
  text: {
    fontSize: '30@ms',
    fontWeight: '900',
    marginVertical: '25@vs',
  },
  signupButton: {
    marginVertical: '20@vs',
  },
  hintTextView: {
    marginTop: '20@vs',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintTextClickable: {
    fontWeight: '900',
    fontSize: '15@ms',
  },
  hintText: {
    fontSize: '15@ms',
  },
  forgotView: {
    width: '100%',
    paddingHorizontal: Layout.paddingHorizontal,
  },
  forgotText: {
    textAlign: 'right',
    fontWeight: '900',
  },
});
