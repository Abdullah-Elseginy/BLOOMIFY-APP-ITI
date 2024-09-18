/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import Constant from '../../constants/Constant';
import {hp, SCREEN_WIDTH, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';
const CarousalData = [
  {
    image: IMAGES.Intro1,
    title: 'Discover Our Beautiful Flowers',
    description:
      'Bloomify offers a wide range of beautiful flowers in various colors and shapes.',
  },
  {
    image: IMAGES.Intro2,
    title: 'Shop our Flowes to be active',
    description: 'You can get more than Bouquet to hav an offer for your wife.',
  },
  {
    image: IMAGES.Intro3,
    title: 'You must be tuned',
    description:
      'You have wide range of all bouquet and flowers you want in the worled.',
  },
  {
    image: IMAGES.Intro1,
    title: 'Have a nice graduation party',
    description:
      'with Bloomify you can gradute with all degrees and make your graduation party well .',
  },
];
const HomeScreen = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrollingForward, setIsScrollingForward] = useState(true); // Track scroll direction

  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollToNextItem();
    }, 4000); // Every 2 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [currentIndex, isScrollingForward]);

  const scrollToNextItem = () => {
    if (flatListRef.current) {
      let nextIndex;

      if (isScrollingForward) {
        nextIndex = currentIndex + 1;
        if (nextIndex >= CarousalData.length) {
          nextIndex = currentIndex - 1;
          setIsScrollingForward(false);
        }
      } else {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = currentIndex + 1;
          setIsScrollingForward(true);
        }
      }

      flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Constant.colors['white'],
      }}>
      <View
        style={{
          height: hp(30),
          backgroundColor: Constant.colors['light-pink'],
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: wp(10),
        }}>
        <Text
          style={{
            color: Constant.colors['deep-burgundy'],
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: wp(6),
          }}>
          Welcome To Bloomify Egypt
        </Text>
        <Image
          style={{
            width: wp(40),
            height: hp(13),
            marginTop: hp(2),
          }}
          source={IMAGES.BLoomyLogo}
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={CarousalData}
        horizontal
        pagingEnabled
        renderItem={({item}) => (
          <View
            style={{
              // backgroundColor: Constant.colors['light-pink'],
              borderWidth: wp(0.12),
              height: hp(30),
              marginTop: hp(2),
              marginLeft: wp(0.4),
              width: wp(98),
              justifyContent: 'center',
              alignItems: 'center',
              padding: hp(2),
              borderColor: Constant.colors['deep-burgundy'],
            }}>
            <Image
              source={item.image}
              style={{width: wp(50), height: hp(20)}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: hp(2),
                color: Constant.colors['deep-burgundy'],
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: hp(1),
                textAlign: 'center',
                color: Constant.colors['deep-burgundy'],
              }}>
              {item.description}
            </Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={info => {
          // Fallback if the index is not rendered
          flatListRef.current.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }}
      />
    </View>
  );
};

export default HomeScreen;
