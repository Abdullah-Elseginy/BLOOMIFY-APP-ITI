/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/self-closing-comp */
import {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IMAGES from '../../constants/Images';
import {hp, wp} from '../../constants/Dimensions';
import * as Animatable from 'react-native-animatable';
import Constant from '../../constants/Constant';
export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Introo');
    }, 2000);
  }, [navigation]);
  return (

    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Constant.colors['pale-grayish']
      }}>
      <Animatable.Image animation="flipInY" duration={4000}
        source={IMAGES.splash} resizeMode='contain'
        style={{width: wp(60), height: hp(40)}}></Animatable.Image>
    </View>
  );
}
