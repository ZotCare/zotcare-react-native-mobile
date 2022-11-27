import React from 'react'
import {SignUpScreen, SetProfileScreen, LoginScreen, ResetPasswordScreen, ForgotPasswordScreen, InitialScreen, VerificationCodeScreen} from '../screens'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default AuthStack = () => {
    //console.log('auth')
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerMode: 'screen',
            headerShown: false,
            headerLayoutPreset: 'center',
            defaultNavigationOptions: () => ({
                headerTitleStyle: {
                    fontWeight: 'normal',
                    color: "#fff"
                },
            }),
        }}>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}