import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  TextInput,
  Keyboard,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
  LogBox,
  Linking,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {primarycolor} from '../../Utils/Colors';
import {Media} from '../../Global/Media';
import ExpandableComponent from '../../Utils/ExpandableComponent';
import { Iconviewcomponent } from '../../Components/Icontag';

const freeRentalData = [
  {
    id: '0',
    rent_img: Media.fill,
    rent_title: 'Fill details online',
    rent_subText: 'Fill in your details in a fully customized legal template',
  },
];

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'What types of home loans does Albion offer?',
    subcategory: [
      {
        id: 1,
        val: 'Albion offers a range of home loan products, including fixed-rate mortgages, adjustable-rate mortgages (ARMs), FHA loans, and VA loans, catering to diverse borrower needs.',
      },
      // { id: 2, val: 'Comparatively cheaper than personal loans' },
      // { id: 3, val: 'Tax benefits' },
      // { id: 3, val: 'Home loan balance transfer' },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What are the eligibility criteria for a home loan with Albion?',
    subcategory: [
      {
        id: 4,
        val: 'Eligibility criteria may vary depending on the loan type and lender. Generally, factors such as credit score, income, and debt-to-income ratio play a significant role in determining eligibility.',
      },
      // { id: 6, val: 'Home loan for renovation' },
    ],
  },
  {
    isExpanded: false,
    category_name: `How is the interest rate on Albion's home loans determined?`,
    subcategory: [
      {
        id: 7,
        val: `Interest rates are determined by a combination of factors, including your credit score, loan type, market conditions, and the lender's policies.`,
      },
      // { id: 8, val: 'Check if you can afford to pay monthly EmIs from your current income.' },
      // { id: 9, val: 'Research all the loan options available before finalizing an offer.' },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What is the loan processing time for a home loan with Albion?',
    subcategory: [
      {
        id: 10,
        val: `The loan processing time can vary based on factors like the complexity of your application and the lender's procedures. On average, it may take several weeks to complete the loan process.`,
      },
      // { id: 11, val: 'Prepayment charges' },
      // { id: 11, val: 'Loan conversion charges' },
      // { id: 11, val: 'Logal and technical chargers' },
    ],
  },
];

const cutData = [
  {
    cus_id: '0',
    cus_name: 'Arunachalam Annamalai',
    cus_desc:
      'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
    cus_rating: '4.5',
  },
  {
    cus_id: '1',
    cus_name: 'Pradeep Ramakrish',
    cus_desc:
      'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
    cus_rating: '4',
  },
  {
    cus_id: '2',
    cus_name: 'Naveen Kumar g',
    cus_desc:
      'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
    cus_rating: '5',
  },
];

LogBox.ignoreAllLogs();

