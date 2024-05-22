import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import { Text, View } from 'react-native';
import Color from '../../../Config/Color';
import StepIndicator from 'react-native-step-indicator';
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
import { useDispatch, useSelector } from 'react-redux';
import { setFilterLocation, setPostPropertyLocation } from '../../../Redux';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import CheckboxData from '../../../Components/Checkbox';
import { Poppins } from '../../../Global/FontFamily';
import common_fn from '../../../Config/common_fn';
import ImageResizer from 'react-native-image-resizer';
import axios from 'axios';
import fetchData from '../../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { BackHandler } from 'react-native';
import { Alert } from 'react-native';
import { Modal } from 'react-native';
import { Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const customStyles = {
  stepIndicatorSize: 25,
  separatorStrokeWidth: 3,
  stepIndicatorLabelFontSize: 15,
  labelColor: Color.cloudyGrey,
  labelSize: 12,

  currentStepIndicatorSize: 30,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Color.primary,
  stepIndicatorCurrentColor: Color.primary,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: Color.white,
  currentStepLabelColor: Color.black,

  separatorFinishedColor: Color.primary,
  stepIndicatorFinishedColor: Color.primary,
  stepIndicatorLabelFinishedColor: 'white',

  separatorUnFinishedColor: '#ddd',
  stepIndicatorUnFinishedColor: '#ddd',
  stepIndicatorLabelUnFinishedColor: 'white',
};

const labels = [
  'Basic Details',
  'Property Details',
  'Photos & Pricing',
  'Amenities',
];

const Plotlabels = ['Basic Details', 'Property Details', 'Photos & Pricing'];

const PostStep3Screen = ({ route, navigation }) => {
  const routeName = useRoute();
  const [step1SelectedItem] = useState(route.params.step1SelectedItem);
  const [step1RentSelectedItem] = useState(route.params.step1RentSelectedItem);
  const [step2SelectedItem] = useState(route.params.step2SelectedItem);
  const [PgStep1Item] = useState(route.params.PgStep1Item);
  const [PgStep2Item] = useState(route.params.PgStep2Item);
  const [step2CommercialSelected] = useState(
    route.params.step2CommercialSelected,
  );
  const [propertyLocation] = useState(route.params.propertyLocation);
  const [unit] = useState(route.params.unit);

  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id } = userData;
  var { city, landmark } = propertyLocation;
  const [OpenModal, setOpenModal] = useState(false);
  const [images, setImages] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [token, setToken] = useState('');
  const [step3SelectedItem, setStep3SelectedItem] = useState({
    images: [],
    Ownership: {},
    pricingDetails: {
      expected: '',
      pricePersq: '',
      token: '',
    },
    main_image: '',
    sub_images: [],
    checked: [],
  });
  const [Ownership] = useState([
    { id: 1, title: 'Freehold' },
    { id: 2, title: 'Leasehold' },
    { id: 3, title: 'Co-operative Society' },
    { id: 4, title: 'Power of Attorney' },
  ]);
  const [occupation] = useState([
    { label: '50,000', value: '50,000' },
    { label: '1,00,000', value: '1,00,000' },
    { label: '1,50,000', value: '1,50,000' },
    { label: '2,00,000', value: '2,00,000' },
  ]);
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

  const uploadImages = async () => {
    try {
      if (
        !step3SelectedItem ||
        !step3SelectedItem.images ||
        step3SelectedItem.images.length === 0
      ) {
        return;
      }
      const newForm = new FormData();
      var { uri, name } = step3SelectedItem.images[0];
      // console.log("klfdgnklsdnlgnld ",step3SelectedItem.images[0]);
      newForm.append('main_image', { uri, type: 'image/jpeg', name });
      for (let i = 1; i < step3SelectedItem.images.length; i++) {
        var { uri, name } = step3SelectedItem.images[i];
        newForm.append('sub_image[]', { uri, type: 'image/jpeg', name });
      }
      axios
        .post(
          `https://backend.albionpropertyhub.com/api/Properties/add_image`,
          newForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods':
                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
          },
        )
        .then(async res => {
          setStep3SelectedItem({
            images: step3SelectedItem?.images,
            Ownership: step3SelectedItem?.Ownership,
            pricingDetails: {
              expected: step3SelectedItem?.pricingDetails?.expected,
              pricePersq: step3SelectedItem?.pricingDetails?.pricePersq,
              token: step3SelectedItem?.pricingDetails?.token,
            },
            main_image: res?.data?.main_image,
            sub_images: res?.data?.sub_images,
            checked: step3SelectedItem?.checked,
          });
        });
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  useEffect(() => {
    uploadImages();
  }, [step3SelectedItem?.images]);
  useEffect(() => {
    const resizeImages = [];
    // console.log('photo----------------------', photo)
    Promise.all(
      photo?.map(async (image, index) => {
        // console.log('image ------------', image)
        var path = image?.originalPath;
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
            resizeImages?.push(resizedImage);
          } catch (err) {
            console.log(err);
          }
        }
      }),
    ).then(() => {
      setImages([...images, ...resizeImages]);
      setStep3SelectedItem({
        images: [...images, ...resizeImages],
        Ownership: step3SelectedItem?.Ownership,
        pricingDetails: {
          expected: step3SelectedItem?.pricingDetails?.expected,
          pricePersq: step3SelectedItem?.pricingDetails?.pricePersq,
          token: step3SelectedItem?.pricingDetails?.token,
        },
        main_image: step3SelectedItem?.main_image,
        sub_images: step3SelectedItem?.sub_images,
        checked: step3SelectedItem?.checked,
      });
    });
  }, [photo.length]);

  const galleryImage = async () => {
    try {
      // console.log(`calllll`);
      const response = await launchImageLibrary({
        selectedAssets: 'images',
        isExportThumbnail: true,
        maxVideo: 1,
        usedCameraButton: false,
        isCrop: true,
        isCropCircle: true,
      });
      setPhoto(response?.assets);
      // setImages(response);
      setStep3SelectedItem({
        images: response,
        Ownership: step3SelectedItem?.Ownership,
        pricingDetails: {
          expected: step3SelectedItem?.pricingDetails?.expected,
          pricePersq: step3SelectedItem?.pricingDetails?.pricePersq,
          token: step3SelectedItem?.pricingDetails?.token,
        },
        main_image: step3SelectedItem?.main_image,
        sub_images: step3SelectedItem?.sub_images,
        checked: step3SelectedItem?.checked,
      });
      if (response?.length === 0) {
        var msg = 'Please Select Atleast One Image';
        setImagesError(msg);
        return;
      } else {
        setImagesError(false);
      }
    } catch (e) { }
  };

  const deleteImage = (key, photo) => {
    images.splice(key, 1);
    const data = images.splice(photo);
    setImages(data);
  };

  //checkbox
  const [checkbox, setCheckbox] = useState([
    {
      id: 1,
      title: 'One Price Includes Everything',
      value: 'one_price_includes_everything',
      index: 0,
    },
    { id: 2, title: 'Price negotiable', value: 'price_negotiable', index: 1 },
    {
      id: 3,
      title: 'Tax & Govt. charges excluded',
      value: 'tax_&_govt_charges_excluded',
      index: 2,
    },
  ]);

  const [checkboxSelectedItem, setCheckboxSelectedItem] = useState([]);

  const handleCheckboxPress = itemId => {
    if (checkboxSelectedItem.includes(itemId)) {
      setCheckboxSelectedItem(
        checkboxSelectedItem?.filter(single => single !== itemId),
      );
      setStep3SelectedItem({
        images: step3SelectedItem?.images,
        Ownership: step3SelectedItem?.Ownership,
        pricingDetails: {
          expected: step3SelectedItem?.pricingDetails?.expected,
          pricePersq: step3SelectedItem?.pricingDetails?.pricePersq,
          token: step3SelectedItem?.pricingDetails?.token,
        },
        main_image: step3SelectedItem?.main_image,
        sub_images: step3SelectedItem?.sub_images,
        checked: step3SelectedItem?.checked?.filter(
          single => single.id !== itemId,
        ),
      });
    } else {
      setCheckboxSelectedItem([...checkboxSelectedItem, itemId]);
      const selectedItem = checkbox.find(single => single.id === itemId);
      setStep3SelectedItem({
        images: step3SelectedItem?.images,
        Ownership: step3SelectedItem?.Ownership,
        pricingDetails: {
          expected: step3SelectedItem?.pricingDetails?.expected,
          pricePersq: step3SelectedItem?.pricingDetails?.pricePersq,
          token: step3SelectedItem?.pricingDetails?.token,
        },
        main_image: step3SelectedItem?.main_image,
        sub_images: step3SelectedItem?.sub_images,
        checked: [...step3SelectedItem?.checked, selectedItem],
      });
    }
  };

  const [imagesError, setImagesError] = useState(false);
  const [ExpectedError, setExpectedError] = useState(false);
  const [perPriceError, setPerPriceError] = useState(false);
  const checkTextInput = () => {
    if (!step3SelectedItem?.images?.length) {
      var msg = 'Please select Atlest one image';
      setImagesError(msg);
      return;
    } else {
      setImagesError(false);
    }
    if (!step3SelectedItem?.pricingDetails?.expected) {
      var msg = 'Please enter expected price';
      setExpectedError(msg);
      return;
    } else {
      setExpectedError(false);
    }
    if (!step3SelectedItem?.pricingDetails?.pricePersq) {
      var msg = 'Please enter per sq.ft';
      setPerPriceError(msg);
      return;
    } else {
      setPerPriceError(false);
    }
  };

  const step3Data = navigation => {
    try {
      const ispg = step1SelectedItem?.post?.value === 'pg';
      if (
        step3SelectedItem?.pricingDetails?.expected?.length > 0 &&
        step3SelectedItem?.pricingDetails?.pricePersq != 0
        || ispg
      ) {
        navigation.navigate('step4', {
          step1SelectedItem,
          step2SelectedItem,
          step3SelectedItem,
          step1RentSelectedItem,
          step2CommercialSelected,
          propertyLocation,
          unit,
          PgStep1Item,
          PgStep2Item,
        });
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Please select all the required fields');
        } else {
          alert('Please select all the required fields')
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const dispatch = useDispatch();

  const dataPayload = () => {
    let customIDCounter = { counter: 0 };
    let dataArray = [];
    const plotPayload = {
      // no_of_floors_allwd: step2SelectedItem?.plotSpec?.plotAllowed,
      // noOfopenSide: step2SelectedItem?.plotSpec?.noOfopenSide,
      propertyFacing: step2SelectedItem?.propertyFacing?.value,
      current_construction: step2SelectedItem?.constructionDone,
      boundary_wall_made: step2SelectedItem?.boundryWall,
      gatedColony: step2SelectedItem?.gatedColony,
      approved_authority: step2SelectedItem?.ApprovalAuthority,
    };
    const commercialPayload = {
      cafeteria: step2CommercialSelected?.pantry,
      total_washroom: step2CommercialSelected?.washroom,
      boundary_wall_made: step2SelectedItem?.boundryWall,
      total_floors: step2CommercialSelected?.totalBuildingFloors,
      floor: step2CommercialSelected?.noFloorsOnProperty,
      furnish_status: step2CommercialSelected?.furnishingDeatils,
      personal_washroom: step2CommercialSelected?.perWash,
      is_corner_shop: step2CommercialSelected?.corShop,
      main_road_facing: step2CommercialSelected?.mainRoadFace,
      modifyInterior: step2CommercialSelected?.modifyInterior,
      lockPeriod: step2CommercialSelected?.lockPeriod,
      no_of_seats: step2CommercialSelected?.noSeats,
    };
    if (
      step1SelectedItem?.kind?.value === 'commercial' ||
      step1RentSelectedItem?.kind?.value === 'commercial'
    ) {
      for (const key in commercialPayload) {
        if (commercialPayload[key]?.length > 0) {
          if (key === 'boundary_wall_made') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'boundary_wall_made',
              value: encodeURIComponent(step2SelectedItem?.boundryWall?.value),
            });
          } else if (key === 'floor') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'floor',
              value: encodeURIComponent(
                step2CommercialSelected?.noFloorsOnProperty?.value,
              ),
            });
          } else if (key === 'cafeteria') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'cafeteria',
              value: encodeURIComponent(step2CommercialSelected?.pantry?.value),
            });
          } else if (key === 'no_of_seats') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'no_of_seats',
              value: encodeURIComponent(step2CommercialSelected?.noSeats),
            });
          } else if (key === 'total_washroom') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'total_washroom',
              value: encodeURIComponent(
                step2CommercialSelected?.washroom?.value,
              ),
            });
          } else if (key === 'furnish_status') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'furnish_status',
              value: step2CommercialSelected?.furnishingDeatils?.value,
            });
          } else if (key === 'personal_washroom') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'personal_washroom',
              value: encodeURIComponent(
                step2CommercialSelected?.perWash?.value,
              ),
            });
          } else if (key === 'is_corner_shop') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'is_corner_shop',
              value: encodeURIComponent(
                step2CommercialSelected?.corShop?.value,
              ),
            });
          } else if (key === 'main_road_facing') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'main_road_facing',
              value: encodeURIComponent(
                step2CommercialSelected?.mainRoadFace?.value,
              ),
            });
          } else if (key === 'modifyInterior') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'modifyInterior',
              value: encodeURIComponent(
                step2CommercialSelected?.modifyInterior?.value,
              ),
            });
          }
        } else if (key === 'total_floors') {
          dataArray.push({
            key: common_fn.generateCustomID(customIDCounter, key),
            title: 'total_floors',
            value: encodeURIComponent(
              step2CommercialSelected?.totalBuildingFloors,
            ),
          });
        }
      }
    } else {
      for (const key in plotPayload) {
        if (Object.keys(plotPayload[key])?.length > 0) {
          if (key === 'boundary_wall_made') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'boundary_wall_made',
              value: encodeURIComponent(step2SelectedItem?.boundryWall?.value),
            });
          } else if (key === 'no_of_floors_allwd') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'no_of_floors_allwd',
              value: encodeURIComponent(step2SelectedItem?.plotAllowed?.value),
            });
          } else if (key === 'noOfopenSide') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'noOfopenSide',
              value: encodeURIComponent(step2SelectedItem?.noOfopenSide?.value),
            });
          } else if (key === 'plotFacing') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'plotFacing',
              value: encodeURIComponent(step2SelectedItem?.plotFacing?.value),
            });
          } else if (key === 'current_construction') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'current_construction',
              value: encodeURIComponent(
                step2SelectedItem?.constructionDone?.value,
              ),
            });
          } else if (key === 'gatedColony') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'gatedColony',
              value: encodeURIComponent(step2SelectedItem?.gatedColony?.value),
            });
          } else if (key === 'approved_authority') {
            dataArray.push({
              key: common_fn.generateCustomID(customIDCounter, key),
              title: 'approved_authority',
              value: encodeURIComponent(
                step2SelectedItem?.ApprovalAuthority?.value,
              ),
            });
          }
          // else {
          //   plotPayload[key].forEach(value => {
          //     dataArray.push({
          //       key: common_fn.generateCustomID(customIDCounter, key),
          //       title: key,
          //       value: encodeURIComponent(value),
          //     });
          //   });
          // }
        }
      }
    }
    return dataArray;
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      sound: true,
      badge: true,
      provisional: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken();
    }
  };

  const getFCMToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        try {
          const refreshToken = await messaging().getToken();
          if (refreshToken) {
            setToken(refreshToken);
            await AsyncStorage.setItem('fcmToken', refreshToken);
          } else {
          }
        } catch (error) {
          console.log('Error fetching token :', error);
        }
      } else {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        setToken(fcmToken);
      }
    } catch (error) {
      console.log('Catch in getFcmToken  : ', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, [token]);

  const confirmPlotWithCommercial = async navigation => {
    try {
      if (
        step3SelectedItem?.pricingDetails?.expected?.length > 0 &&
        step3SelectedItem?.pricingDetails?.pricePersq != 0
      ) {
        var data = {
          property_action: step1SelectedItem?.post?.value,
          property_type:
            step1SelectedItem?.post?.value === 'sell'
              ? step1SelectedItem?.kind?.value == 'residential'
                ? step1SelectedItem?.type?.value
                : step1SelectedItem.commercialPropType?.value
              : step1RentSelectedItem?.kind?.value == 'residential'
                ? step1RentSelectedItem?.type?.value
                : step1RentSelectedItem.commercialPropType?.value,
          location: city,
          real_estate:
            step1SelectedItem?.post?.value === 'sell'
              ? step1SelectedItem?.kind?.value
              : step1RentSelectedItem?.kind?.value,
          area: {
            super_area:
              step1SelectedItem?.post?.value === 'sell'
                ? step1SelectedItem?.kind?.value == 'residential'
                  ? step2SelectedItem?.propertyArea?.plotArea
                  : step2CommercialSelected?.propertyArea?.plotArea
                : step1SelectedItem?.post?.value === 'rent' &&
                  step1RentSelectedItem?.kind?.value == 'residential'
                  ? step2SelectedItem?.propertyArea?.plotArea
                  : step2CommercialSelected?.propertyArea?.plotArea,
            super_area_unit: unit?.plotStatus?.value,
          },
          facing: step2SelectedItem?.propertyFacing?.value,
          property_name:
            step1SelectedItem?.post?.value === 'sell'
              ? step1SelectedItem?.name
              : step1RentSelectedItem?.name,
          locality: landmark,
          features: dataPayload(),
          expected_price: step3SelectedItem?.pricingDetails?.expected,
          token_amount: step3SelectedItem?.pricingDetails?.token,
          address:
            step1SelectedItem?.post?.value === 'sell'
              ? step1SelectedItem?.address
              : step1RentSelectedItem?.address,
          seller_id: user_id,
          description:
            step1SelectedItem?.post?.value === 'sell'
              ? step1SelectedItem?.description
              : step1RentSelectedItem?.description,
          device_id: 2,
          main_image: step3SelectedItem?.main_image,
          sub_images: step3SelectedItem?.sub_images ?? [],
          fcm_token: token,
        };
        const postProperty = await fetchData.create(data);
        if (postProperty?.message == 'Success') {
          dispatch(
            setPostPropertyLocation({
              city: null,
              landmark: null,
            }),
          );
          navigation.replace('postCompleted');
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Please select all the required fields');
        } else {
          alert('Please select all the required fields')
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const isPlotSelected =
    // step1SelectedItem?.type?.value === 'Plot' ||
    // step1SelectedItem?.commercialPropType?.value === 'Plot';
    (step1SelectedItem?.kind?.value === 'residential' &&
      step1SelectedItem?.type?.value === 'plot') ||
    step1SelectedItem?.kind?.value === 'commercial'
  const isRentPlotSelected =
    // step1RentSelectedItem?.type?.value === 'Plot' ||
    // step1RentSelectedItem?.commercialPropType?.value === 'Plot';
    (step1RentSelectedItem?.kind?.value === 'residential' &&
      step1RentSelectedItem?.type?.value === 'plot') ||
    step1RentSelectedItem?.kind?.value === 'commercial'

  const stepCount = isPlotSelected || isRentPlotSelected || step1SelectedItem?.post?.value == "pg" ? 3 : 4;

  const Datalabels = isPlotSelected || isRentPlotSelected || step1SelectedItem?.post?.value == "pg" ? Plotlabels : labels;

  function handleBackButtonClick() {
    if (routeName.name == "step3") {
      navigation.goBack();
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.header, marginVertical: Platform.OS == "ios" ? 40 : 10 }}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              borderRadius: 100,
            }}>
            <Icon name="arrow-back" size={25} color={Color.black} />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginVertical: 10,
            color: Color.cloudyGrey,
            marginRight: 10,
          }}>
          STEP 3 OF {stepCount}
        </Text>
      </View>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={2}
          stepCount={stepCount}
          labels={Datalabels}
          renderStepIndicator={(position, stepStatus) => {
            switch (position?.stepStatus) {
              case 'current':
                return (
                  <Text style={{ fontSize: 14, color: Color.white }}>
                    {position?.position + 1}
                  </Text>
                );
              case 'finished':
                return <FIcon name="check" size={16} color={Color.white} />;
              case 'unfinished':
                return (
                  <Text style={{ fontSize: 14, color: Color.white }}>
                    {position?.position + 1}
                  </Text>
                );
              default:
                return null;
            }
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginVertical: 10 }}>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: Color.black,
                fontWeight: 'bold',
              }}>
              Add Photos & Pricing
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Color.cloudyGrey,
                fontWeight: 'bold',
              }}>
              Photos, Ownership Details and Pricing
            </Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                {`Add ${step1SelectedItem?.post?.value == 'pg' ? 'PG' : 'Property'
                  } Images`}
              </Text>
            </View>
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
                      style={{ width: '50%' }}
                      onPress={() => deleteImage(key, images)}>
                      <Image
                        source={{ uri: item.uri }}
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
                        <Icon
                          name="close-circle"
                          size={30}
                          color={Color.black}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={{ padding: 10 }}>
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

          <>
            {/* <View style={{marginVertical: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Ownership
                    </Text>
                    <Text
                      style={{
                        color: Color.red,
                        marginHorizontal: 5,
                        fontSize: 20,
                      }}>
                      *
                    </Text>
                  </View>
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
                              step3SelectedItem?.Ownership?.id == item?.id
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
                              step3SelectedItem?.Ownership?.id == item?.id
                                ? Color.primary
                                : Color.lightgrey,
                            borderWidth: 1,
                          }}
                          onPress={() => {
                            setStep3SelectedItem({
                              images: step3SelectedItem?.images,
                              Ownership: item,
                              pricingDetails: {
                                expected:
                                  step3SelectedItem?.pricingDetails?.expected,
                                pricePersq:
                                  step3SelectedItem?.pricingDetails?.pricePersq,
                                token: step3SelectedItem?.pricingDetails?.token,
                              },
                              main_image: step3SelectedItem?.main_image,
                              sub_images: step3SelectedItem?.sub_images,
                              checked: step3SelectedItem?.checked,
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
                </View> */}

            {step1SelectedItem?.post?.value != 'pg' &&
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.black,
                    fontWeight: 'bold',
                    marginVertical: 5,
                  }}>
                  Price Details
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    <Text
                      style={{
                        color: Color.red,
                        marginHorizontal: 5,
                        fontSize: 20,
                      }}>
                      *
                    </Text>
                  </View>
                </View>

                <View>
                  <TextInput
                    placeholder="₹ Enter Expected Price"
                    placeholderTextColor={Color.cloudyGrey}
                    value={step3SelectedItem?.pricingDetails?.expected}
                    onChangeText={value => {
                      setStep3SelectedItem({
                        images: step3SelectedItem?.images,
                        Ownership: step3SelectedItem?.Ownership,
                        pricingDetails: {
                          expected: value,
                          pricePersq:
                            isPlotSelected || isRentPlotSelected
                              ? step1SelectedItem?.post?.value === 'sell'
                                ? step1SelectedItem?.kind?.value == 'residential'
                                  ? value /
                                  step2SelectedItem?.propertyArea?.plotArea
                                  : value /
                                  step2CommercialSelected?.propertyArea
                                    ?.plotArea
                                : step1RentSelectedItem?.kind?.value ==
                                  'residential'
                                  ? value /
                                  step2SelectedItem?.propertyArea?.plotArea
                                  : value /
                                  step2CommercialSelected?.propertyArea?.plotArea
                              : value / unit?.superValue,
                          token: step3SelectedItem?.pricingDetails?.token,
                        },
                        main_image: step3SelectedItem?.main_image,
                        sub_images: step3SelectedItem?.sub_images,
                        checked: step3SelectedItem?.checked,
                      });
                      if (value?.length === 0) {
                        var msg = 'Please Enter Your Expected Amount';
                        setExpectedError(msg);
                        return;
                      } else {
                        setExpectedError(false);
                      }
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
                  {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                        }}>
                        Price of per sq.ft
                      </Text>
                      <Text
                        style={{
                          color: Color.red,
                          marginHorizontal: 5,
                          fontSize: 20,
                        }}>
                        *
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {perPriceError}
                    </Text>
                    <TextInput
                      placeholder="₹ Enter Price per sq.ft"
                      placeholderTextColor={Color.cloudyGrey}
                      value={
                        !isNaN(step3SelectedItem?.pricingDetails?.pricePersq) &&
                        step3SelectedItem?.pricingDetails?.pricePersq.toString()
                      }
                      onChangeText={value => {
                        setStep3SelectedItem({
                          images: step3SelectedItem?.images,
                          Ownership: step3SelectedItem?.Ownership,
                          pricingDetails: {
                            expected:
                              step3SelectedItem?.pricingDetails?.expected,
                            pricePersq:
                              isPlotSelected || isRentPlotSelected
                                ? step1SelectedItem?.post?.value === 'sell'
                                  ? step1SelectedItem?.kind?.value ==
                                    'Residential'
                                    ? step3SelectedItem?.pricingDetails
                                        ?.expected /
                                      step2SelectedItem?.propertyArea?.plotArea
                                    : step3SelectedItem?.pricingDetails
                                        ?.expected /
                                      step2CommercialSelected?.propertyArea
                                        ?.plotArea
                                  : step1RentSelectedItem?.kind?.value ==
                                    'Residential'
                                  ? step3SelectedItem?.pricingDetails
                                      ?.expected /
                                    step2SelectedItem?.propertyArea?.plotArea
                                  : step3SelectedItem?.pricingDetails
                                      ?.expected /
                                    step2CommercialSelected?.propertyArea
                                      ?.plotArea
                                : step3SelectedItem?.pricingDetails?.expected /
                                    unit?.superValue ?? value,
                            token: step3SelectedItem?.pricingDetails?.token,
                          },
                          main_image: step3SelectedItem?.main_image,
                          sub_images: step3SelectedItem?.sub_images,
                          checked: step3SelectedItem?.checked,
                        });
                        if (value?.length === 0) {
                          var msg = 'Please Enter Your Per Square feet Amount';
                          setPerPriceError(msg);
                          return;
                        } else {
                          setPerPriceError(false);
                        }
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
                    /> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                      }}>
                      Booking / Advance Amount (Optional)
                    </Text>
                    {/* <Text
                    style={{
                      color: Color.red,
                      marginHorizontal: 5,
                      fontSize: 20,
                    }}>
                    *
                  </Text> */}
                  </View>
                  <TextInput
                    placeholder="₹ Enter Advance Amount"
                    placeholderTextColor={Color.cloudyGrey}
                    keyboardType="number-pad"
                    value={step3SelectedItem?.pricingDetails?.token}
                    onChangeText={value =>
                      setStep3SelectedItem({
                        images: step3SelectedItem?.images,
                        Ownership: step3SelectedItem?.Ownership,
                        pricingDetails: {
                          expected: step3SelectedItem?.pricingDetails?.expected,
                          pricePersq:
                            step3SelectedItem?.pricingDetails?.pricePersq,
                          token: value,
                        },
                        main_image: step3SelectedItem?.main_image,
                        sub_images: step3SelectedItem?.sub_images,
                        checked: step3SelectedItem?.checked,
                      })
                    }
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
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Poppins.Medium,
                    color: Color.red,
                  }}>
                  {ExpectedError}
                </Text>
              </View>
            }

            <View style={{ marginVertical: 10 }}>
              {checkbox.map((item, index) => {
                return (
                  <CheckboxData
                    key={index}
                    label={item.title}
                    checked={checkboxSelectedItem.includes(item.id)}
                    onPress={() => handleCheckboxPress(item.id)}
                  />
                );
              })}
            </View>
          </>
          {/* )} */}
          <Button
            title={
              isPlotSelected || isRentPlotSelected ? 'Confirm Post' : step1SelectedItem?.post?.value == "pg" ? "Move to next step" : 'NEXT'
            }
            titleStyle={{ textTransform: 'uppercase' }}
            buttonStyle={{
              backgroundColor: Color.primary,
              height: 45,
              marginVertical: 20,
            }}
            onPress={() => {
              // step1SelectedItem?.type?.value == 'villa' ||
              // step1SelectedItem?.type?.value == 'flat' ||
              // step1RentSelectedItem?.type?.value == 'flat' ||
              // step1RentSelectedItem?.type?.value == 'villa'
              if (
                step3SelectedItem?.images?.length > 0) {
                isPlotSelected || isRentPlotSelected
                  ? confirmPlotWithCommercial(navigation)
                  : step1SelectedItem?.post?.value == "pg" ?
                    navigation.navigate('confirmPost', {
                      step1SelectedItem,
                      step2SelectedItem,
                      step3SelectedItem,
                      step4SelectedItem: {},
                      propertyLocation,
                      step1RentSelectedItem,
                      unit,
                      PgStep1Item,
                      PgStep2Item,
                      PgStep4Item: {},
                      exclusivePost: false,
                    }) : step3Data(navigation);
                checkTextInput();
              } else {
                setOpenModal(true)
              }
            }}
          />
        </View>
        <Modal
          visible={OpenModal}
          transparent={true}
          animationType={'fade'}>
          <Pressable
            style={{
              backgroundColor: Color.transparantBlack,
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
            onPress={() => setOpenModal(false)}
          />
          <View
            style={{
              paddingVertical: 20,
              backgroundColor: Color.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, top: 10 }}
              onPress={() => setOpenModal(false)}>
              <MCIcon name="close-circle" size={30} color={Color.red} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Poppins.SemiBold,
                textAlign: 'center',
                color: Color.sunShade,
                marginVertical: 10,
                lineHeight: 20,
              }}>
              Alert!
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Poppins.SemiBold,
                textAlign: 'center',
                color: Color.black,
                marginVertical: 10,
              }}>
              No Images Uploaded For This Property
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Poppins.SemiBold,
                textAlign: 'center',
                color: Color.black,
                marginVertical: 10,
              }}>
              Are You Sure To Post Property?
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Poppins.SemiBold,
                textAlign: 'center',
                color: Color.black,
                marginVertical: 10,
              }}>
              Enhance your property listing by adding high-quality images. Visual content not only makes your property more attractive to potential buyers or renters but also improves its online visibility.
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Poppins.SemiBold,
                textAlign: 'center',
                color: Color.black,
                marginVertical: 10,
              }}>
              Studies show that listings with images receive more engagement. Take this opportunity to showcase the best features of your property and make a lasting impression on your audience.
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Poppins.SemiBold,
                textAlign: 'center',
                color: Color.black,
                marginVertical: 10,
              }}>
              If you need assistance with uploading images or have any questions, feel free to reach out to{" "}
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Poppins.SemiBold,
                  textAlign: 'center',
                  color: Color.blue,
                  marginVertical: 10,
                }} onPress={() => Linking.openURL('mailto:support@example.com')}>our support team.{" "}</Text>
              We're here to help you create a compelling property listing that stands out in the market.
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                title={
                  "Upload Image"
                }
                titleStyle={{
                  textTransform: 'uppercase',
                  fontSize: 12,
                  fontFamily: Poppins.SemiBold
                }}
                buttonStyle={{
                  backgroundColor: Color.primary,
                  marginVertical: 20,
                  marginHorizontal: 5,
                }}
                containerStyle={{ width: '50%' }}
                onPress={() => {
                  setOpenModal(false)
                }}
              />
              <Button
                title={
                  isPlotSelected || isRentPlotSelected ? "Confirm Post" : step1SelectedItem?.post?.value == "pg" ? "Move to next step" : "Move to next step"
                }
                titleStyle={{
                  textTransform: 'uppercase',
                  fontSize: 12,
                  fontFamily: Poppins.SemiBold
                }}
                buttonStyle={{
                  backgroundColor: Color.primary,
                  marginVertical: 20,
                  marginHorizontal: 5,
                }}
                containerStyle={{ width: '50%' }}
                onPress={() => {
                  setOpenModal(false)
                  isPlotSelected || isRentPlotSelected
                    ? confirmPlotWithCommercial(navigation)
                    : step1SelectedItem?.post?.value == "pg" ?
                      navigation.navigate('confirmPost', {
                        step1SelectedItem,
                        step2SelectedItem,
                        step3SelectedItem,
                        step4SelectedItem: {},
                        propertyLocation,
                        step1RentSelectedItem,
                        unit,
                        PgStep1Item,
                        PgStep2Item,
                        PgStep4Item: {},
                        exclusivePost: false,
                      }) : step3Data(navigation);
                  checkTextInput();
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default PostStep3Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  stepIndicator: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    flex: 1,
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
  pillContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pillText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
});
