import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomNavigation';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import SignIn from '../screens/SignIn/SignIn';
import Register from '../screens/Signup/SignUp';
import Introo from '../screens/Introo/Introo';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'BottomTabs'}>
        <Stack.Screen name={'BottomTabs'} component={BottomTabNavigator} />
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'Login'} component={SignIn} />
        <Stack.Screen name={'Signup'} component={Register} />
        <Stack.Screen name={'Introo'} component={Introo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
