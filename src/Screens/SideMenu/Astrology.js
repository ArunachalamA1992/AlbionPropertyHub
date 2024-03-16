import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet, Text, Animated, View, FlatList, TextInput, Keyboard, ScrollView, Image, StatusBar,
    TouchableOpacity, Alert, Platform, UIManager, LayoutAnimation, LogBox, Linking
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { primarycolor } from '../../Utils/Colors';
import Color from '../../Config/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import { BottomSheet } from 'react-native-btr';


const freeRentalData = [
    {
        'id': '0',
        'rent_img': Media.fill,
        'rent_cost': '1499',
        'rent_subs': '1999',
        'rent_title': 'Know Your Property Value',
        'rent_subone': 'Get instant Professional help online to solve all your legal queries',
        'rent_subtwo': 'Option to discuss all your legal queries and advise on the way forward'
    },
];

const cityData = [
    {
        'id': '0',
        'city_name': 'Coimbatore'
    },
    {
        'id': '1',
        'city_name': 'Erode'
    },
    {
        'id': '2',
        'city_name': 'Salem'
    },
    {
        'id': '3',
        'city_name': 'Tiruppur'
    },
    {
        'id': '4',
        'city_name': 'Chennai'
    },
    {
        'id': '5',
        'city_name': 'Tiruchy'
    },
    {
        'id': '6',
        'city_name': 'Madurai'
    },
];


LogBox.ignoreAllLogs();

