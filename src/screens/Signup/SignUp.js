/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import constant from '../../constants/Constant';
import {hp, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';
import {auth, db} from '../../firebase/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDoc, doc} from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';
import Constant from '../../constants/Constant';
export default function Register({navigation}) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const phoneRegExp = /^(010|011|012|015)\d{8}$/;
  const [modaVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (error) {
      setModalVisible(true);
    }
  }, [error]);
  // Form Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name minLength is 3')
      .max(30, 'Name maxLength is 30')
      .required('Name is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('phone is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Password must be at least 6 characters long and include both letters and numbers',
      )
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password is incorrect')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: async values => {
      setIsLoading(true);
      setError(null); // Clear any previous errors

      try {
        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );

        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
        });

        const user = userCredential.user;
        console.log('User created:', user);

        await AsyncStorage.setItem('userToken', user.accessToken);

        await AsyncStorage.setItem('userData', JSON.stringify(values));
        navigation.replace('BottomTabs');
        // eslint-disable-next-line no-catch-shadow
      } catch (error) {
        setError(error.message || 'Registration failed. Please try again.');
        // console.error('Error creating user:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: wp(4),
          paddingBottom: hp(4),
        }}>
        <Animatable.Image
          animation="zoomInDown"
          source={IMAGES.RegisterImg}
          resizeMode="contain"
          style={{width: wp(40), height: hp(20), alignSelf: 'center'}}
        />

        <View style={{width: '100%'}}>
          <Text
            style={{
              fontSize: wp(6),
              fontWeight: 'bold',
              color: constant.colors['deep-burgundy'],
              marginBottom: hp(2),
              textAlign: 'center',
            }}>
            Register Now
          </Text>

          {error && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modaVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Error</Text>
                  <Text style={styles.modalMessage}>{error}</Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setModalVisible(false)}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          <Text
            style={{
              color: Constant.colors['deep-burgundy'],
              fontSize: wp(4),
              fontWeight: '500',
              marginTop: hp(2),
              marginBottom: hp(0.5),
            }}>
            Enter your name
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={constant.colors['dark-brownish']}
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <Text style={{color: '#d31e1e', width: wp(80), marginTop: -hp(1)}}>
              {formik.errors.name}
            </Text>
          ) : null}
          <Text
            style={{
              color: Constant.colors['deep-burgundy'],
              fontSize: wp(4),
              fontWeight: '500',
              marginTop: hp(0.5),
              marginBottom: hp(0.5),
            }}>
            Enter your number
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor={constant.colors['dark-brownish']}
            value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            keyboardType="phone-pad"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <Text style={{color: '#d31e1e', width: wp(80), marginTop: -hp(1)}}>
              {formik.errors.phone}
            </Text>
          ) : null}
          <Text
            style={{
              color: Constant.colors['deep-burgundy'],
              fontSize: wp(4),
              fontWeight: '500',
              marginTop: hp(0.5),
              marginBottom: hp(0.5),
            }}>
            Enter your email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={constant.colors['dark-brownish']}
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            keyboardType="email-address"
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={{color: '#d31e1e', width: wp(80), marginTop: -hp(1)}}>
              {formik.errors.email}
            </Text>
          ) : null}
          <Text
            style={{
              color: Constant.colors['deep-burgundy'],
              fontSize: wp(4),
              fontWeight: '500',
              marginTop: hp(0.5),
              marginBottom: hp(0.5),
            }}>
            Enter your password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={constant.colors['dark-brownish']}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
          />
          {formik.touched.password && formik.errors.password ? (
            <Text style={{color: '#d31e1e', width: wp(80), marginTop: -hp(1)}}>
              {formik.errors.password}
            </Text>
          ) : null}
          <Text
            style={{
              color: Constant.colors['deep-burgundy'],
              fontSize: wp(4),
              fontWeight: '500',
              marginTop: hp(0.5),
              marginBottom: hp(0.5),
            }}>
            Enter confirm password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor={constant.colors['dark-brownish']}
            value={formik.values.rePassword}
            onChangeText={formik.handleChange('rePassword')}
            onBlur={formik.handleBlur('rePassword')}
            secureTextEntry
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <Text style={{color: '#d31e1e', width: wp(80), marginTop: -hp(1)}}>
              {formik.errors.rePassword}
            </Text>
          ) : null}

          <TouchableOpacity
            style={{
              backgroundColor: Constant.colors['deep-burgundy'],
              height: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(2),
              marginTop: hp(2),
            }}
            onPress={() => {
              formik.handleSubmit();
              console.log(error);
            }}
            disabled={isLoading || !formik.isValid}>
            <Text style={styles.submitButtonText}>
              {isLoading ? (
                <ActivityIndicator color={Constant.colors['light-pink']} />
              ) : (
                'Register'
              )}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp(2),
            }}>
            <Text
              style={{
                fontSize: wp(4),
                color: constant.colors['deep-burgundy'],
              }}>
              {' Already have an account? '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: wp(4),
                  fontWeight: '700',
                  color: constant.colors['deep-burgundy'],
                }}>
                Log in here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: wp(0.13),
    borderColor: constant.colors['deep-burgundy'],
    padding: hp(1),
    borderRadius: wp(2),
    marginTop: hp(0.5),
    marginBottom: wp(3),
    color: Constant.colors['deep-burgundy'],
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#960808',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E8E1DA',
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});
