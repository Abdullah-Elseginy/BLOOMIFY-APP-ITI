import React, { useEffect } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, setCartItems } from '../../redux/slices/cartSlice';
import AppHeader from '../../Components/Header';
import styles from './styles'; 
import CartSummary from './cartSummary';
import { db } from '../../firebase/firebase'; 
import { getAuth } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  
  useEffect(() => {
    if (userId) {
      const saveCartToFirebase = async () => {
        try {
          const cartRef = doc(db, 'carts', userId);
          await setDoc(cartRef, { items: cartItems });
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

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: {item.price} EGP</Text>
        <Text style={styles.itemCategory}>Category: {item.category}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.button}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.button}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <Button title="Remove" onPress={() => handleRemove(item.id)} color="#4C1B1B" />
      </View>
    </View>
  );

  return (
    <>
      <AppHeader title={'Your cart '} />
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => (
          <CartSummary cartItems={cartItems} />
        )}
      />
    </>
  );
};

export default CartScreen;
