import React, { useEffect } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../redux/slices/cartSlice';
import AppHeader from '../../Components/Header';
import styles from './styles'; 
import CartSummary from './cartSummary';  


const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);


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
            <Text style={styles.Plusminus}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.button}>
            <Text style={styles.Plusminus}>+</Text>
          </TouchableOpacity>
        </View>
        <Button title="Remove" onPress={() => handleRemove(item.id)} color="#4C1B1B" />
      </View>
    </View>
  );

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  


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