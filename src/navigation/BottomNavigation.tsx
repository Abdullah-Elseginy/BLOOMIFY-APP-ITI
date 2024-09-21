/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, Text, View} from 'react-native';
import colors from '../constants/Constant';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import Profile from '../screens/ProfileScreen';
import {hp, wp} from '../constants/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Constant from '../constants/Constant';
import Shop from '../screens/Shop/Shop';
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
                    color: focused
                      ? colors.colors['light-pink']
                      : colors.colors['dusty-mauve'],
                    fontWeight: focused ? 'bold' : '400',
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
              <AntDesign
                color={colors.colors['light-pink']}
                size={wp(5)}
                name={'home'}
              />
            ) : (
              <AntDesign
                color={Constant.colors['dusty-mauve']}
                size={wp(4.5)}
                name={'home'}
              />
            );
          }
          if (route.name === 'cart') {
            Icon = focused ? (
              <AntDesign
                color={Constant.colors['light-pink']}
                size={wp(5)}
                name={'shoppingcart'}
              />
            ) : (
              <AntDesign
                color={Constant.colors['dusty-mauve']}
                size={wp(4.5)}
                name={'shoppingcart'}
              />
            );
          }
          if (route.name === 'Profile') {
            Icon = focused ? (
              <Ionicons
                color={colors.colors['light-pink']}
                size={wp(5)}
                name={'person-circle-outline'}
              />
            ) : (
              <Ionicons
                color={colors.colors['dusty-mauve']}
                size={wp(4.5)}
                name={'person-circle-outline'}
              />
            );
          }
          if (route.name === 'Shop') {
            Icon = focused ? (
              <Feather
                color={colors.colors['light-pink']}
                size={wp(5)}
                name={'shopping-bag'}
              />
            ) : (
              <Feather
                color={colors.colors['dusty-mauve']}
                size={wp(4.5)}
                name={'shopping-bag'}
              />
            );
          }
          return Icon;
        },
        headerShown: false,
        tabBarStyle: [styles.tapStyles],
      })}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen name={'Shop'} component={Shop} />
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
    backgroundColor: colors.colors['deep-burgundy'],
    borderTopWidth: wp(0.2),
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
