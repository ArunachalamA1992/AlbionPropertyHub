import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import fetchData from '../../Config/fetchData';
import moment from 'moment';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import OIcon from 'react-native-vector-icons/Octicons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import common_fn from '../../Config/common_fn';

const HEIGHT = Dimensions.get('screen').height;

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id } = userData;
  const [loading, setLoading] = useState(false);
  const wishlistData = async () => {
    try {
      var data = 'user_id=' + user_id;
      const Wishlist = await fetchData.wishlist(data);
      setWishlist(Wishlist?.property_data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      wishlistData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleWishlist = async (id, isWishList) => {
    setLoading(true);
    try {
      var data = {
        p_id: id,
        user_id: user_id,
      };
      const removeWishlist = await fetchData.remove_to_wishlist(data);
      wishlistData();
      if (removeWishlist?.message == 'Removed From WishList') {
        if (Platform.OS === 'android') {
          common_fn.showToast('Wishlist Removed Successfully');
        } else {
          alert('Wishlist Removed Successfully')
        }
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
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
            source={{ uri: Media.loader }}
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </View>
      ) : (
        <FlatList
          data={wishlist}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            const twentyFourHoursAgo = moment(
              new Date() - 24 * 60 * 60 * 1000,
            ).format('YYYY-MM-DD');

            const createdAt = moment(item?.created_at).format('YYYY-MM-DD');
            const newItem = twentyFourHoursAgo > createdAt;
            let bedroomValue = '';
            if (item && item?.features && Array?.isArray(item?.features)) {
              item?.features?.forEach(feature => {
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
                  navigation.navigate('SingleProperty', { p_id: item?.p_id });
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
                      source={{ uri: Media.noImage }}
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
                    <View style={{
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
                      {item?.exclusive != 0 &&
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
                              color: 'white',
                              fontStyle: 'normal',
                              fontFamily: Poppins.SemiBold,
                              backgroundColor: Color.primary,
                            }}>
                            Exclusive
                          </Text>
                        </View>
                      }
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          backgroundColor: Color.white,
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          handleWishlist(item?.p_id, item?.isWishListed);
                        }}>
                        <Icon name={'heart'} size={22} color={Color.primary} />
                      </TouchableOpacity>
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
                <View style={{ marginHorizontal: 10 }}>
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
                      {item?.property_type?.pt_name == "PG" ? item?.property_type?.pt_name :
                        item?.property_type?.pt_name == 'Flat' ||
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
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                        textTransform: "capitalize"
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
                      {item?.property_type?.pt_name == "PG" ?
                        common_fn.getMinToMaxPrice(item?.room_category) :
                        item?.expected_price?.length >= 5
                          ? common_fn.formatNumberWithSuffix(
                            item?.expected_price,
                          )
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
                        style={{ color: '#666' }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#333',
                          fontFamily: Poppins.Medium,
                          padding: 5,
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
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  height: HEIGHT / 1.5,
                  justifyContent: 'center',
                }}>
                <Icon
                  name="heart-dislike-outline"
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
      )}
    </View>
  );
};

export default WishlistScreen;
