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
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import { BottomSheet } from 'react-native-btr';
import ExpandableComponent from '../../Utils/ExpandableComponent';


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

const CONTENT = [
    {
        isExpanded: true,
        category_name: 'How much does Advocate on Call cost?',
        subcategory: [
            { id: 1, val: 'The cost of Advocate on Call services varies based on the advocates expertise and the complexity of your query. You will receive pricing details before confirming the call.' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Are the calls with advocates recorded?',
        subcategory: [
            { id: 4, val: 'No, your calls with advocates are not recorded. They are strictly confidential and focused on addressing your specific legal concerns.' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Can I consult with multiple advocates before making a decision?',
        subcategory: [
            { id: 7, val: 'Yes, you can explore multiple advocates profiles and request calls with different advocates to find the one who best suits your needs.' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'What types of legal issues can I seek advice for through Advocate on Call?',
        subcategory: [
            { id: 10, val: 'You can seek advice on a wide range of legal matters, including property disputes, contract issues, family law, criminal matters, and more.' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Is Advocate on Call available 24/7?',
        subcategory: [
            { id: 10, val: 'Yes, Advocate on Call provides round-the-clock access to legal guidance, ensuring you are never alone when facing legal challenges' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'How quickly can I expect a call back from the advocate after requesting one?',
        subcategory: [
            { id: 10, val: 'Advocates typically respond promptly, aiming to call you back within a reasonable timeframe, often within minutes to a few hours.' },
        ],
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

const HowWorksData = [
    {
        'hw_id': '0',
        'hw_img': Media.prop_choose,
        'hw_sub': 'step-1',
        'hw_title': 'Easy Access',
        'hw_subtitle': 'Download the Albion app and navigate to the Advocate on Call section.',
    },
    {
        'hw_id': '1',
        'hw_img': Media.prop_share,
        'hw_sub': 'step-2',
        'hw_title': 'Choose Your Advocate',
        'hw_subtitle': 'Browse through our network of top advocates in your city. Each advocate profile includes their expertise, experience, and availability.',
    },
    {
        'hw_id': '2',
        'hw_img': Media.prop_report,
        'hw_sub': 'step-3',
        'hw_title': 'Request a Call',
        'hw_subtitle': 'Select your preferred advocate, provide a brief description of your legal query, and request a call.',
    },
    {
        'hw_id': '3',
        'hw_img': Media.prop_choose,
        'hw_sub': 'step-4',
        'hw_title': 'Connect Instantly',
        'hw_subtitle': 'Your chosen advocate will receive your request and call you back promptly. You can discuss your legal concerns in detail.',
    },
    {
        'hw_id': '4',
        'hw_img': Media.prop_share,
        'hw_sub': 'step-5',
        'hw_title': 'Get Guidance',
        'hw_subtitle': 'Receive expert legal advice, explore your options, and gain clarity on your situation.'
    },
    {
        'hw_id': '5',
        'hw_img': Media.prop_report,
        'hw_sub': 'step-6',
        'hw_title': 'Resolve with Confidence',
        'hw_subtitle': 'Armed with the guidance of our top advocates, you can confidently navigate your legal challenges and take the necessary steps to protect your interests.',
    },
];

LogBox.ignoreAllLogs();

const AdvocateOnCall = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);
    const [listDataSource, setListDataSource] = useState(CONTENT);
    const [multiSelect, setMultiSelect] = useState(false);

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



    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) =>
                placeindex === index
                    ? (array[placeindex]['isExpanded'] =
                        !array[placeindex]['isExpanded'])
                    : (array[placeindex]['isExpanded'] = false),
            );
        }
        setListDataSource(array);
    };


    function renderHeaderItem() {
        try {
            return (
                <View style={{ width: scr_width }}>
                    <View style={{ width: scr_width, height: 220, }}>
                        <Image
                            source={{ uri: Media.advoc_banner }}
                            style={{ width: scr_width, height: '100%', resizeMode: 'cover' }}
                        />
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10 }}>
                        <View style={{ width: '95%', marginTop: 20 }}>
                            <Text style={{ fontSize: 24, color: primarycolor, fontFamily: 'Poppins-SemiBold' }}>Albion's Advocate on Call:</Text>
                            <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Your Legal Lifeline</Text>
                        </View>
                        <View style={{ width: '95%', marginTop: 10 }}>
                            <Text style={{ fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify' }}>Albion is proud to introduce our Advocate on Call service, a revolutionary collaboration with the top legal minds in your city. We understand that legal concerns can arise at any moment, and having instant access to expert legal advice is crucial. With Advocate on Call, you can now have a trusted advocate at your fingertips, ready to provide guidance, answer questions, and offer solutions to your legal challenges.</Text>
                        </View>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginTop: 20 }}>
                        <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Why Choose Advocate on Call?</Text>

                        <View style={{ width: '95%', paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Expertise You Can Trust : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Our network of advocates comprises seasoned professionals with extensive experience across various legal domains. From property disputes to contract concerns, they have you covered.</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Immediate Assistance : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Legal matters can't always wait for office hours. With Advocate on Call, you can reach out for legal advice whenever you need it, 24/7.</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Confidential and Convenient : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Your conversations with our advocates are strictly confidential. You can discuss your legal issues openly, ensuring your privacy is protected.</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Cost-Effective Solutions : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Advocate on Call offers cost-effective legal guidance, helping you understand your options and make informed decisions without breaking the bank.</Text>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Peace of Mind : </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Whether you're a property owner, tenant, or business professional, knowing that legal support is just a call away provides invaluable peace of mind.</Text>
                        </View>

                    </View>

                </View>
            );
        } catch (error) {
            console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
        }
    }

    function renderFreeRentalItem(item, index) {
        try {
            return (
                <View style={{ width: '95%', alignSelf: 'center', alignItems: 'center', padding: 10, marginVertical: 10, borderRadius: 10, borderColor: '#34C38F', borderWidth: 2 }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold', textAlign: 'justify' }}>{item.rent_title}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={'check'}
                                icon_size={24}
                                iconstyle={{ color: '#239D0F' }}
                            />
                            <Text style={{ fontSize: 15, color: '#888', paddingHorizontal: 10, lineHeight: 25, fontFamily: 'Poppins-SemiBold', textAlign: 'justify' }} numberOfLines={2}>{item.rent_subone}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={'check'}
                                icon_size={24}
                                iconstyle={{ color: '#239D0F' }}
                            />
                            <Text style={{ fontSize: 15, color: '#888', paddingHorizontal: 10, lineHeight: 25, fontFamily: 'Poppins-SemiBold', textAlign: 'justify' }} numberOfLines={2}>{item.rent_subtwo}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 22, color: 'black', fontFamily: 'Poppins-Bold' }} >{item.rent_cost}</Text>
                            <Text style={{ fontSize: 15, color: '#666', fontFamily: 'Poppins-SemiBold', textDecorationLine: 'line-through', paddingHorizontal: 10 }}>{item.rent_subs}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 10 }}>
                            <TouchableOpacity activeOpacity={0.70} style={{ backgroundColor: '#34C38F', borderRadius: 10, padding: 8, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Poppins-SemiBold' }}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            console.log('catch in render FreeRental_Item : ', error);
        }
    }


    function renderFooterItem(item, index) {
        try {
            return (
                <View style={{ width: '100%', height: height, alignItems: 'center', backgroundColor: 'white' }}>


                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>How it works?</Text>

                        {
                            HowWorksData.map((item, index) => {
                                return (
                                    <View key={item.hw_id} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', margin: 2 }}>
                                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
                                            <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins-SemiBold', lineHeight: 25, textAlign: 'justify' }} numberOfLines={1}>{item.hw_sub}</Text>
                                            <Text style={{ fontSize: 16, color: '#000', fontFamily: 'Poppins-SemiBold', lineHeight: 25, textAlign: 'justify' }} numberOfLines={1}>{item.hw_title}</Text>
                                            <Text style={{ fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify' }}>{item.hw_subtitle}</Text>
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </View>
                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '100%', paddingVertical: 10, fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>The Valuation Report: Your Key to Informed Decisions</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Whether you're buying or selling, Albion's Property Valuation Partner equips you with the valuation report you need to make informed property decisions. These reports provide you with a clear and accurate picture of a property's worth, empowering you to navigate the real estate market with confidence.</Text>
                    </View>

                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', paddingVertical: 10, fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Frequently Asked Questions?</Text>

                        <View style={{ width: '100%' }}>
                            {listDataSource.map((item, key) => (
                                <ExpandableComponent
                                    key={item.category_name}
                                    onClickFunction={() => {
                                        updateLayout(key);
                                    }}
                                    item={item}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 18, marginTop: 10, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Contact Us</Text>

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

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
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


                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
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

                    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 20 }}>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.replace("AboutUs")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 3, textDecorationLine: 'underline' }}>About Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.replace("PrivacyPolicy")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 3, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => navigation.replace("TermsCondition")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 3, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://albionpropertyhub.com/')} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 3, textDecorationLine: 'underline' }}>Website</Text>
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
        flex:1,
        alignItems: 'center',
        backgroundColor: 'white'
    },

});


//make this component available to the app
export default AdvocateOnCall;
