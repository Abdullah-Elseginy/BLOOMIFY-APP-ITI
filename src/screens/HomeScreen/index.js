/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { wp } from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';
import { styles } from './styles';
import AppHeader from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // إضافة

const CarousalData = [
  {
    id: '1',
    image: IMAGES.Intro4,
    title: 'Discover Our Beautiful Flowers',
    description:
      'Bloomify offers a wide range of beautiful flowers in various colors and shapes.',
  },
  {
    id: '2',
    image: IMAGES.Intro2,
    title: 'Shop our Flowes to be active',
    description: 'You can get more than Bouquet to hav an offer for your wife.',
  },
  {
    id: '3',
    image: IMAGES.Intro3,
    title: 'You must be tuned',
    description:
      'You have wide range of all bouquet and flowers you want in the worled.',
  },
  {
    id: '4',
    image: IMAGES.Intro1,
    title: 'Have a nice graduation party',
    description:
      'with Bloomify you can gradute with all degrees and make your graduation party well .',
  },
];
const CategoryData = [
  {
    id: '1',
    title: 'Wedding',
    img: IMAGES.Wedding,
    category: 'Bridal Bouquet',
  },
  {
    id: '2',
    title: 'Birthday',
    img: IMAGES.Birthday,
    category: 'birthday',
  },
  {
    id: '3',
    title: 'Graduation',
    img: IMAGES.Graduation,
    category: 'Graduation Day',
  },
  {
    id: '4',
    title: 'Mothers day',
    img: IMAGES.Mothers,
    category: "Mother's Day",
  },
];
const BestSellerData = [
  {
    id: '1',
    title: 'Floresta',
    img: IMAGES.flower1,
  },
  {
    id: '2',
    title: 'Bink love flower',
    img: IMAGES.flower2,
  },
  {
    id: '3',
    title: 'ministy flower',
    img: IMAGES.flower3,
  },
  {
    id: '4',
    title: 'Good flower life',
    img: IMAGES.flower4,
  },
  {
    id: '5',
    title: 'Life flowers',
    img: IMAGES.flower5,
  },
];
const RecommendedData = [
  {
    id: '1',
    title: 'Make flower pretty',
    img: IMAGES.flower5,
  },
  {
    id: '2',
    title: 'Bink love flower',
    img: IMAGES.flower3,
  },
  {
    id: '3',
    title: 'ministy flower',
    img: IMAGES.flower2,
  },
  {
    id: '4',
    title: 'Good flower life',
    img: IMAGES.flower1,
  },
  {
    id: '5',
    title: 'Life flowers',
    img: IMAGES.flower4,
  },
];

const HomeScreen = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrollingForward, setIsScrollingForward] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollToNextItem();
    }, 4000);

    return () => clearInterval(intervalId);
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

      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
          setStoredData(value);
          console.log('usertoken', value);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);


  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryScreen', { category });
  };

  return (
    <>
      <AppHeader title={'Welcome To Bloomify '} />
      <View style={styles.container}>
        <ScrollView>
          {/* Carousal Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Guidance</Text>
          </View>
          <View>
            <FlatList
              ref={flatListRef}
              data={CarousalData}
              horizontal
              keyExtractor={item => item.id.toString()}
              pagingEnabled
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.carouselItem,
                    {
                      marginRight:
                        index === CarousalData.length - 1 ? wp(2.2) : wp(0),
                      marginLeft:
                        index === CarousalData.length - 1 ? wp(2.2) : wp(2.2),
                    },
                  ]}>
                  <Image
                    source={item.image}
                    style={styles.carouselImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                  <Text style={styles.carouselDescription}>
                    {item.description}
                  </Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Categories Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <FlatList
              data={CategoryData}
              keyExtractor={item => item.id}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(item.category)}
                >
                  <Image source={item.img} style={styles.categoryImage} />
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Best Sellers */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Seller</Text>
            <FlatList
              data={BestSellerData}
              keyExtractor={item => item.id}
              horizontal
              renderItem={({ item, index }) => (
                <View style={styles.bestSellerItem}>
                  <Image source={item.img} style={styles.bestSellerImage} />
                  <Text style={styles.bestSellerTitle}>{item.title}</Text>
                </View>
              )}
            />
          </View>

          {/* Recommended */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <FlatList
              data={RecommendedData}
              keyExtractor={item => item.id}
              horizontal
              renderItem={({ item, index }) => (
                <View style={styles.recommendedItem}>
                  <Image source={item.img} style={styles.recommendedImage} />
                  <Text style={styles.recommendedTitle}>{item.title}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;