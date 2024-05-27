import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  TextInput,
  SectionList,
  Pressable,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import {Text, View} from 'react-native';
import Color from '../../../Config/Color';
import StepIndicator from 'react-native-step-indicator';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  setFilterLocation,
  setPostPropertyLocation,
  setUserData,
} from '../../../Redux';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Divider} from 'react-native-elements';
import LocationBottomModal, {
  PostPropertyLocationBottomModal,
} from '../../../Components/LocationBottomModal';
import {Poppins} from '../../../Global/FontFamily';
import common_fn from '../../../Config/common_fn';
import fetchData from '../../../Config/fetchData';
import PlanPurchase, {
  AgentPlanPurchase,
} from '../../../Components/PlanPurchase';
import {BackHandler} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Modal} from 'react-native';
import MapContainer from '../../../Components/MapContainer';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Iconviewcomponent} from '../../../Components/Icontag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileCompletion} from '../../../Utils/utils';

const {width} = Dimensions.get('screen');

const customStyles = {
  stepIndicatorSize: 25,
  separatorStrokeWidth: 3,
  stepIndicatorLabelFontSize: 15,
  labelColor: Color.cloudyGrey,
  labelSize: 12,

  currentStepIndicatorSize: 30,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Color.primary,
  stepIndicatorCurrentColor: Color.primary,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: Color.white,
  currentStepLabelColor: Color.black,

  separatorFinishedColor: Color.primary,
  stepIndicatorFinishedColor: Color.primary,
  stepIndicatorLabelFinishedColor: 'white',

  separatorUnFinishedColor: '#ddd',
  stepIndicatorUnFinishedColor: '#ddd',
  stepIndicatorLabelUnFinishedColor: 'white',
};

const labels = [
  'Basic Details',
  'Property Details',
  'Photos & Pricing',
  'Amenities',
];
const Plotlabels = ['Basic Details', 'Property Details', 'Photos & Pricing'];

