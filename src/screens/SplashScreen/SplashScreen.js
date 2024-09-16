/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/self-closing-comp */
import {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IMAGES from '../../constants/Images';
import {hp, wp} from '../../constants/Dimensions';
export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    // Simulate loading or authentication delay
    setTimeout(() => {
      navigation.navigate('Introo');
    }, 2000); // Adjust the duration as needed
  }, [navigation]);
  return (
    // <Splash/>

    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground
        source={IMAGES.BLoomyLogo}
        style={{width: wp(20), height: hp(20)}}></ImageBackground>
    </View>
  );
}
