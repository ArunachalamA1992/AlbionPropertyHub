import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Animated,
  Modal,
  Pressable,
  ImageBackground,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import Color from '../../Config/Color';
import {Button, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import OIcon from 'react-native-vector-icons/Octicons';
import {Media} from '../../Global/Media';
import {useDispatch, useSelector} from 'react-redux';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  setAsync,
  setEditVisible,
  setFilterLocation,
  setPostPropertyLocation,
  setPropertyAsync,
  setPropertyData,
  setUserData,
} from '../../Redux';
import {Poppins} from '../../Global/FontFamily';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import common_fn from '../../Config/common_fn';
import moment from 'moment';

import PrimeModal from '../Prime/PrimeModal';
import {PlanPhonePurchase} from '../../Components/PlanPurchase';
import {PlotTypeModal} from '../../Components/PlotTypeModal';
import {ActivityIndicator} from 'react-native-paper';
import {Iconviewcomponent} from '../../Components/Icontag';
import RBSheet from 'react-native-raw-bottom-sheet';
import {profileCompletion} from '../../Utils/utils';
import SenderModal from '../../Components/SenderModal';
import {base_auction_image_url} from '../../Config/base_url';
import EnableLogin from '../../Components/EnableLogin';
import BottomLogin from '../../Components/BottomLogin';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Keyboard} from 'react-native';

var {width, height} = Dimensions.get('screen');

const TabBarHeight = 48;
const HeaderHeight = 150;
const tab1ItemSize = (Dimensions.get('window').width - 30) / 2;
const tab2ItemSize = (Dimensions.get('window').width - 40) / 3;

