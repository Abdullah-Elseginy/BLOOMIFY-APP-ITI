/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
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
import About from '../screens/AboutUs/aboutUs';
import IMAGES from '../constants/Images';
import {hp, wp} from '../constants/Dimensions';
import ContactUs from '../screens/ContactUs/ContactUs';
import Review from '../screens/Review/Review';
import Privacy from '../screens/Privacy/Privacy';
import CategoryScreen from '../screens/CategoryScreen/index';


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
      setTimeout(() => {
        setLoading(false); // Set loading to false once token is checked
      }, 2000);
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
          backgroundColor: Constant.colors['light-pink'],
        }}>
        <Image
          source={IMAGES.BLoomyLogo}
          style={{
            width: wp(30),
            height: hp(15),
          }}
        />
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
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="contactUs" component={ContactUs} />
        <Stack.Screen name="review" component={Review} />
        <Stack.Screen name="PrivacyPolicy" component={Privacy} />
        <Stack.Screen name={'CategoryScreen'} component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
