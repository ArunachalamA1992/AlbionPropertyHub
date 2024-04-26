import React, { useEffect, useState, memo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  FlatList,
  Modal,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import { base_image_properties } from '../../Config/base_url';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import { Button } from 'react-native-elements';
import fetchData from '../../Config/fetchData';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import common_fn from '../../Config/common_fn';
import moment from 'moment';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Share from 'react-native-share';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const PropertyStatus = React.memo(({ item }) => {
  switch (item) {
    case '1':
      return (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: Color.green,
              fontFamily: Poppins.SemiBold,
              backgroundColor: '#BAE1BE60',
              padding: 5,
              // marginHorizontal: 10,
              borderRadius: 5,
            }}>
            Active
          </Text>
        </View>
      );
    case '2':
      return (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: Color.green,
              fontFamily: Poppins.SemiBold,
              backgroundColor: '#BAE1BE60',
              padding: 5,
              // marginHorizontal: 10,
              borderRadius: 5,
            }}>
            Review
          </Text>
        </View>
      );
    case '3':
      return (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: Color.green,
              fontFamily: Poppins.SemiBold,
              backgroundColor: '#BAE1BE60',
              padding: 5,
              // marginHorizontal: 10,
              borderRadius: 5,
            }}>
            Sold
          </Text>
        </View>
      );
    case '0':
      return (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: Color.primary,
              fontFamily: Poppins.SemiBold,
              backgroundColor: '#ED1B2430',
              padding: 5,
              // marginHorizontal: 10,
              borderRadius: 5,
            }}>
            Rejected
          </Text>
        </View>
      );
    case '4':
      return (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: Color.primary,
              fontFamily: Poppins.SemiBold,
              backgroundColor: '#ED1B2430',
              padding: 5,
              // marginHorizontal: 10,
              borderRadius: 5,
            }}>
            Cancelled
          </Text>
        </View>
      );
  }
});

