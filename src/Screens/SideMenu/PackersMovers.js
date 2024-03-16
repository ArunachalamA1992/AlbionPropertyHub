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
  TouchableOpacity,
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
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { primarycolor } from '../../Utils/Colors';
import Color from '../../Config/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import { BottomSheet } from 'react-native-btr';
import common_fn from '../../Config/common_fn';
import ExpandableComponent from '../../Utils/ExpandableComponent';
import { Poppins } from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';

const freeRentalData = [
  {
    id: '0',
    rent_img: Media.fill,
    rent_title: 'Fill details online',
    rent_subText: 'Fill in your details in a fully customized legal template',
  },
];

const freeRentalSubData = [
  {
    id: '0',
    rent_img: Media.low_price,
    rent_title: 'Lowest Price Guarantee',
  },
  {
    id: '1',
    rent_img: Media.secure,
    rent_title: '100% Transparent Prices',
  },
  {
    id: '2',
    rent_img: Media.safe_secure,
    rent_title: 'Safe & Secure with your packers',
  },
  {
    id: '3',
    rent_img: Media.free_cancel,
    rent_title: 'Free cancellation or Modify Date',
  },
];

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'How much does hiring packers and movers typically cost?',
    subcategory: [
      {
        id: 1,
        val: 'The cost varies based on factors such as the volume of items, distance, and services required.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'How do I choose the right packers and movers company for my move?',
    subcategory: [
      {
        id: 4,
        val: 'Consider factors like reputation, experience, services offered, and customer reviews. Albion provides a list of trusted partners for your convenience.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name: 'Do packers and movers handle long-distance moves as well?',
    subcategory: [
      {
        id: 7,
        val: 'Yes, most packers and movers companies offer both local and long-distance relocation services.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What items should I personally transport rather than entrusting them to the movers?',
    subcategory: [
      {
        id: 10,
        val: 'Valuables, important documents, and items of sentimental value are best kept with you during the move',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'How much advance notice should I give when booking packers and movers services?',
    subcategory: [
      {
        id: 10,
        val: 'Its recommended to book well in advance, especially during peak moving seasons. Providing at least a few week notice is ideal.',
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

const fromCityData = [
  {
    id: '0',
    city_name: 'Salem',
  },
  {
    id: '1',
    city_name: 'Coimbatore',
  },
  {
    id: '2',
    city_name: 'Erode',
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

const toCityData = [
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

LogBox.ignoreAllLogs();

const PackersMovers = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectToggleCity, setSelectToggleCity] = useState('WithInCity');
  const [height, setHeight] = useState(undefined);
  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;

  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, username, profile, user_type_id, mobile_number, email } =
    userData;

  const [selectCitybottomSheetVisible, setSelectCitybottomSheetVisible] =
    useState(false);
  const [selectcity, setselectcity] = useState('Select City');
  const [selectCityItem, setSelectCityItem] = useState('');

  const [selbwbottomSheetVisible, setSelbwBottomSheetVisible] = useState(false);
  const [selectCityFrom, setSelectCityFrom] = useState('Select Moving From');
  const [selectCityFromItem, setSelectCityFromItem] = useState('');
  const [selectFromTo, setSelectFromTo] = useState('From');

  const [selectCityTo, setSelectCityTo] = useState('Select Moving To');
  const [selectCityToItem, setSelectCityToItem] = useState('');

  const [HomeLoanVisible, setHomeLoanVisible] = useState(false);

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
        <View style={{ width: scr_width }}>
          <View style={{ width: scr_width }}>
            <Image
              source={{ uri: Media.headerPack }}
              style={{
                width: scr_width,
                height: 240,
                resizeMode: 'cover',
              }}
            />
          </View>
          <View style={{ width: '100%', padding: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  color: primarycolor,
                  fontFamily: 'Poppins-Bold',
                }}>
                Packers
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                and
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  color: primarycolor,
                  fontFamily: 'Poppins-Bold',
                }}>
                Movers
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                services
              </Text>
            </View>
            <Text
              style={{
                width: '95%',
                fontSize: 16,
                color: '#333',
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'justify',
              }}>
              100% Safe and Secure shipping - Simplify Your Move with Albion's
              Trusted Packers and Movers Partners.
            </Text>
            <Text
              style={{
                width: '95%',
                fontSize: 15,
                color: '#666',
                fontFamily: 'Poppins-Regular',
                textAlign: 'justify',
                lineHeight: 25,
                paddingVertical: 5,
              }}>
              Moving to a new home can be both exciting and daunting, and Albion
              is here to make the process seamless for you. We've partnered with
              some of the best packers and movers companies, all listed
              conveniently on our app.
            </Text>

            <View style={{ width: '100%', paddingVertical: 10 }}>
              <Text
                style={{
                  width: '95%',
                  fontSize: 16,
                  color: '#333',
                  fontFamily: 'Poppins-SemiBold',
                  textAlign: 'justify',
                }}>
                What Packers and Movers Companies Offer
              </Text>
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
                    width: '85%',
                    fontSize: 15,
                    color: '#666',
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'justify',
                    lineHeight: 25,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}>
                  Experienced professionals carefully pack your belongings,
                  ensuring they are secure and well-protected during transit.
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
                  icon_size={22}
                  iconstyle={{ color: '#239D0F' }}
                />
                <Text
                  style={{
                    width: '85%',
                    fontSize: 15,
                    color: '#666',
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'justify',
                    lineHeight: 25,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}>
                  They handle the heavy lifting, efficiently loading your items
                  onto the moving truck and unloading them at your new location.
                  The team can assist with unpacking and setting up your
                  furniture and appliances in your new home.
                </Text>
              </View>
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
        <View style={{ width: '95%', alignSelf: 'center', alignItems: 'center' }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="normal"
            style={{ width: '95%' }}
          // pagingEnabled
          >
            {freeRentalSubData.map((item, index) => {
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      padding: 20,
                      borderRadius: 50,
                      borderWidth: 0.5,
                      borderColor: '#666',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.rent_img != 'null' ? (
                      <Image
                        source={item.rent_img}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    ) : (
                      <Image
                        source={{ uri: Media.noImage }}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      marginTop: 10,
                      fontSize: 12,
                      color: 'black',
                      fontFamily: 'Poppins-SemiBold',
                    }}
                    numberOfLines={2}>
                    {item.rent_title}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    } catch (error) {
      console.log('catch in render FreeRental_Item : ', error);
    }
  }

  function renderFooterItem(item, index) {
    try {
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
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 15,
            }}>
            <Text
              style={{
                width: '100%',
                fontSize: 15,
                color: '#666',
                fontFamily: 'Poppins-Regular',
                textAlign: 'justify',
                lineHeight: 25,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              Packers and movers will pack everything safely including fragile
              and valuable items. Our packers will use bubble wraps, wrapping
              paper, cardboard boxes, wrapping foam, packing tapes, thermocol
              sheet so goods will be safely transported but they won't take
              flammable goods.
            </Text>
          </View>

          <View style={{ width: '95%', alignItems: 'center' }}>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#333',
                  fontFamily: 'Poppins-Regular',
                }}>
                Let us know
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {' '}
                where are you shifting?
              </Text>
            </View>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() => setSelectToggleCity('WithInCity')}
                style={{
                  flex: 1,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    selectToggleCity === 'WithInCity'
                      ? primarycolor
                      : '#e5e5e5',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: selectToggleCity === 'WithInCity' ? 'white' : '#666',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Within the City
                </Text>
              </TouchableOpacity>
              <View style={{ marginHorizontal: 0 }}></View>
              <TouchableOpacity
                onPress={() => setSelectToggleCity('BetweenInCity')}
                style={{
                  flex: 1,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    selectToggleCity === 'BetweenInCity'
                      ? primarycolor
                      : '#e5e5e5',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      selectToggleCity === 'BetweenInCity' ? 'white' : '#666',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Between the City
                </Text>
              </TouchableOpacity>
            </View>

            {selectToggleCity === 'WithInCity' ? (
              <View
                style={{
                  width: '100%',
                  marginVertical: 5,
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
                      color: '#666',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Select City
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => selectCity_toggleBottomView()}
                  style={{
                    width: '95%',
                    height: 55,
                    borderWidth: 0.5,
                    borderColor: '#888',
                    borderRadius: 5,
                    marginVertical: 20,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#333',
                      paddingHorizontal: 10,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {selectcity}
                  </Text>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'chevron-down'}
                    icon_size={22}
                    iconstyle={{ color: '#666', marginHorizontal: 20 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => selectWithInCity()}
                  style={{
                    width: '95%',
                    height: 50,
                    marginVertical: 10,
                    backgroundColor: primarycolor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Free Consultation
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  width: '95%',
                  marginVertical: 10,
                  alignItems: 'center',
                }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Iconviewcomponent
                      Icontag={'Fontisto'}
                      iconname={'map-marker-alt'}
                      icon_size={22}
                      iconstyle={{ color: primarycolor }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#666',
                        marginHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Moving From
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => selBetweenCity_toggleBottomView('From')}
                    style={{
                      width: '100%',
                      height: 55,
                      borderWidth: 0.5,
                      borderColor: '#888',
                      borderRadius: 5,
                      marginVertical: 10,
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#333',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      {selectCityFrom}
                    </Text>
                    <Iconviewcomponent
                      Icontag={'Entypo'}
                      iconname={'chevron-down'}
                      icon_size={22}
                      iconstyle={{ color: '#666', marginHorizontal: 20 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Iconviewcomponent
                      Icontag={'Fontisto'}
                      iconname={'map-marker-alt'}
                      icon_size={22}
                      iconstyle={{ color: primarycolor }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#666',
                        marginHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Moving To
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => selBetweenCity_toggleBottomView('To')}
                    style={{
                      width: '100%',
                      height: 55,
                      borderWidth: 0.5,
                      borderColor: '#888',
                      borderRadius: 5,
                      marginVertical: 10,
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#333',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      {selectCityTo}
                    </Text>
                    <Iconviewcomponent
                      Icontag={'Entypo'}
                      iconname={'chevron-down'}
                      icon_size={22}
                      iconstyle={{ color: '#666', marginHorizontal: 20 }}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => selectBetweenInCity()}
                  style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 10,
                    backgroundColor: primarycolor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Free Consultation
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={{ width: '95%', marginVertical: 20 }}>
            <Text
              style={{
                paddingHorizontal: 15,
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              How It Works: The Packers and Movers Process
            </Text>

            <View
              style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 15 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333',
                  lineHeight: 25,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Submit Your Requirements :
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Iconviewcomponent
                  Icontag={'Entypo'}
                  iconname={'dot-single'}
                  icon_size={26}
                  iconstyle={{ color: '#333' }}
                />
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'justify',
                    fontSize: 15,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  You provide details about your move, including the current and
                  destination addresses, the volume of belongings, and any
                  specific requests.
                </Text>
              </View>
            </View>

            <View
              style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 15 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333',
                  lineHeight: 25,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Schedule the Move :
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Iconviewcomponent
                  Icontag={'Entypo'}
                  iconname={'dot-single'}
                  icon_size={26}
                  iconstyle={{ color: '#333' }}
                />
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'justify',
                    fontSize: 15,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {' '}
                  Coordinate with your chosen company to schedule the move on a
                  date and time that works for you.
                </Text>
              </View>
            </View>

            <View
              style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 15 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333',
                  lineHeight: 25,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Sit Back and Relax :
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Iconviewcomponent
                  Icontag={'Entypo'}
                  iconname={'dot-single'}
                  icon_size={26}
                  iconstyle={{ color: '#333' }}
                />
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'justify',
                    fontSize: 15,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  On the scheduled day, the packers and movers team will arrive,
                  handle the entire process, and transport your belongings to
                  your new home.
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ width: '95%', alignItems: 'center', marginVertical: 20 }}>
            <Text
              style={{
                width: '100%',
                paddingHorizontal: 15,
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Benefits of Hiring Packers and Movers
            </Text>
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 15,
                color: '#666',
                lineHeight: 25,
                textAlign: 'justify',
                fontFamily: 'Poppins-Regular',
                marginVertical: 5,
              }}>
              When you hire a packer and mover service, they assist you in
              properly packing and delivering your packer possessions to the
              location of your choice.{' '}
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: Media.efficient }}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginStart: 0,
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Efficiency and Expertise
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 15,
                    color: '#666',
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 20,
                    paddingVertical: 5,
                  }}>
                  Packers and movers are experts in their field, ensuring that
                  your move is carried out efficiently and without hassle
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Time-Saving
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#666',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 20,
                    paddingVertical: 5,
                  }}>
                  Hiring professionals saves you time and energy, allowing you
                  to focus on other aspects of your move
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: Media.timesave }}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: Media.security }}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 4,
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Safety and Security
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#666',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 20,
                    paddingVertical: 5,
                  }}>
                  Packers and movers companies take utmost care in handling your
                  belongings, minimising the risk of damage or loss during
                  transit
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
            <Text
              style={{
                width: '95%',
                paddingVertical: 10,
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-Bold',
              }}>
              Frequently Asked Questions (FAQs)?
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
            style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-Bold',
              }}>
              Customer Review
            </Text>

            <View
              style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal"
              // pagingEnabled
              >
                <View
                  style={{
                    width: 320,
                    height: 160,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    elevation: 2,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFD6E3',
                        borderRadius: 100,
                      }}>
                      <Image
                        source={{ uri: Media.pro }}
                        style={{
                          width: 70,
                          height: 70,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontFamily: 'Poppins-Bold',
                        }}>
                        4.5{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#666',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        /5
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 3,
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontFamily: 'Poppins-SemiBold',
                      }}
                      numberOfLines={2}>
                      Arunachalam Annamalai
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        paddingVertical: 5,
                      }}
                      numberOfLines={4}>
                      Albion made it easier to shortlist the perfect designer to
                      bring my dream vision to life, with in the promise time!
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 320,
                    height: 160,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    elevation: 3,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFD6E3',
                        borderRadius: 100,
                      }}>
                      <Image
                        source={{ uri: Media.pro }}
                        style={{
                          width: 70,
                          height: 70,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontFamily: 'Poppins-Bold',
                        }}>
                        4.5{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#666',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        /5
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 3,
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontFamily: 'Poppins-SemiBold',
                      }}
                      numberOfLines={2}>
                      Naveen Kumar G
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        paddingVertical: 5,
                      }}
                      numberOfLines={4}>
                      Albion made it easier to shortlist the perfect designer to
                      bring my dream vision to life, with in the promise time!
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 320,
                    height: 160,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    elevation: 3,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <View
                      style={{
                        width: 80,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFD6E3',
                        borderRadius: 100,
                      }}>
                      <Image
                        source={{ uri: Media.pro }}
                        style={{
                          width: 70,
                          height: 70,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontFamily: 'Poppins-Bold',
                        }}>
                        4{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#666',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        /5
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 3,
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontFamily: 'Poppins-SemiBold',
                      }}
                      numberOfLines={2}>
                      Peter Heyn
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        paddingVertical: 5,
                      }}
                      numberOfLines={4}>
                      Albion made it easier to shortlist the perfect designer to
                      bring my dream vision to life, with in the promise time!
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>

          <View
            style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
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
              marginVertical: 40,
            }}>
            <View
              style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={{ uri: Media.albionlogo }}
                style={{ width: 55, height: 55, resizeMode: 'contain' }}
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
                    color: '#666',
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
                    color: '#666',
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
    } catch (error) {
      console.log("catch in renderFooter_Item's : ", error);
    }
  }

  async function selectWithInCity() {
    try {
      if (selectcity != '') {
        var data = {
          form_name: 'packers_movers',
          payload: {
            mobile_number: mobile_number,
            city: selectcity.city_id,
          },
          user_id: user_id,
        };
        const withinCityData = await fetchData.homeLoan_Api(data);

        if (withinCityData.status) {
          setHomeLoanVisible(true);
        } else {
          alert('Wait for some time');
          setHomeLoanVisible(false);
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Please Select City');
        } else {
          alert("Please Select City")
        }
      }
    } catch (error) {
      console.log('catch in selectWithIn_City : ', error);
    }
  }

  async function selectBetweenInCity() {
    try {
      if (selectCityFrom != '' && selectCityTo != '') {

        var data = {
          form_name: 'home_interior',
          payload: {
            mobile_number: mobile_number,
            from_city: selectCityFrom.city_id,
            to_city: selectCityTo.city_id
          },
          user_id: user_id,
        };
        const betweenCityData = await fetchData.homeLoan_Api(data);
        if (betweenCityData.status) {
          setHomeLoanVisible(true);
        } else {
          alert('Wait for some time');
          setHomeLoanVisible(false);
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Please select From City and To City');
        } else {
          alert("Please select From City and To City")
        }
      }
    } catch (error) {
      console.log('catch in selectWithIn_City : ', error);
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

  /* ****************************************************  SELECT BETWEEN CITY BOTTOM SHEET ****************************************************** */

  function selBetweenCity_toggleBottomView(type) {
    try {
      setSelectFromTo(type);
      setSelbwBottomSheetVisible(!selbwbottomSheetVisible);
    } catch (error) {
      console.log('catch in selBetweenCity_toggleBottomView :', error);
    }
  }

  function selBetweenCity_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={selbwbottomSheetVisible}
            onBackButtonPress={selBetweenCity_toggleBottomView}
            onBackdropPress={selBetweenCity_toggleBottomView}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: selectFromTo === 'From' ? 350 : 300,
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
                {selectFromTo === 'From' ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Select Moving From
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Select Moving To
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => setSelbwBottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={22}
                    iconstyle={{ color: primarycolor, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                data={selectFromTo === 'From' ? fromCityData : toCityData}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) =>
                  selectFromTo === 'From'
                    ? renderCityFromItem(item, index)
                    : renderCityToItem(item, index)
                }
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

  function renderCityFromItem(item, index) {
    try {
      return (
        <View style={{ width: '95%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => selectFromCity(item)}
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 15,
              backgroundColor:
                selectCityFromItem === item.city_name ? primarycolor : 'white',
            }}>
            <Text
              style={{
                fontSize: selectCityFromItem === item.city_name ? 16 : 14,
                color:
                  selectCityFromItem === item.city_name ? 'white' : 'black',
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

  function selectFromCity(item, index) {
    try {
      setSelectCityFrom(item.city_name);
      setSelectCityFromItem(item.city_name);
      setSelbwBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  function renderCityToItem(item, index) {
    try {
      return (
        <View style={{ width: '95%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => selectToCity(item)}
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 15,
              backgroundColor:
                selectCityToItem === item.city_name ? primarycolor : 'white',
            }}>
            <Text
              style={{
                fontSize: selectCityToItem === item.city_name ? 16 : 14,
                color: selectCityToItem === item.city_name ? 'white' : 'black',
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

  function selectToCity(item, index) {
    try {
      setSelectCityTo(item.city_name);
      setSelectCityToItem(item.city_name);
      setSelbwBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  /* ****************************************************  SELECT CITY BOTTOM SHEET ****************************************************** */


  return (
    <View style={styles.container}>

      {netInfo_State ? null :
        <Animated.View animation="fadeInRight" style={{ flex: 1, position: 'absolute', zIndex: 9999, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 0 }}>
          <Text style={{ color: 'white' }}>No Internet Connection</Text>
        </Animated.View>
      }


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
          renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
          ListFooterComponent={() => renderFooterItem()}
          style={{ width: '95%' }}
          showsVerticalScrollIndicator={false}
        />
      </View>

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
                fontSize: 15,
                textAlign: 'center',
                marginVertical: 5,
              }}>
              Great! Now sit back and relax!
            </Text>

            <Text
              style={{
                color: '#666',
                fontFamily: Poppins.Medium,
                fontSize: 14,
                textAlign: 'center',
              }}>
              Your request has been send successfully, our team will be
              contacted shortly with you.
            </Text>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: Media.homeloan_ads }}
                style={{ width: '95%', height: 160, resizeMode: 'contain' }}
              />
            </View>

            <View
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
                  fontSize: 14,
                  color: '#666',
                  fontFamily: Poppins.Medium,
                  paddingHorizontal: 5,
                }}>
                Free cancellation and modifications.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 5,
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
                  fontFamily: Poppins.Medium,
                  paddingHorizontal: 5,
                }}>
                Complimentary damage protection of Rs.3000 on electronic items.
              </Text>
            </View>
            <View
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
                  fontSize: 14,
                  color: '#666',
                  fontFamily: Poppins.Medium,
                  paddingHorizontal: 5,
                }}>
                Dedicated movement manager for any clarifications during house
                movement.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 5,
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
                  fontFamily: Poppins.Medium,
                  paddingHorizontal: 5,
                }}>
                Items list can be modified after booking; Extra charges
                applicable if item addition requires a change in vehicle size.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.replace('TabNavigator'), setHomeLoanVisible(false);
              }}
              style={{
                width: '95%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: primarycolor,
                borderRadius: 40,
                marginVertical: 10,
              }}>
              <Text style={{ fontSize: 14, color: 'white' }}>GoTo Home Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {selCity_BottomSheetmenu()}
      {selBetweenCity_BottomSheetmenu()}
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
  }
});

export default PackersMovers;