const PostData = ({
  item,
  propertyKind,
  step1SelectedItem,
  setStep1SelectedItem,
  visibleData,
  showLoadMore,
  loadMoreItems,
  city,
  landmark,
  setVisible,
  setLocationInput,
  occupation,
  setCurrentStatus,
  currentStatus,
  propertyAge,
  step1Data,
  navigation,
  setSelectType,
  selectType,
  checkTextInput,
  kindError,
  setKindError,
  nameError,
  setNameError,
  addressError,
  setAddressError,
  typeError,
  setTypeError,
  commercialPropertyType,
  //Rent
  step1RentSelectedItem,
  setStep1RentSelectedItem,
  rentPostError,
  setRentPostError,
  rentKindError,
  setRentKindError,
  rentNameError,
  setRentNameError,
  rentAddressError,
  setRentAddressError,
  rentTypeError,
  setRentTypeError,
  //PG
  pgPresentData,
  listedBy,
  PgStep1Item,
  setPgStep1Item,
}) => {
  const dispatch = useDispatch();
  const [cardHeight, setCardHeight] = useState(undefined);
  const [pgPresentVisible, setPgpresentVisible] = useState(false);
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [address, setAddress] = useState('');

  const handleLocationChange = async () => {
    try {
      const formattedText = encodeURIComponent(landmark);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${formattedText}`,
      );
      const data = await response.json();
      if (data.length > 0) {
        const {lat, lon, display_name} = data[0];
        setLocation({latitude: parseFloat(lat), longitude: parseFloat(lon)});
        setAddress(display_name);
      } else {
        setAddress('Location not found');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleLocationChange();
    }, 1000);
  }, []);

  const [cityData, setCityData] = useState([]);

  const locationData = async () => {
    try {
      var data = 'location=' + 'city' + '&state=' + '31';
      const filterloc = await fetchData.Location(data);
      setCityData(filterloc?.city);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    locationData();
  }, [cityData]);

  switch (selectType) {
    case 'Sell':
      return (
        <View style={{marginVertical: 10}}>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Select Real Estate
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {propertyKind.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        step1SelectedItem?.kind?.id == item?.id
                          ? '#8C193F20'
                          : Color.white,
                      // width: width / 3.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      borderRadius: 50,
                      padding: 10,
                      marginVertical: 10,
                      borderColor:
                        step1SelectedItem?.kind?.id == item?.id
                          ? Color.primary
                          : Color.lightgrey,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      setStep1SelectedItem({
                        post: step1SelectedItem.post,
                        kind: item,
                        name: '',
                        address: '',
                        commercialPropType: {},
                        description: '',
                        type: {},
                        reason: '',
                        occupation: '',
                        age: {},
                      });
                      if (step1SelectedItem?.kind?.value?.length == 0) {
                        var msg = 'Please select property';
                        setKindError(msg);
                        return;
                      } else {
                        setKindError(false);
                      }
                      // setSelectType(item);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          step1SelectedItem?.kind?.id == item?.id
                            ? Color.primary
                            : Color.black,
                        fontFamily: Poppins.Medium,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {kindError}
            </Text>
          </View>

          <View style={{marginVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Property Type
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>

            {step1SelectedItem?.kind?.value == 'residential' ? (
              <View
                style={{
                  backgroundColor: Color.white,
                  paddingEnd: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {visibleData.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          step1SelectedItem?.type?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        // width: width / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 50,
                        // height: 60,
                        padding: 10,
                        marginVertical: 10,
                        borderColor:
                          step1SelectedItem?.type?.id == item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        setStep1SelectedItem({
                          post: step1SelectedItem.post,
                          kind: step1SelectedItem.kind,
                          type: item,
                          reason: step1SelectedItem.reason,
                          occupation: step1SelectedItem.occupation,
                          age: step1SelectedItem.age,
                          address: step1SelectedItem.address,
                          description: step1SelectedItem.description,
                          name: step1SelectedItem.name,
                          commercialPropType:
                            step1SelectedItem.commercialPropType,
                        });
                        if (step1SelectedItem?.kind?.value == 'residential') {
                          if (step1SelectedItem?.type?.value?.length == 0) {
                            var msg = 'Please select property Type';
                            setTypeError(msg);
                            return;
                          } else {
                            setTypeError(false);
                          }
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            step1SelectedItem?.type?.id == item?.id
                              ? Color.primary
                              : Color.black,
                          fontFamily: Poppins.Medium,
                          marginHorizontal: 5,
                          paddingVertical: 10,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                {showLoadMore && (
                  <TouchableOpacity onPress={loadMoreItems}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.SemiBold,
                        color: Color.primary,
                      }}>
                      +8 more
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: Color.white,
                  paddingEnd: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {commercialPropertyType.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          step1SelectedItem?.commercialPropType?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        // width: width / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 50,
                        // height: 60,
                        padding: 5,
                        marginVertical: 10,
                        borderColor:
                          step1SelectedItem?.commercialPropType?.id == item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        setStep1SelectedItem({
                          post: step1SelectedItem.post,
                          kind: step1SelectedItem.kind,
                          type: step1SelectedItem?.type,
                          commercialPropType: item,
                          reason: step1SelectedItem.reason,
                          occupation: step1SelectedItem.occupation,
                          age: step1SelectedItem.age,
                          address: step1SelectedItem.address,
                          description: step1SelectedItem.description,
                          name: step1SelectedItem.name,
                        });
                        // if (step1SelectedItem?.commercialPropType?.value?.length == 0) {
                        //   var msg = 'Please select property Type';
                        //   setTypeError(msg);
                        //   return;
                        // } else {
                        //   setTypeError(false);
                        // }
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            step1SelectedItem?.commercialPropType?.id ==
                            item?.id
                              ? Color.primary
                              : Color.black,
                          fontFamily: Poppins.Medium,
                          marginHorizontal: 5,
                          paddingVertical: 5,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                {showLoadMore && (
                  <TouchableOpacity onPress={loadMoreItems}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.SemiBold,
                        color: Color.primary,
                      }}>
                      +8 more
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {typeError}
            </Text>
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Property Location
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: Color.cloudyGrey,
                fontFamily: Poppins.Regular,
                paddingVertical: 5,
              }}>
              (City, Name of Project/Society)
            </Text>

            <PostPropertyLocationBottomModal
              // visible={visible}
              // setVisible={setVisible}
              data={cityData}
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Property Name
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>

            <TextInput
              placeholder="Enter your Property Name..."
              placeholderTextColor={Color.cloudyGrey}
              value={step1SelectedItem?.name}
              textAlignVertical="top"
              onChangeText={value => {
                setStep1SelectedItem({
                  post: step1SelectedItem.post,
                  kind: step1SelectedItem.kind,
                  type: step1SelectedItem.type,
                  reason: step1SelectedItem?.reason,
                  occupation: step1SelectedItem.occupation,
                  age: step1SelectedItem?.age,
                  address: step1SelectedItem.address,
                  name: value,
                  description: step1SelectedItem.description,
                  commercialPropType: step1SelectedItem.commercialPropType,
                });
                if (value?.length == 0) {
                  var msg = 'Please Type your Property Name';
                  setNameError(msg);
                  return;
                } else {
                  setNameError(false);
                }
              }}
              style={{
                flex: 1,
                color: Color.black,
                padding: 10,
                height: 45,
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                marginVertical: 5,
                borderRadius: 5,
                fontSize: 15,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {nameError}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Address
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>

            <TextInput
              placeholder="Enter your valid address..."
              placeholderTextColor={Color.cloudyGrey}
              value={step1SelectedItem?.address}
              textAlignVertical="top"
              onChangeText={value => {
                setStep1SelectedItem({
                  post: step1SelectedItem.post,
                  kind: step1SelectedItem.kind,
                  type: step1SelectedItem.type,
                  reason: step1SelectedItem?.reason,
                  occupation: step1SelectedItem.occupation,
                  age: step1SelectedItem?.age,
                  address: value,
                  description: step1SelectedItem.description,
                  name: step1SelectedItem.name,
                  commercialPropType: step1SelectedItem.commercialPropType,
                });
                if (value?.length == 0) {
                  var msg = 'Please Enter Your Valid Address';
                  setAddressError(msg);
                  return;
                } else {
                  setAddressError(false);
                }
              }}
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
            <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {addressError}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 0,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                marginVertical: 10,
                fontWeight: 'bold',
              }}>
              Property Description{' '}
              <Text style={{fontSize: 14, color: Color.lightgrey}}>
                (Optional)
              </Text>
            </Text>
            <TextInput
              placeholder="Enter Property Description..."
              placeholderTextColor={Color.cloudyGrey}
              value={step1SelectedItem?.description}
              textAlignVertical="top"
              onChangeText={value =>
                setStep1SelectedItem({
                  post: step1SelectedItem.post,
                  kind: step1SelectedItem.kind,
                  type: step1SelectedItem.type,
                  reason: step1SelectedItem?.reason,
                  occupation: step1SelectedItem.occupation,
                  age: step1SelectedItem?.age,
                  address: step1SelectedItem.address,
                  description: value,
                  name: step1SelectedItem.name,
                  commercialPropType: step1SelectedItem.commercialPropType,
                })
              }
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

          <Button
            title={'NEXT'}
            buttonStyle={{
              backgroundColor: Color.primary,
              height: 45,
              marginVertical: 20,
            }}
            onPress={() => {
              step1Data(navigation);
              checkTextInput();
            }}
          />
        </View>
      );
    case 'Rent/Lease':
      return (
        <View style={{marginVertical: 10}}>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Select Real Estate
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {rentKindError}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {propertyKind.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        step1RentSelectedItem?.kind?.id == item?.id
                          ? '#8C193F20'
                          : Color.white,
                      // width: width / 3.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      borderRadius: 50,
                      padding: 10,
                      marginVertical: 10,
                      borderColor:
                        step1RentSelectedItem?.kind?.id == item?.id
                          ? Color.primary
                          : Color.lightgrey,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      setStep1RentSelectedItem({
                        post: step1RentSelectedItem.post,
                        kind: item,
                        name: '',
                        address: '',
                        commercialPropType: {},
                        description: '',
                        type: {},
                        reason: '',
                        occupation: '',
                        age: {},
                      });
                      if (step1RentSelectedItem?.kind?.value?.length == 0) {
                        var msg = 'Please select property';
                        setRentKindError(msg);
                        return;
                      } else {
                        setRentKindError(false);
                      }
                      // setSelectType(item);
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          step1RentSelectedItem?.kind?.id == item?.id
                            ? Color.primary
                            : Color.black,
                        fontFamily: Poppins.Medium,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Select Property Type
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {rentTypeError}
            </Text>
            {step1RentSelectedItem?.kind?.value == 'residential' ? (
              <View
                style={{
                  backgroundColor: Color.white,
                  paddingEnd: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {visibleData.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          step1RentSelectedItem?.type?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        // width: width / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 50,
                        // height: 60,
                        padding: 5,
                        marginVertical: 10,
                        borderColor:
                          step1RentSelectedItem?.type?.id == item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        setStep1RentSelectedItem({
                          post: step1RentSelectedItem.post,
                          kind: step1RentSelectedItem.kind,
                          type: item,
                          reason: step1RentSelectedItem.reason,
                          occupation: step1RentSelectedItem.occupation,
                          age: step1RentSelectedItem.age,
                          address: step1RentSelectedItem.address,
                          description: step1RentSelectedItem.description,
                          name: step1RentSelectedItem.name,
                          commercialPropType:
                            step1RentSelectedItem.commercialPropType,
                        });
                        if (
                          step1RentSelectedItem?.kind?.value == 'residential'
                        ) {
                          if (step1RentSelectedItem?.type?.value?.length == 0) {
                            var msg = 'Please select property Type';
                            setRentTypeError(msg);
                            return;
                          } else {
                            setRentTypeError(false);
                          }
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            step1RentSelectedItem?.type?.id == item?.id
                              ? Color.primary
                              : Color.black,
                          fontFamily: Poppins.Medium,
                          marginHorizontal: 5,
                          paddingVertical: 10,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                {showLoadMore && (
                  <TouchableOpacity onPress={loadMoreItems}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.SemiBold,
                        color: Color.primary,
                      }}>
                      +8 more
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: Color.white,
                  paddingEnd: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {commercialPropertyType.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          step1RentSelectedItem?.commercialPropType?.id ==
                          item?.id
                            ? '#8C193F20'
                            : Color.white,
                        // width: width / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 50,
                        // height: 60,
                        padding: 5,
                        marginVertical: 10,
                        borderColor:
                          step1RentSelectedItem?.commercialPropType?.id ==
                          item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        setStep1RentSelectedItem({
                          post: step1RentSelectedItem.post,
                          kind: step1RentSelectedItem.kind,
                          type: step1RentSelectedItem?.type,
                          commercialPropType: item,
                          reason: step1RentSelectedItem.reason,
                          occupation: step1RentSelectedItem.occupation,
                          age: step1RentSelectedItem.age,
                          address: step1RentSelectedItem.address,
                          description: step1RentSelectedItem.description,
                          name: step1RentSelectedItem.name,
                        });
                        if (
                          step1RentSelectedItem?.kind?.value == 'commercial'
                        ) {
                          if (
                            step1RentSelectedItem?.commercialPropType?.value
                              ?.length == 0
                          ) {
                            var msg = 'Please select property Type';
                            setRentTypeError(msg);
                            return;
                          } else {
                            setRentTypeError(false);
                          }
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            step1RentSelectedItem?.commercialPropType?.id ==
                            item?.id
                              ? Color.primary
                              : Color.black,
                          fontFamily: Poppins.Medium,
                          marginHorizontal: 5,
                          paddingVertical: 5,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                {showLoadMore && (
                  <TouchableOpacity onPress={loadMoreItems}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.SemiBold,
                        color: Color.primary,
                      }}>
                      +8 more
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                Where is your property located?
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {city != '' && (
                <View style={styles.pillContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#d4e9f4',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={styles.pillText}>{city}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setPostPropertyLocation({
                            city: '',
                            landmark: landmark,
                          }),
                        );
                      }}
                      hitSlop={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                      }}>
                      <Icon size={20} name="close-circle" color="#b1cddb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {landmark != '' && (
                <View style={styles.pillContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#d4e9f4',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={styles.pillText}>{landmark}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setPostPropertyLocation({
                            city: city,
                            landmark: '',
                          }),
                        );
                      }}
                      hitSlop={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                      }}>
                      <Icon size={20} name="close-circle" color="#b1cddb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
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
                setVisible(true);
              }}>
              <TextInput
                placeholder="Enter your city / Landmark / Project..."
                placeholderTextColor={Color.cloudyGrey}
                onChangeText={value => setLocationInput(value)}
                style={{
                  flex: 1,
                  color: Color.black,
                  padding: 10,
                  borderRightWidth: 1,
                  borderRightColor: Color.lightgrey,
                }}
                editable={false}
              />
              <MIcon
                name="my-location"
                size={20}
                color={Color.primary}
                style={{ marginRight: 20, marginHorizontal: 10 }}
              />
            </TouchableOpacity> */}
            <PostPropertyLocationBottomModal
              // visible={visible}
              // setVisible={setVisible}
              data={cityData}
            />
          </View>
          <View
            style={{
              marginVertical: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Property Name
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {nameError}
            </Text>
            <TextInput
              placeholder="Enter your Property Name..."
              placeholderTextColor={Color.cloudyGrey}
              value={step1RentSelectedItem?.name}
              textAlignVertical="top"
              onChangeText={value => {
                setStep1RentSelectedItem({
                  post: step1RentSelectedItem.post,
                  kind: step1RentSelectedItem.kind,
                  type: step1RentSelectedItem.type,
                  reason: step1RentSelectedItem?.reason,
                  occupation: step1RentSelectedItem.occupation,
                  age: step1RentSelectedItem?.age,
                  address: step1RentSelectedItem.address,
                  name: value,
                  description: step1RentSelectedItem.description,
                  commercialPropType: step1RentSelectedItem.commercialPropType,
                });
                if (value?.length == 0) {
                  var msg = 'Please Type your Property Name';
                  setRentNameError(msg);
                  return;
                } else {
                  setRentNameError(false);
                }
              }}
              style={{
                flex: 1,
                color: Color.black,
                padding: 10,
                height: 40,
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Address
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {rentAddressError}
            </Text>
            <TextInput
              placeholder="Enter your valid address..."
              placeholderTextColor={Color.cloudyGrey}
              value={step1RentSelectedItem?.address}
              textAlignVertical="top"
              multiline
              onChangeText={value => {
                setStep1RentSelectedItem({
                  post: step1RentSelectedItem.post,
                  kind: step1RentSelectedItem.kind,
                  type: step1RentSelectedItem.type,
                  reason: step1RentSelectedItem?.reason,
                  occupation: step1RentSelectedItem.occupation,
                  age: step1RentSelectedItem?.age,
                  address: value,
                  description: step1RentSelectedItem.description,
                  name: step1RentSelectedItem.name,
                  commercialPropType: step1RentSelectedItem.commercialPropType,
                });
                if (value?.length == 0) {
                  var msg = 'Please Enter Your Valid Address';
                  setRentAddressError(msg);
                  return;
                } else {
                  setRentAddressError(false);
                }
              }}
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
                color: Color.black,
                marginVertical: 10,
                fontWeight: 'bold',
              }}>
              Property Description{' '}
              <Text style={{fontSize: 14, color: Color.lightgrey}}>
                (Optional)
              </Text>
            </Text>
            <TextInput
              placeholder="Enter Property Description..."
              placeholderTextColor={Color.cloudyGrey}
              value={step1RentSelectedItem?.description}
              textAlignVertical="top"
              multiline
              onChangeText={value =>
                setStep1RentSelectedItem({
                  post: step1RentSelectedItem.post,
                  kind: step1RentSelectedItem.kind,
                  type: step1RentSelectedItem.type,
                  reason: step1RentSelectedItem?.reason,
                  occupation: step1RentSelectedItem.occupation,
                  age: step1RentSelectedItem?.age,
                  address: step1RentSelectedItem.address,
                  description: value,
                  name: step1RentSelectedItem.name,
                  commercialPropType: step1RentSelectedItem.commercialPropType,
                })
              }
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
          <Button
            title={'NEXT'}
            buttonStyle={{
              backgroundColor: Color.primary,
              height: 45,
              marginVertical: 20,
            }}
            onPress={() => {
              step1Data(navigation);
              checkTextInput();
            }}
          />
        </View>
      );
    case 'PG':
      return (
        <View style={{marginVertical: 10}}>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                PG Location
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {city != '' && (
                <View style={styles.pillContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#d4e9f4',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={styles.pillText}>{city}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setPostPropertyLocation({
                            city: '',
                            landmark: landmark,
                          }),
                        );
                      }}
                      hitSlop={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                      }}>
                      <Icon size={20} name="close-circle" color="#b1cddb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {landmark != '' && (
                <View style={styles.pillContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#d4e9f4',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={styles.pillText}>{landmark}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setPostPropertyLocation({
                            city: city,
                            landmark: '',
                          }),
                        );
                      }}
                      hitSlop={{
                        top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10,
                      }}>
                      <Icon size={20} name="close-circle" color="#b1cddb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
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
                setVisible(true);
              }}>
              <TextInput
                placeholder="Enter your city / Landmark / Project..."
                placeholderTextColor={Color.cloudyGrey}
                onChangeText={value => {
                  setLocationInput(value);
                }}
                style={{
                  flex: 1,
                  color: Color.black,
                  padding: 10,
                  borderRightWidth: 1,
                  borderRightColor: Color.lightgrey,
                }}
                editable={false}
              />
              <MIcon
                name="my-location"
                size={20}
                color={Color.primary}
                style={{ marginRight: 20, marginHorizontal: 10 }}
              />
            </TouchableOpacity> */}
            <PostPropertyLocationBottomModal
              // visible={visible}
              // setVisible={setVisible}
              data={cityData}
            />
          </View>
          {/* <MapContainer location={location} /> */}
          <View
            style={{
              marginVertical: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                PG Address
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <TextInput
              placeholder="Enter your valid address..."
              placeholderTextColor={Color.cloudyGrey}
              value={PgStep1Item?.address}
              textAlignVertical="top"
              multiline
              onChangeText={value => {
                setPgStep1Item({
                  name: PgStep1Item?.name,
                  address: value,
                  postedBY: PgStep1Item?.postedBY,
                  operational_since: PgStep1Item?.operational_since,
                  present_in: PgStep1Item?.present_in,
                });
                if (value?.length == 0) {
                  var msg = 'Please Enter Your Valid Address';
                  setAddressError(msg);
                  return;
                } else {
                  setAddressError(false);
                }
              }}
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                PG Name
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <TextInput
              placeholder="Enter your Property Name..."
              placeholderTextColor={Color.cloudyGrey}
              value={PgStep1Item?.name}
              textAlignVertical="top"
              onChangeText={value => {
                setPgStep1Item({
                  name: value,
                  address: PgStep1Item?.address,
                  postedBY: PgStep1Item?.postedBY,
                  operational_since: PgStep1Item?.operational_since,
                  present_in: PgStep1Item?.present_in,
                });
                if (value?.length == 0) {
                  var msg = 'Please Type your Property Name';
                  setNameError(msg);
                  return;
                } else {
                  setNameError(false);
                }
              }}
              style={{
                flex: 1,
                color: Color.black,
                padding: 10,
                height: 40,
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Operating Since{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#666',
                  fontFamily: Poppins.Bold,
                }}>
                (Ex : 2024)
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <TextInput
              placeholder="Enter your operation of your PG..."
              placeholderTextColor={Color.cloudyGrey}
              value={PgStep1Item?.operational_since}
              textAlignVertical="top"
              keyboardType="number-pad"
              onChangeText={value => {
                setPgStep1Item({
                  name: PgStep1Item?.name,
                  address: PgStep1Item?.address,
                  postedBY: PgStep1Item?.postedBY,
                  operational_since: value,
                  present_in: PgStep1Item?.present_in,
                });
                if (value?.length == 0) {
                  var msg = 'Please Type your Property Name';
                  setNameError(msg);
                  return;
                } else {
                  setNameError(false);
                }
              }}
              style={{
                flex: 1,
                color: Color.black,
                padding: 10,
                height: 40,
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Present In
              </Text>
              <Text
                style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                *
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <TouchableOpacity
                onPress={() => {
                  setPgpresentVisible(true);
                }}
                style={{
                  backgroundColor: Color.white,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  // height: 40,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Color.cloudyGrey,
                    flex: 1,
                    fontFamily: Poppins.SemiBold,
                    fontSize: 14,
                    textTransform: 'capitalize',
                  }}>
                  {PgStep1Item?.present_in?.value?.length > 0
                    ? common_fn.formatText(PgStep1Item?.present_in?.value)
                    : 'Select'}
                </Text>
                <Icon name="caret-down" size={20} color={Color.black} />
              </TouchableOpacity>
              <Modal
                transparent={true}
                visible={pgPresentVisible}
                animationType="fade">
                <View
                  style={{
                    flex: 1,
                    backgroundColor: Color.transparantBlack,
                  }}>
                  <Pressable
                    style={{flex: 1}}
                    onPress={() => {
                      setPgpresentVisible(false);
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: Color.white,
                      padding: 10,
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30,
                      height: cardHeight,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Color.cloudyGrey,
                        fontWeight: 'bold',
                        marginVertical: 10,
                      }}>
                      Select
                    </Text>
                    <Divider style={styles.Divider} />
                    <View
                      style={{
                        marginHorizontal: 20,
                      }}>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {pgPresentData.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setPgStep1Item({
                                  name: PgStep1Item?.name,
                                  address: PgStep1Item?.address,
                                  postedBY: PgStep1Item?.postedBY,
                                  operational_since:
                                    PgStep1Item?.operational_since,
                                  present_in: item,
                                });
                                setPgpresentVisible(false);
                              }}>
                              <View style={{alignItems: 'center'}}>
                                <Text style={styles.ModalDataText}>
                                  {item?.label}
                                </Text>
                              </View>
                              <Divider style={styles.Divider} />
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              You Are Posting As
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <FlatList
                nestedScrollEnabled
                data={listedBy}
                keyExtractor={(item, index) => item + index}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          PgStep1Item?.postedBY?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        borderRadius: 10,
                        width: width / 3.5,
                        marginVertical: 10,
                        padding: 10,
                        marginHorizontal: 5,
                        borderColor: Color.lightgrey,
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setPgStep1Item({
                          name: PgStep1Item?.name,
                          address: PgStep1Item?.address,
                          postedBY: item,
                          operational_since: PgStep1Item?.operational_since,
                          present_in: PgStep1Item?.present_in,
                        });
                      }}>
                      <FIcon name="plus" size={14} color={Color.black} />
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.black,
                          fontFamily: Poppins.Medium,
                          marginHorizontal: 5,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
          <Button
            title={'NEXT'}
            buttonStyle={{
              backgroundColor: Color.primary,
              height: 45,
              marginVertical: 20,
            }}
            onPress={() => {
              step1Data(navigation);
            }}
          />
        </View>
      );
  }
};

const PostStep1Screen = ({}) => {
  const routeName = useRoute();
  const navigation = useNavigation();
  const [selectType, setSelectType] = useState({
    id: 1,
    title: 'Sell',
    value: 'sell',
  });
  const [postingProperty] = useState([
    {id: 1, title: 'Sell', value: 'sell'},
    {id: 2, title: 'Rent/Lease', value: 'rent'},
    {id: 3, title: 'PG', value: 'pg'},
  ]);
  const [propertyKind] = useState([
    {id: 1, title: 'Residential', value: 'residential'},
    {id: 2, title: 'Commercial', value: 'commercial'},
  ]);
  const [propertyAge] = useState([
    {id: 1, title: '25-35 Years'},
    {id: 2, title: '35-45 Years'},
    {id: 3, title: '45-60 Years'},
  ]);
  const [propertyType] = useState([
    {id: 1, title: 'Apartment/Flat', value: 'flat'},
    {id: 2, title: 'House', value: 'house'},
    {id: 3, title: 'villa', value: 'villa'},
    {id: 4, title: 'Plot/Land', value: 'plot'},
  ]);
  const [commercialPropertyType] = useState([
    {id: 1, title: 'Office Space', value: 'office'},
    {id: 2, title: 'Showroom/Shop', value: 'shop'},
    {id: 3, title: 'Plot/Land', value: 'plot'},
  ]);
  const [locationInput, setLocationInput] = useState({});
  const [step1SelectedItem, setStep1SelectedItem] = useState({
    post: {},
    kind: {},
    name: '',
    address: '',
    commercialPropType: {},
    description: '',
    type: {},
    reason: '',
    occupation: '',
    age: {},
  });
  const [step1RentSelectedItem, setStep1RentSelectedItem] = useState({
    post: {},
    kind: {},
    name: '',
    address: '',
    commercialPropType: {},
    description: '',
    type: {},
    reason: '',
    occupation: '',
    age: {},
  });
  const [Section] = useState([
    {id: 1, title: 'types', data: ['types']},
    {id: 2, title: 'type_Details', data: ['type_Details']},
  ]);
  const [occupation] = useState([
    {id: 1, label: 'self-employeed', value: 'self-employeed'},
    {id: 2, label: 'private', value: 'private'},
    {id: 3, label: 'government', value: 'government'},
  ]);
  const propertyLocation = useSelector(
    state => state.PropertyReducer.propertyLocation,
  );
  const [PgStep1Item, setPgStep1Item] = useState({
    name: '',
    address: '',
    postedBY: {},
    operational_since: '',
    present_in: {},
  });
  var {city, landmark} = propertyLocation;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');

  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id, username, user_type_id, post_quota, mobile_number, email} =
    userData;
  const UpdateRBSheet = useRef();
  const [Username, setUsername] = useState(username);
  const [number, setNumber] = useState(mobile_number);
  const [Usermail, setUsermail] = useState(email);
  const [height, setHeight] = useState(undefined);
  const [percentage, setPercentage] = useState(0);
  const [EmailContactVisible, setEmailContactVisible] = useState(false);
  const [propertyId, setPropertyId] = useState(0);
  const [visibleData, setVisibleData] = useState(propertyType?.slice(0, 5));
  const [showLoadMore, setShowLoadMore] = useState(propertyType?.length > 5);

  const [post_quota_value, setPost_quota_value] = useState('');

  const loadMoreItems = () => {
    const newVisibleData = propertyType?.slice(0, visibleData.length + 8);
    setVisibleData(newVisibleData);
    setShowLoadMore(newVisibleData?.length < propertyType?.length);
  };
  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };
  //Buy
  const [postError, setPostError] = useState(false);
  const [kindError, setKindError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  //Rent
  const [rentPostError, setRentPostError] = useState(false);
  const [rentKindError, setRentKindError] = useState(false);
  const [rentNameError, setRentNameError] = useState(false);
  const [rentAddressError, setRentAddressError] = useState(false);
  const [rentTypeError, setRentTypeError] = useState(false);
  //PG

  const [pgPresentData] = useState([
    {id: 1, label: 'An Independent Building', value: 'an_independent_building'},
    {id: 2, label: 'An Independent flat(S)', value: 'an_independent_flat(s)'},
    {id: 3, label: 'In Society', value: 'in_society'},
  ]);
  const [listedBy, setListedBy] = useState([
    {id: 1, title: 'Owner', value: 'owner'},
    {id: 2, title: 'Agent', value: 'agent'},
    {id: 3, title: 'Property Manager', value: 'property_manager'},
  ]);

  const checkTextInput = () => {
    if (!step1SelectedItem?.post?.value) {
      var msg = 'Please select property';
      setPostError(msg);
      return;
    } else {
      setPostError(false);
    }
    if (!step1SelectedItem?.kind?.value) {
      var msg = 'Please select kind of property';
      setKindError(msg);
      return;
    } else {
      setKindError(false);
    }
    if (!step1SelectedItem?.type?.value) {
      var msg = 'Please select property type';
      setTypeError(msg);
      return;
    } else {
      setTypeError(false);
    }
    if (!step1SelectedItem?.name.trim()) {
      var msg = 'Please type your property name';
      setNameError(msg);
      return;
    } else {
      setNameError(false);
    }
    if (!step1SelectedItem?.address.trim()) {
      var msg = 'Please type your property address';
      setAddressError(msg);
      return;
    } else {
      setAddressError(false);
    }
    //Rent
    if (!step1RentSelectedItem?.post?.value) {
      var msg = 'Please select property';
      setRentPostError(msg);
      return;
    } else {
      setRentPostError(false);
    }
    if (!step1RentSelectedItem?.kind?.value) {
      var msg = 'Please select kind of property';
      setRentKindError(msg);
      return;
    } else {
      setRentKindError(false);
    }
    if (!step1RentSelectedItem?.type?.value) {
      var msg = 'Please select property type';
      setRentTypeError(msg);
      return;
    } else {
      setRentTypeError(false);
    }
    if (!step1RentSelectedItem?.name.trim()) {
      var msg = 'Please type your property name';
      setRentNameError(msg);
      return;
    } else {
      setRentNameError(false);
    }
    if (!step1RentSelectedItem?.address.trim()) {
      var msg = 'Please type your property address';
      setRentAddressError(msg);
      return;
    } else {
      setRentAddressError(false);
    }
  };
  // const step1Data = navigation => {
  //   try {
  //     if (
  //       step1SelectedItem?.post?.value == 'sell' ||
  //       step1SelectedItem?.post?.value == 'rent'
  //     ) {
  //       if (
  //         step1SelectedItem?.post?.value == 'sell'
  //           ? step1SelectedItem?.post?.value?.length > 0 &&
  //           step1SelectedItem?.kind?.value?.length > 0 &&
  //           (step1SelectedItem?.type?.value?.length > 0 ||
  //             step1SelectedItem?.commercialPropType?.value?.length > 0) &&
  //           step1SelectedItem?.name?.length > 0 &&
  //           step1SelectedItem?.address?.length > 0 &&
  //           city?.length > 0
  //           : step1SelectedItem?.post?.value == 'rent' &&
  //           step1SelectedItem?.post?.value?.length > 0 &&
  //           step1RentSelectedItem?.kind?.value?.length > 0 &&
  //           (step1RentSelectedItem?.type?.value?.length > 0 ||
  //             step1RentSelectedItem?.commercialPropType?.value?.length > 0) &&
  //           step1RentSelectedItem?.name?.length > 0 &&
  //           step1RentSelectedItem?.address?.length > 0 &&
  //           city?.length > 0
  //       ) {
  //         navigation.navigate('step2', {
  //           step1SelectedItem,
  //           propertyLocation,
  //           step1RentSelectedItem,
  //           PgStep1Item,
  //         });
  //       } else {
  //         common_fn.showToast('Please select all the required fields');
  //       }
  //     } else {
  //       common_fn.showToast('Please select all the required fields');
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const step1Data = navigation => {
    try {
      const isSell = step1SelectedItem?.post?.value === 'sell';
      const isRent = step1SelectedItem?.post?.value === 'rent';
      const ispg = step1SelectedItem?.post?.value === 'pg';

      const isRequiredFieldsFilled =
        step1SelectedItem?.post?.value?.length > 0 &&
        (isSell
          ? step1SelectedItem?.kind?.value?.length > 0 &&
            (step1SelectedItem?.type?.value?.length > 0 ||
              step1SelectedItem?.commercialPropType?.value?.length > 0) &&
            step1SelectedItem?.name?.length > 0 &&
            step1SelectedItem?.address?.length > 0
          : isRent
          ? step1RentSelectedItem?.kind?.value?.length > 0 &&
            (step1RentSelectedItem?.type?.value?.length > 0 ||
              step1RentSelectedItem?.commercialPropType?.value?.length > 0) &&
            step1RentSelectedItem?.name?.length > 0 &&
            step1RentSelectedItem?.address?.length > 0
          : ispg &&
            PgStep1Item?.name?.length > 0 &&
            PgStep1Item?.address?.length > 0 &&
            PgStep1Item?.postedBY?.value?.length > 0 &&
            PgStep1Item?.operational_since?.length > 0 &&
            PgStep1Item?.present_in?.value?.length > 0);

      const isLocationFilled = city?.length > 0 && landmark?.length > 0;
      if ((isRequiredFieldsFilled && isLocationFilled, isLocationFilled)) {
        navigation.navigate('step2', {
          step1SelectedItem,
          propertyLocation,
          step1RentSelectedItem,
          PgStep1Item,
        });
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast(
            isRequiredFieldsFilled
              ? 'Please fill in the location details'
              : 'Please select all the required fields',
          );
        } else {
          alert(
            isRequiredFieldsFilled
              ? 'Please fill in the location details'
              : 'Please select all the required fields',
          );
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [filterLocation, setLocation] = useState([]);

  const locationData = async () => {
    var data = 'location=' + 'city' + '&state=' + '31';
    const filterloc = await fetchData.Location(data);
    setLocation(filterloc);
  };

  const getApiData = async () => {
    try {
      var data = 'user_id=' + user_id;
      const filterloc = await fetchData.check_quota(data);
      setPost_quota_value(filterloc?.post_quota);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    locationData();
    const percentage = profileCompletion(
      user_id,
      username,
      mobile_number,
      email,
    );
    setPercentage(percentage);
    if (percentage != 100) {
      UpdateRBSheet?.current?.open();
    }
  }, [filterLocation]);

  const updateProfile = async () => {
    try {
      var data = {
        user_id: user_id,
        username: Username,
        mobile_number: mobile_number,
        email: Usermail,
      };
      if (Username != '' && Usermail != '' && mobile_number != '') {
        const updateProfile = await fetchData.save_profile(data);
        if (updateProfile?.status == true) {
          await AsyncStorage.setItem(
            'user_data',
            JSON.stringify(updateProfile?.user),
          );
          dispatch(setUserData(updateProfile?.user));
          UpdateRBSheet.current.close();
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Complete Your Profile To Submit');
        } else {
          Alert.alert('Complete Your Profile To Submit');
        }
      }
    } catch (error) {
      console.log('catch in update_Profile :', error);
    }
  };

  useEffect(() => {
    getApiData();
  }, [post_quota_value, planVisible]);

  const isPlotSelected =
    // step1SelectedItem?.type?.value === 'Plot' ||
    // step1SelectedItem?.commercialPropType?.value === 'Plot';
    (step1SelectedItem?.kind?.value === 'residential' &&
      step1SelectedItem?.type?.value === 'plot') ||
    step1SelectedItem?.kind?.value === 'commercial' ||
    step1SelectedItem?.post?.value == 'pg';
  const isRentPlotSelected =
    // step1RentSelectedItem?.type?.value === 'Plot' ||
    // step1RentSelectedItem?.commercialPropType?.value === 'Plot';
    (step1RentSelectedItem?.kind?.value === 'residential' &&
      step1RentSelectedItem?.type?.value === 'plot') ||
    step1RentSelectedItem?.kind?.value === 'commercial' ||
    step1SelectedItem?.post?.value == 'pg';

  const stepCount = isPlotSelected || isRentPlotSelected ? 3 : 4;

  const Datalabels = isPlotSelected || isRentPlotSelected ? Plotlabels : labels;

  const [planVisible, setPlanVisible] = useState(false);

  function handleBackButtonClick() {
    if (routeName.name == 'step1') {
      setPlanVisible(false);
      navigation.replace('TabNavigator');
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  // useEffect(() => {
  //   post_quota_value == 0 ? setPlanVisible(true) : setPlanVisible(false);
  // }, [planVisible]);

  useEffect(() => {
    console.log('post_quota_value', post_quota_value, post_quota_value == 0);
    setPlanVisible(post_quota_value === 0);
  }, [post_quota_value, planVisible]);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.header,
          marginVertical: Platform.OS == 'ios' ? 40 : 10,
        }}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              borderRadius: 100,
            }}>
            <Icon name="arrow-back" size={25} color={Color.black} />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontFamily: Poppins.SemiBold,
            marginVertical: 10,
            color: Color.cloudyGrey,
            marginRight: 10,
          }}>
          STEP 1 OF {stepCount}
        </Text>
      </View>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={0}
          stepCount={stepCount}
          labels={Datalabels}
        />
      </View>
      <SectionList
        sections={Section}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          switch (item) {
            case 'types':
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                      }}>
                      Property Details
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                        fontFamily: Poppins.SemiBold,
                        paddingHorizontal: 5,
                      }}>
                      (For)
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                      }}>
                      Hi{' '}
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        {username ?? 'Guest'}
                      </Text>
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        // justifyContent: 'space-between',
                      }}>
                      {postingProperty.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step1SelectedItem?.post?.id == item?.id
                                  ? '#8C193F20'
                                  : Color.white,
                              width: width / 3.5,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginHorizontal: 5,
                              borderRadius: 50,
                              padding: 5,
                              // marginVertical: 10,
                              borderColor:
                                step1SelectedItem?.post?.id == item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              setStep1SelectedItem({
                                post: item,
                                kind: {},
                                name: '',
                                address: '',
                                commercialPropType: {},
                                description: '',
                                type: {},
                                reason: '',
                                occupation: '',
                                age: {},
                              });
                              setStep1RentSelectedItem({
                                post: item,
                                kind: {},
                                name: '',
                                address: '',
                                commercialPropType: {},
                                description: '',
                                type: {},
                                reason: '',
                                occupation: '',
                                age: {},
                              });
                              dispatch(
                                setPostPropertyLocation({
                                  city: null,
                                  landmark: null,
                                }),
                              );
                              if (step1SelectedItem?.post?.value?.length == 0) {
                                var msg = 'Please select property';
                                setPostError(msg);
                                return;
                              } else {
                                setPostError(false);
                              }
                              setSelectType(item);
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color:
                                  step1SelectedItem?.post?.id == item?.id
                                    ? Color.primary
                                    : Color.black,
                                fontFamily: Poppins.Medium,
                                paddingVertical: 5,
                              }}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {postError}
                    </Text>
                  </View>
                </>
              );
            case 'type_Details':
              return (
                <PostData
                  //common
                  navigation={navigation}
                  setSelectType={setSelectType}
                  selectType={selectType?.title}
                  //sell
                  item={step1SelectedItem?.post?.title}
                  propertyKind={propertyKind}
                  step1SelectedItem={step1SelectedItem}
                  setStep1SelectedItem={setStep1SelectedItem}
                  visibleData={visibleData}
                  showLoadMore={showLoadMore}
                  loadMoreItems={loadMoreItems}
                  city={city}
                  landmark={landmark}
                  setVisible={setVisible}
                  setLocationInput={setLocationInput}
                  occupation={occupation}
                  setCurrentStatus={setCurrentStatus}
                  currentStatus={currentStatus}
                  propertyAge={propertyAge}
                  step1Data={step1Data}
                  checkTextInput={checkTextInput}
                  kindError={kindError}
                  setKindError={setKindError}
                  nameError={nameError}
                  setNameError={setNameError}
                  typeError={typeError}
                  setTypeError={setTypeError}
                  addressError={addressError}
                  setAddressError={setAddressError}
                  commercialPropertyType={commercialPropertyType}
                  //Rent
                  setStep1RentSelectedItem={setStep1RentSelectedItem}
                  step1RentSelectedItem={step1RentSelectedItem}
                  rentPostError={rentPostError}
                  setRentPostError={setRentPostError}
                  rentKindError={rentKindError}
                  setRentKindError={setRentKindError}
                  rentNameError={rentNameError}
                  setRentNameError={setRentNameError}
                  rentAddressError={rentAddressError}
                  setRentAddressError={setRentAddressError}
                  rentTypeError={rentTypeError}
                  setRentTypeError={setRentTypeError}
                  //PG
                  pgPresentData={pgPresentData}
                  listedBy={listedBy}
                  PgStep1Item={PgStep1Item}
                  setPgStep1Item={setPgStep1Item}
                />
              );
          }
        }}
      />
      {/* <PostPropertyLocationBottomModal
        visible={visible}
        setVisible={setVisible}
        data={filterLocation?.city}
      /> */}

      <RBSheet
        ref={UpdateRBSheet}
        closeOnDragDown={false}
        closeOnPressMask
        customStyles={{
          wrapper: {
            backgroundColor: Color.transparantBlack,
          },
          draggableIcon: {
            backgroundColor: Color.transparantBlack,
          },
          container: {
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: height,
          },
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation?.replace('TabNavigator');
              UpdateRBSheet.current.close();
            }}
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              backgroundColor: Color.primary,
              borderRadius: 100,
              padding: 10,
              right: 10,
              top: 0,
              zIndex: 1,
            }}>
            <MIcon name="close" size={18} color={Color.white} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Poppins.SemiBold,
              color: Color.black,
              fontSize: 16,
            }}>
            Complete Your Profile To Get Phone No
          </Text>
          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
                textAlign: 'left',
              }}>
              Username
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                marginTop: 5,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={Color.cloudyGrey}
                multiline={false}
                value={Username}
                onChangeText={text => setUsername(text)}
                returnKeyType={'next'}
                style={{
                  width: '90%',
                  color: 'black',
                  fontSize: 16,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}
              />

              <Iconviewcomponent
                Icontag={'FontAwesome5'}
                iconname={'user-edit'}
                icon_size={20}
                icon_color={'black'}
              />
            </View>
          </View>

          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
                textAlign: 'left',
              }}
              numberOfLines={1}>
              Email address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                marginTop: 5,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Enter your Email"
                placeholderTextColor={Color.cloudyGrey}
                multiline={false}
                value={Usermail}
                onChangeText={value => {
                  setUsermail(value);
                }}
                keyboardType="email-address"
                returnKeyType={'next'}
                style={{
                  width: '90%',
                  color: 'black',
                  fontSize: 16,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}
              />

              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={'email-edit'}
                icon_size={26}
                icon_color={'black'}
              />
            </View>
          </View>

          <View
            style={{
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
                textAlign: 'left',
              }}
              numberOfLines={1}>
              Phone Number
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <Text style={styles.numberCountryCode}>+91</Text>
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={Color.cloudyGrey}
                value={number}
                editable={mobile_number?.length !== 10}
                keyboardType="phone-pad"
                maxLength={10}
                returnKeyType={'done'}
                onChangeText={number => {
                  chkNumber(number);
                }}
                style={styles.numberTextBox}
              />
            </View>
          </View>
          <Button
            title={'Submit'}
            buttonStyle={{backgroundColor: Color.primary}}
            onPress={() => {
              updateProfile();
            }}
          />
        </View>
      </RBSheet>
      {post_quota_value == 0 &&
        (user_type_id == '2' ? (
          <AgentPlanPurchase
            navigation={navigation}
            planVisible={planVisible}
            setPlanVisible={setPlanVisible}
          />
        ) : (
          <PlanPurchase
            navigation={navigation}
            planVisible={planVisible}
            setPlanVisible={setPlanVisible}
          />
        ))}
    </View>
  );
};

export default PostStep1Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  NumberBoxConatiner: {
    width: '100%',
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  numberCountryCode: {
    color: Color.cloudyGrey,
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  invalidLogin: {
    width: '100%',
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    padding: 10,
    borderLeftColor: Color.cloudyGrey,
    borderLeftWidth: 1,
    color: Color.black,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  stepIndicator: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    flex: 1,
    paddingHorizontal: 10,
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
    fontFamily: Poppins.Medium,
    flexWrap: 'wrap',
  },
  ModalDataText: {
    // flex: 1,
    fontSize: 16,
    fontFamily: Poppins.SemiBold,
    color: Color.black,
    textTransform: 'capitalize',
  },
  Divider: {height: 1, marginVertical: 10},
});
