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
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
  LogBox,
  Modal,
  Linking,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { BottomSheet } from 'react-native-btr';

import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Color, primarycolor } from '../../Utils/Colors';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import common_fn from '../../Config/common_fn';
import ExpandableComponent from '../../Utils/ExpandableComponent';
import fetchData from '../../Config/fetchData';
import { Poppins } from '../../Global/FontFamily';


const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Why should I invest in home interior design? ',
    subcategory: [
      {
        id: 1,
        val: 'Home interior design enhances the functionality, comfort, and aesthetics of your living space.',
      },
      // { id: 2, val: 'Comparatively cheaper than personal loans' },
      // { id: 3, val: 'Tax benefits' },
      // { id: 3, val: 'Home loan balance transfer' },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'How do I choose the right interior designer for my project?',
    subcategory: [
      {
        id: 4,
        val: 'Albion platform allows you to choose from a curated selection of top interior designers. You can review their portfolios, discuss your project with them, and select the one that aligns with your vision.',
      },
      // { id: 6, val: 'Home loan for renovation' },
    ],
  },
  {
    isExpanded: false,
    category_name: 'What is the typical timeline for a home interior project?',
    subcategory: [
      {
        id: 7,
        val: 'The scope of the project. A complete home interior may take several months, while individual rooms may require less time.',
      },
      // { id: 8, val: 'Check if you can afford to pay monthly EmIs from your current income.' },
      // { id: 9, val: 'Research all the loan options available before finalizing an offer.' },
    ],
  },
  {
    isExpanded: false,
    category_name: 'Can I customize my design to fit my budget?',
    subcategory: [
      {
        id: 10,
        val: 'Yes, Albion lists flexible budget options for home interior designers.',
      },
      // { id: 11, val: 'Prepayment charges' },
      // { id: 11, val: 'Loan conversion charges' },
      // { id: 11, val: 'Logal and technical chargers' },
    ],
  },
];

LogBox.ignoreAllLogs();