const ContactUs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);
  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log("catch in use_effect's Free_rental : ", error);
    }
  }, []);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  function renderHeaderItem() {
    try {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: scr_width}}>
            <Image
              // source={require('../../Assets/image/guide.png')}
              source={{ uri: Media.about_banner }}
              style={{
                width: scr_width,
                height: 220,
                resizeMode: 'contain',
              }}
            />
          </View>

          <View style={{width: '95%', padding: 10}}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 24, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Albion</Text>
                            <Text style={{ fontSize: 24, color: 'black', paddingHorizontal: 5, fontFamily: 'Poppins-Bold' }}>Property</Text>
                        </View> */}
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Your Guide to a Seamless Experience!
            </Text>
            <View style={{marginVertical: 10}}>
              {/* <Text style={{ width: '100%', fontSize: 16, color: '#333', fontFamily: 'Poppins-SemiBold', textAlign: 'justify', lineHeight: 20 }}>Discover Albion </Text> */}
              <Text
                style={{
                  width: '100%',
                  fontSize: 15,
                  color: '#666',
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                If you encounter any abusive content posted by other users on
                our platform, you can easily report it to us via the "Contact
                Us" feature. Additionally, if you wish to prevent further
                interaction with a specific user who has been posting abusive
                content, you can request to block them through the same channel.
                Our support team will review the reported content and take
                appropriate action, including blocking the offending user if
                necessary, to maintain a safe and respectful community
                environment for all users.
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  width: '100%',
                  fontSize: 16,
                  color: '#333',
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'justify',
                  lineHeight: 20,
                }}>
                How can Albion FAQ help users?{' '}
              </Text>
              <Text
                style={{
                  width: '100%',
                  fontSize: 15,
                  color: '#666',
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'justify',
                  lineHeight: 20,
                  paddingVertical: 10,
                }}>
                Welcome to the Albion FAQ (Frequently Asked Questions) page,
                where buyers and owners can find answers to their questions
                related to login or registration, property search, property
                advertisement posting, account management and other related
                topics. Start your search by simply entering keywords in the
                search-bar, located at the top of the page or you can browse
                through questions under the categories given below.
                Alternatively, you can also reach out to us at +91 9442203866
                (Monday to Saturday, 9 AM to 7 PM) to talk to our customer
                support executive. Additionally, you can also explore the
                Articles section below, for the latest real estate news and
                updates.
              </Text>
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
        <View
          style={{width: '100%', alignItems: 'center', paddingHorizontal: 10}}>
          <View
            style={{width: '100%', paddingVertical: 10, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Expertise and Partnership :{' '}
              </Text>
            </View>
            <Text
              style={{
                width: '100%',
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                fontFamily: 'Poppins-Regular',
                lineHeight: 25,
              }}>
              Valuation reports help sellers set realistic expectations about
              the sale price and proceeds they can expect.
            </Text>
          </View>

          <View
            style={{width: '100%', paddingVertical: 10, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Personalized Guidance :{' '}
              </Text>
            </View>
            <Text
              style={{
                width: '100%',
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                fontFamily: 'Poppins-Regular',
                lineHeight: 25,
              }}>
              Our team of dedicated executives is here to guide you every step
              of the way. Whether you're a first-time homebuyer or looking to
              upgrade, we'll help you choose the best loan offer, making the
              process as smooth as possible.
            </Text>
          </View>

          <View
            style={{width: '100%', paddingVertical: 10, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Convenience Redefined :{' '}
              </Text>
            </View>
            <Text
              style={{
                width: '100%',
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                fontFamily: 'Poppins-Regular',
                lineHeight: 25,
              }}>
              Albion is all about convenience. We understand the importance of
              your time and energy. That's why we offer doorstep document pickup
              and submission to our partner banks. You focus on your dream;
              we'll take care of the rest.
            </Text>
          </View>

          <View
            style={{width: '100%', paddingVertical: 10, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Swift Approvals :{' '}
              </Text>
            </View>
            <Text
              style={{
                width: '100%',
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                fontFamily: 'Poppins-Regular',
                lineHeight: 25,
              }}>
              We understand that waiting for loan approvals can be stressful.
              With Albion, your application is swiftly reviewed by our partner
              banks, ensuring you receive confirmation promptly.
            </Text>
          </View>

          <View
            style={{width: '100%', paddingVertical: 10, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                A Commitment to Excellence :{' '}
              </Text>
            </View>
            <Text
              style={{
                width: '100%',
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                fontFamily: 'Poppins-Regular',
                lineHeight: 25,
              }}>
              At Albion, we believe in excellence in everything we do. From
              offering the best loan options to providing top-notch customer
              service, we're dedicated to your satisfaction.
            </Text>
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
        <View
          style={{
            width: 320,
            height: 160,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
            paddingHorizontal: 10,
            backgroundColor: 'white',
            elevation: 2,
            marginVertical: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <View
              style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: Media.home_banner}}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'contain',
                  borderRadius: 50,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}
                numberOfLines={1}>
                {item.cus_name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#666',
                  textAlign: 'justify',
                  fontFamily: 'Poppins-Regular',
                }}
                numberOfLines={5}>
                {item.cus_desc}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingHorizontal: 30,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {item.cus_rating}{' '}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'justify',
                }}>
                /5
              </Text>
            </View>
            <View style={{flex: 1}}></View>
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
        <View
          style={{
            width: '97%',
            height: height,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{width: '95%', marginVertical: 10, alignItems: 'center'}}>
            <Text
              style={{
                width: '95%',
                paddingVertical: 10,
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Frequently Asked Questions
            </Text>

            <View style={{width: '100%'}}>
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

          <View
            style={{width: '95%', marginVertical: 10, alignItems: 'center'}}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Contact Us
            </Text>
            <Text
              style={{
                width: '95%',
                fontSize: 16,
                color: '#666',
                fontFamily: 'Poppins-Regular',
                paddingTop: 10,
              }}>
              For any other queries and feedback can reach us with below address{' '}
            </Text>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: primarycolor,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={22}
                  iconstyle={{color: primarycolor}}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                  paddingHorizontal: 10,
                }}>
                +91 94422 03866
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: primarycolor,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={22}
                  iconstyle={{color: primarycolor}}
                />
              </View>
              <Text
                style={{
                  width: '95%',
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                  paddingHorizontal: 10,
                }}>
                support@albionpropertyhub.com
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 30,
            }}>
            <View
              style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: Media.albionlogo}}
                style={{width: 60, height: 60, resizeMode: 'contain'}}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 19,
                  color: primarycolor,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Albion Bank Auctions Pvt Ltd
              </Text>
              <Text
                style={{
                  width: '95%',
                  textAlign: 'justify',
                  fontSize: 14,
                  color: '#666',
                  fontFamily: 'Poppins-SemiBold',
                }}
                numberOfLines={2}>
                India’s No.1 Property Site is now a Superband
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '95%',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginVertical: 30,
            }}>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.replace('AboutUs')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: 'Poppins-Regular',
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                  }}>
                  About Us
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.replace('PrivacyPolicy')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: 'Poppins-Regular',
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                  }}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.replace('TermsCondition')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: 'Poppins-Regular',
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://albionpropertyhub.com/')
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    fontFamily: 'Poppins-Regular',
                    paddingHorizontal: 5,
                    textDecorationLine: 'underline',
                  }}>
                  Website
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } catch (error) {
      console.log("catch in renderFooterItem's contact_US : ", error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={primarycolor}
        translucent={false}
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
      />

      {netInfo_State ? null : (
        <Animated.View
          animation="fadeInRight"
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 9999,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#626262',
            opacity: 0.5,
            padding: 10,
            marginTop: Platform.OS == 'ios' ? 80 : 0,
          }}>
          <Text style={{color: 'white'}}>No Internet Connection</Text>
        </Animated.View>
      )}

      <View
        style={{
          width: '100%',
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <FlatList
          data={freeRentalData}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => renderHeaderItem()}
          // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
          ListFooterComponent={() => renderFooterItem()}
          style={{width: '95%'}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: scr_width,
    // height: scr_height,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default ContactUs;
