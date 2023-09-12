import {signIn} from '@services/auth/actions';
import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.topTextView}>
          <Text variant="displayMedium">{titles.appName}</Text>
          <Image
            source={images.logo}
            style={{
              width: 200,
              height: 200,
            }}
          />
        </View>
        <View style={[styles.inputArea]}>
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
            style={[styles.button]}
            mode="contained-tonal"
            onPress={() => {
              dispatch(signIn({username, password, login_type: 'app'}));
            }}>
            Log in
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  topTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  topText: {
    fontSize: '20@ms',
    fontWeight: '900',
  },
  inputArea: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    flex: 1,
  },
  button: {
    alignSelf: 'stretch',
    width: '100%',
    marginTop: '20@vs',
  },
});
