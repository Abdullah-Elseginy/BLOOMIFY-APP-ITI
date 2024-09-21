/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from 'firebase/firestore';
import {db} from '../../firebase/firebase';

import Constant from '../../constants/Constant';
import {hp, SCREEN_HEIGHT, SCREEN_WIDTH, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';

// Your data definitions (CarousalData, CategoryData, etc.) remain the same...
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
  },
  {
    id: '2',
    title: 'Birthday',
    img: IMAGES.Birthday,
  },
  {
    id: '3',
    title: 'Graduation',
    img: IMAGES.Graduation,
  },
  {
    id: '4',
    title: 'Mothers day',
    img: IMAGES.Mothers,
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

  // Same useEffect for carousel scrolling...
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

      flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    }
  };
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = async (isRefresh = false) => {
    setLoading(true);
    try {
      const productQuery = query(collection(db, 'products'), limit(10));
      const querySnapShot = await getDocs(productQuery);

      const dataQuery = querySnapShot.docs.map(element => ({
        id: element.id,
        ...element.data(),
      }));

      setLastVisible(querySnapShot.docs[querySnapShot.docs.length - 1]);

      if (isRefresh) {
        setProducts(dataQuery);
      } else {
        setProducts(prev => [...prev, ...dataQuery]);
      }
    } catch (error) {
      console.error('Error fetching products: ', error);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore || !lastVisible) return;

    setLoadingMore(true);
    try {
      const productQuery = query(
        collection(db, 'products'),
        startAfter(lastVisible),
        limit(10),
      );
      const querySnapShot = await getDocs(productQuery);

      const dataQuery = querySnapShot.docs.map(element => ({
        id: element.id,
        ...element.data(),
      }));

      setLastVisible(querySnapShot.docs[querySnapShot.docs.length - 1]);

      setProducts(prev => [...prev, ...dataQuery]);
    } catch (error) {
      console.error('Error fetching more products: ', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Image
        source={{uri: 'https://picsum.photos/200/300'}}
        style={styles.productImage}
      />

      <Text style={styles.productName}>
        {item.name.length > 18 ? item.name.slice(0, 18) + '...' : item.name}
      </Text>
      <Text style={styles.productPrice}>{item.price} EGP</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  // Combine both sections in FlatList
  return (
    <View style={{flex: 1, backgroundColor: Constant.colors.white,padding:wp(2)}}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loadingMore && <ActivityIndicator size="small" color="#AE6B77" />
        }
        ListHeaderComponent={
          <>
            {/* Carousal Section */}
            <View
              style={{
                marginTop: hp(2),
                paddingLeft: wp(2),
              }}>
              <Text
                style={{
                  color: Constant.colors['deep-burgundy'],
                  fontWeight: 'bold',
                  fontSize: wp(4.5),
                }}>
                Our Guidance
              </Text>
            </View>
            <View style={{}}>
              <FlatList
                ref={flatListRef}
                data={CarousalData}
                horizontal
                keyExtractor={item => item.id.toString()}
                pagingEnabled
                renderItem={({item, index}) => (
                  <View
                    style={{
                      borderWidth: wp(0.12),
                      height: hp(30),
                      marginTop: hp(2),
                      marginLeft:
                        index === CarousalData.length - 1 ? wp(2.2) : wp(2.2),
                      width: wp(92.2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight:
                        index === CarousalData.length - 1 ? wp(2.2) : wp(0),
                      padding: hp(2),
                      // backgroundColor: '#00d',
                      borderColor: Constant.colors.gray,
                      paddingBottom: hp(2),
                      borderRadius: wp(2),
                    }}>
                    <Image
                      source={item.image}
                      style={{width: wp(50), height: hp(18)}}
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
            <View
              style={{
                marginTop: hp(2),
                paddingLeft: wp(2),
              }}>
              <Text
                style={{
                  color: Constant.colors['deep-burgundy'],
                  fontWeight: 'bold',
                  fontSize: wp(4.5),
                }}>
                Categories
              </Text>
              <FlatList
                data={CategoryData}
                keyExtractor={item => item.id}
                horizontal
                renderItem={({item}) => (
                  <View style={styles.categoryItem}>
                    <Image
                      source={item.img}
                      style={{width: wp(10), height: hp(8)}}
                    />
                    <Text style={styles.categoryTitle}>{item.title}</Text>
                  </View>
                )}
              />
            </View>
            {/* Best Sellers */}
            <View
              style={{
                marginTop: hp(2),
                paddingLeft: wp(2),
              }}>
              <Text
                style={{
                  color: Constant.colors['deep-burgundy'],
                  fontWeight: 'bold',
                  fontSize: wp(4.5),
                }}>
                Best Seller
              </Text>
              <FlatList
                data={BestSellerData}
                keyExtractor={item => item.id}
                horizontal
                renderItem={({item, index}) => (
                  <View
                    style={{
                      backgroundColor: Constant.colors.white,
                      shadowColor: Constant.colors['gray'],
                      width: wp(75),
                      elevation: 5,
                      marginTop: hp(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight:
                        index === BestSellerData.length - 1 ? wp(4) : wp(2),
                      marginBottom: hp(1),
                      padding: wp(2),
                      borderRadius: wp(2),
                      borderWidth: wp(0.1),
                      borderColor: Constant.colors.gray,
                    }}>
                    <Image
                      source={item.img}
                      style={{width: wp(40), height: hp(22)}}
                    />
                    <Text
                      style={{
                        color: Constant.colors['dark-brownish'],
                        fontWeight: 'bold',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                )}
              />
            </View>
            {/* Recommended */}
            <View
              style={{
                marginTop: hp(2),
                paddingLeft: wp(2),
              }}>
              <Text
                style={{
                  color: Constant.colors['deep-burgundy'],
                  fontWeight: 'bold',
                  fontSize: wp(4.5),
                }}>
                Recommended
              </Text>
              <FlatList
                data={RecommendedData}
                keyExtractor={item => item.id}
                horizontal
                renderItem={({item, index}) => (
                  <View
                    style={{
                      backgroundColor: Constant.colors.white,
                      shadowColor: Constant.colors['gray'],
                      width: wp(75),
                      elevation: 5,
                      marginTop: hp(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight:
                        index === BestSellerData.length - 1 ? wp(4) : wp(2),
                      marginBottom: hp(1),
                      padding: wp(3),
                      borderRadius: wp(2),
                      borderWidth: wp(0.1),
                      borderColor: Constant.colors.gray,
                    }}>
                    <Image
                      source={item.img}
                      style={{width: wp(40), height: hp(20)}}
                    />
                    <Text
                      style={{
                        color: Constant.colors['dark-brownish'],
                        fontWeight: 'bold',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                )}
              />
            </View>

            {/* Additional sections like Best Seller, Recommended, etc., can be added here */}
          </>
        }
      />
    </View>
  );
};

// Updated styles
export const styles = StyleSheet.create({
  container: {
    padding: hp(1),
  },
  row: {
    justifyContent: 'flex-end',
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: wp(2),
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp(0.1),
    borderColor: Constant.colors['dusty-mauve'],
  },
  productImage: {
    width: '100%',
    height: hp(20),
    borderRadius: wp(2),
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    fontWeight: '800',
  },
  addButton: {
    backgroundColor: '#4C1B1B',
    padding: 10,
    borderRadius: wp(2),
    marginTop: 10,
    width: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // carouselItem: {
  //   borderWidth: wp(0.12),
  //   height: hp(30),
  //   marginTop: hp(2),
  //   width: wp(92.2),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: hp(2),
  //   borderColor: Constant.colors.gray,
  //   borderRadius: wp(2),
  // },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: hp(2),
    color: Constant.colors['deep-burgundy'],
  },
  carouselDescription: {
    fontSize: 14,
    marginTop: hp(1),
    textAlign: 'center',
    color: Constant.colors['deep-burgundy'],
  },
  categoryItem: {
    backgroundColor: Constant.colors.white,
    shadowColor: Constant.colors['gray'],
    width: wp(30),
    elevation: 5,
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
    marginBottom: hp(1),
    padding: hp(1),
    height: hp(12),
    borderRadius: wp(2),
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: hp(1),
    color: Constant.colors['deep-burgundy'],
  },
});

export default HomeScreen;
