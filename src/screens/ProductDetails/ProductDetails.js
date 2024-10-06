import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {db} from '../../firebase/firebase';
import {collection, getDoc, doc, onSnapshot, setDoc} from 'firebase/firestore';
import {styles} from './styles';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {hp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';
import {Rating} from 'react-native-ratings';
import AppHeader from '../../Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, setCartItems} from '../../redux/slices/cartSlice';
import toast from 'react-native-toast-message';
import {getAuth} from 'firebase/auth';

export default function ProductDetails() {
  const {params} = useRoute();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const productTemp = await getDoc(doc(db, 'products', params));
        const productData = {...productTemp.data(), id: productTemp.id};
        const reviewsCollectionRef = collection(
          doc(db, 'products', params),
          'reviews',
        );
        const unsubscribe = onSnapshot(reviewsCollectionRef, snapshot => {
          const reviewsData = snapshot.docs.map(doc => doc.data());
          setReviews(reviewsData);
          setProduct({...productData});
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [params]);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, comment) => acc + comment.rating,
        0,
      );
      const averageRating = totalRating / reviews.length;

      setProduct(prevProduct => ({
        ...prevProduct,
        rating: averageRating,
      }));
    }
  }, [reviews]);

  const addCart = item => {
    dispatch(addToCart(item));
    toast.show({type: 'success', text1: `${item.name} added to cart `});
  };

  const isInCart = cartItems.some(cartItem => cartItem.id === product.id);

  useEffect(() => {
    if (userId) {
      const saveCartToFirebase = async () => {
        try {
          const cartRef = doc(db, 'carts', userId);
          await setDoc(cartRef, {items: cartItems});
        } catch (error) {
          console.error('Error saving cart to Firebase:', error);
        }
      };

      const debounceSave = setTimeout(() => saveCartToFirebase(), 1000);
      return () => clearTimeout(debounceSave);
    }
  }, [cartItems, userId]);

  useEffect(() => {
    if (userId) {
      const loadCartFromFirebase = async () => {
        try {
          const cartRef = doc(db, 'carts', userId);
          const cartDoc = await getDoc(cartRef);
          if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            dispatch(setCartItems(cartData.items || []));
          }
        } catch (error) {
          console.error('Error loading cart from Firebase:', error);
        }
      };

      loadCartFromFirebase();
    }
  }, [dispatch, userId]);

  return (
    <>
      <AppHeader title={product.name} arrowBack={true} />
      <View style={styles.container} key={product.id}>
        {loading || !product.image ? (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#AE6B77" />
          </View>
        ) : (
          <>
            <ScrollView>
              <View style={styles.imgContainer}>
                <Image source={{uri: product.image}} style={styles.img} />
              </View>
              <View style={styles.body}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.boxDetail}>
                  <Text style={styles.boxText}>{product.type}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Rating
                      readonly
                      startingValue={product.rating}
                      imageSize={20}
                      fractions={1}
                    />
                    <Text
                      style={[
                        styles.boxText,
                        {color: Constant.colors['pale-grayish']},
                      ]}>
                      {product.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.boxDetail}>
                  <Text style={styles.boxText}>Color : {product.colour}</Text>
                  <Text style={[styles.boxText, {fontWeight: '700'}]}>
                    {product.price} EGP
                  </Text>
                </View>
                <View style={styles.sections}>
                  <Text style={styles.title}>Occasion</Text>
                  <Text style={styles.boxText}>{product.category}</Text>
                </View>
                <View style={styles.sections}>
                  <Text style={styles.title}>Flower Country</Text>
                  <Text style={styles.boxText}>{product.country}</Text>
                </View>
                <View style={styles.sections}>
                  <Text style={styles.title}>Description</Text>
                  <Text style={[styles.boxText, {lineHeight: 20}]}>
                    {product.description}
                  </Text>
                </View>

                {/* <TouchableOpacity activeOpacity={0.7} style={styles.addButton}>
                                <Text style={styles.addButtonText}>Add to Cart</Text>
                            </TouchableOpacity> */}
                <TouchableOpacity
                  style={[styles.addButton, isInCart && {opacity: 0.5}]}
                  key={product.id}
                  onPress={() => !isInCart && addCart(product)}
                  activeOpacity={isInCart ? 1 : 0.7}>
                  <Text style={styles.addButtonText}>
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.comment}>
                  <Text style={styles.title}>Reviews</Text>
                  {reviews.map((item,index) => (
                    <View key={item.id || index} style={styles.commentContainer}>
                      <Image
                        style={styles.commentImg}
                        source={require('../../assets/images/profile.jpg')}
                      />
                      <View style={styles.commentDetails}>
                        <Text
                          style={[
                            styles.boxText,
                            {fontWeight: '700', fontSize: 16},
                          ]}>
                          {item.userName}
                        </Text>
                        <Rating
                          readonly
                          startingValue={item.rating}
                          imageSize={15}
                          fractions={1}
                        />
                        <Text
                          style={[
                            styles.boxText,
                            {color: Constant.colors['light-brownish-gray']},
                          ]}>
                          {item.comment}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
}
