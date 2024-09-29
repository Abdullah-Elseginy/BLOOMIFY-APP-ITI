/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import constant from '../../constants/Constant';
import {hp, SCREEN_WIDTH, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';
import * as Animatable from 'react-native-animatable';

export default function Introo({navigation}) {
  const [page, setPage] = useState(0);
  const [pressed, setPressed] = useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      if (page < pages.length - 1) {
        setPage(page + 1);
      } else {
        pressed ? navigation.replace('Login') : null
      }
    }, 2000);
  });

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{flex: 1, backgroundColor: constant.colors['pale-grayish']}}>
      <View
        style={{
          width: SCREEN_WIDTH,
          alignItems: 'center',
          padding: hp(2),
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',

            alignItems: 'center',
            marginBottom: hp(6),
            padding: hp(2),
            alignSelf: 'flex-end',
          }}
          onPress={() => {
            setPressed(true)
            navigation.replace('Login');
            
          }}>
          <Text
            style={{
              color: constant.colors['deep-burgundy'],
              fontSize: 20,
              marginRight: hp(1),
            }}>
            Skip
          </Text>
          <Image
            source={require('../../assets/images/skip.png')}
            style={{width: wp(5), height: hp(5)}}
          />
        </TouchableOpacity>

        <Image
          source={pages[page].image}
          style={{width: wp(80), height: hp(40), marginBottom: hp(5)}}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: wp(6),
            fontWeight: 'bold',
            color: constant.colors['dark-brownish'],
          }}>
          {pages[page].title}
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

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: wp(2),
              height: hp(1),
              backgroundColor: constant.colors['deep-burgundy'],
              marginRight: wp(2),
              borderRadius: hp(1),
            }}
          />
          {page >= 1 ? (
            <View
              style={{
                width: wp(2),
                height: hp(1),
                backgroundColor: constant.colors['deep-burgundy'],
                marginRight: wp(2),
                borderRadius: hp(1),
              }}
            />
          ) : (
            <View
              style={{
                width: wp(2),
                height: hp(1),
                backgroundColor: '#ddd',
                marginRight: wp(2),
                borderRadius: hp(1),
              }}
            />
          )}
          {page >= 2 ? (
            <View
              style={{
                width: wp(2),
                height: hp(1),
                backgroundColor: constant.colors['deep-burgundy'],
                marginRight: wp(2),
                borderRadius: hp(1),
              }}
            />
          ) : (
            <View
              style={{
                width: wp(2),
                height: hp(1),
                backgroundColor: '#ddd',
                marginRight: wp(2),
                borderRadius: hp(1),
              }}
            />
          )}
          {page == 3 ? (
            <View
              style={{
                width: wp(2),
                height: hp(1),
                backgroundColor: constant.colors['deep-burgundy'],
                marginRight: wp(2),
                borderRadius: hp(1),
              }}
            />
          ) : (
            <View
              style={{
                width: wp(2),
                height: hp(1),
                backgroundColor: '#ddd',
                marginRight: wp(2),
                borderRadius: hp(1),
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
