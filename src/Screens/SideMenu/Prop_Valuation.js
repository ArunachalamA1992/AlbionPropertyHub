import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
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
  StatusBar, SafeAreaView,
  TouchableOpacity, SectionList,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
  LogBox,
  Modal, Linking
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { primarycolor } from '../../Utils/Colors';
import Color from '../../Config/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import { RadioButton } from 'react-native-paper';
import { BottomSheet } from 'react-native-btr';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import common_fn from '../../Config/common_fn';
import ExpandableComponent from '../../Utils/ExpandableComponent';
import { Button } from 'react-native-elements';
import { Poppins } from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';

const freeRentalData = [
  {
    id: '0',
    rent_img: Media.fill,
    rent_cost: '1499',
    rent_subs: '1999',
    rent_title: 'Know Your Property Value',
    rent_subone:
      'Get instant Professional help online to solve all your legal queries',
    rent_subtwo:
      'Option to discuss all your legal queries and advise on the way forward',
  },
];

const CONTENT = [
  {
    isExpanded: true,
    category_name:
      'Is property valuation mandatory when buying or selling a property?',
    subcategory: [
      {
        id: 1,
        val: 'Property valuation is not mandatory but highly recommended for informed decision-making.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'How long does it take to receive a property valuation report?',
    subcategory: [
      {
        id: 4,
        val: 'The timeframe may vary based on the type of valuation requested, but you can typically expect to receive your report within a few days to a week.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'Are property valuations always conducted by a physical inspection of the property?',
    subcategory: [
      {
        id: 7,
        val: 'Not necessarily. Depending on the type of valuation, it can be conducted through on-site inspections or data analysis of similar properties in the area.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'Can I use a property valuation report for negotiation purposes?',
    subcategory: [
      {
        id: 10,
        val: 'Yes, property valuation reports are valuable negotiation tools for both buyers and sellers.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name: 'Is property valuation necessary for rental properties?',
    subcategory: [
      {
        id: 10,
        val: 'Property valuation can be beneficial for rental properties, helping landlords set competitive rental rates.',
      },
    ],
  },
];

const cityData = [
  {
    id: '0',
    city_name: 'Coimbatore',
  },
  {
    id: '1',
    city_name: 'Erode',
  },
  {
    id: '2',
    city_name: 'Salem',
  },
  {
    id: '3',
    city_name: 'Tiruppur',
  },
  {
    id: '4',
    city_name: 'Chennai',
  },
  {
    id: '5',
    city_name: 'Tiruchy',
  },
  {
    id: '6',
    city_name: 'Madurai',
  },
];

const HowWorksData = [
  {
    hw_id: '1',
    hw_img: Media.prop_choose,
    hw_sub: 'step-1',
    hw_title: 'Choose a Service',
    hw_subtitle:
      'Select the type of property valuation service you need based on your goals. ',
  },
  {
    hw_id: '2',
    hw_img: Media.prop_share,
    hw_sub: 'step-2',
    hw_title: 'Share Details of Property',
    hw_subtitle:
      ' Provide essential details about the property, including its location, size, condition, and any relevant features.',
  },
  {
    hw_id: '3',
    hw_img: Media.prop_report,
    hw_sub: 'step-3',
    hw_title: 'Get Valuation Report',
    hw_subtitle:
      'Experienced property experts will conduct a thorough analysis of the property and the current real estate market.',
  },
];

const HeaderHeight = 150;

LogBox.ignoreAllLogs();

const Prop_Valuation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  // const [selectCity, setSelectCity] = useState('WithInCity');

  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, profile, user_type_id, mobile_number, email } =
    userData;

  const [height, setHeight] = useState(undefined);
  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [PropValueVisible, setPropValueVisible] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const [checked, setChecked] = useState('first');

  const [checkTerms, setCheckTerms] = useState(false);
  const [username, setUsername] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [selectCitybottomSheetVisible, setSelectCitybottomSheetVisible] =
    useState(false);
  const [selectcity, setselectcity] = useState('Select City');
  const [selectCityItem, setSelectCityItem] = useState('');


  let listRefArr = useRef([]);
  let isListGliding = useRef(false);
  let listOffset = useRef({});
  const [tabIndex, setIndex] = useState(0);

  const [routes] = useState([
    { id: 1, title: 'Buy' },
    { id: 2, title: 'Rent' },
    { id: 3, title: 'Rent' },
    { id: 4, title: 'Rent' },
    { id: 5, title: 'Rent' },
  ]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [BuySection] = useState([
    { id: 1, title: 'Property Valuation', data: ['Property Valuation'] },
    { id: 2, title: 'Know Your Property Value', data: ['Know Your Property Value'] },
    { id: 3, title: 'How it works', data: ['How it works'] },
  ]);


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


  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, []);


  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };


  const syncScrollOffset = () => {
    // const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };


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

  function onTextChange(text) {
    var cleaned = ('' + text).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '',
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
          '',
        );

      setPhoneNum(number);
      return;
    }

    setPhoneNum(text);
  }

  /* ****************************************************  SELECT CITY BOTTOM SHEET ****************************************************** */

  function selectCity_toggleBottomView() {
    try {
      setSelectCitybottomSheetVisible(!selectCitybottomSheetVisible);
    } catch (error) {
      console.log(
        'catch in Home_interior selectCity_toggleBottomView :',
        error,
      );
    }
  }

  function selCity_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={selectCitybottomSheetVisible}
            onBackButtonPress={selectCity_toggleBottomView}
            onBackdropPress={selectCity_toggleBottomView}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 350,
                minHeight: 200,
                alignItems: 'center',
                borderTopStartRadius: 30,
                borderTopEndRadius: 30,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  padding: 15,
                  paddingStart: 30,
                  backgroundColor: '#FBE9EF',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopStartRadius: 30,
                  borderTopEndRadius: 30,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Select City
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectCitybottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={22}
                    iconstyle={{ color: primarycolor, marginRight: 10 }}
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
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in Home_interior selCity_BottomSheet_menu :', error);
    }
  }

  function renderCityItem(item, index) {
    try {
      return (
        <View style={{ width: '95%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => selectCity(item)}
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 15,
              backgroundColor:
                selectCityItem === item.city_name ? primarycolor : 'white',
            }}>
            <Text
              style={{
                fontSize: selectCityItem === item.city_name ? 16 : 14,
                color: selectCityItem === item.city_name ? 'white' : 'black',
              }}>
              {item.city_name}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '95%',
              height: 1,
              backgroundColor: '#666',
              marginVertical: 1,
            }}></View>
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


  async function checkValuation() {
    try {

      var data = {
        form_name: 'property_valuation',
        payload: {
          mobile_number: phoneNum,
          city: selectcity,
          username: username,

        },
        user_id: user_id,
      };
      const homeLoanData = await fetchData.homeLoan_Api(data);
      if (homeLoanData.status) {
        setPropValueVisible(true);
      } else {
        alert('Wait for some time');
        setPropValueVisible(false);
      }
    } catch (error) {
      console.log('catch in Prop_val checkValuation :', error);
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={primarycolor}
        translucent={false}
        barStyle="dark-content"
        networkActivityIndicatorVisible={true}
      />

      {netInfo_State ? null :
        <Animated.View animation="fadeInRight" style={{ flex: 1, position: 'absolute', zIndex: 9999, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 0 }}>
          <Text style={{ color: 'white' }}>No Internet Connection</Text>
        </Animated.View>
      }


      <Animated.SectionList
        sections={BuySection}
        scrollEnabled={true}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        // contentContainerStyle={{
        //   paddingTop: HeaderHeight,
        //   minHeight: windowHeight - TabBarHeight,
        // }}
        nestedScrollEnabled
        initialNumToRender={5}
        renderItem={({ item }) => {
          switch (item) {
            case 'Property Valuation':
              return (
                <View style={{ width: scr_width, alignItems: 'center' }}>
                  <View style={{ width: scr_width, height: 220, marginVertical: 2 }}>
                    <Image
                      source={{ uri: Media.prop_Banner }}
                      style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                  </View>

                  <View style={{ width: '95%' }}>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 24,
                            color: 'black',
                            fontFamily: 'Poppins-Bold',
                          }}>
                          Property Valuation
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: '#333',
                        fontFamily: 'Poppins-SemiBold',
                        paddingVertical: 10,
                        lineHeight: 25,
                      }}>
                      Unlocking the True Value of Your Property with Property Valuation
                      Service
                    </Text>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 15,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                        lineHeight: 25,
                      }}>
                      Understanding the value of your property is a crucial step whether
                      you're a buyer, seller, or investor. Albion's Property Valuation
                      service is here to provide you with accurate and insightful
                      property valuations.
                    </Text>
                  </View>

                  <View style={{ width: '95%', marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'Poppins-Bold',
                      }}>
                      Benefits of Property Valuation
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => setChecked('first')}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                        }}>
                        <RadioButton
                          value="first"
                          status={checked === 'first' ? 'checked' : 'unchecked'}
                          onPress={() => setChecked('first')}
                          color={Color.primary}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.cloudyGrey,
                            fontFamily:
                              checked === 'first'
                                ? 'Poppins-SemiBold'
                                : 'Poppins-Regular',
                          }}>
                          Buyers
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setChecked('second')}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                        }}>
                        <RadioButton
                          value="second"
                          status={checked === 'second' ? 'checked' : 'unchecked'}
                          onPress={() => setChecked('second')}
                          color={Color.primary}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.cloudyGrey,
                            fontFamily:
                              checked === 'second'
                                ? 'Poppins-SemiBold'
                                : 'Poppins-Regular',
                          }}>
                          Sellers
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {checked === 'first' ? (
                      <View
                        style={{
                          width: '100%',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        <View style={{ width: '100%' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Informed Purchases :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Property valuation helps buyers make informed decisions by
                            providing an accurate estimate of a property's value,
                            preventing overpayment.
                          </Text>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 10 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Negotiating Power :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Armed with a valuation report, buyers can negotiate
                            confidently with sellers, ensuring a fair deal.
                          </Text>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 5 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Budget Clarity :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Valuations assist buyers in determining their budget and
                            securing appropriate financing for their purchase.
                          </Text>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 5 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Investment Decisions :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Property investors can assess the potential return on
                            investment (ROI) by understanding the property's value in
                            the current market.
                          </Text>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 5 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Understanding Market Trends :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Valuation reports offer insights into market trends,
                            enabling buyers to identify opportunities.
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: '100%',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        <View style={{ width: '100%' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Accurate Pricing :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Sellers can price their property competitively by
                            understanding its true market value, attracting potential
                            buyers.
                          </Text>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 10 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Faster Sales :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            A well-priced property is more likely to sell quickly,
                            reducing the time the property sits on the market.
                          </Text>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 5 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Negotiation Leverage :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Sellers can confidently negotiate with buyers when they have
                            a professional valuation report to support their asking
                            price.
                          </Text>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 5 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Marketing Advantage :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Accurate pricing provides a strong selling point, making the
                            property more attractive to potential buyers.
                          </Text>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 5 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                              Realistic Expectations :{' '}
                            </Text>
                          </View>
                          <Text
                            style={{
                              width: '95%',
                              fontSize: 15,
                              color: '#666',
                              textAlign: 'justify',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 25,
                            }}>
                            Valuation reports help sellers set realistic expectations
                            about the sale price and proceeds they can expect.
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              );
            case 'Know Your Property Value':
              return (
                <>
                  {Platform.OS == "android" &&
                    <>
                      {freeRentalData.map((item, index) => {
                        return (
                          <View
                            style={{
                              width: '95%',
                              alignSelf: 'center',
                              alignItems: 'center',
                              padding: 10,
                              marginVertical: 10,
                              borderRadius: 10,
                              borderColor: '#34C38F',
                              borderWidth: 2,
                            }}>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 10,
                              }}>
                              <View
                                style={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  paddingHorizontal: 10,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    color: 'black',
                                    fontFamily: 'Poppins-SemiBold',
                                    textAlign: 'justify',
                                  }}>
                                  {item.rent_title}
                                </Text>
                              </View>
                            </View>
                            <View style={{ width: '100%', paddingHorizontal: 20 }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingVertical: 5,
                                }}>
                                <Iconviewcomponent
                                  Icontag={'Feather'}
                                  iconname={'check'}
                                  icon_size={24}
                                  iconstyle={{ color: '#239D0F' }}
                                />
                                <Text
                                  style={{
                                    width: '95%',
                                    fontSize: 15,
                                    color: '#666',
                                    paddingHorizontal: 10,
                                    lineHeight: 25,
                                    fontFamily: 'Poppins-Regular',
                                    textAlign: 'justify',
                                  }}
                                  numberOfLines={2}>
                                  {item.rent_subone}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingVertical: 5,
                                }}>
                                <Iconviewcomponent
                                  Icontag={'Feather'}
                                  iconname={'check'}
                                  icon_size={24}
                                  iconstyle={{ color: '#239D0F' }}
                                />
                                <Text
                                  style={{
                                    width: '95%',
                                    fontSize: 15,
                                    color: '#666',
                                    paddingHorizontal: 10,
                                    lineHeight: 25,
                                    fontFamily: 'Poppins-Regular',
                                    textAlign: 'justify',
                                  }}
                                  numberOfLines={2}>
                                  {item.rent_subtwo}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingVertical: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                  paddingHorizontal: 10,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: 'black',
                                    fontFamily: 'Poppins-Bold',
                                  }}>
                                  {item.rent_cost}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    color: '#666',
                                    fontFamily: 'Poppins-SemiBold',
                                    textDecorationLine: 'line-through',
                                    paddingHorizontal: 10,
                                  }}>
                                  {item.rent_subs}
                                </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: 'flex-end',
                                  alignItems: 'flex-end',
                                  paddingHorizontal: 10,
                                }}>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  style={{
                                    backgroundColor: '#34C38F',
                                    borderRadius: 10,
                                    padding: 7,
                                    paddingHorizontal: 20,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      color: 'white',
                                      fontFamily: 'Poppins-SemiBold',
                                    }}>
                                    Book Now
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </>
                  }
                </>

              );
            case 'How it works':
              return (
                <View
                  style={{
                    width: '100%',
                    height: height,
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 220,
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{ uri: Media.legal_banner }}
                      style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                    />
                  </View>

                  <View style={{ width: '95%', marginTop: 20 }}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      The Valuation Report: Your Key to Informed Decisions
                    </Text>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        fontSize: 15,
                        color: '#666',
                        textAlign: 'justify',
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                      }}>
                      Whether you're buying or selling, Albion's Property Valuation
                      Partner equips you with the valuation report you need to make
                      informed property decisions. These reports provide you with a
                      clear and accurate picture of a property's worth, empowering you
                      to navigate the real estate market with confidence.
                    </Text>
                  </View>

                  <View style={{ width: '95%', alignItems: 'center' }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Fill this one-time contact form
                    </Text>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 15,
                        color: '#666',
                        textAlign: 'justify',
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                      }}>
                      Get Builder details over email
                    </Text>

                    <View style={[styles.incomeBoxConatiner, { marginVertical: 20 }]}>
                      <TextInput
                        placeholder="Enter your name"
                        placeholderTextColor={Color.grey}
                        value={username}
                        keyboardType="name-phone-pad"
                        // maxLength={10}
                        onChangeText={val => {
                          setUsername(val);
                        }}
                        style={styles.numberTextBox}
                      />
                    </View>

                    <View style={styles.incomeBoxConatiner}>
                      <TextInput
                        onChangeText={text => onTextChange(text)}
                        value={phoneNum}
                        placeholder="Enter your mobile number"
                        placeholderTextColor={Color.grey}
                        keyboardType="phone-pad"
                        maxLength={14}
                        style={styles.numberTextBox}
                      />
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => selectCity_toggleBottomView()}
                      style={{
                        width: '95%',
                        height: 50,
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        marginVertical: 20,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: Color.white,
                        borderRadius: 5,
                        borderColor: '#666',
                        borderWidth: 0.5,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.cloudyGrey,
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        {selectcity}
                      </Text>
                      <Iconviewcomponent
                        Icontag={'Entypo'}
                        iconname={'chevron-small-down'}
                        icon_size={24}
                        iconstyle={{ color: '#333', marginHorizontal: 10 }}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        marginVertical: 5,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          style={{ marginHorizontal: 10 }}
                          onPress={() => {
                            setCheckTerms(!checkTerms);
                          }}>
                          <MCIcon
                            name={
                              !checkTerms ? 'checkbox-blank-outline' : 'checkbox-marked'
                            }
                            size={24}
                            color={Color.black}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: Color.cloudyGrey,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          I Agree to Albion Terms and Conditions{' '}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => checkValuation()}
                      disabled={!checkTerms}
                      style={{
                        width: '95%',
                        height: 50,
                        marginVertical: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: !checkTerms ? Color.cloudyGrey : Color.primary,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.white,
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Get Contact
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                    <Text
                      style={{
                        width: '95%',
                        paddingVertical: 10,
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      How it works?
                    </Text>

                    {HowWorksData.map((item, index) => {
                      return (
                        <View
                          key={item.hw_id}
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            margin: 2,
                          }}>
                          <View
                            style={{
                              flex: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={{ uri: item.hw_img }}
                              style={{
                                width: 70,
                                height: 70,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flex: 1,
                              width: '100%',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                              padding: 10,
                            }}>
                            <Text
                              style={{
                                width: '100%',
                                fontSize: 13,
                                color: '#666',
                                fontFamily: 'Poppins-SemiBold',
                                lineHeight: 25,
                                textAlign: 'justify',
                              }}
                              numberOfLines={1}>
                              {item.hw_sub}
                            </Text>
                            <Text
                              style={{
                                width: '100%',
                                fontSize: 16,
                                color: '#000',
                                fontFamily: 'Poppins-SemiBold',
                                lineHeight: 25,
                                textAlign: 'justify',
                              }}
                              numberOfLines={1}>
                              {item.hw_title}
                            </Text>
                            <Text
                              style={{
                                width: '100%',
                                fontSize: 15,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                                lineHeight: 25,
                                textAlign: 'justify',
                              }}>
                              {item.hw_subtitle}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                  <View style={{ width: '95%', alignItems: 'center' }}>
                    <Text
                      style={{
                        width: '95%',
                        paddingVertical: 10,
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      The Valuation Report: Your Key to Informed Decisions
                    </Text>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 15,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                        textAlign: 'justify',
                      }}>
                      Whether you're buying or selling, Albion's Property Valuation
                      Partner equips you with the valuation report you need to make
                      informed property decisions. These reports provide you with a
                      clear and accurate picture of a property's worth, empowering you
                      to navigate the real estate market with confidence.
                    </Text>
                  </View>

                  <View style={{ width: '95%', alignItems: 'center' }}>
                    <Text
                      style={{
                        width: '95%',
                        paddingVertical: 10,
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Frequently Asked Questions?
                    </Text>

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

                  <View
                    style={{
                      width: '95%',
                      marginVertical: 20,
                      marginTop: 30,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 18,
                        color: 'black',
                        fontFamily: 'Poppins-Bold',
                      }}>
                      Contact Us
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
                          iconstyle={{ color: primarycolor }}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontFamily: 'Poppins-Bold',
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
                        marginVertical: 10,
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
                          iconstyle={{ color: primarycolor }}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontFamily: 'Poppins-Bold',
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
                      style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                      <Image
                        source={{ uri: Media.albionlogo }}
                        style={{ width: 70, height: 70, resizeMode: 'contain' }}
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
                          fontSize: 17,
                          color: primarycolor,
                          fontFamily: 'Poppins-Bold',
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
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }} onPress={() => navigation.replace("AboutUs")}>
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
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }} onPress={() => navigation.replace("PrivacyPolicy")}>
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
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }} onPress={() => navigation.replace("TermsCondition")}>
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
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }} onPress={() => Linking.openURL('https://albionpropertyhub.com/')}>
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

          }
        }}
      />

      {selCity_BottomSheetmenu()}

      <Modal visible={PropValueVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000050',
            justifyContent: 'center',
            padding: 10,
            // alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: Poppins.Bold,
                fontSize: 20,
                textAlign: 'center',
              }}>
              Thank You
            </Text>
            <Text
              style={{
                color: '#666',
                fontFamily: Poppins.Medium,
                fontSize: 14,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              Great! Now sit back and relax!
            </Text>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: Media.homeloan_ads }}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
              />
            </View>
            <Text
              style={{
                color: '#666',
                fontFamily: Poppins.Medium,
                fontSize: 14,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              Albion Property Valuation Experts will call you shortly to discuss the
              best deals for you ...!
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('TabNavigator'), setPropValueVisible(false);
              }}
              style={{
                width: '100%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: primarycolor,
                borderRadius: 40,
              }}>
              <Text style={{ fontSize: 14, color: 'white' }}>GoTo Home Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: scr_width,
    // height: scr_height,
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
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
  }
});

//make this component available to the app
export default Prop_Valuation;
