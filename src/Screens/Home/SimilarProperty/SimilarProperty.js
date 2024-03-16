import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { base_image_properties } from '../../../Config/base_url';
import Color from '../../../Config/Color';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { Media } from '../../../Global/Media';
import { Poppins } from '../../../Global/FontFamily';
import common_fn from '../../../Config/common_fn';

const SimilarProperty = props => {
  var { item, navigation } = props;
  let bedroomValue = '';
  if (item && item.features && Array.isArray(item.features)) {
    item.features.forEach(feature => {
      if (feature?.title?.toLowerCase() === 'bedroom') {
        bedroomValue = feature.value;
      }
    });
  }
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginVertical: 15,
        }}>
        <View style={{ flex: 1, marginStart: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Similar Property
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              paddingVertical: 5,
              color: Color.cloudyGrey,
            }}>
            Get best deals from prime membership
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item?.similar_properties.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: 250,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  backgroundColor: Color.white,
                }}
                onPress={() => {
                  navigation.replace('SingleProperty', {
                    p_id: item.p_id,
                  });
                }}>
                <View>
                  {item?.images?.length > 0 ? (
                    <Image
                      source={{
                        uri: item?.images[0]?.image_url,
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
                      source={{ uri: Media.noImage }}
                      style={{
                        width: 250,
                        height: 150,
                        resizeMode: 'contain',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                      }}
                    />
                  )}
                </View>
                <View
                  style={{
                    // alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 18,
                        color: Color.primary,
                        fontWeight: 'bold',
                      }}
                      numberOfLines={1}>
                      ₹ {item?.property_type?.pt_name == "PG" ?
                        common_fn.getMinToMaxPrice(item?.room_category) :
                        item?.expected_price?.length >= 5
                          ? common_fn.formatNumberWithSuffix(
                            item?.expected_price,
                          )
                          : item?.expected_price}
                    </Text>
                    {item?.property_type?.pt_id != 3 && (
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Poppins.Medium,
                        }}
                        numberOfLines={1}>
                        {item?.property_type?.pt_name == "PG" ? item?.property_type?.pt_name :
                          item?.property_type?.pt_name == 'Flat' ||
                            item?.property_type?.pt_name == 'Villa' ||
                            item?.property_type?.pt_name == 'House'
                            ? `${bedroomValue} BHK, ${item?.property_type?.pt_name}`
                            : `${item?.area?.super_area} ${item?.area?.super_area_unit}, ${item?.property_type?.pt_name}`}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                      }}
                      numberOfLines={1}>
                      {item.property_name?.length > 0
                        ? item.property_name
                        : '----'}
                    </Text>
                  </View>
                  <View
                    style={{
                      // flexDirection: 'row',
                      // alignItems: 'center',
                      // justifyContent: 'center',
                      marginHorizontal: 10,
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
                        {item?.location}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SimilarProperty;
