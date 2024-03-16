import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  TextInput,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  StatusBar,
  TouchableOpacity,
  SectionList,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
  LogBox,
  Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { primarycolor } from '../../Utils/Colors';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Media } from '../../Global/Media';
import { Iconviewcomponent } from '../../Components/Icontag';
import { color } from 'react-native-elements/dist/helpers';
import Color from '../../Config/Color';
import common_fn from '../../Config/common_fn';
import ExpandableComponent from '../../Utils/ExpandableComponent';
import { Poppins } from '../../Global/FontFamily';
import { Button } from 'react-native-elements';
import fetchData from '../../Config/fetchData';

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'What are the key features and benefits of home loans?',
    subcategory: [{ id: 2, val: 'Comparatively cheaper than personal loans' }],
  },
  {
    isExpanded: false,
    category_name: 'What are the different types of home loans available?',
    subcategory: [{ id: 4, val: 'Home loan for construction' }],
  },
  {
    isExpanded: false,
    category_name:
      'What are the factors you should know before applying for a  home loan?',
    subcategory: [
      {
        id: 7,
        val: 'Making your credit score is good. Higher the score, the better.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What are the different types of home loan fees and charges?',
    subcategory: [
      {
        id: 10,
        val: 'Processing fee, Prepayment charges, Loan conversion charges ',
      },
    ],
  },
];

LogBox.ignoreAllLogs();

const HeaderHeight = 150;

const HomeLoanService = ({ navigation }) => {
  const dispatch = useDispatch();
  const [netInfo_State, setNetinfo] = useState(true);
  const [phonenumber, setPhoneNumber] = useState('');
  const [income, setIncome] = useState('');
  const [error, setError] = useState(false);
  const [height, setHeight] = useState(undefined);
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, username, profile, user_type_id, mobile_number, email } =
    userData;

  const [showEmi, setShowEmi] = useState(0);
  const [principleAmount, setPrincipleAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [tenure, setTenure] = useState(0);

  let listRefArr = useRef([]);
  let isListGliding = useRef(false);
  let listOffset = useRef({});
  const [tabIndex, setIndex] = useState(0);

  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;

  const [routes] = useState([
    { id: 1, title: 'Buy' },
    { id: 2, title: 'Rent' },
    { id: 3, title: 'Rent' },
    { id: 4, title: 'Rent' },
    { id: 5, title: 'Rent' },
  ]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [BuySection] = useState([
    {
      id: 1,
      title: 'Apply Albion Home Online',
      data: ['Apply Albion Home Online'],
    },
    { id: 2, title: 'Check your Eligibility', data: ['Check your Eligibility'] },
    { id: 3, title: 'How it works', data: ['How it works'] },
  ]);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log("catch in use_effect's Home_Loan : ", error);
    }
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

  async function checkEligible() {
    try {

      var data = {
        form_name: 'home_loan',
        payload: {
          mobile_number: phonenumber,
          income: income,
        },
        user_id: user_id,
      };
      const homeLoanData = await fetchData.homeLoan_Api(data);
      if (homeLoanData.status) {
        setHomeLoanVisible(true);
        setPhoneNumber('');
        setIncome('');
      } else {
        setPhoneNumber('');
        setIncome('');
        alert('Wait for some time');
        setHomeLoanVisible(false);
      }
    } catch (error) {
      console.log('catch in check_Eligible : ', error);
    }
  }


  function calculateEMI() {
    try {
      let emi = 0;
      let r = interest;
      let p = principleAmount;
      let n = tenure;
      if (r === 0 || p === 0 || n === 0) {
        setShowEmi(0);
      } else {
        r = interest / 12 / 100;
        emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
        setShowEmi(emi.toFixed(2));
      }
    } catch (error) {
      console.log('catch in calculate_EMI : ', error);
    }
  }


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


  const [HomeLoanVisible, setHomeLoanVisible] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
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
        nestedScrollEnabled
        initialNumToRender={5}
        renderItem={({ item }) => {
          switch (item) {
            case 'Apply Albion Home Online':
              return (
                <View style={{ width: scr_width, backgroundColor: 'white' }}>
                  <View style={{ width: scr_width }}>
                    <Image
                      source={{ uri: Media.home_loan_bann }}
                      style={{
                        width: scr_width,
                        height: 220,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '100',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                          fontFamily: 'Poppins-Bold',
                        }}>
                        Apply
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: primarycolor,
                          paddingHorizontal: 5,
                          fontFamily: 'Poppins-Bold',
                        }}>
                        Albion Home
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                      }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: primarycolor,
                            fontFamily: 'Poppins-Bold',
                          }}>
                          Loan
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontFamily: 'Poppins-Bold',
                            paddingHorizontal: 5,
                          }}>
                          Online!
                        </Text>
                      </View>
                      <View style={{ marginHorizontal: 5 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            backgroundColor: '#FFA825',
                            padding: 7,
                            paddingHorizontal: 20,
                            borderRadius: 40,
                            color: 'white',
                          }}>
                          Benefits
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <Text
                        style={{
                          width: '95%',
                          fontSize: 14,
                          color: '#666',
                          paddingVertical: 10,
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                          textAlign: 'justify',
                        }}>
                        Are you dreaming of owning your own home? Albion is here
                        to turn that dream into reality.
                      </Text>
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Fill out an Online Form
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Get started by filling out a simple online form on the
                        Albion app.
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Expert Assistance
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Our dedicated team of experienced executives is here to
                        assist you in making the right choice.
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        marginVertical: 5,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Convenient Document Collection
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Albion offers a hassle-free solution by picking up all
                        the required documents right at your doorstep.
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Bank Review{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        The bank will review your application and provide
                        confirmation of approval.
                      </Text>
                    </View>
                  </View>
                </View>
              );
            case 'Check your Eligibility':
              return (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      marginVertical: 10,
                      backgroundColor: '#FFF5E4',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flex: 1,
                        flexDirection: 'row',
                        paddingVertical: 5,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 10,
                        }}>
                        <View style={{ paddingVertical: 10 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            Benefits
                          </Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#333',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            High Value
                          </Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#333',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Lowest ROI
                          </Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#333',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            Fast Loan
                          </Text>
                        </View>
                        {/* <View style={{ paddingVertical: 10 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#333',
                              fontFamily: 'Poppins-Regular',
                            }}>
                            High Value
                          </Text>
                        </View> */}
                      </View>

                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          marginHorizontal: 5,
                        }}>
                        <View style={{ paddingVertical: 10 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            Other Banks
                          </Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'close'}
                            icon_size={24}
                            iconstyle={{ color: '#ED1B24' }}
                          />
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'close'}
                            icon_size={24}
                            iconstyle={{ color: '#ED1B24' }}
                          />
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'close'}
                            icon_size={24}
                            iconstyle={{ color: '#ED1B24' }}
                          />
                        </View>
                        {/* <View style={{ paddingVertical: 10 }}>
                          <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'close'}
                            icon_size={24}
                            iconstyle={{ color: '#ED1B24' }}
                          />
                        </View> */}
                      </View>

                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          marginHorizontal: 5,
                        }}>
                        <View style={{ paddingVertical: 10 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            Albion
                          </Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'check'}
                            icon_size={24}
                            iconstyle={{ color: '#239D0F' }}
                          />
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'check'}
                            icon_size={24}
                            iconstyle={{ color: '#239D0F' }}
                          />
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                          <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'check'}
                            icon_size={24}
                            iconstyle={{ color: '#239D0F' }}
                          />
                        </View>
                        {/* <View style={{ paddingVertical: 10 }}>
                          <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'check'}
                            icon_size={24}
                            iconstyle={{ color: '#239D0F' }}
                          />
                        </View> */}
                      </View>
                    </View>
                  </View>
                </View>
              );
            case 'How it works':
              return (
                <View
                  style={{
                    width: scr_width,
                    height: height,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        paddingHorizontal: 10,
                      }}>
                      Check Your Eligibility
                    </Text>

                    <Text
                      style={{
                        width: '90%',
                        fontSize: 14,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        padding: 5,
                      }}>
                      Enter Mobile Number
                    </Text>
                    <View style={styles.NumberBoxConatiner}>
                      <TextInput
                        placeholder="Enter your mobile number"
                        placeholderTextColor={Color.grey}
                        value={phonenumber}
                        keyboardType="name-phone-pad"
                        maxLength={10}
                        onChangeText={text => {
                          setPhoneNumber(text);
                        }}
                        style={styles.numberTextBox}
                      />
                    </View>
                    {/* <Text style={styles.invalidLogin}>{error}</Text> */}

                    <Text
                      style={{
                        width: '90%',
                        fontSize: 14,
                        color: '#666',
                        marginTop: 20,
                        fontFamily: 'Poppins-Regular',
                        padding: 5,
                      }}>
                      Enter your monthly income
                    </Text>
                    <View style={[styles.incomeBoxConatiner, { width: '88%' }]}>
                      <TextInput
                        placeholder="Enter monthly income"
                        placeholderTextColor={Color.grey}
                        value={income}
                        keyboardType="number-pad"
                        maxLength={10}
                        onChangeText={text => {
                          setIncome(text);
                        }}
                        style={styles.numberTextBox}
                      />
                    </View>
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-Regular',
                          padding: 5,
                        }}>
                        By continuing I agree to{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.replace('TermsCondition')}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: primarycolor,
                            fontFamily: 'Poppins-SemiBold',
                            padding: 5,
                          }}>
                          Albion T&C
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (phonenumber != '' && income != '') {
                          checkEligible();
                        } else {
                          if (Platform.OS === 'android') {
                            common_fn.showToast('Please Enter the Number and Income');
                          } else {
                            alert("Please Enter the Number and Income'")
                          }
                        }
                      }}
                      activeOpacity={0.7}
                      style={{
                        width: '88%',
                        height: 50,
                        marginVertical: 10,
                        backgroundColor: primarycolor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <Text style={{ fontSize: 16, color: 'white' }}>
                        Check Eligibility
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        paddingHorizontal: 10,
                      }}>
                      How it works
                    </Text>

                    <View
                      style={{
                        width: '95%',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={200}
                        decelerationRate="normal"
                      // pagingEnabled
                      >
                        <View
                          style={{
                            width: 200,
                            height: 140,
                            padding: 10,
                            marginHorizontal: 10,
                            backgroundColor: '#fff',
                            elevation: 5,
                            marginVertical: 10,
                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            1.
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                width: '95%',
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                                lineHeight: 25,
                              }}
                              numberOfLines={3}>
                              Fill an online form to view the best offers from
                              our partners banks.
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: 240,
                            height: 140,
                            padding: 10,
                            marginHorizontal: 15,
                            backgroundColor: '#fff',
                            elevation: 5,
                            marginVertical: 10,
                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            2.
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                width: '95%',
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                                lineHeight: 25,
                              }}
                              numberOfLines={3}>
                              Our executive helps you choose the best offer for
                              your requirement.
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: 240,
                            height: 140,
                            padding: 10,
                            marginHorizontal: 15,
                            backgroundColor: '#fff',
                            elevation: 5,
                            marginVertical: 10,
                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            3.
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                width: '95%',
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                                lineHeight: 25,
                              }}
                              numberOfLines={3}>
                              Fill an online form to view the best offers from
                              our partners banks.
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: 240,
                            height: 140,
                            padding: 10,
                            marginHorizontal: 15,
                            backgroundColor: '#fff',
                            elevation: 5,
                            marginVertical: 10,
                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            4.
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                width: '95%',
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                                lineHeight: 25,
                              }}
                              numberOfLines={3}>
                              Fill an online form to view the best offers from
                              our partners banks.
                            </Text>
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        paddingHorizontal: 10,
                      }}>
                      Home Loan Bank Partners
                    </Text>

                    <View style={{ width: '100%', alignItems: 'center' }}>
                      <View
                        style={{
                          width: '95%',
                          flexDirection: 'row',
                          marginVertical: 10,
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              marginVertical: 10,
                              padding: 10,
                              backgroundColor: 'white',
                              width: 70,
                              height: 70,
                              justifyContent: 'center',
                              alignItems: 'center',
                              elevation: 3,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{ uri: Media.home_hw_sbi }}
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#333',
                              fontFamily: 'Poppins-Bold',
                            }}>
                            SBI
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              From
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontFamily: 'Poppins-SemiBold',
                                paddingHorizontal: 5,
                              }}>
                              8.5%
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              p.a
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              marginVertical: 10,
                              padding: 10,
                              backgroundColor: 'white',
                              width: 70,
                              height: 70,
                              justifyContent: 'center',
                              alignItems: 'center',
                              elevation: 3,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{ uri: Media.home_hw_icici }}
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#333',
                              fontFamily: 'Poppins-Bold',
                            }}>
                            ICICI
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              From
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontFamily: 'Poppins-SemiBold',
                                paddingHorizontal: 5,
                              }}>
                              6.5%
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              p.a
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              marginVertical: 10,
                              padding: 10,
                              backgroundColor: 'white',
                              width: 70,
                              height: 70,
                              justifyContent: 'center',
                              alignItems: 'center',
                              elevation: 3,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{ uri: Media.home_hw_hdfc }}
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#333',
                              fontFamily: 'Poppins-Bold',
                            }}>
                            HDFC
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              From
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontFamily: 'Poppins-SemiBold',
                                paddingHorizontal: 5,
                              }}>
                              9.5%
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              p.a
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* ************************************************************ */}

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginVertical: 10,
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              marginVertical: 10,
                              padding: 10,
                              backgroundColor: 'white',
                              width: 70,
                              height: 70,
                              justifyContent: 'center',
                              alignItems: 'center',
                              elevation: 3,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{ uri: Media.home_hw_canara }}
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#333',
                              fontFamily: 'Poppins-Bold',
                            }}>
                            Canara
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              From
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontFamily: 'Poppins-SemiBold',
                                paddingHorizontal: 5,
                              }}>
                              6.5%
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              p.a
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              marginVertical: 10,
                              padding: 10,
                              backgroundColor: 'white',
                              width: 70,
                              height: 70,
                              justifyContent: 'center',
                              alignItems: 'center',
                              elevation: 3,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{ uri: Media.home_hw_bob }}
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#333',
                              fontFamily: 'Poppins-Bold',
                            }}>
                            BoB
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              From
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontFamily: 'Poppins-SemiBold',
                                paddingHorizontal: 5,
                              }}>
                              8.5%
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              p.a
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              marginVertical: 10,
                              padding: 10,
                              backgroundColor: 'white',
                              width: 70,
                              height: 70,
                              justifyContent: 'center',
                              alignItems: 'center',
                              elevation: 3,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{ uri: Media.home_hw_union }}
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#333',
                              fontFamily: 'Poppins-Bold',
                            }}>
                            Union Bank
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              From
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#000',
                                fontFamily: 'Poppins-SemiBold',
                                paddingHorizontal: 5,
                              }}>
                              7.5%
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#666',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              p.a
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* ************************************************** */}

                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 20,
                        }}>
                        <View style={{ marginHorizontal: 5 }}>
                          <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'exclamationcircle'}
                            icon_size={24}
                            iconstyle={{ color: '#666' }}
                          />
                        </View>
                        <View
                          style={{
                            width: '95%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                          }}>
                          <Text
                            style={{
                              width: '90%',
                              fontSize: 14,
                              color: '#666',
                              fontFamily: 'Poppins-Regular',
                              textAlign: 'justify',
                            }}>
                            Make your house-hunt easier and more focused with a
                            pre-approved loan
                            <TouchableOpacity
                              onPress={() =>
                                navigation.replace('TermsCondition')
                              }>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: primarycolor,
                                  fontFamily: 'Poppins-SemiBold',
                                  padding: 5,
                                }}>
                                Albion T&C
                              </Text>
                            </TouchableOpacity>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* ************************************************************************************ */}

                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '95%',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                          padding: 5,
                        }}>
                        Home Loan Calculator
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          backgroundColor: '#FFA825',
                          marginHorizontal: 10,
                          padding: 5,
                          paddingHorizontal: 15,
                          borderRadius: 40,
                        }}>
                        EMI
                      </Text>
                    </View>
                    <View style={{ width: '95%', alignItems: 'center' }}>
                      <Text
                        style={{
                          width: '95%',
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-Regular',
                          padding: 5,
                        }}>
                        Total Loan Amount
                      </Text>
                      <View
                        style={[
                          styles.incomeBoxConatiner,
                          { width: '95%', marginVertical: 5 },
                        ]}>
                        <TextInput
                          placeholder="₹ 00,00,000"
                          placeholderTextColor={Color.grey}
                          value={principleAmount}
                          keyboardType="number-pad"
                          maxLength={15}
                          // onChangeText={number => {
                          //     chkNumber(number);
                          // }}
                          onChangeText={val => setPrincipleAmount(val)}
                          style={styles.numberTextBox}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: '95%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: 5,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            width: '95%',
                            fontSize: 14,
                            color: '#666',
                            fontFamily: 'Poppins-Regular',
                            padding: 5,
                          }}>
                          Loan Tenure
                        </Text>
                        <View style={styles.incomeBoxConatiner}>
                          <TextInput
                            placeholder="1 month"
                            placeholderTextColor={Color.grey}
                            value={tenure}
                            keyboardType="number-pad"
                            // onChangeText={number => {
                            //     chkNumber(number);
                            // }}
                            maxLength={2}
                            onChangeText={val => setTenure(val)}
                            style={styles.numberTextBox}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          width: 5,
                          height: '100%',
                          backgroundColor: Color.white,
                        }}></View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            width: '95%',
                            fontSize: 14,
                            color: '#666',
                            fontFamily: 'Poppins-Regular',
                            padding: 5,
                          }}>
                          Interest Rate % (p.a)
                        </Text>
                        <View style={styles.incomeBoxConatiner}>
                          <TextInput
                            placeholder="00"
                            placeholderTextColor={Color.grey}
                            value={interest}
                            keyboardType="number-pad"
                            // onChangeText={number => {
                            //     chkNumber(number);
                            // }}
                            maxLength={2}
                            onChangeText={val => setInterest(val)}
                            style={styles.numberTextBox}
                          />
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => calculateEMI()}
                      activeOpacity={0.55}
                      style={{
                        width: '90%',
                        height: 50,
                        marginVertical: 20,
                        backgroundColor: primarycolor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <Text style={{ fontSize: 14, color: 'white' }}>
                        Calculate
                      </Text>
                    </TouchableOpacity>

                    <View style={{ width: '90%' }}>
                      <View style={{ paddingVertical: 5 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: 'Poppins-Bold',
                          }}>
                          {'\u20B9'} {showEmi}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#666',
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          You are Eligible for EMI Amount
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-Bold',
                        }}>
                        ₹ {principleAmount}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Principal Amount
                      </Text>
                    </View>
                  </View>

                  {/* ***************************************************************** */}
                  <View style={{ width: '90%', marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          width: '75%',
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                          paddingHorizontal: 5,
                        }}
                        numberOfLines={2}>
                        Why Choose Albion Home Loans?
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          backgroundColor: '#FFA825',
                          padding: 5,
                          paddingHorizontal: 15,
                          borderRadius: 40,
                        }}>
                        Offers
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        marginTop: 10,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconviewcomponent
                          Icontag={'Feather'}
                          iconname={'check'}
                          icon_size={22}
                          iconstyle={{ color: '#239D0F' }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color: '#333',
                            paddingHorizontal: 10,
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          Tailored Solutions
                        </Text>
                      </View>
                      <Text
                        style={{
                          width: '95%',
                          textAlign: 'justify',
                          paddingVertical: 10,
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        We offer personalized home loan solutions that match you
                        with the best offers from our partner banks based on
                        your specific requirements and financial goals.
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        marginTop: 10,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconviewcomponent
                          Icontag={'Feather'}
                          iconname={'check'}
                          icon_size={22}
                          iconstyle={{ color: '#239D0F' }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color: '#333',
                            paddingHorizontal: 10,
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          Expert Guidance
                        </Text>
                      </View>
                      <Text
                        style={{
                          width: '95%',
                          textAlign: 'justify',
                          paddingVertical: 10,
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        With Albion, you're not alone on your homebuying journey
                        and Albion helps you make informed decisions.
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        marginTop: 10,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconviewcomponent
                          Icontag={'Feather'}
                          iconname={'check'}
                          icon_size={22}
                          iconstyle={{ color: '#239D0F' }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color: '#333',
                            paddingHorizontal: 10,
                            fontFamily: 'Poppins-SemiBold',
                          }}>
                          Efficiency and Convenience
                        </Text>
                      </View>
                      <Text
                        style={{
                          width: '95%',
                          textAlign: 'justify',
                          paddingVertical: 10,
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Our streamlined process ensures that your application is
                        submitted securely and promptly.
                      </Text>
                    </View>
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'justify',
                        paddingVertical: 5,
                        fontSize: 16,
                        color: '#333',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                      }}>
                      Choose Albion for a convenient and efficient way to secure
                      your dream home loan.
                    </Text>
                  </View>

                  {/* ******************************************************************************* */}

                  <View
                    style={{ width: scr_width, height: 200, marginVertical: 10 }}>
                    <Image
                      source={{ uri: Media.home_loan_banner }}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                        borderRadius: 5,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        padding: 5,
                      }}>
                      Home Loan FAQs
                    </Text>

                    <View
                      style={{
                        width: '90%',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
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

                  {/* ***************************************************************************************** */}

                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        padding: 5,
                      }}>
                      Disclaimer:
                    </Text>
                    <Text
                      style={{
                        width: '90%',
                        fontSize: 14,
                        color: '#666',
                        textAlign: 'justify',
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                      }}>
                      The information available on this site has been gathered
                      from publicly available sources and is accurate to the
                      best of our knowledge. However, please be aware that the
                      rates and other offers may vary based on your profile and
                      may be subject to change without notice. Albion accepts no
                      liability for any loss arising from the use of the
                      information on this website. (T&C link:
                      https://www.albionauctions.com)
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 20,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{ uri: Media.albionlogo }}
                        style={{ width: 55, height: 55, resizeMode: 'contain' }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 3,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: primarycolor,
                          fontFamily: 'Poppins-Bold',
                        }}>
                        Albion Bank Auctions Pvt Ltd
                      </Text>
                      <Text
                        style={{
                          width: '95%',
                          textAlign: 'justify',
                          fontSize: 13,
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
                      marginVertical: 20,
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
                        }}
                        onPress={() => navigation.replace('AboutUs')}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#666',
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
                        }}
                        onPress={() => navigation.replace('PrivacyPolicy')}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#666',
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
                        marginVertical: 20,
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                        onPress={() => navigation.replace('TermsCondition')}>
                        <View
                          style={{
                            width: 5,
                            height: 5,
                            backgroundColor: '#666',
                            borderRadius: 50,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#666',
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
                        }}
                        onPress={e => {
                          Linking.openURL('https://albionpropertyhub.com/');
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
                            fontSize: 14,
                            color: '#666',
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

      <Modal visible={HomeLoanVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: Color.transparantBlack,
            justifyContent: 'center',
            padding: 15,
          }}>
          <View
            style={{
              backgroundColor: Color.white,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: Color.black,
                fontFamily: Poppins.Bold,
                fontSize: 20,
                textAlign: 'center',
              }}>
              Thank You
            </Text>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: Media.homeloan_ads }}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
              />
            </View>

            {/* <Text
              style={{
                color: Color.black,
                fontFamily: Poppins.Medium,
                fontSize: 16,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              What Happens Next ?
            </Text> */}
            <Text
              style={{
                color: Color.cloudyGrey,
                fontFamily: Poppins.Medium,
                fontSize: 14,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              Sit back and relax!. A Albion Home Loan Experts will call you
              shortly to discuss the best deals for you ...!
            </Text>
            <Button
              title={'GoTo Home Page'}
              buttonStyle={{
                backgroundColor: Color.primary,
                borderRadius: 50,
                marginVertical: 5,
              }}
              onPress={() => {
                navigation.replace('TabNavigator');
                setHomeLoanVisible(false);
              }}
            />
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
    padding: 10,
    backgroundColor: 'white',
  },
  NumberBoxConatiner: {
    width: '88%',
    borderColor: Color.grey,
    borderWidth: 1,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  incomeBoxConatiner: {
    width: '88%',
    borderColor: Color.grey,
    borderWidth: 1,
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
    fontFamily: 'Poppins-Regular',
  },
  invalidLogin: {
    width: '90%',
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
  },
});

export default HomeLoanService;