const BuyItemCard = ({
  BestOffers,
  setBestOffers,
  getApiData,
  nearByProperty,
  recentlyViewed,
  mostlyViewed,
  relatedViewed,
  NewProperty,
  FeaturedProducts,
  buildersProducts,
  setBuilderProducts,
  BuySection,
  sellingTypes,
  propertyServices,
  navigation,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
  user_id,
  AutoFilter,
  currentCity,
  LatestNews,
  currentCityid,
  userData,
}) => {
  const [ProductLoad, setProductLoad] = useState(false);
  const [loginEnable, setLoginEnable] = useState(false);
  const [processingProducts, setProcessingProducts] = useState([]);
  const [buildersProcessingProducts, setBuildersProcessingProducts] = useState(
    [],
  );
  const windowHeight = Dimensions.get('window').height;

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
        setBestOffers(prevBuyData =>
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

        setBestOffers(prevBuyData =>
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

  const BuildershandleWishlist = async (id, isWishList) => {
    const cancelTokenSource = axios.CancelToken.source();

    setBuildersProcessingProducts(prevProcessingProducts => [
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
        setBuilderProducts(prevBuyData =>
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

        setBuilderProducts(prevBuyData =>
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
      setBuildersProcessingProducts(prevProcessingProducts =>
        prevProcessingProducts.filter(productId => productId !== id),
      );
    }
  };

  const [LoanOffers, setLoanOffers] = useState([]);
  const [TopBanks, setTopBanks] = useState([]);
  const [popularBuilders, setPopularBuilders] = useState([]);

  const getBannerData = async () => {
    try {
      const BannerData = await fetchData.Banner({});
      const filteredPopularBuilders = [];
      const filteredLoanOffers = [];
      // BannerData.forEach(item => {
      //   if (item?.category === 'popular_builders') {
      //     filteredPopularBuilders.push(item);
      //   } else if (item?.category === 'offer') {
      //     filteredLoanOffers.push(item);
      //   }
      // });
      setPopularBuilders(BannerData);
      setLoanOffers(filteredLoanOffers);
      //Top Banks
      const getBanks = await fetchData.get_banks({});
      // console.log("Bank List ------------ : ", JSON.stringify(getBanks));
      setTopBanks(getBanks);
    } catch (error) {
      console.log('error', error);
    }
  };

  const BounceAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getBannerData();
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
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([
    {
      id: 1,
      rating: 1,
      experience: 'poor',
    },
    {
      id: 2,
      rating: 2,
      experience: 'Bad',
    },
    {
      id: 3,
      rating: 3,
      experience: 'Okay',
    },
    {
      id: 4,
      rating: 4,
      experience: 'Average',
    },
    {
      id: 5,
      rating: 5,
      experience: 'Good',
    },
  ]);
  const starImageFilled = Media.star;
  const starImageCorner = Media.starOutline;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.white}}>
      <Animated.SectionList
        sections={BuySection}
        scrollEnabled={true}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingTop: HeaderHeight,
          paddingHorizontal: 5,
          minHeight: windowHeight - TabBarHeight,
          // flexGrow: 1,
        }}
        nestedScrollEnabled
        initialNumToRender={5}
        renderItem={({item}) => {
          switch (item) {
            case 'Best Offers':
              return (
                <View style={{marginTop: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginVertical: 10,
                      marginHorizontal: 10,
                    }}>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Best offers for you
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            paddingHorizontal: 10,
                            padding: 5,
                            paddingTop: 7,
                            marginStart: 10,
                            borderRadius: 50,
                            color: Color.white,
                            fontFamily: Poppins.SemiBold,
                            backgroundColor: Color.sunShade,
                            textAlign: 'center',
                          }}>
                          PRIME
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        Get best deals from prime membership
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginVertical: 10,
                      }}
                      onPress={() => {
                        navigation.navigate('bestOffers', {
                          BestOffers,
                          routename: 'Best Offers',
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.primary,
                          fontStyle: 'normal',
                          fontFamily: Poppins.SemiBold,
                        }}>
                        View all
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {BestOffers?.length > 0 ? (
                    <FlatList
                      data={BestOffers?.slice(0, 10)}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                          });
                        }
                        return (
                          <View style={{flex: 1}}>
                            <TouchableOpacity
                              key={index}
                              activeOpacity={0.5}
                              style={{
                                width: 250,
                                height: 250,
                                marginHorizontal: 10,
                                borderRadius: 5,
                                borderColor: Color.lightgrey,
                                borderWidth: 1,
                                backgroundColor: Color.white,
                              }}
                              onPress={() => {
                                navigation.navigate('SingleProperty', {
                                  p_id: item.p_id,
                                });
                              }}>
                              <View>
                                {item?.images?.length > 0 &&
                                item?.images?.[0]?.image_url != '' ? (
                                  <Image
                                    source={{
                                      uri: item?.images?.[0]?.image_url,
                                    }}
                                    key={index}
                                    style={{
                                      width: 250,
                                      height: 150,
                                      resizeMode: 'cover',
                                      borderTopLeftRadius: 5,
                                      borderTopRightRadius: 5,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={{uri: Media.noImage}}
                                    style={{
                                      width: 250,
                                      height: 150,
                                      resizeMode: 'contain',
                                      borderTopLeftRadius: 5,
                                      borderTopRightRadius: 5,
                                    }}
                                  />
                                )}
                                <View
                                  style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      alignItems: 'flex-start',
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
                                            marginStart: 5,
                                            borderRadius: 5,
                                            paddingTop: 7,
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
                                      alignItems: 'flex-end',
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        height: 30,
                                        position: 'absolute',
                                        top: 0,
                                        left: 10,
                                        right: 0,
                                      }}>
                                      <TouchableOpacity
                                        style={{
                                          width: 40,
                                          height: 40,
                                          backgroundColor: Color.lightgrey,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          borderRadius: 100,
                                          padding: 10,
                                          marginRight: 10,
                                        }}
                                        onPress={() => {
                                          if (
                                            user_id == undefined ||
                                            (userData?.length > 0 &&
                                              userData == undefined)
                                          ) {
                                            setLoginEnable(true);
                                          } else {
                                            handleWishlist(
                                              item.p_id,
                                              item?.isWishListed,
                                            );
                                          }
                                        }}>
                                        {processingProducts.includes(
                                          item.p_id,
                                        ) ? (
                                          <ActivityIndicator
                                            size="small"
                                            color={Color.primary}
                                          />
                                        ) : (
                                          <Icon
                                            name={
                                              item?.isWishListed
                                                ? 'heart'
                                                : 'heart-outline'
                                            }
                                            size={18}
                                            color={
                                              item?.isWishListed
                                                ? Color.primary
                                                : Color.black
                                            }
                                          />
                                        )}
                                      </TouchableOpacity>
                                    </View>
                                    {/* <View
                                        style={{
                                          flex: 1,
                                          // backgroundColor: Color.darkGrey,
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'flex-end',
                                          padding: 5,
                                          borderRadius: 5,
                                          marginTop: 50,
                                        }}>
                                        <Icon
                                          name="images"
                                          size={25}
                                          color={Color.white}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            color: Color.primary,
                                            fontStyle: 'normal',
                                            fontFamily: Poppins.SemiBold,
                                            marginHorizontal: 10,
                                          }}>
                                          {item?.images?.length}
                                        </Text>
                                      </View> */}
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'space-around',
                                  alignItems: 'center',
                                  padding: 5,
                                }}>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 12,
                                      color: '#666',
                                      fontFamily: Poppins.Medium,
                                    }}
                                    numberOfLines={1}>
                                    {item?.property_type?.pt_name == 'PG'
                                      ? item?.property_type?.pt_name
                                      : item?.property_type?.pt_name ==
                                          'Flat' ||
                                        item?.property_type?.pt_name ==
                                          'Villa' ||
                                        item?.property_type?.pt_name == 'House'
                                      ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                      : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                  </Text>
                                  {/* <F5Icon
                                    name="crown"
                                    size={18}
                                    color={Color.sunShade}
                                  /> */}
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 16,
                                      color: Color.black,
                                      fontFamily: Poppins.SemiBold,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {item.property_name?.length > 0
                                      ? item.property_name
                                      : '----'}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: Color.primary,
                                      fontFamily: Poppins.SemiBold,
                                    }}
                                    numberOfLines={1}>
                                    ₹
                                    {item?.property_type?.pt_name == 'PG'
                                      ? common_fn.getMinToMaxPrice(
                                          item?.room_category,
                                        )
                                      : item?.expected_price?.length >= 5
                                      ? common_fn.formatNumberWithSuffix(
                                          item?.expected_price,
                                        )
                                      : item?.expected_price}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      fontFamily: Poppins.Medium,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {item.location}
                                  </Text>
                                  {/* <Text
                                    style={{
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      fontFamily: Poppins.Medium,
                                    }}>
                                    per month
                                  </Text> */}
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                        width: '100%',
                      }}>
                      <Image
                        source={{uri: Media.noProperty}}
                        style={{
                          width: 100,
                          height: 80,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          padding: 5,
                          paddingHorizontal: 20,
                          marginStart: 5,
                          borderRadius: 5,
                          marginVertical: 10,
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        No Properties Found
                      </Text>
                    </View>
                  )}
                </View>
              );
            case 'New Property':
              return (
                NewProperty?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          New Property
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        New Properties across{' '}
                        {AutoFilter?.length != '' ? AutoFilter : currentCity}
                      </Text>
                    </View>
                    <FlatList
                      data={NewProperty}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              // height: 140,
                              flexDirection: 'row',
                              margin: 5,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#a5a5a5',
                              marginHorizontal: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('SingleProperty', {
                                p_id: item.p_id,
                              });
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              {item?.images?.length > 0 &&
                              item?.images?.[0]?.image_url != '' ? (
                                <Image
                                  source={{
                                    uri: item?.images?.[0]?.image_url,
                                  }}
                                  key={index}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={{uri: Media.noImage}}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              )}
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                              <View style={{padding: 5}}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  {item?.property_type?.pt_name == 'PG'
                                    ? item?.property_type?.pt_name
                                    : item?.property_type?.pt_name == 'Flat' ||
                                      item?.property_type?.pt_name == 'Villa' ||
                                      item?.property_type?.pt_name == 'House'
                                    ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                    : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // marginHorizontal: 10,
                                  }}>
                                  <OIcon
                                    name={'location'}
                                    size={18}
                                    style={{color: '#666'}}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#333',
                                      fontFamily: Poppins.Medium,
                                      padding: 5,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.locality},${item?.location}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  {item?.property_type?.pt_name == 'PG' ? (
                                    <>
                                      <Icon
                                        name={'bed'}
                                        size={20}
                                        style={{color: '#666'}}
                                      />
                                      {item?.room_category?.map(item => {
                                        return (
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'flex-start',
                                              alignItems: 'center',
                                              marginStart: 5,
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: 'black',
                                                fontFamily: Poppins.Medium,
                                              }}>
                                              {`${item?.key},`}
                                            </Text>
                                          </View>
                                        );
                                      })}
                                    </>
                                  ) : (
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
                                        style={{color: '#666'}}
                                      />
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: 'black',
                                          fontFamily: Poppins.Medium,
                                          paddingHorizontal: 5,
                                        }}>
                                        {`${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.red,
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  ₹{' '}
                                  {item?.property_type?.pt_name == 'PG'
                                    ? common_fn.getMinToMaxPrice(
                                        item?.room_category,
                                      )
                                    : item?.expected_price?.length >= 5
                                    ? common_fn.formatNumberWithSuffix(
                                        item?.expected_price,
                                      )
                                    : item?.expected_price}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Selling Types':
              return (
                <View style={{marginTop: 25}}>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Property Types
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.grey,
                        fontFamily: Poppins.SemiBold,
                        marginVertical: 5,
                      }}>
                      Look your properties across{' '}
                      {AutoFilter?.length != '' ? AutoFilter : currentCity}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <FlatList
                      data={sellingTypes}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              item?.name == 'Plot' ||
                              item?.name == 'Shop' ||
                              item?.name == 'Office'
                                ? navigation.navigate('Commercial', {
                                    location:
                                      AutoFilter?.length != ''
                                        ? AutoFilter
                                        : currentCity,
                                    property_action: 'sell,rent',
                                    filter: false,
                                    property_type:
                                      item?.name == 'Plot'
                                        ? 'plot'
                                        : item?.name == 'Office'
                                        ? 'Office'
                                        : 'shop',
                                    data: {},
                                    real_estate: 'commercial',
                                    city_id: currentCityid,
                                  })
                                : navigation.navigate('propertyPage', {
                                    location:
                                      AutoFilter?.length != ''
                                        ? AutoFilter
                                        : currentCity,
                                    property_action: 'sell,rent',
                                    filter: false,
                                    property_type:
                                      item?.name == 'House'
                                        ? 'house'
                                        : item?.name == 'Villa'
                                        ? 'villa'
                                        : 'flat',
                                    data: {},
                                    real_estate: 'residential',
                                    city_id: currentCityid,
                                  });
                            }}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginRight: 10,
                              shadowColor: Color.black,
                              shadowOffset: {
                                width: 0,
                                height: 1,
                              },
                              shadowOpacity: 0.22,
                              shadowRadius: 2.22,
                              elevation: 2,
                            }}>
                            <Image
                              source={{uri: item.image}}
                              style={{
                                width: 150,
                                height: 100,
                                borderRadius: 10,
                                borderColor: Color.lightgrey,
                                borderWidth: 1,
                                resizeMode: 'contain',
                              }}
                            />
                            <Text
                              style={{
                                color: Color.black,
                                fontSize: 14,
                                fontFamily: Poppins.SemiBold,
                                marginVertical: 5,
                              }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                </View>
              );
            case 'Builders Property':
              return (
                buildersProducts?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Builders Property
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        Builders Properties Across{' '}
                        {AutoFilter?.length != '' ? AutoFilter : currentCity}
                      </Text>
                    </View>
                    <FlatList
                      data={buildersProducts}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <View style={{flex: 1}}>
                            <TouchableOpacity
                              key={index}
                              activeOpacity={0.5}
                              style={{
                                marginHorizontal: 5,
                                borderWidth: 1,
                                borderColor: Color.lightgrey,
                              }}
                              onPress={() => {
                                navigation.navigate('SingleProperty', {
                                  p_id: item.p_id,
                                });
                              }}>
                              <View>
                                {item?.images?.length > 0 &&
                                item?.images?.[0]?.image_url != '' ? (
                                  <Image
                                    source={{
                                      uri: item?.images?.[0]?.image_url,
                                    }}
                                    key={index}
                                    style={{
                                      width: 250,
                                      height: 250,
                                      resizeMode: 'cover',
                                      borderRadius: 10,
                                      opacity: 0.7,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={{uri: Media.noImage}}
                                    style={{
                                      width: 250,
                                      height: 250,
                                      resizeMode: 'contain',
                                      borderRadius: 10,
                                      opacity: 0.7,
                                    }}
                                  />
                                )}
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    height: 30,
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    right: 10,
                                  }}>
                                  <TouchableOpacity
                                    style={{
                                      width: 40,
                                      height: 40,
                                      backgroundColor: Color.white,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 100,
                                      padding: 10,
                                      marginRight: 10,
                                    }}
                                    onPress={() => {
                                      BuildershandleWishlist(
                                        item.p_id,
                                        item?.isWishListed,
                                      );
                                    }}>
                                    {buildersProcessingProducts.includes(
                                      item.p_id,
                                    ) ? (
                                      <ActivityIndicator
                                        size="small"
                                        color={Color.primary}
                                      />
                                    ) : (
                                      <Icon
                                        name={
                                          item?.isWishListed
                                            ? 'heart'
                                            : 'heart-outline'
                                        }
                                        size={18}
                                        color={
                                          item?.isWishListed
                                            ? Color.primary
                                            : Color.black
                                        }
                                      />
                                    )}
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                    bottom: 0,
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'space-around',
                                      alignItems: 'center',
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                      }}>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 16,
                                          color: Color.white,
                                          fontFamily: Poppins.SemiBold,
                                          textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}>
                                        {item.property_name?.length > 0
                                          ? item.property_name
                                          : '----'}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                      }}>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 12,
                                          color: Color.white,
                                          fontFamily: Poppins.Medium,
                                          textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}>
                                        {`${item.location} , ${item.locality}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                      }}>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 12,
                                          color: Color.white,
                                          fontFamily: Poppins.Medium,
                                          textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}>
                                        {`${item.address}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                      }}>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 12,
                                          color: Color.white,
                                          fontFamily: Poppins.Medium,
                                          textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}>
                                        {`${item.availability}`}
                                      </Text>
                                    </View>
                                  </View>
                                  <View>
                                    <Text
                                      style={{
                                        fontSize: 18,
                                        color: Color.primary,
                                        fontFamily: Poppins.SemiBold,
                                      }}
                                      numberOfLines={1}>
                                      ₹
                                      {item?.property_type?.pt_name == 'PG'
                                        ? common_fn.getMinToMaxPrice(
                                            item?.room_category,
                                          )
                                        : item?.expected_price?.length >= 5
                                        ? common_fn.formatNumberWithSuffix(
                                            item?.expected_price,
                                          )
                                        : item?.expected_price}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: Color.primary,
                                        fontFamily: Poppins.SemiBold,
                                      }}>
                                      Onwards
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Featured Property':
              return (
                FeaturedProducts?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Featured Property
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        Featured Properties Across{' '}
                        {AutoFilter?.length != '' ? AutoFilter : currentCity}
                      </Text>
                    </View>
                    <FlatList
                      data={FeaturedProducts}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <View style={{flex: 1}}>
                            <TouchableOpacity
                              key={index}
                              activeOpacity={0.5}
                              style={{
                                width: 250,
                                height: 250,
                                marginHorizontal: 10,
                                borderRadius: 5,
                                borderColor: Color.lightgrey,
                                borderWidth: 1,
                                backgroundColor: Color.white,
                              }}
                              onPress={() => {
                                navigation.navigate('SingleProperty', {
                                  p_id: item.p_id,
                                });
                              }}>
                              <View>
                                {item?.images?.length > 0 &&
                                item?.images?.[0]?.image_url != '' ? (
                                  <Image
                                    source={{
                                      uri: item?.images?.[0]?.image_url,
                                    }}
                                    key={index}
                                    style={{
                                      width: 250,
                                      height: 150,
                                      resizeMode: 'cover',
                                      borderTopLeftRadius: 5,
                                      borderTopRightRadius: 5,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={{uri: Media.noImage}}
                                    style={{
                                      width: 250,
                                      height: 150,
                                      resizeMode: 'contain',
                                      borderTopLeftRadius: 5,
                                      borderTopRightRadius: 5,
                                    }}
                                  />
                                )}
                                <View
                                  style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      alignItems: 'flex-start',
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
                                            marginStart: 5,
                                            borderRadius: 5,
                                            paddingTop: 7,
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
                                      alignItems: 'flex-end',
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        height: 30,
                                        position: 'absolute',
                                        top: 0,
                                        left: 10,
                                        right: 0,
                                      }}>
                                      <TouchableOpacity
                                        style={{
                                          width: 40,
                                          height: 40,
                                          backgroundColor: Color.lightgrey,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          borderRadius: 100,
                                          padding: 10,
                                          marginRight: 10,
                                        }}
                                        onPress={() => {
                                          handleWishlist(
                                            item.p_id,
                                            item?.isWishListed,
                                          );
                                        }}>
                                        {processingProducts.includes(
                                          item.p_id,
                                        ) ? (
                                          <ActivityIndicator
                                            size="small"
                                            color={Color.primary}
                                          />
                                        ) : (
                                          <Icon
                                            name={
                                              item?.isWishListed
                                                ? 'heart'
                                                : 'heart-outline'
                                            }
                                            size={18}
                                            color={
                                              item?.isWishListed
                                                ? Color.primary
                                                : Color.black
                                            }
                                          />
                                        )}
                                      </TouchableOpacity>
                                    </View>
                                    {/* <View
                                        style={{
                                          flex: 1,
                                          // backgroundColor: Color.darkGrey,
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'flex-end',
                                          padding: 5,
                                          borderRadius: 5,
                                          marginTop: 50,
                                        }}>
                                        <Icon
                                          name="images"
                                          size={25}
                                          color={Color.white}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            color: Color.primary,
                                            fontStyle: 'normal',
                                            fontFamily: Poppins.SemiBold,
                                            marginHorizontal: 10,
                                          }}>
                                          {item?.images?.length}
                                        </Text>
                                      </View> */}
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'space-around',
                                  alignItems: 'center',
                                  padding: 5,
                                }}>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 12,
                                      color: '#666',
                                      fontFamily: Poppins.Medium,
                                    }}
                                    numberOfLines={1}>
                                    {item?.property_type?.pt_name == 'PG'
                                      ? item?.property_type?.pt_name
                                      : item?.property_type?.pt_name ==
                                          'Flat' ||
                                        item?.property_type?.pt_name ==
                                          'Villa' ||
                                        item?.property_type?.pt_name == 'House'
                                      ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                      : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                  </Text>
                                  {/* <F5Icon
                                    name="crown"
                                    size={18}
                                    color={Color.sunShade}
                                  /> */}
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  {/* <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 16,
                                      color: Color.black,
                                      fontFamily: Poppins.SemiBold,
                                      textTransform: "capitalize"
                                    }}
                                    numberOfLines={1}>
                                    {item.property_name?.length > 0
                                      ? item.property_name
                                      : '----'}
                                  </Text> */}
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 18,
                                      color: Color.primary,
                                      fontFamily: Poppins.SemiBold,
                                    }}
                                    numberOfLines={1}>
                                    ₹
                                    {item?.property_type?.pt_name == 'PG'
                                      ? common_fn.getMinToMaxPrice(
                                          item?.room_category,
                                        )
                                      : item?.expected_price?.length >= 5
                                      ? common_fn.formatNumberWithSuffix(
                                          item?.expected_price,
                                        )
                                      : item?.expected_price}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      fontFamily: Poppins.Medium,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item.location} , ${item.locality}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      fontFamily: Poppins.Medium,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.facing} Facing`}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Related Property':
              return (
                relatedViewed?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Related Property
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Related Properties Across{' '}
                        {AutoFilter?.length != '' ? AutoFilter : currentCity}
                      </Text>
                    </View>
                    <FlatList
                      data={relatedViewed}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              // height: 140,
                              flexDirection: 'row',
                              margin: 5,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#a5a5a5',
                              marginHorizontal: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('SingleProperty', {
                                p_id: item.p_id,
                              });
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              {item?.images?.length > 0 &&
                              item?.images?.[0]?.image_url != '' ? (
                                <Image
                                  source={{
                                    uri: item?.images?.[0]?.image_url,
                                  }}
                                  key={index}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={{uri: Media.noImage}}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              )}
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                              <View style={{padding: 5}}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  {item?.property_type?.pt_name == 'PG'
                                    ? item?.property_type?.pt_name
                                    : item?.property_type?.pt_name == 'Flat' ||
                                      item?.property_type?.pt_name == 'Villa' ||
                                      item?.property_type?.pt_name == 'House'
                                    ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                    : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // marginHorizontal: 10,
                                  }}>
                                  <OIcon
                                    name={'location'}
                                    size={18}
                                    style={{color: '#666'}}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#333',
                                      fontFamily: Poppins.Medium,
                                      padding: 5,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.locality},${item?.location}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  {item?.property_type?.pt_name == 'PG' ? (
                                    <>
                                      <Icon
                                        name={'bed'}
                                        size={20}
                                        style={{color: '#666'}}
                                      />
                                      {item?.room_category?.map(item => {
                                        return (
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'flex-start',
                                              alignItems: 'center',
                                              marginStart: 5,
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: 'black',
                                                fontFamily: Poppins.Medium,
                                              }}>
                                              {`${item?.key},`}
                                            </Text>
                                          </View>
                                        );
                                      })}
                                    </>
                                  ) : (
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
                                        style={{color: '#666'}}
                                      />
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: 'black',
                                          fontFamily: Poppins.Medium,
                                          paddingHorizontal: 5,
                                        }}>
                                        {`${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.red,
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  ₹{' '}
                                  {item?.property_type?.pt_name == 'PG'
                                    ? common_fn.getMinToMaxPrice(
                                        item?.room_category,
                                      )
                                    : item?.expected_price?.length >= 5
                                    ? common_fn.formatNumberWithSuffix(
                                        item?.expected_price,
                                      )
                                    : item?.expected_price}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Property Services':
              return (
                <View style={{marginTop: 10}}>
                  <View style={{marginVertical: 5}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontFamily: Poppins.SemiBold,
                        marginHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      Property Services
                    </Text>
                  </View>
                  <FlatList
                    data={propertyServices}
                    horizontal={true}
                    removeClippedSubviews={true}
                    initialNumToRender={2}
                    maxToRenderPerBatch={1}
                    updateCellsBatchingPeriod={100}
                    windowSize={7}
                    keyExtractor={(item, index) => item + index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            width: 150,
                            margin: 5,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#a5a5a5',
                            padding: 5,
                          }}
                          onPress={() => {
                            navigation.navigate(item?.navigate);
                          }}>
                          <Image
                            source={{uri: item?.image}}
                            style={{width: 50, height: 50}}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.black,
                              fontFamily: Poppins.SemiBold,
                              paddingTop: 2,
                            }}>
                            {item?.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              );
            case 'NearBy Location':
              return (
                <View style={{marginTop: 10}}>
                  <View style={{marginVertical: 5}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontFamily: Poppins.SemiBold,
                        marginHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      Nearby Locations
                    </Text>
                  </View>
                  {nearByProperty?.length > 0 ? (
                    <FlatList
                      data={nearByProperty}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: 320,
                              // height: 140,
                              flexDirection: 'row',
                              margin: 5,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#a5a5a5',
                              marginHorizontal: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('SingleProperty', {
                                p_id: item.p_id,
                              });
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              {item?.images?.length > 0 &&
                              item?.images?.[0]?.image_url != '' ? (
                                <Image
                                  source={{
                                    uri: item?.images?.[0]?.image_url,
                                  }}
                                  key={index}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={{uri: Media.noImage}}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              )}
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                              <View style={{padding: 5}}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  {item?.property_type?.pt_name == 'PG'
                                    ? item?.property_type?.pt_name
                                    : item?.property_type?.pt_name == 'Flat' ||
                                      item?.property_type?.pt_name == 'Villa' ||
                                      item?.property_type?.pt_name == 'House'
                                    ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                    : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                </Text>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // marginHorizontal: 10,
                                  }}>
                                  <OIcon
                                    name={'location'}
                                    size={18}
                                    style={{color: '#666'}}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#333',
                                      fontFamily: Poppins.Medium,
                                      padding: 5,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.locality},${item?.location}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      padding: 5,
                                      justifyContent: 'flex-start',
                                      alignItems: 'center',
                                    }}>
                                    <MIcon
                                      name={'bed'}
                                      size={24}
                                      style={{color: '#666'}}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'black',
                                        fontFamily: Poppins.Medium,
                                        paddingHorizontal: 5,
                                      }}>
                                      {`${bedroomValue} Beds`}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      padding: 5,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <MCIcon
                                      name={'bathtub-outline'}
                                      size={24}
                                      style={{color: '#666'}}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'black',
                                        fontFamily: Poppins.Medium,
                                        paddingHorizontal: 5,
                                      }}>
                                      {`${bathValue} Baths`}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      padding: 5,
                                      justifyContent: 'flex-start',
                                      alignItems: 'center',
                                    }}>
                                    <MIcon
                                      name={'balcony'}
                                      size={24}
                                      style={{color: '#666'}}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'black',
                                        fontFamily: Poppins.Medium,
                                        paddingHorizontal: 2,
                                      }}>
                                      {balconyValue} Balcony
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <MCIcon
                                      name={'parking'}
                                      size={20}
                                      style={{color: '#666'}}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'black',
                                        fontFamily: Poppins.Medium,
                                      }}
                                      numberOfLines={1}>
                                      {parkingValue} Parking
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                        width: '100%',
                      }}>
                      <Image
                        source={{uri: Media.noProperty}}
                        style={{
                          width: 100,
                          height: 80,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          padding: 5,
                          paddingHorizontal: 20,
                          marginStart: 5,
                          borderRadius: 5,
                          marginVertical: 10,
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        No Properties Found
                      </Text>
                    </View>
                  )}
                </View>
              );
            case 'Recent Property':
              return (
                recentlyViewed?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View style={{marginVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: Poppins.SemiBold,
                          marginHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        Recent Search
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginHorizontal: 10,
                        }}>
                        Recent Lookups related to your interests
                      </Text>
                    </View>
                    <FlatList
                      data={recentlyViewed}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              // height: 140,
                              flexDirection: 'row',
                              margin: 5,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#a5a5a5',
                              marginHorizontal: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('SingleProperty', {
                                p_id: item.p_id,
                              });
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              {item?.images?.length > 0 &&
                              item?.images?.[0]?.image_url != '' ? (
                                <Image
                                  source={{
                                    uri: item?.images?.[0]?.image_url,
                                  }}
                                  key={index}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={{uri: Media.noImage}}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              )}
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                              <View style={{padding: 5}}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  {item?.property_type?.pt_name == 'PG'
                                    ? item?.property_type?.pt_name
                                    : item?.property_type?.pt_name == 'Flat' ||
                                      item?.property_type?.pt_name == 'Villa' ||
                                      item?.property_type?.pt_name == 'House'
                                    ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                    : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // marginHorizontal: 10,
                                  }}>
                                  <OIcon
                                    name={'location'}
                                    size={18}
                                    style={{color: '#666'}}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#333',
                                      fontFamily: Poppins.Medium,
                                      padding: 5,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.locality},${item?.location}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  {item?.property_type?.pt_name == 'PG' ? (
                                    <>
                                      <Icon
                                        name={'bed'}
                                        size={20}
                                        style={{color: '#666'}}
                                      />
                                      {item?.room_category?.map(item => {
                                        return (
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'flex-start',
                                              alignItems: 'center',
                                              marginStart: 5,
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: 'black',
                                                fontFamily: Poppins.Medium,
                                              }}>
                                              {`${item?.key},`}
                                            </Text>
                                          </View>
                                        );
                                      })}
                                    </>
                                  ) : (
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
                                        style={{color: '#666'}}
                                      />
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: 'black',
                                          fontFamily: Poppins.Medium,
                                          paddingHorizontal: 5,
                                        }}>
                                        {`${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.red,
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  ₹{' '}
                                  {item?.property_type?.pt_name == 'PG'
                                    ? common_fn.getMinToMaxPrice(
                                        item?.room_category,
                                      )
                                    : item?.expected_price?.length >= 5
                                    ? common_fn.formatNumberWithSuffix(
                                        item?.expected_price,
                                      )
                                    : item?.expected_price}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Our Loan Offers':
              return (
                <View style={{marginTop: 15, alignItems: 'center'}}>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginStart: 10,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Our Loan Offers
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          paddingHorizontal: 10,
                          padding: 5,
                          marginStart: 10,
                          borderRadius: 50,
                          color: Color.white,
                          fontFamily: Poppins.SemiBold,
                          backgroundColor: Color.sunShade,
                          paddingTop: 7,
                        }}>
                        Loan
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.grey,
                        fontFamily: Poppins.SemiBold,
                        marginHorizontal: 10,
                        marginVertical: 5,
                      }}>
                      Get our ALBION INDIA NIDHI LIMITED loan offers
                    </Text>
                  </View>
                  <View style={{width: '95%', alignItems: 'center'}}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {popularBuilders.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              marginVertical: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                              margin: 5,
                            }}>
                            <Image
                              source={{
                                uri:
                                  // base_banners_image_url +
                                  item.img_name,
                              }}
                              style={{
                                height: 150,
                                width: 280,
                                borderRadius: 5,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                  <View style={{marginVertical: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginVertical: 10,
                        marginHorizontal: 10,
                      }}>
                      <View style={{flex: 1}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'black',
                              fontFamily: Poppins.SemiBold,
                            }}>
                            Top Banks
                          </Text>
                          {/* <Text
                            style={{
                              fontSize: 10,
                              paddingHorizontal: 10,
                              padding: 5,
                              marginStart: 10,
                              borderRadius: 50,
                              color: Color.white,
                              fontFamily: Poppins.SemiBold,
                              backgroundColor: Color.sunShade,
                              textAlign: 'center',
                            }}>
                            Auctions
                          </Text> */}
                        </View>
                      </View>
                    </View>
                    <FlatList
                      data={TopBanks}
                      horizontal
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            key={index}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              marginHorizontal: 10,
                              marginVertical: 10,
                            }}>
                            <View
                              style={{
                                borderWidth: 1,
                                borderColor: Color.lightgrey,
                                borderRadius: 100,
                                padding: 10,
                              }}>
                              <Image
                                source={{
                                  uri: base_auction_image_url + item?.bank_logo,
                                }}
                                style={{
                                  width: 40,
                                  height: 40,
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                color: Color.black,
                                fontSize: 14,
                                fontFamily: Poppins.Medium,
                                marginVertical: 10,
                              }}
                              numberOfLines={2}>
                              {item?.bank_name?.substring(0, 10)}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              );
            // case 'Popular Builders':
            //   return (
            //     <View style={{ marginTop: 15 }}>
            //       <View style={{ marginVertical: 5 }}>
            //         <View
            //           style={{
            //             flexDirection: 'row',
            //             marginStart: 10,
            //             justifyContent: 'flex-start',
            //             alignItems: 'center',
            //           }}>
            //           <Text
            //             style={{
            //               fontSize: 16,
            //               color: 'black',
            //               fontFamily: Poppins.SemiBold,
            //             }}>
            //             Popular Builders
            //           </Text>
            //         </View>
            //         <Text
            //           style={{
            //             fontSize: 10,
            //             color: '#666',
            //             marginStart: 10,
            //             marginVertical: 5,
            //           }}>
            //           Get best deals from prime membership
            //         </Text>
            //       </View>
            //       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            //         {popularBuilders.map((item, index) => {
            //           return (
            //             <View
            //               key={index}
            //               style={{
            //                 marginVertical: 10,
            //                 flexDirection: 'row',
            //                 alignItems: 'center',
            //                 margin: 5,
            //                 marginHorizontal: 10,
            //               }}>
            //               <Image
            //                 source={{
            //                   uri:
            //                     //  base_banners_image_url +
            //                     item.img_name,
            //                 }}
            //                 style={{
            //                   height: 150,
            //                   width: 250,
            //                   resizeMode: 'contain',
            //                   borderRadius: 10,
            //                 }}
            //               />
            //             </View>
            //           );
            //         })}
            //       </ScrollView>
            //     </View>
            //   );
            // case 'Latest News':
            //   return (
            //     <View style={{marginTop: 15}}>
            //       <View
            //         style={{
            //           flexDirection: 'row',
            //           alignItems: 'flex-start',
            //           marginVertical: 10,
            //           marginHorizontal: 10,
            //         }}>
            //         <View style={{flex: 1, marginStart: 10}}>
            //           <Text
            //             style={{
            //               fontSize: 16,
            //               color: 'black',
            //               fontFamily: Poppins.SemiBold,
            //             }}>
            //             Latest News
            //           </Text>
            //           <Text
            //             style={{
            //               width: '95%',
            //               fontSize: 10,
            //               paddingVertical: 5,
            //               color: Color.cloudyGrey,
            //             }}>
            //             Read best and latest News
            //           </Text>
            //         </View>
            //         {/* <TouchableOpacity
            //             style={{
            //               justifyContent: 'center',
            //               alignItems: 'flex-end',
            //             }}
            //             onPress={() => {}}>
            //             <Text
            //               style={{
            //                 fontSize: 14,
            //                 color: Color.primary,
            //                 fontStyle: 'normal',
            //                 fontFamily: Poppins.SemiBold,
            //               }}>
            //               View all
            //             </Text>
            //           </TouchableOpacity> */}
            //       </View>
            //       {LatestNews.length > 0 &&
            //         LatestNews.map((item, index) => {
            //           return (
            //             <TouchableOpacity
            //               onPress={() => {
            //                 if (item?.blog_url != undefined) {
            //                   Linking.openURL(item?.blog_url);
            //                 }
            //               }}
            //               key={index}
            //               style={{
            //                 flexDirection: 'row',
            //                 padding: 5,
            //                 borderRadius: 5,
            //                 borderWidth: 1,
            //                 borderColor: Color.lightgrey,
            //                 backgroundColor: '#F5F5F5',
            //                 marginVertical: 5,
            //                 marginHorizontal: 10,
            //               }}>
            //               {item?.blog_image?.length != '' ? (
            //                 <Image
            //                   source={
            //                     item?.blog_image == undefined
            //                       ? Media.noImage
            //                       : {
            //                           uri:
            //                             // base_blogs_properties +
            //                             item?.blog_image,
            //                         }
            //                   }
            //                   style={{
            //                     width: 120,
            //                     height: 120,
            //                     resizeMode: 'cover',
            //                     borderRadius: 5,
            //                   }}
            //                 />
            //               ) : (
            //                 <Image
            //                   source={Media.noImage}
            //                   style={{
            //                     width: 120,
            //                     height: 120,
            //                     resizeMode: 'cover',
            //                     borderRadius: 5,
            //                   }}
            //                 />
            //               )}
            //               <View
            //                 style={{flex: 1, marginHorizontal: 5, padding: 10}}>
            //                 <Text
            //                   style={{
            //                     fontSize: 14,
            //                     fontFamily: Poppins.Medium,
            //                     color: Color.black,
            //                     textAlign: 'justify',
            //                     lineHeight: 16,
            //                     textTransform: 'capitalize',
            //                   }}
            //                   numberOfLines={2}>
            //                   {item.blog_title}
            //                 </Text>
            //                 <Text
            //                   style={{
            //                     fontSize: 12,
            //                     fontFamily: Poppins.Medium,
            //                     color: Color.cloudyGrey,
            //                     textAlign: 'justify',
            //                     lineHeight: 16,
            //                     textTransform: 'capitalize',
            //                   }}
            //                   numberOfLines={3}>
            //                   {item.blog_content}
            //                 </Text>
            //                 <View
            //                   style={{
            //                     flex: 1,
            //                     marginVertical: 10,
            //                     flexDirection: 'row',
            //                     alignItems: 'flex-end',
            //                     justifyContent: 'flex-end',
            //                   }}>
            //                   <View
            //                     style={{
            //                       flex: 1,
            //                       flexDirection: 'row',
            //                       alignItems: 'center',
            //                       justifyContent: 'center',
            //                     }}>
            //                     <FIcon
            //                       name="calendar"
            //                       size={16}
            //                       color={Color.primary}
            //                     />
            //                     <Text
            //                       style={{
            //                         marginHorizontal: 5,
            //                         fontSize: 12,
            //                         fontFamily: Poppins.Medium,
            //                         color: Color.black,
            //                       }}>
            //                       {item.created_at}
            //                     </Text>
            //                   </View>
            //                   {/* <View
            //                     style={{
            //                       flexDirection: 'row',
            //                       alignItems: 'center',
            //                       justifyContent: 'center',
            //                     }}>
            //                     <Icon
            //                       name="person"
            //                       size={16}
            //                       color={Color.primary}
            //                     />
            //                     <Text
            //                       style={{
            //                         marginHorizontal: 5,
            //                         fontSize: 12,
            //                         fontFamily: Poppins.Medium,
            //                         color: Color.black,
            //                       }}>
            //                       {item.userName}
            //                     </Text>
            //                   </View> */}
            //                 </View>
            //               </View>
            //             </TouchableOpacity>
            //           );
            //         })}
            //     </View>
            //   );
            // case 'Feedback':
            //   return (
            //     <View style={{ marginVertical: 10 }}>
            //       <Text
            //         style={{
            //           textAlign: 'center',
            //           fontSize: 18,
            //           fontWeight: 'bold',
            //           color: Color.black,
            //         }}>
            //         Loving the experience? Please rate us 5
            //       </Text>
            //       <Text
            //         style={{
            //           textAlign: 'center',
            //           fontSize: 20,
            //           fontFamily: Poppins.SemiBold,
            //           color: defaultRating < 2 ? Color.red : defaultRating >= 2 ? Color.sunShade : Color.green,
            //         }}>
            //         {defaultRating}.0
            //       </Text>
            //       <View style={styles.customRatingBarStyle}>
            //         {maxRating.map((item, key) => {
            //           return (
            //             <TouchableOpacity
            //               activeOpacity={0.7}
            //               key={item.id}
            //               onPress={() => setDefaultRating(item.rating)}
            //               style={{
            //                 marginHorizontal: 10,
            //                 alignItems: 'center',
            //               }}>
            //               <Image
            //                 style={styles.starImageStyle}
            //                 source={{
            //                   uri:
            //                     item.rating <= defaultRating
            //                       ? starImageFilled
            //                       : starImageCorner
            //                 }}
            //               />
            //               <Text
            //                 style={{
            //                   textAlign: 'center',
            //                   fontSize: 14,
            //                   fontWeight: 'bold',
            //                   color: Color.black,
            //                 }}>
            //                 {item.experience}
            //               </Text>
            //             </TouchableOpacity>
            //           );
            //         })}
            //       </View>
            //     </View>
            //   );
          }
        }}
      />
      {loginEnable == true && (
        <BottomLogin login={loginEnable} setLogin={setLoginEnable} />
      )}
    </SafeAreaView>
  );
};

