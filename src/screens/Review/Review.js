import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppHeader from '../../Components/Header';
import { db } from '../../firebase/firebase';
import { collection, getDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { useRoute } from '@react-navigation/native';
import Constant from '../../constants/Constant';
import { styles } from './styles';
import { Rating } from 'react-native-ratings';
import { TextInput } from 'react-native-gesture-handler';
import { hp } from '../../constants/Dimensions';

export default function Review() {
    const { params } = useRoute();
    // Add review section
    const [userData, setUserData] = useState({});
    const [userRating, setUserRating] = useState();
    const [userComment, setUserComment] = useState();

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const Data = await getDoc(doc(db, "users", userId));
                const uData = Data.data();
                setUserData(uData);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, [userId]);

    // Handle adding a review
    async function setReview() {
        if (!userRating || !userComment) {
            console.log("Rating and comment are required.");
            return;
        }
        const rating = parseFloat(userRating);
        try {
            const reviewsCollectionRef = collection(doc(db, 'products', params), 'reviews');
            await setDoc(doc(reviewsCollectionRef), {
                rating: rating,
                comment: userComment,
                userName: userData.name,
                userId: userId,
            });
            clearInput(); // Clear input fields after submitting
        } catch (error) {
            console.log(error);
        }
    }

    // Clear input fields
    function clearInput() {
        setUserRating('');
        setUserComment('');
    }

    // end of add review
    return (
        <>
            <AppHeader title='Review' arrowBack={true} />
            <View style={styles.comment}>
                                    <Text style={styles.title}>Add Review</Text>
                                    <Rating
                                        type="star"
                                        ratingCount={5}
                                        imageSize={30}
                                        startingValue={0}
                                        minValue={0}
                                        fractions={2} // Allow float ratings like 4.5
                                        onFinishRating={setUserRating} // Set user's selected rating
                                        style={styles.rating}
                                    />
                                    <TextInput
                                        style={[styles.input, { height: hp(7) }]}
                                        placeholder='your review...'
                                        placeholderTextColor={Constant.colors.gray}
                                        onChangeText={(e) => setUserComment(e)}
                                        value={userComment}

                                    />
                                    <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={() => setReview()}>
                                        <Text style={styles.addButtonText}>Add my Review</Text>
                                    </TouchableOpacity>
                                </View>
        </>
    )
}