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
import Color from '../../Config/Color';
import { primarycolor } from '../../Utils/Colors';
import { Media } from '../../Global/Media';
import { Iconviewcomponent } from '../../Components/Icontag';
import common_fn from '../../Config/common_fn';
import ExpandableComponent from '../../Utils/ExpandableComponent';
import { Button } from 'react-native-elements';
import { Poppins } from '../../Global/FontFamily';

const tenantVerifyData = [
  {
    id: '0',
    rent_sub: 'Step 1',
    rent_img: Media.fill,
    rent_title: 'Choose a Plan',
    rent_subText:
      'Select the package that best suits your individual requirements',
  },
  {
    id: '1',
    rent_sub: 'Step 2',
    rent_img: Media.get,
    rent_title: 'Provide Tenent Details',
    rent_subText:
      'Give some basic details of the tenant to get the verification process started',
  },
  {
    id: '2',
    rent_sub: 'Step 3',
    rent_img: Media.more,
    rent_title: 'Get Verification Report',
    rent_subText:
      'Once the verification is complete, the report will be sent to your email address',
  },
];

let permanent =
  'This check ensures that the identity proofs provided by the tenent are genuine. If any of the identity documents prove to be false, you will be notified immediately, so you can avoid renting out your property to a fraudster.';
let criminal =
  'It involves complete search of the archived digital records from 20,000 courts. it helps reveal the criminal history, if any , of your tenant. knowing the criminal past can help you make an informed decision while renting out your property. it also helps reveal the past paying behaviour or a person by identifing the cheque bounce cases in the court, if any.';
let civil =
  'It involves complete search of the archived digital records from 20,000 courts. It helps reveal the civil cases history, if any, of your tenant. knowing the past civil cases can help you understand if the tenant is involved in some property related dispute.';
let per_address =
  'It involves verifying the permanent address given by the tenant. A physical visit to the address is made to confirm tracebility. On the visit, the representative also gathers details of the person met, photographs, signature, and GPS coordinates.';
let reference =
  'This check involves making phone calls to the previous landlords to check their experience with the concerned tenant. If can help reveal the tru character and behaviour of the tenant, which can help you make a more confident decision.';

