/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import constant from '../../constants/Constant';
import {hp, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';

export default function Register({navigation}) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const phoneRegExp = /^(010|011|012|015)\d{8}$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name minLength is 3')
      .max(30, 'Name maxLength is 30')
      .required('Name is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
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
    onSubmit: values => {
      setIsLoading(true);
      setError(null);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    },
  });

  return (
    <ScrollView>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          backgroundColor: constant.colors['pale-grayish'],
        }}>
        <Image
          source={IMAGES.RegisterImg}
          resizeMode="contain"
          style={{width: wp(80), height: hp(45)}}
        />

        <View
          style={{
            width: '100%',
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: constant.colors['deep-burgundy'],
              marginBottom: 20,
              textAlign: 'center',
            }}>
            Register Now
          </Text>

          {error && <Text style={{color: 'red', width: wp(80)}}>{error}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <Text style={{color: 'red', width: wp(80)}}>
              {formik.errors.name}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            keyboardType="phone-pad"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <Text style={{color: 'red', width: wp(80)}}>
              {formik.errors.phone}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            keyboardType="email-address"
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={{color: 'red', width: wp(80)}}>
              {formik.errors.email}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
          />
          {formik.touched.password && formik.errors.password ? (
            <Text style={{color: 'red', width: wp(80)}}>
              {formik.errors.password}
            </Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={formik.values.rePassword}
            onChangeText={formik.handleChange('rePassword')}
            onBlur={formik.handleBlur('rePassword')}
            secureTextEntry
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <Text style={{color: 'red', width: wp(80)}}>
              {formik.errors.rePassword}
            </Text>
          ) : null}

          <TouchableOpacity
            style={[constant.mainButton, {alignSelf: 'center'}]}
            onPress={formik.handleSubmit}
            disabled={isLoading}>
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Loading...' : 'Register'}
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
                color: constant.colors['dark-brownish'],
              }}>
              {' Already have an account? '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: wp(4.2),
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
    borderWidth: 1,
    width: wp(90),
    borderColor: constant.colors['dark-brownish'],
    padding: hp(1),
    borderRadius: 10,
    marginVertical: hp(1),
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#800020',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
