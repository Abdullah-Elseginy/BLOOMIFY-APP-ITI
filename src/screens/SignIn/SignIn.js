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
  ActivityIndicator,
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
import Constant from '../../constants/Constant';
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
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{}}>
          <Animatable.Image
            animation="zoomInDown"
            duration={4000}
            source={IMAGES.LoginPng}
            resizeMode="contain"
            style={{width: wp(55), height: hp(30), alignSelf: 'center'}}
          />
          <Text
            style={{
              color: Constant.colors['deep-burgundy'],
              textAlign: 'center',
              fontSize: wp(7),
              fontWeight: '700',
              marginBottom: hp(3),
            }}>
            Sign In Now
          </Text>

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
              <View style={{paddingHorizontal: wp(4), width: '100%'}}>
                <Text
                  style={{
                    color: Constant.colors['deep-burgundy'],
                    fontSize: wp(4),
                    fontWeight: '500',
                    marginBottom: hp(0.5),
                  }}>
                  Enter Email
                </Text>
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
                    borderWidth: wp(0.13),
                    borderColor: imailPressed
                      ? constant.colors['dark-brownish']
                      : constant.colors['deep-burgundy'],

                    padding: hp(1),
                    borderRadius: wp(2),
                    marginVertical: hp(0.5),
                    color: Constant.colors['deep-burgundy'],
                  }}
                />
                {touched.email && errors.email && (
                  <Text
                    style={{
                      color: '#d31e1e',
                      width: wp(80),
                      marginBottom: hp(2),
                    }}>
                    {errors.email}
                  </Text>
                )}
                <Text
                  style={{
                    color: Constant.colors['deep-burgundy'],
                    fontSize: wp(4),
                    fontWeight: '500',
                    marginTop: hp(2),
                    marginBottom: hp(0.5),
                  }}>
                  Enter Password
                </Text>
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
                    borderWidth: wp(0.13),
                    padding: hp(1),
                    borderRadius: wp(2),
                    marginVertical: hp(0.5),
                    borderColor: passPressed
                      ? constant.colors['dark-brownish']
                      : constant.colors['deep-burgundy'],
                    color: Constant.colors['deep-burgundy'],
                  }}
                />

                {touched.password && errors.password && (
                  <Text
                    style={{
                      color: '#d31e1e',
                      marginBottom: hp(2),
                      width: wp(80),
                    }}>
                    {errors.password}
                  </Text>
                )}

                <TouchableOpacity
                  style={[
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Constant.colors['deep-burgundy'],
                      padding: wp(1.5),
                      borderRadius: wp(2),
                      marginTop: hp(5),
                      height: hp(5),
                    },
                  ]}
                  onPress={() => {
                    handleSubmit();
                    // navigation.replace('BottomTabs');
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: wp(4),
                      fontWeight: 'bold',
                    }}>
                    {loading ? (
                      <ActivityIndicator
                        color={Constant.colors['light-pink']}
                      />
                    ) : (
                      'Login'
                    )}
                  </Text>
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
                  fontSize: wp(4),
                  fontWeight: '500',
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
                fontSize: wp(3.5),
                fontWeight: '700',
                color: constant.colors['deep-burgundy'],
                textAlign: 'center',
                marginTop: hp(2),
              }}>
              Skip Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
