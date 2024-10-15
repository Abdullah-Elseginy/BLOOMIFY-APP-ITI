/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {auth, db} from '../../firebase/firebase';
import {doc, getDoc} from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import AppHeader from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constant from '../../constants/Constant';
import {hp, wp} from '../../constants/Dimensions';
import IMAGES from '../../constants/Images';

const ProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [userToken, SetUserToken] = useState(null);
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/150',
  );
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userUid = currentUser.uid;
        const userDocRef = doc(db, 'users', userUid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No user is logged in');
      }
    };

    fetchUserData();
  }, []);

  const Logout = () => {
    AsyncStorage.clear();
    navigation.replace('Login');
  };

  const handleImageChange = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleLogout = () => {
    setModalVisible(true); // Open the modal
  };

  const confirmLogout = () => {
    setModalVisible(false); // Close the modal
    Logout(); // Perform logout
  };

  const renderOption = (iconName, text, onPress) => (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={20} color="#ffa500" style={styles.icon} />
      </View>
      <Text style={styles.optionText}>{text}</Text>
      <Icon name="chevron-right" size={15} style={styles.arrowIcon} />
    </TouchableOpacity>
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
          SetUserToken(value);
          console.log('usertoken22222', value);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <AppHeader title={'Welcome ' + (userData?.name || '')} />
      {userToken === null ? (
        <View style={styles.center}>
          <Text style={styles.Text}>Please Login have a profile</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('Login');
            }}
            style={styles.btn}>
            <Text style={styles.textbtn}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={handleImageChange}
                style={styles.imageWrapper}>
                <View style={styles.outerCircle}>
                  <View style={styles.innerCircle}>
                    <Image
                      source={{uri: profileImage} || IMAGES.Profile}
                      style={styles.profileImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.name}>{userData?.name}</Text>
              <Text style={styles.email}>{userData?.email}</Text>
            </View>

            {/* Profile Options */}
            <ScrollView style={styles.optionsContainer}>
              {renderOption('history', 'Order History', () =>
                navigation.navigate('Orders'),
              )}
              {renderOption('envelope', 'Contact Us', () =>
                navigation.navigate('contactUs'),
              )}
              {renderOption('user-secret', 'Privacy Policy', () =>
                navigation.navigate('PrivacyPolicy'),
              )}
              {renderOption('group', 'About us', () =>
                navigation.navigate('About'),
              )}
              {renderOption('sign-out', 'Log Out', handleLogout)}
            </ScrollView>
          </View>
        </>
      )}

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmLogout}>
                <Text style={styles.confirmButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  outerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#AE6B77',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#AE6B77',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#666',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  optionsContainer: {
    marginTop: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(174, 107, 119,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    color: '#AE6B77',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    flex: 1,
    color: '#AE6B77',
  },
  arrowIcon: {
    marginRight: 10,
    color: '#AE6B77',
  },
  // Modal styles
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
    color: '#AE6B77',
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
  confirmButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#AE6B77',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  Text: {
    color: Constant.colors['deep-burgundy'],
    fontWeight: '500',
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    flex: 1,
    padding: wp(4),
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2.8),
    backgroundColor: Constant.colors['deep-burgundy'],
    borderRadius: wp(2),
    marginTop: hp(3),
    alignSelf: 'center',
    width: wp(30),
  },
  textbtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
});

export default ProfileScreen;
