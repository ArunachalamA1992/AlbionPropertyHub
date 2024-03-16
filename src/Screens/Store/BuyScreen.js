import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Pressable,
  TextInput,
  Keyboard,
  StyleSheet,
  Platform,
} from 'react-native';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
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
import {profileCompletion} from '../../Utils/utils';
import {Iconviewcomponent} from '../../Components/Icontag';
import {PlanPhonePurchase} from '../../Components/PlanPurchase';
import Share from 'react-native-share';
import axios from 'axios';
import SenderModal from '../../Components/SenderModal';
import BottomLogin from '../../Components/BottomLogin';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const BuyScreen = ({route, navigation}) => {
  const [location] = useState(route.params.location);
  const [city_id] = useState(route.params.city_id);
  const [property_action] = useState(route.params.property_action);
  const [filterBuyData, setFilterBuyData] = useState(route.params.data);
  const [filterBoolean, setFilterBoolean] = useState(route.params.filter);
  const [property_type] = useState(route.params.property_type);
  const [real_estate, setReal_estate] = useState(route.params.real_estate);
  const Buy_properties = useSelector(
    state => state.PropertyReducer.filterSaved,
  );
  const [endReached, setEndReached] = useState(false);
  const [buyData, setBuyData] = useState([]);
  const [height, setHeight] = useState(undefined);
  const [countFilter, setCountFilter] = useState(0);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [callAgent, setCallAgent] = useState(false);
  const [rentalFilter] = useState([]);
  const [final, setFinal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterloading, setFilterLoading] = useState(false);
  const [visible, setVisible] = useState();
  const [budget, setBudget] = useState();
  const [loginEnable, setLoginEnable] = useState(false);
  const [bhk, setBhk] = useState();
  const [locality, setLocality] = useState([]);
  const [clickedButtonId, setClickedButtonId] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [propertyId, setPropertyId] = useState(0);
  const BounceAnim = useRef(new Animated.Value(0)).current;
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id, username, mobile_number, email, get_phone_quota} = userData;
  const [phoneQuotoVisible, setPhoneQuotoVisible] = useState(false);
  const [get_quota_value, setGet_quota_value] = useState('');
  const [processingProducts, setProcessingProducts] = useState([]);

  const [AddFilter, SetAddFilter] = useState({
    budget: {},
    bhk: {},
    locality: '',
  });
  const [Username, setUsername] = useState(username);
  const [number, setNumber] = useState(mobile_number);
  const [Usermail, setUsermail] = useState(email);

  const dispatch = useDispatch();
  const UpdateRBSheet = useRef();
  const SellerRBSheet = useRef();
  const NumberRBSheet = useRef();

  const [AlbionPrime] = useState([
    {
      id: 1,
      image:
        'https://t4.ftcdn.net/jpg/02/81/89/73/360_F_281897358_3rj9ZBSZHo5s0L1ug7uuIHadSxh9Cc75.jpg',
      title: 'Budget Home',
      subtitle: 'within ₹30,000',
    },
    {
      id: 2,
      image:
        'https://t4.ftcdn.net/jpg/02/81/89/73/360_F_281897358_3rj9ZBSZHo5s0L1ug7uuIHadSxh9Cc75.jpg',
      title: 'Recently listed',
      subtitle: 'within ₹30,000',
    },
    {
      id: 3,
      image:
        'https://t4.ftcdn.net/jpg/02/81/89/73/360_F_281897358_3rj9ZBSZHo5s0L1ug7uuIHadSxh9Cc75.jpg',
      title: 'Flats in Top-rfated',
      subtitle: 'Projects',
    },
  ]);

  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };

  const [Banner] = useState([
    {
      id: 1,
      image: Media.adBanner2,
      navigate: 'PackersMovers',
    },
    {
      id: 2,
      image: Media.adBanner2,
      navigate: 'PackersMovers',
    },
  ]);

  const modifyData = data => {
    const numColumns = 1;
    const addBannerIndex = 6;
    const arr = [];
    var tmp = [];
    data.forEach((val, index) => {
      if (index % numColumns == 0 && index != 0) {
        arr.push(tmp);
        tmp = [];
      }
      if (index % addBannerIndex == 0 && index != 0) {
        arr.push([{type: 'banner'}]);
        tmp = [];
      }
      tmp.push(val);
    });
    arr.push(tmp);
    return arr;
  };

  const BannerFunction = () => {
    let solution = [];
    let j = 0;
    let k = 0;
    for (let i = 0; i < buyData.length; i++) {
      // if ((solution.length + 1) % 7 == 0) {
      //   solution.push([{id: j, type: 'banner', data: Banner[j]}]);
      //   j++;
      // }
      if ((i + 1) % 7 === 0) {
        solution.push(buyData[i]);
        solution.push([{id: j, type: 'banner', data: Banner[j]}]);
        j = (j + 1) % Banner.length;
      }
      // else if (solution.length + 1 == 3) {
      //   solution.push([{id: k, type: 'Albion Prime', data: AlbionPrime[k]}]);
      //   solution.push(buyData[i]);
      //   k++;
      // }
      else {
        solution.push(buyData[i]);
      }
    }
    setFinal(solution);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(BounceAnim, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(BounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

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
    BannerFunction();
    locationData();
    const percentage = profileCompletion(
      user_id,
      username,
      mobile_number,
      email,
    );
    setPercentage(percentage);
  }, [buyData]);

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
            Alert.alert(sellerDetails?.message);
          }
        }
      } else {
        UpdateRBSheet.current.open();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [filterData] = useState([
    {
      id: 1,
      name: 'Budget',
      data: [
        {id: 1, title: 'Under 50 Lac', value: '0-5000000'},
        {id: 2, title: '5000000-10000000', value: '5000000-10000000'},
        {id: 3, title: '10000000-15000000', value: '10000000-15000000'},
        {id: 4, title: 'Above 1.5 Cr', value: '15000000-200000000'},
      ],
    },
    {
      id: 2,
      name: 'BHK',
      data: [
        {id: 1, title: '1 BHK', value: '1'},
        {id: 2, title: '2 BHK', value: '2'},
        {id: 3, title: '3 BHK', value: '3'},
        {id: 4, title: '4 BHK', value: '4'},
        {id: 5, title: '5 BHK', value: '5'},
      ],
    },
    {
      id: 3,
      name: 'Popular Locality',
    },
  ]);
  const [EmailContactVisible, setEmailContactVisible] = useState(false);

  useEffect(() => {
    if (filterBoolean == true) {
      filterDataPayload();
    }
  }, [AddFilter, filterBuyData]);

  const filterDataPayload = () => {
    const {locality, bhk, budget} = AddFilter;

    const updatedData = {
      ...(locality && {locality: encodeURIComponent(locality)}),
      ...(bhk?.value && {bedroom: encodeURIComponent(bhk?.value)}),
      ...(budget?.value && {
        max_budget: budget.value.split('-')[1],
        min_budget: budget.value.split('-')[0],
      }),
    };
    const currentData = convertToObj(filterBuyData);
    const mergedData = {...currentData, ...updatedData};

    const queryString = convertToStr(mergedData);
    function convertToObj(queryString) {
      var obj = {};
      var params = queryString?.split('&');

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
    const {budget, bhk, locality} = AddFilter;

    const buyPayload = {
      location,
      property_action,
      property_type,
      real_estate,
      max_budget: budget?.value,
      min_budget: 1000,
      bedroom: bhk?.value,
      locality,
    };

    for (const key in buyPayload) {
      const value = buyPayload[key];

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

  const getBuyApiData = async () => {
    try {
      const data = filterBoolean ? filterDataPayload() : dataPayload();
      const locationFilter = await fetchData.Properties(data);
      setBuyData(locationFilter);
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
    getBuyApiData().finally(() => {
      setLoading(false);
    });
  }, [AddFilter]);

  useEffect(() => {
    getCheck_quota();
    // setLoading(true);
    // const interval = setTimeout(async () => {
    //   setLoading(false);
    // }, 2000);
    // return () => clearInterval(interval);
  }, []);

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
        setBuyData(prevBuyData =>
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
        setBuyData(prevBuyData =>
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

  const renderItem = (val, index) => {
    if (val[0]?.type == 'banner') {
      if (val[0]?.id == 0) {
        return (
          <View
            key={index}
            style={{
              width: WIDTH - 20,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              // height: 60,
              backgroundColor: Color.white,
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
              shadowColor: Color.black,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
            <Text
              style={{
                color: Color.black,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Get a Rent Agreement absolutely FREE
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <FIcon name="check" size={18} color={Color.green} />
                  <Text
                    style={{
                      color: Color.black,
                      fontSize: 14,
                      marginHorizontal: 10,
                    }}>
                    Well drafted Legal Document
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <FIcon name="check" size={18} color={Color.green} />
                  <Text
                    style={{
                      color: Color.black,
                      fontSize: 14,
                      marginHorizontal: 10,
                    }}>
                    Useful for Tax Exemption
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <FIcon name="check" size={18} color={Color.green} />
                  <Text
                    style={{
                      color: Color.black,
                      fontSize: 14,
                      marginHorizontal: 10,
                    }}>
                    Instant Download Available
                  </Text>
                </View>
              </View>
              <Image
                source={{uri: Media.adBanner}}
                style={{width: 100, height: 100, resizeMode: 'contain'}}
              />
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('PackersMovers');
              }}>
              <Text
                style={{
                  color: Color.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginHorizontal: 10,
                }}>
                Get Free Agreement
              </Text>

              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: BounceAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, -60],
                      }),
                    },
                  ],
                }}>
                <FIcon name={'arrow-right'} size={24} color={Color.primary} />
              </Animated.View>
            </TouchableOpacity>
          </View>
        );
      } else if (val[0]?.id == 1) {
        return (
          <View
            key={index}
            style={{
              width: WIDTH - 20,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              // height: 60,
              backgroundColor: Color.white,
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
              shadowColor: Color.black,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
            <Text
              style={{
                color: Color.black,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Relocating Made Simple
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: Color.black,
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Get{' '}
                  <Text
                    style={{
                      color: Color.primary,
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    end-to-end assistance
                  </Text>{' '}
                  from our Shifting Expert
                </Text>
              </View>
              <Image
                source={{uri: Media.adBanner2}}
                style={{width: 100, height: 100, resizeMode: 'contain'}}
              />
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('PackersMovers');
              }}>
              <Text
                style={{
                  color: Color.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginHorizontal: 10,
                }}>
                Book Packers & Movers
              </Text>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: BounceAnim.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, -60],
                      }),
                    },
                  ],
                }}>
                <FIcon name={'arrow-right'} size={24} color={Color.primary} />
              </Animated.View>
            </TouchableOpacity>
          </View>
        );
      }
    }
    if (val[0]?.type == 'Albion Prime') {
      var text =
        'Exclusive properties Directly by Owners Save MONEY with ALBION Prime';
      var colorText = text.split(' ').map((word, i) => (
        <Text key={i}>
          <Text
            style={{
              color:
                (word == 'with' && Color.cloudyGrey) ||
                (word == 'Prime' && Color.sunShade) ||
                (word == 'Save' && Color.cloudyGrey),
            }}>
            {word}{' '}
          </Text>
        </Text>
      ));
      return (
        <View
          key={index}
          style={{
            width: WIDTH - 20,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            backgroundColor: Color.white,
            padding: 10,
            borderRadius: 10,
            marginVertical: 10,
            shadowColor: Color.black,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              fontWeight: '700',
              color: Color.black,
            }}>
            {colorText}
          </Text>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {AlbionPrime.map((item, aindex) => {
                return (
                  <View
                    key={aindex}
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 10,
                    }}>
                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={{
                        width: 150,
                        height: 100,
                        resizeMode: 'contain',
                        borderRadius: 10,
                        opacity: 0.5,
                        backgroundColor: Color.black,
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: Color.primary,
                          width: 30,
                          height: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 100,
                        }}>
                        <FIcon name="lock" size={15} color={Color.white} />
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 14,
                            fontWeight: '700',
                            color: Color.white,
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 14,
                            fontWeight: '700',
                            color: Color.darkGrey,
                          }}>
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      );
    }

    const twentyFourHoursAgo = moment(new Date() - 24 * 60 * 60 * 1000).format(
      'YYYY-MM-DD',
    );

    const createdAt = moment(val?.created_at).format('YYYY-MM-DD');
    const newItem = twentyFourHoursAgo > createdAt;
    let bedroomValue = '';
    if (val && val.features && Array.isArray(val.features)) {
      val.features.forEach(feature => {
        if (feature?.title?.toLowerCase() === 'bedroom') {
          bedroomValue = feature.value;
        }
      });
    }
    return (
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
                handleWishlist(val.p_id, val?.isWishListed);
              }
            }}>
            {processingProducts.includes(val.p_id) ? (
              <ActivityIndicator size="small" color={Color.primary} />
            ) : (
              <Icon
                name={val?.isWishListed ? 'heart' : 'heart-outline'}
                size={18}
                color={val?.isWishListed ? Color.primary : Color.grey}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {val?.images != undefined && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SingleProperty', {p_id: val?.p_id});
              }}
              style={{}}>
              {val?.images?.length > 0 ? (
                <Image
                  source={{
                    uri: val?.images[0]?.image_url,
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
                {val?.exclusive != 0 && (
                  <View
                    style={{
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        padding: 5,
                        paddingTop: 7,
                        paddingHorizontal: 10,
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
                  {moment(val?.created_at, 'YYYY-MM-DD hh:mm A').format('MMMM DD, YYYY')}
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
                  +{val?.images?.length}
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
                  {val?.expected_price?.length >= 5
                    ? common_fn.formatNumberWithSuffix(val?.expected_price)
                    : val?.expected_price}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {parseInt(val?.area?.super_area) != 0 && (
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.SemiBold,
                        color: Color.lightBlack,
                        marginVertical: Platform.OS == 'ios' ? 5 : 0,
                      }}>
                      {val?.area?.super_area} {val?.area?.super_area_unit}
                    </Text>
                  )}
                  {bedroomValue?.length != 0 && (
                    <>
                      <View
                        style={{
                          height: '65%',
                          width: 1.5,
                          marginTop: '2%',
                          marginHorizontal: 5,
                          marginVertical: Platform.OS == 'ios' ? 5 : 0,
                          backgroundColor: Color.cloudyGrey,
                        }}
                      />
                      {val?.features != undefined && (
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: Poppins.SemiBold,
                            color: Color.lightBlack,
                            marginVertical: Platform.OS == 'ios' ? 5 : 0,
                          }}>
                          {`${bedroomValue} BHK`}
                        </Text>
                      )}
                    </>
                  )}
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
                textTransform: 'capitalize',
              }}
              numberOfLines={1}>
              {val?.property_name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Poppins.Medium,
                color: Color.cloudyGrey,
                marginVertical: Platform.OS == 'ios' ? 5 : 0,
              }}
              numberOfLines={2}>
              {val?.address}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Poppins.Medium,
                color: Color.primary,
              }}>
              {common_fn.formatText(val?.availability)}
            </Text>
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
            title={val?.isContacted ? 'Phone No Sent' : 'Get Phone No'}
            titleStyle={{
              color: val?.isContacted ? Color.green : Color.primary,
              marginHorizontal: 5,
              fontFamily: Poppins.Medium,
              fontSize: 14,
              paddingTop: 5,
            }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: val?.isContacted ? Color.green : Color.primary,
              backgroundColor: Color.white,
              borderRadius: 5,
              marginHorizontal: 5,
              // height: 40,
            }}
            icon={() => (
              <Icon
                name="call"
                size={18}
                color={val?.isContacted ? Color.green : Color.primary}
              />
            )}
            onPress={() => {
              if (get_quota_value != 0) {
                if (val?.isContacted) {
                  // common_fn.showToast(
                  //   'Phone number already sent for this property',
                  // );
                  SellerRBSheet.current.open();
                } else {
                  sellerDetailWithProfile(val?.p_id);
                }
              } else {
                if (get_quota_value != 0) {
                  if (val?.isContacted) {
                    // common_fn.showToast(
                    //   'Phone number already sent for this property',
                    // );
                    SellerRBSheet.current.open();
                  } else {
                    sellerDetailWithProfile(val?.p_id);
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
            // title={val?.plan == 3 ? 'Unlock with Prime' : 'Call Agent'}
            title={'View Details'}
            titleStyle={{
              color: Color.white,
              marginHorizontal: 5,
              fontFamily: Poppins.Medium,
              fontSize: 14,
              paddingTop: 5,
            }}
            // icon={() =>
            //   val?.prime ? (
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
              navigation.navigate('SingleProperty', {p_id: val?.p_id});
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
              <Icon name="arrow-redo-outline" size={25} color={Color.white} />
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
          item={val?.seller_details}
          EmailContactVisible={EmailContactVisible}
        />
      </View>
    );
  };
  // const newData = modifyData(buyData);
  const headerOpacity = animatedOpacityValue.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    useNativeDriver: false,
  });

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      if (filterBoolean) {
        var data = filterBuyData + '&page_number=' + nextPage;
        const filterData = await fetchData.FilterData(data);
        if (filterData.length > 0) {
          setPage(nextPage);
          const updatedData = [...buyData, ...filterData];
          setBuyData(updatedData);
          // await AsyncStorage.setItem('buyData', JSON.stringify(updatedData));
        } else {
          setEndReached(true);
        }
      } else {
        var data = dataPayload() + '&page_number=' + nextPage;
        const response = await fetchData.Properties(data);
        if (response.length > 0) {
          setPage(nextPage);
          const updatedData = [...buyData, ...response];
          setBuyData(updatedData);
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
  }, [countFilter, getBuyApiData]);

  useEffect(() => {
    if (EmailContactVisible) {
      getBuyApiData();
      const interval = setInterval(() => {
        setEmailContactVisible(false);
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [EmailContactVisible]);

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

  // const loadMoreData = async () => {
  //   setLoadMore(true);

  //   try {
  //     const nextPage = page + 1;
  //     const requestData = filterBoolean
  //       ? `${filterBuyData}&page_number=${nextPage}`
  //       : `page_number=${nextPage}`;

  //     const responseData = filterBoolean
  //       ? await fetchData.FilterData(requestData)
  //       : await fetchData.Properties(requestData);

  //     if (responseData.length > 0) {
  //       // Update the page and add the new data to the existing data
  //       setPage(nextPage);
  //       const updatedData = [...buyData, ...responseData];
  //       setBuyData(updatedData);

  //       // Store the updated data in AsyncStorage
  //       await AsyncStorage.setItem('buyData', JSON.stringify(updatedData));
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoadMore(false);
  //   }
  // };

  const phoneNumber = '1234567890';
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      {filterloading || loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // height: height,
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
                  selectItem: {
                    id: 1,
                    title: 'Buy',
                    value: 'sell',
                  },
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
                        backgroundColor: Color.white,
                        flexDirection: 'row',
                        alignItems: 'center',
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
                        this[RBSheet + single_index].open();
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.primary,
                          marginHorizontal: 5,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        {single_item?.name == 'Budget'
                          ? AddFilter?.budget?.id == 2 ||
                            AddFilter?.budget?.id == 3
                            ? common_fn.formatedDataforSuffix(
                                AddFilter?.budget?.title,
                              )
                            : AddFilter?.budget?.title
                          : single_item?.name == 'BHK'
                          ? AddFilter?.bhk?.value
                          : single_item?.name == 'Popular Locality' &&
                            AddFilter?.locality}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.black,
                          marginHorizontal: 10,
                          fontFamily: Poppins.Medium,
                        }}>
                        {single_item.name}
                      </Text>
                      <Icon name="chevron-down" size={18} color={Color.black} />
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
                          padding: 10,
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
                                            budget: AddFilter?.budget,
                                            bhk: AddFilter?.bhk,
                                            locality: null,
                                          })
                                        : SetAddFilter({
                                            budget: AddFilter?.budget,
                                            bhk: AddFilter?.bhk,
                                            locality: item,
                                          });
                                      this[RBSheet + single_index].close();
                                      setFilterLoading(true);
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
                                        AddFilter?.budget?.value ==
                                          item?.value ||
                                        AddFilter?.bhk?.value == item?.value ||
                                        AddFilter?.locality == item?.value
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
                                      single_item?.name == 'Budget'
                                        ? item.value == AddFilter?.budget?.value
                                          ? SetAddFilter({
                                              budget: null,
                                              bhk: AddFilter?.bhk,
                                              locality: AddFilter?.locality,
                                            })
                                          : SetAddFilter({
                                              budget: item,
                                              bhk: AddFilter?.bhk,
                                              locality: AddFilter?.locality,
                                            })
                                        : single_item?.name == 'BHK'
                                        ? item.value == AddFilter?.bhk?.value
                                          ? SetAddFilter({
                                              budget: AddFilter?.budget,
                                              bhk: null,
                                              locality: AddFilter?.locality,
                                            })
                                          : SetAddFilter({
                                              budget: AddFilter?.budget,
                                              bhk: item,
                                              locality: AddFilter?.locality,
                                            })
                                        : single_item?.name ==
                                            'Popular Locality' &&
                                          item.value == AddFilter?.locality
                                        ? SetAddFilter({
                                            budget: AddFilter?.budget,
                                            bhk: AddFilter?.bhk,
                                            locality: null,
                                          })
                                        : SetAddFilter({
                                            budget: AddFilter?.budget,
                                            bhk: AddFilter?.bhk,
                                            locality: item,
                                          });
                                      this[RBSheet + single_index].close();
                                      setFilterLoading(true);
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color:
                                          AddFilter?.budget?.value ==
                                            item?.value ||
                                          AddFilter?.bhk?.value ==
                                            item?.value ||
                                          AddFilter?.locality == item?.value
                                            ? Color.white
                                            : Color.black,
                                        marginHorizontal: 10,
                                        fontFamily: Poppins.SemiBold,
                                      }}>
                                      {single_item?.name == 'Budget'
                                        ? item?.id == 2 || item?.id == 3
                                          ? common_fn.formatedDataforSuffix(
                                              item?.title,
                                            )
                                          : item?.title
                                        : item?.title}
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
              {countFilter ?? 0} results | Properties for sale in {location}
            </Text>
          </View>
          <FlatList
            data={final}
            // contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}
            keyExtractor={(item, index) => item + index}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: animatedOpacityValue}}}],
              {useNativeDriver: false},
            )}
            contentContainerStyle={{paddingHorizontal: 5}}
            renderItem={({item, index}) => renderItem(item, index)}
            onEndReached={() => {
              loadMoreData();
            }}
            onEndReachedThreshold={3}
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
                    editable={false}
                    keyboardType="phone-pad"
                    maxLength={10}
                    returnKeyType={'done'}
                    // onChangeText={number => {
                    //   chkNumber(number);
                    // }}
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
        </>
      )}
      <PlanPhonePurchase
        setPhoneQuotoVisible={setPhoneQuotoVisible}
        phoneQuotoVisible={phoneQuotoVisible}
      />
      {loginEnable == true && (
        <BottomLogin login={loginEnable} setLogin={setLoginEnable} />
      )}
    </View>
  );
};

export default BuyScreen;
//buyScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
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
    // fontFamily: 'Poppins-SemiBold',
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
