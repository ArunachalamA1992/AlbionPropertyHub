import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import FeIcon from 'react-native-vector-icons/Feather';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {openPicker} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Color from '../../Config/Color';
import {Poppins} from '../../Global/FontFamily';
import {AmenitiesCheckbox} from '../../Components/Checkbox';

const {width, height} = Dimensions.get('screen');

const EditPropertyScreen = ({navigation}) => {
  const [EditProperty, setEditProperty] = useState({
    images: [],
    price: '',
    transaction_type: {},
    possesion_status: {},
    age_of_contruction: {},
    contruction_done: {},
    direction_facing: {},
    ownership_type: {},
    property_details: '',
    amenities: [],
  });
  const [images, setImages] = useState([]);
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    const resizeImages = [];
    Promise.all(
      photo.map(async (image, index) => {
        var path = image.realPath;
        var maxWidth = 1000,
          maxHeight = 1000,
          compressFormat = 'JPEG',
          quality = 100,
          rotation = 0,
          keepMeta = false,
          options = {};
        var outputPath;

        if (path) {
          try {
            const resizedImage = await ImageResizer.createResizedImage(
              path,
              maxWidth,
              maxHeight,
              compressFormat,
              quality,
              rotation,
              outputPath,
              keepMeta,
              options,
            );
            resizeImages.push(resizedImage);
          } catch (err) {
            console.log(err);
          }
        }
      }),
    ).then(() => {
      setImages([...images, ...resizeImages]);
      setEditProperty({
        images: [...images, ...resizeImages],
        price: EditProperty?.price,
        transaction_type: EditProperty?.transaction_type,
        possesion_status: EditProperty?.possesion_status,
        age_of_contruction: EditProperty?.age_of_contruction,
        contruction_done: EditProperty?.contruction_done,
        direction_facing: EditProperty?.direction_facing,
        ownership_type: EditProperty?.ownership_type,
        property_details: EditProperty?.property_details,
        amenities: EditProperty?.amenities,
      });
    });
  }, [photo.length]);

  const galleryImage = async () => {
    try {
      const response = await openPicker({
        selectedAssets: 'images',
        isExportThumbnail: true,
        maxVideo: 1,
        usedCameraButton: false,
        isCrop: true,
        isCropCircle: true,
      });
      setPhoto(response);
      setEditProperty({
        images: EditProperty?.images,
        price: EditProperty?.price,
        transaction_type: EditProperty?.transaction_type,
        possesion_status: EditProperty?.possesion_status,
        age_of_contruction: EditProperty?.age_of_contruction,
        contruction_done: EditProperty?.contruction_done,
        direction_facing: EditProperty?.direction_facing,
        ownership_type: EditProperty?.ownership_type,
        property_details: EditProperty?.property_details,
        amenities: EditProperty?.amenities,
      });
    } catch (e) {
      console.log('e', e);
    }
  };

  var text =
    'Upload original property photos for Enjoy 40% better visibility and';
  var colorText = text.split(' ').map((word, i) => (
    <Text
      key={i}
      style={{
        color:
          (word == 'Enjoy' && Color.sunShade) ||
          (word == '40%' && Color.sunShade) ||
          (word == 'better' && Color.sunShade) ||
          (word == 'visibility' && Color.sunShade),
      }}>
      {word}{' '}
    </Text>
  ));

  const [transactiontype] = useState([
    {
      id: 1,
      title: 'New property',
      value: 'New property',
    },
    {
      id: 2,
      title: 'Resale',
      value: 'Resale',
    },
  ]);
  const [possessionStatus] = useState([
    {
      id: 1,
      title: 'Under Construction',
      value: 'Under Construction',
    },
    {
      id: 2,
      title: 'Ready to move',
      value: 'Ready to move',
    },
  ]);
  const [constructionAge] = useState([
    {id: 1, title: 'New', value: 'New'},
    {id: 2, title: '0-1 Years', value: '0-1 Years'},
    {id: 3, title: '1-5 Years', value: '1-5 Years'},
    {id: 4, title: '5-10 Years ', value: '5-10 Years'},
    {id: 5, title: '10+ Years ', value: '10+ Years'},
  ]);
  const [propertyCompleteDuration] = useState([
    {id: 1, title: 'New', value: 'New'},
    {id: 2, title: '0-6 mon', value: '0-6 mon'},
    {id: 3, title: '0-1 Years', value: '0-1 Years'},
    {id: 4, title: '1-5 Years', value: '1-5 Years'},
  ]);
  const [PropertyFacing] = useState([
    {id: 1, title: 'North', value: 'North'},
    {id: 2, title: 'North -  East', value: 'North -  East'},
    {id: 3, title: 'East', value: 'East'},
    {id: 4, title: 'West', value: 'West'},
    {id: 5, title: 'South', value: 'South'},
    {id: 6, title: 'South - East', value: 'South - East'},
    {id: 7, title: 'South - West', value: 'South - West'},
    {id: 8, title: 'North - West', value: 'North - West'},
  ]);
  const [Ownership] = useState([
    {id: 1, title: 'Freehold'},
    {id: 2, title: 'Leasehold'},
    {id: 3, title: 'Co-operative Society'},
    {id: 4, title: 'Power of Attorney'},
  ]);
  const [Amenities] = useState([
    {id: 1, title: 'Water Storage'},
    {id: 2, title: 'Park '},
    {id: 3, title: 'Lift'},
    {id: 4, title: 'Visitor Parking '},
    {id: 5, title: 'Piped gas '},
    {id: 6, title: 'Lights'},
    {id: 7, title: 'Maintenance Staff '},
  ]);
  const [AmenitiesSelectedItem, setAmenitiesSelectedItem] = useState([]);
  const handleAmenitiesPress = itemId => {
    if (AmenitiesSelectedItem.includes(itemId)) {
      setAmenitiesSelectedItem(
        AmenitiesSelectedItem?.filter(single => single !== itemId),
      );
      setEditProperty({
        images: EditProperty?.images,
        price: EditProperty?.price,
        transaction_type: EditProperty?.transaction_type,
        possesion_status: EditProperty?.possesion_status,
        age_of_contruction: EditProperty?.age_of_contruction,
        contruction_done: EditProperty?.contruction_done,
        direction_facing: EditProperty?.direction_facing,
        ownership_type: EditProperty?.ownership_type,
        property_details: EditProperty?.property_details,
        amenities: EditProperty?.amenities,
      });
    } else {
      setAmenitiesSelectedItem([...AmenitiesSelectedItem, itemId]);
      const selectedItem = Amenities.find(single => single.id === itemId);
      setEditProperty({
        images: EditProperty?.images,
        price: EditProperty?.price,
        transaction_type: EditProperty?.transaction_type,
        possesion_status: EditProperty?.possesion_status,
        age_of_contruction: EditProperty?.age_of_contruction,
        contruction_done: EditProperty?.contruction_done,
        direction_facing: EditProperty?.direction_facing,
        ownership_type: EditProperty?.ownership_type,
        property_details: EditProperty?.property_details,
        amenities: [...EditProperty?.amenities, selectedItem],
      });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Add Property Images{' '}
            <Text style={{fontSize: 14, color: Color.lightgrey}}>
              (Optional)
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}>
            {colorText}
          </Text>
          <View
            style={{
              marginVertical: 10,
              borderColor: Color.black,
              borderWidth: 1,
              // padding: 10,
              borderRadius: 10,
            }}>
            {images.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}>
                {images.map((item, key) => (
                  <TouchableOpacity
                    key={key}
                    style={{width: '50%'}}
                    onPress={() => deleteImage(key, images)}>
                    <Image
                      source={{uri: item.uri}}
                      style={{
                        height: 100,
                        marginVertical: 10,
                        resizeMode: 'contain',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        opacity: 0.5,
                      }}>
                      <Icon name="close-circle" size={30} color={Color.black} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={{padding: 10}}>
                {/* <Image
          source={require('../../image/image_upload.png')}
          style={styles.ImageUploadContainer}
        /> */}
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.cloudyGrey,
                    fontWeight: 'bold',
                  }}>
                  ( Your first image will be used as a featured image, and it
                  will be shown as thumbnail. )
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <MCIcon
              name="folder-multiple-image"
              size={18}
              color={Color.cloudyGrey}
            />
            <Text
              style={{
                fontSize: 14,
                color: Color.cloudyGrey,
                fontWeight: 'bold',
                marginHorizontal: 10,
              }}>
              Add 4+ photos might increase responses on your property ad
            </Text>
          </View>
          <Button
            title={images?.length > 0 ? 'Add more' : 'Select Image'}
            titleStyle={{
              fontSize: 16,
              color: Color.primary,
              marginHorizontal: 5,
            }}
            buttonStyle={{
              backgroundColor: Color.white,
              borderWidth: 1,
              borderColor: Color.primary,
              borderRadius: 10,
            }}
            icon={() => <FIcon name="plus" color={Color.primary} size={18} />}
            onPress={() => {
              galleryImage();
            }}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
              }}>
              Expected Price{' '}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              (INR)
            </Text>
          </View>
          <TextInput
            placeholder="₹ Enter Expected Price"
            placeholderTextColor={Color.cloudyGrey}
            value={EditProperty?.price}
            onChangeText={value => {
              setEditProperty({
                images: EditProperty?.images,
                price: value,
                transaction_type: EditProperty?.transaction_type,
                possesion_status: EditProperty?.possesion_status,
                age_of_contruction: EditProperty?.age_of_contruction,
                contruction_done: EditProperty?.contruction_done,
                direction_facing: EditProperty?.direction_facing,
                ownership_type: EditProperty?.ownership_type,
                property_details: EditProperty?.property_details,
                amenities: EditProperty?.amenities,
              });
            }}
            keyboardType="number-pad"
            style={{
              borderColor: Color.cloudyGrey,
              borderWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
              }}>
              Transaction Type
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {transactiontype.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      EditProperty?.transaction_type?.id == item?.id
                        ? '#8C193F20'
                        : Color.white,
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                    padding: 10,
                    marginHorizontal: 5,
                    borderColor:
                      EditProperty?.transaction_type?.id == item?.id
                        ? Color.primary
                        : Color.lightgrey,
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    setEditProperty({
                      images: EditProperty?.images,
                      price: EditProperty?.price,
                      transaction_type: item,
                      possesion_status: EditProperty?.possesion_status,
                      age_of_contruction: EditProperty?.age_of_contruction,
                      contruction_done: EditProperty?.contruction_done,
                      direction_facing: EditProperty?.direction_facing,
                      ownership_type: EditProperty?.ownership_type,
                      property_details: EditProperty?.property_details,
                      amenities: EditProperty?.amenities,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        EditProperty?.transaction_type?.id == item?.id
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
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.black,
              }}>
              Possesssion Status
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {possessionStatus.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      EditProperty?.possesion_status?.id == item?.id
                        ? '#8C193F20'
                        : Color.white,
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                    padding: 10,
                    marginHorizontal: 5,
                    borderColor:
                      EditProperty?.possesion_status?.id == item?.id
                        ? Color.primary
                        : Color.lightgrey,
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    setEditProperty({
                      images: EditProperty?.images,
                      price: EditProperty?.price,
                      transaction_type: EditProperty?.transaction_type,
                      possesion_status: item,
                      age_of_contruction: EditProperty?.age_of_contruction,
                      contruction_done: EditProperty?.contruction_done,
                      direction_facing: EditProperty?.direction_facing,
                      ownership_type: EditProperty?.ownership_type,
                      property_details: EditProperty?.property_details,
                      amenities: EditProperty?.amenities,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        EditProperty?.possesion_status?.id == item?.id
                          ? Color.primary
                          : Color.black,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {EditProperty?.possesion_status?.value == 'Ready to move' ? (
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
              }}>
              Age Of Construction
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <FlatList
                nestedScrollEnabled
                data={constructionAge}
                numColumns={3}
                keyExtractor={(item, index) => item + index}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          EditProperty?.age_of_contruction?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        borderRadius: 50,
                        marginVertical: 10,
                        padding: 10,
                        marginHorizontal: 5,
                        borderColor:
                          EditProperty?.age_of_contruction?.id == item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setEditProperty({
                          images: EditProperty?.images,
                          price: EditProperty?.price,
                          transaction_type: EditProperty?.transaction_type,
                          possesion_status: EditProperty?.possesion_status,
                          age_of_contruction: item,
                          contruction_done: EditProperty?.contruction_done,
                          direction_facing: EditProperty?.direction_facing,
                          ownership_type: EditProperty?.ownership_type,
                          property_details: EditProperty?.property_details,
                          amenities: EditProperty?.amenities,
                        });
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontWeight: 'bold',
                            marginHorizontal: 10,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        ) : (
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontWeight: 'bold',
              }}>
              Property Completion Duration
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <FlatList
                nestedScrollEnabled
                data={propertyCompleteDuration}
                numColumns={3}
                keyExtractor={(item, index) => item + index}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          EditProperty?.contruction_done?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        borderRadius: 50,
                        marginVertical: 10,
                        padding: 10,
                        marginHorizontal: 5,
                        borderColor:
                          EditProperty?.contruction_done?.id == item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setEditProperty({
                          images: EditProperty?.images,
                          price: EditProperty?.price,
                          transaction_type: EditProperty?.transaction_type,
                          possesion_status: EditProperty?.possesion_status,
                          age_of_contruction: EditProperty?.age_of_contruction,
                          contruction_done: item,
                          direction_facing: EditProperty?.direction_facing,
                          ownership_type: EditProperty?.ownership_type,
                          property_details: EditProperty?.property_details,
                          amenities: EditProperty?.amenities,
                        });
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontWeight: 'bold',
                            marginHorizontal: 10,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        )}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              color: Color.cloudyGrey,
              fontFamily: 'Poppins-SemiBold',
            }}>
            Additional
          </Text>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Direction facing
          </Text>
          <View style={{marginVertical: 10}}>
            <View
              style={{
                backgroundColor: Color.white,
                paddingEnd: 10,
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}>
              {PropertyFacing.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        EditProperty?.direction_facing?.id == item?.id
                          ? '#8C193F20'
                          : Color.white,
                      // width: width / 3.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      padding: 10,
                      marginVertical: 10,
                      marginHorizontal: 5,
                      borderColor:
                        EditProperty?.direction_facing?.id == item?.id
                          ? Color.primary
                          : Color.lightgrey,
                      borderWidth: 1,
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      setEditProperty({
                        images: EditProperty?.images,
                        price: EditProperty?.price,
                        transaction_type: EditProperty?.transaction_type,
                        possesion_status: EditProperty?.possesion_status,
                        age_of_contruction: EditProperty?.age_of_contruction,
                        contruction_done: EditProperty?.contruction_done,
                        direction_facing: item,
                        ownership_type: EditProperty?.ownership_type,
                        property_details: EditProperty?.property_details,
                        amenities: EditProperty?.amenities,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Type of Ownership
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}>
            {Ownership.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      EditProperty?.ownership_type?.id == item?.id
                        ? '#8C193F20'
                        : Color.white,
                    // width: width / 3.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 5,
                    borderRadius: 50,
                    // height: 80,
                    marginVertical: 10,
                    padding: 10,
                    borderColor:
                      EditProperty?.ownership_type?.id == item?.id
                        ? Color.primary
                        : Color.lightgrey,
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    setEditProperty({
                      images: EditProperty?.images,
                      price: EditProperty?.price,
                      transaction_type: EditProperty?.transaction_type,
                      possesion_status: EditProperty?.possesion_status,
                      age_of_contruction: EditProperty?.age_of_contruction,
                      contruction_done: EditProperty?.contruction_done,
                      direction_facing: EditProperty?.direction_facing,
                      ownership_type: item,
                      property_details: EditProperty?.property_details,
                      amenities: EditProperty?.amenities,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontWeight: 'bold',
            }}>
            Amenities & USP’s
          </Text>
          <View style={{marginVertical: 10}}>
            <View
              style={{
                backgroundColor: Color.white,
                paddingEnd: 10,
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}>
              {Amenities.map((item, index) => {
                return (
                  <AmenitiesCheckbox
                    key={index}
                    label={item.title}
                    checked={AmenitiesSelectedItem.includes(item.id)}
                    onPress={() => handleAmenitiesPress(item.id)}
                  />
                );
              })}
            </View>
          </View>
        </View>
        <Button
          title={'Submit'}
          buttonStyle={{backgroundColor: Color.primary}}
        />
      </ScrollView>
    </View>
  );
};

export default EditPropertyScreen;
