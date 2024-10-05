// import { View, Text, TouchableOpacity, Linking } from 'react-native'
// import React from 'react'
// import AppHeader from '../../Components/Header'
// import { styles } from './style'
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import ICON from 'react-native-vector-icons/MaterialCommunityIcons';
// import Constant from '../../constants/Constant';
// import { TextInput } from 'react-native-gesture-handler';
// import { hp } from '../../constants/Dimensions';


// const contactInfo = [
//     { id: 1, refrance: 'mailto:Blomify@gmail.com', icon: <ICON name="email-outline" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>Blomify@gmail.com</Text> },
//     { id: 2, refrance: 'tel:+201066787955', icon: <Icon name="phone" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>+20 0106677955</Text> },
//     { id: 3, refrance: 'https://www.google.com/maps', icon: <ICON name="google-maps" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>123 Street 256 House tanta</Text> },
// ];
// const SocialICon = [
//     { id: 1, refrance: 'https://www.instagram.com/blo_omifyshop?igsh=anI3MW81cWpjNDd4', icon: <ICON name="instagram" size={32} color="#fff" style={styles.icn} /> },
//     { id: 2, refrance: 'https://www.facebook.com/profile.php?id=61564176270981&mibextid=ZbWKwL', icon: <Icon name="facebook" size={32} color="#fff" style={styles.icn} /> },
//     { id: 3, refrance: 'https://wa.link/jk7u72', icon: <ICON name="whatsapp" size={32} color="#fff" style={styles.icn} /> },
// ];



// export default function ContactUs() {
//     const handlePress = (url) => {
//         Linking.openURL(url).catch((err) => console.error("Failed to open URL: ", err));
//     };

//     return (
//         <>
//             <AppHeader title='Contact Us' arrowBack={true} />
//             <View style={styles.container}>
//                 <View>
//                     <Text style={styles.name}>Get in Touch</Text>
//                     <Text style={styles.boxText}>Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.</Text>
//                 </View>
//                 <View style={styles.form}>
//                     {contactInfo.map((item) => <TouchableOpacity activeOpacity={0.7} style={styles.contact} key={item.id} onPress={() => handlePress(item.refrance)}>
//                         {item.icon}
//                         {item.content}
//                     </TouchableOpacity>)
//                     }
//                     <TextInput
//                         placeholder='Name'
//                         placeholderTextColor={Constant.colors.gray}
//                         keyboardType="number-pad"
//                         style={[styles.input,{marginTop:20}]}
//                     />
//                     <TextInput
//                         placeholder='Email'
//                         placeholderTextColor={Constant.colors.gray}
//                         keyboardType="number-pad"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder='Subject'
//                         placeholderTextColor={Constant.colors.gray}
//                         keyboardType="number-pad"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         style={[styles.input, { height: hp(7) }]}
//                         placeholder='Message'
//                         placeholderTextColor={Constant.colors.gray}
//                     />
//                     <TouchableOpacity activeOpacity={0.7} style={styles.addButton}>
//                         <Text style={styles.addButtonText}>Send mail now</Text>
//                     </TouchableOpacity>
//                     <View style={styles.social}>
//                         {SocialICon.map((item) => <TouchableOpacity activeOpacity={0.7} key={item.id} onPress={() => handlePress(item.refrance)}>
//                             {item.icon}
//                         </TouchableOpacity>)
//                         }
//                     </View>
//                 </View>
//             </View>
//         </>
//     )
// }


// *******************************************************************************************************************************************************************************


import { View, Text, TouchableOpacity, Linking, TextInput } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../../Components/Header';
import { styles } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ICON from 'react-native-vector-icons/MaterialCommunityIcons';
import Constant from '../../constants/Constant';
import emailjs from 'emailjs-com';
import { hp } from '../../constants/Dimensions';

const contactInfo = [
    { id: 1, refrance: 'mailto:Blomify@gmail.com', icon: <ICON name="email-outline" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>Blomify@gmail.com</Text> },
    { id: 2, refrance: 'tel:+201066787955', icon: <Icon name="phone" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>+20 0106677955</Text> },
    { id: 3, refrance: 'https://www.google.com/maps', icon: <ICON name="google-maps" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>123 Street 256 House tanta</Text> },
];

