import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import LoginScreen from '../screens/Auth/LoginScreen';

const Stack = createNativeStackNavigator();

export default () => {
  //console.log('auth')
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerMode: 'screen',
        headerShown: false,
        headerLayoutPreset: 'center',
        defaultNavigationOptions: () => ({
          headerTitleStyle: {
            fontWeight: 'normal',
            color: '#fff',
          },
        }),
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
