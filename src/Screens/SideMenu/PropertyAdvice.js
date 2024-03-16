import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet, Text, Animated, View, FlatList, TextInput, Keyboard, ScrollView, Image, StatusBar,
    TouchableOpacity, Alert, Platform, UIManager, LayoutAnimation, LogBox, Linking
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { primarycolor } from '../../Utils/Colors';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Media } from '../../Global/Media';
import { Iconviewcomponent } from '../../Components/Icontag';
import { color } from 'react-native-elements/dist/helpers';
import Color from '../../Config/Color';
import common_fn from '../../Config/common_fn';

const loanData = [
    {
        'id': '0',
        'loan_img': Media.contract,
        'loan_sno': '1. ',
        'loan_desc': 'Fill an online form to view the best offers our partners benk.'
    },
];

const cityData = [
    {
        'id': '0',
        'prop_img': Media.prop_choose,
        'prop_name': 'Anandha villas',
        'prop_addr': 'Siva Nanda Colony, Coimbatore',
        'prop_price': '₹50.0 Lac'
    },
    {
        'id': '1',
        'prop_img': Media.prop_choose,
        'prop_name': 'Gokul Raj`s villa',
        'prop_addr': 'Peelamedu, Coimbatore',
        'prop_price': '₹71.0 Lac'

    },
    {
        'id': '2',
        'prop_img': Media.prop_choose,
        'prop_name': 'Pradeepan villa',
        'prop_addr': 'Saravanampatty, Coimbatore',
        'prop_price': '₹65.0 Lac'
    },
    {
        'id': '3',
        'prop_img': Media.prop_choose,
        'prop_name': 'Gokul Raj`s villa',
        'prop_addr': 'Peelamedu, Coimbatore',
        'prop_price': '₹71.0 Lac'

    },
];

LogBox.ignoreAllLogs();