const SocialICon = [
    { id: 1, refrance: 'https://www.instagram.com/blo_omifyshop?igsh=anI3MW81cWpjNDd4', icon: <ICON name="instagram" size={32} color="#fff" style={styles.icn} /> },
    { id: 2, refrance: 'https://www.facebook.com/profile.php?id=61564176270981&mibextid=ZbWKwL', icon: <Icon name="facebook" size={32} color="#fff" style={styles.icn} /> },
    { id: 3, refrance: 'https://wa.link/jk7u72', icon: <ICON name="whatsapp" size={32} color="#fff" style={styles.icn} /> },
];

export default function ContactUs() {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = () => {
        setIsSubmitting(true);
        emailjs.send('service_jz19c3c', 'template_ksj8tha', formData, '09jAQ3uxZuo4ocw6E')
            .then(() => {
                alert('Email Sent Successfully');
                setIsSubmitting(false);
            })
            .catch((error) => {
                console.error('Failed...', error.text);
                setEmailError(error.text);
                setIsSubmitting(false);
            });
    };

    const handlePress = (url) => {
        Linking.openURL(url).catch((err) => console.error("Failed to open URL: ", err));
    };

    return (
        <>
            <AppHeader title='Contact Us' arrowBack={true} />
            <View style={styles.container}>
                <View>
                    <Text style={styles.name}>Get in Touch</Text>
                    <Text style={styles.boxText}>Have some big idea or brand to develop and need help? Then reach out, we'd love to hear about your project and provide help.</Text>
                </View>
                <View style={styles.form}>
                    {contactInfo.map((item) => (
                        <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.contact} onPress={() => handlePress(item.refrance)}>
                            {item.icon}
                            {item.content}
                        </TouchableOpacity>
                    ))}
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={Constant.colors.gray}
                        style={[styles.input, { marginTop: 20 }]}
                        onChangeText={(value) => handleInputChange('user_name', value)}
                    />
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={Constant.colors.gray}
                        style={styles.input}
                        onChangeText={(value) => handleInputChange('user_email', value)}
                    />
                    <TextInput
                        placeholder='Subject'
                        placeholderTextColor={Constant.colors.gray}
                        style={styles.input}
                        onChangeText={(value) => handleInputChange('subject', value)}
                    />
                    <TextInput
                        style={[styles.input, { height: hp(7) }]}
                        placeholder='Message'
                        placeholderTextColor={Constant.colors.gray}
                        onChangeText={(value) => handleInputChange('message', value)}
                    />
                    <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={sendEmail} disabled={isSubmitting}>
                        <Text style={styles.addButtonText}>{isSubmitting ? 'Sending...' : 'Send Mail Now'}</Text>
                    </TouchableOpacity>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <View style={styles.social}>
                        {SocialICon.map((item) => (
                            <TouchableOpacity key={item.id} activeOpacity={0.7} onPress={() => handlePress(item.refrance)}>
                                {item.icon}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </>
    );
}



// thirs solution *******************************************************************************************************************************************************************

// import { View, Text, TouchableOpacity, Linking, TextInput } from 'react-native';
// import React, { useState } from 'react';
// import AppHeader from '../../Components/Header';
// import { styles } from './style';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import ICON from 'react-native-vector-icons/MaterialCommunityIcons';
// import Constant from '../../constants/Constant';
// import email from 'react-native-email'; // New import for react-native-email
// import { hp } from '../../constants/Dimensions';

// const contactInfo = [
//     { id: 1, refrance: 'mailto:Blomify@gmail.com', icon: <ICON name="email-outline" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>Blomify@gmail.com</Text> },
//     { id: 2, refrance: 'tel:+201066787955', icon: <Icon name="phone" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>+20 0106677955</Text> },
//     { id: 3, refrance: 'https://www.google.com/maps', icon: <ICON name="google-maps" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>123 Street 256 House tanta</Text> },
// ];

// const SocialICon = [
//     { id: 1, refrance: 'https://www.instagram.com/blo_omifyshop?igsh=anI3MW81cWpjNDd4', icon: <ICON name="instagram" size={32} color="#fff" style={styles.icn} /> },
//     { id: 2, refrance: 'https://www.facebook.com/profile.php?id=61564176270981&mibextid=ZbWKwL', icon: <Icon name="facebook" size={32} color="#fff" style={styles.icn} /> },
//     { id: 3, refrance: 'https://wa.link/jk7u72', icon: <ICON name="whatsapp" size={32} color="#fff" style={styles.icn} /> },
// ];

// export default function ContactUs() {
//     // Form input state
//     const [formData, setFormData] = useState({
//         user_name: '',
//         user_email: '',
//         subject: '',
//         message: ''
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [emailError, setEmailError] = useState('');

//     // Handle input changes
//     const handleInputChange = (name, value) => {
//         setFormData({ ...formData, [name]: value });
//     };

//     // Function to send the email using react-native-email
//     const sendEmail = () => {
//         const { user_name, user_email, subject, message } = formData;
//         const to = ['mailto:blomify@gmail.com']; // Prepend mailto to the target email address
    
//         if (!user_email || !subject || !message) {
//             setEmailError('Please fill all required fields.');
//             return;
//         }
    
//         setEmailError('');
//         setIsSubmitting(true);
    
//         email(to, {
//             subject: subject,
//             body: `Name: ${user_name}\nEmail: ${user_email}\nMessage: ${message}`,
//         }).then(() => {
//             alert('Email Sent Successfully');
//             setIsSubmitting(false);
//         }).catch((error) => {
//             console.error('Failed to send email', error);
//             setEmailError('Failed to send email. Please try again.');
//             setIsSubmitting(false);
//         });
//     };

//     // Existing handlePress function to handle external links
//     const handlePress = (url) => {
//         Linking.openURL(url).catch((err) => console.error("Failed to open URL: ", err));
//     };

//     return (
//         <>
//             <AppHeader title='Contact Us' arrowBack={true} />
//             <View style={styles.container}>
//                 <View>
//                     <Text style={styles.name}>Get in Touch</Text>
//                     <Text style={styles.boxText}>Have some big idea or brand to develop and need help? Then reach out, we'd love to hear about your project and provide help.</Text>
//                 </View>
//                 <View style={styles.form}>
//                     {contactInfo.map((item) => (
//                         <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.contact} onPress={() => handlePress(item.refrance)}>
//                             {item.icon}
//                             {item.content}
//                         </TouchableOpacity>
//                     ))}
//                     <TextInput
//                         placeholder='Name'
//                         placeholderTextColor={Constant.colors.gray}
//                         style={[styles.input, { marginTop: 20 }]}
//                         onChangeText={(value) => handleInputChange('user_name', value)}
//                     />
//                     <TextInput
//                         placeholder='Email'
//                         placeholderTextColor={Constant.colors.gray}
//                         style={styles.input}
//                         keyboardType="email-address"
//                         onChangeText={(value) => handleInputChange('user_email', value)}
//                     />
//                     <TextInput
//                         placeholder='Subject'
//                         placeholderTextColor={Constant.colors.gray}
//                         style={styles.input}
//                         onChangeText={(value) => handleInputChange('subject', value)}
//                     />
//                     <TextInput
//                         style={[styles.input, { height: hp(7) }]}
//                         placeholder='Message'
//                         placeholderTextColor={Constant.colors.gray}
//                         onChangeText={(value) => handleInputChange('message', value)}
//                     />
//                     <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={sendEmail} disabled={isSubmitting}>
//                         <Text style={styles.addButtonText}>{isSubmitting ? 'Sending...' : 'Send Mail Now'}</Text>
//                     </TouchableOpacity>
//                     {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
//                     <View style={styles.social}>
//                         {SocialICon.map((item) => (
//                             <TouchableOpacity key={item.id} activeOpacity={0.7} onPress={() => handlePress(item.refrance)}>
//                                 {item.icon}
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 </View>
//             </View>
//         </>
//     );
// }



