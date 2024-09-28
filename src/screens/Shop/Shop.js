import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from 'firebase/firestore';
import {db} from '../../firebase/firebase';
import {styles} from './styles';
import AppHeader from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';

export default function Shop() {
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

  const {navigate} = useNavigation();

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.productContainer} activeOpacity={0.7} onPress={()=>navigate('productDetails',item.id)}>
          <Image source={{uri: item.image}} style={styles.productImage} />
          <Text style={styles.productName}>
            {item.name.length > 18 ? item.name.slice(0, 18) + '...' : item.name}
          </Text>
          <Text style={styles.productPrice}>{item.price} EGP</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
      <AppHeader title={'Shop Now '} />
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
}

//import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../redux/cartSlice';
// import toast from 'react-native-toast-message';
//import { getAuth } from '../../firebase/firebase';
//import { setCartItems } from '../../redux/cartSlice';
{
  /* <TouchableOpacity style={styles.addButton} onPress={() => addCart(item)}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity> */
}

// Add to Cart Function
// const addCart = (item) => {
//   dispatch(addToCart(item));
//   toast.show({ type: 'success', text1: ${item.name} added to cart });
// };
//const [filteredProduct, setFilteredProduct] = useState([]);

// const dispatch = useDispatch();
//const cartItems = useSelector((state) => state.cart);

// Get data from Firebase
// useEffect(() => {
//   const fetchData = async () => {
//     setLoading(true);
//     const querySnapShot = await getDocs(collection(db, 'products'));
//     const dataQuery = querySnapShot.docs.map((element) => ({
//       id: element.id,
//       ...element.data(),
//     }));
//     setLoading(false);
//     setProducts(dataQuery);
//     // setFilteredProduct(dataQuery);
//   };
//   fetchData();
// }, []);
