import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet, Text, Animated, View, FlatList, TextInput, Keyboard, ScrollView, Image, StatusBar,
    TouchableOpacity, Alert, Platform, UIManager, LayoutAnimation, LogBox, Linking,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { primarycolor } from '../../Utils/Colors';
import Color from '../../Config/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import common_fn from '../../Config/common_fn';
import { Poppins } from '../../Global/FontFamily';

const freeRentalData = [
    {
        'id': '0',
        'rent_img': Media.fill,
        'rent_title': 'Fill details online',
        'rent_subText': 'Fill in your details in a fully customized legal template'
    },
];

const CONTENT = [
    {
        isExpanded: false,
        category_name: 'What are the key features and benefits of home loans?',
        subcategory: [
            { id: 1, val: 'Flexibility to choose a tenure' },
            { id: 2, val: 'Comparatively cheaper than personal loans' },
            { id: 3, val: 'Tax benefits' },
            { id: 3, val: 'Home loan balance transfer' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'What are the different types of home loans available?',
        subcategory: [
            { id: 4, val: 'Home loan for construction' },
            { id: 6, val: 'Home loan for renovation' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'What are the factors you should know before applying for a  home loan?',
        subcategory: [
            { id: 7, val: 'Making your credit score is good. Higher the score, the better.' },
            { id: 8, val: 'Check if you can afford to pay monthly EmIs from your current income.' },
            { id: 9, val: 'Research all the loan options available before finalizing an offer.' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'What are the different types of home loan fees and charges?',
        subcategory: [
            { id: 10, val: 'Processing fee' },
            { id: 11, val: 'Prepayment charges' },
            { id: 11, val: 'Loan conversion charges' },
            { id: 11, val: 'Logal and technical chargers' },
        ],
    },
];


LogBox.ignoreAllLogs();

const PrivacyPolicy = () => {
    const routeName = useRoute();

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);

    const [listDataSource, setListDataSource] = useState(CONTENT);
    const [multiSelect, setMultiSelect] = useState(false);
    const animatedOpacityValue = useRef(new Animated.Value(0)).current;

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
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, letterSpacing: 0.5, textAlign: 'justify', lineHeight: 22, paddingVertical: 10 }}>This Privacy Policy ("Policy") elucidates the principles governing the collection, utilization, disclosure, and transfer of your information by “Albionpropertyhub” & Albion Investments & Holdings Private Limited and/or its subsidiary(ies) and/or affiliate(s) (collectively referred to as the "Company"). The Company operates various websites, including sub-sites, platforms, applications, m-web platforms, and other platforms (collectively referred to as "Sites") for delivering information, products, offerings, and content via any mobile or internet-connected device or otherwise (collectively the "Services").</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, letterSpacing: 0.5, textAlign: 'justify', lineHeight: 22, paddingVertical: 10 }}>This Policy is an integral component of the Terms of Use and other terms on the Site ("Terms of Use"). Terms that are capitalized herein but undefined shall carry the same meaning as attributed to them in the Terms of Use. The effectiveness of this policy commences from the date and time a user registers with the Site and accepts the terms and conditions outlined in the Site. Prior to using our Services, it is imperative to thoroughly read both this Privacy Policy and our Terms of Use.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, letterSpacing: 0.5, textAlign: 'justify', lineHeight: 22, paddingVertical: 10 }}>Albionpropertyhub holds a commitment to respecting the privacy of its users and safeguarding it comprehensively. In its endeavor to provide a rich and holistic internet experience, Albionpropertyhub offers a diverse repository of Online Sites and various community services. The information collected by Albionpropertyhub about the user comprises (a) information supplied by users and (b) information automatically tracked during navigation (Information).</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, letterSpacing: 0.5, textAlign: 'justify', lineHeight: 22, paddingVertical: 10 }}>By utilizing the Albionpropertyhub website or its services, you implicitly consent to the collection, storage, use, transfer, sharing, and distribution of the personal information you provide for any of the services offered.</Text>

                        <Text style={{ width: '100%', fontSize: 16, color: '#000', textAlign: 'justify', letterSpacing: 0.5, fontWeight: '900', fontFamily: 'Poppins-Bold' }}>Information Received, Collected, And Stored by The Company</Text>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.SemiBold, fontWeight: '800', textAlign: 'justify', letterSpacing: 0.5, lineHeight: 20, paddingVertical: 10 }}>A. Information Supplied By Users:</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Registration/Contact data: When registering or making contact on the Sites for the Service, users are requested to provide basic contact information such as name, sex, age, address, pin code, contact number, occupation, interests, and email address. If registering through other accounts like Facebook, Twitter, or Gmail, Information from such accounts may be retrieved. Subscription or paid service data: If choosing any subscription or paid service, the Company or its payment gateway provider may collect purchase, address, or billing information, including credit card details. In-app purchases are handled by mobile operating system platform providers. Voluntary information: Additional information may be collected when providing feedback, comments, changing content, email preferences, responding to surveys, or engaging in communications. Information Automatically Collected/Tracked While Navigation Cookies: "Cookies" or similar electronic tools may be used to improve site responsiveness, assigning each visitor a unique, random number as a User Identification (User ID) for understanding individual interests. Unless voluntarily identified, no personal information is obtained. Opting out: Users can opt-out using Ads Settings, overwriting the unique DoubleClick cookie ID with "OPT_OUT." Log File Information: Limited information about the computer's connection to the Internet, including IP address, is automatically collected. Clear GIFs: "Clear GIFs" (Web Beacons) may be used to track online usage patterns anonymously.</Text>
                    </View>


                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>User Permissions </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>In order to provide you with a seamless experience on Albion Property Hub and to facilitate the listing, sale, and purchase of properties, we may request certain permissions from you. Below, we outline the types of permissions we may ask for, why we need them, and why we may not need them.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Personal Info </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Name: We may ask for your name to personalize your experience on Albion Property Hub and to address you appropriately within our services.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Email Address: Your email address is required for account verification, communication purposes, and to send you important updates regarding property listings and transactions.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>User IDs: We do not ask for user IDs as they are not essential for the functionality of our property management services.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Address: Your address may be requested for location-based services, such as providing relevant local property listings or for property sale and purchase transactions.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Phone Number: This may be requested for account verification, communication, and to provide you with additional security measures such as two-factor authentication.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Race and Ethnicity, Political or Religious Beliefs, Sexual Orientation, Other Info: We do not request or require this sensitive personal information. We respect your privacy and believe such information is not necessary for the provision of our property management services.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Location </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Approximate Location: We may request access to your approximate location to offer location-based property listings, nearby property recommendations, or to tailor property search results based on your region.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Precise Location: Precise location access may be requested for features like property mapping, navigation to property locations, or to assist in property viewings. However, we understand that you may not wish to share this information, and our services can still function without precise location data.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Messages </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Emails: Access to emails may be requested for communication purposes related to property listings, inquiries, and transactions. However, we do not access or store the content of your emails unless explicitly required for the functionality of our property management services.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>SMS: We may request access to SMS and MMS for features like two-factor authentication or to facilitate communication within our services. However, we do not access or store the content of your messages.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Photos: We may request access to photos for the purpose of taking property photos and uploading them to Albion Property Hub for listing purposes. This helps in showcasing your property accurately to potential buyers or renters, enhancing the visibility and attractiveness of your listings.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Files and Docs </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Access to files and documents may be requested for services such as document uploads related to property ownership, rental agreements, or property listings. We respect your privacy and do not access or store your files unless necessary for the functionality of our property management services.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Calendar</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>We may request access to your calendar events to provide reminders, schedule appointments, or to integrate with other services. Your calendar data is only accessed with your explicit consent and is not used for any other purpose.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Contacts </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>We may request access to your contacts for features such as sharing property listings with your contacts or inviting them to join Albion Property Hub. However, we do not store your contact information unless explicitly provided by you for the functionality of our property management services.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Device or Other IDs</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Device or Other IDs: We may collect device or other IDs for analytics, security purposes, or to ensure proper functioning of Albion Property Hub across different devices. However, we do not track or store personally identifiable information through these IDs.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Information from Other Sources: </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>The Company may receive information about users from other sources, adding it to account information and treating it in accordance with this Policy. Demographic and other information: Other sources of demographic and information may be referenced to provide more targeted communications and promotions. LINKS TO THIRD-PARTY SITES / AD-SERVERS: The Sites may contain links to other websites or applications, governed by their respective privacy policies. The Company is not liable for the privacy practices of such sites.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>INFORMATION USED BY THE COMPANY</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Information supplied by users may be utilized for advertising purposes across various mediums. The data shared by users enables the company to enhance services, maintain, protect, and improve the overall user experience. Additionally, this information may be employed for marketing communications regarding services or third-party products. It's important to note that personally identifiable information already in the public domain is not considered sensitive.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>How Collected Data Is Used?</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Third-party advertising companies may serve ads when visiting or using Sites or Services, using information to provide relevant advertisements.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Information Sharing : </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Personal information may be shared to conduct business, within group companies, or with third parties for various purposes outlined in the Policy.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Accessing and Updating Personal Information: </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Users can access and update personal information, and the Company makes efforts to correct inaccuracies, subject to legal requirements.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Information Security :</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Appropriate security measures are implemented to protect data against unauthorized access, alteration, disclosure, or destruction.</Text>
                    </View>
                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Updates / Changes :</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>The Policy may be modified to incorporate changes in technology or applicable law. Changes become effective immediately upon notice, posted on the Sites.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Security : </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Commercially reasonable security measures are in place, but absolute protection is not guaranteed.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Accuracy and Confidentiality of Account Information : </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Customers are responsible for maintaining accurate and confidential account information.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Third-Party Websites :</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>The Company is not liable for the misuse of information by third-party websites linked on the Site.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>Questions / Grievance Redressal : </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>Users may address concerns or grievances to the designated Grievance Officers, whose contact information is provided in the Terms of Use.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10, marginVertical: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-Bold', fontWeight: '800', letterSpacing: 0.5, textAlign: 'justify', lineHeight: 20 }}>How We Use Your Information</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>We use the information that we collect about you or that you provide to us, including any personal information, to:</Text>

                        <View style={{ width: '100%', paddingVertical: 0, padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 15, color: '#000', textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Present our Service and its contents to you.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 5, padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 15, color: '#000', textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Provide you with information or services that you request from us</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 0, padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 15, color: '#000', textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Fulfill any other purpose for which you provide it.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 5, padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 15, color: '#000', textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Notify you when updates are available and of changes to any products or services we offer.</Text>
                            </View>
                        </View>

                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>We may also use your information to contact you about our own and third-parties goods and services that may be of interest to you</Text>

                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: 'black', fontWeight: '800', letterSpacing: 0.5, fontFamily: 'Poppins-Bold' }}>Data Security</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 16, color: 'black', fontWeight: '800', letterSpacing: 0.5, fontFamily: 'Poppins-Bold' }}>Changes to Our Privacy Policy</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Service. The date the privacy policy was last revised is identified at the top of the page.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>By using Albion Property Hub, you agree to the collection and use of your information as outlined in this Privacy Policy. We are committed to protecting your privacy and ensuring the security of your personal data. If you have any questions or concerns about our Privacy Policy or the use of your personal information, please contact us at [support@albionpropertyhub.com].</Text>
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
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Unauthorised Users </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users are strictly prohibited from allowing any person other than the authorised person(s) named in the application form to use the Service. We emphasise the importance of maintaining the security and integrity of user accounts.</Text>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Resale or Assignment </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users must not resell or assign their rights or obligations under these Terms & Conditions. Additionally, any unauthorised commercial use of the Service is strictly forbidden. The Service is intended for personal use and should not be exploited for commercial purposes.</Text>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Lawful Use </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>The Service should only be used for the purpose for which it is subscribed. Users are required to adhere to all applicable laws of India related to the Services, including any regulations enacted under these laws.</Text>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Data and Information </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users shall not print, download, duplicate, or otherwise copy, delete, vary, or amend any data or personal information posted by any other User on the Site, except for their own data and information. Respecting the privacy and data security of others is a fundamental principle.</Text>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Unlawful and Fraudulent Activities </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>The Service must not be used for any unlawful or fraudulent purpose. Engaging in such activities is strictly prohibited and goes against the ethical use of the platform.</Text>
                    </View>


                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Offensive Content </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users are prohibited from sending or receiving any message through the Service that is offensive on moral, religious, racial, or political grounds, or that is of an abusive, indecent, obscene, defamatory, or menacing nature. We value a respectful and inclusive online community.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Selling Listings</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users are strictly prohibited from selling their listings or any information obtained through the Service to third or unrelated parties. The services are intended for consumption by the User who has paid the subscription fee.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Threats and Harassment</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Posting any information or content on the Site that directly or indirectly causes any threat, harassment, annoyance, anxiety, or any other inconvenience is not permitted. Ensuring a respectful and safe environment for all users is of utmost importance.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Intellectual Property Rights </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users shall not infringe upon the intellectual property rights of any person or party, nor shall they retain information in any computer system with the intention of doing so. Respecting intellectual property rights is a core principle of our Terms.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Unauthorized Use of Information </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users agree not to make use of anyone else's information other than as necessary to complete any transactions in which they are directly involved. Protecting the privacy and information of others is paramount.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 0, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Security and Unauthorized Access</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users must not violate, or attempt to violate, the security of the Site or any linked websites. This includes gaining unauthorized access to private information of other Users or persons, probing network vulnerabilities, and unauthorized access to servers or accounts.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Malicious Software </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>The Service should not be used to introduce, post, or transmit any information or software that contains a virus, worm, or other harmful components into the internet or Site network system. Ensuring the security and integrity of our platform is essential.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Unlawful Use of Services </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users shall avail Services on Albion's platform for lawful purposes alone. Transmission, distribution, storage of material, or conduct that violates any applicable local, state, central, or foreign law or regulation is strictly prohibited. This includes unauthorized use of material protected by patents, copyrights, trademarks, or other intellectual property rights, as well as material that is obscene, defamatory, libelous, constitutes an illegal threat, or violates privacy or publicity rights, or export control laws.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Anti-Spam Measures </Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Albion strongly opposes spam in all its forms, which has a detrimental effect on the performance and availability of the platform. Users are prohibited from engaging in spam activities or any other activities that facilitate spam. This includes hosting, sending, or posting spam to drive visitors to their site hosted on or through Albion's platform.</Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Content Responsibility</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users should be aware that the Content posted by other users does not necessarily reflect the views of Albion. The company assumes no responsibility or liability for any Content posted by users. Users are required to represent and warrant that they have the necessary rights to provide Content and that such Content does not infringe upon the rights of third parties or contain any libelous, tortious, or unlawful information.</Text>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 0, padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Unauthorized Access</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular, lineHeight: 25 }}>Users must not attempt to gain unauthorized access to any portion or feature of the Platform or any other systems or networks connected to the Platform. This includes hacking, OTP "mining," or any other illegitimate means.</Text>
                    </View>

                </View>
            );
        } catch (error) {
            console.log('catch in render FreeRental_Item : ', error);
        }
    }

    function renderCusReviewItem(item, index) {
        try {
            return (
                <View style={{ width: 320, height: 160, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, paddingHorizontal: 10, backgroundColor: 'white', elevation: 2, marginVertical: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: Media.home_banner }}
                                style={{
                                    width: 80, height: 80, resizeMode: 'contain', borderRadius: 50
                                }}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold' }} numberOfLines={1}>{item.cus_name}</Text>
                            <Text style={{ fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: Poppins.Regular }} numberOfLines={5}>{item.cus_desc}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 30, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: 'black', fontFamily: 'Poppins-SemiBold' }}>{item.cus_rating} </Text>
                            <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins-SemiBold', textAlign: 'justify' }}>/5</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            console.log('catch in renderCus_ReviewItem : ', error);
        }
    }


    function renderFooterItem(item, index) {
        try {
            return (
                <View style={{ width: '100%', height: height, alignItems: 'center', backgroundColor: 'white' }}>

                    <View style={{ width: '100%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 16, letterSpacing: 0.5, color: 'black', fontWeight: '800', fontFamily: 'Poppins-SemiBold' }}>Contact Us</Text>

                        <Text style={{ width: '95%', fontSize: 16, color: '#666', letterSpacing: 0.5, lineHeight: 22, fontFamily: Poppins.Regular, paddingTop: 10 }}>For any other queries and feedback can reach us with below address </Text>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                            <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'phone-call'}
                                    icon_size={22}
                                    iconstyle={{ color: primarycolor }}
                                />
                            </View>
                            <Text style={{ fontSize: 18, color: 'black', letterSpacing: 0.5, fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>+91 94422 03866</Text>
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
                            <Text style={{ width: '95%', fontSize: 18, letterSpacing: 0.5, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>support@albionpropertyhub.com</Text>
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
                            <Text style={{ fontSize: 19, color: primarycolor, letterSpacing: 0.5, fontFamily: 'Poppins-SemiBold' }}>Albion Bank Auctions Pvt Ltd</Text>
                            <Text style={{ width: '95%', textAlign: 'justify', letterSpacing: 0.5, fontSize: 14, color: '#666', fontFamily: 'Poppins-SemiBold' }} numberOfLines={2} >India’s No.1 Property Site is now a Superband</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 30 }}>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.replace("AboutUs")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: Poppins.Regular, paddingHorizontal: 5, textDecorationLine: 'underline' }}>About Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.replace("PrivacyPolicy")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: Poppins.Regular, paddingHorizontal: 5, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => navigation.replace("TermsCondition")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: Poppins.Regular, paddingHorizontal: 5, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(e) => {
                                Linking.openURL('https://albionpropertyhub.com/');
                            }} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: Poppins.Regular, paddingHorizontal: 5, textDecorationLine: 'underline' }}>Website</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            );
        } catch (error) {
            console.log("catch in renderFooterItem's Free_rental : ", error);
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


            <View style={{ width: '100%', height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
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
    },
    NumberBoxConatiner: {
        width: '95%',
        borderColor: '#666',
        marginVertical: 10,
        borderWidth: 0.5,
        paddingStart: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
    incomeBoxConatiner: {
        width: '95%',
        borderColor: '#666',
        marginVertical: 0,
        borderWidth: 0.5,
        paddingStart: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
    numberTextBox: {
        width: '100%',
        height: 50,
        color: Color.black,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    invalidLogin: {
        width: '90%',
        fontSize: 13, marginHorizontal: 10,
        fontFamily: 'Poppins-SemiBold',
        color: Color.red,
    },
});


//make this component available to the app
export default PrivacyPolicy;
