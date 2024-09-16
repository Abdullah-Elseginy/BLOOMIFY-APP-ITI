/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';

import constant from '../../constants/Constant';
import {hp, SCREEN_WIDTH, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';

export default function Introo({navigation}) {
  const pages = [
    {
      title: 'Welcome to Bloomify',
      description:
        'Explore our elegant selection of bouquets, crafted to make every moment special.',
      image: IMAGES.Intro1,
    },
    {
      title: 'Browse Our Collection',
      description:
        'Discover handpicked floral arrangements tailored to every taste and occasion.',
      image: IMAGES.Intro2,
    },
    {
      title: 'Gift Happiness',
      description:
        'Express your emotions through flowers and bring joy to your loved ones.',
      image: IMAGES.Intro3,
    },
    {
      title: 'Celebrate Every Moment',
      description:
        'Celebrate life’s special moments with our exquisite floral gifts, made to impress.',
      image: IMAGES.Intro4,
    },
  ];

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{flex: 1, backgroundColor: constant.colors['pale-grayish']}}>
      {pages.map((page, index) => (
        <View
          key={index}
          style={{
            width: SCREEN_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
            padding: hp(5),
          }}>
          <Image
            source={page.image}
            style={{width: wp(80), height: hp(40), marginBottom: hp(5)}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: wp(6),
              fontWeight: 'bold',
              color: constant.colors['dark-brownish'],
            }}>
            {page.title}
          </Text>
          <Text
            style={{
              fontSize: wp(4),
              color: constant.colors['dark-brownish'],
              textAlign: 'center',
              marginTop: hp(2),
            }}>
            {page.description}
          </Text>

          {index === pages.length - 1 && (
            <TouchableOpacity
              style={[constant.mainButton, {marginTop: hp(5), width: '54%'}]}
              onPress={() => navigation.navigate('Login')}>
              <Text style={constant.mainButtonText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