const Astrology = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);
    const [selectCitybottomSheetVisible, setSelectCitybottomSheetVisible] = useState(false);
    const [selectcity, setselectcity] = useState('Select City');
    const [selectCityItem, setSelectCityItem] = useState('');


    useEffect(() => {
        try {
            const unsubscribe = NetInfo.addEventListener(state => {
                setNetinfo(state.isConnected)
            });
            return () => unsubscribe;

        } catch (error) {
            console.log("catch in use_effect's Free_rental : ", error);
        }
    }, []);

    function renderHeaderItem() {
        try {
            return (
                <View style={{ width: scr_width }}>
                    <View style={{ width: scr_width, height: 220, marginVertical: 3 }}>
                        <Image
                            source={{ uri: Media.astro_banner }}
                            style={{ width: scr_width, height: '100%', resizeMode: 'cover' }}
                        />
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10 }}>
                        <View style={{ width: '95%', marginTop: 20 }}>
                            <Text style={{ fontSize: 24, color: primarycolor, fontFamily: 'Poppins-SemiBold' }}>Albion's Property Astrology:</Text>
                            <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Guiding Your Property Journey with Cosmic Insights</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify' }}>Albion is thrilled to introduce our Property Astrology service, a unique collaboration with the top astrologers in your city. We understand that buying or selling property is not just a financial decision; it's an emotional journey. With Property Astrology, you can now gain profound insights into how the cosmic forces align with your property aspirations.</Text>
                        </View>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 10 }}>
                        <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Why Choose Property Astrology ?</Text>

                        <View style={{ width: '95%', paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Personalized Guidance : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Our network of experienced astrologers specializes in property-related astrology. They provide personalized insights based on your birth chart and property goals.</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Astrological Compatibility : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Discover properties that resonate with your astrological profile, enhancing your connection to your new home or investment.</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Timing Matters : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Property Astrology helps you identify auspicious times for property-related decisions, such as buying, selling, or moving.</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Minimise Risks : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Astrological guidance can help you anticipate potential challenges or setbacks in your property journey, allowing you to prepare and mitigate risks.</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Peace and Harmony : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Align your property choices with the positive energies of the universe, fostering harmony and prosperity in your living space.</Text>
                        </View>

                    </View>

                </View>
            );
        } catch (error) {
            console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
        }
    }


    function renderFooterItem(item, index) {
        try {
            return (
                <View style={{ width: '100%', height: height, alignItems: 'center', backgroundColor: 'white' }}>

                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', paddingVertical: 10, fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>The Valuation Report: Your Key to Informed Decisions</Text>
                        <Text style={{ width: '95%', paddingVertical: 10, fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Whether you're buying or selling, Albion's Property Valuation Partner equips you with the valuation report you need to make informed property decisions. These reports provide you with a clear and accurate picture of a property's worth, empowering you to navigate the real estate market with confidence.</Text>
                    </View>

                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Contact Us</Text>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'phone-call'}
                                    icon_size={22}
                                    iconstyle={{ color: primarycolor }}
                                />
                            </View>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', paddingHorizontal: 10 }}>+91 94422 03866</Text>
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
                            <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', paddingHorizontal: 10 }}>support@albionpropertyhub.com</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 40 }}>
                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: Media.albionlogo }}
                                style={{ width: 70, height: 70, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 17, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Albion Bank Auctions Pvt Ltd</Text>
                            <Text style={{ width: '95%', textAlign: 'justify', fontSize: 14, color: '#666', fontFamily: 'Poppins-SemiBold' }} numberOfLines={2} >India’s No.1 Property Site is now a Superband</Text>
                        </View>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 20 }}>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.replace("AboutUs")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>About Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.replace("PrivacyPolicy")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => navigation.replace("TermsCondition")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://albionpropertyhub.com/')} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Website</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            );
        } catch (error) {
            console.log("catch in renderFooterItem's Free_rental : ", error);
        }
    }



    /* ****************************************************  SELECT CITY BOTTOM SHEET ****************************************************** */

    function selectCity_toggleBottomView() {
        try {
            setSelectCitybottomSheetVisible(!selectCitybottomSheetVisible);
        } catch (error) {
            console.log('catch in Home_interior selectCity_toggleBottomView :', error);
        }
    }

    function selCity_BottomSheetmenu() {
        try {
            return (
                <View>
                    <BottomSheet
                        visible={selectCitybottomSheetVisible}
                        onBackButtonPress={selectCity_toggleBottomView}
                        onBackdropPress={selectCity_toggleBottomView}
                    >
                        <View style={{
                            backgroundColor: 'white', width: '100%', height: 350,
                            minHeight: 200, alignItems: 'center', borderTopStartRadius: 30, borderTopEndRadius: 30
                        }}>
                            <View style={{ width: '100%', flexDirection: 'row', padding: 15, paddingStart: 30, backgroundColor: '#FBE9EF', justifyContent: 'space-between', alignItems: 'center', borderTopStartRadius: 30, borderTopEndRadius: 30 }}>
                                <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Select City</Text>
                                <TouchableOpacity onPress={() => setSelectCitybottomSheetVisible(false)}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'closecircleo'}
                                        icon_size={22}
                                        iconstyle={{ color: primarycolor, marginRight: 10, }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={cityData}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index }) => renderCityItem(item, index)}
                                style={{ width: '95%' }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </BottomSheet >
                </View >
            );
        } catch (error) {
            console.log('catch in Home_interior selCity_BottomSheet_menu :', error);
        }
    }


    function renderCityItem(item, index) {
        try {
            return (
                <View style={{ width: '95%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => selectCity(item)}
                        style={{ width: '100%', alignItems: 'center', padding: 15, backgroundColor: selectCityItem === item.city_name ? primarycolor : 'white' }}>
                        <Text style={{ fontSize: selectCityItem === item.city_name ? 16 : 14, color: selectCityItem === item.city_name ? 'white' : 'black' }}>{item.city_name}</Text>
                    </TouchableOpacity>
                    <View style={{ width: '95%', height: 1, backgroundColor: '#666', marginVertical: 1 }}></View>
                </View>
            );
        } catch (error) {
            console.log('catch in Home_interior renderCity_Item :', error);
        }
    }

    function selectCity(item, index) {
        try {
            setselectcity(item.city_name);
            setSelectCityItem(item.city_name);
            setSelectCitybottomSheetVisible(false);
        } catch (error) {
            console.log('catch in Home_interior select_City :', error);
        }
    }

    /* ****************************************************  SELECT CITY BOTTOM SHEET ****************************************************** */



    return (
        <View style={styles.container}>
            <StatusBar
                hidden={false}
                backgroundColor={primarycolor}
                translucent={false}
                barStyle='dark-content'
                networkActivityIndicatorVisible={true} />

            {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ flex: 1, position: 'absolute', zIndex: 9999, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 0 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            }


            <View style={{ width: scr_width, height: height, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                    data={freeRentalData}
                    keyExtractor={(item, index) => item + index}
                    ListHeaderComponent={() => renderHeaderItem()}
                    // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
                    ListFooterComponent={() => renderFooterItem()}
                    style={{ width: '95%' }}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {selCity_BottomSheetmenu()}

        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        // width: scr_width,
        // height: scr_height,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }

});


export default Astrology;
