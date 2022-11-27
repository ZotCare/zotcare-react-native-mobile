import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabStackNavigator, AuthStack, NavigationService } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import { DeviceEventEmitter } from 'react-native';
import { getDBToken, loadDataFromDB } from '../modules/auth/actions';
import { getDBProfile } from '../modules/profile/actions';
import {
    ProfileScreen,
} from "../screens";
import { getUUID } from '../modules/profile/selectors';

const Stack = createNativeStackNavigator();

export default RootNavigator = (props) => {
    const token = useSelector(state => state.auth.token)
    const uuid = useSelector(state => getUUID(state))
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        DeviceEventEmitter.addListener('Proximity', function (data) {
            //console.log('DeviceEventEmitter', data)
        });

        dispatch(getDBToken())
        dispatch(getDBProfile((res) => { 
            dispatch(loadDataFromDB(()=>{
                //console.log("hereeeeeee")
                setIsLoading(false)
            }))
        }))
    }, [])

    // if (isLoading === true) {
    //     return <Splash />;
    // }
    return (
        <NavigationContainer
            ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)}
        >
            {!token ?
                (
                    <AuthStack />
                ) :
                (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="tab" component={TabStackNavigator}></Stack.Screen>
                        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>                    
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>)
}

const styles = ScaledSheet.create({
});