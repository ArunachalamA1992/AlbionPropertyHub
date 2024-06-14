import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Linking,
  BackHandler,
  Platform,
  Modal,
  Pressable,
  Alert,
  TextInput,
  Keyboard,
} from 'react-native';
import {Media} from '../../Global/Media';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AIcon from 'react-native-vector-icons/AntDesign';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from '../../Components/imageView';
import {Button, Divider} from 'react-native-elements';
import SimilarProperty from './SimilarProperty/SimilarProperty';
import fetchData from '../../Config/fetchData';
import {SafeAreaView} from 'react-native';
// import {Share} from 'react-native';
import {Poppins} from '../../Global/FontFamily';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import common_fn from '../../Config/common_fn';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import RBSheet from 'react-native-raw-bottom-sheet';
import RNFetchBlob from 'rn-fetch-blob';
import {ActivityIndicator} from 'react-native-paper';
import Share from 'react-native-share';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {PlanPhonePurchase} from '../../Components/PlanPurchase';
import {Iconviewcomponent} from '../../Components/Icontag';
import {setUserData} from '../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

var {width, height} = Dimensions.get('screen');

const AmenitiesIconData = ({item}) => {
  const formattedItem = item.replace(/_/g, '').toLowerCase();
  switch (formattedItem) {
    case 'lift':
      return <MCIcon name="elevator-passenger" size={20} color={Color.black} />;
    case 'geyser':
      return <MCIcon name="water-boiler" size={20} color={Color.black} />;
    case 'parking':
      return <F5Icon name="parking" size={20} color={Color.black} />;
    case 'visitor parking':
      return <F5Icon name="parking" size={20} color={Color.black} />;
    case 'park':
      return <MCIcon name="slide" size={20} color={Color.black} />;
    case 'water':
      return (
        <MCIcon
          name="diving-scuba-tank-multiple"
          size={20}
          color={Color.black}
        />
      );
    case '24 / 7 water':
      return (
        <MCIcon
          name="diving-scuba-tank-multiple"
          size={20}
          color={Color.black}
        />
      );
    case 'water storage':
      return (
        <MCIcon
          name="diving-scuba-tank-multiple"
          size={20}
          color={Color.black}
        />
      );
    case 'power':
      return <MCIcon name="transmission-tower" size={20} color={Color.black} />;
    case 'mattress':
      return <Icon name="bed" size={20} color={Color.black} />;
    case 'security':
      return <MCIcon name="security" size={20} color={Color.black} />;
    case 'warden':
      return <MCIcon name="security" size={20} color={Color.black} />;
    case 'wifi':
      return <MCIcon name="wifi" size={20} color={Color.black} />;
    case 'building wi-Fi':
      return (
        <Image
          source={{uri: Media.Electricgenerator}}
          style={{width: 20, height: 20}}
        />
      );

    // return <MCIcon name="wifi" size={20} color={Color.black} />;
    case 'fitness centre':
      return <MIcon name="fitness-center" size={20} color={Color.black} />;
    case 'spa':
      return <F5Icon name="spa" size={20} color={Color.black} />;
    case 'swimming pools':
      return <F5Icon name="swimming-pool" size={20} color={Color.black} />;
    case 'ac':
      return <F5Icon name="bacon" size={20} color={Color.black} />;
    case 'surveillance cameras':
      return <MCIcon name="cctv" size={20} color={Color.black} />;
    case 'cctv':
      return <MCIcon name="cctv" size={20} color={Color.black} />;
    case 'tv':
      return <MIcon name="tv" size={20} color={Color.black} />;
    case 'washrooms':
      return <MIcon name="wash" size={20} color={Color.black} />;
    case 'billiards table':
      return <MCIcon name="billiards" size={20} color={Color.black} />;
    case 'air cooler':
      return (
        <MCIcon name="coolant-temperature" size={20} color={Color.black} />
      );
    case 'cupboard':
      return <MCIcon name="cupboard" size={20} color={Color.black} />;
    case 'gymnasium':
      return <MCIcon name="dumbbell" size={20} color={Color.black} />;
    case 'fitness center':
      return <MCIcon name="dumbbell" size={20} color={Color.black} />;
    case 'kitchen for self cooking':
      return <MIcon name="kitchen" size={20} color={Color.black} />;
    case 'laundry':
      return (
        <MIcon name="local-laundry-service" size={20} color={Color.black} />
      );
    case 'room cleaning':
      return <MIcon name="cleaning-services" size={20} color={Color.black} />;
    case 'power backup':
      return (
        <Image
          source={{uri: Media.Electricgenerator}}
          style={{width: 20, height: 20}}
        />
      );
  }
};

