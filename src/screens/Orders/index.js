import {View, Text} from 'react-native';
import React from 'react';
import AppHeader from '../../Components/Header';

const Orders = () => {
  return (
    <View>
      <AppHeader title={'Orders'} arrowBack={true} />
      <Text style={{color: '#000'}}>Orders</Text>
    </View>
  );
};

export default Orders;
