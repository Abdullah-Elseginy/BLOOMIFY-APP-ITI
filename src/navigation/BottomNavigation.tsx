/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import colors from '../constants/Constant';
import {FONTS} from '../constants/Fonts';
import IMAGES from '../constants/Images';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import Profile from '../screens/ProfileScreen';
import {hp, wp} from '../constants/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarLabel: ({focused}) => {
          return (
            <View>
              <Text
                style={[
                  styles.tabBarName,
                  {
                    color: focused ? '#00f' : colors.colors['dark-brownish'],
                    fontFamily: focused ? FONTS.SemiBold : FONTS.Regular,
                  },
                ]}>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarIcon: ({focused}) => {
          let Icon;
          if (route.name === 'Home') {
            Icon = focused ? (
              <AntDesign color={'#000'} size={20} name={'home'} />
            ) : (
              <AntDesign color={'#000'} size={20} name={'home'} />
            );
          }
          if (route.name === 'cart') {
            Icon = focused ? (
              <AntDesign color={'#000'} size={20} name={'home'} />
            ) : (
              <AntDesign color={'#000'} size={20} name={'home'} />
            );
          }
          if (route.name === 'Profile') {
            Icon = focused ? (
              <AntDesign color={'#000'} size={20} name={'home'} />
            ) : (
              <AntDesign color={'#000'} size={20} name={'home'} />
            );
          }

          return Icon;
        },
        headerShown: false,
        tabBarStyle: [styles.tapStyles],
      })}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen name={'cart'} component={CartScreen} />
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tapStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? hp(12.5) : hp(9),
    width: wp('100%'),
    borderWidth: 1,
    backgroundColor: colors.colors['light-pink'],
    borderTopWidth: 0.1,
    borderTopColor: colors.colors['dusty-mauve'],
    paddingTop: Platform.OS === 'ios' ? hp(2) : hp(1.5),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
  },
  tabBarName: {
    fontSize: wp(3.5),
    paddingTop: hp(1.5),
    marginBottom: Platform.OS === 'ios' ? hp(0.8) : hp(1.5),
    textAlign: 'center',
    alignSelf: 'center',
  },
});
