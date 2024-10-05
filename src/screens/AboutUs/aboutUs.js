import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import Constant from '../../constants/Constant';
import AppHeader from '../../Components/Header';
import {hp} from '../../constants/Dimensions';

export default function About() {
  return (
    <>
      <AppHeader title={'About Bloomify Team'} arrowBack={true} />
      <ScrollView style={styles.container}>
        {/* Background Image Section */}
        <View style={styles.bgContainer}>
          <Image
            source={require('../../assets/images/bloomifyBG.jpg')} // Update the image path
            style={styles.backgroundImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.headerText}>About Us</Text>
            <Text style={styles.subHeaderText}>
              Welcome to <Text style={styles.boldText}>BLOOMIFY</Text>, your
              premier destination for fresh and beautiful flowers. Our story
              began with a simple idea: to bring joy and beauty into people’s
              lives through the art of floral.
            </Text>
          </View>
        </View>

        {/* Vision Section */}
        <View style={styles.visionContainer}>
          <Text style={styles.visionTitle}>OUR VISION</Text>
          <Text style={styles.visionText}>
            At <Text style={styles.boldText}>BLOOMIFY</Text>, we envision a
            world where flowers are not just decorative elements but vital parts
            of our lives and celebrations. We strive to be more than just a
            flower shop; we aim to be a place where creativity meets care, and
            every bouquet tells a unique story. Our goal is to enrich lives with
            the timeless beauty of flowers, making every moment memorable.
          </Text>
        </View>

        {/* Team Section */}
        <Text style={styles.teamTitle}>Meet Our Great Team</Text>
        <View style={styles.cardsContainer}>
          {/* Team Cards */}
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.card}>
              <Image source={member.image} style={styles.avatar} />
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
              {/* Social Media Icons */}
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(member.linkedin)}>
                  <Icon
                    name="linkedin"
                    size={20}
                    color="#0077B5"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Linking.openURL(member.github)}>
                  <Icon
                    name="github"
                    size={20}
                    color="#333"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

// Mocked team data with links
const teamMembers = [
  {
    name: 'Sara Mustafa',
    role: 'Web Developer',
    image: require('../../assets/images/sara.jpeg'),
    linkedin: 'http://linkedin.com/in/sara-mustafa-8b869b1b0',
    github: 'https://github.com/sara22mustafa',
  },
  {
    name: 'Paula Eissa',
    role: 'Web Developer',
    image: require('../../assets/images/Paula.jpeg'),
    linkedin:
      'https://www.linkedin.com/in/bola-easa-350073269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    github: 'https://github.com/Paula-Eissa',
  },
  {
    name: 'Toqa Mohamed',
    role: 'Web Developer',
    image: require('../../assets/images/Toqa.jpeg'),
    linkedin: 'http://www.linkedin.com/in/toqamohamedyouness',
    github: 'https://github.com/toqaz',
  },
  {
    name: 'Abdullah Elseginy',
    role: 'Mobile App Developer',
    image: require('../../assets/images/abd0.jpeg'),
    linkedin: 'https://www.linkedin.com/in/abdullah-elseginy-7bbbb21ba/',
    github: 'https://github.com/Abdullah-Elseginy',
  },
  {
    name: 'Nada Shaheen',
    role: 'Web Developer',
    image: require('../../assets/images/nada.jpeg'),
    linkedin: 'http://linkedin.com/in/nada-shaheen',
    github: 'https://github.com/Nada-Shaheen',
  },
  {
    name: 'Habiba',
    role: 'Web Developer',
    image: require('../../assets/images/habiba.jpeg'),
    linkedin: 'https://linkedin.com/in/habiba-orabi-864170225',
    github: 'https://github.com/HabibaOrabi188',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bgContainer: {
    position: 'relative',
    height: 250,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  visionContainer: {
    padding: 20,
  },
  visionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Constant.colors['deep-burgundy'],
  },
  visionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Constant.colors['dusty-mauve'],
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: Constant.colors['deep-burgundy'],
    paddingLeft: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    width: '45%',
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 15, // Reduced size
    fontWeight: 'bold',
    color: Constant.colors['deep-burgundy'],
  },
  memberRole: {
    fontSize: 12, // Reduced size
    color: Constant.colors['dark-brownish'],
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});
