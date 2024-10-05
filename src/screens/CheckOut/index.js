/* eslint-disable curly */
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import AppHeader from '../../Components/Header';
import {Image} from 'react-native-animatable';
import IMAGES from '../../constants/Images';
import {TextInput} from 'react-native-gesture-handler';
import Constant from '../../constants/Constant';
import {hp, wp} from '../../constants/Dimensions';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import {doc, collection, addDoc, setDoc} from 'firebase/firestore';
import {db} from '../../firebase/firebase';
import {useSelector, useDispatch} from 'react-redux';
import {clearCart} from '../../redux/slices/cartSlice';

const CheckOut = () => {
  const renderItem = ({item, index}) => (
    <>
      <View style={styles.row}>
        <Image
          source={{uri: item.image}}
          style={{
            width: wp(20),
            height: hp(10),
            borderRadius: wp(2),
          }}
        />
        <View style={styles.marginr}>
          <Text style={styles.textnotselected}>{item.name}</Text>
          <Text style={styles.text}>{item.country}</Text>
          <Text style={styles.text}>{item.price}</Text>
          <Text style={styles.text}>amount {item.quantity}</Text>
        </View>
        <View style={styles.Line} />
      </View>
      {index == cartItems.length - 1 ? '' : <View style={styles.Line} />}
    </>
  );
  const [selectedOption, setSelectedOption] = useState('online');
  const [successfulPayment, setSuccessfulPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for input values and errors
  const [inputValues, setInputValues] = useState({
    address: '',
    cardHolderName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  // Generic handler for updating input values
  const handleInputChange = (title, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [title]: value,
    }));

    // Clear the error for the current input when user types
    setErrors(prevErrors => ({
      ...prevErrors,
      [title]: '',
    }));
  };

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const cartTotal = cartItems
    .map(item => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const newErrors = {};
  const validateInputs = () => {
    if (!inputValues.address) newErrors.address = 'Address is required';
    if (!inputValues.cardHolderName)
      newErrors.cardHolderName = 'Card holder name is required';
    if (!inputValues.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
      if (!/^\d{14}$/.test(inputValues.cvv))
        newErrors.cardNumber = 'card number must be 14 digits';
    }

    if (selectedOption === 'online') {
      if (!inputValues.expDate) newErrors.expDate = 'EXP. is required';
      if (!/^\d{3}$/.test(inputValues.cvv))
        newErrors.cvv = 'CVV must be 3 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateIaddress = () => {
    if (!inputValues.address) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveOrderToFirebase = async () => {
    if (userId && Array.isArray(cartItems) && cartItems.length > 0) {
      try {
        const userRef = doc(db, 'users', userId);
        const ordersRef = collection(userRef, 'orders');

        await addDoc(ordersRef, {
          cartItems: cartItems,
          totalPrice: cartTotal,
          orderDate: new Date(),
        });
        console.log('Order saved successfully');
      } catch (error) {
        console.error('Error saving order to Firebase:', error);
      }
    }
  };

  const clearCartInFirebase = async () => {
    if (userId) {
      try {
        const cartRef = doc(db, 'carts', userId);
        await setDoc(cartRef, {items: []});
      } catch (error) {
        console.error('Error clearing cart in Firebase:', error);
      }
    }
  };

  const payNow = async () => {
    if (!validateInputs()) return; // Validate inputs before proceeding
    setLoading(true);
    await saveOrderToFirebase();
    setTimeout(async () => {
      setSuccessfulPayment(true);
      setLoading(false);
      dispatch(clearCart());
      await clearCartInFirebase();
      setTimeout(() => {
        navigation.replace('BottomTabs');
      }, 2000);
    }, 2000);
  };

  const cashOnDelivery = async () => {
    if (!validateIaddress()) return; // Validate inputs before proceeding
    setLoading(true);
    await saveOrderToFirebase();
    setTimeout(async () => {
      setLoading(false);
      dispatch(clearCart());
      await clearCartInFirebase();
      navigation.replace('BottomTabs');
    }, 2000);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AppHeader title={'Payment Method'} arrowBack={true} />
      {successfulPayment ? (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: hp(50),
            }}>
            <Image
              animation="fadeIn"
              source={IMAGES.Success}
              style={{
                width: wp(31.5),
                height: hp(15),
              }}
            />
            <Text animation="fadeIn" style={styles.successMsg}>
              Payment Successful
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Image source={IMAGES.Paypal} style={styles.img} />
            <View style={styles.Line} />
            <View style={styles.row}>
              <Image source={IMAGES.VISa} style={styles.img2} />
              <Image source={IMAGES.Mastercard} style={styles.img2} />
            </View>
            <View style={styles.Line} />

            {/* products */}
            <View style={[styles.row, styles.amout]}>
              <Text style={styles.totla}>Total Payment </Text>
              <Text style={styles.totlaamout}>{cartTotal}</Text>
              <Text style={styles.totlaamout}> EGP</Text>
            </View>
            <View style={styles.Line} />

            <View style={[styles.orders]}>
              <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />
            </View>

            <View style={styles.rowbetween}>
              <Pressable
                onPress={() => setSelectedOption('online')}
                style={
                  selectedOption === 'online'
                    ? styles.paymentMethosSelected
                    : styles.paymentMethosnotselected
                }>
                <Text
                  style={
                    selectedOption === 'online'
                      ? styles.textbtn
                      : styles.textnotselected
                  }>
                  Pay Online{' '}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedOption('cash')}
                style={
                  selectedOption === 'cash'
                    ? styles.paymentMethosSelected
                    : styles.paymentMethosnotselected
                }>
                <Text
                  style={
                    selectedOption === 'cash'
                      ? styles.textbtn
                      : styles.textnotselected
                  }>
                  Cash On Delivery
                </Text>
              </Pressable>
            </View>

            <View style={styles.marginTop}>
              <View style={{marginTop: hp(5)}}>
                <Text style={styles.inputTitle}>Address</Text>
                <TextInput
                  placeholder="Enter address"
                  placeholderTextColor={Constant.colors['deep-burgundy']}
                  style={styles.textInput}
                  value={inputValues.address}
                  onChangeText={value => handleInputChange('address', value)}
                />
                {errors.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}
              </View>
              {selectedOption === 'online' ? (
                <View style={{marginTop: hp(2)}}>
                  <View>
                    <Text style={styles.inputTitle}>Card holder name</Text>
                    <TextInput
                      placeholder="Enter card holder name"
                      placeholderTextColor={Constant.colors['deep-burgundy']}
                      style={styles.textInput}
                      value={inputValues.cardHolderName}
                      onChangeText={value =>
                        handleInputChange('cardHolderName', value)
                      }
                    />
                    {errors.cardHolderName && (
                      <Text style={styles.errorText}>
                        {errors.cardHolderName}
                      </Text>
                    )}
                  </View>
                  <View style={styles.marginTop2}>
                    <Text style={styles.inputTitle}>Card number</Text>
                    <TextInput
                      placeholder="Enter card number"
                      placeholderTextColor={Constant.colors['deep-burgundy']}
                      style={styles.textInput}
                      maxLength={14}
                      value={inputValues.cardNumber}
                      onChangeText={value =>
                        handleInputChange('cardNumber', value)
                      }
                    />
                    {errors.cardNumber && (
                      <Text style={styles.errorText}>{errors.cardNumber}</Text>
                    )}
                  </View>
                  <View style={styles.rowbetween}>
                    <View style={styles.CVV}>
                      <Text style={styles.inputTitle}>EXP.</Text>
                      <TextInput
                        placeholder="MM/YY"
                        placeholderTextColor={Constant.colors['deep-burgundy']}
                        style={styles.textInput}
                        value={inputValues.expDate}
                        onChangeText={value =>
                          handleInputChange('expDate', value)
                        }
                      />
                    </View>
                    <View style={styles.CVV}>
                      <Text style={styles.inputTitle}>CVV</Text>
                      <TextInput
                        placeholder="Enter CVV"
                        placeholderTextColor={Constant.colors['deep-burgundy']}
                        style={styles.textInput}
                        value={inputValues.cvv}
                        onChangeText={value => handleInputChange('cvv', value)}
                        maxLength={3} // limit CVV to 3 digits
                      />
                    </View>
                  </View>
                  <View style={styles.rowbetween}>
                    <View style={[styles.CVV, {marginTop: hp(0)}]}>
                      {errors.expDate && (
                        <Text style={styles.errorText}>{errors.expDate}</Text>
                      )}
                    </View>
                    <View style={[styles.CVV, {marginTop: hp(0)}]}>
                      {errors.cvv && (
                        <Text style={styles.errorText}>{errors.cvv}</Text>
                      )}
                    </View>
                  </View>
                </View>
              ) : null}

              <TouchableOpacity
                onPress={selectedOption === 'online' ? payNow : cashOnDelivery}
                style={styles.btn}>
                <Text style={styles.textbtn}>
                  {loading ? (
                    <ActivityIndicator color={Constant.colors['light-pink']} />
                  ) : (
                    'Pay Now'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default CheckOut;
