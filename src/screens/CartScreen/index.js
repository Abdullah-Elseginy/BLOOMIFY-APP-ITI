import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCartItems,
} from '../../redux/slices/cartSlice';
import AppHeader from '../../Components/Header';
import styles from './styles';
import CartSummary from './cartSummary';
import {db, auth} from '../../firebase/firebase';
import {getAuth} from 'firebase/auth';
import {setDoc, doc, getDoc} from 'firebase/firestore';
import IMAGES from '../../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {wp} from '../../constants/Dimensions';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);
  const navigation = useNavigation();
  // const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const [userToken, SetUserToken] = useState(null);
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

      const delulu = setTimeout(() => saveCartToFirebase(), 1000);
      return () => clearTimeout(delulu);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
          SetUserToken(value);
          console.log('usertoken22222', value);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  const handleRemove = id => {
    dispatch(removeFromCart({id}));
  };

  const handleIncrement = id => {
    dispatch(incrementQuantity({id}));
  };

  const handleDecrement = id => {
    dispatch(decrementQuantity({id}));
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: {item.price} EGP</Text>
        <Text style={styles.itemCategory}>Category: {item.category}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleDecrement(item.id)}
            style={styles.button}>
            <Text style={styles.Plusminus}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleIncrement(item.id)}
            style={styles.button}>
            <Text style={styles.Plusminus}>+</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Remove"
          onPress={() => handleRemove(item.id)}
          color="#4C1B1B"
        />
      </View>
    </View>
  );

  return (
    <>
      <AppHeader title={'Your cart '} />
      {userToken === null ? (
        <View style={styles.center}>
          <Text style={styles.Text}>Please Login to view your cart</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('Login');
            }}
            style={styles.btn}>
            <Text style={styles.textbtn}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {cartItems?.length > 0 ? (
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.listContainer}
              ListFooterComponent={() => <CartSummary cartItems={cartItems} />}
            />
          ) : (
            <View style={styles.center}>
              <Image source={IMAGES.CartEmpty} style={styles.cartemptyimage} />
              <Text style={styles.Text}>Cart Empty</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default CartScreen;
