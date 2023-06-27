import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import navigation_theme from '@app/constants/navigation_theme';
import {setTopLevelNavigator} from '@app/navigation/services';
import {SplashScreen} from '@components/SplashScreen';

import {getDBToken, loadDataFromDB} from '../modules/auth/actions';
import {getDBProfile} from '../modules/profile/actions';
import InteractionScreen from '../screens/Interaction/interaction-screen';
import AuthStack from './auth-stack';
import {TabStackNavigator} from './index';

export type NavigatorParams = {
  tab: undefined;
  interaction: {id: string};
};

const Stack = createNativeStackNavigator<NavigatorParams>();

export default () => {
  const token = useSelector(state => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    DeviceEventEmitter.addListener('Proximity', function () {});

    dispatch(getDBToken());
    dispatch(
      getDBProfile(() => {
        dispatch(
          loadDataFromDB(() => {
            setIsLoading(false);
          }),
        );
      }),
    );
  }, []);

  return (
    <NavigationContainer
      theme={navigation_theme}
      ref={navigatorRef => {
        setTopLevelNavigator(navigatorRef);
      }}>
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
