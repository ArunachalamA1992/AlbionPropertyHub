import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
import OIcon from 'react-native-vector-icons/Octicons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-elements';
import {Media} from '../../Global/Media';
import {Animated} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Poppins} from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';
import {base_image_properties} from '../../Config/base_url';
import moment from 'moment';
import {setPropertySavedFilter, setUserData} from '../../Redux';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common_fn from '../../Config/common_fn';
import {Iconviewcomponent} from '../../Components/Icontag';
import {profileCompletion} from '../../Utils/utils';
import {PlanPhonePurchase} from '../../Components/PlanPurchase';
import Share from 'react-native-share';
import axios from 'axios';
import SenderModal from '../../Components/SenderModal';
import BottomLogin from '../../Components/BottomLogin';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const CommercialScreen = ({navigation, route}) => {
  const [location] = useState(route.params.location);
  const [city_id] = useState(route.params.city_id);
  const [property_action] = useState(route.params.property_action);
  const [filterCommercialData, setFilterCommercialData] = useState(
    route.params.data,
  );
  const [resultDate, setResultDate] = useState(null);
  const [get_quota_value, setGet_quota_value] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [propertyId, setPropertyId] = useState(0);
  const [EmailContactVisible, setEmailContactVisible] = useState(false);
  const [filterBoolean, setFilterBoolean] = useState(route.params.filter);
  const [property_type] = useState(route.params.property_type);
  const [real_estate, setReal_estate] = useState(route.params.real_estate);
  const [height, setHeight] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [filterloading, setFilterLoading] = useState(false);
  const [countFilter, setCountFilter] = useState(0);
  const [AddFilter, SetAddFilter] = useState({
    buy: {},
    lease: {},
    budget: {},
    locality: '',
  });
  const [locality, setLocality] = useState([]);
  const [filterData] = useState([
    {
      id: 1,
      name: 'Buy',
      value: 'sell',
    },
    {
      id: 2,
      name: 'Lease',
      value: 'rent',
    },
    {
      id: 3,
      name: 'Budget',
      value: 'budget',
      data: [
        {id: 1, title: '1000-50000', value: '1000-50000'},
        {id: 2, title: '50000-100000', value: '50000-100000'},
        {id: 3, title: '100000-500000', value: '100000-500000'},
        {id: 4, title: '500000-1000000', value: '500000-1000000'},
        {id: 5, title: '1000000-5000000', value: '1000000-5000000'},
        {id: 6, title: '5000000-10000000', value: '5000000-10000000'},
        {id: 7, title: '10000000-50000000', value: '10000000-50000000'},
        {id: 8, title: '50000000-100000000', value: '50000000-100000000'},
        {id: 9, title: '100000000-150000000', value: '100000000-150000000'},
        {id: 10, title: '150000000-200000000', value: '150000000-200000000'},
      ],
    },
    {
      id: 4,
      name: 'Popular Locality',
      value: 'locality',
      data: [
        {id: 1, title: 'ramanathapuram', value: 'ramanathapuram'},
        {id: 2, title: 'ondiputhur', value: 'ondiputhur'},
        {id: 3, title: 'singanallur', value: 'singanallur'},
        {id: 4, title: 'gandhipuram', value: 'gandhipuram'},
        {id: 5, title: 'pallakad', value: 'pallakad'},
      ],
    },
  ]);
  const UpdateRBSheet = useRef();
  const SellerRBSheet = useRef();
  const dispatch = useDispatch();

  const onShare = async item => {
    try {
      const image_url = item?.images?.[0]?.image_url;
      const base64String = await common_fn.urlToBase64(image_url);

      const shareOptions = {
        title: 'Share via',
        message: `Check out this property: https://albionpropertyhub.com/review/${item?.p_id}`,
        url: `data:image/jpeg;base64,${base64String}`,
        type: 'image/jpeg',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error => ', error);
    }
  };
  const [endReached, setEndReached] = useState(false);
  const [commercialData, setCommercialData] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id, username, mobile_number, email} = userData;
  const [Username, setUsername] = useState(username);
  const [number, setNumber] = useState(mobile_number);
  const [Usermail, setUsermail] = useState(email);
  const [phoneQuotoVisible, setPhoneQuotoVisible] = useState(false);
  const [loginEnable, setLoginEnable] = useState(false);
  const [processingProducts, setProcessingProducts] = useState([]);

  useEffect(() => {
    if (filterBoolean == true) {
      filterDataPayload();
    }
  }, [AddFilter, filterCommercialData]);

  const filterDataPayload = () => {
    const {locality, buy, lease, budget} = AddFilter;

    const updatedData = {
      ...(locality && {locality: encodeURIComponent(locality)}),
      ...(buy?.value ||
        (lease?.value && {
          property_action: encodeURIComponent(
            AddFilter?.buy?.value || AddFilter?.lease?.value || property_action,
          ),
        })),
      ...(budget?.value && {
        max_budget: budget.value.split('-')[1],
        min_budget: budget.value.split('-')[0],
      }),
    };
    const currentData = convertToObj(filterCommercialData);
    const mergedData = {...currentData, ...updatedData};

    const queryString = convertToStr(mergedData);
    function convertToObj(queryString) {
      var obj = {};
      var params = queryString.split('&');

      for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=');
        var key = pair[0];
        var value = decodeURIComponent(pair[1]);
        obj[key] = !isNaN(value) ? parseInt(value) : value;
      }
      return obj;
    }

    function convertToStr(obj) {
      return Object.entries(obj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    }
    const finalQueryString =
      queryString + '&' + `user_id=${encodeURIComponent(user_id)}`;
    return finalQueryString;
  };

  const dataPayload = () => {
    let params = '';
    const {budget, locality} = AddFilter;
    const commercialPayload = {
      location,
      property_action:
        AddFilter?.buy?.value || AddFilter?.lease?.value || property_action,
      property_type,
      real_estate,
      max_budget: budget?.value,
      min_budget: 1000,
      locality,
    };

    for (const key in commercialPayload) {
      const value = commercialPayload[key];

      if (value !== undefined && value !== null && value !== '') {
        if (key === 'max_budget' || key === 'min_budget') {
          if (budget?.value) {
            const [min, max] = budget?.value.split('-');
            params += `max_budget=${max}&min_budget=${min}&`;
          }
        } else {
          params += `${key}=${decodeURIComponent(value)}&`;
        }
      }
    }

    params += `user_id=${decodeURIComponent(user_id)}&`;
    return params.slice(0, -1);
  };

  const getCommercialApiData = async () => {
    try {
      const data = filterBoolean ? filterDataPayload() : dataPayload();
      const filterData = await fetchData.Properties(data);
      setCommercialData(filterData);
      setLoading(false);
      setFilterLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCheck_quota = async () => {
    try {
      var data = 'user_id=' + user_id;
      const filterloc = await fetchData.check_quota(data);
      setGet_quota_value(filterloc?.get_phone_quota);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCommercialApiData().finally(() => {
      setLoading(false);
    });
  }, [AddFilter]);

  useEffect(() => {
    getCheck_quota();
  }, []);

  useEffect(() => {
    locationData();
    const percentage = profileCompletion(
      user_id,
      username,
      mobile_number,
      email,
    );
    setPercentage(percentage);
  }, [commercialData]);

  const removeParameter = (url, parameter) => {
    const regex = new RegExp(`[?&]${parameter}(=([^&#]*)|&|#|$)`, 'i');
    const updatedUrl = url.replace(regex, '');
    return updatedUrl.replace(/[?&]$/, '');
  };

  const filterCountData = async () => {
    try {
      var data = removeParameter(
        filterBoolean ? filterDataPayload() : dataPayload(),
        'user_id',
      );
      const filterCount = await fetchData.get_property_count(data);
      setCountFilter(filterCount?.count);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    filterCountData();
  }, [countFilter, getCommercialApiData]);

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      if (filterBoolean) {
        var data = filterCommercialData + '&page_number=' + nextPage;
        const filterData = await fetchData.FilterData(data);
        if (filterData.length > 0) {
          setPage(nextPage);
          const updatedData = [...commercialData, ...filterData];
          setCommercialData(updatedData);
          // await AsyncStorage.setItem('buyData', JSON.stringify(updatedData));
        } else {
          setEndReached(true);
        }
      } else {
        var data = dataPayload() + '&page_number=' + nextPage;
        const response = await fetchData.Properties(data);
        if (response.length > 0) {
          setPage(nextPage);
          const updatedData = [...commercialData, ...response];
          setCommercialData(updatedData);
          // await AsyncStorage.setItem('buyData', JSON.stringify(updatedData));
        } else {
          setEndReached(true);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Indicate that loading has finished
      setLoadMore(false);
    }
  };

  const handleWishlist = async (id, isWishList) => {
    const cancelTokenSource = axios.CancelToken.source();

    setProcessingProducts(prevProcessingProducts => [
      ...prevProcessingProducts,
      id,
    ]);

    try {
      var data = {
        p_id: id,
        user_id: user_id,
      };

      if (cancelTokenSource.token) {
        cancelTokenSource.cancel('Request canceled');
      }

      const apiRequest = isWishList
        ? fetchData.remove_to_wishlist(data, {
            cancelToken: cancelTokenSource.token,
          })
        : fetchData.add_to_wishlist(data, {
            cancelToken: cancelTokenSource.token,
          });

      const response = await apiRequest;

      if (response?.message === 'Removed From WishList' && isWishList) {
        if (Platform.OS === 'android') {
          common_fn.showToast('Wishlist Removed Successfully');
        } else {
          alert('Wishlist Removed Successfully');
        }

        setCommercialData(prevBuyData =>
          prevBuyData.map(product =>
            product.p_id === id ? {...product, isWishListed: false} : product,
          ),
        );
      } else if (response?.message === 'Success' && !isWishList) {
        if (Platform.OS === 'android') {
          common_fn.showToast('Wishlist Added Successfully');
        } else {
          alert('Wishlist Added Successfully');
        }
        setCommercialData(prevBuyData =>
          prevBuyData.map(product =>
            product.p_id === id ? {...product, isWishListed: true} : product,
          ),
        );
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.log('API request error', error);
      }
    } finally {
      setProcessingProducts(prevProcessingProducts =>
        prevProcessingProducts.filter(productId => productId !== id),
      );
    }
  };

  const locationData = async () => {
    //get State
    var data = 'location=' + 'city' + '&state=' + '31';
    const selectcity = await fetchData.Location(data);

    //filter state
    const filteredCities = selectcity.city.filter(city =>
      city.city.toLowerCase().includes(location.toLowerCase()),
    );

    const filteredCityid = filteredCities.map(city => city.city_id);

    var data = 'location=' + 'locality' + '&city=' + filteredCityid.join(',');
    const filterloc = await fetchData.Location(data);
    setLocality(filterloc?.locality);
  };

  useEffect(() => {
    if (EmailContactVisible) {
      getCommercialApiData();
      const interval = setInterval(() => {
        setEmailContactVisible(false);
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [EmailContactVisible]);

  const sellerDetailWithProfile = async id => {
    try {
      var data = {
        user_id: user_id,
        p_id: id,
      };
      setPropertyId(id);
      if (percentage == 100) {
        const sellerDetails = await fetchData.getSellerDetails(data);
        if (sellerDetails?.message == 'success') {
          SellerRBSheet.current.open();
          setEmailContactVisible(true);
        } else {
          if (Platform.OS === 'android') {
            common_fn.showToast(sellerDetails?.message);
          } else {
            alert(sellerDetails?.message);
          }
        }
      } else {
        UpdateRBSheet.current.open();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
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
          // updateProfile?.user["image"] = proimage
          await AsyncStorage.setItem(
            'user_data',
            JSON.stringify(updateProfile?.user),
          );
          dispatch(setUserData(updateProfile?.user));
          sellerDetailWithProfile(propertyId);
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
  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      {filterloading || loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: Media.loader}}
            style={{width: 80, height: 80, resizeMode: 'contain'}}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Color.primary,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderRadius: 5,
                marginHorizontal: 5,
                shadowColor: Color.black,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
              }}
              onPress={() => {
                navigation.navigate('Filter', {
                  selectItem: {id: 1, title: 'Buy', value: 'sell'},
                });
              }}>
              <F6Icon
                style={{width: 20, height: 20}}
                color={Color.white}
                name="sliders"
                size={20}
              />
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterData.map((single_item, single_index) => {
                return (
                  <View key={single_index}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          single_item?.name == 'Buy' ||
                          single_item?.name == 'Lease'
                            ? AddFilter?.buy?.id == single_item?.id ||
                              AddFilter?.lease?.id == single_item?.id
                              ? Color.primary
                              : Color.white
                            : Color.white,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5,
                        borderRadius: 50,
                        marginHorizontal: 5,
                        shadowColor: Color.black,
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        marginVertical: 5,
                        elevation: 4,
                      }}
                      onPress={() => {
                        if (
                          single_item?.name === 'Buy' ||
                          single_item?.name === 'Lease'
                        ) {
                          if (single_item?.name === 'Buy') {
                            if (AddFilter?.buy?.id === single_item?.id) {
                              SetAddFilter({
                                buy: null,
                                lease: AddFilter?.lease,
                                budget: AddFilter?.budget,
                                locality: AddFilter?.locality,
                              });
                            } else {
                              SetAddFilter({
                                buy: single_item,
                                lease: null,
                                budget: AddFilter?.budget,
                                locality: AddFilter?.locality,
                              });
                            }
                          } else if (single_item?.name === 'Lease') {
                            if (AddFilter?.lease?.id === single_item?.id) {
                              SetAddFilter({
                                buy: AddFilter?.buy,
                                lease: null,
                                budget: AddFilter?.budget,
                                locality: AddFilter?.locality,
                              });
                            } else {
                              SetAddFilter({
                                buy: null,
                                lease: single_item,
                                budget: AddFilter?.budget,
                                locality: AddFilter?.locality,
                              });
                            }
                          }
                          setFilterLoading(true);
                        } else {
                          this[RBSheet + single_index].open();
                        }
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.primary,
                          // marginHorizontal: 5,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        {single_item?.name === 'Budget'
                          ? AddFilter?.budget?.value
                          : single_item?.name === 'Popular Locality' &&
                            AddFilter?.locality}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color:
                            single_item?.name == 'Buy' ||
                            single_item?.name == 'Lease'
                              ? AddFilter?.buy?.id == single_item?.id ||
                                AddFilter?.lease?.id == single_item?.id
                                ? Color.white
                                : Color.black
                              : Color.black,
                          marginHorizontal: 10,
                          textAlign: 'center',
                          fontFamily: Poppins.Medium,
                        }}>
                        {single_item.name}
                      </Text>
                      <Icon
                        name={
                          single_item?.name == 'Budget'
                            ? 'chevron-down'
                            : single_item?.name == 'Popular Locality' &&
                              'chevron-down'
                        }
                        size={18}
                        color={Color.black}
                      />
                    </TouchableOpacity>
                    <RBSheet
                      ref={ref => {
                        this[RBSheet + single_index] = ref;
                      }}
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
                          // height: height,
                        },
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this[RBSheet + single_index].close();
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
                          top: 10,
                          zIndex: 1,
                        }}>
                        <MIcon name="close" size={18} color={Color.white} />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Color.black,
                          marginHorizontal: 10,
                          marginVertical: 10,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        {single_item.name}
                      </Text>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                          }}>
                          {single_item?.name == 'Popular Locality'
                            ? locality &&
                              Array?.isArray(locality) &&
                              locality?.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      width: '45%',
                                      backgroundColor:
                                        AddFilter?.locality == item
                                          ? Color.primary
                                          : Color.white,
                                      paddingHorizontal: 10,
                                      paddingVertical: 5,
                                      margin: 5,
                                      borderRadius: 50,
                                      borderWidth: 1,
                                      borderColor: '#d4d4d4',
                                      alignItems: 'center',
                                    }}
                                    onPress={() => {
                                      single_item?.name == 'Popular Locality' &&
                                      AddFilter?.locality == item
                                        ? SetAddFilter({
                                            buy: AddFilter?.buy,
                                            lease: AddFilter?.lease,
                                            budget: AddFilter?.budget,
                                            locality: null,
                                          })
                                        : SetAddFilter({
                                            buy: AddFilter?.buy,
                                            lease: AddFilter?.lease,
                                            budget: AddFilter?.budget,
                                            locality: item,
                                          });
                                      setFilterLoading(true);
                                      this[RBSheet + single_index].close();
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color:
                                          AddFilter?.locality == item
                                            ? Color.white
                                            : Color.black,
                                        marginHorizontal: 10,
                                        fontFamily: Poppins.SemiBold,
                                      }}>
                                      {item}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })
                            : single_item?.data?.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      width: '45%',
                                      backgroundColor:
                                        AddFilter?.budget?.value == item?.value
                                          ? Color.primary
                                          : Color.white,
                                      marginVertical: 10,
                                      borderWidth: 1,
                                      borderColor: Color.black,
                                      borderRadius: 50,
                                      marginHorizontal: 5,
                                      alignItems: 'center',
                                      padding: 5,
                                      justifyContent: 'center',
                                    }}
                                    onPress={() => {
                                      single_item?.name == 'Budget' &&
                                      item.value == AddFilter?.budget?.value
                                        ? SetAddFilter({
                                            buy: AddFilter?.buy,
                                            lease: AddFilter?.lease,
                                            budget: null,
                                            locality: AddFilter?.locality,
                                          })
                                        : SetAddFilter({
                                            buy: AddFilter?.buy,
                                            lease: AddFilter?.lease,
                                            budget: item,
                                            locality: AddFilter?.locality,
                                          });
                                      setFilterLoading(true);
                                      this[RBSheet + single_index].close();
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color:
                                          AddFilter?.budget?.value ==
                                          item?.value
                                            ? Color.white
                                            : Color.black,
                                        marginHorizontal: 10,
                                        fontFamily: Poppins.SemiBold,
                                      }}>
                                      {single_item?.name == 'Budget'
                                        ? common_fn.formatedDataforSuffix(
                                            item?.title,
                                          )
                                        : item.title}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                        </View>
                      </ScrollView>
                    </RBSheet>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: Color.almond,
              padding: 5,
              marginVertical: 5,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: Color.black,
                marginHorizontal: 10,
                fontFamily: Poppins.Medium,
              }}>
              {countFilter ?? 0} results | property for{' '}
              {AddFilter?.buy?.value ||
                AddFilter?.lease?.value ||
                property_action}{' '}
              in {location}
            </Text>
          </View>
          <FlatList
            data={commercialData}
            // contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}
            keyExtractor={(item, index) => item + index}
            onEndReached={() => {
              loadMoreData();
            }}
            contentContainerStyle={{paddingHorizontal: 5}}
            onEndReachedThreshold={3}
            renderItem={({item, index}) => {
              const twentyFourHoursAgo = moment(
                new Date() - 24 * 60 * 60 * 1000,
              ).format('YYYY-MM-DD');
              const createdAt = moment(item?.created_at).format('YYYY-MM-DD');
              const newItem = twentyFourHoursAgo > createdAt;
              let bedroomValue = '';
              if (item && item.features && Array.isArray(item.features)) {
                item.features.forEach(feature => {
                  if (feature?.title?.toLowerCase() === 'bedroom') {
                    bedroomValue = feature.value;
                  }
                });
              }

              const currentDate = moment(); // Current date and time
              const yourDate = moment(item?.created_at); // Your specified date and time

              const monthsAgo = currentDate.diff(yourDate, 'months');
              const minutesAgo = currentDate.diff(yourDate, 'minutes');

              if (monthsAgo === 0 && minutesAgo === 0) {
                setResultDate('Just now');
              } else {
                let result;

                if (Math.abs(monthsAgo) > Math.abs(minutesAgo)) {
                  result = currentDate
                    .clone()
                    .subtract(Math.abs(monthsAgo), 'months')
                    .fromNow();
                } else {
                  result = currentDate
                    .clone()
                    .subtract(Math.abs(minutesAgo), 'minutes')
                    .fromNow();
                }

                setResultDate(result);
              }
              return (
                // <TouchableOpacity
                //   key={index}
                //   style={{
                //     width: '100%',
                //     padding: 10,
                //     shadowColor: Color.black,
                //     shadowOffset: {
                //       width: 0,
                //       height: 1,
                //     },
                //     backgroundColor: Color.white,
                //     shadowOpacity: 0.22,
                //     shadowRadius: 2.22,
                //     elevation: 3,
                //     marginVertical: 5,
                //   }}
                //   onPress={() => {
                //     navigation.navigate('SingleProperty', { p_id: item?.p_id });
                //   }}>
                //   {item?.images != undefined && (
                //     <View style={{}}>
                //       <View style={{
                //         flex: 1,
                //         flexDirection: 'row',
                //         alignItems: 'flex-start',
                //         position: "absolute",
                //         zIndex: 1,
                //         top: 10
                //       }}>
                //         {!newItem ? (
                //           <View
                //             style={{
                //               alignItems: 'flex-start',
                //             }}>
                //             <Text
                //               style={{
                //                 fontSize: 10,
                //                 padding: 5,
                //                 paddingHorizontal: 10,
                //                 marginStart: 5,
                //                 borderRadius: 5,
                //                 color: 'white',
                //                 fontStyle: 'normal',
                //                 fontFamily: Poppins.SemiBold,
                //                 backgroundColor: Color.green,
                //               }}>
                //               New
                //             </Text>
                //           </View>
                //         ) : (
                //           <View style={{}} />
                //         )}
                //         {item?.exclusive != 0 &&
                //           <View
                //             style={{
                //               alignItems: 'flex-start',
                //             }}>
                //             <Text
                //               style={{
                //                 fontSize: 10,
                //                 padding: 5,
                //                 paddingHorizontal: 10,
                //                 marginStart: 5,
                //                 borderRadius: 5,
                //                 color: 'white',
                //                 fontStyle: 'normal',
                //                 fontFamily: Poppins.SemiBold,
                //                 backgroundColor: Color.primary,
                //               }}>
                //               Exclusive
                //             </Text>
                //           </View>
                //         }
                //       </View>
                //       {item?.images?.length > 0 ? (
                //         <Image
                //           source={{
                //             uri: item?.images[0]?.image_url,
                //           }}
                //           style={{
                //             width: '100%',
                //             height: 200,
                //             borderRadius: 10,
                //             resizeMode: 'cover',
                //           }}
                //         />
                //       ) : (
                //         <Image
                //           source={{ uri: Media.noImage }}
                //           style={{
                //             width: 150,
                //             height: 150,
                //             resizeMode: 'contain',
                //             justifyContent: 'center',
                //             borderTopLeftRadius: 5,
                //             borderTopRightRadius: 5,
                //           }}
                //         />
                //       )}
                //       <View
                //         style={{
                //           flexDirection: 'row',
                //           justifyContent: 'flex-end',
                //           alignItems: 'center',
                //           paddingEnd: 2,
                //           height: 30,
                //           position: 'absolute',
                //           top: 10,
                //           left: 10,
                //           right: 0,
                //         }}>
                //         <TouchableOpacity
                //           style={{
                //             width: 40,
                //             height: 40,
                //             backgroundColor: Color.white,
                //             alignItems: 'center',
                //             justifyContent: 'center',
                //             borderRadius: 100,
                //             padding: 10,
                //             marginRight: 10,
                //           }}
                //           onPress={() => {
                //             handleWishlist(item.p_id, item?.isWishListed);
                //           }}>
                //           {processingProducts.includes(item.p_id) ? (
                //             <ActivityIndicator
                //               size="small"
                //               color={Color.primary}
                //             />
                //           ) : (
                //             <Icon
                //               name={
                //                 item?.isWishListed ? 'heart' : 'heart-outline'
                //               }
                //               size={18}
                //               color={
                //                 item?.isWishListed ? Color.primary : Color.grey
                //               }
                //             />
                //           )}
                //         </TouchableOpacity>
                //         {/* <TouchableOpacity
                //           style={{
                //             width: 40,
                //             height: 40,
                //             backgroundColor: Color.white,
                //             alignItems: 'center',
                //             justifyContent: 'center',
                //             borderRadius: 100,
                //             padding: 10,
                //             marginRight: 10,
                //           }}
                //           onPress={() => {
                //             onShare();
                //           }}>
                //           <Icon
                //             name="arrow-redo-outline"
                //             size={20}
                //             color={Color.cloudyGrey}
                //           />
                //         </TouchableOpacity> */}
                //       </View>
                //     </View>
                //   )}
                //   <View
                //     style={{
                //       padding: 10,
                //       alignItems: 'center',
                //     }}>
                //     <View
                //       style={{
                //         backgroundColor: Color.white,
                //         width: '100%',
                //         padding: 10,
                //         borderRadius: 10,
                //         marginTop: -80,
                //       }}>
                //       <View
                //         style={{
                //           flexDirection: 'row',
                //           alignItems: 'center',
                //           marginVertical: 5,
                //         }}>
                //         {/* <View
                //           style={{flexDirection: 'row', alignItems: 'center'}}>
                //           <Text
                //             style={{
                //               fontSize: 12,
                //               color: Color.green,
                //               fontFamily: Poppins.SemiBold,
                //               backgroundColor: '#BAE1BE60',
                //               padding: 5,
                //               // marginHorizontal: 10,
                //               borderRadius: 5,
                //             }}>
                //             {'RERA Approved'}
                //           </Text>
                //           <Text
                //             style={{
                //               fontSize: 12,
                //               color: Color.sunShade,
                //               fontFamily: Poppins.SemiBold,
                //               backgroundColor: '#FFEED660',
                //               padding: 5,
                //               marginHorizontal: 5,
                //               borderRadius: 5,
                //             }}>
                //             {'No Brokerage'}
                //           </Text>
                //         </View> */}
                //         <View style={{ flex: 1 }} />
                //         <Text
                //           style={{
                //             flex: 1,
                //             textAlign: 'right',
                //             fontSize: 12,
                //             color: Color.green,
                //             fontFamily: Poppins.SemiBold,
                //             marginHorizontal: 10,
                //           }}>
                //           PRICE
                //         </Text>
                //       </View>
                //       <View
                //         style={{
                //           flexDirection: 'row',
                //           alignItems: 'center',
                //         }}>
                //         {item?.property_name == null ? (
                //           <Text
                //             style={{
                //               flex: 1,
                //               fontSize: 16,
                //               color: Color.black,
                //               fontFamily: Poppins.SemiBold,
                //               textTransform: 'capitalize',
                //             }}
                //             numberOfLines={1}>
                //             {bedroomValue?.length != 0
                //               ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                //               : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                //           </Text>
                //         ) : (
                //           <Text
                //             style={{
                //               flex: 1,
                //               fontSize: 16,
                //               color: Color.black,
                //               fontFamily: Poppins.SemiBold,
                //               textTransform: 'capitalize',
                //             }}>
                //             {item?.property_name}
                //           </Text>
                //         )}
                //         <Text
                //           style={{
                //             fontSize: 16,
                //             // marginVertical: 5,
                //             color: Color.black,
                //             fontFamily: Poppins.SemiBold,
                //             marginHorizontal: 5,
                //           }}>
                //           ₹
                //           {item?.expected_price?.length >= 5
                //             ? common_fn.formatNumberWithSuffix(
                //               item?.expected_price,
                //             )
                //             : item?.expected_price}
                //         </Text>
                //       </View>
                //       <View
                //         style={{
                //           flexDirection: 'row',
                //           alignItems: 'center',
                //         }}>
                //         <Text
                //           style={{
                //             flex: 1,
                //             fontSize: 12,
                //             color: Color.grey,
                //             fontFamily: Poppins.SemiBold,
                //             textTransform: 'capitalize',
                //           }}>
                //           by{' '}
                //           {item?.seller_details?.user_type_id == '1'
                //             ? 'Buyer'
                //             : item?.seller_details?.user_type_id == '2'
                //               ? 'Agent'
                //               : 'Builder'}{' '}
                //           | {resultDate}
                //         </Text>
                //         <Text
                //           style={{
                //             fontSize: 12,
                //             // marginVertical: 5,
                //             color: Color.grey,
                //             fontFamily: Poppins.SemiBold,
                //             marginHorizontal: 5,
                //           }}>
                //           {`₹ ${common_fn.formatNumberWithSuffix(
                //             item?.expected_price / item?.area?.super_area,
                //           )} Per ${item?.area?.super_area_unit}`}
                //         </Text>
                //       </View>
                //       <View
                //         style={{
                //           flexDirection: 'row',
                //           alignItems: 'center',
                //         }}>
                //         {item?.area?.super_area && (
                //           <View
                //             style={{
                //               flex: 1,
                //               flexDirection: 'row',
                //               padding: 5,
                //               justifyContent: 'flex-start',
                //               alignItems: 'center',
                //             }}>
                //             <F6Icon
                //               name={'object-ungroup'}
                //               size={20}
                //               style={{ color: Color.grey }}
                //             />
                //             <Text
                //               style={{
                //                 flex: 1,
                //                 fontSize: 12,
                //                 color: Color.grey,
                //                 fontFamily: Poppins.SemiBold,
                //                 textTransform: 'capitalize',
                //                 marginHorizontal: 5
                //               }}>
                //               {`${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                //             </Text>
                //           </View>
                //         )}
                //         <View
                //           style={{
                //             flexDirection: 'row',
                //             alignItems: 'center',
                //             justifyContent: 'space-evenly',
                //             // marginVertical: 5,
                //           }}>
                //           <Button
                //             title={''}
                //             titleStyle={{
                //               color: Color.white,
                //               marginHorizontal: 5,
                //               fontSize: 14,
                //             }}
                //             icon={() => (
                //               <Icon
                //                 name="call"
                //                 size={20}
                //                 color={
                //                   item?.isContacted
                //                     ? Color.green
                //                     : Color.primary
                //                 }
                //               />
                //             )}
                //             onPress={() => {
                //               if (get_quota_value != 0) {
                //                 if (item?.isContacted) {
                //                   common_fn.showToast(
                //                     'Phone number already sent for this property',
                //                   );
                //                 } else {
                //                   sellerDetailWithProfile(item?.p_id);
                //                 }
                //               } else {
                //                 // navigation.navigate('UpgradeTab');
                //                 setPhoneQuotoVisible(true);
                //               }
                //             }}
                //             buttonStyle={{
                //               backgroundColor: Color.white,
                //               borderWidth: 1,
                //               borderColor: item?.isContacted
                //                 ? Color.green
                //                 : Color.primary,
                //               borderRadius: 5,
                //               marginHorizontal: 5,
                //             }}
                //           />
                //           <Button
                //             title={''}
                //             titleStyle={{
                //               color: Color.white,
                //               marginHorizontal: 5,
                //               fontSize: 14,
                //             }}
                //             icon={() => (
                //               <Icon
                //                 name="arrow-redo-outline"
                //                 size={20}
                //                 color={Color.white}
                //               />
                //             )}
                //             buttonStyle={{
                //               backgroundColor: Color.primary,
                //               borderRadius: 5,
                //               marginHorizontal: 5,
                //             }}
                //             onPress={() => {
                //               onShare(item);
                //             }}
                //           />
                //         </View>
                //       </View>
                //     </View>
                //   </View>
                // </TouchableOpacity>
                <View
                  key={index}
                  style={{
                    width: '100%',
                    padding: 10,
                    shadowColor: Color.black,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    backgroundColor: Color.white,
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    marginVertical: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingEnd: 2,
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      zIndex: 1,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: Color.lightgrey,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                      }}
                      onPress={() => {
                        if (
                          user_id == undefined ||
                          (userData?.length > 0 && userData == undefined)
                        ) {
                          setLoginEnable(true);
                        } else {
                          handleWishlist(item?.p_id, item?.isWishListed);
                        }
                      }}>
                      {processingProducts.includes(item?.p_id) ? (
                        <ActivityIndicator size="small" color={Color.primary} />
                      ) : (
                        <Icon
                          name={item?.isWishListed ? 'heart' : 'heart-outline'}
                          size={18}
                          color={
                            item?.isWishListed ? Color.primary : Color.grey
                          }
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {item?.images != undefined && (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('SingleProperty', {
                            p_id: item?.p_id,
                          });
                        }}
                        style={{}}>
                        {item?.images?.length > 0 ? (
                          <Image
                            source={{
                              uri: item?.images[0]?.image_url,
                            }}
                            style={{
                              width: 150,
                              height: 150,
                              borderRadius: 10,
                              resizeMode: 'cover',
                            }}
                          />
                        ) : (
                          <Image
                            source={{uri: Media.noImage}}
                            style={{
                              width: 150,
                              height: 150,
                              resizeMode: 'contain',
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                            }}
                          />
                        )}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            position: 'absolute',
                            top: 10,
                          }}>
                          {!newItem ? (
                            <View
                              style={{
                                alignItems: 'flex-start',
                              }}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  padding: 5,
                                  paddingHorizontal: 10,
                                  marginStart: 5,
                                  borderRadius: 5,
                                  paddingTop: 7,
                                  color: 'white',
                                  fontStyle: 'normal',
                                  fontFamily: Poppins.SemiBold,
                                  backgroundColor: Color.green,
                                }}>
                                New
                              </Text>
                            </View>
                          ) : (
                            <View style={{}} />
                          )}
                          {item?.exclusive != 0 && (
                            <View
                              style={{
                                alignItems: 'flex-start',
                              }}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  padding: 5,
                                  paddingHorizontal: 10,
                                  paddingTop: 7,
                                  marginStart: 5,
                                  borderRadius: 5,
                                  color: 'white',
                                  fontStyle: 'normal',
                                  fontFamily: Poppins.SemiBold,
                                  backgroundColor: Color.primary,
                                }}>
                                Exclusive
                              </Text>
                            </View>
                          )}
                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            backgroundColor: Color.transparantBlack,
                            width: '100%',
                            bottom: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                          }}>
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 12,
                              fontWeight: 'bold',
                              color: Color.white,
                              marginVertical: 10,
                              marginHorizontal: 5,
                            }}>
                            {moment(item?.created_at, 'YYYY-MM-DD hh:mm A').format('MMMM DD, YYYY')}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              textAlign: 'right',
                              fontWeight: 'bold',
                              color: Color.white,
                              marginVertical: 10,
                              marginHorizontal: 10,
                            }}>
                            +{item?.images?.length}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    <View style={{padding: 5, flex: 1, marginHorizontal: 5}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignItems: 'center',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: Poppins.SemiBold,
                              color: Color.green,
                              marginVertical: Platform.OS == 'ios' ? 5 : 0,
                            }}>
                            PRICE
                          </Text>
                          <Text
                            style={{
                              fontSize: 18,
                              color: Color.black,
                              fontFamily: Poppins.SemiBold,
                              marginVertical: Platform.OS == 'ios' ? 5 : 0,
                            }}>
                            ₹
                            {item?.expected_price?.length >= 5
                              ? common_fn.formatNumberWithSuffix(
                                  item?.expected_price,
                                )
                              : item?.expected_price}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Poppins.SemiBold,
                          marginVertical: Platform.OS == 'ios' ? 5 : 0,
                          textTransform: 'capitalize',
                        }}
                        numberOfLines={1}>
                        {item?.property_name}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#333',
                            fontFamily: Poppins.Medium,
                            marginVertical: Platform.OS == 'ios' ? 5 : 0,
                          }}
                          numberOfLines={2}>
                          {item?.address}
                        </Text>
                      </View>
                      {parseInt(item?.area?.super_area) != 0 && (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            padding: 5,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                          <F6Icon
                            name={'object-ungroup'}
                            size={20}
                            style={{color: Color.grey}}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.grey,
                              fontFamily: Poppins.SemiBold,
                            }}>
                            {` ${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      marginVertical: 5,
                    }}>
                    <Button
                      title={
                        item?.isContacted ? 'Phone No Sent' : 'Get Phone No'
                      }
                      titleStyle={{
                        color: item?.isContacted ? Color.green : Color.primary,
                        marginHorizontal: 5,
                        fontFamily: Poppins.Medium,
                        paddingTop: 5,
                        fontSize: 14,
                      }}
                      buttonStyle={{
                        borderWidth: 1,
                        borderColor: item?.isContacted
                          ? Color.green
                          : Color.primary,
                        backgroundColor: Color.white,
                        borderRadius: 5,
                        marginHorizontal: 5,
                        // height: 40,
                      }}
                      icon={() => (
                        <Icon
                          name="call"
                          size={18}
                          color={
                            item?.isContacted ? Color.green : Color.primary
                          }
                        />
                      )}
                      onPress={() => {
                        if (get_quota_value != 0) {
                          if (item?.isContacted) {
                            // common_fn.showToast(
                            //   'Phone number already sent for this property',
                            // );
                            SellerRBSheet.current.open();
                          } else {
                            sellerDetailWithProfile(item?.p_id);
                          }
                        } else {
                          if (get_quota_value != 0) {
                            if (item?.isContacted) {
                              // common_fn.showToast(
                              //   'Phone number already sent for this property',
                              // );
                              SellerRBSheet.current.open();
                            } else {
                              sellerDetailWithProfile(item?.p_id);
                              SellerRBSheet.current.open();
                            }
                          } else {
                            // navigation.navigate('UpgradeTab');
                            setPhoneQuotoVisible(true);
                          }
                        }
                      }}
                      containerStyle={{width: '45%'}}
                    />
                    <Button
                      // title={item?.plan == 3 ? 'Unlock with Prime' : 'Call Agent'}
                      title={'View Details'}
                      titleStyle={{
                        color: Color.white,
                        marginHorizontal: 5,
                        fontFamily: Poppins.Medium,
                        fontSize: 14,
                        paddingTop: 5,
                      }}
                      // icon={() =>
                      //   item?.prime ? (
                      //     <F5Icon name="user-lock" size={18} color={Color.white} />
                      //   ) : (
                      //     <Icon name="call" size={18} color={Color.white} />
                      //   )
                      // }
                      buttonStyle={{
                        backgroundColor: Color.primary,
                        borderRadius: 5,
                        marginHorizontal: 5,
                        // height: 40,
                      }}
                      onPress={() => {
                        navigation.navigate('SingleProperty', {
                          p_id: item?.p_id,
                        });
                      }}
                      containerStyle={{width: '45%'}}
                    />
                    <Button
                      title={''}
                      titleStyle={{
                        color: Color.white,
                        marginHorizontal: 5,
                        fontSize: 14,
                      }}
                      icon={() => (
                        <Icon
                          name="arrow-redo-outline"
                          size={25}
                          color={Color.white}
                        />
                      )}
                      buttonStyle={{
                        backgroundColor: Color.primary,
                        borderRadius: 5,
                        marginHorizontal: 5,
                      }}
                      onPress={() => {
                        onShare(val);
                      }}
                      // containerStyle={{width: '10%'}}
                    />
                  </View>
                  <SenderModal
                    SellerRBSheet={SellerRBSheet}
                    item={item?.seller_details}
                    EmailContactVisible={EmailContactVisible}
                  />
                </View>
              );
            }}
            ListFooterComponent={() => {
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  {loadMore && countFilter > 10 && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.black,
                          marginHorizontal: 10,
                          fontFamily: Poppins.Medium,
                        }}>
                        Loading...
                      </Text>
                      <ActivityIndicator />
                    </View>
                  )}
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    height: HEIGHT / 2,
                  }}>
                  <MCIcon
                    name="clipboard-text-search-outline"
                    size={40}
                    color={Color.primary}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      padding: 5,
                      paddingHorizontal: 20,
                      marginStart: 5,
                      borderRadius: 5,
                      color: Color.primary,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    No Properties Found
                  </Text>
                </View>
              );
            }}
          />

          {EmailContactVisible && (
            <View
              style={{
                position: 'relative',
                bottom: 0,
                right: 0,
                left: 0,
                padding: 15,
                backgroundColor: '#239D0F',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <Icon
                name="checkmark-circle-sharp"
                size={22}
                color={Color.white}
              />
              <Text
                style={{
                  fontFamily: Poppins.SemiBold,
                  fontSize: 14,
                  color: Color.white,
                  marginHorizontal: 5,
                }}>
                Your request is being shared , you still have {get_quota_value}{' '}
                to contact
              </Text>
            </View>
          )}
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
                    value={mobile_number}
                    keyboardType="phone-pad"
                    maxLength={10}
                    returnKeyType={'done'}
                    // onChangeText={number => {
                    //   chkNumber(number);
                    // }}
                    editable={false}
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
          <PlanPhonePurchase
            setPhoneQuotoVisible={setPhoneQuotoVisible}
            phoneQuotoVisible={phoneQuotoVisible}
          />
        </>
      )}
      {loginEnable == true && (
        <BottomLogin login={loginEnable} setLogin={setLoginEnable} />
      )}
    </View>
  );
};

export default CommercialScreen;

const styles = StyleSheet.create({
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
    // fontFamily: 'Poppins-SemiBold',
  },
});
