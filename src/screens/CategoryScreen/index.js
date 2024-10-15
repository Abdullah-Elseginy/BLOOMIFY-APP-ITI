import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {db, auth} from '../../firebase/firebase'; // Import db correctly
import {collection, query, where, getDocs, limit} from 'firebase/firestore';
import AppHeader from '../../Components/Header';
import {hp, wp} from '../../constants/Dimensions';
import Constant from '../../constants/Constant';
import {addToCart, setCartItems} from '../../redux/slices/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import toast from 'react-native-toast-message';

const CategoryScreen = ({route}) => {
  const {category} = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  const {navigate} = useNavigation();

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const addCart = item => {
    if (user) {
      dispatch(addToCart(item));
      toast.show({type: 'success', text1: `${item.name} added to cart`});
    } else {
      navigate('Login');
    }
  };

  // Fetch products by category
  const fetchProducts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const productQuery = query(
        collection(db, 'products'),
        where('category', '==', category),
        limit(10), // Limit to 10 products
      );
      const querySnapShot = await getDocs(productQuery);
      const productsList = querySnapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (isRefresh) {
        setProducts(productsList);
      } else {
        setProducts(prev => [...prev, ...productsList]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const onRefresh = () => {
    fetchProducts(true);
  };

  const loadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      fetchProducts(); // Fetch more products
      setLoadingMore(false);
    }
  };

  // Render each product item
  const renderItem = ({item}) => {
    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.productContainer}
        activeOpacity={0.7}
        onPress={() => navigate('productDetails', item.id)}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productName}>
          {item.name.length > 18 ? item.name.slice(0, 18) + '...' : item.name}
        </Text>
        <Text style={styles.productPrice}>{item.price} EGP</Text>
        <TouchableOpacity
          style={[styles.addButton, isInCart && {opacity: 0.5}]}
          onPress={() => !isInCart && addCart(item)}
          activeOpacity={isInCart ? 1 : 0.7}>
          <Text style={styles.addButtonText}>
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <AppHeader title={category} arrowBack={true} />
      <View style={styles.container}>
        {loading && products.length === 0 ? (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#AE6B77" />
          </View>
        ) : (
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            onEndReached={loadMore} // Load more when the end is reached
            onEndReachedThreshold={0.5} // Trigger loadMore at 50% of the screen height before reaching the end
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListFooterComponent={
              loadingMore && <ActivityIndicator size="small" color="#AE6B77" />
            }
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(1),
    backgroundColor: '#fff',
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
    borderColor: Constant.colors['light-pink'],
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
    color: Constant.colors['deep-burgundy'],
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
});

export default CategoryScreen;
