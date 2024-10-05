/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [userToken, SetUserToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
          SetUserToken(value);
          console.log('usertoken22222', value);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarLabelPosition: 'below-icon',
        tabBarLabel: ({focused}) => {
          return (
            <View>
              <Text
                style={[
                  styles.tabBarName,
                  {
                    color: focused
                      ? colors.colors['deep-burgundy']
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
              <View
                style={{
                  height: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  color={colors.colors['deep-burgundy']}
                  size={wp(5)}
                  name={'home'}
                />
              </View>
            ) : (
              <View
                style={{
                  height: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  color={Constant.colors['dusty-mauve']}
                  size={wp(4.5)}
                  name={'home'}
                />
              </View>
            );
          }
          if (route.name === 'cart') {
            Icon = focused ? (
              <View
                style={{
                  height: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  color={Constant.colors['deep-burgundy']}
                  size={wp(5)}
                  name={'shoppingcart'}
                />
              </View>
            ) : (
              <View
                style={{
                  height: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AntDesign
                  color={Constant.colors['dusty-mauve']}
                  size={wp(4.5)}
                  name={'shoppingcart'}
                />
              </View>
            );
          }
          if (route.name === 'Profile') {
            Icon = focused ? (
              <View
                style={{
                  height: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  color={colors.colors['deep-burgundy']}
                  size={wp(5)}
                  name={'person-circle-outline'}
                />
              </View>
            ) : (
              <View
                style={{
                  height: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons
                  color={colors.colors['dusty-mauve']}
                  size={wp(4.5)}
                  name={'person-circle-outline'}
                />
              </View>
            );
          }
          if (route.name === 'Shop') {
            Icon = focused ? (
              <View
                style={{
                  height: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather
                  color={colors.colors['deep-burgundy']}
                  size={wp(5)}
                  name={'shopping-bag'}
                />
              </View>
            ) : (
              <View
                style={{
                  height: hp(4),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather
                  color={colors.colors['dusty-mauve']}
                  size={wp(4.5)}
                  name={'shopping-bag'}
                />
              </View>
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
    height: Platform.OS === 'ios' ? hp(12.5) : hp(8.5),
    width: wp('100%'),
    backgroundColor: colors.colors['light-pink'],
    paddingTop: Platform.OS === 'ios' ? hp(2) : hp(1.5),
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
  },
  tabBarName: {
    fontSize: wp(3.5),
    paddingTop: hp(0),
    marginBottom: Platform.OS === 'ios' ? hp(0.8) : hp(1.2),
    textAlign: 'center',
    alignSelf: 'center',
  },
});
