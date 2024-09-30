/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
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

const CheckOut = () => {
  const [selectedOption, setSelectedOption] = useState('online');
  const [successfulPayment, setSuccessfulPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const payNow = () => {
    setLoading(true);
    setTimeout(() => {
      setSuccessfulPayment(true);
      setLoading(false);
      setTimeout(() => {
        navigation.navigate('Orders');
      }, 2000);
    }, 2000);
  };
  const cashondelivary = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Orders');
    }, 2000);
  };
  return (
    <>
      <AppHeader title={'Payment Method'} arrowBack={true} />
      <ScrollView contentContainerStyle={{}}>
        <View style={styles.container}>
          <Image source={IMAGES.Paypal} style={styles.img} />
          <View style={styles.Line} />
          <View style={styles.row}>
            <Image source={IMAGES.VISa} style={styles.img2} />
            <Image source={IMAGES.Mastercard} style={styles.img2} />
          </View>
          <View style={styles.Line} />
          {successfulPayment ? (
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
          ) : (
            <>
              <View style={styles.rowbetween}>
                <Pressable
                  onPress={() => {
                    setSelectedOption('online');
                  }}
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
                  onPress={() => {
                    setSelectedOption('cash');
                  }}
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
                    placeholder="Enter card holder name"
                    placeholderTextColor={Constant.colors['deep-burgundy']}
                    style={styles.textInput}
                  />
                </View>
                {selectedOption === 'online' ? (
                  <View style={{marginTop: hp(2)}}>
                    <View>
                      <Text style={styles.inputTitle}>Card holder name</Text>
                      <TextInput
                        placeholder="Enter card holder name"
                        placeholderTextColor={Constant.colors['deep-burgundy']}
                        style={styles.textInput}
                      />
                    </View>
                    <View style={styles.marginTop2}>
                      <Text style={styles.inputTitle}>Card number</Text>
                      <TextInput
                        placeholder="Enter card number"
                        placeholderTextColor={Constant.colors['deep-burgundy']}
                        style={styles.textInput}
                      />
                    </View>
                    <View style={styles.rowbetween}>
                      <View style={styles.CVV}>
                        <Text style={styles.inputTitle}>EXP.</Text>
                        <TextInput
                          placeholder="EXP."
                          placeholderTextColor={
                            Constant.colors['deep-burgundy']
                          }
                          style={styles.textInput}
                        />
                      </View>
                      <View style={styles.CVV}>
                        <Text style={styles.inputTitle}>CVV</Text>
                        <TextInput
                          placeholder="CVV"
                          keyboardType="number-pad"
                          placeholderTextColor={
                            Constant.colors['deep-burgundy']
                          }
                          style={styles.textInput}
                        />
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
              {selectedOption === 'online' ? (
                <TouchableOpacity onPress={payNow} style={styles.btn}>
                  {loading ? (
                    <ActivityIndicator color="#AE6B77" />
                  ) : (
                    <Text style={styles.textbtn}>Pay Now</Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => cashondelivary()}
                  style={styles.btn}>
                  {loading ? (
                    <ActivityIndicator color="#AE6B77" />
                  ) : (
                    <Text style={styles.textbtn}>go to orders</Text>
                  )}
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
      {/* bottom */}
    </>
  );
};

export default CheckOut;
