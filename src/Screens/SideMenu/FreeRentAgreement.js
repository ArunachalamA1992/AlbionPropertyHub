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
  LogBox, Linking
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { primarycolor } from '../../Utils/Colors';
import Color from '../../Config/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import common_fn from '../../Config/common_fn';
import { Modal } from 'react-native';
import { Poppins } from '../../Global/FontFamily';
import { Button } from 'react-native-elements';
import ExpandableComponent from '../../Utils/ExpandableComponent';

const freeRentalData = [
  {
    id: '0',
    rent_img: Media.fill,
    rent_title: 'Fill details online',
    rent_subText: 'Fill in your details in a fully customized legal template',
  },
  {
    id: '1',
    rent_img: Media.get,
    rent_title: 'Get FREE Agreement',
    rent_subText:
      'It’s paperless, download the best-in-class template from the comfort of your home',
  },
  {
    id: '2',
    rent_img: Media.more,
    rent_title: 'Avail More Services',
    rent_subText:
      'Get a stamped soft copy or opt for a physical delivery for a nominal fee',
  },
  {
    id: '3',
    rent_img: Media.receive,
    rent_title: 'Receive Discount Vouchers',
    rent_subText:
      'Enjoy great deals from top brands basis the service you avail',
  },
];

const FAQCONTENT = [
  {
    isExpanded: true,
    category_name: 'Is the rent agreement created on Albion legally binding?',
    subcategory: [
      {
        id: 1,
        val: 'Yes, our rent agreements are legally binding and designed to comply with relevant legal standards.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What customization options are available for rent agreements?',
    subcategory: [
      {
        id: 4,
        val: 'You can customize clauses related to maintenance, security deposits, and other terms as needed.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'Are there any charges for creating a rent agreement on Albion?',
    subcategory: [
      {
        id: 7,
        val: 'No, Albion offers free rent agreement templates for your convenience.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'How can I ensure the authenticity of tenant verification reports?',
    subcategory: [
      {
        id: 10,
        val: 'Our tenant verification services include background checks and identity verification to ensure authenticity',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What should I expect from Albion packers and movers service?',
    subcategory: [
      {
        id: 10,
        val: 'Our packers and movers service ensures safe and efficient transportation of your belongings during a move.',
      },
    ],
  },
];


LogBox.ignoreAllLogs();

const FreeRentAgreement = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);
  const [listDataSource, setListDataSource] = useState(FAQCONTENT);
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
        <View style={{ width: scr_width }}>
          <View style={{ width: scr_width }}>
            <Image
              source={{ uri: Media.free_main }}
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
                FREE
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  color: 'black',
                  paddingHorizontal: 5,
                  fontFamily: 'Poppins-Bold',
                }}>
                Rent Agreement
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily: 'Poppins-Regular',
              }}>
              100% Protection from Legal Disputes
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
              A rental agreement is a crucial document that outlines the terms
              and conditions of a rental arrangement. Here's what you should
              know about its content:
            </Text>

            <View style={{ width: '100%', paddingVertical: 10 }}>
              <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'dot-single'}
                    icon_size={26}
                    iconstyle={{ color: '#333' }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#333',
                      lineHeight: 25,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Parties Involved :
                  </Text>
                </View>
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
                  The rental agreement should clearly state the names and
                  contact details of both the landlord and tenant.
                </Text>
              </View>
              <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'dot-single'}
                    icon_size={26}
                    iconstyle={{ color: '#333' }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#333',
                      lineHeight: 25,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Property Details :
                  </Text>
                </View>
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
                  It should include a detailed description of the rental
                  property, including its address, type, and any specific
                  features.
                </Text>
              </View>
              <View style={{ width: '95%', paddingVertical: 5 }}>
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
                      fontSize: 16,
                      color: '#333',
                      lineHeight: 25,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Rent and Deposits :
                  </Text>
                </View>
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
                  Specify the rent amount, due date, and the mode of payment.
                  Additionally, mention details about security deposits, if
                  applicable.
                </Text>
              </View>
              <View style={{ width: '95%', paddingVertical: 5 }}>
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
                      fontSize: 16,
                      color: '#333',
                      lineHeight: 25,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Term of Lease :
                  </Text>
                </View>
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
                  Define the lease duration, including the start and end dates.
                  Include provisions for renewal or termination.
                </Text>
              </View>
              <View style={{ width: '95%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'dot-single'}
                    icon_size={26}
                    iconstyle={{ color: '#333' }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#333',
                      lineHeight: 25,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Responsibilities :
                  </Text>
                </View>
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
                  Clearly outline the responsibilities of both parties regarding
                  maintenance, repairs, and utilities.
                </Text>
              </View>
              <View style={{ width: '95%', paddingVertical: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'dot-single'}
                    icon_size={26}
                    iconstyle={{ color: '#333' }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#333',
                      lineHeight: 25,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Termination and Notice Period :
                  </Text>
                </View>
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
                  Specify the conditions under which the agreement can be
                  terminated and the notice period required.
                </Text>
              </View>
              <View style={{ width: '95%', paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'dot-single'}
                    icon_size={26}
                    iconstyle={{ color: '#333' }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#333',
                      lineHeight: 25,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Miscellaneous Clauses :
                  </Text>
                </View>
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
                  Include any additional clauses related to pets, subletting, or
                  any specific terms agreed upon by both parties.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}
              onPress={() => {
                setFreeRentVisible(true);
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#ED1B24',
                  paddingHorizontal: 10,
                  lineHeight: 25,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Get Free Rent Agreement
              </Text>
              <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'arrow-forward-circle-outline'}
                icon_size={22}
                iconstyle={{ color: '#ED1B24' }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
                paddingHorizontal: 15,
              }}>
              How it works?
            </Text>
          </View>
        </View>
      );
    } catch (error) {
      console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
    }
  }

  function renderFreeRentalItem(item, index, setFreeRentVisible) {
    try {
      return (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            margin: 2,
          }}>
          <View
            style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: item.rent_img }}
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
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingLeft: 10,
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#333',
                fontFamily: 'Poppins-SemiBold',
                lineHeight: 25,
                textAlign: 'justify',
              }}
              numberOfLines={1}>
              {item.rent_title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                fontFamily: 'Poppins-Regular',
                lineHeight: 25,
                textAlign: 'justify',
              }}
              numberOfLines={2}>
              {item.rent_subText}
            </Text>
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
        <View
          style={{
            width: '97%',
            height: height,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: scr_width,
              height: 230,
              backgroundColor: '#FBE9EF',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <View
              style={{
                flex: 3,
                marginStart: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: Media.free_man }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                flex: 2,
                width: '100%',
                marginHorizontal: 10,
                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                elevation: 1,
                borderColor: '#666',
                borderRadius: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Approved
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#666',
                      textAlign: 'justify',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    From Legal Disputes
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{ uri: Media.albionlogo }}
                    style={{ width: 45, height: 45, resizeMode: 'contain' }}
                  />
                </View>
              </View>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#BEE1B8',
                    padding: 7,
                    marginVertical: 10,
                    borderRadius: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={'check-decagram'}
                    icon_size={22}
                    iconstyle={{ color: '#239D0F' }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#239D0F',
                      marginHorizontal: 10,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    PROTECTION
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#BEE1B8',
                    padding: 7,
                    paddingHorizontal: 15,
                    marginVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={'check-decagram'}
                    icon_size={22}
                    iconstyle={{ color: '#239D0F' }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#239D0F',
                      marginHorizontal: 10,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    VALIDATED
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
                paddingHorizontal: 5,
              }}>
              Any Questions? We are here to help
            </Text>

            <View style={{ width: '100%', paddingVertical: 10 }}>
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
                fontFamily: 'Poppins-SemiBold',
              }}>
              Explore Other Services
            </Text>
            <Text
              style={{
                width: '95%',
                fontSize: 15,
                color: '#666',
                textAlign: 'justify',
                lineHeight: 25,
                fontFamily: 'Poppins-Regular',
                paddingVertical: 5,
              }}>
              At Albion, we offer a range of services beyond rent agreements to
              enhance your renting experience:
            </Text>

            <View
              style={{ width: '100%', alignItems: 'center', marginVertical: 5 }}>
              <View style={{ width: '95%', paddingVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    lineHeight: 25,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Tenant Verification :
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
                    Ensure the security of your property with our tenant
                    verification services.
                  </Text>
                </View>
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
                    Background checks, identity verification, and rental history
                    analysis are just a few of the features we offer.
                  </Text>
                </View>
              </View>

              <View style={{ width: '95%', paddingVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    lineHeight: 25,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Packers & Movers :
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
                    Moving can be stressful, but Albion's packers and movers
                    service makes it a breeze.
                  </Text>
                </View>
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
                    Trust our experienced professionals to handle your
                    belongings safely and efficiently.
                  </Text>
                </View>
              </View>

              <View style={{ width: '95%', paddingVertical: 5 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#333',
                    lineHeight: 25,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Home Cleaning :
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
                    Prepare your property for new tenants or enjoy a fresh start
                    with Albion's home cleaning service.
                  </Text>
                </View>
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
                    Our skilled cleaners will leave your property spotless and
                    inviting.
                  </Text>
                </View>
              </View>
            </View>
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
                style={{ width: 60, height: 60, resizeMode: 'contain' }}
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
                }} onPress={() => navigation.replace("AboutUs")} >
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }} onPress={() => navigation.replace("PrivacyPolicy")} >
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
                marginVertical: 40,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }} onPress={() => navigation.replace("TermsCondition")} >
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
      console.log("catch in renderFooterItem's Free_rental : ", error);
    }
  }
  const [FreeRentVisible, setFreeRentVisible] = useState(false);


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
          renderItem={({ item, index }) =>
            renderFreeRentalItem(item, index, setFreeRentVisible)
          }
          ListFooterComponent={() => renderFooterItem()}
          style={{ width: '95%' }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modal visible={FreeRentVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: Color.transparantBlack }} />
        <View
          style={{
            backgroundColor: Color.white,
            padding: 20,
            borderRadius: 10,
            // flex: 1,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: 'center',
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
          <Text
            style={{
              color: Color.black,
              fontFamily: Poppins.Medium,
              fontSize: 16,
              textAlign: 'center',
              marginVertical: 10,
            }}>
            Free Rent Agreement Has been sent to your email
          </Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: Media.homeloan_ads }}
              style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />
          </View>
          <Button
            title={'Back to Home Page'}
            buttonStyle={{
              backgroundColor: Color.primary,
              borderRadius: 50,
            }}
            onPress={() => {
              navigation.replace('TabNavigator');
              setFreeRentVisible(false);
            }}
          />
        </View>
      </Modal>
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

export default FreeRentAgreement;