function HomeInterior({ navigation }) {
  const dispatch = useDispatch();
  //   const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);
  const [phoneno, setPhoneno] = useState('');
  const [error, setError] = useState(false);

  const [HomeLoanVisible, setHomeLoanVisible] = useState(false);
  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);

  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, username, profile, user_type_id, mobile_number, email } =
    userData;

  const [selectCitybottomSheetVisible, setSelectCitybottomSheetVisible] =
    useState(false);
  const [selectcity, setselectcity] = useState({});
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
    { id: 1, title: 'Albion Home Interior', data: ['Albion Home Interior'] },
    { id: 2, title: 'Albion Advantage', data: ['Albion Advantage'] },
    { id: 3, title: 'Home Decor FAQs', data: ['Home Decor FAQs'] },
  ]);

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log('catch in Home_interior use_Effect :', error);
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

  useEffect(() => {
    locationData();
  }, []);

  const [Location, setLocation] = useState([]);
  const locationData = async () => {
    var data = 'location=' + 'city' + '&state=' + '31';
    const filterloc = await fetchData.Location(data);
    setLocation(filterloc?.city);
  };

  async function checkHomeInterior() {
    try {

      if (phoneno != '' && selectcity?.city_id != '') {
        var data = {
          form_name: 'home_interior',
          payload: {
            mobile_number: phoneno,
            city: selectcity.city_id,
          },
          user_id: user_id,
        };
        const homeinteriorData = await fetchData.homeLoan_Api(data);

        if (homeinteriorData.status) {
          setHomeLoanVisible(true);
          setPhoneno('');
        } else {
          setPhoneno('');
          alert('Wait for some time');
          setHomeLoanVisible(false);
        }
      }

    } catch (error) {
      console.log('checkHome_Interior ----------', error);
    }
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
                data={Location}
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
    return (
      <View style={{ width: '95%', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => selectCity(item)}
          style={{
            width: '100%',
            alignItems: 'center',
            padding: 15,
            backgroundColor:
              selectCityItem?.city_id === item?.city_id
                ? primarycolor
                : 'white',
          }}>
          <Text
            style={{
              fontSize: selectCityItem?.city_id === item?.city_id ? 16 : 14,
              color:
                selectCityItem?.city_id === item?.city_id ? 'white' : 'black',
            }}>
            {item?.city}
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
  }

  function selectCity(item, index) {
    try {
      setselectcity(item);
      setSelectCityItem(item);
      setSelectCitybottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  /* ****************************************************  SELECT CITY BOTTOM SHEET ****************************************************** */

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
        // contentContainerStyle={{
        //   paddingTop: HeaderHeight,
        //   minHeight: windowHeight - TabBarHeight,
        // }}
        nestedScrollEnabled
        initialNumToRender={5}
        renderItem={({ item }) => {
          switch (item) {
            case 'Albion Home Interior':
              return (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <View style={{ width: scr_width }}>
                    <Image
                      source={{ uri: Media.home_banner }}
                      style={{
                        width: '100%',
                        height: 220,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: '98%',
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
                        An interior is the
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: primarycolor,
                          paddingHorizontal: 5,
                          fontFamily: 'Poppins-Bold',
                        }}>
                        natural
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
                          projection
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontFamily: 'Poppins-Bold',
                            paddingHorizontal: 5,
                          }}>
                          of the soul
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '95%',
                        alignItems: 'center',
                        marginVertical: 10,
                        marginHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                          textAlign: 'justify',
                        }}>
                        At Albion, we believe that your home is a canvas waiting
                        to be transformed into a masterpiece. That's why we've
                        collaborated with some of the top interior designers in
                        the industry to offer you a seamless and personalised
                        home interior experience.
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        padding: 5,
                      }}>
                      Quick Enquiry
                    </Text>

                    <View
                      style={{
                        width: '95%',
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          width: '95%',
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Select City
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => selectCity_toggleBottomView()}
                        style={{
                          width: '95%',
                          height: 50,
                          flexDirection: 'row',
                          paddingHorizontal: 20,
                          marginVertical: 10,
                          borderColor: '#666',
                          borderWidth: 0.5,
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: '#333',
                            fontFamily: 'Poppins-medium',
                          }}>{selectcity?.city?.length > 0 ? selectcity?.city : 'Select City'}
                        </Text>
                        <Iconviewcomponent
                          Icontag={'Entypo'}
                          iconname={'chevron-small-down'}
                          icon_size={24}
                          iconstyle={{ color: '#666' }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center' }}>
                      <Text
                        style={{
                          width: '95%',
                          fontSize: 14,
                          color: '#666',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Mobile Number
                      </Text>
                      <View style={styles.NumberBoxConatiner}>
                        <TextInput
                          placeholder="Enter mobile number"
                          placeholderTextColor={Color.grey}
                          value={phoneno}
                          keyboardType="phone-pad"
                          maxLength={10}
                          onChangeText={text => {
                            setPhoneno(text);
                          }}
                          style={styles.numberTextBox}
                        />
                      </View>
                      <Text style={styles.invalidLogin}>{error}</Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => checkHomeInterior()}
                      style={{
                        width: '90%',
                        height: 50,
                        marginVertical: 0,
                        backgroundColor: primarycolor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'white',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Free Consultation
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 20,
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                        paddingHorizontal: 25,
                      }}>
                      Albion’s Advantage
                    </Text>
                  </View>
                </View>
              );
            case 'Albion Advantage':
              return (
                <View
                  style={{
                    width: '95%',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                  }}>
                  <View style={{ width: '100%', marginHorizontal: 10 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                      }}>
                      <Iconviewcomponent
                        Icontag={'Feather'}
                        iconname={'check'}
                        icon_size={22}
                        iconstyle={{ color: '#239D0F' }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          paddingHorizontal: 10,
                          lineHeight: 25,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.int_text}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            case 'Home Decor FAQs':
              return (
                <View
                  style={{
                    width: '98%',
                    height: height,
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        width: scr_width,
                        height: 200,
                        backgroundColor: '#fff',
                        elevation: 2,
                        marginVertical: 10,
                        borderRadius: 10,
                      }}>
                      <Image
                        source={{ uri: Media.home_gif }}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      paddingHorizontal: 15,
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Why Interior Designing is Important for Everyone
                    </Text>

                    <View style={{ width: '100%', marginVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Turn Your Home into a happy Place
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          paddingVertical: 5,
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Home interior design is not just about aesthetics; it's
                        about creating a functional and comfortable living
                        environment.
                      </Text>
                    </View>

                    <View style={{ width: '100%', marginVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Make the Best Use of Your Space
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Personalization: Interior design allows you to
                        personalise your space, making it a reflection of your
                        tastes and personality.
                      </Text>
                    </View>

                    <View style={{ width: '100%', marginVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Functionality:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        A well-designed interior optimises space and
                        functionality, making daily living more convenient and
                        enjoyable.
                      </Text>
                    </View>
                    <View style={{ width: '100%', marginVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Comfort:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Thoughtfully chosen furnishings and layouts contribute
                        to a comfortable and cosy atmosphere.
                      </Text>
                    </View>
                    <View style={{ width: '100%', marginVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Increased Value:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        A beautifully designed home often has a higher market
                        value and can attract potential buyers or renters.
                      </Text>
                    </View>
                    <View style={{ width: '100%', marginVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Enhanced Well-Being:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Your home environment can significantly impact your
                        mental and emotional well-being.
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      marginVertical: 10,
                      paddingHorizontal: 15,
                    }}>
                    <Text
                      style={{
                        width: '95%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Our Home Interior Services
                    </Text>

                    <View style={{ width: '100%', paddingVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-SemiBold',
                          lineHeight: 25,
                        }}>
                        1. Full Home Interior:{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Transform your entire home with the top interior
                        designers.{' '}
                      </Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-SemiBold',
                          lineHeight: 25,
                        }}>
                        2. Kitchen and Wardrobe Design:{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Create the kitchen of your dreams and also get your
                        wardrobe done by the top wardrobe designers, maximising
                        storage while maintaining elegance.
                      </Text>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 10 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#333',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-SemiBold',
                          lineHeight: 25,
                        }}>
                        3. Furnishing:{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#666',
                          textAlign: 'justify',
                          fontFamily: 'Poppins-Regular',
                          lineHeight: 25,
                        }}>
                        Complete your interior transformation with furnishing.
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{ width: scr_width, height: 200, marginVertical: 10 }}>
                    <Image
                      source={{ uri: Media.home_ban }}
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
                      paddingHorizontal: 15,
                    }}>
                    <Text
                      style={{
                        width: '100%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Any Queries? We are here to help
                    </Text>

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: '#FBE9EF',
                        marginVertical: 10,
                      }}>
                      <View
                        style={{
                          flex: 2,
                          padding: 5,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#666',
                            textAlign: 'justify',
                            fontFamily: 'Poppins-Regular',
                            lineHeight: 25,
                          }}>
                          We collaborate with the best-in-class home interior
                          and home design company
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            padding: 5,
                            paddingHorizontal: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            elevation: 3,
                            borderRadius: 40,
                          }}>
                          <Iconviewcomponent
                            Icontag={'Ionicons'}
                            iconname={'chatbubble-ellipses-outline'}
                            icon_size={20}
                            iconstyle={{ color: primarycolor }}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              paddingHorizontal: 5,
                              color: primarycolor,
                              fontFamily: 'Poppins-Bold',
                            }}>
                            SMS
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            marginVertical: 15,
                            padding: 5,
                            paddingHorizontal: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: primarycolor,
                            borderRadius: 40,
                          }}>
                          <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'phone-call'}
                            icon_size={18}
                            iconstyle={{ color: 'white' }}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'white',
                              paddingHorizontal: 5,
                              fontFamily: 'Poppins-Bold',
                            }}>
                            CALL
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '95%',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        width: '100%',
                        fontSize: 16,
                        color: 'black',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Home Decors FAQs
                    </Text>

                    <View style={{ width: '100%', marginVertical: 10 }}>
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
                        paddingHorizontal: 10,
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
                        marginVertical: 40,
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
                        onPress={() =>
                          Linking.openURL('https://albionpropertyhub.com/')
                        }>
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
              Albion Home Interior Experts will call you shortly to discuss the
              best deals for you ...!
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('TabNavigator'), setHomeLoanVisible(false);
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

      {selCity_BottomSheetmenu()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: scr_width,
    // height: scr_height,
    flex:1,
    backgroundColor: 'white',
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
  numberTextBox: {
    width: '100%',
    height: 50,
    color: Color.BLACK,
    fontSize: 15,
    fontFamily: 'Poppins-medium',
  },
  invalidLogin: {
    width: '90%',
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
  },
});

export default HomeInterior;
