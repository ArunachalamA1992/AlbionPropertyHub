import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {base_image_properties} from '../Config/base_url';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
import OIcon from 'react-native-vector-icons/Octicons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../Config/Color';
import moment from 'moment';
import fetchData from '../Config/fetchData';
import {Media} from '../Global/Media';
import {useSelector} from 'react-redux';
import {Poppins} from '../Global/FontFamily';
import {ActivityIndicator} from 'react-native-paper';
import common_fn from '../Config/common_fn';
import BottomLogin from './BottomLogin';

const BestOfferScreen = ({route, navigation}) => {
  const [currentCity] = useState(route.params.currentCity);
  const [BestOffers, setBestOffers] = useState([]);
  const [processingProducts, setProcessingProducts] = useState([]);
  const [loginEnable, setLoginEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id, user_type_id} = userData;
  const AutoFilter = useSelector(state => state.UserReducer.AutoFilter);

  useEffect(() => {
    setLoading(true);
    getApiData().finally(() => {
      setLoading(false);
    });
  }, [getApiData]);

  const dataPayload = () => {
    const params = new URLSearchParams();
    const payload = {
      location: AutoFilter || currentCity,
      user_id: user_id,
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

  const getApiData = async () => {
    var data = dataPayload();
    const propertyData = await fetchData.Properties(data);
    setBestOffers(propertyData);
    setLoading(false);
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
          setProcessingProducts(
            processingProducts.filter(productId => productId !== id),
          );
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
          setProcessingProducts(
            processingProducts.filter(productId => productId !== id),
          );
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 5,
      }}>
      {loading ? (
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
      ) : BestOffers?.length > 0 ? (
        <FlatList
          data={BestOffers}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
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
            return (
              <TouchableOpacity
                key={index}
                style={{
                  // height: 230,
                  borderRadius: 5,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                  marginVertical: 5,
                  marginHorizontal: 5,
                }}
                onPress={() => {
                  navigation.navigate('SingleProperty', {p_id: item?.p_id});
                }}>
                <View>
                  {item?.images?.length > 0 ? (
                    <Image
                      source={{
                        uri: item?.images[0]?.image_url,
                      }}
                      key={index}
                      style={{
                        // width: 250,
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
                        width: '100%',
                        height: 150,
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                  <View
                    style={{
                      position: 'absolute',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      padding: 5,
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
                              paddingTop: 7,
                              borderRadius: 5,
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
                        alignItems: 'flex-end',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          width: 30,
                          height: 30,
                          borderRadius: 100,
                          justifyContent: 'center',
                          marginVertical: 10,
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
                              (userData?.length > 0 && userData == undefined)
                            ) {
                              setLoginEnable(true);
                            } else {
                              handleWishlist(item.p_id, item?.isWishListed);
                            }
                          }}>
                          {processingProducts.includes(item.p_id) ? (
                            <ActivityIndicator
                              size="small"
                              color={Color.primary}
                            />
                          ) : (
                            <Icon
                              name={
                                item?.isWishListed ? 'heart' : 'heart-outline'
                              }
                              size={18}
                              color={
                                item?.isWishListed ? Color.primary : Color.black
                              }
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View
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
                        <Icon name="images" size={25} color={Color.white} />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{marginHorizontal: 10}}>
                  <View
                    style={{
                      // flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: '#666',
                        fontWeight: 'bold',
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
                    <F5Icon name="crown" size={18} color={Color.sunShade} />
                  </View>
                  <View
                    style={{
                      // flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 17,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                        textTransform: 'capitalize',
                      }}
                      numberOfLines={1}>
                      {item.property_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: Color.primary,
                        fontWeight: 'bold',
                      }}
                      numberOfLines={1}>
                      ₹
                      {item?.property_type?.pt_name == 'PG'
                        ? common_fn.getMinToMaxPrice(item?.room_category)
                        : item?.expected_price?.length >= 5
                        ? common_fn.formatNumberWithSuffix(item?.expected_price)
                        : item?.expected_price}
                    </Text>
                  </View>
                  <View
                    style={{
                      // flex: 1,
                      // flexDirection: 'row',
                      // alignItems: 'center',
                      // justifyContent: 'center',
                      marginHorizontal: 5,
                      marginVertical: 5,
                    }}>
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
                        {item.location}
                      </Text>
                    </View>
                    {/* <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontWeight: 'bold',
                      }}>
                      per month
                    </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
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
      {loginEnable == true && (
        <BottomLogin login={loginEnable} setLogin={setLoginEnable} />
      )}
    </View>
  );
};

export default BestOfferScreen;
