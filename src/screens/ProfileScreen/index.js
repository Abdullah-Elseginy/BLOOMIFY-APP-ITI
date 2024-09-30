import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import {db} from '../../firebase/firebase'; // تأكد من مسار ملف الإعدادات الخاص بك
import AppHeader from '../../Components/Header';

const ProfileScreen = ({navigation}) => {
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/150',
  );
  const [userData, setUserData] = useState({name: '', email: ''});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // استبدل "user-id" بمعرف المستخدم الصحيح
        const userDoc = await db.collection('users').doc('user-id').get();
        if (userDoc.exists) {
          const user = userDoc.data();
          setUserData({name: user.name, email: user.email});
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Log Out', onPress: () => console.log('Logged Out')},
    ]);
  };

  const renderOption = (iconName, text, onPress) => (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color="#ffa500" style={styles.icon} />
      </View>
      <Text style={styles.optionText}>{text}</Text>
      <Icon
        name="chevron-right"
        size={24}
        color="#ffa500"
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <AppHeader title={`Welcome ${userData.name}`} />
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleImageChange}
            style={styles.imageWrapper}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Image
                  source={{uri: profileImage}}
                  style={styles.profileImage}
                />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.name}>{userData.name || 'Loading...'}</Text>
          <Text style={styles.email}>{userData.email || 'Loading...'}</Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {renderOption('history', 'Order History', () =>
            navigation.navigate('OrderHistory'),
          )}
          {renderOption('location-on', 'Shipping Address', () =>
            navigation.navigate('ShippingAddress'),
          )}
          {renderOption('support-agent', 'Create Request', () =>
            navigation.navigate('CreateRequest'),
          )}
          {renderOption('policy', 'Privacy Policy', () =>
            navigation.navigate('PrivacyPolicy'),
          )}
          {renderOption('logout', 'Log Out', handleLogout)}
        </View>
      </View>
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
    color: '#666',
    marginTop: 10,
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
    backgroundColor: 'rgba(174, 107, 119,0.2)', // Transparent orange circle
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
