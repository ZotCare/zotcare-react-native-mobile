import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import navigation_theme from '@app/constants/navigation_theme';
import {setTopLevelNavigator} from '@app/navigation/services';
import TabStackNavigator from '@app/navigation/tab-navigator';
import CategoryScreen from '@app/screens/Home/CategoryScreen';
import {getDBToken} from '@app/services/auth/actions';

import InteractionScreen from '../screens/Interaction/interaction-screen';
import AuthStack from './auth-stack';
import {SplashScreen} from './components/SplashScreen';

export type NavigatorParams = {
  tab: undefined;
  interaction: {id: string};
  category: {id: string};
};

const Stack = createNativeStackNavigator<NavigatorParams>();

export default () => {
  const token = useSelector((state: any) => state.auth.token);
  const [isLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDBToken());
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
            <Stack.Screen name="category" component={CategoryScreen} />
          </Stack.Navigator>
        )}
      </SplashScreen>
    </NavigationContainer>
  );
};
