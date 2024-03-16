//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Keyboard, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import Color from '../../Config/Color';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { primarycolor } from '../../Utils/Colors';
import { Poppins } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import fetchData from '../../Config/fetchData';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

// create a component
const RateReviews = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [Username, setUsername] = useState('');
    const [comments, setComments] = useState('');
    const [errorUsername, setErrorUsername] = useState('');

    const userData = useSelector(state => state.UserReducer.userData);
    var {
        user_id,
        username,
        profile,
        mobile_number,
        user_type_id,
        change_persona,
        email,
    } = userData;

    const [maxRating, setMaxRating] = useState([
        {
            id: 1,
            rating: 1,
            experience: 'Poor',
        },
        {
            id: 2,
            rating: 2,
            experience: 'Bad',
        },
        {
            id: 3,
            rating: 3,
            experience: 'Okay',
        },
        {
            id: 4,
            rating: 4,
            experience: 'Average',
        },
        {
            id: 5,
            rating: 5,
            experience: 'Good',
        },
    ]);
    const starImageCorner = Media.starOutline;
    const [defaultRating, setDefaultRating] = useState(null);
    const starImageFilled = Media.star;
    const ref_input2 = useRef();
    const ref_input3 = useRef();


    function changeUsername(text) {
        try {
            let Username = text;
            if (Username == '') {
                setUsername(Username);
                setErrorUsername('Enter the name');
            } else {
                setUsername(Username);
                setErrorUsername('');
            }
        } catch (error) {
            console.log('catch in profile change_Username ' + error);
        }
    }

    const handleRatingPress = item => {
        if (defaultRating === item) {
            setDefaultRating(null);
        } else {
            setDefaultRating(item);
        }
    };


    async function submitReview() {
        try {
            if (Username != '' && defaultRating != null) {
                var data = {
                    form_name: 'rate_reviews',
                    payload: {
                        mobile_number: mobile_number,
                        username: Username,
                        comments: comments,
                        ratings: defaultRating
                    },
                    user_id: user_id,
                };
                const homeLoanData = await fetchData.homeLoan_Api(data);
                if (homeLoanData.status) {
                    ToastAndroid.show('Your review will be updated', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Something went wrong, Server issues', ToastAndroid.LONG);
                }

            } else {
                ToastAndroid.show('Fill Mandatory Fields', ToastAndroid.LONG);
            }

        } catch (error) {
            console.log('catch in submit_Review : ', error);
        }
    }

    return (
        <DismissKeyboard>
            <View style={styles.container}>

                <View
                    style={{
                        flex: 1, width: '100%',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: 'black', fontFamily: Poppins.SemiBold, textAlign: 'left' }} numberOfLines={1}>Enter Your Name</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 50,
                                marginTop: 5,
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: Color.cloudyGrey,
                                borderRadius: 5,
                            }}>
                            <TextInput
                                placeholder="Enter your name"
                                placeholderTextColor={Color.cloudyGrey}
                                multiline={false}
                                value={Username}
                                onChangeText={text => changeUsername(text)}
                                returnKeyType={'next'}
                                style={{
                                    width: '90%',
                                    color: 'black',
                                    fontSize: 16,
                                    paddingHorizontal: 10,
                                    flexDirection: 'row',
                                }}
                                onSubmitEditing={() => ref_input2.current.focus()}
                            />
                        </View>
                        {!Username && (
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: 'red',
                                    marginTop: 5,
                                }}>
                                {errorUsername}
                            </Text>
                        )}
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16, color: 'black', fontFamily: Poppins.SemiBold, textAlign: 'left' }} numberOfLines={1}>Enter Your Comments</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 5,
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: Color.cloudyGrey,
                                borderRadius: 5,
                            }}>
                            <TextInput
                                placeholder="Enter your comments"
                                placeholderTextColor={Color.cloudyGrey}
                                multiline={true}
                                value={comments}
                                onChangeText={text => setComments(text)}
                                returnKeyType={'done'}
                                style={{
                                    width: '90%',
                                    color: 'black',
                                    maxHeight: 150,
                                    fontSize: 16,
                                    padding: 10,
                                    flexDirection: 'row', textAlign: 'justify',
                                    lineHeight: 25, letterSpacing: 0.5
                                }}
                                ref={ref_input2}
                            />
                        </View>
                    </View>

                    <View style={{ width: '90%', backgroundColor: 'white', marginVertical: 30 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: 'black', fontFamily: Poppins.SemiBold, textAlign: 'left' }} numberOfLines={1}>Tell others what you think</Text>


                        <View style={[styles.customRatingBarStyle, { marginTop: 20 }]}>
                            {maxRating.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        key={index}
                                        onPress={() => handleRatingPress(item.rating)}
                                        style={{
                                            marginHorizontal: 10,
                                            alignItems: 'center',
                                        }}>
                                        <Image
                                            style={styles.starImageStyle}
                                            source={{
                                                uri:
                                                    item.rating <= defaultRating
                                                        ? starImageFilled
                                                        : starImageCorner
                                            }
                                            }
                                        />
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                fontSize: 14,
                                                color: Color.cloudyGrey,
                                                marginVertical: 5,
                                                fontFamily: Poppins.SemiBold,
                                            }}>
                                            {item.experience}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => { submitReview() }}
                        style={{
                            width: '85%',
                            height: 45,
                            backgroundColor: primarycolor,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DismissKeyboard>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    starImageStyle: {
        width: 55,
        height: 55,
        resizeMode: 'cover',
    },
});


//make this component available to the app
export default RateReviews;
