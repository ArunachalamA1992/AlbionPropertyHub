import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../../Config/Color';
import {Button, Divider} from 'react-native-elements';
import fetchData from '../../../Config/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import common_fn from '../../../Config/common_fn';
import axios from 'axios';
import {setPostPropertyLocation} from '../../../Redux';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Poppins} from '../../../Global/FontFamily';
import {StackActions, useNavigation} from '@react-navigation/native';

const ConfirmPostScreen = ({route}) => {
  const navigation = useNavigation();
  const [step1SelectedItem] = useState(route.params.step1SelectedItem);
  const [step2SelectedItem] = useState(route.params.step2SelectedItem);
  const [step3SelectedItem] = useState(route.params.step3SelectedItem);
  const [step4SelectedItem] = useState(route.params.step4SelectedItem);
  const [propertyLocation] = useState(route.params.propertyLocation);
  const [PgStep1Item] = useState(route.params.PgStep1Item);
  const [PgStep2Item] = useState(route.params.PgStep2Item);
  // const [PgStep4Item] = useState(route.params.PgStep4Item);
  const [exclusivePost] = useState(route.params.exclusivePost);
  const [unit] = useState(route.params.unit);
  const [step1RentSelectedItem] = useState(route.params.step1RentSelectedItem);
  const [step2CommercialSelected] = useState(
    route.params.step2CommercialSelected,
  );
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id} = userData;
  var {city, landmark} = propertyLocation;
  const [cardHeight, setCardHeight] = useState(undefined);
  const dispatch = useDispatch();

  const [feature1Visible, setFeature1Visible] = useState(false);
  const [feature2Visible, setFeature2Visible] = useState(false);
  const [feature3Visible, setFeature3Visible] = useState(false);
  const [feature4Visible, setFeature4Visible] = useState(false);
  const [featuresData] = useState([
    {id: 1, title: 'Close to School'},
    {id: 2, title: 'Close to Hospital'},
    {id: 3, title: 'Close to Market'},
    {id: 4, title: 'Close to Bus Stand'},
    {id: 5, title: 'Close to Airport'},
    {id: 6, title: 'Close to Metro'},
    {id: 7, title: 'Close to Railway Station'},
    {id: 8, title: 'Close to Theatre'},
    {id: 9, title: 'Close to Mall'},
  ]);
  const [fetures2Data, setFeatures2Data] = useState([]);
  const [fetures3Data, setFeatures3Data] = useState([]);
  const [fetures4Data, setFeatures4Data] = useState([]);
  const [token, setToken] = useState('');
  const [featureselectedItem, setFeatureSelectedItem] = useState({
    feature1: {},
    feature2: {},
    feature3: {},
    feature4: {},
  });

  const getRemainingData = useCallback(() => {
    const feature2 = featuresData.filter(
      property => property.id !== featureselectedItem?.feature1?.id,
    );
    setFeatures2Data(feature2);

    const feature3 = feature2.filter(
      property => property.id !== featureselectedItem?.feature2?.id,
    );
    setFeatures3Data(feature3);

    const feature4 = feature3.filter(
      property => property.id !== featureselectedItem?.feature3?.id,
    );
    setFeatures4Data(feature4);
  }, [featuresData, featureselectedItem]);

  useLayoutEffect(() => {
    getRemainingData();
  }, [getRemainingData]);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      sound: true,
      badge: true,
      provisional: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken();
    }
  };

  const getFCMToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        try {
          const refreshToken = await messaging().getToken();
          if (refreshToken) {
            setToken(refreshToken);
            await AsyncStorage.setItem('fcmToken', refreshToken);
          } else {
          }
        } catch (error) {
          console.log('Error fetching token :', error);
        }
      } else {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        setToken(fcmToken);
      }
    } catch (error) {
      console.log('Catch in getFcmToken  : ', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, [token]);

  const featureDataPayload = () => {
    let customIDCounter = {counter: 0};
    let dataArray = [];
    const features = {
      bedroom: step2SelectedItem?.bedrooms,
      balconies: step2SelectedItem?.balconies,
      baths: step2SelectedItem?.bathrooms,
      floor: step2SelectedItem?.noFloorsOnProperty,
      total_floors: step2SelectedItem?.totalBuildingFloors,
      furnish_status: step2SelectedItem?.furnishingDeatils,
    };
    for (const key in features) {
      if (features[key]?.length > 0) {
        if (key === 'bedroom') {
          dataArray.push({
            key: common_fn.generateCustomID(customIDCounter, key),
            title: 'bedroom',
            value: encodeURIComponent(step2SelectedItem?.bedrooms?.value),
          });
        } else if (key === 'balconies') {
          dataArray.push({
            key: common_fn.generateCustomID(customIDCounter, key),
            title: 'balconies',
            value: encodeURIComponent(step2SelectedItem?.balconies?.value),
          });
        } else if (key === 'baths') {
          dataArray.push({
            key: common_fn.generateCustomID(customIDCounter, key),
            title: 'baths',
            value: encodeURIComponent(step2SelectedItem?.bathrooms?.value),
          });
        } else if (key === 'floor') {
          dataArray.push({
            key: common_fn.generateCustomID(customIDCounter, key),
            title: 'floor',
            value: encodeURIComponent(
              step2SelectedItem?.noFloorsOnProperty?.value,
            ),
          });
        } else if (key === 'furnish_status') {
          dataArray.push({
            key: common_fn.generateCustomID(customIDCounter, key),
            title: 'furnish_status',
            value: step2SelectedItem?.furnishingDeatils?.value,
          });
        }
      } else if (key === 'total_floors') {
        dataArray.push({
          key: common_fn.generateCustomID(customIDCounter, key),
          title: 'total_floors',
          value: encodeURIComponent(step2SelectedItem?.totalBuildingFloors),
        });
      }
    }
    return dataArray;
  };

  const confirmPost = async () => {
    try {
      var data = {
        property_action: step1SelectedItem?.post?.value,
        property_type:
          step1SelectedItem?.post?.value === 'sell'
            ? step1SelectedItem?.kind?.value == 'residential'
              ? step1SelectedItem?.type?.value
              : step1SelectedItem?.commercialPropType?.value
            : step1RentSelectedItem?.kind?.value == 'residential'
            ? step1RentSelectedItem?.type?.value
            : step1RentSelectedItem?.commercialPropType?.value,
        location: city,
        real_estate:
          step1SelectedItem?.post?.value === 'sell'
            ? step1SelectedItem?.kind?.value
            : step1RentSelectedItem?.kind?.value,
        property_name: step1SelectedItem?.name,
        locality: landmark,
        features: [
          {
            key: 1,
            title: 'bedroom',
            value: step2SelectedItem?.bedrooms?.value,
          },
          {
            key: 2,
            title: 'balconies',
            value: step2SelectedItem?.balconies?.value,
          },
          {
            key: 3,
            title: 'baths',
            value: step2SelectedItem?.bathrooms?.value,
          },
          {
            key: 4,
            title: 'floor',
            value: step2SelectedItem?.noFloorsOnProperty?.value,
          },
          {
            key: 5,
            title: 'total_floors',
            value: step2SelectedItem?.totalBuildingFloors,
          },
          {
            key: 6,
            title: 'furnish_status',
            value: step2SelectedItem?.furnishingDeatils?.value,
          },
        ],
        amenities: step4SelectedItem?.amenities,
        area: {
          carpet_area: unit?.carpetValue,
          carpet_area_unit: unit?.carpetStatus?.value,
          super_area: unit?.superValue,
          super_area_unit: unit?.superStatus?.value,
        },
        facing: step4SelectedItem?.p_facing?.value,
        availability: step2SelectedItem?.availability?.value,
        property_age: step2SelectedItem?.ageOfProperty?.value ?? '',
        expected_price: step3SelectedItem?.pricingDetails?.expected,
        token_amount: step3SelectedItem?.pricingDetails?.token,
        address: step1SelectedItem?.address,
        seller_id: user_id,
        description: step1SelectedItem?.description,
        device_id: 2,
        main_image: step3SelectedItem?.main_image,
        sub_images: step3SelectedItem?.sub_images ?? [],
        fcm_token: token,
        exclusive: exclusivePost,
        advantages: step4SelectedItem?.features,
        price_negotiations: step3SelectedItem?.checked,
      };
      const postProperty = await fetchData.create(data);
      if (postProperty?.message == 'Success') {
        dispatch(
          setPostPropertyLocation({
            city: null,
            landmark: null,
          }),
        );
        navigation.dispatch(StackActions.replace('postCompleted'));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [description, setDescription] = useState('');
  const [sampledescription1, setSampledescription1] = useState(
    `Move into Amritha, a professionally run PG property located in Coimbatore's Ramanathapuram neighborhood. This male PG is conveniently located in a secure neighborhood and provides you with a range of contemporary amenities, including food. There are single occupancy categories in this PG. This PG is close to important business and educational districts. For reservations on this quickly selling, highly sought-after PG stay, please get in touch with the seller.`,
  );
  const [sampledescription2, setSampledescription2] = useState(
    `Amritha is a contemporary, roomy PG home in Ramanathapuram, Coimbatore, in close proximity to important commercial and educational centers. Every comfort, including food, is provided by this masculine PG. In addition to providing single rooms, the PG strictly adheres to hygiene requirements. Send an email if you have any questions or are interested. I'm excited to assist you.`,
  );
  // const pGFeatureDataPayload = () => {
  //   let customIDCounter = {counter: 0};
  //   let dataArray = [];
  //   const features = {
  //     gender: PgStep2Item?.gender,
  //     tenant_preference: PgStep2Item?.tententPreferences,
  //     present_in: PgStep1Item?.present_in,
  //     operating_since: PgStep1Item?.operational_since,
  //     parking_availability: PgStep4Item?.parking_avail,
  //     notice_period: PgStep2Item?.notice_period,
  //     gate_closing: PgStep2Item?.gate_closing_time,
  //     no_of_beds: PgStep2Item?.bedrooms,
  //   };
  //   for (const key in features) {
  //     if (features[key]?.length > 0) {
  //       if (key === 'gender') {
  //         dataArray.push({
  //           key: common_fn.generateCustomID(customIDCounter, key),
  //           title: 'gender',
  //           value: encodeURIComponent(PgStep2Item?.gender?.value),
  //         });
  //       } else if (key === 'present_in') {
  //         dataArray.push({
  //           key: common_fn.generateCustomID(customIDCounter, key),
  //           title: 'present_in',
  //           value: encodeURIComponent(PgStep1Item?.present_in?.value),
  //         });
  //       } else if (key === 'tenant_preference') {
  //         dataArray.push({
  //           key: common_fn.generateCustomID(customIDCounter, key),
  //           title: 'tenant_preference',
  //           value: encodeURIComponent(PgStep2Item?.tententPreferences?.value),
  //         });
  //       } else if (key === 'parking_availability') {
  //         dataArray.push({
  //           key: common_fn.generateCustomID(customIDCounter, key),
  //           title: 'parking_availability',
  //           value: PgStep4Item?.parking_avail?.value,
  //         });
  //       } else if (key === 'notice_period') {
  //         dataArray.push({
  //           key: common_fn.generateCustomID(customIDCounter, key),
  //           title: 'notice_period',
  //           value: PgStep2Item?.notice_period?.value,
  //         });
  //       } else if (key === 'gate_closing') {
  //         dataArray.push({
  //           key: common_fn.generateCustomID(customIDCounter, key),
  //           title: 'gate_closing',
  //           value: PgStep2Item?.gate_closing_time?.value,
  //         });
  //       } else if (key === 'no_of_beds') {
  //         dataArray.push({
  //           key: common_fn.generateCustomID(customIDCounter, key),
  //           title: 'no_of_beds',
  //           value: PgStep2Item?.bedrooms?.value,
  //         });
  //       }
  //     } else if (key === 'operating_since') {
  //       dataArray.push({
  //         key: common_fn.generateCustomID(customIDCounter, key),
  //         title: 'operating_since',
  //         value: encodeURIComponent(PgStep1Item?.operational_since),
  //       });
  //     }
  //   }
  //   return dataArray;
  // };

  const pGFeatureDataPayload = () => {
    let customIDCounter = {counter: 0};
    let dataArray = [];

    const featureMappings = {
      gender: 'gender',
      tenant_preference: 'tenant_preference',
      present_in: 'present_in',
      operating_since: 'operating_since',
      parking_availability: 'parking_availability',
      notice_period: 'notice_period',
      gate_closing: 'gate_closing',
    };
    for (const key in featureMappings) {
      const value = PgStep2Item?.[key]?.value || PgStep1Item?.[key]?.value;
      // || PgStep4Item?.[key]?.value;
      if (value) {
        dataArray.push({
          key: common_fn.generateCustomID(customIDCounter, key),
          title: featureMappings[key],
          value: decodeURIComponent(value),
        });
      } else if (PgStep2Item?.[key] && PgStep2Item?.gate_closing_time != null) {
        dataArray.push({
          key: common_fn.generateCustomID(customIDCounter, key),
          title: 'gate_closing',
          value: decodeURIComponent(
            PgStep2Item?.gate_closing_time?.toLocaleTimeString(),
          ),
        });
      }
    }

    return dataArray;
  };

  const pGAmenitiesDataPayload = (room_facility, service_avail) => {
    let customIDCounter = 1;
    let dataArray = [];

    const allItems = [
      ...room_facility,
      ...service_avail,
      // ...common_area_amenities,
    ];

    const sortedAmenities = allItems.sort((a, b) => a.key - b.key);

    sortedAmenities.forEach((item, index) => {
      const title = item.title;
      const value = item.value;

      dataArray.push({
        key: customIDCounter++,
        title: title,
        value: decodeURIComponent(value),
      });
    });

    return dataArray;
  };

  const transformData = (categories, rent, deposit) => {
    return categories.map(category => {
      const key = category.value;
      const pricePerBed = parseInt(rent[key + '_bed']) || 0;
      const depositAmount = parseInt(deposit[key + '_bed']) || 0;

      return {
        key,
        price_per_bed: pricePerBed,
        deposit: depositAmount,
      };
    });
  };

  const PGRulesData = () => {
    const titles = PgStep2Item?.pg_rules?.map(rule => rule.title) || [];
    titles.push('Entry of Opposite Gender');
    return titles;
  };

  const pgconfirmPost = async () => {
    try {
      var data = {
        property_action: 'rent',
        property_type: step1SelectedItem?.post?.value,
        location: city,
        real_estate: 'residential',
        property_name: PgStep1Item?.name,
        locality: landmark,
        features: pGFeatureDataPayload(),
        amenities: pGAmenitiesDataPayload(
          PgStep2Item?.room_facility,
          PgStep2Item?.service_avail,
          // PgStep4Item?.common_area_amenities
        ),
        rules: PGRulesData(),
        foods: [
          {
            key: 1,
            title: 'food',
            value: PgStep2Item?.food_provide.join(','),
          },
          {
            key: 2,
            title: 'provided',
            value: PgStep2Item?.veg_non_veg_food?.value,
          },
          {
            key: 3,
            title: 'charge',
            value: PgStep2Item?.food_charges?.value,
          },
        ],
        room_category: transformData(
          PgStep2Item?.bedrooms,
          PgStep2Item?.monthly_rent,
          PgStep2Item?.security_deposit,
        ),
        expected_price: 0,
        token_amount: null,
        address: PgStep1Item?.address,
        seller_id: user_id,
        description: description,
        device_id: 2,
        main_image: step3SelectedItem?.main_image,
        sub_images: step3SelectedItem?.sub_images ?? [],
        fcm_token: token,
      };
      const postProperty = await fetchData.create(data);
      if (postProperty?.message == 'Success') {
        dispatch(
          setPostPropertyLocation({
            city: null,
            landmark: null,
          }),
        );
        navigation.dispatch(StackActions.replace('postCompleted'));
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.header,
          marginVertical: Platform.OS == 'ios' ? 40 : 10,
        }}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              borderRadius: 100,
            }}>
            <Icon name="arrow-back" size={25} color={Color.black} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            step1SelectedItem?.post?.value == 'sell' ||
            step1SelectedItem?.post?.value == 'rent'
              ? confirmPost(navigation)
              : pgconfirmPost(navigation);
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              textAlign: 'right',
              color: Color.black,
              fontWeight: 'bold',
              marginRight: 10,
              marginVertical: 10,
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {step1SelectedItem?.post?.value == 'sell' ||
        step1SelectedItem?.post?.value == 'rent' ? (
          <View style={{marginVertical: 10, flex: 1}}>
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                Tell Us your property selling point
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: Color.primary,
                  fontWeight: 'bold',
                }}>
                Unique features
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: Color.cloudyGrey,
                marginVertical: 10,
              }}>
              Share the landmarks that are close by so that others will
              understand how special your Property is.
            </Text>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginVertical: 5,
                }}>
                Feature 1
              </Text>
              <TouchableOpacity
                style={{
                  height: 40,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setFeature1Visible(true);
                }}>
                <TextInput
                  placeholder="Select"
                  placeholderTextColor={Color.cloudyGrey}
                  value={featureselectedItem?.feature1?.title}
                  style={{
                    flex: 1,
                    color: Color.black,
                    padding: 10,
                    borderRightWidth: 1,
                    borderRightColor: Color.lightgrey,
                  }}
                  editable={false}
                />
                <Icon
                  name="caret-down"
                  size={20}
                  color={Color.black}
                  style={{marginRight: 20, marginHorizontal: 10}}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={feature1Visible}
                animationType="fade">
                <View
                  style={{
                    flex: 1,
                    backgroundColor: Color.transparantBlack,
                  }}>
                  <Pressable
                    style={{flex: 1}}
                    onPress={() => {
                      setFeature1Visible(false);
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: Color.white,
                      flex: 1,
                      padding: 20,
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30,
                    }}>
                    <Text style={styles.ModalHeaderText}>Select Features</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {featuresData.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setFeatureSelectedItem({
                                feature1: item,
                                feature2: featureselectedItem?.feature2,
                                feature3: featureselectedItem?.feature3,
                                feature4: featureselectedItem?.feature4,
                              });
                              setFeature1Visible(false);
                            }}>
                            <View style={styles.ModalDataView}>
                              <Text style={styles.ModalDataText}>
                                {item.title}
                              </Text>
                              <FIcon
                                name="chevron-right"
                                size={15}
                                color={Color.lightgrey}
                              />
                            </View>
                            <Divider style={styles.Divider} />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginVertical: 5,
                }}>
                Feature 2
              </Text>
              <TouchableOpacity
                style={{
                  height: 40,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setFeature2Visible(true);
                }}>
                <TextInput
                  placeholder="Select"
                  placeholderTextColor={Color.cloudyGrey}
                  value={featureselectedItem?.feature2?.title}
                  style={{
                    flex: 1,
                    color: Color.black,
                    padding: 10,
                    borderRightWidth: 1,
                    borderRightColor: Color.lightgrey,
                  }}
                  editable={false}
                />
                <Icon
                  name="caret-down"
                  size={20}
                  color={Color.black}
                  style={{marginRight: 20, marginHorizontal: 10}}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={feature2Visible}
                animationType="fade">
                <View
                  style={{
                    flex: 1,
                    backgroundColor: Color.transparantBlack,
                  }}>
                  <Pressable
                    style={{flex: 1}}
                    onPress={() => {
                      setFeature2Visible(false);
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: Color.white,
                      flex: 1,
                      padding: 20,
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30,
                    }}>
                    <Text style={styles.ModalHeaderText}>Select Features</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {fetures2Data.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setFeatureSelectedItem({
                                feature1: featureselectedItem?.feature1,
                                feature2: item,
                                feature3: featureselectedItem?.feature3,
                                feature4: featureselectedItem?.feature4,
                              });
                              setFeature2Visible(false);
                            }}>
                            <View style={styles.ModalDataView}>
                              <Text style={styles.ModalDataText}>
                                {item.title}
                              </Text>
                              <FIcon
                                name="chevron-right"
                                size={15}
                                color={Color.lightgrey}
                              />
                            </View>
                            <Divider style={styles.Divider} />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginVertical: 5,
                }}>
                Feature 3
              </Text>
              <TouchableOpacity
                style={{
                  height: 40,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setFeature3Visible(true);
                }}>
                <TextInput
                  placeholder="Select"
                  placeholderTextColor={Color.cloudyGrey}
                  value={featureselectedItem?.feature3?.title}
                  style={{
                    flex: 1,
                    color: Color.black,
                    padding: 10,
                    borderRightWidth: 1,
                    borderRightColor: Color.lightgrey,
                  }}
                  editable={false}
                />
                <Icon
                  name="caret-down"
                  size={20}
                  color={Color.black}
                  style={{marginRight: 20, marginHorizontal: 10}}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={feature3Visible}
                animationType="fade">
                <View
                  style={{
                    flex: 1,
                    backgroundColor: Color.transparantBlack,
                  }}>
                  <Pressable
                    style={{flex: 1}}
                    onPress={() => {
                      setFeature3Visible(false);
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: Color.white,
                      flex: 1,
                      padding: 20,
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30,
                    }}>
                    <Text style={styles.ModalHeaderText}>Select Features</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {fetures3Data.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setFeatureSelectedItem({
                                feature1: featureselectedItem?.feature1,
                                feature2: featureselectedItem?.feature2,
                                feature3: item,
                                feature4: featureselectedItem?.feature4,
                              });
                              setFeature3Visible(false);
                            }}>
                            <View style={styles.ModalDataView}>
                              <Text style={styles.ModalDataText}>
                                {item.title}
                              </Text>
                              <FIcon
                                name="chevron-right"
                                size={15}
                                color={Color.lightgrey}
                              />
                            </View>
                            <Divider style={styles.Divider} />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginVertical: 5,
                }}>
                Feature 4
              </Text>
              <TouchableOpacity
                style={{
                  height: 40,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setFeature4Visible(true);
                }}>
                <TextInput
                  placeholder="Select"
                  placeholderTextColor={Color.cloudyGrey}
                  value={featureselectedItem?.feature4?.title}
                  style={{
                    flex: 1,
                    color: Color.black,
                    padding: 10,
                    borderRightWidth: 1,
                    borderRightColor: Color.lightgrey,
                  }}
                  editable={false}
                />
                <Icon
                  name="caret-down"
                  size={20}
                  color={Color.black}
                  style={{marginRight: 20, marginHorizontal: 10}}
                />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={feature4Visible}
                animationType="fade">
                <View
                  style={{
                    flex: 1,
                    backgroundColor: Color.transparantBlack,
                  }}>
                  <Pressable
                    style={{flex: 1}}
                    onPress={() => {
                      setFeature4Visible(true);
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: Color.white,
                      flex: 1,
                      padding: 20,
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30,
                    }}>
                    <Text style={styles.ModalHeaderText}>Select Features</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {fetures4Data.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setFeatureSelectedItem({
                                feature1: featureselectedItem?.feature1,
                                feature2: featureselectedItem?.feature2,
                                feature3: featureselectedItem?.feature3,
                                feature4: item,
                              });
                              setFeature4Visible(false);
                            }}>
                            <View style={styles.ModalDataView}>
                              <Text style={styles.ModalDataText}>
                                {item.title}
                              </Text>
                              <FIcon
                                name="chevron-right"
                                size={15}
                                color={Color.lightgrey}
                              />
                            </View>
                            <Divider style={styles.Divider} />
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        ) : (
          <View style={{marginVertical: 10, flex: 1}}>
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 20,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                Tell Us More about your PG
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Poppins.Medium,
                  marginVertical: 10,
                }}>
                Write a brief description of your PG, including its unique
                features and benifits,to help the tenants know your property
                better
              </Text>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.cloudyGrey,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  PG Description (Min 100char)
                </Text>
                <Text
                  style={{
                    color: Color.red,
                    marginHorizontal: 5,
                    fontSize: 20,
                  }}>
                  *
                </Text>
              </View>
              <TextInput
                placeholder="Enter your description about your PG..."
                placeholderTextColor={Color.cloudyGrey}
                value={description}
                textAlignVertical="top"
                onChangeText={value => {
                  setDescription(value);
                }}
                // onContentSizeChange={event => {
                //   setCardHeight(
                //     Math.max(150, event.nativeEvent.contentSize.height),
                //   );
                // }}
                multiline
                style={{
                  flex: 1,
                  color: Color.black,
                  padding: 10,
                  height: 150,
                  borderWidth: 1,
                  borderColor: Color.cloudyGrey,
                  marginVertical: 5,
                  borderRadius: 5,
                }}
              />
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  fontFamily: Poppins.SemiBold,
                }}>
                Sample Description
              </Text>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: Color.lightBlack,
                    marginHorizontal: 5,
                    fontSize: 18,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Sample 1
                </Text>
                <Text
                  style={{
                    color: Color.cloudyGrey,
                    marginHorizontal: 5,
                    fontSize: 14,
                    fontFamily: Poppins.Medium,
                  }}>
                  {sampledescription1}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setDescription(sampledescription1);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FCEAEA',
                    height: 40,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: Color.primary,
                      marginHorizontal: 5,
                      fontSize: 16,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    Edit & use
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: Color.lightBlack,
                    marginHorizontal: 5,
                    fontSize: 18,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Sample 2
                </Text>
                <Text
                  style={{
                    color: Color.cloudyGrey,
                    marginHorizontal: 5,
                    fontSize: 14,
                    fontFamily: Poppins.Medium,
                  }}>
                  {sampledescription2}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setDescription(sampledescription2);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FCEAEA',
                    height: 40,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: Color.primary,
                      marginHorizontal: 5,
                      fontSize: 16,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    Edit & use
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <Button
          title={'Confirm and post property'}
          buttonStyle={{
            backgroundColor: Color.primary,
            height: 45,
            marginVertical: 20,
          }}
          onPress={() => {
            step1SelectedItem?.post?.value == 'sell' ||
            step1SelectedItem?.post?.value == 'rent'
              ? confirmPost(navigation)
              : pgconfirmPost(navigation);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ConfirmPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  stepIndicator: {
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    paddingHorizontal: 10,
    flex: 1,
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingEnd: 2,
    height: 30,
  },
  icon: {
    paddingEnd: 12,
  },
  pillContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pillText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  ModalHeaderText: {
    fontSize: 18,
    color: Color.black,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  ModalDataView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ModalDataText: {
    flex: 1,
    fontSize: 16,
    color: Color.black,
    textTransform: 'capitalize',
  },
  Divider: {height: 1, marginVertical: 10},
});
