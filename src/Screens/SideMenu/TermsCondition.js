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
import common_fn from '../../Config/common_fn';

const freeRentalData = [
    {
        'id': '0',
        'rent_img': Media.fill,
        'rent_title': 'Fill details online',
        'rent_subText': 'Fill in your details in a fully customized legal template'
    },
];


LogBox.ignoreAllLogs();

const TermsCondition = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);

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
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: scr_width }}>
                        <Image
                            source={{ uri: Media.about_banner }}
                            style={{
                                width: scr_width,
                                height: 220, resizeMode: 'contain'
                            }}
                        />
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>These "Terms of Use" constitute a legally binding agreement between you and Albion Investments & Holdings Private Limited (referred to as "the Company," "We," "Albionpropertyhub," or "Us") governing the use of the web application/website www.albionpropertyhub.com (referred to as "the Site") and any services offered by the Company through the Site (referred to as "the Service").</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Your use of the Site and its services is subject to the following "Terms & Conditions," which are hereby incorporated. By using the Site, you enter into a contractual agreement with Albion Investments & Holdings Private Limited, the platform owner. Familiarizing yourself with and understanding these terms & conditions is crucial before utilizing the platform.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>When utilizing any services provided by Us through the Platform (such as Product Reviews, Seller Reviews), you are bound by the rules, guidelines, policies, terms, and conditions applicable to those services. These are considered integral parts of these Terms.
                            Albionpropertyhub reserves the right to amend/modify these terms and conditions at any time, with such modifications becoming effective immediately upon posting on albionpropertyhub.com regularly reviewing the modified terms and conditions is recommended. Your continued access or use of Albionpropertyhub signifies your acceptance of these amended terms and conditions.</Text>

                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Defined Terms :</Text>
                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Unless otherwise specified, capitalized words have meanings as defined below: "Agreement" refers to the completed application form, its attachment(s), and the terms and conditions herein, deemed executed at New Delhi.
                                "Company" is Albion Investments & Holdings Private Limited, an existing Company under the Companies Act, 1956, with its corporate office at Level 5, Thamarai Tech Park, S.P Plot No: 16-19 & 20A, Thiru Vi Ka Industrial Estate, Inner Ring Road, Gunidy, Chennai, Tamilnadu – 600032, India. "Date of Commencement" indicates the acceptance date of the application by the User for the service.</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>"Date of Termination" is the expiration date specified in the notice or letter of termination. "www.albionpropertyhub.com" is the internet website or mobile application of the Company. "My Subscriptions" contains information about the Services provided by the Company. "Registration Data" is the database of particulars supplied by the User on initial application, including name, telephone number, address, account, and email address.
                                "User" includes Subscribers/Advertisers and Browsers/Visitors, whether individual or corporate.</Text>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Term : </Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>These Terms remain a valid and binding contract until the User continues to access the Site and use the Services provided by the Company.</Text>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Services : </Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company offers internet-based services through its platform, including property profile/listing, property search, print advertisements, online postings, and promotional messages. Services can be purchased through various payment methods, with specific policies governing subscription fees, payments, refunds, and cancellations.</Text>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Eligibility : </Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Users must be at least eighteen (18) years old and competent to enter into a valid and binding contract. Users under 18 may access the Service with parental or legal guardian involvement.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>PG Listing and PG Platform :</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Users are responsible for verifying the accuracy of PG listings, and the Company is not liable for any fraud or cheating resulting from incorrect listings. PG listings will be migrated to the new platform upon launch.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Subscription Fees :</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Subscription fees, as mentioned in "My Subscriptions" or prescribed by the Company, accrue from the Date of Commencement. Payment and refund policies apply, with interest charged on overdue amounts.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Payment & Refund Clause :</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Payments are non-refundable, with a 50% activation/administration fee. Refund processing may take 4 to 6 weeks. Refunds are subject to the Company's discretion.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Payment & Refund Clause:</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Payments are non-refundable, with a 50% activation/administration fee. Refund processing may take 4 to 6 weeks. Refunds are subject to the Company's discretion.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Owner’s Services:</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Owner’s Service fees are non-refundable. Refunds may occur if a property is not linked to the purchased package. If a User is not the property owner, the listing is deactivated without notification, and the paid amount is forfeited.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Charge Back Policy:</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Payments are on a 100% advance basis, non-refundable, and subject to the Company's discretion. Set-off rights against other amounts owed to the Company exist.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Cancellation:</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company may cancel/stop content publication, with applicable cancellation charges. Platinum listing packages are non-refundable, except for orders paid via cheque/demand draft before realization.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Security:</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>User transactions on the Site are secure. The Company is not liable for fraudulent transactions. Users must protect their password and user identification.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>Obligations and Representations of User/Subscriber:</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Users must provide accurate registration data, comply with notices, obtain required rights, handle taxes, maintain confidentiality of passwords, and notify the Company of unauthorized use. Users indemnify the Company for third-party claims resulting from posted information.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold', lineHeight: 20 }}>User Data:</Text>
                            <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Users grant the Company rights to exercise copyright and publicity rights over material or User Data displayed in listings. User Data is the property of albionpropertyhub.com.</Text>
                        </View>

                        <View style={{ marginVertical: 0 }}>
                            <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', textAlign: 'justify', lineHeight: 20 }}>These terms and conditions govern the use of Albionpropertyhub's platform, and users should review them carefully before utilizing the services provided.</Text>
                        </View>

                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Prohibited Actions :</Text>
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
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '100%', paddingVertical: 0, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users are prohibited from allowing any person other than the authorized person(s) named in the application form to use the Service. </Text>
                        </View>
                        {/* <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Users are strictly prohibited from allowing any person other than the authorised person(s) named in the application form to use the Service. We emphasise the importance of maintaining the security and integrity of user accounts.</Text> */}
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users undertake not to resell or assign their rights or obligations under these Terms & Conditions. Users also agree not to make any unauthorized commercial use of the Service. </Text>
                        </View>
                        {/* <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Users must not resell or assign their rights or obligations under these Terms & Conditions. Additionally, any unauthorised commercial use of the Service is strictly forbidden. The Service is intended for personal use and should not be exploited for commercial purposes.</Text> */}
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall use the Service only for the purpose for which it is subscribed. </Text>
                        </View>
                        {/* <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>The Service should only be used for the purpose for which it is subscribed. Users are required to adhere to all applicable laws of India related to the Services, including any regulations enacted under these laws.</Text> */}
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall comply with all applicable laws of India relating to the Services, including any regulation made pursuant thereto. </Text>
                        </View>
                        {/* <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Users shall not print, download, duplicate, or otherwise copy, delete, vary, or amend any data or personal information posted by any other User on the Site, except for their own data and information. Respecting the privacy and data security of others is a fundamental principle.</Text> */}
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not print, download, duplicate, or otherwise copy, delete, vary, amend, or use any data or personal information posted by any User on the Site except such data and information posted by the particular User. </Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not use the Service for any unlawful and fraudulent purpose.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>The Service shall not be used to send or receive any offensive messages on moral, religious, racial, or political grounds or of an abusive, indecent, obscene, defamatory, or menacing nature.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users are prohibited from selling their listing to any third or unrelated party. The services are meant for consumption by the User who has paid the subscription amount.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users are prohibited from posting any information or content on the Site that directly or indirectly causes any threat, harassment, annoyance, anxiety, or any other inconvenience.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not infringe intellectual property rights of any person/party and/or retain information with an intention to do so.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users agree not to make use of anyone else's information other than as necessary to complete any transactions in which the User is involved.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not violate the security of the Site, attempt to gain unauthorized access, or introduce any harmful components into the internet or Site network system.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>In the event of a User breaching any of the above covenants, the Company has the right to delete any material related to the violations, suspend or deactivate the User's access to the Site Service, and take legal action to recover any loss suffered.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall avail Services on albionpropertyhub.com or any other related site for lawful purposes alone, and transmission or distribution of material or conduct in violation of any applicable law is prohibited.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>The Company strongly opposes spam and prohibits any activities facilitating spam on albionpropertyhub.com.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not engage in activities like "deep-linking," "page-scraping," or any other method to access, acquire, copy, or monitor any portion of the Site without written consent from the Company.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not attempt to gain unauthorized access to any portion of the Platform or engage in advertising or solicitation to other Users.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not host, display, upload, modify, publish, transmit, or share any information on the Site that violates any law, infringes intellectual property rights, or is harmful in any manner.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not use the Platform to send or post spam or drive visitors to their site through spam.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not use any automated devices or methodologies to access or monitor the Site without written consent from the Company.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not attempt to gain unauthorized access to any portion of the Platform through hacking or other illegitimate means.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not engage in advertising or solicitation to other Users related to services displayed on the Site.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>The content posted by Users does not necessarily reflect Company views, and the Company is not responsible for any claims, damages, or losses resulting from such content. </Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users agree not to host, display, upload, modify, publish, transmit, or share any information that belongs to another person without the user's right.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Users shall not engage in any activity that deceives or misleads others or violates any law or regulation. </Text>
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
                <View style={{ width: '98%', height: height, alignItems: 'center', backgroundColor: 'white' }}>


                    <View style={{ width: '100%', padding: 10, marginTop: 10 }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Use of Information/Data Supplied:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company has the right to use, for its own purpose, any data or information supplied by the User in connection with this Agreement. All copyright, know-how, and other related intellectual property rights to the Services of albionpropertyhub.com become the sole and exclusive property of the Company. The Company retains all data or information supplied by the User for the exclusive use of the Company, even after termination of the Agreement. The User gives express consent to receive alerts, promotional SMS, and calls to the mobile number entered on albionpropertyhub.com.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Intellectual Property Rights:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>All logos, brands, trademarks, and service marks appearing on albionpropertyhub.com are properties owned or used under license by albionpropertyhub or its associates. The User is granted a limited, non-exclusive, non-assignable, revocable license to access and use the Services in compliance with the terms and conditions of the Agreement. The User has no right to use the Site's trade names, trademarks, service marks, logos, domain names, or any other distinctive brand features without express agreement.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Confidentiality:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Confidential Information includes all financial, commercial, technical, operational, and other information related to the Project/property or the Company. The Receiving Party shall keep confidential and not disclose the Confidential Information to any third party without prior written permission from the Disclosing Party. The User agrees not to use, reproduce, or store Proprietary Information without prior written permission, except as required by applicable law. Upon request, the Receiving Party shall deliver back to the Disclosing Party all original documents, records, and material containing Proprietary Information. The obligations of confidentiality continue to be in force even after termination of the Agreement. Information submitted by the User becomes the property of the Company but is kept strictly confidential, and the Company shall not release such data without the User's consent. The Company exclusively holds the right to modify, vary, or change the terms and conditions outlined herein and in the Services guide at any time. Periodic updates to this Agreement will be made, and the Terms of Use may be altered, with the revised Agreement posted on Albionpropertyhub.com. Users are advised to regularly check the site for the latest Terms of Use. Continued use of the Service affirms the User's acceptance of the amended terms and conditions.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Discontinuation or Modification of Services:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company reserves the unilateral right to add, change, delete, or terminate the Service at any time, with or without notice to the User. Except for paid services, a pro-rated refund will be issued for the remaining unused period. The Company bears no liability to the User or any third party if the Service is modified or discontinued.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Maintenance:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>At its sole discretion and without assigning any reason, the Company may deactivate or suspend the Services for system maintenance, upgrades, testing, repairs, or related work. The Company shall not be liable for any loss, damage, costs, or expenses incurred by the User due to such deactivation or suspension.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Third-Party Links and Resources on Our Website:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The content of linked websites, services, goods, or advertisements is not controlled by Us. We are not responsible for the availability, content, accuracy, or privacy practices of external sites. Hyperlinks are provided for convenience, and their inclusion does not imply endorsement. Users access third-party sites at their own risk.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Third-Party Services:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company may recommend, provide access to, or enable third-party software, applications, products, or services. Users engage with Third Party Services at their own risk. The Company does not control or advise on commercial terms between users and Third Party Providers. Company disclaims any warranties regarding Third Party Services and is not responsible for their performance or any resulting damages.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Termination:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Either party may terminate this Agreement with 30 days' written notice. The Company, at its discretion, may waive the notice period or accept a shorter notice. The Company may terminate the Agreement immediately without notice for reasons including User breach, regulatory decisions, bankruptcy, or compromise with creditors.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Liabilities upon Termination:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Upon termination, the User is liable for Subscription Fees until the Date of Termination. Amounts due must be paid within 30 days of the termination date.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Suspension of Service:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Failure to pay amounts due may result in the suspension of Services, deemed terminated. The Company may reconnect the Service upon subsequent payment, subject to its discretion and terms.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Money Back Policy:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Users unsatisfied with Money back Package responses can initiate a refund through the Feedback link or specified contacts. Refunds, applicable within 60 days of posting, require the same Order ID and Customer Name, processed within 30 business days after document acceptance.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Violation of Terms & Conditions:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company may pursue legal remedies, including content deletion, account cancellation, and exclusion of violators. Cooperation with investigations by authorities is assured.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Personal Information:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Submission of personal information is governed by our Privacy Policy.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Errors, Inaccuracies, and Omissions:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>We reserve the right to correct errors, inaccuracies, or omissions in Service information without prior notice. No obligation exists to update information, except as required by law.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Disclaimer:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>User agrees that Service use is at their sole risk. The Company disclaims all warranties, and the Service is provided on an "as is" basis. No warranty is made regarding Service meeting User requirements, being uninterrupted, timely, secure, or error-free.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Additional Disclaimers:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Various disclaimers cover issues such as data corruption, interruptions due to maintenance, and the Company's role as an intermediary.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Limitation of Liability:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company's total liability is limited to fees or charges paid by the User two months before the incident. The Company is not responsible for third-party services or any damages arising from Service use.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Indemnification:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Users agree to indemnify and hold the Company harmless from claims arising from Third Party Services or relationships with Third Party Providers.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>RERA Compliance:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Advisers must provide RERA registration for promoting registered projects. Albionpropertyhub is a platform for advertising and is not involved in transactions between Sellers and Users.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>General Clauses:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Several general clauses cover user disputes, company liability limitations, and the intermediary role of albionpropertyhub.com</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Limitation of Liability:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The User acknowledges and agrees that neither the Company nor its affiliated companies, directors, officers, or employees shall be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages. This includes damages resulting from the use of, or inability to use, the service; costs of procuring substitute goods or services; goods, data, information, or services purchased or obtained through the service; and unauthorized access to or alteration of user transmissions or data.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Indemnity:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The User further agrees that the Company shall not be liable for damages arising from the interruption, suspension, or termination of the service, whether justified or not, and whether due to negligence, intentional acts, inadvertence, or advertence. The Company disclaims responsibility for statements or conduct of any third party using the service.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Summary of Limitation of Liability:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>In summary, under no circumstances shall the Company's total liability to the User for all damages, losses, or causes of action exceed the amount paid by the User to the Company, if any, related to the cause of action.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Company's Disclaimer on Service Shortages:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company assumes no responsibility or liability for service shortages or non-fulfillment due to technical failure, malfunction, or other reasons. In such cases, the User agrees not to claim any rights, damages, or relief against the Company under consumer protection laws or any other applicable laws.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>User's Personal Costs Disclaimer:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company is not liable for costs incurred by the user, including downloading fees by third parties, airtime, ISP connection costs, etc., which are to be borne personally by the user. The Company disclaims responsibility for any malfunctioning or non-functioning of mobile phones, applications, or any resulting damage or loss, whether direct or indirect, from using the Albionpropertyhub mobile application.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>User's Indemnification Agreement:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The User agrees to indemnify, hold harmless, and settle any third-party lawsuits or proceedings against the Company, its directors, employees, or Key Management Personnel (KMP). This indemnity covers claims arising from wrongful or unauthorized posting of property, infringement of third-party rights, or any violation of agreements or laws applicable in India. The User further indemnifies the Company from any claims, actions, demands, liabilities, or losses arising from their use of Albionpropertyhub, whether directly or indirectly.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Notice</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>All notices must be sent to the User's address identified on the Application Form or to the Company's specified address. Notice is deemed given upon receipt, with acknowledgment or verification of receipt from an overnight courier.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Grievance Redressal Mechanism:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Complaints or concerns about content, comments, or breaches of terms should be immediately reported to the designated Grievance Officer via writing or email. The Grievance Officer's details are provided on the website.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Non-exclusive Remedy:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Termination or expiration of this Agreement does not limit parties from pursuing other remedies, nor does it relieve the obligation to pay fees due through the termination date.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Waiver:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company's failure to enforce any right or provision in these Terms & Conditions does not constitute a waiver. If any provision is found invalid, the parties agree that the court should give effect to their intentions, and other provisions remain in full force.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Entire Agreement:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>This Agreement constitutes the complete and exclusive agreement between the parties, superseding prior agreements. Modifications or waivers require a written document executed by the Company.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Governing Law and Jurisdiction:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>There is no agency, partnership, joint venture, employee-employer, or franchiser-franchisee relationship between the Company and the User. The User agrees that any claim or cause of action must be filed within 30 days. This Agreement is governed by Indian law, with disputes subject to the exclusive jurisdiction of the courts in Chennai.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Acknowledgment and Acceptance of Terms and Conditions:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Completing the registration process and checking the "I have read and accept the Terms of Use" box indicates the User's acceptance of the entire agreement.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Privacy Policy:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company respects user privacy and is committed to its protection. Users are encouraged to review the Privacy Policy for details.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>PropWorth Disclaimer:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Information and opinions on the website/App are general guidelines, not legal, financial, or real estate advice. Users should seek independent advice before making decisions. The Company is not liable for any loss or damage incurred.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Complimentary Times Prime Lite Subscription (Quarterly):</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Users eligible for the subscription must have an Indian mobile connection. The Company does not control the terms between users and Times Internet Limited. In case of subscription activation issues, the user may receive a free boost for their property.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Legal Metrology Disclaimer:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Users must indicate property area in the standard unit of measurement under the Legal Metrology Act, 2009. The Company is not liable for user infringement of this law.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>RERA Disclaimer:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Project developers, builders, and Real Estate Agents are required to comply with RERA Act 2016. The Company does not guarantee their compliance, and users should refer to respective RERA websites for complete information.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Rent Agreement Disclaimer:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company acts as a facilitator between users/tenants and landlords and does not act as an agent. Users are responsible for stamp duty, legal compliance, and any tax liability. The Company is not involved in the resolution of disputes between users/tenants and landlords.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Cancellation & Refunds:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Orders cannot be cancelled or refunded. In exceptional cases, the Company may assess and provide a resolution without liability except for the refund of the amount paid by the user.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Home Loans:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>User/Customer hereby agrees to accept these terms and conditions and authorizes Albionpropertyhub, hereafter referred to as the "Company," (through its representatives) and Financial Institutions (through their representatives) to contact the User (through call/phone, email, SMS, other online modes, display, notifications) if the User has opted for Home Loan service through the company portal, tele calling, or any other means.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The loan sanction/disbursal process, decision, and timelines are at the sole discretion of the financial institutions to whom the application is submitted. The company acts as a third party, facilitating the collection and submission of relevant documents from the User to the financial institution, offering process support and advisory on a best-efforts basis. If the loan is not sanctioned/approved or disbursed, or if there is a delay in the process by the Financial Institution, even after the company's recommendation based on the User's information, the company shall not be responsible or liable for the same, including the refund of processing fees or any other form of fees or payment, if paid by the User to the Financial Institution.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>All interest rates/EMI/tenures/fees/eligibility/offers, etc., displayed on the company portal are indicative only. The actual rates/offers depend on the Financial Institutions' assessment of the Users' profile and may differ for different Users. The company neither confirms nor guarantees the loan sanction or the quality of services provided by the Financial Institutions. Calculations in the company's calculators are approximate, and the actual eligibility, EMI, rates of interest, payment schedule, offers, etc., depend on the Financial Institutions' assessment.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The User understands that the Company does not collect any payment for home loan services. Any payments, where applicable, are required to be made directly to the financial institutions, and the company shall not be liable for any cash/direct payments made to the Financial Institution or the Company's employees.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The company is not obligated to examine, inquire into, or pass upon the validity, effectiveness, or correctness of any information or documents provided. The company assumes the information's validity and correctness, and if found untrue, the User's loan application can be rejected by the Bank at its sole discretion.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Confidential information voluntarily revealed by the User is done at the User's sole discretion and risk. If such information is misused or results in unsolicited messages from third parties, the company accepts no responsibility or liability. The company may share User information with Financial Institutions, brokers/agents/builders to fulfill User's requirements and further process. The company has the right to retain a copy of information shared by the User in its system, subject to the company's privacy policy.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The company is not responsible for mediating disputes between the User and Financial Institutions. Users must indemnify the company in case of any loss/liability due to disputes. Information related to Financial Institutions and their offerings is gathered from public sources and may change without notice. Users are responsible for verifying such information directly from the Financial Institutions.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Third-party offers and promotions displayed on the company portal are for information and marketing purposes. The company does not warrant or endorse these offerings and is not responsible for their accuracy. Fulfillment services, including document submission to financial institutions, are available in limited cities and for limited User profiles. These services can be changed, suspended, or made temporarily unavailable without notice.</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Home loans are governed by regulations and policies laid down by the Reserve Bank of India. The User is advised to stay informed of developments in home loans. Albionpropertyhub is not liable for any act or omission on the part of the User or the financial institution. These terms and conditions apply to home loans, loan against property, balance transfer of home loans, and top-up loans.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Cancellation and Refund Policy – Vastu Consultancy Services:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Any cancellation or rescheduling made 48 hours (two days) or earlier prior to the scheduled service day is eligible for a 100% refund to the User from the Company. For cancellations or rescheduling within 24 hours (one day) before the service day (excluding the day of service), the User is eligible for a 50% refund from the Company. Cancellations made on the day of the visit or after the visit has concluded will not be eligible for any refund. In cases of unfulfilled services or lapses in service quality, the Company will assess and provide the best resolution possible, with a refund of the amount paid by the User if necessary.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Terms and Conditions - Vastu Consultancy Services:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Albionpropertyhub Realty Services Limited, referred to as the "Company," is an online portal connecting Users and Service Providers for Vastu consultancy services. The Company is not an agent of either the User or the Service Provider, and the transaction is on a principal-to-principal basis. User information voluntarily provided is subject to the Company's Privacy Policy, and the Company reserves the right to change terms without notice. While the Company screens Service Providers, it cannot be held liable for service quality guarantees. Users must address concerns with the Service Provider, and the Company will make efforts to assist but is not directly liable for service quality grievances. The Company is not responsible for any effects of advice on the User and is not a party to disputes between User and Service Provider.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Cancellation and Refund Policy - Pay Rent:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Cancellation made before sharing any documents/details with the Service Provider is eligible for a 100% refund. Cancellation after sharing documents/details is eligible for a 50% refund. In rare instances of unfulfilled services or lapses in service quality, the Company will assess and provide the best resolution, with no liability except a refund if necessary.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Terms and Conditions - Pay Rent:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company connects Users with Legal Service Providers on a principal-to-principal basis. Users must address concerns with the Service Provider, and the Company is not directly liable for service quality grievances. The Company is not a party to disputes between User and Service Provider, and Users shall indemnify the Company.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Cancellation and Refund Policy - Packers & Movers:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Cancellation up to 48 hours before service delivery is eligible for a 100% refund. Cancellation within 0-48 hours of service delivery is not eligible for any refund. Rescheduling may attract fees based on the timing of the request.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Terms and Conditions - Packers & Movers:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company partners with Service Providers for Packers & Movers services on a principal-to-principal basis. Users are advised to do due diligence before engaging with Service Providers, and the Company is not liable for their services. Quotation amounts may change based on User-provided details, and the Company reserves the right to modify terms.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Cancellation and Refund Policy - Guaranteed Tenant Plan:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Owner can cancel within 5 working days of activation for a full refund with no bonuses. After 5 working days, no cancellation is permitted, and no refunds or bonuses will be provided. The refund is processed based on rent brackets with bonus amounts.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Terms and Conditions - Guaranteed Tenant Plan:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>The Company acts as a facilitator between Owner, Tenant, and Service Provider on a principal-to-principal basis. Owners must cooperate during the site visit and conduct police verification of tenants. The Company is not liable for service quality issues and is not a party to disputes between Owner, Service Provider, and Tenant.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10, }}>
                        <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Dispute Resolution:</Text>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Disputes shall be referred to a sole Arbitrator, and the decision is binding, with arbitration governed by the Arbitration & Conciliation Act, 1996, in Delhi.</Text>
                    </View>


                    <View style={{ width: '100%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Contact Us</Text>

                        <Text style={{ width: '95%', fontSize: 16, color: '#666', fontFamily: 'Poppins-Regular', paddingTop: 10 }}>For any other queries and feedback can reach us with below address </Text>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'phone-call'}
                                    icon_size={22}
                                    iconstyle={{ color: primarycolor }}
                                />
                            </View>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>+91 94422 03866</Text>
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
                            <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>support@albionpropertyhub.com</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: Media.albionlogo }}
                                style={{ width: 60, height: 60, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 19, color: primarycolor, fontFamily: 'Poppins-SemiBold' }}>Albion Bank Auctions Pvt Ltd</Text>
                            <Text style={{ width: '95%', textAlign: 'justify', fontSize: 14, color: '#666', fontFamily: 'Poppins-SemiBold' }} numberOfLines={2} >India’s No.1 Property Site is now a Superband</Text>
                        </View>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 30 }}>
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
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 40 }}>
                            <TouchableOpacity onPress={() => navigation.replace("TermsCondition")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(e) => {
                                Linking.openURL('https://albionpropertyhub.com/');
                            }}
                                style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
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

    return (
        <View style={styles.container}>
            <StatusBar
                hidden={false}
                backgroundColor={primarycolor}
                translucent={false}
                barStyle='dark-content'
                networkActivityIndicatorVisible={true} />

            {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ position: 'absolute', zIndex: 9999, width: '100%', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 45 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            }

            <View style={{ width: '100%', height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                    data={freeRentalData}
                    keyExtractor={(item, index) => item + index}
                    ListHeaderComponent={() => renderHeaderItem()}
                    renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
                    ListFooterComponent={() => renderFooterItem()}
                    style={{ width: '95%' }}
                    showsVerticalScrollIndicator={false}
                />
            </View>

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

//make this component available to the app
export default TermsCondition;
