import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  TextInput,
  FlatList,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Color from '../../Config/Color';
import {useDispatch} from 'react-redux';
import {setAutoFilterLocation} from '../../Redux';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-svg';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Poppins} from '../../Global/FontFamily';
import Geolocation from 'react-native-geolocation-service';
import common_fn from '../../Config/common_fn';
import axios from 'axios';
import {Searchbar} from 'react-native-paper';
import fetchData from '../../Config/fetchData';
import {Divider} from 'react-native-elements';
import {Media} from '../../Global/Media';

var screenWidth = Dimensions.get('window').width;

const MapSearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [regionCoords, setRegion] = useState({lat: 37.78825, lng: -122.4324});
  const [marker, setMarker] = useState({lat: 37.78825, lng: -122.4324});
  const [mapData, setMapData] = useState({});

  const onPress = (data, details) => {
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
    setMapData(data);
  };

  const getCurrentLocation = async () => {
    const locPermissionDenied = await common_fn.locationPermission();
    if (locPermissionDenied) {
      Geolocation.getCurrentPosition(
        position => {
          setRegion({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    const location = setTimeout(() => {
      getCurrentLocation();
    }, 3000);
    return () => clearInterval(location);
  }, []);

  const GOOGLE_API_KEY = 'AIzaSyBaclFXXGbKWdfL9A-MN6D0yj5OzU50q6U';

  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState([]);
  const [AuctionData, setAuctionData] = useState([]);

  const getApiData = async () => {
    var data = `city=${search}`;
    const selectcity = await fetchData.getLocationSuggestions(data);
    setAuctionData(selectcity);
  };

  useEffect(() => {
    getApiData();
  }, [AuctionData]);

  // const propertySearch = search => {
  //   const searchProducts = AuctionData.filter(item =>
  //     item?.city?.toLowerCase().includes(search.toLowerCase()),
  //   );
  //   setSearchQuery(searchProducts);
  //   setSearch(search);
  // };

  const propertySearch = async search => {
    setSearch(search);
    try {
      var data = 'city=' + search;
      const getData = await fetchData.getLocationSuggestions(data);
      setAuctionData(getData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, []);

  return (
    // <View style={{flex: 1}}>
    //   <View style={{position: 'absolute', zIndex: 1, width: '100%'}}>
    //     <GooglePlacesAutocomplete
    //       placeholder="Search"
    //       onPress={onPress}
    //       styles={{
    //         description: {
    //           color: Color.black,
    //         },
    //         powered: {width: 0, height: 0},
    //         textInputContainer: {
    //           flex: 1,
    //           backgroundColor: 'white',
    //           borderWidth: 1,
    //           borderColor: '#D8D8D8',
    //           borderRadius: 5,
    //           marginHorizontal: 10,
    //           marginTop: 10,
    //           placeholderTextColor: '#000',
    //         },
    //         textInput: {
    //           color: Color.black,
    //           fontFamily: Poppins.SemiBold,
    //           fontSize: 16,
    //           paddingBottom: 0,
    //         },
    //         predefinedPlacesDescription: {
    //           color: '#1faadb',
    //         },
    //       }}
    //       renderRightButton={() => {
    //         return (
    //           <TouchableOpacity
    //             style={{
    //               // position: 'absolute',
    //               // top: 0,
    //               // zIndex: 1,
    //               marginHorizontal: 10,
    //               alignItems: 'center',
    //               bottom: 0,
    //               justifyContent: 'center',
    //             }}
    //             onPress={() => {
    //               dispatch(setAutoFilterLocation(mapData));
    //               navigation.goBack();
    //             }}>
    //             <Text
    //               style={{
    //                 fontSize: 14,
    //                 fontFamily: Poppins.SemiBold,
    //                 color: Color.DullOrange,
    //               }}>
    //               Done
    //             </Text>
    //           </TouchableOpacity>
    //         );
    //       }}
    //       GooglePlacesDetailsQuery={{
    //         fields: 'geometry',
    //       }}
    //       fetchDetails={true}
    //       textInputProps={{
    //         leftIcon: {type: 'font-awesome', name: 'chevron-left'},
    //         errorStyle: {color: 'red'},
    //         placeholderTextColor: Color.cloudyGrey,
    //       }}
    //       query={{
    //         key: GOOGLE_API_KEY,
    //         language: 'en',
    //         components: 'country:in',
    //       }}
    //     />
    //   </View>
    //   <View style={{width: '100%', flex: 1, justifyContent: 'center'}}>
    //     <MapView
    //       style={styles.map}
    //       region={{
    //         latitude: regionCoords.lat,
    //         longitude: regionCoords.lng,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       }}>
    //       <Marker coordinate={{latitude: marker.lat, longitude: marker.lng}} />
    //     </MapView>
    //     <View
    //       style={{
    //         alignSelf: 'center',
    //         width: '50%',
    //         marginTop: 50,
    //       }}>
    //       <Text
    //         style={{
    //           color: Color.primary,
    //           fontFamily: Poppins.Bold,
    //           textAlign: 'center',
    //           fontSize: 16,
    //         }}>
    //         Your Location
    //       </Text>
    //       <MCIcon
    //         name="map-marker-outline"
    //         size={45}
    //         style={{alignSelf: 'center'}}
    //         color="#005f73"
    //       />
    //     </View>
    //   </View>
    // </View>
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <Searchbar
        placeholder={`Search your City`}
        placeholderTextColor={Color.cloudyGrey}
        onChangeText={query => propertySearch(query)}
        value={search}
        style={{
          borderRadius: 10,
          backgroundColor: Color.white,
          borderWidth: 1,
          borderColor: Color.primary,
          color: Color.black,
        }}
        inputStyle={{color: Color.black}}
        iconColor={Color.cloudyGrey}
      />
      {search ? (
        <FlatList
          data={AuctionData}
          scrollEnabled={true}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  dispatch(setAutoFilterLocation(item?.value));
                  navigation.goBack();
                }}
                style={{marginVertical: 5}}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Poppins.SemiBold,
                      color: Color.black,
                      textTransform: 'capitalize',
                    }}>
                    {item?.value}
                  </Text>
                </View>
                <Divider style={{height: 1, marginVertical: 10}} />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={styles.NoDataContainer}>
          <Image
            source={{uri: Media.noProperty}}
            style={styles.ImageView}
            resizeMode="contain"
          />
          <Text style={styles.NoDataText}>Search your City</Text>
        </View>
      )}
    </View>
  );
};

export default MapSearchScreen;

const styles = StyleSheet.create({
  searchloc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '8%',
    height: '8%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 999,
  },
  MainContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  mapStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '84%',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  searchbar: {
    description: {
      fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      top: 50,
      width: screenWidth - 10,
      borderWidth: 0,
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
      borderWidth: 0,
    },
    listView: {
      backgroundColor: 'rgba(192,192,192,0.9)',
      top: 23,
    },
  },
  NoDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  ImageView: {height: 100, width: 150},
  NoDataText: {
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
    color: Color.grey,
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: Color.white,
  },
});
