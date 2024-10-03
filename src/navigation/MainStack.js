/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './BottomNavigation'; // Import your Bottom Tabs navigator
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import SignIn from '../screens/SignIn/SignIn';
import Register from '../screens/Signup/SignUp';
import Introo from '../screens/Introo/Introo';
import ProductDetails from '../screens/ProductDetails/ProductDetails';
import CartScreen from '../screens/CartScreen';
import CheckOut from '../screens/CheckOut';
import Orders from '../screens/Orders';
import Constant from '../constants/Constant';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        setUserToken(value); // Set userToken state
      } catch (e) {
        console.error('Failed to load token:', e);
      }
      setLoading(false); // Set loading to false once token is checked
    };

    checkUserToken();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Constant.colors['deep-burgundy'],
        }}>
        <ActivityIndicator size="large" color={Constant.colors['light-pink']} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={userToken ? 'BottomTabs' : 'Splash'} // Dynamically set initial route based on userToken
      >
        {/* Main App Flow */}
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={SignIn} />
        <Stack.Screen name="Signup" component={Register} />
        <Stack.Screen name="Introo" component={Introo} />
        <Stack.Screen name="productDetails" component={ProductDetails} />
        <Stack.Screen name="cartScreen" component={CartScreen} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
        <Stack.Screen name="Orders" component={Orders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
