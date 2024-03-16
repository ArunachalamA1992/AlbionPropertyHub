import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet, Text, Animated, View, FlatList, TextInput, Keyboard, ScrollView, Image, StatusBar,
    TouchableOpacity, Alert, Platform, UIManager, LayoutAnimation, LogBox
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { primarycolor } from '../../Utils/Colors';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { color } from 'react-native-elements/dist/helpers';
import Color from '../../Config/Color';
import { Media } from '../../Global/Media';
import common_fn from '../../Config/common_fn';


const propNewsData = [
    {
        'id': '0',
        'news_img': Media.legal_tax,
        'news_title': 'How to Perform Police Verification Online for Tenants',
        'news_subTitle': 'To find out whether you are renting out your property to the right people, you can always go for police verification online or offline. With police verification for tenants, you can perform a background check and verify your tenant’s identity to know if you are handing over your property to the right hands. '
    },
    {
        'id': '1',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.legal_tax,
        'news_title': 'Tenant Verification in Chennai - Online & Offline | Police Verification',
        'news_subTitle': 'Tenant verification is an essential step in the renting process. It ensures the safety of the property, occupants, and the owner. In Chennai, you may complete this verification either online or offline using the official police webpage.'
    },
    {
        'id': '2',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.legal_tax,
        'news_title': 'Best Home Loan Offers | With Cashback & No-Brokerage Benefits',
        'news_subTitle': 'Banks and other financial lenders provide home loan offers with varied loan amount, interest rates, repayment tenure, and application processes for borrowers. We help you compare these home loan offers and find the one that best fits your financial preferences. '
    },
    {
        'id': '3',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.legal_tax,
        'news_title': 'How to Pay Indore Property Tax?',
        'news_subTitle': 'Indore property tax is a state-levied tax by Madhya Pradesh Government. It is generally used by the Indore municipal corporation to maintain basic civic facilities in their jurisdiction. Property tax revenue is used to maintain roads, drainage systems, lighting, etc. It varies from city to city, state to state, and even within the same city from one circle to the next. Property tax has to be paid every year by the property owners.'
    },
    {
        'id': '4',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.legal_tax,
        'news_title': 'Income Tax Login - Step By Step Guide to Income Tax eFiling on property gains',
        'news_subTitle': 'The Income tax Department has officially released new Income Tax rates for Financial Year 2023-24 and 2024-25. Here are the updated income tax rates for taxpayers belonging to different income groups.'
    },
    {
        'id': '5',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.legal_tax,
        'news_title': 'What is Rent Agreement - Rent Agreement Sample Formats',
        'news_subTitle': 'If you want to rent out your property, it is important to have a rent agreement with your tenant. At times, landlords skip this formality and may end up having to pay a heavy price for it. Also, if you are looking to stay on rent yourself, make sure you sign a rent agreement so all terms and conditions of your house stay are clear.'
    },
    {
        'id': '6',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.legal_tax,
        'news_title': 'Gujarat Property Tax Payment - Online & Offline, Calculation, Rebates & More',
        'news_subTitle': 'Vadodara Municipal Corporation has confirmed that property tax bills for taxpayers in the city will be issued from 11th September 2023 for the financial year 2023-24. The authority has confirmed that the Gujarat property tax payments will start from the western zone of the city. The western zone of Vadodara consists of Wards 8 to 12. FInd below other dates for assessment register issuance and last payment dates for different wards.'
    },


];

function LegalTexationNews() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [selItem, setSelItem] = useState('');

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState(propNewsData);
    const [masterDataSource, setMasterDataSource] = useState(propNewsData);


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

    function selectNewsItem(item, index) {
        try {
            console.log("select item ============== : ", index);
        } catch (error) {
            console.log('catch in selectNews_Item : ', error);
        }
    }

    function renderNewsItem(item, index) {
        try {
            return (
                <TouchableOpacity activeOpacity={0.55} onPress={() => selectNewsItem(item, index)}
                    style={{ width: '100%', height: 150, flexDirection: 'row', alignItems: 'center', marginVertical: 10, backgroundColor: 'white', elevation: 3 }}>
                    <View style={{ width: 100, height: 100, padding: 5, justifyContent: 'center', alignContent: 'center' }}>
                        <Image
                            source={{ uri: item.news_img }}
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                    </View>
                    <View style={{ width: '73%', padding: 5, justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Poppins-SemiBold', lineHeight: 25 }} numberOfLines={2}>{item.news_title}</Text>
                        <Text style={{ fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingVertical: 2, lineHeight: 22 }} numberOfLines={4}>{item.news_subTitle}</Text>
                    </View>
                </TouchableOpacity>
            );
        } catch (error) {
            console.log('catch in renderNews_Item : ', error);
        }
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = propNewsData.filter(
                function (item) {
                    const propNewsData = item.news_title
                        ? item.news_title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return propNewsData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

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
            <StatusBar
                hidden={false}
                backgroundColor={primarycolor}
                translucent={false}
                barStyle='dark-content'
                networkActivityIndicatorVisible={true} />

            {/* {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ position: 'absolute', zIndex: 9999, width: '100%', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 45 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            } */}

            <View style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
                <View style={styles.incomeBoxConatiner}>
                    <TextInput
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                        underlineColorAndroid="transparent"
                        placeholder="Search here ...!"
                        style={styles.numberTextBox}
                    />
                    <Iconviewcomponent
                        Icontag={'Feather'}
                        iconname={'search'}
                        icon_size={24}
                        iconstyle={{ color: '#666', marginStart: 10 }}
                    />
                </View>
            </View>

            <View style={{ width: '100%', height: scr_height, alignItems: 'center', backgroundColor: 'white' }}>
                <Text style={{ width: '90%', fontSize: 18, color: '#333', paddingHorizontal: 5, fontFamily: 'Poppins-SemiBold' }}>Real Estate Legal & Texation News</Text>

                <View style={{ width: '100%', height: scr_height - 300, paddingVertical: 5 }}>
                    <FlatList
                        data={filteredDataSource}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item, index }) => renderNewsItem(item, index)}
                        style={{ width: '100%' }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: scr_width,
        height: scr_height,
        backgroundColor: 'white'
    },
    NumberBoxConatiner: {
        width: '95%',
        borderColor: Color.grey,
        marginVertical: 10,
        borderWidth: 1,
        paddingStart: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
    incomeBoxConatiner: {
        width: '90%',
        borderColor: Color.grey,
        marginVertical: 10,
        borderWidth: 1,
        paddingStart: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 50,
    },
    numberTextBox: {
        width: '85%',
        height: 50,
        color: Color.black,
        fontSize: 16,
        paddingHorizontal: 10,
        fontFamily: 'Poppins-SemiBold',
    },
    invalidLogin: {
        width: '90%',
        fontSize: 13, marginHorizontal: 10,
        fontFamily: 'Poppins-SemiBold',
        color: Color.red,
        paddingVertical: 5
    },
});


export default LegalTexationNews;