const PropertyAdvice = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);

    const animatedOpacityValue = useRef(new Animated.Value(0)).current;
    const headerOpacity = animatedOpacityValue.interpolate({
        inputRange: [0, 40],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        useNativeDriver: false,
    });

    useEffect(() => {
        try {
            const unsubscribe = NetInfo.addEventListener(state => {
                setNetinfo(state.isConnected)
            });
            return () => unsubscribe;

        } catch (error) {
            console.log("catch in use_effect's Home_Loan : ", error);
        }
    }, []);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    function renderHeaderItem() {
        try {
            return (
                <View style={{ width: scr_width, backgroundColor: 'white' }}>
                    <View style={{ width: scr_width, }}>
                        <Image
                            source={{ uri: Media.home_loan_bann }}
                            style={{
                                width: scr_width,
                                height: 220, resizeMode: 'cover'
                            }}
                        />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 10 }}>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', padding: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 20, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Albion Advice </Text>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>and </Text>
                            <Text style={{ fontSize: 20, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Assistance</Text>
                        </View>
                        <View style={{ width: '95%', alignItems: 'center', marginVertical: 0 }}>
                            <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify' }}>Are you dreaming of owning your own home? Albion is here to turn that dream into reality.</Text>
                        </View>
                        <View style={{ width: '95%', marginVertical: 10, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Locality Insight</Text>
                            <Text style={{ fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Access locality review videos & usefull tools</Text>
                        </View>
                        <View style={{ width: '95%', marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Project's Reviews</Text>
                            <Text style={{ fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>View unbiased reviews & detailed information</Text>
                        </View>
                        <View style={{ width: '95%', marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Price Trends</Text>
                            <Text style={{ fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Stay updated with comprehensive analysis & reports</Text>
                        </View>
                        <View style={{ width: '95%', marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Legal Advice </Text>
                            <Text style={{ fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Check latest comprehensive analysis & reports</Text>
                        </View>
                        <View style={{ width: '95%', marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Expert Guidance</Text>
                            <Text style={{ fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Hear direct from the professionals</Text>
                        </View>
                        <View style={{ width: '95%', marginVertical: 5, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 15, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Market Research</Text>
                            <Text style={{ fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>View reports specially curated by Albion Research Team</Text>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            console.log("catch in renderHeader_Item : ", error);
        }
    }

    function renderAdviceItem(item, index) {
        try {
            return (
                <View style={{ width: 180, height: 200, margin: 5, borderRadius: 10, backgroundColor: 'white', borderColor: '#666', borderWidth: 0.5 }}>
                    <View style={{ flex: 1, width: '100%', height: 150 }}>
                        <Image
                            source={{ uri: item.prop_img }}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                        <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', position: 'absolute' }}>
                            <TouchableOpacity style={{ width: 35, height: 35, padding: 5, backgroundColor: '#fff', borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'play'}
                                    icon_size={22}
                                    iconstyle={{ color: '#888' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, width: '100%', paddingHorizontal: 10, marginBottom: 5 }}>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', paddingVertical: 5, textAlign: 'justify' }} numberOfLines={1}>{item.prop_name}</Text>
                        <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify' }} numberOfLines={2}>{item.prop_addr}</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', paddingVertical: 2, textAlign: 'justify' }} numberOfLines={1}>{item.prop_price}</Text>
                    </View>
                </View >
            );
        } catch (error) {
            console.log('catch in Home_interior renderCity_Item :', error);
        }
    }

    function renderFooterItem() {
        try {
            return (
                <View style={{ width: scr_width, height: height, alignSelf: 'center', alignItems: 'center', backgroundColor: 'white' }}>

                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', padding: 5 }}>Popular projects for you</Text>

                        <View style={{ width: '95%', alignItems: 'center', marginVertical: 10 }}>
                            <FlatList
                                data={cityData}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index }) => renderAdviceItem(item, index)}
                                style={{ width: '95%' }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>

                    {/* ***************************************************************** */}
                    <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }} numberOfLines={2}>Why Choose Albion Home Loans?</Text>
                        </View>
                        <View style={{ width: '95%', marginTop: 10, marginHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'check'}
                                    icon_size={22}
                                    iconstyle={{ color: '#239D0F' }}
                                />
                                <Text style={{ fontSize: 15, color: '#333', paddingHorizontal: 10, fontFamily: 'Poppins-SemiBold' }}>Tailored Solutions</Text>
                            </View>
                            <Text style={{ width: '100%', textAlign: 'justify', paddingVertical: 10, fontSize: 14, color: '#666', paddingHorizontal: 10, fontFamily: 'Poppins-Regular', lineHeight: 25 }}>We offer personalized home loan solutions that match you with the best offers from our partner banks based on your specific requirements and financial goals.</Text>
                        </View>

                        <View style={{ width: '95%', marginTop: 10, marginHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'check'}
                                    icon_size={22}
                                    iconstyle={{ color: '#239D0F' }}
                                />
                                <Text style={{ fontSize: 15, color: '#333', paddingHorizontal: 10, fontFamily: 'Poppins-SemiBold' }}>Expert Guidance</Text>
                            </View>
                            <Text style={{ width: '100%', textAlign: 'justify', paddingVertical: 10, fontSize: 14, color: '#666', paddingHorizontal: 10, fontFamily: 'Poppins-Regular', lineHeight: 25 }}>With Albion, you're not alone on your homebuying journey and Albion helps you make informed decisions.</Text>
                        </View>

                        <View style={{ width: '95%', marginTop: 10, marginHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'check'}
                                    icon_size={22}
                                    iconstyle={{ color: '#239D0F' }}
                                />
                                <Text style={{ fontSize: 15, color: '#333', paddingHorizontal: 10, fontFamily: 'Poppins-SemiBold' }}>Efficiency and Convenience</Text>
                            </View>
                            <Text style={{ width: '100%', textAlign: 'justify', paddingVertical: 10, fontSize: 14, color: '#666', paddingHorizontal: 10, fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Our streamlined process ensures that your application is submitted securely and promptly.</Text>
                        </View>
                    </View>

                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', padding: 5 }}>Disclaimer:</Text>
                        <Text style={{ width: '90%', fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>The information available on this site has been gathered from publicly available sources and is accurate to the best of our knowledge. However, please be aware that the rates and other offers may vary based on your profile and may be subject to change without notice. Albion accepts no liability for any loss arising from the use of the information on this website. (T&C link: https://www.albionauctions.com)</Text>
                    </View>

                    <View style={{ width: '95%', marginVertical: 10, paddingHorizontal: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Contact Us</Text>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'phone-call'}
                                    icon_size={22}
                                    iconstyle={{ color: primarycolor }}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>+91 94422 03866</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'mail'}
                                    icon_size={22}
                                    iconstyle={{ color: primarycolor }}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>support@albionpropertyhub.com</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: Media.albionlogo }}
                                style={{ width: 55, height: 55, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 18, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Albion Bank Auctions Pvt Ltd</Text>
                            <Text style={{ width: '95%', textAlign: 'justify', fontSize: 13, color: '#666', fontFamily: 'Poppins-SemiBold' }} numberOfLines={2} >India’s No.1 Property Site is now a Superband</Text>
                        </View>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 20 }}>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate("AboutUs")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>About Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("TermsCondition")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://albionpropertyhub.com/')} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Website</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            console.log("catch in renderFooter_Item : ", error);
        }
    }

    useEffect(() => {
        if (!netInfo_State) {
            const interval = setTimeout(() => {
                if (Platform.OS === 'android') {
                    common_fn.showToast("can't connect.Please Check Your Internet Connection");
                } else {
                    alert("can't connect.Please Check Your Internet Connection")
                }
            }, 500);
            return () => {
                clearInterval(interval);
            };
        }
    }, [netInfo_State]);


    return (
        <View style={styles.container}>
            {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ position: 'absolute', zIndex: 9999, width: '100%', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 45 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            }

            <View style={{ width: scr_width, height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                    data={loanData}
                    keyExtractor={(item, index) => item + index}
                    ListHeaderComponent={() => renderHeaderItem()}
                    // renderItem={({ item, index }) => renderLoanItem(item, index)}
                    ListFooterComponent={() => renderFooterItem()}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: animatedOpacityValue } } }],
                            { useNativeDriver: false },
                        )
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // width: scr_width,
        // height: scr_height,
        flex: 1,
        backgroundColor: 'white'
    }
});

//make this component available to the app
export default PropertyAdvice;
