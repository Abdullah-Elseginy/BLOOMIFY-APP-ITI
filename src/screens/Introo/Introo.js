/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import constant from '../../constants/Constant';
import {hp, SCREEN_WIDTH, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';

export default function Introo({navigation}) {
  const [page, setPage] = useState(0);

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

  const handleNextPage = () => {
    if (page < pages.length - 1) {
      setPage(page + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: constant.colors['pale-grayish']}}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{flex: 1}}>
        <View
          style={{
            width: SCREEN_WIDTH,
            alignItems: 'center',
            padding: wp(2),
          }}>
          {/* Skip Button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: hp(8),
              padding: wp(4),
              alignSelf: 'flex-end',
            }}
            onPress={() => navigation.replace('Login')}>
            <Text
              style={{
                color: constant.colors['deep-burgundy'],
                fontSize: wp(4),
                fontWeight: '500',
              }}>
              Skip
            </Text>
          </TouchableOpacity>

          {/* Image */}
          <Image
            source={pages[page].image}
            style={{width: wp(70), height: hp(35), marginBottom: hp(1)}}
            resizeMode="contain"
          />

          {/* Title */}
          <Text
            style={{
              fontSize: wp(6),
              fontWeight: 'bold',
              color: constant.colors['deep-burgundy'],
            }}>
            {pages[page].title}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: wp(4),
              color: constant.colors['dark-brownish'],
              textAlign: 'center',
              marginTop: hp(2),
              paddingHorizontal: wp(10),
            }}>
            {pages[page].description}
          </Text>

          {/* Page Indicator */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp(4),
            }}>
            {pages.map((_, index) => (
              <View
                key={index}
                style={{
                  width: wp(5),
                  height: wp(5),
                  borderRadius: wp(2.5),
                  backgroundColor:
                    index === page ? constant.colors['deep-burgundy'] : '#ddd',
                  marginHorizontal: wp(1),
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View
        style={{
          position: 'absolute',
          bottom: hp(4),
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: wp(4),
        }}>
        {/* Previous Button */}
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={page === 0}
          style={{
            paddingVertical: hp(1),
            width: wp(25),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              page === 0 ? '#aaa' : constant.colors['dark-brownish'],
            borderRadius: wp(2),
          }}>
          <Text
            style={{
              fontSize: wp(4),
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Previous
          </Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity
          onPress={handleNextPage}
          style={{
            paddingVertical: hp(1),
            width: wp(25),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: constant.colors['deep-burgundy'],
            borderRadius: wp(2),
          }}>
          <Text
            style={{
              fontSize: wp(4),
              color: '#fff',
              fontWeight: 'bold',
            }}>
            {page === pages.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
