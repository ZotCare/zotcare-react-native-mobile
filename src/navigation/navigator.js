import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {ScaledSheet} from 'react-native-size-matters';
import {DeviceEventEmitter} from 'react-native';
import {getDBToken, loadDataFromDB} from '../modules/auth/actions';
import {getDBProfile} from '../modules/profile/actions';
import {getUUID} from '../modules/profile/selectors';
import AuthStack from './auth-stack';
import {NavigationService, TabStackNavigator} from './index';
import InteractionScreen from '../screens/Interaction/interaction-screen';
import { SplashScreen } from '../components/SplashScreen';

const Stack = createNativeStackNavigator();

export default RootNavigator = props => {
  const token = useSelector(state => state.auth.token);
  const uuid = useSelector(state => getUUID(state));
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    DeviceEventEmitter.addListener('Proximity', function (data) {});

    dispatch(getDBToken());
    dispatch(
      getDBProfile(res => {
        dispatch(
          loadDataFromDB(() => {
            setIsLoading(false);
          }),
        );
      }),
    );
  }, []);

 
  return (
    <NavigationContainer>
      <SplashScreen isAppReady={isLoading}>
        {!token ? (
          <AuthStack />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="tab"
              component={TabStackNavigator}
            />
            <Stack.Screen name="interaction" component={InteractionScreen} />
          </Stack.Navigator>
        )}
      </SplashScreen>
    </NavigationContainer>
  );
};

const styles = ScaledSheet.create({});
