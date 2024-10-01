/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import constant from '../../constants/Constant';
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {db} from '../../firebase/firebase';
import {auth} from '../../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
export default function SignIn() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [imailPressed, setImailPressed] = useState(false);
  const [passPressed, setPassPressed] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Password is incorrect',
      )
      .required('Password is required'),
  });

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: constant.colors['pale-grayish']}}>
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: constant.colors['pale-grayish'],
          }}>
          <Animatable.Image
            animation="zoomInDown"
            duration={4000}
            source={IMAGES.LoginPng}
            resizeMode="contain"
            style={{width: wp(80), height: hp(45)}}
          />

          <Formik
            style={{width: '100%'}}
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={async values => {
              setLoading(true);
              try {
                const userCredential = await signInWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password,
                );

                const user = userCredential.user;
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                  const token = await user.getIdToken();
                  const userId = user.uid;

                  await AsyncStorage.setItem('userToken', token);
                  await AsyncStorage.setItem('userId', userId);
                  // console.log('User data:', userDoc.data());
                  navigation.replace('BottomTabs');
                } else {
                  Alert.alert(
                    'Error',
                    'User data does not exist. Please try again.',
                  );
                }
              } catch (error) {
                Alert.alert(
                  'Login Failed',
                  // error.message ||
                  'Please check your credentials and try again.',
                );
                // console.error('Error logging in:', error.message);
              } finally {
                setLoading(false);
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  placeholderTextColor={constant.colors['dark-brownish']}
                  onPressIn={() => setImailPressed(true)}
                  onEndEditing={() => setImailPressed(false)}
                  style={{
                    borderWidth: 1,
                    width: wp(90),
                    borderColor: imailPressed
                      ? constant.colors['dark-brownish']
                      : constant.colors['deep-burgundy'],
                    padding: hp(1),
                    borderRadius: 10,
                    marginVertical: hp(1),
                  }}
                />
                {touched.email && errors.email && (
                  <Text style={{color: 'red', width: wp(80)}}>
                    {errors.email}
                  </Text>
                )}

                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Enter your password"
                  placeholderTextColor={constant.colors['dark-brownish']}
                  secureTextEntry
                  onPressIn={() => setPassPressed(true)}
                  onPressOut={() => setPassPressed(false)}
                  style={{
                    borderWidth: 1,
                    padding: hp(1),
                    width: wp(90),
                    borderRadius: 10,
                    marginVertical: hp(1),
                    borderColor: passPressed
                      ? constant.colors['dark-brownish']
                      : constant.colors['deep-burgundy'],
                  }}
                />
                {touched.password && errors.password && (
                  <Text
                    style={{color: 'red', marginBottom: hp(2), width: wp(80)}}>
                    {errors.password}
                  </Text>
                )}

                <TouchableOpacity
                  style={[constant.mainButton, {margin: hp(3)}]}
                  onPress={() => {
                    handleSubmit();
                    // navigation.replace('BottomTabs');
                  }}>
                  <Text style={constant.mainButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: hp(2),
            }}>
            <Text
              style={{
                fontSize: wp(4),
                color: constant.colors['dark-brownish'],
              }}>
              {"If you don't have an account, "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text
                style={{
                  fontSize: wp(4.2),
                  color: constant.colors['deep-burgundy'],
                }}>
                Register here
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('BottomTabs');
            }}>
            <Text
              style={{
                fontSize: wp(4.2),
                color: constant.colors['deep-burgundy'],
              }}>
              Skip Logon
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