const AgentItemCard = ({
  HotDeals,
  getApiData,
  Property_Buyers,
  AgentSection,
  recentlyViewed,
  mostlyViewed,
  relatedViewed,
  NewProperty,
  FeaturedProducts,
  buildersProducts,
  setBuilderProducts,
  Property_Selling,
  navigation,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
  user_id,
  LatestNews,
  get_phone_quota,
  setPhoneQuotoVisible,
  AutoFilter,
  currentCity,
}) => {
  const [get_quota_value, setGet_quota_value] = useState('');
  const UpdateRBSheet = useRef();
  const SellerRBSheet = useRef();
  const BounceAnim = useRef(new Animated.Value(0)).current;
  const [propertyId, setPropertyId] = useState(0);
  const [EmailContactVisible, setEmailContactVisible] = useState(false);
  const [loginEnable, setLoginEnable] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const [processingProducts, setProcessingProducts] = useState([]);
  const [buildersProcessingProducts, setBuildersProcessingProducts] = useState(
    [],
  );
  const [LoanOffers, setLoanOffers] = useState([]);
  const [popularBuilders, setPopularBuilders] = useState([]);
  const [Username, setUsername] = useState(username);
  const [number, setNumber] = useState(mobile_number);
  const [Usermail, setUsermail] = useState(email);
  const [percentage, setPercentage] = useState(0);
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id, username, mobile_number, email, get_phone_quota} = userData;
  const dispatch = useDispatch();

  useEffect(() => {
    getCheck_quota();
  }, []);
  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
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

  const handleWishlist = async (id, isWishList) => {
    setProcessingProducts([...processingProducts, id]);
    try {
      var data = {
        p_id: id,
        user_id: user_id,
      };
      if (isWishList) {
        const removeWishlist = await fetchData.remove_to_wishlist(data);
        getApiData();
        if (removeWishlist?.message == 'Removed From WishList') {
          if (Platform.OS === 'android') {
            common_fn.showToast('Wishlist Removed Successfully');
          } else {
            alert('Wishlist Removed Successfully');
          }
        }
      } else {
        const addWishlist = await fetchData.add_to_wishlist(data);
        getApiData();
        if (addWishlist?.message == 'Success') {
          if (Platform.OS === 'android') {
            common_fn.showToast('Wishlist Added Successfully');
          } else {
            alert('Wishlist Added Successfully');
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setProcessingProducts(
        processingProducts.filter(productId => productId !== id),
      );
    }
  };

  const BuildershandleWishlist = async (id, isWishList) => {
    const cancelTokenSource = axios.CancelToken.source();

    setBuildersProcessingProducts(prevProcessingProducts => [
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
        setBuilderProducts(prevBuyData =>
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

        setBuilderProducts(prevBuyData =>
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
      setBuildersProcessingProducts(prevProcessingProducts =>
        prevProcessingProducts.filter(productId => productId !== id),
      );
    }
  };

  const getBannerData = async () => {
    try {
      const BannerData = await fetchData.Banner({});
      console.log('BannerData   ------------- :', JSON.stringify(BannerData));
      const filteredPopularBuilders = [];
      const filteredLoanOffers = [];
      // BannerData.forEach(item => {
      //   if (item?.category === 'popular_builders') {
      //     filteredPopularBuilders.push(item);
      //   } else if (item?.category === 'offer') {
      //     filteredLoanOffers.push(item);
      //   }
      // });
      setPopularBuilders(BannerData);
      setLoanOffers(filteredLoanOffers);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getBannerData();
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
  useEffect(() => {
    const percentage = profileCompletion(
      user_id,
      username,
      mobile_number,
      email,
    );
    setPercentage(percentage);
  }, []);
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
          setEmailContactVisible(true);
          SellerRBSheet.current.open();
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

  useEffect(() => {
    if (EmailContactVisible) {
      getApiData();
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
          alert('Complete Your Profile To Submit');
        }
      }
    } catch (error) {
      console.log('catch in update_Profile :', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.white}}>
      <Animated.SectionList
        sections={AgentSection}
        scrollEnabled={true}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{
          paddingTop: HeaderHeight,
          // paddingHorizontal: 10,
          minHeight: windowHeight - TabBarHeight,
        }}
        nestedScrollEnabled
        initialNumToRender={5}
        renderItem={({item}) => {
          switch (item) {
            case 'Property Buyers':
              return (
                <View style={{marginTop: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginVertical: 10,
                      marginHorizontal: 10,
                    }}>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Buyers who are looking for a property
                        </Text>
                      </View>
                    </View>
                  </View>
                  {Property_Buyers?.length > 0 ? (
                    <FlatList
                      data={Property_Buyers?.slice(0, 10)}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      renderItem={({item, index}) => {
                        return (
                          <View
                            key={index}
                            activeOpacity={0.5}
                            style={{
                              borderRadius: 5,
                              borderColor: Color.lightgrey,
                              borderWidth: 1,
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
                              marginHorizontal: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding: 10,
                                  backgroundColor: '#EEEEEE',
                                  borderRadius: 10,
                                }}>
                                <Image
                                  source={{uri: Media.Userpng}}
                                  key={index}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  padding: 5,
                                  flex: 1,
                                  marginHorizontal: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      color: 'black',
                                      fontFamily: Poppins.SemiBold,
                                    }}>
                                    {item.username != ''
                                      ? item.username
                                      : '---'}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: Color.green,
                                      fontFamily: Poppins.Medium,
                                      marginHorizontal: 10,
                                    }}>
                                    {item.user_type_id == '1'
                                      ? 'Buyer'
                                      : item.user_type_id == '2'
                                      ? 'Agent'
                                      : 'Builder'}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    width: 200,
                                    flexWrap: 'wrap',
                                    fontSize: 14,
                                    color: Color.darkGrey,
                                    fontFamily: Poppins.Medium,
                                    marginVertical: 5,
                                    textTransform: 'capitalize',
                                  }}
                                  numberOfLines={2}>
                                  {`needs ${item?.preference?.selectedPropertyType} for ${item?.preference?.userNeed} in ${item?.preference?.location}`}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontFamily: Poppins.Medium,
                                    marginVertical: 5,
                                  }}>
                                  {item.mobile_number
                                    .substring(0, 5)
                                    .concat('*****')}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (get_phone_quota != 0) {
                                      if (item?.isContacted) {
                                        // common_fn.showToast(
                                        //   'Phone number already sent for this property',
                                        // );
                                        SellerRBSheet.current.open();
                                      } else {
                                        sellerDetailWithProfile(item?.p_id);
                                      }
                                    } else {
                                      // navigation.navigate('UpgradeTab');
                                      setPhoneQuotoVisible(true);
                                    }
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: item?.isContacted
                                        ? Color.green
                                        : Color.primary,
                                      fontFamily: Poppins.Medium,
                                      textDecorationLine: 'underline',
                                    }}>
                                    {item?.isContacted
                                      ? 'Phone No Sent'
                                      : 'Get Phone Number'}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
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
                                  Your request is being shared with the{' '}
                                  {item?.user_type_id == '1'
                                    ? 'Buyer'
                                    : item?.user_type_id == '2'
                                    ? 'Agent'
                                    : 'Builder'}{' '}
                                  you still have {get_quota_value} to contact
                                </Text>
                              </View>
                            )}
                            <SenderModal
                              SellerRBSheet={SellerRBSheet}
                              item={item}
                              EmailContactVisible={EmailContactVisible}
                            />
                          </View>
                        );
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                        width: '100%',
                      }}>
                      <Image
                        source={{uri: Media.noProperty}}
                        style={{
                          width: 100,
                          height: 80,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          padding: 5,
                          paddingHorizontal: 20,
                          marginStart: 5,
                          borderRadius: 5,
                          marginVertical: 10,
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        No Properties Found
                      </Text>
                    </View>
                  )}
                  {Platform.OS == 'android' && (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 10,
                        padding: 10,
                      }}>
                      <ImageBackground
                        source={{uri: Media.dotBackground}}
                        resizeMode="contain"
                        style={{
                          height: 100,
                          width: '100%',
                        }}>
                        <View
                          style={{
                            position: 'absolute',
                            top: 10,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: Color.cloudyGrey,
                              textAlign: 'center',
                              alignSelf: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: Color.green,
                                textAlign: 'center',
                                alignSelf: 'center',
                              }}>
                              250+
                            </Text>{' '}
                            People are looking your property in last 24 days
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: Color.black,
                              textAlign: 'center',
                              alignSelf: 'center',
                            }}>
                            To Get more viewers upgrade your{' '}
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: Color.sunShade,
                                textAlign: 'center',
                                alignSelf: 'center',
                                textDecorationLine: 'underline',
                              }}
                              onPress={() => {
                                navigation.navigate('UpgradeTab');
                              }}>
                              AD Plan
                            </Text>
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  )}
                </View>
              );
            case 'New Property':
              return (
                NewProperty?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          New Property
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        Featured New Properties across{' '}
                        {AutoFilter?.length != '' ? AutoFilter : currentCity}
                      </Text>
                    </View>
                    <FlatList
                      data={NewProperty}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              // height: 140,
                              flexDirection: 'row',
                              margin: 5,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#a5a5a5',
                              marginHorizontal: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('SingleProperty', {
                                p_id: item.p_id,
                              });
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              {item?.images?.length > 0 &&
                              item?.images?.[0]?.image_url != '' ? (
                                <Image
                                  source={{
                                    uri: item?.images?.[0]?.image_url,
                                  }}
                                  key={index}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={{uri: Media.noImage}}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              )}
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                              <View style={{padding: 5}}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  {item?.property_type?.pt_name == 'PG'
                                    ? item?.property_type?.pt_name
                                    : item?.property_type?.pt_name == 'Flat' ||
                                      item?.property_type?.pt_name == 'Villa' ||
                                      item?.property_type?.pt_name == 'House'
                                    ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                    : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // marginHorizontal: 10,
                                  }}>
                                  <OIcon
                                    name={'location'}
                                    size={18}
                                    style={{color: '#666'}}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#333',
                                      fontFamily: Poppins.Medium,
                                      padding: 5,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.locality},${item?.location}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  {item?.property_type?.pt_name == 'PG' ? (
                                    <>
                                      <Icon
                                        name={'bed'}
                                        size={20}
                                        style={{color: '#666'}}
                                      />
                                      {item?.room_category?.map(item => {
                                        return (
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'flex-start',
                                              alignItems: 'center',
                                              marginStart: 5,
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: 'black',
                                                fontFamily: Poppins.Medium,
                                              }}>
                                              {`${item?.key},`}
                                            </Text>
                                          </View>
                                        );
                                      })}
                                    </>
                                  ) : (
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
                                        style={{color: '#666'}}
                                      />
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: 'black',
                                          fontFamily: Poppins.Medium,
                                          paddingHorizontal: 5,
                                        }}>
                                        {`${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.red,
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  ₹{' '}
                                  {item?.property_type?.pt_name == 'PG'
                                    ? common_fn.getMinToMaxPrice(
                                        item?.room_category,
                                      )
                                    : item?.expected_price?.length >= 5
                                    ? common_fn.formatNumberWithSuffix(
                                        item?.expected_price,
                                      )
                                    : item?.expected_price}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Builders Property':
              return (
                buildersProducts?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Builders Property
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        Builders Properties Across{' '}
                        {AutoFilter?.length != '' ? AutoFilter : currentCity}
                      </Text>
                    </View>
                    <FlatList
                      data={buildersProducts}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <View style={{flex: 1}}>
                            <TouchableOpacity
                              key={index}
                              activeOpacity={0.5}
                              style={{
                                marginHorizontal: 5,
                                borderWidth: 1,
                                borderColor: Color.lightgrey,
                              }}
                              onPress={() => {
                                navigation.navigate('SingleProperty', {
                                  p_id: item.p_id,
                                });
                              }}>
                              <View>
                                {item?.images?.length > 0 &&
                                item?.images?.[0]?.image_url != '' ? (
                                  <Image
                                    source={{
                                      uri: item?.images?.[0]?.image_url,
                                    }}
                                    key={index}
                                    style={{
                                      width: 250,
                                      height: 250,
                                      resizeMode: 'cover',
                                      borderRadius: 10,
                                      opacity: 0.7,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={{uri: Media.noImage}}
                                    style={{
                                      width: 250,
                                      height: 250,
                                      resizeMode: 'contain',
                                      borderRadius: 10,
                                      opacity: 0.7,
                                    }}
                                  />
                                )}
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    height: 30,
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    right: 10,
                                  }}>
                                  <TouchableOpacity
                                    style={{
                                      width: 40,
                                      height: 40,
                                      backgroundColor: Color.white,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 100,
                                      padding: 10,
                                      marginRight: 10,
                                    }}
                                    onPress={() => {
                                      BuildershandleWishlist(
                                        item.p_id,
                                        item?.isWishListed,
                                      );
                                    }}>
                                    {buildersProcessingProducts.includes(
                                      item.p_id,
                                    ) ? (
                                      <ActivityIndicator
                                        size="small"
                                        color={Color.primary}
                                      />
                                    ) : (
                                      <Icon
                                        name={
                                          item?.isWishListed
                                            ? 'heart'
                                            : 'heart-outline'
                                        }
                                        size={18}
                                        color={
                                          item?.isWishListed
                                            ? Color.primary
                                            : Color.black
                                        }
                                      />
                                    )}
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                    bottom: 0,
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      justifyContent: 'space-around',
                                      alignItems: 'center',
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                      }}>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 16,
                                          color: Color.white,
                                          fontFamily: Poppins.SemiBold,
                                          textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}>
                                        {item.property_name?.length > 0
                                          ? item.property_name
                                          : '----'}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                      }}>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 12,
                                          color: Color.white,
                                          fontFamily: Poppins.Medium,
                                          textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}>
                                        {`${item.location} , ${item.locality}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                      }}>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 12,
                                          color: Color.white,
                                          fontFamily: Poppins.Medium,
                                          textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}>
                                        {`${item.address}`}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginHorizontal: 5,
                                      }}>
                                      <Text
                                        style={{
                                          flex: 1,
                                          fontSize: 12,
                                          color: Color.white,
                                          fontFamily: Poppins.Medium,
                                          textTransform: 'capitalize',
                                        }}
                                        numberOfLines={1}>
                                        {`${item.availability}`}
                                      </Text>
                                    </View>
                                  </View>
                                  <View>
                                    <Text
                                      style={{
                                        fontSize: 18,
                                        color: Color.primary,
                                        fontFamily: Poppins.SemiBold,
                                      }}
                                      numberOfLines={1}>
                                      ₹
                                      {item?.property_type?.pt_name == 'PG'
                                        ? common_fn.getMinToMaxPrice(
                                            item?.room_category,
                                          )
                                        : item?.expected_price?.length >= 5
                                        ? common_fn.formatNumberWithSuffix(
                                            item?.expected_price,
                                          )
                                        : item?.expected_price}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: Color.primary,
                                        fontFamily: Poppins.SemiBold,
                                      }}>
                                      Onwards
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Featured Property':
              return (
                FeaturedProducts?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Featured Property
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        Featured Properties Across{' '}
                        {AutoFilter?.length != '' ? AutoFilter : currentCity}
                      </Text>
                    </View>
                    <FlatList
                      data={FeaturedProducts}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <View style={{flex: 1}}>
                            <TouchableOpacity
                              key={index}
                              activeOpacity={0.5}
                              style={{
                                width: 250,
                                height: 250,
                                marginHorizontal: 10,
                                borderRadius: 5,
                                borderColor: Color.lightgrey,
                                borderWidth: 1,
                                backgroundColor: Color.white,
                              }}
                              onPress={() => {
                                navigation.navigate('SingleProperty', {
                                  p_id: item.p_id,
                                });
                              }}>
                              <View>
                                {item?.images?.length > 0 &&
                                item?.images?.[0]?.image_url != '' ? (
                                  <Image
                                    source={{
                                      uri: item?.images?.[0]?.image_url,
                                    }}
                                    key={index}
                                    style={{
                                      width: 250,
                                      height: 150,
                                      resizeMode: 'cover',
                                      borderTopLeftRadius: 5,
                                      borderTopRightRadius: 5,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={{uri: Media.noImage}}
                                    style={{
                                      width: 250,
                                      height: 150,
                                      resizeMode: 'contain',
                                      borderTopLeftRadius: 5,
                                      borderTopRightRadius: 5,
                                    }}
                                  />
                                )}
                                <View
                                  style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                  }}>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      alignItems: 'flex-start',
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
                                            marginStart: 5,
                                            borderRadius: 5,
                                            paddingTop: 7,
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
                                      alignItems: 'flex-end',
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        height: 30,
                                        position: 'absolute',
                                        top: 0,
                                        left: 10,
                                        right: 0,
                                      }}>
                                      <TouchableOpacity
                                        style={{
                                          width: 40,
                                          height: 40,
                                          backgroundColor: Color.lightgrey,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          borderRadius: 100,
                                          padding: 10,
                                          marginRight: 10,
                                        }}
                                        onPress={() => {
                                          handleWishlist(
                                            item.p_id,
                                            item?.isWishListed,
                                          );
                                        }}>
                                        {processingProducts.includes(
                                          item.p_id,
                                        ) ? (
                                          <ActivityIndicator
                                            size="small"
                                            color={Color.primary}
                                          />
                                        ) : (
                                          <Icon
                                            name={
                                              item?.isWishListed
                                                ? 'heart'
                                                : 'heart-outline'
                                            }
                                            size={18}
                                            color={
                                              item?.isWishListed
                                                ? Color.primary
                                                : Color.black
                                            }
                                          />
                                        )}
                                      </TouchableOpacity>
                                    </View>
                                    {/* <View
                                          style={{
                                            flex: 1,
                                            // backgroundColor: Color.darkGrey,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            padding: 5,
                                            borderRadius: 5,
                                            marginTop: 50,
                                          }}>
                                          <Icon
                                            name="images"
                                            size={25}
                                            color={Color.white}
                                          />
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              color: Color.primary,
                                              fontStyle: 'normal',
                                              fontFamily: Poppins.SemiBold,
                                              marginHorizontal: 10,
                                            }}>
                                            {item?.images?.length}
                                          </Text>
                                        </View> */}
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'space-around',
                                  alignItems: 'center',
                                  padding: 5,
                                }}>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 12,
                                      color: '#666',
                                      fontFamily: Poppins.Medium,
                                    }}
                                    numberOfLines={1}>
                                    {item?.property_type?.pt_name == 'PG'
                                      ? item?.property_type?.pt_name
                                      : item?.property_type?.pt_name ==
                                          'Flat' ||
                                        item?.property_type?.pt_name ==
                                          'Villa' ||
                                        item?.property_type?.pt_name == 'House'
                                      ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                      : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                  </Text>
                                  {/* <F5Icon
                                      name="crown"
                                      size={18}
                                      color={Color.sunShade}
                                    /> */}
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  {/* <Text
                                      style={{
                                        flex: 1,
                                        fontSize: 16,
                                        color: Color.black,
                                        fontFamily: Poppins.SemiBold,
                                        textTransform: "capitalize"
                                      }}
                                      numberOfLines={1}>
                                      {item.property_name?.length > 0
                                        ? item.property_name
                                        : '----'}
                                    </Text> */}
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 18,
                                      color: Color.primary,
                                      fontFamily: Poppins.SemiBold,
                                    }}
                                    numberOfLines={1}>
                                    ₹
                                    {item?.property_type?.pt_name == 'PG'
                                      ? common_fn.getMinToMaxPrice(
                                          item?.room_category,
                                        )
                                      : item?.expected_price?.length >= 5
                                      ? common_fn.formatNumberWithSuffix(
                                          item?.expected_price,
                                        )
                                      : item?.expected_price}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      fontFamily: Poppins.Medium,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item.location} , ${item.locality}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    // flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginHorizontal: 5,
                                    // padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      flex: 1,
                                      fontSize: 12,
                                      color: Color.cloudyGrey,
                                      fontFamily: Poppins.Medium,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.facing} Facing`}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Related Property':
              return (
                relatedViewed?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Related Property
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Related Properties Across{' '}
                        {AutoFilter?.length != '' ? AutoFilter : currentCity}
                      </Text>
                    </View>
                    <FlatList
                      data={relatedViewed}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              // height: 140,
                              flexDirection: 'row',
                              margin: 5,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#a5a5a5',
                              marginHorizontal: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('SingleProperty', {
                                p_id: item.p_id,
                              });
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              {item?.images?.length > 0 &&
                              item?.images?.[0]?.image_url != '' ? (
                                <Image
                                  source={{
                                    uri: item?.images?.[0]?.image_url,
                                  }}
                                  key={index}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={{uri: Media.noImage}}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              )}
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                              <View style={{padding: 5}}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  {item?.property_type?.pt_name == 'PG'
                                    ? item?.property_type?.pt_name
                                    : item?.property_type?.pt_name == 'Flat' ||
                                      item?.property_type?.pt_name == 'Villa' ||
                                      item?.property_type?.pt_name == 'House'
                                    ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                    : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // marginHorizontal: 10,
                                  }}>
                                  <OIcon
                                    name={'location'}
                                    size={18}
                                    style={{color: '#666'}}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#333',
                                      fontFamily: Poppins.Medium,
                                      padding: 5,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.locality},${item?.location}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  {item?.property_type?.pt_name == 'PG' ? (
                                    <>
                                      <Icon
                                        name={'bed'}
                                        size={20}
                                        style={{color: '#666'}}
                                      />
                                      {item?.room_category?.map(item => {
                                        return (
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'flex-start',
                                              alignItems: 'center',
                                              marginStart: 5,
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: 'black',
                                                fontFamily: Poppins.Medium,
                                              }}>
                                              {`${item?.key},`}
                                            </Text>
                                          </View>
                                        );
                                      })}
                                    </>
                                  ) : (
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
                                        style={{color: '#666'}}
                                      />
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: 'black',
                                          fontFamily: Poppins.Medium,
                                          paddingHorizontal: 5,
                                        }}>
                                        {`${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.red,
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  ₹{' '}
                                  {item?.property_type?.pt_name == 'PG'
                                    ? common_fn.getMinToMaxPrice(
                                        item?.room_category,
                                      )
                                    : item?.expected_price?.length >= 5
                                    ? common_fn.formatNumberWithSuffix(
                                        item?.expected_price,
                                      )
                                    : item?.expected_price}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'HotDeals':
              return (
                <View style={{marginTop: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginHorizontal: 10,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Hot deals for you
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          marginVertical: 10,
                        }}
                        onPress={() => {
                          navigation.navigate('bestOffers', {
                            BestOffers: HotDeals,
                            routename: 'Hot Deals',
                          });
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.primary,
                            fontStyle: 'normal',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          View all
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={HotDeals}
                    removeClippedSubviews={true}
                    initialNumToRender={2}
                    maxToRenderPerBatch={1}
                    updateCellsBatchingPeriod={100}
                    windowSize={7}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, index}) => {
                      const twentyFourHoursAgo = moment(
                        new Date() - 24 * 60 * 60 * 1000,
                      ).format('YYYY-MM-DD');
                      const createdAt = moment(item?.created_at).format(
                        'YYYY-MM-DD',
                      );
                      const newItem = twentyFourHoursAgo > createdAt;
                      let bedroomValue = '';
                      let bathValue = '';
                      let balconyValue = '';
                      let parkingValue = '';
                      if (
                        item &&
                        item?.features &&
                        Array?.isArray(item?.features)
                      ) {
                        item?.features?.forEach(feature => {
                          if (feature?.title?.toLowerCase() === 'bedroom') {
                            bedroomValue = feature.value;
                          }
                          if (feature?.title?.toLowerCase() === 'baths') {
                            bathValue = feature.value;
                          }
                          if (feature?.title?.toLowerCase() === 'balcony') {
                            balconyValue = feature.value;
                          }
                        });
                      } else if (
                        item &&
                        item.amenities &&
                        Array.isArray(item.amenities)
                      ) {
                        item.amenities.forEach(amenity => {
                          if (amenity.title.toLowerCase() === 'Parking') {
                            parkingValue = amenity.key;
                          }
                        });
                      }
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            // height: 140,
                            flexDirection: 'row',
                            margin: 5,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#a5a5a5',
                            marginHorizontal: 10,
                          }}
                          onPress={() => {
                            navigation.navigate('SingleProperty', {
                              p_id: item.p_id,
                            });
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              height: 30,
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              right: 5,
                            }}>
                            <TouchableOpacity
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: Color.lightgrey,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 100,
                                padding: 10,
                                marginRight: 10,
                              }}
                              onPress={() => {
                                handleWishlist(item.p_id, item?.isWishListed);
                              }}>
                              {processingProducts.includes(item.p_id) ? (
                                <ActivityIndicator
                                  size="small"
                                  color={Color.primary}
                                />
                              ) : (
                                <Icon
                                  name={
                                    item?.isWishListed
                                      ? 'heart'
                                      : 'heart-outline'
                                  }
                                  size={18}
                                  color={
                                    item?.isWishListed
                                      ? Color.primary
                                      : Color.black
                                  }
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              // flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 10,
                            }}>
                            {item?.images?.length > 0 &&
                            item?.images?.[0]?.image_url != '' ? (
                              <Image
                                source={{
                                  uri: item?.images?.[0]?.image_url,
                                }}
                                key={index}
                                style={{
                                  width: 100,
                                  height: 100,
                                  resizeMode: 'cover',
                                  borderRadius: 10,
                                }}
                              />
                            ) : (
                              <Image
                                source={{uri: Media.noImage}}
                                style={{
                                  width: 100,
                                  height: 100,
                                  resizeMode: 'cover',
                                  borderRadius: 10,
                                }}
                              />
                            )}
                          </View>
                          <View style={{alignItems: 'flex-start'}}>
                            <View style={{padding: 5}}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: 'black',
                                  fontFamily: Poppins.SemiBold,
                                  padding: 5,
                                  paddingTop: 5,
                                }}
                                numberOfLines={1}>
                                {item?.property_type?.pt_name == 'PG'
                                  ? item?.property_type?.pt_name
                                  : item?.property_type?.pt_name == 'Flat' ||
                                    item?.property_type?.pt_name == 'Villa' ||
                                    item?.property_type?.pt_name == 'House'
                                  ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                  : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginHorizontal: 10,
                                  width: '100%',
                                }}>
                                <OIcon
                                  name={'location'}
                                  size={18}
                                  style={{color: '#666'}}
                                />
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: '#333',
                                    fontFamily: Poppins.Medium,
                                    padding: 5,
                                    textTransform: 'capitalize',
                                  }}
                                  numberOfLines={1}>
                                  {`${item?.locality},${item?.location}`}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  // justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                {item?.property_type?.pt_name == 'PG' ? (
                                  <>
                                    <Icon
                                      name={'bed'}
                                      size={20}
                                      style={{color: '#666'}}
                                    />
                                    {item?.room_category?.map(item => {
                                      return (
                                        <View
                                          style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginStart: 5,
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: 'black',
                                              fontFamily: Poppins.Medium,
                                            }}>
                                            {`${item?.key},`}
                                          </Text>
                                        </View>
                                      );
                                    })}
                                  </>
                                ) : (
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
                                      style={{color: '#666'}}
                                    />
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'black',
                                        fontFamily: Poppins.Medium,
                                        paddingHorizontal: 5,
                                      }}>
                                      {`${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                                    </Text>
                                  </View>
                                )}
                              </View>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: Color.red,
                                  fontFamily: Poppins.SemiBold,
                                  padding: 5,
                                  paddingTop: 5,
                                }}
                                numberOfLines={1}>
                                ₹{' '}
                                {item?.property_type?.pt_name == 'PG'
                                  ? common_fn.getMinToMaxPrice(
                                      item?.room_category,
                                    )
                                  : item?.expected_price?.length >= 5
                                  ? common_fn.formatNumberWithSuffix(
                                      item?.expected_price,
                                    )
                                  : item?.expected_price}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                    ListEmptyComponent={() => {
                      return (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 10,
                            width: '100%',
                          }}>
                          <Image
                            source={{uri: Media.noProperty}}
                            style={{
                              width: 100,
                              height: 80,
                              resizeMode: 'contain',
                            }}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 5,
                              paddingHorizontal: 20,
                              marginStart: 5,
                              borderRadius: 5,
                              marginVertical: 10,
                              color: Color.primary,
                              fontFamily: Poppins.SemiBold,
                            }}>
                            No Properties Found
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              );
            case 'Recent Property':
              return (
                recentlyViewed?.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <View style={{marginVertical: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: Poppins.SemiBold,
                          marginHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        Recent Search
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginHorizontal: 10,
                        }}>
                        Recent Lookups related to your interests
                      </Text>
                    </View>
                    <FlatList
                      data={recentlyViewed}
                      horizontal={true}
                      removeClippedSubviews={true}
                      initialNumToRender={2}
                      maxToRenderPerBatch={1}
                      updateCellsBatchingPeriod={100}
                      windowSize={7}
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item, index}) => {
                        const twentyFourHoursAgo = moment(
                          new Date() - 24 * 60 * 60 * 1000,
                        ).format('YYYY-MM-DD');
                        const createdAt = moment(item?.created_at).format(
                          'YYYY-MM-DD',
                        );
                        const newItem = twentyFourHoursAgo > createdAt;
                        let bedroomValue = '';
                        let bathValue = '';
                        let balconyValue = '';
                        let parkingValue = '';
                        if (
                          item &&
                          item?.features &&
                          Array?.isArray(item?.features)
                        ) {
                          item?.features?.forEach(feature => {
                            if (feature?.title?.toLowerCase() === 'bedroom') {
                              bedroomValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'baths') {
                              bathValue = feature.value;
                            }
                            if (feature?.title?.toLowerCase() === 'balcony') {
                              balconyValue = feature.value;
                            }
                          });
                        } else if (
                          item &&
                          item.amenities &&
                          Array.isArray(item.amenities)
                        ) {
                          item.amenities.forEach(amenity => {
                            if (amenity.title.toLowerCase() === 'Parking') {
                              parkingValue = amenity.key;
                            }
                          });
                        }
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              // height: 140,
                              flexDirection: 'row',
                              margin: 5,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#a5a5a5',
                              marginHorizontal: 10,
                            }}
                            onPress={() => {
                              navigation.navigate('SingleProperty', {
                                p_id: item.p_id,
                              });
                            }}>
                            <View
                              style={{
                                // flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              {item?.images?.length > 0 &&
                              item?.images?.[0]?.image_url != '' ? (
                                <Image
                                  source={{
                                    uri: item?.images?.[0]?.image_url,
                                  }}
                                  key={index}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              ) : (
                                <Image
                                  source={{uri: Media.noImage}}
                                  style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                  }}
                                />
                              )}
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                              <View style={{padding: 5}}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  {item?.property_type?.pt_name == 'PG'
                                    ? item?.property_type?.pt_name
                                    : item?.property_type?.pt_name == 'Flat' ||
                                      item?.property_type?.pt_name == 'Villa' ||
                                      item?.property_type?.pt_name == 'House'
                                    ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                                    : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // marginHorizontal: 10,
                                  }}>
                                  <OIcon
                                    name={'location'}
                                    size={18}
                                    style={{color: '#666'}}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#333',
                                      fontFamily: Poppins.Medium,
                                      padding: 5,
                                      textTransform: 'capitalize',
                                    }}
                                    numberOfLines={1}>
                                    {`${item?.locality},${item?.location}`}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}>
                                  {item?.property_type?.pt_name == 'PG' ? (
                                    <>
                                      <Icon
                                        name={'bed'}
                                        size={20}
                                        style={{color: '#666'}}
                                      />
                                      {item?.room_category?.map(item => {
                                        return (
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              justifyContent: 'flex-start',
                                              alignItems: 'center',
                                              marginStart: 5,
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                color: 'black',
                                                fontFamily: Poppins.Medium,
                                              }}>
                                              {`${item?.key},`}
                                            </Text>
                                          </View>
                                        );
                                      })}
                                    </>
                                  ) : (
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
                                        style={{color: '#666'}}
                                      />
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: 'black',
                                          fontFamily: Poppins.Medium,
                                          paddingHorizontal: 5,
                                        }}>
                                        {`${item?.area?.super_area} ${item?.area?.super_area_unit}`}
                                      </Text>
                                    </View>
                                  )}
                                </View>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.red,
                                    fontFamily: Poppins.SemiBold,
                                    padding: 5,
                                    paddingTop: 5,
                                  }}
                                  numberOfLines={1}>
                                  ₹{' '}
                                  {item?.property_type?.pt_name == 'PG'
                                    ? common_fn.getMinToMaxPrice(
                                        item?.room_category,
                                      )
                                    : item?.expected_price?.length >= 5
                                    ? common_fn.formatNumberWithSuffix(
                                        item?.expected_price,
                                      )
                                    : item?.expected_price}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )
              );
            case 'Property Selling':
              return (
                <View style={{marginTop: 15}}>
                  <View style={{marginVertical: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginStart: 10,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Simple Process For Selling Your Property
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#666',
                        marginStart: 10,
                        marginVertical: 5,
                      }}>
                      Get best deals from prime membership
                    </Text>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {Property_Selling.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: 5,
                            marginHorizontal: 10,
                          }}>
                          <View
                            style={{
                              width: 300,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: '#FFA825',
                              padding: 5,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                }}>
                                <LinearGradient
                                  colors={['#FFA825', '#FFA82530']}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: Color.black,
                                      fontFamily: 'Lato',
                                      fontWeight: '500',
                                    }}>
                                    {item.step}
                                  </Text>
                                </LinearGradient>
                              </View>
                              <Image
                                source={{uri: item.image}}
                                style={{
                                  width: 80,
                                  height: 80,
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.black,
                                fontFamily: Poppins.Medium,
                                marginStart: 10,
                                marginVertical: 5,
                              }}>
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Poppins.Medium,
                                marginStart: 10,
                                marginVertical: 5,
                              }}
                              numberOfLines={2}>
                              {item.description}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              );
            // case 'Popular Builders':
            //   return (
            //     <View style={{ marginTop: 15 }}>
            //       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            //         {popularBuilders.map((item, index) => {
            //           return (
            //             <View
            //               key={index}
            //               style={{
            //                 marginVertical: 10,
            //                 flexDirection: 'row',
            //                 alignItems: 'center',
            //                 margin: 5,
            //                 marginHorizontal: 10,
            //               }}>
            //               <Image
            //                 source={{
            //                   uri:
            //                     //  base_banners_image_url +
            //                     item.img_name,
            //                 }}
            //                 style={{
            //                   height: 150,
            //                   width: 250,
            //                   resizeMode: 'contain',
            //                   borderRadius: 10,
            //                 }}
            //               />
            //             </View>
            //           );
            //         })}
            //       </ScrollView>
            //     </View>
            //   );
            // case 'Latest News':
            //   return (
            //     <View style={{marginTop: 15}}>
            //       <View
            //         style={{
            //           flexDirection: 'row',
            //           alignItems: 'flex-start',
            //           marginVertical: 10,
            //           marginHorizontal: 10,
            //         }}>
            //         <View style={{flex: 1, marginStart: 10}}>
            //           <Text
            //             style={{
            //               fontSize: 16,
            //               color: 'black',
            //               fontFamily: Poppins.SemiBold,
            //             }}>
            //             Latest News
            //           </Text>
            //           <Text
            //             style={{
            //               width: '95%',
            //               fontSize: 10,
            //               paddingVertical: 5,
            //               color: Color.cloudyGrey,
            //             }}>
            //             Read best and latest News
            //           </Text>
            //         </View>
            //       </View>
            //       {LatestNews.length > 0 &&
            //         LatestNews.map((item, index) => {
            //           return (
            //             <TouchableOpacity
            //               onPress={() => {
            //                 if (item?.blog_url != undefined) {
            //                   Linking.openURL(item?.blog_url);
            //                 }
            //               }}
            //               key={index}
            //               style={{
            //                 flexDirection: 'row',
            //                 padding: 5,
            //                 borderRadius: 5,
            //                 borderWidth: 1,
            //                 borderColor: Color.lightgrey,
            //                 backgroundColor: '#F5F5F5',
            //                 marginVertical: 5,
            //                 marginHorizontal: 10,
            //               }}>
            //               {item?.blog_image?.length != '' ? (
            //                 <Image
            //                   source={
            //                     item?.blog_image == undefined
            //                       ? Media.noImage
            //                       : {
            //                           uri: item?.blog_image,
            //                         }
            //                   }
            //                   style={{
            //                     width: 120,
            //                     height: 120,
            //                     resizeMode: 'cover',
            //                     borderRadius: 5,
            //                   }}
            //                 />
            //               ) : (
            //                 <Image
            //                   source={Media.noImage}
            //                   style={{
            //                     width: 120,
            //                     height: 120,
            //                     resizeMode: 'cover',
            //                     borderRadius: 5,
            //                   }}
            //                 />
            //               )}
            //               <View
            //                 style={{flex: 1, marginHorizontal: 5, padding: 10}}>
            //                 <Text
            //                   style={{
            //                     fontSize: 14,
            //                     fontFamily: Poppins.Medium,
            //                     color: Color.black,
            //                     textAlign: 'justify',
            //                     lineHeight: 16,
            //                     textTransform: 'capitalize',
            //                   }}
            //                   numberOfLines={2}>
            //                   {item.blog_title}
            //                 </Text>
            //                 <Text
            //                   style={{
            //                     fontSize: 12,
            //                     fontFamily: Poppins.Medium,
            //                     color: Color.cloudyGrey,
            //                     textAlign: 'justify',
            //                     lineHeight: 16,
            //                     textTransform: 'capitalize',
            //                   }}
            //                   numberOfLines={3}>
            //                   {item.blog_content}
            //                 </Text>
            //                 <View
            //                   style={{
            //                     flex: 1,
            //                     marginVertical: 10,
            //                     flexDirection: 'row',
            //                     alignItems: 'flex-end',
            //                     justifyContent: 'flex-end',
            //                   }}>
            //                   <View
            //                     style={{
            //                       flex: 1,
            //                       flexDirection: 'row',
            //                       alignItems: 'center',
            //                       justifyContent: 'center',
            //                     }}>
            //                     <FIcon
            //                       name="calendar"
            //                       size={16}
            //                       color={Color.primary}
            //                     />
            //                     <Text
            //                       style={{
            //                         marginHorizontal: 5,
            //                         fontSize: 12,
            //                         fontFamily: Poppins.Medium,
            //                         color: Color.black,
            //                       }}>
            //                       {item.created_at}
            //                     </Text>
            //                   </View>
            //                   {/* <View
            //                     style={{
            //                       flexDirection: 'row',
            //                       alignItems: 'center',
            //                       justifyContent: 'center',
            //                     }}>
            //                     <Icon
            //                       name="person"
            //                       size={16}
            //                       color={Color.primary}
            //                     />
            //                     <Text
            //                       style={{
            //                         marginHorizontal: 5,
            //                         fontSize: 12,
            //                         fontFamily: Poppins.Medium,
            //                         color: Color.black,
            //                       }}>
            //                       {item.userName}
            //                     </Text>
            //                   </View> */}
            //                 </View>
            //               </View>
            //             </TouchableOpacity>
            //           );
            //         })}
            //     </View>
            //   );
          }
        }}
      />

      {/* {EmailContactVisible && (
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
            Your request is being shared with the Owner
          </Text>
        </View>
      )} */}
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
      {loginEnable == true && (
        <BottomLogin login={loginEnable} setLogin={setLoginEnable} />
      )}
    </SafeAreaView>
  );
};

const HomeScreen = ({navigation}) => {
  const [tabIndex, setIndex] = useState(0);
  const [tabAgentIndex, setAgentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);
  const [currentCity, setCurrentCity] = useState('');
  const [currentCityid, setCurrentCityid] = useState('');
  const [nearByLocality, setNearByLocality] = useState([]);
  const [searchIndex, setSearchIndex] = React.useState(0);
  const placeholderText = ['Villa', 'House', 'Flat', 'Plot', 'Shop'];
  const [BestOffers, setBestOffers] = useState([]);
  const [HotDeals, setHotDeals] = useState([]);
  const [Property_Buyers, setProperty_Buyers] = useState([]);
  const [Property_Selling, setProperty_Selling] = useState([
    {
      id: 1,
      step: '01',
      name: 'Post Your Property',
      description:
        'Click "Post Your Property": Start by clicking on the "Post Your Property" button.',
      image: Media.userInfo,
    },
    {
      id: 2,
      step: '02',
      name: 'Provide Information',
      description:
        'Provide User Information: Fill in your user information and provide essential details about your property, such as location, size, and amenities.',
      image: Media.PropertyInfo,
    },
    {
      id: 3,
      step: '03',
      name: 'Add Photos & Info',
      description:
        'Upload Property Images: Showcase your property by uploading high-quality images that highlight its best features.',
      image: Media.postImage,
    },
    {
      id: 4,
      step: '04',
      name: 'landmarks Near Your Property',
      description:
        ' Include Landmarks: Mention nearby landmarks or key identifiers to help potential clients easily locate your property.',
      image: Media.userInfo,
    },
    {
      id: 5,
      step: '05',
      name: 'Review Your Property',
      description:
        'Review and Submit: Once you have filled out all the necessary details and uploaded images, review your listing. Make sure all the information is accurate.',
      image: Media.postReview,
    },
    {
      id: 6,
      step: '06',
      name: 'Publish Your Property',
      description:
        ' Submit for Review: After a final check, submit your property listing for review. Our team will assess it, and once approved, it will be posted on Albion for potential clients to explore.',
      image: Media.Publish,
    },
  ]);
  const [nearByProperty, setNearByProperty] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [NewProperty, setNewProperty] = useState([]);
  const [FeaturedProducts, setFeaturedProducts] = useState([]);
  const [buildersProducts, setBuilderProducts] = useState([]);
  const [mostlyViewed, setMostlyViewed] = useState([]);
  const [relatedViewed, setRelatedViewed] = useState([]);

  const [get_quota_value, setGet_quota_value] = useState('');
  const AutoFilter = useSelector(state => state.UserReducer.AutoFilter);
  const filter_data = useSelector(state => state.UserReducer.filterLocation);
  const userData = useSelector(state => state.UserReducer.userData);
  const EditVisible = useSelector(state => state.UserReducer.editUserVisible);
  var {
    user_id,
    user_type_id,
    username,
    mobile_number,
    email,
    // get_phone_quota,
    post_quota,
  } = userData;

  const dispatch = useDispatch();
  const [plot_type_data, setPlot_type_data] = useState({
    visible: false,
    data: {},
  });

  const [phoneQuotoVisible, setPhoneQuotoVisible] = useState(false);
  const [loginEnable, setLoginEnable] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const animated = useRef(new Animated.Value(0)).current;
  const tabBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    if (
      user_id == undefined ||
      (userData?.length > 0 && userData == undefined)
    ) {
      Animated.timing(animated, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, []);
  const [routes] = useState([
    {id: 1, title: 'Buy'},
    {id: 2, title: 'Rent'},
    // {id: 3, title: 'PG'},
    {id: 3, title: 'Commercial'},
  ]);
  const [sellingTypes] = useState([
    {
      id: 1,
      name: 'Plot',
      image: Media.types_plot,
    },
    {
      id: 2,
      name: 'Flat',
      image: Media.types_flat,
    },
    {
      id: 3,
      name: 'Shop',
      image: Media.types_shop,
    },
    {
      id: 4,
      name: 'House',
      image: Media.types_house,
    },
    {
      id: 5,
      name: 'Villa',
      image: Media.types_villa,
    },
    {
      id: 6,
      name: 'Office',
      image: Media.types_office,
    },
  ]);
  const [Banner] = useState([
    {
      id: 1,
      image: Media.Banner,
    },
    {
      id: 2,
      image: Media.Banner,
    },
    {
      id: 3,
      image: Media.Banner,
    },
    {
      id: 4,
      image: Media.Banner,
    },
  ]);
  const [BuySection] = useState([
    {id: 1, title: 'Best Offers', data: ['Best Offers']},
    {id: 2, title: 'New Property', data: ['New Property']},
    {id: 3, title: 'Selling Types', data: ['Selling Types']},
    {id: 4, title: 'Builders Property', data: ['Builders Property']},
    {id: 5, title: 'Featured Property', data: ['Featured Property']},
    {id: 6, title: 'Related Property', data: ['Related Property']},
    {id: 7, title: 'Property Services', data: ['Property Services']},
    {id: 8, title: 'NearBy Location', data: ['NearBy Location']},
    {id: 9, title: 'Recent Property', data: ['Recent Property']},
    {id: 10, title: 'Most Viewed', data: ['Most Viewed']},
    {id: 11, title: 'Our Loan Offers', data: ['Our Loan Offers']},
    {id: 12, title: 'Popular Builders', data: ['Popular Builders']},
    {id: 13, title: 'post Ad', data: ['post Ad']},
    {id: 14, title: 'Banner', data: ['Banner']},
    {id: 15, title: 'Latest News', data: ['Latest News']},
    {id: 16, title: 'Feedback', data: ['Feedback']},
  ]);
  const [AgentSection] = useState([
    {id: 1, title: 'Property Buyers', data: ['Property Buyers']},
    {id: 2, title: 'New Property', data: ['New Property']},
    {id: 3, title: 'Builders Property', data: ['Builders Property']},
    {id: 4, title: 'Featured Property', data: ['Featured Property']},
    {id: 5, title: 'Related Property', data: ['Related Property']},
    {id: 6, title: 'Property Services', data: ['Property Services']},
    {id: 7, title: 'HotDeals', data: ['HotDeals']},
    {id: 8, title: 'Recent Property', data: ['Recent Property']},
    {id: 9, title: 'Most Viewed', data: ['Most Viewed']},
    {id: 10, title: 'Property Selling', data: ['Property Selling']},
    {id: 11, title: 'Popular Builders', data: ['Popular Builders']},
    {id: 12, title: 'Latest News', data: ['Latest News']},
    {id: 13, title: 'Feedback', data: ['Feedback']},
  ]);
  const [propertyServices] = useState([
    {
      id: 1,
      image: Media.package_movers,
      name: 'Package Movers',
      navigate: 'PackersMovers',
    },
    {
      id: 2,
      image: Media.Home_interior,
      name: 'Home Interior',
      navigate: 'HomeInterior',
    },
    {
      id: 3,
      image: Media.Legal_service,
      name: 'Legal Service',
      navigate: 'LegalServices',
    },
    {
      id: 4,
      image: Media.Free_Rent_Agreement,
      name: 'Free Rent Agreement',
      navigate: 'FreeRentAgreement',
    },
    {
      id: 5,
      image: Media.Albion_advocate,
      name: 'Albion Advocate',
      navigate: 'AdvocateOnCall',
    },
    {
      id: 6,
      image: Media.Property_valuation,
      name: 'Property Valuation',
      navigate: 'Prop_Valuation',
    },
    {
      id: 7,
      image: Media.Tenant_verification,
      name: 'Tenant Verification',
      navigate: 'TenantVerification',
    },
    {
      id: 8,
      image: Media.Property_astrologer,
      name: 'Property Astrologer',
      navigate: 'Astrology',
    },
  ]);

  useEffect(() => {
    const onScrollListener = ({value}) => {
      const currentRoute = routes[tabIndex];

      if (currentRoute) {
        const curRouteKey = currentRoute?.id;
        listOffset.current[curRouteKey] = value;
      }
    };

    scrollY.addListener(onScrollListener);

    return () => {
      scrollY.removeAllListeners();
    };
  }, [scrollY, routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex]?.id;

    listRefArr.current.forEach(item => {
      if (item?.id !== curRouteKey) {
        const isBelowHeader = scrollY._value >= HeaderHeight;

        if (
          isBelowHeader &&
          (listOffset.current[item?.id] < HeaderHeight ||
            listOffset.current[item?.id] == null)
        ) {
          item.value?.scrollToOffset({
            offset: HeaderHeight,
            animated: false,
          });

          listOffset.current[item?.id] = HeaderHeight;
        } else if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          item.value?.scrollToOffset({
            offset: scrollY._value,
            animated: false,
          });

          listOffset.current[item?.id] = scrollY._value;
        }
      }
    });
  };

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

  const getTripData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserState');
      if (value !== null) {
        dispatch(setAsync(JSON.parse(value)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPropertyData = async () => {
    try {
      const value = await AsyncStorage.getItem('PropertyState');
      if (value !== null) {
        dispatch(setPropertyAsync(JSON.parse(value)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const dataPayload = () => {
    const params = new URLSearchParams();
    const payload = {
      location: AutoFilter || currentCity,
      user_id,
    };

    for (const key in payload) {
      if (payload[key] != null && payload[key]?.length > 0) {
        params.append(key, payload[key]);
      }
    }

    const queryString = params.toString();
    const query = queryString.replace('%20', ' ');
    return query;
  };

  const [LatestNews, setLatestNews] = useState([]);

  const getApiData = useCallback(async () => {
    try {
      var location = AutoFilter?.length != '' ? AutoFilter : currentCity;

      const propertyData = await fetchData.Properties(dataPayload());
      setBestOffers(propertyData);
      setHotDeals(propertyData);
      dispatch(setPropertyData(propertyData));

      const agentData =
        'location=' + encodeURIComponent(AutoFilter || currentCity);
      const propertyBuyer = await fetchData.users_with_preference(agentData);
      setProperty_Buyers(propertyBuyer);

      const localityData = dataPayload() + nearByLocality;
      const localityFilter = await fetchData.Properties(localityData);
      setNearByProperty(localityFilter);

      // Recent Viewed
      const recentViewedData = `projects=recently_viewed&user_id=${user_id}&location=${
        AutoFilter || currentCity
      }`;
      const recentViewed = await fetchData.Properties(recentViewedData);
      setRecentlyViewed(recentViewed);

      // Featured Property
      const feturedProductsData = `projects=featured&location=${
        AutoFilter || currentCity
      }`;
      const feturedProducts = await fetchData.Properties(feturedProductsData);
      setFeaturedProducts(feturedProducts);

      // Builders Property
      const buildersProductsData = `seller_type=3&location=${
        AutoFilter || currentCity
      }`;
      const buildersProducts = await fetchData.Properties(buildersProductsData);
      setBuilderProducts(buildersProducts);

      // New Property
      const newPropertyData = `location= ${AutoFilter || currentCity}`;
      const newProperty = await fetchData.Properties({});
      setNewProperty(newProperty);
      // New Property
      const recommendedPropertyData = `projects=recommended&user_id=${user_id}&location=${
        AutoFilter || currentCity
      }`;
      const recommendedProperty = await fetchData.Properties(
        recommendedPropertyData,
      );
      // setNewProperty(newProperty);

      const mostViewedData = `projects=most_viewed&location=${
        AutoFilter || currentCity
      }`;
      const mostViewed = await fetchData.Properties(mostViewedData);
      setMostlyViewed(mostViewed);

      const relatedViewedData = `user_id=${user_id}&location=${
        AutoFilter || currentCity
      }`;
      const relatedProperty = await fetchData.Properties(relatedViewedData);
      setRelatedViewed(relatedProperty);

      const latestNews = await fetchData.Blogs({});
      setLatestNews(latestNews);

      const quotaData = 'user_id=' + user_id;
      const filterloc = await fetchData.check_quota(quotaData);
      setGet_quota_value(filterloc?.get_phone_quota);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [AutoFilter, currentCity, nearByLocality, user_id, fetchData, dispatch]);

  useEffect(() => {
    const interval = setInterval(async () => {
      getApiData();
    }, 2000);
    getTripData();
    getPropertyData();
    return () => clearInterval(interval);
  }, [
    AutoFilter,
    BestOffers,
    currentCity,
    nearByLocality,
    user_id,
    fetchData,
    dispatch,
    getApiData,
  ]);

  useEffect(() => {
    getUserData();
  }, [username, email, mobile_number]);

  const getUserData = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value !== null) {
        var res = JSON.parse(value);
        var data = 'user_id=' + res?.user_id;
        const usersData = await fetchData.show_users(data);
        dispatch(setUserData(usersData));
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [userData]);

  useEffect(() => {
    setLoading(true);
    const loadingInterval = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(loadingInterval);
    };
  }, []);

  useEffect(() => {
    setLoginVisible(
      user_id == undefined || (userData?.length > 0 && userData == undefined),
    );
  }, [userData]);

  const currentGeolocation = async () => {
    const locPermissionDenied = await common_fn.locationPermission();
    if (locPermissionDenied) {
      const timeoutId = setTimeout(() => {
        console.error('Location request timed out');
      }, 10000);

      Geolocation.getCurrentPosition(
        async position => {
          clearTimeout(timeoutId);
          const {latitude, longitude} = position.coords;

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );

            const address = response.data.address;
            if (address) {
              const city =
                address.city ||
                address.town ||
                address.village ||
                address.hamlet;
              setCurrentCity(city);
            }
          } catch (error) {
            console.error('Error fetching city:', error);
          }
        },
        error => {
          clearTimeout(timeoutId); // Clear the timeout on error
          console.error('Error getting location:', error);
        },
      );
    }
  };

  const locationData = async () => {
    var locationData = AutoFilter?.length != '' ? AutoFilter : currentCity;

    //get State
    var data = 'location=' + 'city' + '&state=' + '31';
    const selectcity = await fetchData.Location(data);

    //filter state
    const filteredCities = selectcity?.city?.filter(city =>
      city.city.toLowerCase().includes(locationData.toLowerCase()),
    );
    const filteredCityid = filteredCities.map(city => city.city_id);
    setCurrentCityid(filteredCityid.join(','));
    //locality
    var data = 'location=' + 'locality' + '&city=' + filteredCityid.join(',');
    const filterloc = await fetchData.Location(data);
    setNearByLocality(filterloc?.locality?.join(','));
  };

  useEffect(() => {
    currentGeolocation();
    locationData();
  }, [AutoFilter, currentCity]);

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
    });
    const opacity = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{translateY: y}],
          },
        ]}>
        <ImageBackground
          source={{uri: Media.dotBackground}}
          style={{
            width: '100%',
            height: HeaderHeight,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              paddingHorizontal: 15,
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 26,
                  color: Color.white,
                  fontFamily: Poppins.SemiBold,
                }}>
                Find Your
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontFamily: Poppins.SemiBold,
                }}>
                Dream Property
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('MapSearchScreen');
              }}>
              <Icon
                style={{width: 20, height: 20}}
                color={Color.sunShade}
                name="location"
                size={20}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  marginHorizontal: 5,
                  textTransform: 'capitalize',
                }}>
                {AutoFilter?.length != '' ? AutoFilter : currentCity}
              </Text>
              <Icon name="caret-down" size={18} color={Color.white} />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: 10,
              }}>
              {/* <View style={{ backgroundColor: Color.sunShade, borderRadius: 50, paddingHorizontal: 10, padding: 3, marginVertical: 3 }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: Color.white, borderRadius: 50,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Free
                </Text>
              </View> */}

              <TouchableOpacity
                style={{
                  backgroundColor: Color.white,
                  borderRadius: 50,
                  // width: 120,
                  padding: 10,
                  // display: "flex",
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  if (
                    user_id == undefined ||
                    (userData?.length > 0 && userData == undefined)
                  ) {
                    setLoginEnable(true);
                  } else {
                    dispatch(
                      setPostPropertyLocation({
                        city: null,
                        landmark: null,
                      }),
                    );
                    // if (post_quota != 0) {
                    navigation.navigate('PostTab');
                    // } else {
                    //   navigation.navigate('UpgradeTab');
                    // }
                  }
                }}>
                <Text
                  style={{
                    color: Color.black,
                    fontFamily: Poppins.SemiBold,
                    fontSize: 14,
                    paddingTop: 2,
                  }}>
                  Post Property -{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.primary,
                    fontFamily: Poppins.Bold,
                    paddingTop: 2,
                    // textDecorationLine:'line-through'
                  }}>
                  Free
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  };

  const taby = scrollY.interpolate({
    inputRange: [0, HeaderHeight],
    outputRange: [HeaderHeight, 0],
    extrapolateRight: 'clamp',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchIndex(prevIndex => {
        if (prevIndex === placeholderText.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const setPlotTypeData = data => {
    setPlotTypeData({
      visible: true,
      data,
    });
  };

  const closeModal = () => {
    setPlotTypeData({
      visible: false,
      data: {},
    });
  };

  const handleBuyPress = () => {
    navigation.navigate('BUY', {
      location:
        // Object.values(AutoFilter).length > 0
        AutoFilter?.length != ''
          ? // ? AutoFilter?.structured_formatting?.main_text
            AutoFilter
          : currentCity,
      property_action: 'sell',
      property_type:
        plot_type_data?.data?.name == 'House'
          ? 'house'
          : plot_type_data?.data?.name == 'Villa'
          ? 'villa'
          : 'flat',
      filter: false,
      data: {},
      real_estate: 'residential',
      city_id: currentCityid,
    });
    closeModal();
  };

  const handleRentPress = () => {
    navigation.navigate('Rent', {
      location:
        // Object.values(AutoFilter).length > 0
        AutoFilter?.length != ''
          ? // ? AutoFilter?.structured_formatting?.main_text
            AutoFilter
          : currentCity,
      property_action: 'rent',
      property_type:
        plot_type_data?.data?.name == 'House'
          ? 'house'
          : plot_type_data?.data?.name == 'Villa'
          ? 'villa'
          : 'flat',
      filter: false,
      data: {},
      real_estate: 'residential',
      city_id: currentCityid,
    });
    closeModal();
  };
  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      {loading ? (
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
          {user_type_id === '2' || user_type_id == '3' ? (
            <>
              <Animated.View
                style={{
                  zIndex: 1,
                  transform: [{translateY: taby}],
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 5,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 5,
                      borderColor: Color.lightgrey,
                      marginVertical: 10,
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 5,
                      width: '80%',
                      height: 50,
                      padding: 5,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('Search', {
                        location:
                          AutoFilter?.length != '' ? AutoFilter : currentCity,
                      });
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        paddingTop: 2,
                        color: Color.cloudyGrey,
                        fontFamily: Poppins.Medium,
                      }}
                      numberOfLines={1}>
                      {/* {`Search for ${placeholderText[searchIndex]}`} */}
                      {`Find your Flat, Home, Plot, Shop, or Villa.`}
                    </Text>
                    <Icon
                      style={{width: 20, height: 20}}
                      color={Color.primary}
                      name="search"
                      size={20}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      backgroundColor: Color.primary,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      var location =
                        AutoFilter?.length != '' ? AutoFilter : currentCity;
                      navigation.navigate('Filter', {
                        city_id: currentCityid,
                        selectItem: {
                          id: 1,
                          title: 'Buy',
                          value: 'sell',
                        },
                      });
                      dispatch(
                        setFilterLocation({
                          city: location,
                          landmark: null,
                        }),
                      );
                    }}>
                    <F6Icon color={Color.white} name="sliders" size={20} />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  scrollEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  <View style={styles.TabviewContainer}>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabAgentIndex == 1 ? Color.primary : Color.white,
                        marginStart: 10,
                      }}
                      onPress={() => {
                        navigation.navigate('propertyPage', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'sell,rent',
                          filter: false,
                          property_type: 'flat',
                          data: {},
                          real_estate: 'residential',
                          city_id: currentCityid,
                        });
                        setAgentIndex(1);
                      }}>
                      <MIcon
                        name="apartment"
                        size={20}
                        color={
                          tabAgentIndex == 1 ? Color.white : Color.cloudyGrey
                        }
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color:
                            tabAgentIndex == 1 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabAgentIndex == 1
                              ? Poppins.SemiBold
                              : Poppins.Medium,
                        }}>
                        Flat
                      </Text>
                      {tabAgentIndex == 1 && (
                        <Divider
                          style={{
                            width: width / 15,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabAgentIndex == 2 ? Color.primary : Color.white,
                      }}
                      onPress={() => {
                        navigation.navigate('propertyPage', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'sell,rent',
                          filter: false,
                          property_type: 'house',
                          data: {},
                          real_estate: 'residential',
                          city_id: currentCityid,
                        });
                        setAgentIndex(2);
                      }}>
                      <Icon
                        name="home"
                        size={20}
                        color={
                          tabAgentIndex == 2 ? Color.white : Color.cloudyGrey
                        }
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color:
                            tabAgentIndex == 2 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabAgentIndex == 2
                              ? Poppins.SemiBold
                              : Poppins.Medium,
                        }}>
                        House
                      </Text>
                      {tabAgentIndex == 2 && (
                        <Divider
                          style={{
                            width: width / 15,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabAgentIndex == 3 ? Color.primary : Color.white,
                      }}
                      onPress={() => {
                        navigation.navigate('propertyPage', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'sell,rent',
                          filter: false,
                          property_type: 'villa',
                          data: {},
                          real_estate: 'residential',
                          city_id: currentCityid,
                        });
                        setAgentIndex(3);
                      }}>
                      <MIcon
                        name="villa"
                        size={20}
                        color={
                          tabAgentIndex == 3 ? Color.white : Color.cloudyGrey
                        }
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color:
                            tabAgentIndex == 3 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabAgentIndex == 3
                              ? Poppins.SemiBold
                              : Poppins.Medium,
                        }}>
                        Villa
                      </Text>
                      {tabAgentIndex == 3 && (
                        <Divider
                          style={{
                            width: width / 15,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabAgentIndex == 4 ? Color.primary : Color.white,
                      }}
                      onPress={() => {
                        navigation.navigate('Commercial', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'sell,rent',
                          filter: false,
                          property_type: 'shop',
                          data: {},
                          real_estate: 'commercial',
                          city_id: currentCityid,
                        });
                        setAgentIndex(4);
                      }}>
                      <F6Icon
                        name="shop"
                        size={20}
                        color={
                          tabAgentIndex == 4 ? Color.white : Color.cloudyGrey
                        }
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color:
                            tabAgentIndex == 4 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabAgentIndex == 4
                              ? Poppins.SemiBold
                              : Poppins.Medium,
                        }}>
                        Shop
                      </Text>
                      {tabAgentIndex == 4 && (
                        <Divider
                          style={{
                            width: width / 10,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabAgentIndex == 5 ? Color.primary : Color.white,
                      }}
                      onPress={() => {
                        navigation.navigate('Commercial', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'sell,rent',
                          filter: false,
                          property_type: 'plot',
                          data: {},
                          real_estate: 'commercial',
                          city_id: currentCityid,
                        });
                        setAgentIndex(5);
                      }}>
                      <MIcon
                        name="maps-home-work"
                        size={20}
                        color={
                          tabAgentIndex == 5 ? Color.white : Color.cloudyGrey
                        }
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color:
                            tabAgentIndex == 5 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabAgentIndex == 5
                              ? Poppins.SemiBold
                              : Poppins.Medium,
                        }}>
                        Plot
                      </Text>
                      {tabAgentIndex == 5 && (
                        <Divider
                          style={{
                            width: width / 15,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    {user_type_id === '2' && (
                      <TouchableOpacity
                        style={{
                          ...styles.TabViewServices,
                          backgroundColor:
                            tabAgentIndex == 6 ? Color.primary : Color.white,
                        }}
                        onPress={() => {
                          setIndex(3);
                          navigation.navigate('PG', {
                            location:
                              // Object.values(AutoFilter).length > 0
                              AutoFilter?.length != ''
                                ? // ? AutoFilter?.structured_formatting?.main_text
                                  AutoFilter
                                : currentCity,
                            property_action: 'rent',
                            property_type: 'pg',
                            filter: false,
                            data: {},
                            real_estate: 'residential',
                            city_id: currentCityid,
                          });
                        }}>
                        <Image
                          source={{uri: Media.pg}}
                          style={{
                            width: 20,
                            height: 20,
                            tintColor:
                              tabAgentIndex == 6
                                ? Color.white
                                : Color.cloudyGrey,
                          }}
                        />
                        <Text
                          style={{
                            ...styles.TabViewName,
                            color:
                              tabAgentIndex == 6
                                ? Color.white
                                : Color.cloudyGrey,
                            fontFamily:
                              tabAgentIndex == 6
                                ? Poppins.SemiBold
                                : Poppins.Medium,
                          }}>
                          PG
                        </Text>
                        {tabAgentIndex == 6 && (
                          <Divider
                            style={{
                              width: width / 15,
                              backgroundColor: Color.primary,
                              height: 2,
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              </Animated.View>

              <AgentItemCard
                HotDeals={HotDeals}
                getApiData={getApiData}
                Property_Buyers={Property_Buyers}
                AgentSection={AgentSection}
                recentlyViewed={recentlyViewed}
                mostlyViewed={mostlyViewed}
                relatedViewed={relatedViewed}
                NewProperty={NewProperty}
                FeaturedProducts={FeaturedProducts}
                buildersProducts={buildersProducts}
                setBuilderProducts={setBuilderProducts}
                Property_Selling={Property_Selling}
                propertyServices={propertyServices}
                navigation={navigation}
                scrollY={scrollY}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onScrollEndDrag={onScrollEndDrag}
                onMomentumScrollEnd={onMomentumScrollEnd}
                user_id={user_id}
                LatestNews={LatestNews}
                get_phone_quota={get_quota_value}
                setPhoneQuotoVisible={setPhoneQuotoVisible}
                AutoFilter={AutoFilter}
                currentCity={currentCity}
              />
            </>
          ) : (
            <>
              <Animated.View
                style={{
                  zIndex: 1,
                  transform: [{translateY: taby}],
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 5,
                      borderColor: Color.lightgrey,
                      marginVertical: 10,
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 5,
                      width: '80%',
                      height: 50,
                      padding: 5,
                      paddingHorizontal: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('Search', {
                        location:
                          AutoFilter?.length != '' ? AutoFilter : currentCity,
                      });
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        marginHorizontal: 5,
                        color: Color.cloudyGrey,
                        paddingTop: 2,
                        fontFamily: Poppins.Medium,
                      }}
                      numberOfLines={1}>
                      {/* {`Search for ${placeholderText[searchIndex]}`} */}
                      {`Find your Flat, Home, Plot, Shop, or Villa.`}
                    </Text>
                    <Icon
                      style={{width: 20, height: 20}}
                      color={Color.primary}
                      name="search"
                      size={20}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginVertical: 10,
                      backgroundColor: Color.primary,
                      width: 50,
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      var location =
                        AutoFilter?.length != '' ? AutoFilter : currentCity;
                      navigation.navigate('Filter', {
                        city_id: currentCityid,
                        selectItem: {
                          id: 1,
                          title: 'Buy',
                          value: 'sell',
                        },
                      });
                      dispatch(
                        setFilterLocation({
                          city: location,
                          landmark: null,
                        }),
                      );
                    }}>
                    <F6Icon color={Color.white} name="sliders" size={20} />
                  </TouchableOpacity>
                </View>
                <ScrollView
                  scrollEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  <View style={styles.TabviewContainer}>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabIndex == 1 ? Color.primary : Color.white,
                        marginStart: 10,
                      }}
                      onPress={() => {
                        navigation.navigate('BUY', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'sell',
                          property_type: '',
                          filter: false,
                          data: {},
                          real_estate: 'residential',
                          city_id: currentCityid,
                        });
                        setIndex(1);
                      }}>
                      <Image
                        source={{uri: Media.buy}}
                        style={{
                          width: 20,
                          height: 20,
                          tintColor:
                            tabIndex == 1 ? Color.white : Color.primary,
                        }}
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color: tabIndex == 1 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabIndex == 1 ? Poppins.SemiBold : Poppins.Medium,
                        }}>
                        Buy
                      </Text>
                      {tabIndex == 1 && (
                        <Divider
                          style={{
                            width: width / 15,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabIndex == 2 ? Color.primary : Color.white,
                      }}
                      onPress={() => {
                        setIndex(2);
                        navigation.navigate('Rent', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'rent',
                          property_type: '',
                          filter: false,
                          data: {},
                          real_estate: 'residential',
                          city_id: currentCityid,
                        });
                      }}>
                      <Image
                        source={{uri: Media.rent}}
                        style={{
                          width: 20,
                          height: 20,
                          tintColor:
                            tabIndex == 2 ? Color.white : Color.primary,
                        }}
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color: tabIndex == 2 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabIndex == 2 ? Poppins.SemiBold : Poppins.Medium,
                        }}>
                        Rent
                      </Text>
                      {tabIndex == 2 && (
                        <Divider
                          style={{
                            width: width / 15,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabIndex == 3 ? Color.primary : Color.white,
                      }}
                      onPress={() => {
                        setIndex(3);
                        navigation.navigate('PG', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'rent',
                          property_type: 'pg',
                          filter: false,
                          data: {},
                          real_estate: 'residential',
                          city_id: currentCityid,
                        });
                      }}>
                      <Image
                        source={{uri: Media.pg}}
                        style={{
                          width: 20,
                          height: 20,
                          tintColor:
                            tabIndex == 3 ? Color.white : Color.primary,
                        }}
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color: tabIndex == 3 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabIndex == 3 ? Poppins.SemiBold : Poppins.Medium,
                        }}>
                        PG
                      </Text>
                      {tabIndex == 3 && (
                        <Divider
                          style={{
                            width: width / 15,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.TabViewServices,
                        backgroundColor:
                          tabIndex == 4 ? Color.primary : Color.white,
                      }}
                      onPress={() => {
                        setIndex(4);
                        navigation.navigate('Commercial', {
                          location:
                            // Object.values(AutoFilter).length > 0
                            AutoFilter?.length != ''
                              ? // ? AutoFilter?.structured_formatting?.main_text
                                AutoFilter
                              : currentCity,
                          property_action: 'sell,rent',
                          property_type: '',
                          filter: false,
                          data: {},
                          real_estate: 'commercial',
                          city_id: currentCityid,
                        });
                      }}>
                      <Image
                        source={{uri: Media.commercial}}
                        style={{
                          width: 20,
                          height: 20,
                          tintColor:
                            tabIndex == 4 ? Color.white : Color.primary,
                        }}
                      />
                      <Text
                        style={{
                          ...styles.TabViewName,
                          color: tabIndex == 4 ? Color.white : Color.cloudyGrey,
                          fontFamily:
                            tabIndex == 4 ? Poppins.SemiBold : Poppins.Medium,
                        }}>
                        Commercial
                      </Text>
                      {tabIndex == 4 && (
                        <Divider
                          style={{
                            width: width / 10,
                            backgroundColor: Color.primary,
                            height: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </Animated.View>
              <BuyItemCard
                BestOffers={BestOffers}
                setBestOffers={setBestOffers}
                getApiData={getApiData}
                nearByProperty={nearByProperty}
                recentlyViewed={recentlyViewed}
                mostlyViewed={mostlyViewed}
                relatedViewed={relatedViewed}
                NewProperty={NewProperty}
                FeaturedProducts={FeaturedProducts}
                buildersProducts={buildersProducts}
                setBuilderProducts={setBuilderProducts}
                BuySection={BuySection}
                sellingTypes={sellingTypes}
                propertyServices={propertyServices}
                navigation={navigation}
                scrollY={scrollY}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onScrollEndDrag={onScrollEndDrag}
                onMomentumScrollEnd={onMomentumScrollEnd}
                user_id={user_id}
                get_phone_quota={get_quota_value}
                AutoFilter={AutoFilter}
                currentCity={currentCity}
                LatestNews={LatestNews}
                currentCityid={currentCityid}
                userData={userData}
              />
            </>
          )}
          <PlotTypeModal
            visible={plot_type_data?.visible}
            data={plot_type_data?.data}
            onClose={closeModal}
            onBuyPress={handleBuyPress}
            onRentPress={handleRentPress}
          />
          {renderHeader()}
          <PrimeModal navigation={navigation} />
          <Modal
            visible={EditVisible}
            transparent={true}
            animationType={'fade'}>
            <Pressable
              style={{
                backgroundColor: Color.transparantBlack,
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
              onPress={() => dispatch(setEditVisible(false))}
            />
            <View
              style={{
                paddingVertical: 20,
                backgroundColor: Color.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <TouchableOpacity
                style={{position: 'absolute', right: 10, top: 10}}
                onPress={() => dispatch(setEditVisible(false))}>
                <MCIcon name="close-circle" size={30} color={Color.red} />
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: Media.alert_success}}
                  style={{width: 100, height: 100, resizeMode: 'contain'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Poppins.SemiBold,
                  textAlign: 'center',
                  color: Color.black,
                  marginVertical: 20,
                  lineHeight: 20,
                }}>
                Your profile has been updated successfully
              </Text>
            </View>
          </Modal>
          <PlanPhonePurchase
            setPhoneQuotoVisible={setPhoneQuotoVisible}
            phoneQuotoVisible={phoneQuotoVisible}
          />
        </>
      )}
      {/* <TouchableOpacity
        style={{
          backgroundColor: Color.white,
          shadowColor: Color.black,
          backgroundColor: Color.white,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 8,
          width: 60,
          height: 60,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          navigation.navigate('chat');
        }}>
        <AIcon name='customerservice' size={40} color={Color.primary} />
      </TouchableOpacity> */}
      {loginEnable && (
        <BottomLogin login={loginEnable} setLogin={setLoginEnable} />
      )}
      {loginVisible && (
        <EnableLogin
          visible={loginVisible}
          setLoginVisible={setLoginVisible}
          tabBarHeight={tabBarHeight}
          animated={animated}
          width={width}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    backgroundColor: Color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // padding: 10,
  },
  label: {fontSize: 16, color: '#222'},
  tab: {elevation: 0, shadowOpacity: 0, backgroundColor: '#FFCC80'},
  indicator: {backgroundColor: '#222'},
  TabviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  TabViewName: {
    fontSize: 14,
  },
  TabViewServices: {
    marginHorizontal: 5,
    alignItems: 'center',
    width: 100,
    height: 70,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    justifyContent: 'center',
  },
  TabViewDivider: {
    width: width / 15,
    backgroundColor: 'black',
    height: 1,
  },
  TabViewAboutus: {marginHorizontal: 20, alignItems: 'center'},
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  starImageStyle: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
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
});

export default HomeScreen;

//HomeScreen
