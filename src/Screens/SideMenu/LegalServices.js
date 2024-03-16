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
import { BottomSheet } from 'react-native-btr';
import common_fn from '../../Config/common_fn';
import ExpandableComponent from '../../Utils/ExpandableComponent';

const freeRentalData = [
  {
    id: 1,
    rent_img: Media.fill,
    rent_cost: '500',
    rent_subs: '15 Mins',
    rent_title: 'Telephonic Plan 1',
    rent_subone: '15 Mins In Call With Legal Advocate',
  },
  {
    id: 2,
    rent_img: Media.fill,
    rent_cost: '600',
    rent_subs: '30 Mins',
    rent_title: 'Telephonic Plan 2',
    rent_subone:
      'Get instant Professional help online to solve all your legal queries',
  },
  {
    id: 3,
    rent_img: Media.fill,
    rent_cost: '1000',
    rent_subs: '45 Mins',
    rent_title: 'Telephonic Plan 3',
    rent_subone:
      'Get instant Professional help online to solve all your legal queries',
  },
  {
    id: 4,
    rent_img: Media.fill,
    rent_cost: '1500',
    rent_subs: '60 Mins',
    rent_title: 'Telephonic Plan 4',
    rent_subone:
      'Get instant Professional help online to solve all your legal queries',
  },
];

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'How do I know if I need legal assistance?',
    subcategory: [
      {
        id: 1,
        val: 'Legal assistance is beneficial for a wide range of situations, including contractual disputes, property matters, family issues, and more. If you have questions or concerns, its advisable to seek legal advice',
      },
    ],
  },
  {
    isExpanded: false,
    category_name: 'Are the legal consultations on Albion confidential?',
    subcategory: [
      {
        id: 4,
        val: 'Yes, all consultations and communications with legal experts are confidential and protected by attorney-client privilege.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'Can I consult with multiple legal experts before choosing one?',
    subcategory: [
      {
        id: 7,
        val: 'Yes, you have the option to consult with multiple legal experts to evaluate your options and make an informed choice.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'Can I use Albion legal services for both personal and business-related legal matters?',
    subcategory: [
      {
        id: 10,
        val: 'Yes, Albions legal services partners cater to both personal and business legal needs, offering a range of services to address various requirements.',
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

LogBox.ignoreAllLogs();

const LegalServices = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);

  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const [height, setHeight] = useState(undefined);
  const [selectCitybottomSheetVisible, setSelectCitybottomSheetVisible] =
    useState(false);
  const [selectcity, setselectcity] = useState('Coimbatore');
  const [selectCityItem, setSelectCityItem] = useState('');

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
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '100%', height: 220 }}>
            <Image
              source={{ uri: Media.legal_Banner }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </View>

          <View style={{ width: '95%', marginVertical: 10 }}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: primarycolor,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  Albion's Legal Services Partners
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
                  Your Legal Needs, Simplified
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 15,
                color: '#666',
                fontFamily: 'Poppins-Regular',
                paddingVertical: 10,
                lineHeight: 25,
              }}>
              Navigating legal matters can be complex, but with Albion's Legal
              Services partners, you can access expert legal assistance
              conveniently through our app
            </Text>
          </View>

          {Platform.OS == "android" &&
            <View
              style={{
                width: '95%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                backgroundColor: 'white',
                borderColor: '#888',
                borderRadius: 5,
                elevation: 2,
                borderWidth: 0.5,
              }}>
              <Text
                style={{
                  width: '95%',
                  fontSize: 15,
                  color: '#666',
                  fontFamily: 'Poppins-Regular',
                  paddingVertical: 5,
                }}>
                Legal Services Packages in
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Iconviewcomponent
                    Icontag={'Fontisto'}
                    iconname={'map-marker-alt'}
                    icon_size={24}
                    iconstyle={{ color: primarycolor }}
                  />
                </View>
                <TouchableOpacity
                  // onPress={() => selectCity_toggleBottomView()}
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      marginStart: 20,
                      fontSize: 18,
                      color: '#000',
                      fontFamily: 'Poppins-SemiBold',
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
              </View>
            </View>
          }
        </View>
      );
    } catch (error) {
      console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
    }
  }

  function renderFreeRentalItem(item, index) {
    try {
      return (
        <>
          {Platform.OS == "android" &&
            < View
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
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#34C38F',
                    borderRadius: 50,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Feather'}
                    iconname={'phone-call'}
                    icon_size={18}
                    iconstyle={{ color: 'white' }}
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
                      textAlign: 'justify',
                    }}>
                    {item.rent_title}
                  </Text>
                </View>
              </View>
              <View
                style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 5 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Feather'}
                    iconname={'check'}
                    icon_size={20}
                    iconstyle={{ color: '#239D0F' }}
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
                    {item.rent_subone}
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
                    ₹{item.rent_cost}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#666',
                      fontFamily: 'Poppins-SemiBold',
                      paddingHorizontal: 10,
                    }}>
                    / {item.rent_subs}
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
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View >
          }
        </>
      );
    } catch (error) {
      console.log('catch in render FreeRental_Item : ', error);
    }
  }

  function renderFooterItem(item, index) {
    try {
      return (
        <View style={{ width: '95%', height: height, alignItems: 'center', backgroundColor: 'white' }}>

          <View style={{ width: '95%', marginVertical: 20, alignItems: 'center' }}>
            <Text style={{ width: '95%', paddingHorizontal: 0, fontSize: 16, color: 'black', fontFamily: 'Poppins-Bold' }}>What Legal Services Companies Offer?</Text>
            <Text style={{ width: '95%', paddingHorizontal: 0, fontSize: 14, color: '#666', fontFamily: 'Poppins-SemiBold', lineHeight: 25 }}>Legal Services companies listed on Albion offer a wide range of legal solutions to address your diverse needs. These services typically include:</Text>

            <View style={{ width: '100%', padding: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Legal Consultation :</Text>
              </View>
              <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', }}>Expert legal advice and guidance tailored to your specific situation.</Text>
            </View>

            <View style={{ width: '100%', padding: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Document Preparation :</Text>
              </View>
              <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', }}>Assistance in drafting, reviewing, and validating legal documents such as contracts, wills, and agreements.</Text>
            </View>

            <View style={{ width: '100%', padding: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Litigation Support :</Text>
              </View>
              <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', }}>Representation and support in legal disputes, including civil, criminal, and family law cases.</Text>
            </View>

            <View style={{ width: '100%', padding: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Real Estate Transactions :</Text>
              </View>
              <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', }}>Guidance on property buying, selling, and documentation to ensure a smooth transaction</Text>
            </View>

            <View style={{ width: '100%', padding: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-SemiBold', }}>Business and Corporate Law : </Text>
              </View>
              <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', }}>Assistance in legal matters related to business formation, contracts, compliance, and more.</Text>
            </View>

          </View>

          <View style={{ width: '100%', height: 220 }}>
            <Image
              source={{ uri: Media.legal_banner }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </View>
          <View style={{ width: '95%', alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ width: '95%', paddingHorizontal: 0, fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Documents to Check Before Buying a Property</Text>
            <Text style={{ width: '95%', fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>Buying a property is an expensive affair. Any mistake in the legal due diligence could land you in serious legal disputes. That’s why it’s important that you maintain caution and check all the important documents before you sign in the deal. </Text>
          </View>

          <View style={{ width: '95%', alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ width: '95%', paddingHorizontal: 0, fontSize: 16, color: 'black', fontFamily: 'Poppins-Bold' }}>Some important documents you must verify before buying a property:</Text>

            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ flex: 0, justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Property documents</Text>
                <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 20 }}>You must check all the property-related documents, including title documents (sale deed, gift deed, will success certificate) and the nature of title(freehold and leasehold).</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ flex: 0, justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Construction approval</Text>
                <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 20 }}>You must check all the property-related documents, including title documents (sale deed, gift deed, will success certificate) and the nature of title(freehold and leasehold).</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ flex: 0, justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Land use permission</Text>
                <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 20 }}>You must check all the property-related documents, including title documents (sale deed, gift deed, will success certificate) and the nature of title(freehold and leasehold).</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ flex: 0, justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Encumbrance certificate</Text>
                <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 20 }}>You must check all the property-related documents, including title documents (sale deed, gift deed, will success certificate) and the nature of title(freehold and leasehold).</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <View style={{ flex: 0, justifyContent: 'flex-start', alignItems: 'flex-start', left: 0 }}>
                <Iconviewcomponent
                  Icontag={'FontAwesome'}
                  iconname={'book'}
                  icon_size={22}
                  iconstyle={{ color: '#666', marginHorizontal: 20 }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Tax payment receipts</Text>
                <Text style={{ fontSize: 15, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 20 }}>You must check all the property-related documents, including title documents (sale deed, gift deed, will success certificate) and the nature of title(freehold and leasehold).</Text>
              </View>
            </View>
          </View>

          <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
            <Text style={{ width: '95%', paddingVertical: 10, fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Frequently Asked Questions?</Text>

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

          <View style={{ width: '95%', marginVertical: 20 }}>
            <Text style={{ paddingHorizontal: 15, fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Explore Other Services</Text>

            <View style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="normal"
              // pagingEnabled
              >
                <View style={{ width: 320, height: 170, flexDirection: 'row', marginHorizontal: 5, marginVertical: 5, alignItems: 'center', backgroundColor: 'white', borderColor: '#FBE9EF', borderWidth: 1, elevation: 3, borderRadius: 10, paddingHorizontal: 10 }}>
                  <View style={{ flex: 1, width: 70, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFD6E3', borderRadius: 100 }}>

                    <Image
                      source={{ uri: Media.Home }}
                      style={{ width: 35, height: 35, resizeMode: 'contain' }}
                    />
                  </View>
                  <View style={{ flex: 3, width: '100%', height: '100%', paddingHorizontal: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-SemiBold' }}>Home Loans</Text>
                    <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins-Regular', paddingVertical: 5 }} numberOfLines={5}>Access competitive home loan options to facilitate your property purchase. Albion partners with leading financial institutions to provide favorable loan terms and rates.</Text>
                  </View>
                </View>

                <View style={{ width: 320, height: 170, flexDirection: 'row', marginHorizontal: 5, marginVertical: 5, alignItems: 'center', backgroundColor: 'white', borderColor: '#FBE9EF', borderWidth: 1, elevation: 3, borderRadius: 10, paddingHorizontal: 10 }}>
                  <View style={{ flex: 1, width: 70, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFD6E3', borderRadius: 100 }}>
                    <Image
                      source={{ uri: Media.legal_tenant }}
                      style={{ width: 35, height: 35, resizeMode: 'contain' }}
                    />
                  </View>
                  <View style={{ flex: 3, width: '100%', height: '100%', paddingHorizontal: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-SemiBold' }}>Vastu Consultations</Text>
                    <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins-Regular', paddingVertical: 5 }} numberOfLines={5}>Embrace the ancient Indian science of Vastu Shastra to ensure harmonious and positive energies in your home. Albion connects you with Vastu experts who can offer guidance and recommendations for your property.</Text>
                  </View>
                </View>

                <View style={{ width: 320, height: 170, flexDirection: 'row', marginHorizontal: 5, marginVertical: 5, alignItems: 'center', backgroundColor: 'white', borderColor: '#FBE9EF', borderWidth: 1, elevation: 3, borderRadius: 10, paddingHorizontal: 10 }}>
                  <View style={{ flex: 1, width: 70, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFD6E3', borderRadius: 100 }}>
                    <Image
                      source={{ uri: Media.legal_tenant }}
                      style={{ width: 35, height: 35, resizeMode: 'contain' }}
                    />
                  </View>
                  <View style={{ flex: 3, width: '100%', height: '100%', paddingHorizontal: 10, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-SemiBold' }}>Tenant Verification</Text>
                    <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins-Regular', paddingVertical: 5 }} numberOfLines={5}>Find out exactly who you are letting in. Let us conduct reference check and police verification of your prospective tenant today</Text>
                  </View>
                </View>

              </ScrollView>
            </View>
          </View>

          <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
            <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Contact Us</Text>

            <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
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

            <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={22}
                  iconstyle={{ color: primarycolor }}
                />
              </View>
              <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>support@albionpropertyhub.com</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 40 }}>
            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={{ uri: Media.albionlogo }}
                style={{ width: 70, height: 70, resizeMode: 'contain' }}
              />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 17, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Albion Bank Auctions Pvt Ltd</Text>
              <Text style={{ width: '95%', textAlign: 'justify', fontSize: 13, color: '#666', fontFamily: 'Poppins-SemiBold' }} numberOfLines={2} >India’s No.1 Property Site is now a Superband</Text>
            </View>
          </View>

          <View style={{ width: '95%', alignItems: 'center', marginVertical: 20 }}>
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
            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
              <TouchableOpacity onPress={() => navigation.replace("TermsCondition")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://albionpropertyhub.com/')} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
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

  return (
    <View style={styles.container}>

      {netInfo_State ? null :
        <Animated.View animation="fadeInRight" style={{ flex: 1, position: 'absolute', zIndex: 9999, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 0 }}>
          <Text style={{ color: 'white' }}>No Internet Connection</Text>
        </Animated.View>
      }

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
          renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
          ListFooterComponent={() => renderFooterItem()}
          style={{ width: '95%' }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {selCity_BottomSheetmenu()}
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

export default LegalServices;
