import {signIn} from '@services/auth/actions';
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';

import images from '@app/assets/images';
import titles from '@app/constants/titles';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topMargin, styles.topTextView]}>
        <Text style={styles.topText}>{titles.appName}</Text>
        <Image
          source={images.logo}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <View style={[styles.topMargin, styles.inputArea]}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  inputArea: {
    width: '100%',
    maxWidth: 450,
  },
});
