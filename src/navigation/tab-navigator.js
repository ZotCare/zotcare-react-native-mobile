import React, { useEffect } from 'react'
import { moderateScale, ScaledSheet, verticalScale, scale } from 'react-native-size-matters';
import Colors from '../constants/Colors';
import { Platform, View, Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  HomeScreen,
  InfoScreen,
  DevicesScreen
} from '../screens'
import images from '../assets/images'

const Tab = createMaterialBottomTabNavigator();

const TabStackNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={Colors.tabBackground}
      barStyle={{ backgroundColor: Colors.main_colors.tabBackground }}
      labeled={false}
      screenOptions={{
        headerMode: 'screen',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabItemStyle}>
              {focused ? <Icon name="home" size={40} color={Colors.main_colors.secondaryDarkColor} /> : <Icon name="home" size={35} color={Colors.main_colors.whiteButtonColor} />}
            </View>),
        }} />
      <Tab.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabItemStyle}>
              {focused ? <Icon name="watch" size={40} color={Colors.main_colors.secondaryDarkColor} /> : <Icon name="watch" size={35} color={Colors.main_colors.whiteButtonColor} />}
            </View>),
        }} />
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={styles.tabItemStyle}>
              {focused ? <Icon name="info-outline" size={40} color={Colors.main_colors.secondaryDarkColor} /> : <Icon name="info-outline" size={35} color={Colors.main_colors.whiteButtonColor} />}
            </View>),
        }}
      />     
    </Tab.Navigator>
  );
};

export default TabStackNavigator

const styles = ScaledSheet.create({
  tabItemStyle: {
    height: "35@vs", 
    width: "35@s", 
    alignItems: 'center'
  },
  drawerButtonStyle: { flexDirection: "row", alignItems: "center", justifyContent: "space-around" },
  headerStyle: {
    backgroundColor: Colors.main_colors.tabBackground,
    shadowOpacity: 0,
    elevation: 0,
    height: Platform.select({ android: verticalScale(50), ios: verticalScale(75) }),
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: moderateScale(14),
    color: Colors.textOnPrimaryColor,
  },
  headerRightStyle: { flexDirection: "row", alignItems: "center", justifyContent: "space-around" },
  icon: {}
})