const MyContactedList = React.memo(({ navigation, user_id, contacted }) => {
  const [dataFetched, setDataFetched] = useState(false);

  const onShare = async item => {
    try {
      const image_url = item?.property?.images?.[0]?.image_url;
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={contacted}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          // console.log('item', JSON.stringify(item))
          return (
            <>
              {item?.property === null ? (
                <View />
              ) : (
                <TouchableOpacity
                  key={index}
                  style={{
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
                    marginVertical: 10,
                    borderRadius: 0,
                  }}
                  onPress={() => {
                    navigation.navigate('SingleProperty', {
                      p_id: item?.p_id,
                    });
                  }}>
                  <View style={styles.orderBoxView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          alignItems: 'center',
                          backgroundColor:
                            item?.property?.property_action === 'sell'
                              ? Color.primary
                              : Color.cloudyGrey,
                          width: 80,
                          height: 30,
                          justifyContent: 'center',
                          borderRadius: 5,

                        }}>
                        <Text
                          style={{
                            color: Color.white,
                            fontSize: 14,
                            fontFamily: Poppins.SemiBold,
                            paddingHorizontal: 5,
                            marginHorizontal: 10,
                            textAlign: 'center',
                            textTransform: 'capitalize',
                          }}>
                          {item?.property?.property_action}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          backgroundColor:
                            item?.property?.property_action === 'sell'
                              ? Color.primary
                              : Color.cloudyGrey,
                          width: 80,
                          height: 30,
                          justifyContent: 'center',
                          borderRadius: 5, marginHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            color: Color.white,
                            fontSize: 14,
                            fontFamily: Poppins.SemiBold,
                            paddingHorizontal: 5,
                            marginHorizontal: 10,
                            textAlign: 'center',
                            textTransform: 'capitalize',
                          }}>
                          {item?.property?.property_type?.pt_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text
                          style={{
                            color: Color.cloudyGrey,
                            fontSize: 13,
                            fontFamily: Poppins.Medium, textAlign: 'left'
                          }}>
                          Id
                        </Text>
                        <Text
                          style={{
                            color: Color.black,
                            fontSize: 16,
                            fontFamily: Poppins.Medium, fontWeight: '800', textAlign: 'left', paddingVertical: 5
                          }}>{item?.property?.p_id}
                        </Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text
                          style={{
                            color: Color.cloudyGrey,
                            fontSize: 13,
                            fontFamily: Poppins.Medium, textAlign: 'right'
                          }}>Date</Text>
                        <Text
                          style={{
                            color: Color.black,
                            fontSize: 16,
                            fontFamily: Poppins.Medium, fontWeight: '800', textAlign: 'right', paddingVertical: 5
                          }}>
                          {moment(item?.property?.created_at, 'YYYY-MM-DD hh:mm A').format('MMMM DD, YYYY')}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.orderDataView}>
                      <Text style={styles.orderHeaderText}>User Name :</Text>
                      <Text
                        style={{
                          flex: 1,
                          color: Color.black,
                          fontSize: 16, textAlign: 'right',
                          fontFamily: Poppins.Medium, fontWeight: '800'
                        }}>
                        {item?.property?.seller_details?.username}
                      </Text>
                    </View>
                    <View style={styles.orderDataView}>
                      <Text style={styles.orderHeaderText}>
                        Interested IN :
                      </Text>
                      <View style={{ padding: 5, flex: 1, }}>
                        <Text style={styles.orderDateText} numberOfLines={2}>
                          {`${item?.property?.real_estate} ${item?.property?.property_type?.pt_name} in ${item?.property?.locality} ${item?.property?.location}`}
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={styles.orderHeaderText}>Price</Text>
                        <Text style={[styles.totalText, { paddingVertical: 3 }]}>
                          ₹
                          {item?.property_type?.pt_name == 'PG'
                            ? common_fn.getMinToMaxPrice(
                              item?.property?.room_category,
                            )
                            : item?.property?.expected_price?.length >= 5
                              ? common_fn.formatNumberWithSuffix(
                                item?.property?.expected_price,
                              )
                              : item?.property?.expected_price}
                        </Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Text style={styles.orderHeaderText}>
                          Mobile Number
                        </Text>
                        <Text
                          style={{
                            color: Color.black,
                            fontSize: 16,
                            fontFamily: Poppins.Medium, fontWeight: '800', paddingVertical: 3
                          }}>
                          {
                            item?.property?.seller_details?.mobile_number
                            // ?.substring(0, 5)
                            // .concat('*****')
                          }
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
                        title={'Call'}
                        titleStyle={{
                          color: Color.white,
                          marginHorizontal: 5,
                          fontFamily: Poppins.SemiBold,
                          fontSize: 14,
                        }}
                        buttonStyle={{
                          backgroundColor: Color.primary,
                          borderRadius: 5,
                          marginHorizontal: 5,
                        }}
                        icon={() => (
                          <Icon
                            name="call"
                            size={18}
                            style={{ color: Color.white }}
                          />
                        )}
                        containerStyle={{ flex: 1 }}
                        onPress={() => {
                          RNImmediatePhoneCall.immediatePhoneCall(
                            item?.user?.mobile_number,
                          );
                        }}
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
                            name="share-social"
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
                          onShare(item);
                        }}
                      // containerStyle={{width: '10%'}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: HEIGHT / 1.5,
              }}>
              <Image
                source={{ uri: Media.noProperty }}
                style={{ width: 150, height: 100 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  padding: 5,
                  paddingHorizontal: 20,
                  marginStart: 5,
                  borderRadius: 5,
                  marginVertical: 10,
                  color: Color.primary,
                  fontFamily: Poppins.SemiBold,
                }}>
                No Properties
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
});

