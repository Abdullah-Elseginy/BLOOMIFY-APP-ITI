/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {collection, doc, getDocs} from 'firebase/firestore';
import {auth, db} from '../../firebase/firebase';
import AppHeader from '../../Components/Header';
import Constant from '../../constants/Constant';
import {hp, wp} from '../../constants/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Orders Component
const Orders = () => {
  const {navigate} = useNavigation();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(doc(db, 'users', userId), 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      const orders = ordersSnapshot.docs.map(doc => doc.data());
      setOrdersData(orders);
    } catch (error) {
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  // console.log('cart' + JSON.stringify(ordersData));
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
          setUserToken(value);
          console.log('usertoken', value);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large"
          color={Constant.colors['deep-burgundy']}
        />
      </View>
    );

  if (error)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.errorText}>{error}</Text>;
      </View>
    );

  return (
    <>
      <AppHeader title={'Orders'} arrowBack={true} />
      <View style={styles.container}>
        {ordersData.length > 0 && userToken !== null ? (
          <FlatList
            data={ordersData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View>
                {/* Order Title */}
                <Text style={styles.orderTitle}>{`Order ${index + 1}`}</Text>
                {/* Cart Items List */}
                <FlatList
                  data={item.cartItems}
                  keyExtractor={(item, itemIndex) => itemIndex.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={() => navigate('review', item.id)}>
                      <Image
                        source={{uri: item?.image}}
                        style={styles.itemImage}
                      />
                      <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item?.name}</Text>
                        <Text style={styles.itemCategory}>
                          {item?.category}
                        </Text>
                        <Text style={styles.itemPrice}>{item?.price} EGP</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.listContent}
                />
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.orderSeparator} />
            )}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Orders Found</Text>
            <Text style={styles.emptySubText}>
              Add items to your cart to view them here.
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  orderTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: Constant.colors['deep-burgundy'],
    marginBottom: hp(2),
    backgroundColor: Constant.colors['light-pink'],
    padding: wp(2),
    borderRadius: wp(2),
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    backgroundColor: Constant.colors.white,
    borderRadius: wp(2),
    shadowColor: '#000',
    elevation: 3,
    marginBottom: hp(1),
  },
  itemImage: {
    width: wp(20),
    height: hp(8),
    borderRadius: wp(2),
    marginRight: wp(2),
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: Constant.colors['deep-burgundy'],
  },
  itemCategory: {
    fontSize: wp(3.5),
    color: Constant.colors['light-pink'],
  },
  itemPrice: {
    fontSize: wp(3),
    fontWeight: '600',
    color: '#08720b',
  },
  orderSeparator: {
    height: hp(2),
  },

  errorText: {
    color: '#4C1B1B',
    fontSize: wp(3),
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: Constant.colors['dark-brownish'],
  },
  emptySubText: {
    fontSize: wp(3),
    color: Constant.colors['deep-burgundy'],
    marginTop: hp(1),
  },
});

export default Orders;
