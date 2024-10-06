import { View, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../../Components/Header';
import { styles } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ICON from 'react-native-vector-icons/MaterialCommunityIcons';
import Constant from '../../constants/Constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { hp } from '../../constants/Dimensions';
import Toast from 'react-native-toast-message'; 

const contactInfo = [
    { id: 1, refrance: 'mailto:Blomify@gmail.com', icon: <ICON name="email-outline" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>Blomify@gmail.com</Text> },
    { id: 2, refrance: 'tel:+201066787955', icon: <Icon name="phone" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>+20 0106677955</Text> },
    { id: 3, refrance: 'https://www.google.com/maps', icon: <ICON name="google-maps" size={24} color="#fff" style={styles.icn} />, content: <Text style={styles.txt}>123 Street 256 House tanta</Text> },
];

const SocialICon = [
    { id: 1, refrance: 'https://www.instagram.com/blo_omifyshop?igsh=anI3MW81cWpjNDd4', icon: <ICON name="instagram" size={32} color="#fff" style={styles.icn} /> },
    { id: 2, refrance: 'https://www.facebook.com/people/Bloomify/61564176270981/?mibextid=ZbWKwL', icon: <Icon name="facebook" size={32} color="#fff" style={styles.icn} /> },
    { id: 3, refrance: 'https://wa.link/jk7u72', icon: <ICON name="whatsapp" size={32} color="#fff" style={styles.icn} /> },
];

export default function ContactUs() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // To track loading state

    const handlePress = (url) => {
        Linking.openURL(url).catch((err) => console.error("Failed to open URL: ", err));
    };

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(form.email)) {
            newErrors.email = 'Enter a valid email';
            valid = false;
        }
        if (!form.subject.trim()) {
            newErrors.subject = 'Subject is required';
            valid = false;
        }
        if (!form.message.trim()) {
            newErrors.message = 'Message is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
                Toast.show({
                    type: 'success',
                    text1: 'Email Sent',
                    text2: 'Your email was sent successfully!',
                    position: 'top',
                });
                setForm({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            }, 3000);
        }
    };

    return (
        <>
            <AppHeader title='Contact Us' arrowBack={true} />
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.name}>Get in Touch</Text>
                    <Text style={styles.boxText}>
                        Have some big idea or brand to develop and need help? Then reach out we'd love to hear about your project and provide help.
                    </Text>
                </View>
                <View style={styles.form}>
                    {contactInfo.map((item) => (
                        <TouchableOpacity activeOpacity={0.7} style={styles.contact} key={item.id} onPress={() => handlePress(item.refrance)}>
                            {item.icon}
                            {item.content}
                        </TouchableOpacity>
                    ))}
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={Constant.colors.gray}
                        keyboardType="default"
                        style={[styles.input, { marginTop: 20 }]}
                        value={form.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                    <View style={styles.errContainer}>
                        {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
                    </View>
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={Constant.colors.gray}
                        keyboardType="email-address"
                        style={styles.input}
                        value={form.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    <View style={styles.errContainer}>
                        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                    </View>
                    <TextInput
                        placeholder='Subject'
                        placeholderTextColor={Constant.colors.gray}
                        keyboardType="default"
                        style={styles.input}
                        value={form.subject}
                        onChangeText={(value) => handleInputChange('subject', value)}
                    />
                    <View style={styles.errContainer}>
                        {errors.subject ? <Text style={styles.error}>{errors.subject}</Text> : null}
                    </View>
                    <TextInput
                        style={[styles.input, { height: hp(7) }]}
                        placeholder='Message'
                        placeholderTextColor={Constant.colors.gray}
                        value={form.message}
                        onChangeText={(value) => handleInputChange('message', value)}
                    />
                    <View style={styles.errContainer}>
                        {errors.message ? <Text style={styles.error}>{errors.message}</Text> : null}
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={handleSubmit}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.addButtonText}>Send mail now</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.social}>
                        {SocialICon.map((item) => (
                            <TouchableOpacity activeOpacity={0.7} key={item.id} onPress={() => handlePress(item.refrance)}>
                                {item.icon}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <Toast />
        </>
    );
}