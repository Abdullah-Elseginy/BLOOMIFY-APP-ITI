import React, { useEffect, useState } from 'react';
import { View, Text, Alert,ScrollView } from 'react-native';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

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

  const handleImageChange = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', onPress: () => console.log('Logged Out') },
    ]);
  };

  const renderOption = (iconName, text, onPress) => (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color="#ffa500" style={styles.icon} />
      </View>
      <Text style={styles.optionText}>{text}</Text>
      <Icon name="chevron-right" size={24} color="#ffa500" style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.customHeader}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImageChange} style={styles.imageWrapper}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{userData?.name || 'Loading...'}</Text>
        <Text style={styles.email}>{userData?.email || 'Loading...'}</Text>
      </View>

      {/* Profile Options */}
      <ScrollView style={styles.optionsContainer}>
        {renderOption('history', 'Order History', () => navigation.navigate('OrderHistory'))}
        {renderOption('map-marker', 'Shipping Address', () => navigation.navigate('ShippingAddress'))}
        {renderOption('envelope', 'Create Request', () => navigation.navigate('CreateRequest'))}
        {renderOption('user-secret', 'Privacy Policy', () => navigation.navigate('PrivacyPolicy'))}
        {renderOption('sign-out', 'Log Out', handleLogout)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  customHeader: {
    paddingVertical: 15,
    backgroundColor: '#fff', // Background color is now white
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#AE6B77', // Text color is now the previous background color
    fontWeight: 'bold',
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
});

export default ProfileScreen;
