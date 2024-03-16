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

const freeRentalData = [
  {
    id: '0',
    rent_img: Media.fill,
    rent_cost: '1499',
    rent_subs: '1999',
    rent_title: 'Property Evaluation',
    rent_subone: 'Sell your house at right price only',
    rent_subtwo:
      'Get a visit by our property experts who prepare an accurate & detailed valuation report',
  },
  {
    id: '1',
    rent_img: Media.fill,
    rent_cost: '3999',
    rent_subs: '4499',
    rent_title: 'Legal Services',
    rent_subone: 'Say No to legal disputes',
    rent_subtwo:
      'Speak to an attorney, get your purchase agreement drafted or verified by reputed lawyers',
  },
  {
    id: '2',
    rent_img: Media.fill,
    rent_cost: '6999',
    rent_subs: '9999',
    rent_title: 'Property Astrology',
    rent_subone: 'Get instant astro solutions',
    rent_subtwo:
      'Let our experts guide you through the best solutions for selling or buying a property',
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
];

LogBox.ignoreAllLogs();

const Advertisement = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [height, setHeight] = useState(undefined);
  const [selectBottom, setSelectBottom] = useState('sale');

  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [selectCitybottomSheetVisible, setSelectCitybottomSheetVisible] =
    useState(false);
  const [selectcity, setselectcity] = useState('Select City');
  const [selectCityItem, setSelectCityItem] = useState('');

  const animatedOpacityValue = useRef(new Animated.Value(0)).current;

  const headerOpacity = animatedOpacityValue.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    useNativeDriver: false,
  });

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

  function renderHeaderItem() {
    try {
      return (
        <View style={{ width: scr_width }}>
          <View
            style={{
              width: '95%',
              alignItems: 'center',
              marginVertical: 20,
              paddingHorizontal: 10,
            }}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  An Albion
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: primarycolor,
                    fontFamily: 'Poppins-Bold',
                    paddingHorizontal: 10,
                  }}>
                  Advertise Plan
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  For Prime Members
                </Text>
              </View>
            </View>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                color: '#666',
                textAlign: 'justify',
                fontFamily: 'Poppins-Regular',
              }}>
              Be faithful to your own taste because nothing you really like is
              ever out of style.
            </Text>
          </View>

          <View style={{ width: '100%', height: 220, marginVertical: 10 }}>
            <Image
              source={{ uri: Media.adver }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </View>
        </View>
      );
    } catch (error) {
      console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
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
          <View style={{ width: '95%', marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: Media.award }}
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
              />
              <Text
                style={{
                  width: '90%',
                  paddingHorizontal: 10,
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Documents to Check Before Buying a Property
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                textAlign: 'justify',
                fontFamily: 'Poppins-Regular',
                lineHeight: 25,
                paddingVertical: 10,
              }}>
              Buying a property is an expensive affair. Any mistake in the legal
              due diligence could land you in serious legal disputes. That’s why
              it’s important that you maintain caution and check all the
              important documents before you sign in the deal.{' '}
            </Text>
          </View>

          <View style={{ width: '100%', height: 220, marginVertical: 0 }}>
            <Image
              source={{ uri: Media.legal_banner }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </View>

          <View style={{ width: '95%', marginVertical: 10 }}>
            <Text
              style={{
                paddingHorizontal: 0,
                fontSize: 16,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Some important documents you must verify before buying a property:
            </Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                padding: 5,
                marginVertical: 5,
              }}>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  left: 0,
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
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
                    color: '#000',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Property documents
                </Text>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 25,
                    letterSpacing: 0.5,
                  }}>
                  You must check all the property-related documents, including
                  title documents (sale deed, gift deed, will success
                  certificate) and the nature of title(freehold and leasehold).
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  left: 0,
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
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
                    color: '#000',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Construction approval
                </Text>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 25,
                    letterSpacing: 0.5,
                  }}>
                  You must check all the property-related documents, including
                  title documents (sale deed, gift deed, will success
                  certificate) and the nature of title(freehold and leasehold).
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  left: 0,
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
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
                    color: '#000',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Land use permission
                </Text>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 25,
                    letterSpacing: 0.5,
                  }}>
                  You must check all the property-related documents, including
                  title documents (sale deed, gift deed, will success
                  certificate) and the nature of title(freehold and leasehold).
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  left: 0,
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
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
                    color: '#000',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Encumbrance certificate
                </Text>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 25,
                    letterSpacing: 0.5,
                  }}>
                  You must check all the property-related documents, including
                  title documents (sale deed, gift deed, will success
                  certificate) and the nature of title(freehold and leasehold).
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <View
                style={{
                  flex: 0,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  left: 0,
                }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
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
                    color: '#000',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Tax payment receipts
                </Text>
                <Text
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'justify',
                    fontFamily: 'Poppins-Regular',
                    lineHeight: 25,
                    letterSpacing: 0.5,
                  }}>
                  You must check all the property-related documents, including
                  title documents (sale deed, gift deed, will success
                  certificate) and the nature of title(freehold and leasehold).
                </Text>
              </View>
            </View>
          </View>

          <View style={{ width: '95%', marginVertical: 20 }}>
            <Text
              style={{
                paddingHorizontal: 15,
                fontSize: 16,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Explore Other Services
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
                    width: 300,
                    height: 140,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderColor: '#FBE9EF',
                    borderWidth: 1,
                    elevation: 3,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 0,
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFD6E3',
                      borderRadius: 100,
                    }}>
                    <Image
                      source={{ uri: Media.tenant_ads }}
                      style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#333',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Tenant Verification
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                        paddingVertical: 5,
                      }}
                      numberOfLines={4}>
                      Ensure the security of your property with our tenant
                      verification services.
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 300,
                    height: 140,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderColor: '#FBE9EF',
                    borderWidth: 1,
                    elevation: 3,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 0,
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFD6E3',
                      borderRadius: 100,
                    }}>
                    <Image
                      source={{ uri: Media.pack_ads }}
                      style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#333',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Packers & Movers
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                        paddingVertical: 5,
                      }}
                      numberOfLines={4}>
                      Moving can be stressful, but Albion's packers and movers
                      service makes it a breeze.
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 300,
                    height: 140,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderColor: '#FBE9EF',
                    borderWidth: 1,
                    elevation: 3,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 0,
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFD6E3',
                      borderRadius: 100,
                    }}>
                    <Image
                      source={{ uri: Media.home_ads }}
                      style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#333',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Home Cleaning
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                        paddingVertical: 5,
                      }}
                      numberOfLines={4}>
                      Prepare your property for new tenants or enjoy a fresh
                      start with Albion's home cleaning service.
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 300,
                    height: 140,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderColor: '#FBE9EF',
                    borderWidth: 1,
                    elevation: 3,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 0,
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFD6E3',
                      borderRadius: 100,
                    }}>
                    <Image
                      source={{ uri: Media.astro_ads }}
                      style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#333',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Property Astrology
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                        paddingVertical: 5,
                      }}
                      numberOfLines={4}>
                      Prepare your property for new tenants or enjoy a fresh
                      start with Albion's home cleaning service.
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: 300,
                    height: 140,
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginVertical: 5,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderColor: '#FBE9EF',
                    borderWidth: 1,
                    elevation: 3,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 0,
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFD6E3',
                      borderRadius: 100,
                    }}>
                    <Image
                      source={{ uri: Media.legal_ads }}
                      style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      width: '100%',
                      height: '100%',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#333',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Legal Service
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#666',
                        fontFamily: 'Poppins-Regular',
                        textAlign: 'justify',
                        paddingVertical: 5,
                      }}
                      numberOfLines={4}>
                      Prepare your property for new tenants or enjoy a fresh
                      start with Albion's home cleaning service.
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
                fontSize: 16,
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
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: primarycolor,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={20}
                  iconstyle={{ color: primarycolor }}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
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
                marginVertical: 0,
              }}>
              <View
                style={{
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: primarycolor,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={20}
                  iconstyle={{ color: primarycolor }}
                />
              </View>
              <Text
                style={{
                  width: '95%',
                  fontSize: 16,
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
            style={{ width: '95%', alignItems: 'center', marginVertical: 20 }}>
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
                marginVertical: 30,
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
    } catch (error) {
      console.log("catch in renderFooterItem's Free_rental : ", error);
    }
  }

  /* ****************************************************  ADD IMAGE BOTTOMSHEET ****************************************************** */

  function sale_toggleBottomView(type) {
    try {
      setSelectBottom(type);
      setSaleBottomSheetVisible(!salebottomSheetVisible);
    } catch (error) {
      console.log('Catch in Ads sale_toggleBottomView :', error);
    }
  }

  function sale_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={salebottomSheetVisible}
            onBackButtonPress={sale_toggleBottomView}
            onBackdropPress={sale_toggleBottomView}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: selectBottom === 'sale' ? 250 : 250,
                minHeight: 200,
                alignItems: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
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
                  Select Type
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

              <View style={{ width: '100%', alignItems: 'center' }}>
                <FlatList
                  data={cityData}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item, index }) => renderCityItem(item, index)}
                  style={{ width: '95%' }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
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
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
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
          <Text style={{ color: 'white' }}>No Internet Connection</Text>
        </Animated.View>
      )}

      <View
        style={{
          width: scr_width,
          height: height,
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <FlatList
          data={freeRentalData}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => renderHeaderItem()}
          // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
          ListFooterComponent={() => renderFooterItem()}
          style={{ width: '95%' }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: animatedOpacityValue } } }],
            { useNativeDriver: false },
          )}
        />
      </View>
      {sale_BottomSheetmenu()}
    </View>
  );
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
export default Advertisement;
