//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Animated, TouchableOpacity, ToastAndroid, AlertIOS, Platform } from 'react-native';

import { Iconviewcomponent } from '../../Components/Icontag';
import Color from '../../Config/Color';
import { Poppins } from '../../Global/FontFamily';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Media } from '../../Global/Media';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';

// create a component
const RegisterScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();
    const [password_visible, setPasswordvisibility] = useState(true);

    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (val.length === 0) {
            setEmailValidError('Email address must be enter');
        } else if (reg.test(val) === false) {
            setEmailValidError('Enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    };

   async function signupClick() {
        try {

            if (username != "" && email != "" && phone != "" && password != "") {
                    const register = await fetchData.register({
                        username: username,
                        password: password,
                        email: email,
                        mobile_number: phone
                    })
                    if (register) {
                        navigation.replace("TabNavigator")
                        common_fn.showToast(register?.message)
                    } else {
                        common_fn.showToast(register?.message)
                    }
            } else {
                if (Platform.OS === 'android') {
                    common_fn.showToast('Please fill mandatory fields');
                } else {
                    alert("Please fill mandatory fields")
                }
            }

            console.log("username   ========= : " + username + " email ======= : " + email + " phone =========: " + phone + " password ======== :" + password);
        } catch (error) {
            console.log("catch in signup_Click : ", error);
        }
    }


    async function gotoLogincreen() {
        try {
            navigation.navigate("Auth")
        } catch (error) {
            console.log("catch in gotoLogin_Sreen : ", error);
        }
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: 'center', marginVertical: 30
                }}>
                <Image
                    source={{ uri: Media.logo }}
                    style={{ width: 120, height: 120, resizeMode: 'contain' }}
                />
            </View>

            <Animated.View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ width: '100%', textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, paddingVertical: 10 }}>Enter Username</Text>
                <View style={styles.NumberBoxConatiner}>
                    <View style={styles.numberCountryCode}>
                        <Iconviewcomponent
                            Icontag={'FontAwesome'}
                            iconname={'user-o'}
                            icon_size={22}
                            iconstyle={{ color: Color.cloudyGrey, marginRight: 10 }}
                        />
                    </View>
                    {/* <Text style={styles.numberCountryCode}>+91</Text> */}
                    <TextInput
                        style={username ? styles.numberTextBox : styles.placeTextBox}
                        placeholder="Enter your name"
                        placeholderTextColor={Color.cloudyGrey}
                        value={username}
                        keyboardType='name-phone-pad'
                        onChangeText={text => {
                            setUsername(text);
                        }}
                    />
                </View>

                <Text style={{ width: '100%', textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, paddingVertical: 10 }}>Enter E-mail</Text>
                <View style={styles.NumberBoxConatiner}>
                    <View style={styles.numberCountryCode}>
                        <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'mail'}
                            icon_size={22}
                            iconstyle={{ color: Color.cloudyGrey, marginRight: 10 }}
                        />
                    </View>
                    <TextInput
                        style={email ? styles.numberTextBox : styles.placeTextBox}
                        placeholder="Enter your E-mail"
                        placeholderTextColor={Color.cloudyGrey}
                        value={email}
                        keyboardType='email-address'
                        onChangeText={value => {
                            setEmail(value);
                            handleValidEmail(value);
                        }}
                    />
                </View>
                {emailValidError ? <Text style={{ width: '100%', textAlign: 'left', fontFamily: Poppins.Regular, paddingVertical: 5, fontSize: 14, color: 'red', marginTop: 10 }}>{emailValidError}</Text> : null}

                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={{ width: '100%', textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold }}>Enter Phone</Text>

                    <View style={[styles.NumberBoxConatiner, { marginVertical: 10 }]}>
                        <View style={styles.numberCountryCode}>
                            {/* <Iconviewcomponent
                                Icontag={'FontAwesome'}
                                iconname={'mobile-phone'}
                                icon_size={22}
                                iconstyle={{ color: Color.cloudyGrey, marginRight: 10 }}
                            /> */}
                            <Text style={{ fontSize: 16, color: Color.Venus }}>+91</Text>
                        </View>
                        <TextInput
                            style={phone ? styles.numberTextBox : styles.placeTextBox}
                            placeholder="Enter your phone number"
                            placeholderTextColor={Color.cloudyGrey}
                            // secureTextEntry={true}}
                            value={phone}
                            keyboardType='number-pad'
                            maxLength={10}
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                    </View>
                </View>

                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={{ width: '100%', textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold }}>Enter Password</Text>

                    <View style={[styles.NumberBoxConatiner, { marginVertical: 10 }]}>
                        <TouchableOpacity onPress={() => setPasswordvisibility(!password_visible)} style={styles.numberCountryCode}>
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={password_visible ? 'lock' : 'unlock'}
                                icon_size={22}
                                iconstyle={{ color: Color.cloudyGrey, marginRight: 10 }}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={password ? styles.numberTextBox : styles.placeTextBox}
                            placeholder="Enter your Password"
                            placeholderTextColor={Color.cloudyGrey}
                            secureTextEntry={password_visible}
                            value={password}
                            keyboardType='name-phone-pad'
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => signupClick()} style={{ width: '100%', height: 55, justifyContent: 'center', alignItems: 'center', marginVertical: 20, borderRadius: 5, backgroundColor: Color.primary }}>
                    <Text style={{ fontSize: 16, color: Color.white, textAlign: 'center' }}>REGISTER</Text>
                </TouchableOpacity>

            </Animated.View >

            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                    style={{
                        fontFamily: Poppins.Regular,
                        fontSize: 14,
                        textAlign: 'center',
                        color: Color.black,
                        marginVertical: 20,
                    }}>
                    Already have an account?
                </Text>
                <TouchableOpacity onPress={() => gotoLogincreen()}>
                    <Text
                        style={{
                            fontFamily: Poppins.Bold,
                            fontSize: 16,
                            textAlign: 'center',
                            color: Color.primary,
                            marginVertical: 20, textDecorationLine: 'underline', paddingHorizontal: 5, letterSpacing: 0.5
                        }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: scr_width,
        height: scr_height,
        alignItems: 'center',
        backgroundColor: Color.white,
    },
    NumberBoxConatiner: {
        display: "flex",
        borderColor: Color.cloudyGrey,
        borderWidth: 1,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    numberCountryCode: {
        color: Color.black,
        marginHorizontal: 10,
        fontSize: 14,
        fontFamily: Poppins.SemiBold,
        textAlign: "center",
        alignItems: "center",
        padding: 5,
        paddingTop: 7,
    },
    numberTextBox: {
        flex: 1,
        display: "flex",
        height: 55,
        borderLeftColor: Color.Venus,
        borderLeftWidth: 1,
        color: Color.black,
        fontSize: 16, letterSpacing: 1,
        padding: 5,
        paddingTop: 5, paddingHorizontal: 10,
        fontFamily: Poppins.SemiBold,
        alignItems: "flex-start",
    },
    placeTextBox: {
        flex: 1,
        display: "flex",
        height: 55,
        borderLeftColor: Color.grey,
        borderLeftWidth: 1,
        color: Color.black,
        fontSize: 14, letterSpacing: 1,
        padding: 5,
        paddingTop: 5, paddingHorizontal: 10,
        fontFamily: Poppins.Light,
        alignItems: "flex-start",
    },
});

//make this component available to the app
export default RegisterScreen;
