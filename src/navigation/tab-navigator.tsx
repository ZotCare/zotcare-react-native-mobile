import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileScreen from '@app/screens/Profile/profile-screen';

import HomeScreen from '../screens/Home/HomeScreen';
import InfoScreen from '../screens/Home/InfoScreen';

export type TabNavigatorParams = {
  Home: undefined;
  Profile: undefined;
  Devices: undefined;
  Info: undefined;
};

const Drawer = createDrawerNavigator<TabNavigatorParams>();

const TabStackNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View>
              {focused ? (
                <Icon name="home" size={40} />
              ) : (
                <Icon name="home" size={35} />
              )}
            </View>
          ),
          title: 'HowRU',
        }}
      />
      {/*<Drawer.Screen*/}
      {/*  name={'Profile'}*/}
      {/*  component={ProfileScreen}*/}
      {/*  options={{*/}
      {/*    drawerIcon: () => <Icon name="person" size={35} />,*/}
      {/*  }}*/}
      {/*/>*/}
      <Drawer.Screen
        name="Info"
        component={InfoScreen}
        options={{
          drawerIcon: ({focused}) => (
            <View>
              {focused ? (
                <Icon name="info-outline" size={40} />
              ) : (
                <Icon name="info-outline" size={35} />
              )}
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default TabStackNavigator;