const CONTENT = [
  {
    isExpanded: true,
    category_name: 'Is tenant verification mandatory for all landlords?',
    subcategory: [
      {
        id: 1,
        val: 'Tenant verification may be required by law in some regions, while others leave it to the discretion of landlords. Its advisable to check local regulations.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'How long does the tenant verification process typically take?',
    subcategory: [
      {
        id: 4,
        val: 'The duration may vary, but it usually takes a few days to a week to complete all verification checks and compile the reports.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What information is needed from the tenant for the verification process?',
    subcategory: [
      {
        id: 7,
        val: 'Typically, you will need the tenants full name, contact details, identification documents, and authorization to perform the checks.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'Are the results of tenant verification shared with the tenant?',
    subcategory: [
      {
        id: 10,
        val: 'No, the results are typically confidential and shared only with the landlord or property owner who requested the verification.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'Can tenant verification be conducted for commercial properties as well?',
    subcategory: [
      {
        id: 10,
        val: 'Yes, tenant verification services can be applied to both residential and commercial properties.',
      },
    ],
  },
];

const cutData = [
  {
    cus_id: '0',
    cus_name: 'A Fraud Prevention Tool',
    cus_desc:
      'Comprehensive tenant screening saves you time, money and guess work-all while protecting you from fraud.',
  },
  {
    cus_id: '1',
    cus_name: 'Eliminate High Risk Tenants',
    cus_desc:
      'You want peace of mind in knowing that you are choosing an application that is trustworthy, will pay their rent on time.',
  },
  {
    cus_id: '2',
    cus_name: 'Strategic Advisory',
    cus_desc:
      'You want peace of mind in knowing that you are choosing an application that is trustworthy.',
  },
];

const freeRentalData = [
  {
    id: 1,
    rent_img: Media.fill,
    rent_cost: '250',
    rent_subs: '15 Mins',
    rent_title: 'Tenant Verification',
    rent_subone: '15 Mins In Call With Legal Advocate',
    rent_benefits: [
      {
        id: 1,
        title: 'Identity & Criminal Court Verification',
        hasBenefit: true,
      },
      {
        id: 2,
        title: 'Civil Litigation Check',
        hasBenefit: false,
      },
      {
        id: 3,
        title: 'Permanent Address & Reference Verification',
        hasBenefit: false,
      },
    ],
    label: 'silver',
  },
  {
    id: 2,
    rent_img: Media.fill,
    rent_cost: '500',
    rent_subs: '30 Mins',
    rent_title: 'Tenant Verification',
    rent_subone:
      'Get instant Professional help online to solve all your legal queries',
    rent_benefits: [
      {
        id: 1,
        title: 'Identity & Criminal Court Verification',
        hasBenefit: true,
      },
      {
        id: 2,
        title: 'Civil Litigation Check',
        hasBenefit: true,
      },
      {
        id: 3,
        title: 'Permanent Address & Reference Verification',
        hasBenefit: false,
      },
    ],
    label: 'gold',
  },
  {
    id: 3,
    rent_img: Media.fill,
    rent_cost: '1000',
    rent_subs: '45 Mins',
    rent_title: 'Tenant Verification',
    rent_subone:
      'Get instant Professional help online to solve all your legal queries',
    rent_benefits: [
      {
        id: 1,
        title: 'Identity & Criminal Court Verification',
        hasBenefit: true,
      },
      {
        id: 2,
        title: 'Civil Litigation Check',
        hasBenefit: true,
      },
      {
        id: 3,
        title: 'Permanent Address & Reference Verification',
        hasBenefit: true,
      },
    ],
    label: 'platinum',
  },
];

const TenantVerification = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectReport, setSelectReport] = useState('IdentityVerification');

  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const [TenantVisible, setTenantVisible] = useState(false);
  const [height, setHeight] = useState(undefined);


  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log("catch in use_effect's Tenant_verify : ", error);
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
        <View style={{ padding: 10 }}>
          <View style={{ width: '100%', height: 220 }}>
            <Image
              source={{ uri: Media.tenant_Banner }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </View>

          <View style={{}}>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}
                numberOfLines={1}>
                Beware of Property Damage, get
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: primarycolor,
                  fontFamily: 'Poppins-Bold',
                }}>
                VERIFIED TENANTS
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: '#333',
                fontFamily: 'Poppins-SemiBold',
              }}>
              100% Protection from Legal Disputes
            </Text>
            <Text
              style={{
                width: '100%',
                fontSize: 14,
                color: '#666',
                fontFamily: 'Poppins-Regular',
                textAlign: 'justify',
                lineHeight: 20,
                paddingVertical: 5,
              }}
              numberOfLines={5}>
              Verify your tenants from the comfort of your home
            </Text>

            <View style={{ width: '100%', paddingVertical: 15 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Know your Reports
              </Text>

              <View style={{ width: '95%', marginVertical: 5 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={200}
                  decelerationRate="normal"
                // pagingEnabled
                >
                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectReport('IdentityVerification');
                      }}
                      style={{
                        marginHorizontal: 10,
                        backgroundColor: '#fff',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Identity Verification
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 3,
                        backgroundColor:
                          selectReport === 'IdentityVerification'
                            ? primarycolor
                            : 'white',
                      }}></View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectReport('CriminalCourtCheck');
                      }}
                      style={{
                        marginHorizontal: 10,
                        backgroundColor: '#fff',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Criminal Court Check
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 3,
                        backgroundColor:
                          selectReport === 'CriminalCourtCheck'
                            ? primarycolor
                            : 'white',
                      }}></View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectReport('CivilLitigationCheck');
                      }}
                      style={{
                        marginHorizontal: 10,
                        backgroundColor: '#fff',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Civil Litigation Check
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 3,
                        backgroundColor:
                          selectReport === 'CivilLitigationCheck'
                            ? primarycolor
                            : 'white',
                      }}></View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectReport('PermanentAddress');
                      }}
                      style={{
                        marginHorizontal: 10,
                        backgroundColor: '#fff',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Permanent Address Verification
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 3,
                        backgroundColor:
                          selectReport === 'PermanentAddress'
                            ? primarycolor
                            : 'white',
                      }}></View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectReport('ReferenceCheck');
                      }}
                      style={{
                        marginHorizontal: 10,
                        backgroundColor: '#fff',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Reference Check
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 3,
                        backgroundColor:
                          selectReport === 'ReferenceCheck'
                            ? primarycolor
                            : 'white',
                      }}></View>
                  </View>
                </ScrollView>

                <View style={{ width: '100%', paddingVertical: 10 }}>
                  {selectReport === 'IdentityVerification' ? (
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#666',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                        textAlign: 'justify',
                      }}>
                      {permanent}
                    </Text>
                  ) : selectReport === 'CriminalCourtCheck' ? (
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#666',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                        textAlign: 'justify',
                      }}>
                      {criminal}
                    </Text>
                  ) : selectReport === 'CivilLitigationCheck' ? (
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#666',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                        textAlign: 'justify',
                      }}>
                      {civil}
                    </Text>
                  ) : selectReport === 'PermanentAddress' ? (
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#666',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                        textAlign: 'justify',
                      }}>
                      {per_address}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#666',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                        lineHeight: 25,
                        textAlign: 'justify',
                      }}>
                      {reference}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <View
              style={{
                width: '100%', paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Importance of{' '}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: primarycolor,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Tenant Verification{' '}
              </Text>
            </View>
            <Text
              style={{
                width: '90%',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              of owner
            </Text>

            <View style={{ width: '90%', paddingVertical: 5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'checkcircle'}
                  icon_size={26}
                  iconstyle={{ color: '#239D0F' }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#333',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Get Credit Report and Score
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'checkcircle'}
                  icon_size={26}
                  iconstyle={{ color: '#239D0F' }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#333',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Get Eviction & Address History
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'checkcircle'}
                  icon_size={26}
                  iconstyle={{ color: '#239D0F' }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#333',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Know Multi-state Criminal Records
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'checkcircle'}
                  icon_size={26}
                  iconstyle={{ color: '#239D0F' }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#333',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Get Multi-state Sex Offender Record
                </Text>
              </View>
            </View>
          </View>

          {Platform.OS == "android" &&
            <>
              {freeRentalData.map((item, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
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
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#34C38F',
                          borderRadius: 5,
                          padding: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.white,
                            fontFamily: 'Poppins-SemiBold',
                            textAlign: 'justify',
                          }}>
                          {item.label}
                        </Text>
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
                            textAlign: 'justify',
                          }}>
                          {item.rent_title}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      {item.rent_benefits.map((single, index) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingVertical: 5,
                            }}>
                            <Iconviewcomponent
                              Icontag={'Ionicons'}
                              iconname={single?.hasBenefit ? 'checkmark' : 'close'}
                              icon_size={20}
                              iconstyle={{
                                color: single?.hasBenefit ? '#239D0F' : Color.red,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#666',
                                paddingHorizontal: 10,
                                lineHeight: 25,
                                fontFamily: 'Poppins-Regular',
                                textAlign: 'justify',
                              }}
                              numberOfLines={2}>
                              {single.title}
                            </Text>
                          </View>
                        );
                      })}
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
                          ₹{item.rent_cost}
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
                            padding: 5,
                            paddingHorizontal: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: 'white',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            Buy Plan
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          }
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                paddingHorizontal: 15,
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              How it works?
            </Text>
          </View>
        </View>
      );
    } catch (error) {
      console.log('catch in renderHeader_Item : ', error);
    }
  }

  function rendertenantVerifyItem(item, index) {
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
                fontSize: 13,
                color: '#666',
                fontFamily: 'Poppins-SemiBold',
                lineHeight: 25,
                textAlign: 'justify',
              }}
              numberOfLines={1}>
              {item.rent_sub}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
                lineHeight: 25,
                textAlign: 'justify',
              }}
              numberOfLines={1}>
              {item.rent_title}
            </Text>
            <Text
              style={{
                fontSize: 14,
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
            width: '95%', height: height,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{ marginVertical: 15, alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Why do you Need Tenant Verification
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
                <FlatList
                  horizontal
                  data={cutData}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item, index }) =>
                    renderTenantVerifyItem(item, index)
                  }
                  showsHorizontalScrollIndicator={false}
                />
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
                fontFamily: 'Poppins-SemiBold',
              }}>
              Frequently Asked Questions?
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
            style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Explore Other Services
            </Text>
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
                  alignItems: 'center',
                  marginHorizontal: 10,
                  backgroundColor: 'white',
                  elevation: 2,
                  marginVertical: 10,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    padding: 10,
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FBECF1',
                    borderRadius: 50,
                  }}>
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={'home-city-outline'}
                    icon_size={30}
                    iconstyle={{ color: '#333' }}
                  />
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 18,
                      color: '#333',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Property Valuation
                  </Text>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 15,
                      color: '#666',
                      fontFamily: 'Poppins-Regular',
                      lineHeight: 20,
                    }}
                    numberOfLines={4}>
                    Know the right value for your propert by experts before you
                    buy or sell your property
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: 320,
                  height: 160,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 10,
                  backgroundColor: 'white',
                  elevation: 2,
                  marginVertical: 10,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    padding: 10,
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FBECF1',
                    borderRadius: 50,
                  }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'book'}
                    icon_size={30}
                    iconstyle={{ color: '#333' }}
                  />
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 18,
                      color: '#333',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Rent Agreement
                  </Text>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 15,
                      color: '#666',
                      fontFamily: 'Poppins-Regular',
                      lineHeight: 20,
                    }}
                    numberOfLines={4}>
                    Protect your rights as a tenant or landlords with a
                    carefully-drafted and stamped rent agreement-deliverd right
                    at your doorstep.
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: 320,
                  height: 160,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 10,
                  backgroundColor: 'white',
                  elevation: 2,
                  marginVertical: 10,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    padding: 10,
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FBECF1',
                    borderRadius: 50,
                  }}>
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={'silverware-clean'}
                    icon_size={30}
                    iconstyle={{ color: '#333' }}
                  />
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 18,
                      color: '#333',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Home Cleaning
                  </Text>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 15,
                      color: '#666',
                      fontFamily: 'Poppins-Regular',
                      lineHeight: 20,
                    }}
                    numberOfLines={4}>
                    Turn your home into a naturally calming, healthy and an
                    enjoyable place to be wiht our professional home cleaning
                    service.
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: 320,
                  height: 160,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 10,
                  backgroundColor: 'white',
                  elevation: 2,
                  marginVertical: 10,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    padding: 10,
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FBECF1',
                    borderRadius: 50,
                  }}>
                  <Iconviewcomponent
                    Icontag={'MaterialIcons'}
                    iconname={'sanitizer'}
                    icon_size={30}
                    iconstyle={{ color: '#333' }}
                  />
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 18,
                      color: '#333',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Sanitization
                  </Text>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      fontSize: 15,
                      color: '#666',
                      fontFamily: 'Poppins-Regular',
                      lineHeight: 20,
                    }}
                    numberOfLines={4}>
                    Ensure a safer indoor environment for yourself and your
                    loved ones with the help of Sanitization service
                    professionals.
                  </Text>
                </View>
              </View>
            </ScrollView>
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
            style={{ width: '95%', alignItems: 'center', marginVertical: 20 }}>
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
                onPress={() => navigation.navigate('AboutUs')}>
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
                }}
                onPress={() => navigation.navigate('PrivacyPolicy')}>
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
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('TermsCondition')}>
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
      console.log("catch in renderFooterItem's Free_rental : ", error);
    }
  }

  function renderTenantVerifyItem(item, index) {
    try {
      return (
        <View
          style={{
            width: 320,
            height: 240,
            marginHorizontal: 10,
            backgroundColor: 'white',
            elevation: 2,
            marginVertical: 10,
            borderRadius: 10,
            borderTopStartRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              width: '100%',
              height: 120,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <Image
              source={{ uri: Media.home_banner }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 15,
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
                fontFamily: 'Poppins-Regular',
                lineHeight: 22,
              }}
              numberOfLines={5}>
              {item.cus_desc}
            </Text>
          </View>
        </View>
      );
    } catch (error) {
      console.log('catch in renderTenantVerify_Item : ', error);
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
      <ScrollView>
        <FlatList
          data={tenantVerifyData}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => renderHeaderItem()}
          renderItem={({ item, index }) => rendertenantVerifyItem(item, index)}
          ListFooterComponent={() => renderFooterItem()}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      <Modal visible={TenantVisible} transparent animationType="slide">
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
            Your request has been send successfully and our team will be contact
            shortly.
          </Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: Media.propVal_Complete }}
              style={{ width: 200, height: 150, resizeMode: 'contain' }}
            />
          </View>
          <Button
            title={'Back to Home Page'}
            buttonStyle={{
              backgroundColor: Color.primary,
              borderRadius: 50,
              marginVertical: 10,
            }}
            onPress={() => {
              navigation.replace('TabNavigator');
              setTenantVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default TenantVerification;