const FeaturesIconData = ({title, value}) => {
  switch (title) {
    case 'bedroom':
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          <Icon name="bed" size={25} color={Color.black} />
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
              marginHorizontal: 5,
            }}>
            {value}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
            }}>
            {title}
          </Text>
        </View>
      );
    case 'baths':
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          <MCIcon name="bathtub" size={25} color={Color.black} />
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
              marginHorizontal: 5,
            }}>
            {value}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
            }}>
            {title}
          </Text>
        </View>
      );
    case 'Sq.ft':
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          <AIcon name="arrowsalt" size={25} color={Color.black} />
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
              marginHorizontal: 5,
            }}>
            {value}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
            }}>
            {title}
          </Text>
        </View>
      );
    case 'balconies':
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          <MCIcon name="balcony" size={25} color={Color.black} />
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
              marginHorizontal: 5,
            }}>
            {value}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
            }}>
            {title}
          </Text>
        </View>
      );
    case 'parking':
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          <MCIcon name="parking" size={25} color={Color.black} />
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
              marginHorizontal: 5,
            }}>
            {value}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: Poppins.SemiBold,
              marginHorizontal: 5,
            }}>
            {title}
          </Text>
        </View>
      );
  }
};

const SinglePropertyScreen = ({navigation, route}) => {
  const routeName = useRoute();
  const [p_id] = useState(route.params.p_id);
  const [loginEnable, setLoginEnable] = useState(false);
  console.log(loginEnable);
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const [Amenities] = useState([
    {id: 1, title: 'lift', image: Media.lift},
    {id: 2, title: 'Parking', image: Media.parking},
    {id: 3, title: 'Water', image: Media.water},
    {id: 4, title: 'Power', image: Media.power},
  ]);
  const [features] = useState([
    {id: 1, title: 'Bedrooms'},
    {id: 2, title: 'Bathroom'},
    {id: 3, title: 'Sq.ft'},
    {id: 4, title: 'Parking'},
  ]);

  const [preparedLoans] = useState([
    {
      id: 1,
      image: Media.loan1Banner,
    },
    {
      id: 2,
      image: Media.loan2,
    },
    {
      id: 3,
      image: Media.loan3,
    },
    {
      id: 4,
      image: Media.loan4,
    },
  ]);

  const headerOpacity = animatedOpacityValue.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    useNativeDriver: false,
  });
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [discMoreButton, setDiscShowMoreButton] = useState(false);
  const [discriptiontextShown, setDiscriptiontextShown] = useState(false);
  const [disclaimertextShown, setDisclaimerTextShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numLines, setNumLines] = useState(undefined);
  const [discnumLines, setdiscNumLines] = useState(undefined);
  const [ProductData, setProductData] = useState({});
  const [reportSelected, setReportSelected] = useState({});
  const [reportVisible, setReportVisble] = useState(false);
  const [reportData] = useState([
    {id: 1, label: 'Fake Property', value: 'Fake Property'},
    {id: 2, label: 'Suspicious Property', value: 'Suspicious Property'},
    {id: 3, label: 'Re-Review Property', value: 'Re-Review Property'},
  ]);
  const [processingProducts, setProcessingProducts] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [cardheight, setHeight] = useState(undefined);
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id, username, mobile_number, email, get_phone_quota} = userData;
  const [Username, setUsername] = useState(username);
  const [number, setNumber] = useState(mobile_number);
  const [Usermail, setUsermail] = useState(email);
  const [get_quota_value, setGet_quota_value] = useState('');
  const [phoneQuotoVisible, setPhoneQuotoVisible] = useState(false);
  const [EmailContactVisible, setEmailContactVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [propertyId, setPropertyId] = useState(0);
  const DownloadRBSheet = useRef();
  const UpdateRBSheet = useRef();
  const SellerRBSheet = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    getCheck_quota();
  }, [get_quota_value]);

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

  const toggleTextShown = () => {
    setDiscriptiontextShown(!discriptiontextShown);
  };
  const toggledisclaimerTextShown = () => {
    setDisclaimerTextShown(!disclaimertextShown);
  };

  useEffect(() => {
    setNumLines(discriptiontextShown ? undefined : 3);
    setdiscNumLines(disclaimertextShown ? undefined : 3);
  }, [discriptiontextShown, disclaimertextShown]);

  const onDescriptionTextLayout = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 3 && !discriptiontextShown) {
        setShowMoreButton(true);
        setNumLines(3);
      }
    },
    [discriptiontextShown],
  );

  const onDisclaimerTextLayout = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 2 && !disclaimertextShown) {
        setDiscShowMoreButton(true);
        setdiscNumLines(2);
      }
    },
    [disclaimertextShown],
  );

  const fetchAPI = async () => {
    try {
      var data = 'p_id=' + p_id;
      if (user_id != undefined) {
        data += '&user_id=' + user_id;
      }
      const product = await fetchData.Properties(data);
      setProductData(product);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAPI().finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (EmailContactVisible) {
      fetchAPI();
      const interval = setInterval(() => {
        setEmailContactVisible(false);
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [EmailContactVisible]);

  // const urlToBase64 = async url => {
  //   try {
  //     const response = await RNFetchBlob.fetch('GET', url);
  //     const base64String = response.base64();
  //     return base64String;
  //   } catch (error) {
  //     console.error('Error converting URL to Base64:', error);
  //     return null;
  //   }
  // };

  const onShare = async () => {
    try {
      const deepLink = 'albion://review/' + ProductData?.p_id;

      const image_url = ProductData?.images?.[0]?.image_url;
      const base64String = await common_fn.urlToBase64(image_url);

      const shareOptions = {
        title: 'Share via',
        message: `Check out this property: ${deepLink}\n\nCopy and paste the link in your browser if the app is not opened directly.`,
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
          Alert.alert('Wishlist Removed Successfully');
        }
        setProductData(product => {
          return product.p_id === id
            ? {...product, isWishListed: false}
            : product;
        });
      } else if (response?.message === 'Success' && !isWishList) {
        if (Platform.OS === 'android') {
          common_fn.showToast('Wishlist Added Successfully');
        } else {
          Alert.alert('Wishlist Added Successfully');
        }
        setProductData(product => {
          return product.p_id === id
            ? {...product, isWishListed: true}
            : product;
        });
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

  const downloadPdf = async () => {
    const html = common_fn.convertObjectToHtml([ProductData]);
    const downloadPath = RNFetchBlob.fs.dirs.DownloadDir;

    const pdfPath = await common_fn.convertToPdf(
      html,
      downloadPath,
      ProductData?.property_name,
    );
  };

  const taby = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateRight: 'clamp',
  });

  const openAppSettings = () => {
    Linking.openSettings();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  function handleBackButtonClick() {
    if (routeName.name == 'SingleProperty') {
      navigation.goBack();
      return true;
    }
    return false;
  }

  let bedroomValue = '';
  if (
    ProductData &&
    ProductData?.features &&
    Array.isArray(ProductData?.features)
  ) {
    ProductData?.features.forEach(feature => {
      if (feature?.title?.toLowerCase() === 'bedroom') {
        bedroomValue = feature.value;
      }
    });
  }

  const reportApiData = async () => {
    try {
      var data = {
        p_id: 1,
        user_id: user_id,
        reporter_id: reportSelected?.id,
        reason: reportSelected?.value,
      };
      const report_Data = await fetchData.report_issue(data);
      if (report_Data?.message == 'Success') {
        Alert.alert(report_Data?.message);
        setReportVisble(false);
        setReportSelected({});
      } else {
        Alert.alert('Select atlest one command to report this property');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

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
    <SafeAreaView style={{flex: 1, backgroundColor: Color.white}}>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
          }}>
          <Image
            source={{uri: Media.loader}}
            style={{width: 80, height: 80, resizeMode: 'contain'}}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={{marginBottom: 10}}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                zIndex: 2,
                paddingBottom: 80,
              }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {
                  useNativeDriver: false,
                },
              )}>
              <View style={styles.header}>
                <View style={styles.header_row}>
                  <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => navigation.goBack()}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: Color.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                      }}>
                      <Icon name="arrow-back" size={24} color={Color.black} />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.iconView}>
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
                        onShare();
                      }}>
                      <Icon
                        name="share-outline"
                        size={20}
                        color={Color.black}
                        // style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        // flex: 1,
                        alignItems: 'center',
                        backgroundColor: Color.white,
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        justifyContent: 'center',
                        marginRight: 10,
                      }}
                      onPress={() => {
                        if (
                          user_id == undefined ||
                          (userData?.length > 0 && userData == undefined)
                        ) {
                          setLoginEnable(true);
                        } else {
                          handleWishlist(
                            ProductData.p_id,
                            ProductData?.isWishListed,
                          );
                        }
                      }}>
                      {processingProducts.includes(
                        ProductData?.isWishListed,
                      ) ? (
                        <ActivityIndicator size="small" color={Color.primary} />
                      ) : (
                        <Icon
                          name={
                            ProductData?.isWishListed
                              ? 'heart'
                              : 'heart-outline'
                          }
                          size={18}
                          color={
                            ProductData?.isWishListed
                              ? Color.primary
                              : Color.black
                          }
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Color.white,
                        borderRadius: 100,
                        marginRight: 10,
                        padding: 10,
                        width: 40,
                        height: 40,
                      }}
                      onPress={() => {
                        if (
                          user_id == undefined ||
                          (userData?.length > 0 && userData == undefined)
                        ) {
                          setLoginEnable(true);
                        } else {
                          setReportVisble(true);
                        }
                      }}>
                      <Entypo
                        name="dots-three-vertical"
                        size={20}
                        color={Color.black}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  zIndex: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: Color.lightgrey,
                }}>
                {ProductData?.images?.length > 0 || loading ? (
                  <ImageView images={ProductData?.images} />
                ) : (
                  <Image
                    source={{uri: Media.noImage}}
                    style={{width: '100%', height: 250, resizeMode: 'contain'}}
                  />
                )}
              </View>
              <View style={{padding: 18}}>
                {/* {user_id === ProductData?.seller_details?.user_id && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#EBF7EC',
                      justifyContent: 'center',
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: Poppins.Medium,
                        fontSize: 12,
                        color: Color.black,
                        marginHorizontal: 10,
                      }}>
                      This property is posted by you
                    </Text>
                  </View>
                )} */}
                <Modal
                  transparent={true}
                  animationType="slide"
                  visible={reportVisible}
                  onRequestClose={() => {}}>
                  <Pressable
                    style={{flex: 1, backgroundColor: Color.transparantBlack}}
                    onPress={() => {
                      setReportVisble(false);
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: Color.white,
                      padding: 10,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setReportVisble(false);
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
                        color: Color.black,
                        fontFamily: Poppins.Bold,
                        fontSize: 20,
                      }}>
                      Report Issues
                    </Text>
                    <View
                      style={{
                        marginVertical: 20,
                      }}>
                      {reportData?.map((item, index) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setReportSelected(item);
                            }}
                            key={index}
                            style={{
                              marginVertical: 5,
                              padding: 10,
                              borderRadius: 10,
                              backgroundColor:
                                reportSelected?.id == item?.id
                                  ? Color.primary
                                  : Color.white,
                            }}>
                            <Text
                              style={{
                                fontFamily: Poppins.SemiBold,
                                fontSize: 16,
                                color:
                                  reportSelected?.id == item?.id
                                    ? Color.white
                                    : Color.black,
                                textAlign: 'center',
                              }}>
                              {item.label}
                            </Text>
                            <Divider style={{height: 2, marginVertical: 5}} />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <Button
                      title={'Submit'}
                      titleStyle={{
                        fontSize: 16,
                        fontFamily: Poppins.SemiBold,
                        color: Color.white,
                      }}
                      buttonStyle={{
                        marginVertical: 20,
                        backgroundColor: Color.primary,
                      }}
                      onPress={() => {
                        reportApiData();
                      }}
                    />
                  </View>
                </Modal>
                {ProductData?.isContacted && (
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
                      {`You still have ${get_quota_value} to contact`}
                    </Text>
                  </View>
                )}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {ProductData?.price_negotiations?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 10,
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.green,
                            fontFamily: Poppins.SemiBold,
                            backgroundColor: '#BAE1BE60',
                            padding: 5,
                            marginHorizontal: 5,
                            borderRadius: 5,
                          }}>
                          {item?.value}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.green,
                        fontFamily: Poppins.SemiBold,
                        backgroundColor: '#BAE1BE60',
                        padding: 5,
                        marginHorizontal: 5,
                        borderRadius: 5,
                      }}>
                      {'No Brokerage'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.green,
                        fontFamily: Poppins.SemiBold,
                        backgroundColor: '#BAE1BE60',
                        padding: 5,
                        marginHorizontal: 5,
                        borderRadius: 5,
                      }}>
                      {'RERA Approved'}
                    </Text>
                  </View>
                </ScrollView> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    {ProductData?.property_name == null ? (
                      <Text
                        style={{
                          fontSize: 18,
                          marginVertical: 5,
                          color: Color.black,
                          fontFamily: Poppins.SemiBold,
                          marginHorizontal: 5,
                        }}
                        numberOfLines={1}>
                        {bedroomValue?.length != 0
                          ? `${bedroomValue} BHK, ${ProductData?.property_type?.pt_name}`
                          : `${ProductData?.area?.super_area} ${ProductData?.area?.super_area_unit}, ${ProductData?.property_type?.pt_name}`}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 18,
                          marginVertical: 5,
                          color: Color.black,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        {`${ProductData.property_name} | ${ProductData?.property_type?.pt_name}`}
                      </Text>
                    )}
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
                          fontSize: 14,
                          color: Color.cloudyGrey,
                          marginHorizontal: 5,
                          // marginRight: 10,
                        }}>
                        {ProductData?.location},{ProductData?.locality}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginVertical: 15,
                        justifyContent: 'flex-start',
                      }}>
                      <View
                        style={{
                          alignItems: 'flex-start',
                          flex: 1,
                          justifyContent: 'space-evenly',
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.cloudyGrey,
                            fontFamily: Poppins.SemiBold,
                          }}>
                          Property Price
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: Color.black,
                              fontFamily: Poppins.SemiBold,
                              textTransform: 'capitalize',
                              marginVertical: Platform.OS == 'ios' ? 5 : 0,
                            }}>
                            ₹
                            {ProductData?.property_type?.pt_name == 'PG'
                              ? common_fn.getMinToMaxPrice(
                                  ProductData?.room_category,
                                )
                              : ProductData?.expected_price?.length >= 5
                              ? common_fn.formatNumberWithSuffix(
                                  ProductData?.expected_price,
                                )
                              : ProductData?.expected_price}
                          </Text>
                        </View>
                        {ProductData?.property_type?.pt_name != 'PG' && (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {parseInt(ProductData?.area?.super_area) != 0 && (
                              <View style={{}}>
                                <Text
                                  style={{
                                    fontSize: 12,
                                    color: Color.lightBlack,
                                    fontFamily: Poppins.Medium,
                                    textDecorationLine: 'underline',
                                    marginVertical:
                                      Platform.OS == 'ios' ? 5 : 0,
                                  }}>
                                  Total {ProductData?.area?.super_area_unit}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: Platform.OS == 'ios' ? 16 : 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Poppins.SemiBold,
                                    marginVertical:
                                      Platform.OS == 'ios' ? 5 : 0,
                                  }}>
                                  {`${ProductData?.area?.super_area} ${ProductData?.area?.super_area_unit}`}
                                </Text>
                              </View>
                            )}
                            <View
                              style={{
                                height: '65%',
                                width: 1.8,
                                marginHorizontal: 10,
                                backgroundColor: Color.black,
                              }}
                            />
                            <View style={{}}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: Color.lightBlack,
                                  fontFamily: Poppins.Medium,
                                  textDecorationLine: 'underline',
                                  marginVertical: Platform.OS == 'ios' ? 5 : 0,
                                }}>
                                Per {ProductData?.area?.super_area_unit}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: Platform.OS == 'ios' ? 16 : 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Poppins.SemiBold,
                                    marginVertical:
                                      Platform.OS == 'ios' ? 5 : 0,
                                  }}>
                                  {`₹${parseFloat(
                                    ProductData?.expected_price /
                                      ProductData?.area?.super_area,
                                  ).toFixed(2)}`}{' '}
                                  {/* {common_fn.formatNumberWithSuffix(
                                    ProductData?.expected_price /
                                    ProductData?.area?.super_area,
                                  )}{' '} */}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    color: Color.cloudyGrey,
                                    fontFamily: Poppins.SemiBold,
                                  }}>
                                  {`per ${ProductData?.area?.super_area_unit}`}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                        {/* <Text
                          style={{
                            fontSize: 14,
                            color: Color.green,
                            textDecorationLine: 'underline',
                            fontFamily: Poppins.SemiBold,
                          }}>
                          {'Get Loan Offers'}
                        </Text> */}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* {item?.latitude > 0 && item?.longitude > 0 ? ( */}
                    {ProductData?.address != '' ? (
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate('ProductMap', {
                          //   latitude: ProductData?.latitude,
                          //   longitude: ProductData?.longitude,
                          // });
                          // common_fn.openAddressOnMap(
                          //   item?.property_name,
                          //   ProductData?.latitude,
                          //   ProductData?.longitude,
                          // );
                          var full_address = ProductData?.address
                            .split('\n')
                            .join('');
                          let url = `https://www.google.com/maps?q=${full_address}`;
                          Linking.openURL(url);
                        }}>
                        <View
                          style={{
                            width: 80,
                            height: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                          }}>
                          <Image
                            source={{uri: Media.Map}}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: 50,
                              resizeMode: 'contain',
                            }}
                          />
                          <View
                            style={{
                              width: 80,
                              height: 80,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: Color.transparantBlack,
                              borderRadius: 50,
                              position: 'absolute',
                              zIndex: 1,
                            }}>
                            <F6Icon
                              name="location-crosshairs"
                              size={18}
                              color={Color.white}
                            />
                          </View>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.darkBlue,
                              fontFamily: Poppins.SemiBold,
                              textDecorationLine: 'underline',
                              textTransform: 'capitalize',
                            }}>
                            map location
                          </Text>
                          <Icon
                            name="chevron-forward"
                            size={14}
                            color={Color.darkBlue}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 100,
                          height: 100,
                          borderRadius: 100,
                          backgroundColor: Color.lightgrey,
                        }}>
                        <MIcon
                          name="location-off"
                          size={30}
                          color={Color.cloudyGrey}
                        />
                        <Text
                          style={{
                            fontFamily: Poppins.SemiBold,
                            fontSize: 14,
                            color: Color.cloudyGrey,
                          }}>
                          No Location
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {ProductData?.property_type?.pt_name == 'PG' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.white,
                      flexWrap: 'wrap',
                      shadowColor: Color.black,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 2,
                      borderRadius: 10,
                      padding: 10,
                    }}>
                    {ProductData?.room_category?.map((item, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            key={index}
                            style={{
                              marginHorizontal: 20,
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.primary,
                                textDecorationLine: 'underline',
                                fontFamily: Poppins.SemiBold,
                              }}>
                              {item?.key} Bedroom
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Poppins.SemiBold,
                              }}>
                              price per bed
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.black,
                                fontFamily: Poppins.SemiBold,
                              }}>
                              ₹ {item?.price_per_bed}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.cloudyGrey,
                                fontFamily: Poppins.SemiBold,
                              }}>
                              Deposit
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.black,
                                fontFamily: Poppins.SemiBold,
                              }}>
                              ₹ {item?.deposit}
                            </Text>
                          </View>
                          {index < ProductData?.room_category.length - 1 && (
                            <View
                              style={{
                                width: 1,
                                height: '100%',
                                backgroundColor: Color.black,
                              }}
                            />
                          )}
                        </View>
                      );
                    })}
                  </View>
                )}
                {ProductData?.features?.length > 0 && bedroomValue != '' && (
                  <View
                    style={{
                      alignItems: 'flex-start',
                      // marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        width: '100%',
                        // borderWidth: 1,
                        // borderColor: Color.lightgrey,
                        borderRadius: 10,
                        padding: 15,
                      }}>
                      {ProductData?.features?.map((item, index) => {
                        return (
                          <FeaturesIconData
                            title={item.title}
                            value={item.value}
                            index={index}
                          />
                        );
                      })}
                    </View>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#EBF7EC',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Medium,
                      fontSize: 12,
                      color: Color.black,
                      marginHorizontal: 10,
                    }}>
                    {common_fn.formatText(ProductData?.facing)} facing property
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#EBF7EC',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: Poppins.Medium,
                      fontSize: 12,
                      color: Color.black,
                      marginHorizontal: 10,
                    }}>
                    {ProductData?.view_count || 0} people view this property
                    recently
                  </Text>
                  <Image
                    source={{uri: Media.finance}}
                    style={{width: 20, height: 20}}
                  />
                </View>
                {ProductData?.rera_id?.length > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: Color.lightgrey,
                      justifyContent: 'center',
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: Poppins.Medium,
                        fontSize: 12,
                        color: Color.black,
                        marginHorizontal: 10,
                      }}>
                      {ProductData?.rera_id}
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    // marginHorizontal: 10,
                    marginTop: 25,
                    borderRadius: 5,
                    backgroundColor: '#FBECF150',
                    padding: 15,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        textAlign: 'left',
                        fontSize: 17,
                        color: 'black',
                        fontFamily: Poppins.SemiBold,
                      }}>
                      {ProductData?.seller_details?.username != ''
                        ? ProductData?.seller_details?.username
                        : '*****'}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'left',
                        fontSize: 13,
                        color: '#444',
                        fontFamily: Poppins.SemiBold,
                      }}>
                      {ProductData?.seller_details?.user_type_id == '1'
                        ? 'Buyer'
                        : ProductData?.seller_details?.user_type_id == '2'
                        ? 'Agent'
                        : 'Builder'}
                    </Text>
                    <View style={{marginVertical: 5}}>
                      <Text
                        style={{
                          textAlign: 'left',
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          fontFamily: Poppins.Regular,
                        }}>
                        {ProductData?.seller_details?.properties_posted} tenants
                        served
                      </Text>
                      <Text
                        style={{
                          textAlign: 'left',
                          fontSize: 12,
                          color: '#444',
                          fontFamily: Poppins.Regular,
                        }}>
                        Posted on{' '}
                        {moment(
                          ProductData?.created_at,
                          'YYYY-MM-DD hh:mm A',
                        ).format('MMMM DD, YYYY')}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#FBECF1',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        padding: 5,
                        width: 100,
                        marginVertical: 5,
                      }}
                      onPress={() => {
                        const sellerUsername =
                          ProductData?.seller_details?.username ?? 'Guest User';
                        const propertyAction =
                          ProductData?.property_action == 'sell'
                            ? 'Buying'
                            : ProductData?.property_action;
                        const message = `Hello ${sellerUsername}! I'm interested in potentially ${propertyAction} your property, and I'd like to learn more about the opportunities available. Could you please provide me with more information about the properties?`;
                        const phoneNumber =
                          ProductData?.seller_details?.mobile_number;

                        if (!phoneNumber) {
                          common_fn.showToast(
                            "Seller's phone number is not provided.",
                          );
                          return;
                        }

                        let formattedPhoneNumber = phoneNumber;
                        if (!phoneNumber.startsWith('+')) {
                          formattedPhoneNumber = `+91${phoneNumber}`;
                        }

                        Linking.canOpenURL(
                          `whatsapp://send?phone=${encodeURIComponent(
                            formattedPhoneNumber,
                          )}`,
                        )
                          .then(supported => {
                            if (supported) {
                              Linking.openURL(
                                `whatsapp://send?text=${encodeURIComponent(
                                  message,
                                )}&phone=${encodeURIComponent(
                                  formattedPhoneNumber,
                                )}`,
                              );
                            } else {
                              common_fn.showToast(
                                `WhatsApp is not installed or cannot handle the phone number ${formattedPhoneNumber}`,
                              );
                            }
                          })
                          .catch(err =>
                            console.error('An error occurred', err),
                          );
                      }}>
                      <Icon
                        name={'chatbox-ellipses-outline'}
                        size={16}
                        color={Color.primary}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.primary,
                          fontFamily: Poppins.Medium,
                          paddingHorizontal: 5,
                        }}>
                        Chat Now
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          backgroundColor: Color.primary,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 5,
                          width: 100,
                          padding: 5,
                        }}
                        onPress={() => {
                          // common_fn.exportDataToExcel(ProductData);
                          if (
                            user_id == undefined ||
                            (userData?.length > 0 && userData == undefined)
                          ) {
                            setLoginEnable(true);
                          } else {
                            DownloadRBSheet.current.open();
                          }
                        }}>
                        <MCIcon
                          name={'download'}
                          size={16}
                          style={{color: 'white'}}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.white,
                            fontFamily: Poppins.Medium,
                            paddingHorizontal: 5,
                          }}>
                          Browchure
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {ProductData?.description?.length != null && (
                  <View style={{alignItems: 'flex-start', marginVertical: 5}}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: Poppins.SemiBold,
                        fontSize: 16,
                      }}>
                      Property Description
                    </Text>
                    <Text
                      onTextLayout={onDescriptionTextLayout}
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        textAlign: 'justify',
                        lineHeight: 24,
                      }}
                      numberOfLines={numLines}>
                      {!discriptiontextShown
                        ? ProductData?.description
                            .split('\n')
                            .join('')
                            .substring(0, 120)
                            .concat('...')
                        : ProductData?.description.split('\n').join('')}{' '}
                      {showMoreButton || numLines > 3 ? (
                        <Text
                          onPress={toggleTextShown}
                          style={{
                            color: Color.primary,
                            fontFamily: Poppins.SemiBold,
                            fontSize: 14,
                          }}>
                          {discriptiontextShown ? 'Read Less' : 'Read More'}
                        </Text>
                      ) : null}
                    </Text>
                  </View>
                )}
                {ProductData?.amenities?.length > 0 && (
                  <View
                    style={{
                      alignItems: 'flex-start',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: Poppins.SemiBold,
                        fontSize: 18,
                      }}>
                      Amenities
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                      }}>
                      {ProductData?.amenities?.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              marginVertical: 5,
                              padding: 10,
                              marginHorizontal: 5,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                backgroundColor: '#f3f3f3',
                                padding: 10,
                                borderRadius: 50,
                                borderWidth: 1,
                                borderColor: Color.lightgrey,
                              }}>
                              <AmenitiesIconData item={item.title} />
                            </View>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#333',
                                fontFamily: Poppins.SemiBold,
                                paddingVertical: 5,
                              }}>
                              {item.title}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
                {ProductData?.advantages?.length > 0 ||
                  (ProductData?.advantages !== null && (
                    <View
                      style={{
                        alignItems: 'flex-start',
                        marginTop: 25,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          fontSize: 18,
                          color: 'black',
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        Property Advantages
                      </Text>
                      {ProductData?.advantages?.map((item, index) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                padding: 5,
                                color: Color.black,
                                fontFamily: Poppins.SemiBold,
                                backgroundColor: '#f3f3f3',
                                borderRadius: 50,
                                borderWidth: 1,
                                borderColor: Color.lightgrey,
                                marginHorizontal: 10,
                              }}
                              numberOfLines={1}>
                              {common_fn.formatText(item.value)}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  ))}
                {ProductData?.features?.length > 0 && (
                  <View style={{alignItems: 'flex-start', marginTop: 25}}>
                    <Text
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        fontSize: 18,
                        color: 'black',
                        fontFamily: Poppins.SemiBold,
                        marginVertical: 5,
                      }}>
                      Property Details
                    </Text>
                    {ProductData?.features?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{width: '100%', alignItems: 'center'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 5,
                            }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                              }}>
                              <Text
                                style={{
                                  width: '100%',
                                  textAlign: 'left',
                                  fontSize: 14,
                                  color: Color.cloudyGrey,
                                  fontFamily: Poppins.Regular,
                                }}
                                numberOfLines={1}>
                                {item?.title == 'no_of_floors_allwd'
                                  ? 'No of floors Allowed'
                                  : common_fn.formatText(item?.title)}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 17,
                                  color: Color.black,
                                  // fontFamily: Poppins.Bold,
                                  textAlign: 'right',
                                  fontWeight: 'bold',
                                }}
                                numberOfLines={1}>
                                {common_fn.formatText(item.value)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
                {ProductData?.rules?.length > 0 &&
                  ProductData?.property_type?.pt_name == 'PG' && (
                    <View style={{alignItems: 'flex-start', marginTop: 25}}>
                      <Text
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          fontSize: 18,
                          color: 'black',
                          fontFamily: Poppins.SemiBold,
                          marginVertical: 5,
                        }}>
                        PG Rules
                      </Text>
                      {ProductData?.rules?.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{width: '100%', alignItems: 'center'}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 5,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    fontSize: 14,
                                    color: Color.cloudyGrey,
                                    fontFamily: Poppins.Regular,
                                  }}
                                  numberOfLines={1}>
                                  {common_fn.formatText(item?.title)}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'flex-end',
                                  alignItems: 'flex-end',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.black,
                                    fontFamily: Poppins.SemiBold,
                                  }}
                                  numberOfLines={1}>
                                  {common_fn.formatText(item.value)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                <View
                  style={{
                    alignItems: 'flex-start',
                    marginTop: 15,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                        fontSize: 18,
                      }}>
                      Prepared Loans
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        paddingHorizontal: 10,
                        padding: 5,
                        marginStart: 10,
                        borderRadius: 50,
                        color: Color.white,
                        fontFamily: Poppins.SemiBold,
                        backgroundColor: Color.green,
                      }}>
                      OFFERS
                    </Text>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                      }}>
                      {preparedLoans.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              padding: 10,
                              marginHorizontal: 5,
                              // alignItems: 'center',
                              // justifyContent: 'center',
                            }}>
                            <Image
                              source={{uri: item.image}}
                              style={{
                                width: 300,
                                height: 150,
                                resizeMode: 'cover',
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>

                {ProductData?.similar_properties != undefined && (
                  <SimilarProperty item={ProductData} navigation={navigation} />
                )}
              </View>
            </ScrollView>
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 0,
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              // opacity: headerOpacity,
              padding: 10,
              backgroundColor: Color.white,
              transform: [{translateY: taby}],
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#8C193F60',
                borderRadius: 50,
                padding: 10,
                marginHorizontal: 10,
              }}>
              <View style={{flex: 1, marginHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.primary,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  ₹
                  {ProductData?.property_type?.pt_name == 'PG'
                    ? common_fn.getMinToMaxPrice(ProductData?.room_category)
                    : ProductData?.expected_price?.length >= 5
                    ? common_fn.formatNumberWithSuffix(
                        ProductData?.expected_price,
                      )
                    : ProductData?.expected_price}{' '}
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    /
                    {`${bedroomValue} BHK, ${ProductData?.property_type?.pt_name}`}
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  {ProductData?.property_type?.pt_name == 'PG' ? (
                    <>
                      <Icon name={'bed'} size={20} style={{color: '#666'}} />
                      {ProductData?.room_category?.map(item => {
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
                    parseInt(ProductData?.area?.super_area) != 0 && (
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
                          style={{color: Color.black}}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                          }}>
                          {` ${ProductData?.area?.super_area} ${ProductData?.area?.super_area_unit}`}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
              <Button
                title={ProductData?.isContacted ? 'Call Owner' : 'Get Phone No'}
                titleStyle={{
                  fontSize: 14,
                  color: Color.white,
                  marginHorizontal: 5,
                }}
                icon={() => <Icon name="call" size={14} color={Color.white} />}
                buttonStyle={{
                  backgroundColor: Color.primary,
                  borderRadius: 50,
                  padding: 10,
                  width: 120,
                }}
                onPress={() => {
                  if (get_quota_value != 0) {
                    if (ProductData?.isContacted) {
                      common_fn.showToast(
                        `You still have ${get_quota_value} to contact`,
                      );
                      Linking.openURL(
                        `tel:${ProductData?.seller_details?.mobile_number}`,
                      );
                    } else {
                      sellerDetailWithProfile(ProductData?.p_id);
                    }
                  } else {
                    setPhoneQuotoVisible(true);
                  }
                  // RNImmediatePhoneCall.immediatePhoneCall(
                  //   ProductData?.seller_details?.mobile_number,
                  // );
                }}
              />
            </View>
          </Animated.View>
        </View>
      )}
      <RBSheet
        ref={DownloadRBSheet}
        closeOnDragDown={true}
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
            height: cardheight,
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            DownloadRBSheet.current.close();
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
        <View>
          <TouchableOpacity
            onPress={() => {
              DownloadRBSheet.current.close();
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              zIndex: 1,
            }}>
            <Icon
              name="cloud-download-outline"
              size={60}
              color={Color.primary}
            />
          </TouchableOpacity>
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
                marginVertical: 20,
              }}
              numberOfLines={1}>
              Do you Want to download the data into excel sheet
            </Text>
          </View>
          <Button
            title={'Download Brochure'}
            buttonStyle={{backgroundColor: Color.primary}}
            onPress={() => {
              // common_fn.exportDataToExcel(ProductData);
              downloadPdf();
              DownloadRBSheet.current.close();
            }}
          />
        </View>
      </RBSheet>

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
      <PlanPhonePurchase
        setPhoneQuotoVisible={setPhoneQuotoVisible}
        phoneQuotoVisible={phoneQuotoVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: Color.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    height: 50,
    width: '100%',
    zIndex: 3,
  },
  header_row: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: {
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

export default SinglePropertyScreen;
