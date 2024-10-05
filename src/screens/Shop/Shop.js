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
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import {db, auth} from '../../firebase/firebase';
import {styles} from './styles';
import AppHeader from '../../Components/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, setCartItems} from '../../redux/slices/cartSlice';
import toast from 'react-native-toast-message';
import SearchBar from '../../Components/SearchBar';
import {wp} from '../../constants/Dimensions';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const user = auth.currentUser;
  const userId = user ? user.uid : null;

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
        setFilteredProducts(dataQuery); // Reset filteredProducts as well
      } else {
        setProducts(prev => [...prev, ...dataQuery]);
        setFilteredProducts(prev => [...prev, ...dataQuery]); // For filtered products
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
      setFilteredProducts(prev => [...prev, ...dataQuery]); // For filtered products
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

  const addCart = item => {
    if (user) {
      dispatch(addToCart(item));
      toast.show({type: 'success', text1: `${item.name} added to cart`}); // Fixed here
    } else {
      navigate('Login');
    }
  };

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

      const timeoutId = setTimeout(saveCartToFirebase, 1000);
      return () => clearTimeout(timeoutId);
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

  const renderItem = ({item}) => {
    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.productContainer}
        activeOpacity={0.7}
        onPress={() => navigate('productDetails', item.id)}>
        {/* Conditionally render the Image component only if the image URL is valid */}
        {item.image && (
          <Image source={{uri: item.image}} style={styles.productImage} />
        )}
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
      <AppHeader title={'Shop Now '} />
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: wp(1),
          }}>
          <SearchBar
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </View>
        {loading ? (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#AE6B77" />
            <Text>Loading products...</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <Text style={styles.noProductsText}>No products found.</Text>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
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
          />
        )}
      </View>
    </>
  );
}
