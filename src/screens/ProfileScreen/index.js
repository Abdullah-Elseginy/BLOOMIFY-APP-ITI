import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs,setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { styles } from './styles'
//import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../redux/cartSlice';
// import toast from 'react-native-toast-message';
//import { getAuth } from '../../firebase/firebase';
//import { setCartItems } from '../../redux/cartSlice';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapShot = await getDocs(collection(db, 'products'));
        const dataQuery = querySnapShot.docs.map((element) => ({
          id: element.id,
          ...element.data(),
        }));
        setProducts(dataQuery);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add to Cart Function
  // const addCart = (item) => {
  //   dispatch(addToCart(item));
  //   toast.show({ type: 'success', text1: ${item.name} added to cart });
  // };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name.length > 18 ? item.name.slice(0, 18) + '...' : item.name}</Text>
      <Text style={styles.productPrice}>{item.price} EGP</Text>
      {/* <TouchableOpacity style={styles.addButton} onPress={() => addCart(item)}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#AE6B77" />
      ) : (
        <FlatList
          // data={filteredProduct}
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2} 
          columnWrapperStyle={styles.row} 
        />
      )}
    </View>
  );
}

