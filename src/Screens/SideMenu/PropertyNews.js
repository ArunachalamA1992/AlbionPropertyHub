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
        'news_img': Media.fill,
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_title': 'Agra Airport Set for Expansion, UP Govt Gives Clearance',
        'news_subTitle': 'Agra Airport is set for an expansion. The airport will be expanded on the lines of Jewar and Ayodhya Airport. September 14, 2023: The Uttar Pradesh government has approved the provision of Agra Airport expansion on an international category on the lines of Noida (Jewar) and Ayodhya. The government has approved a budget of Rs 123.9 crore for additional land acquisition. An additional 100 acres of land will be acquired for the expansion. Currently, civil airlines operate from the airport base only. The airport will be expanded under the Gati Shakti Mission, as the expansion has been pending for years. The new terminal building of Agra Airport is expected to start operations in the next 36 months. The Airports Authority of India (AAI) has already floated the tenders for structural engineering.'
    },
    {
        'id': '1',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.fill,
        'news_title': 'Tamil Nadu Government Allocates Rs 79 Crores to Build 1500 Houses for Tribals',
        'news_subTitle': 'Chennai, September 4, 2023: On Saturday, September 2, 2023, the Tamil Nadu Government approved the allocation of Rs 7928 Crores for the construction of houses. The initial cost of developing homes was supposed to be around Rs 45 Crores. However, over the period of time, the cost of construction estimates increased to Rs 79 Crores. '
    },
    {
        'id': '2',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.fill,
        'news_title': 'Chhattisgarh Govt. Approves Housing Provision for Over 6.9 Lakh Houses Under PMAY Gramin Scheme',
        'news_subTitle': 'Chhattisgarh Government approves the housing provision of over 6.9 lakh houses for 6,99,439 eligible PMAY beneficiaries. The decision for the scheme implementation was taken in the Cabinet Assembly Meeting. Also, the government plans to cover the entire construction cost of 47,000 houses for the homeless using the allocated funds of Rs.100 crore in 2023-24 budget.'
    },
    {
        'id': '3',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.fill,
        'news_title': 'Home Loan Lenders Urge RBI to Increase Priority Sector Lending limit to reflect Real Property Prices',
        'news_subTitle': 'In a recent development, lenders from across the country have reached out to the Reserve Bank of India (RBI) to double the housing loan amount to be considered for Priority Sector Lending. Under the existing norms, a housing loan up to Rs 35 lakhs in a metropolitan city is considered as priority sector lending. It is necessary for the banks to meet the priority sector lending targets.'
    },
    {
        'id': '4',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.fill,
        'news_title': 'Bangalore Metro Rail Commissioner to Inspect Baiyappanahalli-KR Puram Stretch on September 7',
        'news_subTitle': 'Bangalore: The CMRS (Commissioner of Metro Railway Safety) inspection for the long-awaited Namma metro stretch between Baiyappanahalli-KR Puram is scheduled for September 7. Once the inspection of this purple line metro stretch is done successfully, this stretch will be operational after a few days. '
    },
    {
        'id': '5',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.fill,
        'news_title': 'Westbridge Capital MD Buys a Luxury Sea-View Apartment Worth Over Rs.96 Cr. in Worli, Mumbai',
        'news_subTitle': 'WestBridge Capital Co-Founder and Managing Director purchases a luxury apartment worth over Rs.96 crore in Mumbai. The property is located in Worli, one of the posh areas of Mumbai. The amount of stamp duty and registration charges paid for the property is around Rs.3.59 crore.'
    },
    {
        'id': '6',
        // 'news_img': require('../../assets/sideMenu/PackersMovers/legal.jpg'),
        'news_img': Media.fill,
        'news_title': 'Expert Panel Suggests Measures to Revive Stalled Real Estate Projects',
        'news_subTitle': 'An expert panel, led by former NITI Aayog chief Amitabh Kant, has proposed a series of measures to rejuvenate stagnant real estate projects in the country. Here are the key recommendations outlined in the committees report: '
    },


];

function PropertyNews() {

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
                    <View style={{ width: '73%', paddingVertical: 5, justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                        <Text style={{ fontSize: 16, color: '#000', fontFamily: 'Poppins-SemiBold', lineHeight: 25 }} numberOfLines={2}>{item.news_title}</Text>
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
                <Text style={{ width: '90%', fontSize: 18, color: '#333', paddingHorizontal: 5, fontFamily: 'Poppins-SemiBold' }}>Latest Property News</Text>

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



export default PropertyNews;