const MyResponseProperty = ({ navigation, user_id, ResponseList }) => {
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={ResponseList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              {item?.user === null ? (
                <View />
              ) : (
                <TouchableOpacity
                  key={index}
                  style={{
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
                    marginVertical: 10,
                    borderRadius: 0,
                  }}
                  onPress={() => {
                    navigation.navigate('SingleProperty', {
                      p_id: item?.p_id,
                    });
                  }}>
                  <View style={styles.orderBoxView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          alignItems: 'center',
                          backgroundColor:
                            item?.property?.property_action === 'sell'
                              ? Color.primary
                              : Color.cloudyGrey,
                          width: 80,
                          height: 30,
                          justifyContent: 'center',
                          borderRadius: 5,
                          marginHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            color: Color.white,
                            fontSize: 14,
                            fontFamily: Poppins.SemiBold,
                            paddingHorizontal: 5,
                            marginHorizontal: 10,
                            textAlign: 'center',
                            textTransform: 'capitalize',
                          }}>
                          {item?.property?.property_action}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          backgroundColor:
                            item?.property?.property_action === 'sell'
                              ? Color.primary
                              : Color.cloudyGrey,
                          width: 80,
                          height: 30,
                          justifyContent: 'center',
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: Color.white,
                            fontSize: 14,
                            fontFamily: Poppins.SemiBold,
                            paddingHorizontal: 5,
                            marginHorizontal: 10,
                            textAlign: 'center',
                            textTransform: 'capitalize',
                          }}>
                          {item?.property?.property_type?.pt_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          color: Color.black,
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                        }}>
                        Id : {item?.p_id}
                      </Text>
                      <Text
                        style={{
                          color: Color.black,
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                        }}>
                        Date :{' '}
                        {moment(item?.user?.created_at, 'YYYY-MM-DD hh:mm A').format('MMMM DD, YYYY')}
                      </Text>
                    </View>
                    <View style={styles.orderDataView}>
                      <Text style={styles.orderHeaderText}>User Name : </Text>
                      <Text
                        style={{
                          flex: 1,
                          color: Color.black,
                          fontSize: 16,
                          fontFamily: Poppins.Medium,
                        }}>
                        {item?.user?.username}
                      </Text>
                    </View>
                    <View style={styles.orderDataView}>
                      <Text style={styles.orderHeaderText}>
                        Interested IN :
                      </Text>
                      <View style={{ padding: 5, flex: 1, marginHorizontal: 5 }}>
                        <Text style={styles.orderDateText} numberOfLines={2}>
                          {`${item?.property?.real_estate} ${item?.property?.property_type?.pt_name} in ${item?.property?.locality} ${item?.property?.location}`}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.orderDataView}>
                      <Text style={styles.orderHeaderText}>Price :</Text>
                      <Text style={styles.totalText}>
                        ₹
                        {item?.property?.property_type?.pt_name == 'PG'
                          ? common_fn.getMinToMaxPrice(
                            item?.property?.room_category,
                          )
                          : item?.property?.expected_price?.length >= 5
                            ? common_fn.formatNumberWithSuffix(
                              item?.property?.expected_price,
                            )
                            : item?.property?.expected_price}
                      </Text>
                    </View>
                    <View style={styles.orderDataView}>
                      <Text style={styles.orderHeaderText}>
                        Mobile Number :
                      </Text>
                      <Text
                        style={{
                          color: Color.black,
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                        }}>
                        {
                          item?.user?.mobile_number
                          // ?.substring(0, 5)
                          // .concat('*****')
                        }
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 5,
                      }}>
                      {/* <View
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        height: 40,
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          color: Color.black,
                          fontSize: 14,
                          fontFamily: Poppins.SemiBold,
                          paddingTop: 2,
                        }}>
                        Lead Status
                      </Text>
                    </View> */}
                      <Button
                        title={'Call'}
                        titleStyle={{
                          color: Color.white,
                          marginHorizontal: 5,
                          fontFamily: Poppins.SemiBold,
                          fontSize: 14,
                        }}
                        buttonStyle={{
                          backgroundColor: Color.primary,
                          borderRadius: 5,
                          marginHorizontal: 5,
                        }}
                        icon={() => (
                          <Icon
                            name="call"
                            size={18}
                            style={{ color: Color.white }}
                          />
                        )}
                        containerStyle={{ flex: 1 }}
                        onPress={() => {
                          RNImmediatePhoneCall.immediatePhoneCall(
                            item?.user?.mobile_number,
                          );
                        }}
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
                            name="share-social"
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
                          onShare(item);
                        }}
                      // containerStyle={{width: '10%'}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: HEIGHT / 1.5,
              }}>
              {/* <MCIcon
              name="clipboard-text-search-outline"
              size={40}
              color={Color.primary}
            /> */}
              <Image
                source={{ uri: Media.noProperty }}
                style={{ width: 150, height: 100 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  padding: 5,
                  paddingHorizontal: 20,
                  marginStart: 5,
                  borderRadius: 5,
                  marginVertical: 10,
                  color: Color.primary,
                  fontFamily: Poppins.SemiBold,
                }}>
                No Properties
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const PostedProperty = ({
  myProperties,
  navigation,
  setDeletePropVisible,
  deletePropVisible,
  AlbionPrime,
  routes,
  index,
  user_id,
}) => {
  const [loading, setLoading] = useState(false);
  const [resultDate, setResultDate] = useState(null);
  const [final, setFinal] = useState([]);

  const [Banner] = useState([
    {
      id: 1,
      image: Media.adBanner,
    },
    {
      id: 2,
      image: Media.adBanner2,
    },
  ]);

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

  useEffect(() => {
    driverFunction();
  }, [myProperties]);

  const driverFunction = () => {
    let solution = [];
    let j = 0;
    let k = 0;
    for (let i = 0; i < myProperties.length; i++) {
      if ((solution.length + 1) / 7 == 0) {
        solution.push([{ id: j, type: 'banner', data: Banner[j] }]);
        j++;
      } else if (solution.length + 1 == 2) {
        solution.push([{ id: k, type: 'Albion Prime', data: AlbionPrime[k] }]);
        solution.push(myProperties[i]);
        k++;
      } else {
        solution.push(myProperties[i]);
      }
    }
    setFinal(solution);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.white }}>
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
          data={final}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            if (item[0]?.type == 'Albion Prime') {
              var text = 'Albion Prime';
              var colorText = text.split(' ').map((word, i) => (
                <Text key={i}>
                  <Text
                    style={{
                      color: word == 'Prime' && Color.sunShade,
                    }}>
                    {word}{' '}
                  </Text>
                </Text>
              ));
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
                <>
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
                        source={{ uri: Media.background }}
                        resizeMode="contain"
                        style={{
                          height: 100,
                          width: '100%',
                        }}>
                        <View
                          style={{
                            position: 'absolute',
                            top: 0,
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
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('UpgradeTab');
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  color: Color.sunShade,
                                  textAlign: 'center',
                                  alignSelf: 'center',
                                  textDecorationLine: 'underline',
                                }}>
                                AD Plan
                              </Text>
                            </TouchableOpacity>
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  )}
                  <View
                    key={index}
                    style={{
                      width: WIDTH - 20,
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      backgroundColor: Color.primary,
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
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: Poppins.Medium,
                          fontSize: 12,
                          color: Color.white,
                        }}>
                        Your Free Posting
                      </Text>
                      <Text
                        style={{
                          fontFamily: Poppins.SemiBold,
                          fontSize: 18,
                          color: Color.white,
                        }}>
                        {colorText}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Poppins.Medium,
                          fontSize: 14,
                          color: Color.white,
                        }}>
                        To Get Unlimited Posting On Prime
                      </Text>
                    </View>
                    {Platform.OS == 'android' && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: Color.white,
                          padding: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                          borderRadius: 10,
                        }}
                        onPress={() => {
                          navigation.navigate('UpgradeTab');
                        }}>
                        <Image
                          source={{ uri: Media.prime }}
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontFamily: Poppins.Medium,
                            fontSize: 16,
                            color: Color.black,
                          }}>
                          Upgrade
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              );
            }
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
              <TouchableOpacity
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
                }}
                onPress={() => {
                  navigation.navigate('SingleProperty', { p_id: item?.p_id });
                }}>
                {item?.images != undefined && (
                  <View style={{}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {item?.images?.length > 0 &&
                        item?.images?.[0]?.image_url !== '' ? (
                        <Image
                          source={{
                            uri: item?.images[0]?.image_url,
                          }}
                          style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 10,
                            resizeMode: 'cover',
                          }}
                        />
                      ) : (
                        <Image
                          source={{ uri: Media.noImage }}
                          style={{
                            width: 150,
                            height: 150,
                            resizeMode: 'contain',
                            justifyContent: 'center',
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                          }}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingEnd: 2,
                        height: 30,
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        right: 0,
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
                          onShare(item);
                        }}>
                        <Icon
                          name="arrow-redo-outline"
                          size={20}
                          color={Color.cloudyGrey}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View
                  style={{
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: Color.white,
                      width: '100%',
                      padding: 10,
                      borderRadius: 10,
                      marginTop: -60,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <PropertyStatus item={item?.status} />
                      <Text
                        style={{
                          flex: 1,
                          textAlign: 'right',
                          fontSize: 12,
                          color: Color.green,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        PRICE
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {item?.property_name == null ? (
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 16,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                            textTransform: 'capitalize',
                          }}
                          numberOfLines={1}>
                          {item?.property?.property_type?.pt_name == 'PG'
                            ? item?.property?.property_type?.pt_name
                            : item?.property?.property_type?.pt_name ==
                              'Flat' ||
                              item?.property?.property_type?.pt_name ==
                              'Villa' ||
                              item?.property?.property_type?.pt_name == 'House'
                              ? `${bedroomValue} BHK, ${item?.property?.property_type?.pt_name}`
                              : `${item?.property?.area?.super_area} ${item?.property?.area?.super_area_unit}, ${item?.property?.property_type?.pt_name}`}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 16,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                            textTransform: 'capitalize',
                          }}>
                          {item?.property_name}
                        </Text>
                      )}
                      <Text
                        style={{
                          fontSize: 16,
                          // marginVertical: 5,
                          color: Color.black,
                          fontFamily: Poppins.SemiBold,
                          marginHorizontal: 5,
                        }}>
                        ₹
                        {item?.property_type?.pt_name == 'PG'
                          ? common_fn.getMinToMaxPrice(item?.room_category)
                          : item?.expected_price?.length >= 5
                            ? common_fn.formatNumberWithSuffix(
                              item?.expected_price,
                            )
                            : item?.expected_price}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 12,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          textTransform: 'capitalize',
                        }}>
                        by{' '}
                        {item?.property?.seller_details?.user_type_id == '1'
                          ? 'Buyer'
                          : item?.property?.seller_details?.user_type_id == '2'
                            ? 'Agent'
                            : 'Builder'}{' '}
                        | {resultDate}
                      </Text>
                      {item?.property_type?.pt_name != 'PG' && (
                        <Text
                          style={{
                            fontSize: 12,
                            // marginVertical: 5,
                            color: Color.grey,
                            fontFamily: Poppins.SemiBold,
                            marginHorizontal: 5,
                          }}>
                          {`@ ₹ ${item?.property?.area?.super_area} per ${item?.property?.area?.super_area_unit}`}
                        </Text>
                      )}
                    </View>
                    {item?.property_type?.pt_name != 'PG' && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Poppins.SemiBold,
                          textTransform: 'capitalize',
                          marginVertical: 5,
                        }}>
                        {`${item?.property?.area?.super_area} ${item?.property?.area?.super_area_unit}`}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('SingleProperty', {
                            p_id: item?.p_id,
                          });
                        }}
                        style={{
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.primary,
                            fontFamily: Poppins.SemiBold,
                            textTransform: 'capitalize',
                            textDecorationLine: 'underline',
                          }}>
                          View Post
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}>
                        {/* <Button
                        title={''}
                        titleStyle={{
                          color: Color.white,
                          marginHorizontal: 5,
                          fontSize: 14,
                        }}
                        icon={() => (
                          <FIcon name="pencil" size={20} color={Color.white} />
                        )}
                        onPress={() => {
                          navigation.navigate('EditProperty');
                        }}
                        buttonStyle={{
                          backgroundColor: Color.primary,
                          borderWidth: 1,
                          borderColor: Color.primary,
                          borderRadius: 5,
                          marginHorizontal: 5,
                        }}
                      /> */}
                        <Button
                          title={''}
                          titleStyle={{
                            color: Color.white,
                            marginHorizontal: 5,
                            fontSize: 14,
                          }}
                          icon={() => (
                            <AIcon
                              name="delete"
                              size={20}
                              color={Color.white}
                            />
                          )}
                          onPress={() => {
                            // deleteProperty(item?.p_id);
                            setDeletePropVisible({
                              id: item?.p_id,
                              visible: true,
                            });
                            // setDeletePropVisible(true);
                          }}
                          buttonStyle={{
                            backgroundColor: Color.primary,
                            borderWidth: 1,
                            borderColor: Color.primary,
                            borderRadius: 5,
                            marginHorizontal: 5,
                          }}
                        />
                      </View>
                    </View>
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
                  justifyContent: 'center',
                  height: HEIGHT / 1.5,
                }}>
                {/* <MCIcon
                name="clipboard-text-search-outline"
                size={40}
                color={Color.primary}
              /> */}
                <Image
                  source={{ uri: Media.noProperty }}
                  style={{ width: 150, height: 100 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    padding: 5,
                    paddingHorizontal: 20,
                    marginStart: 5,
                    borderRadius: 5,
                    marginVertical: 10,
                    color: Color.primary,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  No Properties
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const StatusProperty = ({
  navigation,
  user_id,
  setDeletePropVisible,
  statusProperties,
}) => {
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [resultDate, setResultDate] = useState(null);

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

  return (
    <View style={{ flex: 1, backgroundColor: Color.white }}>
      <FlatList
        data={statusProperties}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (item[0]?.type == 'Albion Prime') {
            var text = 'Albion Prime';
            var colorText = text.split(' ').map((word, i) => (
              <Text key={i}>
                <Text
                  style={{
                    color: word == 'Prime' && Color.sunShade,
                  }}>
                  {word}{' '}
                </Text>
              </Text>
            ));
            const currentDate = moment();
            const yourDate = moment(item?.created_at);

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
              <>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <ImageBackground
                    source={{ uri: Media.background }}
                    resizeMode="contain"
                    style={{
                      height: 100,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
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
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('UpgradeTab');
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: Color.sunShade,
                              textAlign: 'center',
                              alignSelf: 'center',
                              textDecorationLine: 'underline',
                            }}>
                            AD Plan
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
                <View
                  key={index}
                  style={{
                    width: WIDTH - 20,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    backgroundColor: Color.primary,
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
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: Poppins.Medium,
                        fontSize: 12,
                        color: Color.white,
                      }}>
                      Your Free Posting
                    </Text>
                    <Text
                      style={{
                        fontFamily: Poppins.SemiBold,
                        fontSize: 18,
                        color: Color.white,
                      }}>
                      {colorText}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Poppins.Medium,
                        fontSize: 14,
                        color: Color.white,
                      }}>
                      To Get Unlimited Posting On Prime
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Color.white,
                      padding: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('UpgradeTab');
                    }}>
                    <Image
                      source={{ uri: Media.prime }}
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontFamily: Poppins.Medium,
                        fontSize: 16,
                        color: Color.black,
                      }}>
                      Upgrade
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }
          let bedroomValue = '';
          if (item && item.features && Array.isArray(item.features)) {
            item.features.forEach(feature => {
              if (feature?.title?.toLowerCase() === 'bedroom') {
                bedroomValue = feature.value;
              }
            });
          }
          const currentDate = moment();
          const yourDate = moment(item?.created_at);

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
            <TouchableOpacity
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
              }}
              onPress={() => {
                navigation.navigate('SingleProperty', { p_id: item?.p_id });
              }}>
              {item?.images != undefined && (
                <View style={{}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item?.images?.length > 0 &&
                      item?.images?.[0]?.image_url !== '' ? (
                      <Image
                        source={{
                          uri: item?.images[0]?.image_url,
                        }}
                        style={{
                          width: '100%',
                          height: 200,
                          borderRadius: 10,
                          resizeMode: 'cover',
                        }}
                      />
                    ) : (
                      <Image
                        source={{ uri: Media.noImage }}
                        style={{
                          width: 150,
                          height: 150,
                          resizeMode: 'contain',
                          justifyContent: 'center',
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                        }}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingEnd: 2,
                      height: 30,
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      right: 0,
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
                        onShare(item);
                      }}>
                      <Icon
                        name="arrow-redo-outline"
                        size={20}
                        color={Color.cloudyGrey}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View
                style={{
                  padding: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    width: '100%',
                    padding: 10,
                    borderRadius: 10,
                    marginTop: -60,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <PropertyStatus item={item?.status} />
                    <Text
                      style={{
                        flex: 1,
                        textAlign: 'right',
                        fontSize: 12,
                        color: Color.green,
                        fontFamily: Poppins.SemiBold,
                      }}>
                      PRICE
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {item?.property_name == null ? (
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Poppins.SemiBold,
                          textTransform: 'capitalize',
                        }}
                        numberOfLines={1}>
                        {item?.property?.property_type?.pt_name == 'PG'
                          ? item?.property?.property_type?.pt_name
                          : item?.property?.property_type?.pt_name == 'Flat' ||
                            item?.property?.property_type?.pt_name == 'Villa' ||
                            item?.property?.property_type?.pt_name == 'House'
                            ? `${bedroomValue} BHK, ${item?.property?.property_type?.pt_name}`
                            : `${item?.property?.area?.super_area} ${item?.property?.area?.super_area_unit}, ${item?.property?.property_type?.pt_name}`}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Poppins.SemiBold,
                          textTransform: 'capitalize',
                        }}>
                        {item?.property_name}
                      </Text>
                    )}
                    <Text
                      style={{
                        fontSize: 16,
                        // marginVertical: 5,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                        marginHorizontal: 5,
                      }}>
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
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 12,
                        color: Color.grey,
                        fontFamily: Poppins.SemiBold,
                        textTransform: 'capitalize',
                      }}>
                      by{' '}
                      {item?.property?.seller_details?.user_type_id == '1'
                        ? 'Buyer'
                        : item?.property?.seller_details?.user_type_id == '2'
                          ? 'Agent'
                          : 'Builder'}{' '}
                      | {resultDate}
                    </Text>
                    {item?.property_type?.pt_name != 'PG' && (
                      <Text
                        style={{
                          fontSize: 12,
                          // marginVertical: 5,
                          color: Color.grey,
                          fontFamily: Poppins.SemiBold,
                          marginHorizontal: 5,
                        }}>
                        {`@ ₹ ${item?.property?.area?.super_area} per ${item?.property?.area?.super_area_unit}`}
                      </Text>
                    )}
                  </View>
                  {item?.property_type?.pt_name != 'PG' && (
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.cloudyGrey,
                        fontFamily: Poppins.SemiBold,
                        textTransform: 'capitalize',
                        marginVertical: 5,
                      }}>
                      {`${item?.property?.area?.super_area} ${item?.property?.area?.super_area_unit}`}
                    </Text>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('SingleProperty', {
                          p_id: item?.p_id,
                        });
                      }}
                      style={{
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                          textTransform: 'capitalize',
                          textDecorationLine: 'underline',
                        }}>
                        View Post
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      }}>
                      {/* <Button
                        title={''}
                        titleStyle={{
                          color: Color.white,
                          marginHorizontal: 5,
                          fontSize: 14,
                        }}
                        icon={() => (
                          <FIcon name="pencil" size={20} color={Color.white} />
                        )}
                        onPress={() => {
                          navigation.navigate('EditProperty');
                        }}
                        buttonStyle={{
                          backgroundColor: Color.primary,
                          borderWidth: 1,
                          borderColor: Color.primary,
                          borderRadius: 5,
                          marginHorizontal: 5,
                        }}
                      /> */}
                      <Button
                        title={''}
                        titleStyle={{
                          color: Color.white,
                          marginHorizontal: 5,
                          fontSize: 14,
                        }}
                        icon={() => (
                          <AIcon name="delete" size={20} color={Color.white} />
                        )}
                        onPress={() => {
                          setDeletePropVisible({
                            id: item?.p_id,
                            visible: true,
                          });
                        }}
                        buttonStyle={{
                          backgroundColor: Color.primary,
                          borderWidth: 1,
                          borderColor: Color.primary,
                          borderRadius: 5,
                          marginHorizontal: 5,
                        }}
                      />
                    </View>
                  </View>
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
                justifyContent: 'center',
                height: HEIGHT / 1.5,
              }}>
              {/* <MCIcon
                name="clipboard-text-search-outline"
                size={40}
                color={Color.primary}
              /> */}
              <Image
                source={{ uri: Media.noProperty }}
                style={{ width: 150, height: 100 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  padding: 5,
                  paddingHorizontal: 20,
                  marginStart: 5,
                  borderRadius: 5,
                  marginVertical: 10,
                  color: Color.primary,
                  fontFamily: Poppins.SemiBold,
                }}>
                No Properties
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const MyPropertyScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [contacted, setContacted] = useState([]);
  const [myProperties, setMyproperties] = useState([]);
  const [ResponseList, setResponseList] = useState([]);
  const [statusProperties, setStatusproperties] = useState([]);
  const [deleteReason, setDeleteReason] = useState({});
  const [deletePropVisible, setDeletePropVisible] = useState({
    id: '',
    visible: false,
  });
  const [loading, setLoading] = useState(false);
  const layout = useWindowDimensions();
  const [cardHeight, setCardHeight] = useState(undefined);
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id } = userData;
  const [routes] = useState([
    { key: 'MyContactedList', title: 'My Contact' },
    { key: 'MyResponseProperty', title: 'My Response' },
    { key: 'PostedProperty', title: 'My Post' },
    { key: 'StatusProperty', title: 'Status' },
  ]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        switch (index) {
          case 0:
            const contact_response = await fetchData.Contacted(
              `user_id=${user_id}`,
            );
            setContacted(contact_response);
            break;
          case 1:
            const response = await fetchData.Contacted(`seller_id=${user_id}`);
            // console.log("My Response ------------ :", JSON.stringify(response));
            setResponseList(response);
            break;
          case 2:
            const post_response = await fetchData.Properties(
              `seller_id=${user_id}&listAll=true&status=Posted`,
            );
            setMyproperties(post_response);
            break;
          case 3:
            const status_response = await fetchData.Properties(
              `seller_id=${user_id}&listAll=true&status=sold,Posted,Rejected,in_review,cancelled`,
            );
            setStatusproperties(status_response);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [index, user_id]);

  const renderScene = ({ route }) => {
    switch (route.title) {
      case 'My Contact':
        return (
          <MyContactedList
            navigation={navigation}
            user_id={user_id}
            contacted={contacted}
          />
        );
      case 'My Response':
        return (
          <MyResponseProperty
            navigation={navigation}
            user_id={user_id}
            ResponseList={ResponseList}
          />
        );
      case 'My Post':
        return (
          <PostedProperty
            myProperties={myProperties}
            navigation={navigation}
            setDeletePropVisible={setDeletePropVisible}
            deletePropVisible={deletePropVisible}
            AlbionPrime={AlbionPrime}
            routes={routes}
            index={index}
            user_id={user_id}
          />
        );
      case 'Status':
        return (
          <StatusProperty
            navigation={navigation}
            user_id={user_id}
            setDeletePropVisible={setDeletePropVisible}
            statusProperties={statusProperties}
          />
        );
      default:
        return null;
    }
  };

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

  const deleteProperty = async id => {
    try {
      var data = {
        p_id: id,
        status: 4,
      };
      const deleteProperty = await fetchData.delete_Properties(data);
      setDeleteReason({});
    } catch (error) {
      console.log('error', error);
    }
  };

  const [deleteReasonData] = useState([
    { id: 1, title: 'Already Sold Via Albion', value: 'Already Sold Via Albion' },
    {
      id: 2,
      title: 'Already Sold Via Other Broker',
      value: 'Already Sold Via Other Broker',
    },
    {
      id: 3,
      title: 'Not Intreated In listing',
      value: 'Not Intreated In listing',
    },
    { id: 4, title: 'Other', value: 'Other' },
  ]);

  // const propertiesList = async index => {
  //   try {
  //     var data = `seller_id=${user_id}&listAll=true`;
  //     if (index == 1) {
  //       data += `&status=Posted`;
  //     } else if (index == 2) {
  //       data += `&status=sold,Posted,Rejected,in_review,cancelled`;
  //     }
  //     const property = await fetchData.Properties(data);
  //     setMyproperties(property);
  //   } catch (error) {
  //     console.error('Error fetching properties:', error);
  //   }
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   const tabTimeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  //   return () => clearInterval(tabTimeout);
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: Media.loader }}
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: Color.white }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => {
              return (
                <TabBar
                  {...props}
                  style={{ backgroundColor: Color.white, height: 60 }}
                  labelStyle={{
                    color: Color.primary,
                    fontSize: 12,
                    fontFamily: Poppins.SemiBold,
                    borderBottomColor: Color.primary,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                  indicatorStyle={{ backgroundColor: Color.primary }}
                  inactiveColor={Color.cloudyGrey}
                />
              );
            }}
          />
          <Modal visible={deletePropVisible?.visible} transparent={true}>
            <View style={{ flex: 1, backgroundColor: Color.transparantBlack }}>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => {
                  setDeletePropVisible({
                    id: '',
                    visible: false,
                  });
                }}
              />
              <View
                style={{
                  backgroundColor: Color.white,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 20,
                  height: cardHeight,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 5,
                    fontFamily: Poppins.Bold,
                    color: Color.black,
                  }}>
                  Reason for delete your listing?
                </Text>
                {deleteReasonData?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setDeleteReason(item);
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      <Icon
                        name={
                          deleteReason?.id === item.id
                            ? 'radio-button-on'
                            : 'radio-button-off'
                        }
                        size={20}
                        color={
                          deleteReason?.id === item.id
                            ? Color.primary
                            : Color.black
                        }
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Poppins.Medium,
                          marginHorizontal: 10,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginVertical: 5,
                  }}>
                  <Button
                    title={'Cancel'}
                    titleStyle={{
                      color: Color.primary,
                      marginHorizontal: 5,
                      fontFamily: Poppins.Medium,
                      fontSize: 14,
                    }}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: Color.primary,
                      backgroundColor: Color.white,
                      borderRadius: 5,
                      marginHorizontal: 5,
                    }}
                    onPress={() => {
                      setDeletePropVisible({
                        id: '',
                        visible: false,
                      });
                      setDeleteReason({});
                    }}
                    containerStyle={{ width: '45%' }}
                  />
                  <Button
                    title={'Delete'}
                    titleStyle={{
                      color: Color.white,
                      marginHorizontal: 5,
                      fontFamily: Poppins.Medium,
                      fontSize: 14,
                    }}
                    buttonStyle={{
                      backgroundColor: Color.primary,
                      borderRadius: 5,
                      marginHorizontal: 5,
                    }}
                    onPress={() => {
                      if (deleteReason?.value?.length > 0) {
                        deleteProperty(deletePropVisible?.id);
                        setDeletePropVisible({
                          id: '',
                          visible: false,
                        });
                      } else {
                        if (Platform.OS === 'android') {
                          common_fn.showToast('Select The Delete Reason');
                        } else {
                          alert('Select The Delete Reason');
                        }
                      }
                    }}
                    containerStyle={{ width: '45%' }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyPropertyScreen;

const styles = StyleSheet.create({
  orderContainer: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  imageEmptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  imageEmpty: { width: 150, height: 150 },
  orderSingleView: {
    backgroundColor: Color.white,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    marginVertical: 5,
    marginHorizontal: 5,
    elevation: 4,
    borderRadius: 10,
    padding: 10,
  },
  orderDataView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  orderBoxView: { marginHorizontal: 10, flex: 1 },
  historyView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  historyStatus: {
    marginHorizontal: 5,
    color: Color.black,
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
  },
  orderIdView: { flexDirection: 'row', alignItems: 'center' },
  orderHeaderText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Poppins.Light,
    color: Color.cloudyGrey,
  },
  orderValueText: {
    // flex: 1,
    color: Color.cloudyGrey,
    fontSize: 14,
    fontFamily: Poppins.Medium,
  },
  orderDateText: {
    color: Color.black,
    fontSize: 12,
    fontFamily: Poppins.Medium, textAlign: 'right',
    textTransform: 'capitalize', fontWeight: '800'
  },
  totalText: {
    color: Color.red,
    fontSize: 16, fontWeight: '800',
    fontFamily: Poppins.SemiBold,
  },
  emptyOrderPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 1.5,
  },
  EmptyOrderText: {
    fontSize: 18,
    fontFamily: Poppins.SemiBold,
    color: Color.black,
  },
});
