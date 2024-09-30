import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './cartSummaryStyles';

const CartSummary = ({cartItems}) => {
  const navigation = useNavigation();

  const cartItemTotal = cartItems
    .map(item => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map(item => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.heading}>Order Summary</Text>

      <View style={styles.summaryDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Price ({cartItemTotal} items)</Text>
          <Text style={styles.detailValue}>{cartTotal} EGP</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Delivery Charges</Text>
          <Text style={styles.detailValue}>Free</Text>
        </View>

        <View style={[styles.detailRow, styles.totalRow]}>
          <Text style={styles.totalText}>Total Amount</Text>
          <Text style={styles.totalText}>{cartTotal} EGP</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          cartItems.length > 0 ? styles.activeButton : styles.disabledButton,
        ]}
        onPress={() => navigation.navigate('CheckOut')}
        disabled={cartItems.length === 0}>
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartSummary;
