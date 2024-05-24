import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import {Text, View} from 'react-native';
import Color from '../../../Config/Color';
import StepIndicator from 'react-native-step-indicator';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setFilterLocation, setPostPropertyLocation} from '../../../Redux';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Divider} from 'react-native-elements';
import CheckboxData, {
  AmenitiesCheckbox,
  RightCheckBox,
} from '../../../Components/Checkbox';
import {Poppins} from '../../../Global/FontFamily';
import common_fn from '../../../Config/common_fn';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import fetchData from '../../../Config/fetchData';
import {BackHandler} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

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

const ExampleUSPS = ({data}) => {
  switch (data) {
    case 'Food':
      return (
        <Text
          style={{
            color: Color.cloudyGrey,
            marginHorizontal: 5,
            fontSize: 12,
            fontFamily: Poppins.Medium,
          }}>
          Andhra Food,Food Available 24x7,multi-cuisine,etc...
        </Text>
      );
    case 'Room':
      return (
        <Text
          style={{
            color: Color.cloudyGrey,
            marginHorizontal: 5,
            fontSize: 12,
            fontFamily: Poppins.Medium,
          }}>
          Smart Room Technology,Eco-Friendly Rooms,Panoramic Views,etc...
        </Text>
      );
    case 'PG':
      return (
        <Text
          style={{
            color: Color.cloudyGrey,
            marginHorizontal: 5,
            fontSize: 12,
            fontFamily: Poppins.Medium,
          }}>
          Natural Ingredients for Ethical Beauty,Dermatologist-Approved,etc...
        </Text>
      );
    case 'Locality':
      return (
        <Text
          style={{
            color: Color.cloudyGrey,
            marginHorizontal: 5,
            fontSize: 12,
            fontFamily: Poppins.Medium,
          }}>
          Green Spaces and Parks,Well-Planned Infrastructure,Community Events
          and Festivals,etc...
        </Text>
      );
    case 'Amenities':
      return (
        <Text
          style={{
            color: Color.cloudyGrey,
            marginHorizontal: 5,
            fontSize: 12,
            fontFamily: Poppins.Medium,
          }}>
          Wellness Oasis,Smart Home Integration,Designer Kitchen and
          Appliances,Pet-Friendly Amenities,,etc...
        </Text>
      );
    case 'Others':
      return (
        <Text
          style={{
            color: Color.cloudyGrey,
            marginHorizontal: 5,
            fontSize: 12,
            fontFamily: Poppins.Medium,
          }}>
          Smart Living Integration,Personalized Wellness Corners,Parcel
          Management Hub,etc...
        </Text>
      );
  }
};

const PostStep4Screen = ({route}) => {
  const navigation = useNavigation();
  const routeName = useRoute();
  const [step1SelectedItem] = useState(route.params.step1SelectedItem);
  const [step2SelectedItem] = useState(route.params.step2SelectedItem);
  const [step3SelectedItem] = useState(route.params.step3SelectedItem);
  const [propertyLocation] = useState(route.params.propertyLocation);
  const [step1RentSelectedItem] = useState(route.params.step1RentSelectedItem);
  const [PgStep1Item] = useState(route.params.PgStep1Item);
  const [PgStep2Item] = useState(route.params.PgStep2Item);
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id} = userData;
  const [exclusivePost, setExclusivePost] = useState(false);
  const [reraID, setReraID] = useState('');
  const [step2CommercialSelected] = useState(
    route.params.step2CommercialSelected,
  );
  const [unit] = useState(route.params.unit);
  const [Amenities] = useState([
    {id: 1, title: 'Lift', value: 'lift'},
    {id: 2, title: 'Fitness Center', value: 'fitness_center'},
    {id: 3, title: 'cctv', value: 'cctv'},
    {id: 4, title: 'Wi-Fi', value: 'wi-fi'},
    {id: 5, title: 'Security', value: 'security'},
    {id: 6, title: '24 / 7 Water', value: '24_/_7_Water'},
    {id: 7, title: 'Parking', value: 'parking'},
    {id: 8, title: 'Power Backup', value: 'power_backup'},
  ]);
  const [water] = useState([
    {id: 1, title: 'Municipal corporation'},
    {id: 2, title: '24/7 Water'},
    {id: 3, title: 'Borewell/Tank'},
    {id: 4, title: 'Water Disposal'},
  ]);
  const [Overlooking] = useState([
    {id: 1, title: 'Park/Garden'},
    {id: 2, title: 'Main Road'},
    {id: 3, title: 'Club'},
    {id: 5, title: 'Swimming Pool '},
  ]);
  const [LocationAdvantages] = useState([
    {id: 1, title: 'Close to school'},
    {id: 2, title: 'Close to Hospital'},
    {id: 3, title: 'Close to market'},
    {id: 4, title: 'Close to Bustand'},
    {id: 5, title: 'Close to Airport'},
    {id: 6, title: 'Close to Metro'},
    {id: 7, title: 'Close to railway station'},
    {id: 8, title: 'Close to Theatre'},
    {id: 9, title: 'Close to mall'},
  ]);
  const [PowerBackup] = useState([
    {id: 1, title: 'None', value: 'None'},
    {id: 2, title: 'Partial', value: 'Partial'},
    {id: 3, title: 'Full', value: 'Full'},
  ]);
  const [PropertyFacing] = useState([
    {id: 1, title: 'North', value: 'north'},
    {id: 2, title: 'North -  East', value: 'north_east'},
    {id: 3, title: 'East', value: 'east'},
    {id: 4, title: 'West', value: 'west'},
    {id: 5, title: 'South', value: 'south'},
    {id: 6, title: 'South - East', value: 'south_east'},
    {id: 7, title: 'South - West', value: 'south_west'},
    {id: 8, title: 'North - West', value: 'north_west'},
  ]);
  const [FlooringTypes] = useState([
    {id: 1, title: 'Marble', value: 'marble'},
    {id: 2, title: 'Wood', value: 'wood'},
    {id: 3, title: 'Stone', value: 'stone'},
    {id: 4, title: 'Cement', value: 'cement'},
    {id: 5, title: 'Mosaic', value: 'mosaic'},
    {id: 6, title: 'Granite', value: 'granite'},
    {id: 7, title: 'Polished concrete', value: 'polished_concrete'},
    {id: 8, title: 'Others', value: 'others'},
  ]);
  const [step4SelectedItem, setStep4SelectedItem] = useState({
    amenities: [],
    water: [],
    overlooking: [],
    locationAdvantage: [],
    powerBackUp: {},
    p_facing: {},
    flooringType: {},
    features: [],
  });
  const filter_data = useSelector(state => state.UserReducer.propertyLocation);
  var {city, landmark} = propertyLocation;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  //Amenities
  const [visibleData, setVisibleData] = useState(Amenities?.slice(0, 4));
  const [showLoadMore, setShowLoadMore] = useState(Amenities.length > 4);

  const loadMoreItems = () => {
    const newVisibleData = Amenities?.slice(0, visibleData.length + 8);
    setVisibleData(newVisibleData);
    setShowLoadMore(newVisibleData.length < Amenities.length);
  };
  //location Advantages
  const [LocationvisibleData, setLocationVisibleData] = useState(
    LocationAdvantages?.slice(0, 5),
  );
  const [showLocationLoadMore, setLocationShowLoadMore] = useState(
    LocationAdvantages.length > 5,
  );

  const LocationloadMoreItems = () => {
    const newVisibleData = LocationAdvantages?.slice(
      0,
      LocationvisibleData.length + 8,
    );
    setLocationVisibleData(newVisibleData);
    setLocationShowLoadMore(newVisibleData.length < LocationAdvantages.length);
  };
  //Amenities
  const [amenitiesVisible, setAmenitiesVisible] = useState(false);
  const [AmenitiesSelectedItem, setAmenitiesSelectedItem] = useState([]);
  const handleAmenitiesPress = itemId => {
    if (AmenitiesSelectedItem.includes(itemId)) {
      setAmenitiesSelectedItem(
        AmenitiesSelectedItem?.filter(single => single !== itemId),
      );
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities?.filter(
          single => single.id !== itemId,
        ),
        water: step4SelectedItem?.water,
        overlooking: step4SelectedItem?.overlooking,
        locationAdvantage: step4SelectedItem?.locationAdvantage,
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features,
      });
    } else {
      setAmenitiesSelectedItem([...AmenitiesSelectedItem, itemId]);
      const selectedItem = Amenities.find(single => single.id === itemId);
      setStep4SelectedItem({
        amenities: [...step4SelectedItem?.amenities, selectedItem],
        water: step4SelectedItem?.water,
        overlooking: step4SelectedItem?.overlooking,
        locationAdvantage: step4SelectedItem?.locationAdvantage,
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features,
      });
    }
  };
  //water Source
  const [waterSelectedItem, setWaterSelectedItem] = useState([]);
  const handleWaterPress = itemId => {
    if (waterSelectedItem.includes(itemId)) {
      setWaterSelectedItem(
        waterSelectedItem?.filter(single => single !== itemId),
      );
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities,
        water: step4SelectedItem?.water?.filter(single => single.id !== itemId),
        overlooking: step4SelectedItem?.overlooking,
        locationAdvantage: step4SelectedItem?.locationAdvantage,
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features,
      });
    } else {
      setWaterSelectedItem([...waterSelectedItem, itemId]);
      const selectedItem = water.find(single => single.id === itemId);
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities,
        water: [...step4SelectedItem?.water, selectedItem],
        overlooking: step4SelectedItem?.overlooking,
        locationAdvantage: step4SelectedItem?.locationAdvantage,
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features,
      });
    }
  };
  //Over Looking
  const [overLookingSelectedItem, setOverLookingSelectedItem] = useState([]);
  const handleOverLookingPress = itemId => {
    if (overLookingSelectedItem.includes(itemId)) {
      setOverLookingSelectedItem(
        overLookingSelectedItem?.filter(single => single !== itemId),
      );
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities,
        water: step4SelectedItem?.water,
        overlooking: step4SelectedItem?.overlooking?.filter(
          single => single.id !== itemId,
        ),
        locationAdvantage: step4SelectedItem?.locationAdvantage,
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features,
      });
    } else {
      setOverLookingSelectedItem([...overLookingSelectedItem, itemId]);
      const selectedItem = Overlooking.find(single => single.id === itemId);
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities,
        water: step4SelectedItem?.water,
        overlooking: [...step4SelectedItem?.overlooking, selectedItem],
        locationAdvantage: step4SelectedItem?.locationAdvantage,
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features,
      });
    }
  };
  //Local Advantages
  const [localAdvantageSelectedItem, setLocalAdvantageSelectedItem] = useState(
    [],
  );

  const handleLocalAdvantagePress = itemId => {
    if (localAdvantageSelectedItem.includes(itemId)) {
      setLocalAdvantageSelectedItem(
        localAdvantageSelectedItem?.filter(single => single !== itemId),
      );
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities,
        water: step4SelectedItem?.water,
        overlooking: step4SelectedItem?.overlooking,
        locationAdvantage: step4SelectedItem?.locationAdvantage.filter(
          single => single.id !== itemId,
        ),
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features,
      });
    } else {
      setLocalAdvantageSelectedItem([...localAdvantageSelectedItem, itemId]);
      const selectedItem = LocationAdvantages.find(
        single => single.id === itemId,
      );
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities,
        water: step4SelectedItem?.water,
        overlooking: step4SelectedItem?.overlooking,
        locationAdvantage: [
          ...step4SelectedItem?.locationAdvantage,
          selectedItem,
        ],
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features,
      });
    }
  };
  //checkbox
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const [checkbox, setCheckbox] = useState([
    {id: 1, title: 'Gated society', value: 'gated_society', index: 0},
    {id: 2, title: 'Waste Disposal', value: 'waste_disposal', index: 1},
    {id: 3, title: 'Vaastu Compliant', value: 'vaastu_compliant', index: 2},
    // { id: 4, title: 'Security', value: 'security', index: 3 },
    {
      id: 4,
      title: 'Wheel chair friendly',
      value: 'wheel_chair_friendly',
      index: 3,
    },
  ]);
  const [checkboxSelectedItem, setCheckboxSelectedItem] = useState([]);

  const handleCheckboxPress = itemId => {
    if (checkboxSelectedItem.includes(itemId)) {
      setCheckboxSelectedItem(
        checkboxSelectedItem?.filter(single => single !== itemId),
      );
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities,
        water: step4SelectedItem?.water,
        overlooking: step4SelectedItem?.overlooking,
        locationAdvantage: step4SelectedItem?.locationAdvantage,
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: step4SelectedItem?.features?.filter(
          single => single.id !== itemId,
        ),
      });
    } else {
      setCheckboxSelectedItem([...checkboxSelectedItem, itemId]);
      const selectedItem = checkbox.find(single => single.id === itemId);
      setStep4SelectedItem({
        amenities: step4SelectedItem?.amenities,
        water: step4SelectedItem?.water,
        overlooking: step4SelectedItem?.overlooking,
        locationAdvantage: step4SelectedItem?.locationAdvantage,
        powerBackUp: step4SelectedItem?.powerBackUp,
        p_facing: step4SelectedItem?.p_facing,
        flooringType: step4SelectedItem?.flooringType,
        features: [...step4SelectedItem?.features, selectedItem],
      });
    }
  };
  const [amenitiesError, setAmenitiesError] = useState(false);
  const [waterError, setWaterError] = useState(false);
  const [overlookingError, setOverlookingError] = useState(false);
  const [locationAdvantageError, setLocationAdvantageError] = useState(false);
  const [powerBackUpError, setPowerBackUpError] = useState(false);
  const [p_facingError, setP_facingError] = useState(false);
  const [flooringTypeError, setFlooringTypeError] = useState(false);
  const [featuresError, setFeaturesError] = useState(false);
  const [token, setToken] = useState('');

  const checkTextInput = () => {
    if (!step4SelectedItem?.amenities?.length) {
      var msg = 'Please select atleast one amenities';
      setAmenitiesError(msg);
      return;
    } else {
      setAmenitiesError(false);
    }
    if (!step4SelectedItem?.water?.length) {
      var msg = 'Please select atleast one water source';
      setWaterError(msg);
      return;
    } else {
      setWaterError(false);
    }
    if (!step4SelectedItem?.overlooking?.length) {
      var msg = 'Please select atleast one overlooking';
      setOverlookingError(msg);
      return;
    } else {
      setOverlookingError(false);
    }
    if (!step4SelectedItem?.locationAdvantage?.length) {
      var msg = 'Please select atleast one location Advantage';
      setLocationAdvantageError(msg);
      return;
    } else {
      setLocationAdvantageError(false);
    }
    if (!step4SelectedItem?.powerBackUp?.value) {
      var msg = 'Please select atleast one Power BackUp';
      setPowerBackUpError(msg);
      return;
    } else {
      setPowerBackUpError(false);
    }
    if (!step4SelectedItem?.p_facing?.value) {
      var msg = 'Please select atleast one Property Facing';
      setP_facingError(msg);
      return;
    } else {
      setP_facingError(false);
    }
    if (!step4SelectedItem?.flooringType?.value) {
      var msg = 'Please select atleast one Flooring Type';
      setFlooringTypeError(msg);
      return;
    } else {
      setFlooringTypeError(false);
    }
  };

  const step4Data = navigation => {
    checkTextInput();
    try {
      const ispg = step1SelectedItem?.post?.value === 'pg';
      if (
        // step4SelectedItem?.amenities?.length > 0
        // step4SelectedItem?.water?.length > 0 &&
        // // step4SelectedItem?.overlooking?.length > 0 &&
        // // step4SelectedItem?.locationAdvantage?.length > 0 &&
        // step4SelectedItem?.powerBackUp?.value?.length > 0 &&
        // step4SelectedItem?.flooringType?.value?.length > 0
        ispg
          ? PgStep4Item?.common_area_amenities?.length > 0 &&
            PgStep4Item?.parking_avail?.value?.length > 0
          : step4SelectedItem?.p_facing?.value?.length > 0
      ) {
        navigation.navigate('confirmPost', {
          step1SelectedItem,
          step2SelectedItem,
          step3SelectedItem,
          step4SelectedItem,
          propertyLocation,
          step1RentSelectedItem,
          unit,
          PgStep1Item,
          PgStep2Item,
          PgStep4Item,
          exclusivePost,
        });
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Please select all the required fields');
        } else {
          alert('Please select all the required fields');
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [checked, setChecked] = useState(false);
  const [uspVisible, setUspVisible] = useState(false);
  const [cardHeight, setCardHeight] = useState(undefined);

  const [PgStep4Item, setPgStep4Item] = useState({
    common_area_amenities: [],
    parking_avail: {},
    usp_category: {},
    pg_usp: '',
  });

  const [CommonAmenitiesData] = useState([
    {
      id: 1,
      title: 'Kitchen for self-cooking',
      value: 'kitchen_for_self_cooking',
    },
    {id: 2, title: 'RO', value: 'ro'},
    {id: 3, title: 'Fridge', value: 'fridge'},
    {id: 4, title: 'microwave', value: 'microwave'},
    {id: 5, title: 'lift', value: 'lift'},
    {id: 6, title: 'gymnasium', value: 'gymnasium'},
    {id: 7, title: 'power-backup', value: 'power_backup'},
    {id: 8, title: 'wi-fi', value: 'wi_fi'},
    {id: 9, title: 'Tv', value: 'tv'},
  ]);
  const [radioData] = useState([
    {id: 1, title: 'Two Wheeler', value: 'two_wheeler'},
    {id: 2, title: 'Four Wheeler', value: 'four_wheeler'},
    {id: 3, title: 'Both', value: 'both'},
  ]);
  const [usp_categoryData] = useState([
    {id: 1, label: 'Food', value: 'food'},
    {id: 2, label: 'Room', value: 'room'},
    {id: 3, label: 'PG', value: 'pg'},
    {id: 3, label: 'Locality', value: 'locality'},
    {id: 3, label: 'Amenities', value: 'amenities'},
    {id: 3, label: 'Others', value: 'others'},
  ]);
  const [common_area_amenitiesItem, setCommon_area_amenitiesItem] = useState(
    [],
  );
  const handlePGAreaAmenitiesItem = itemId => {
    if (common_area_amenitiesItem.includes(itemId)) {
      setCommon_area_amenitiesItem(
        common_area_amenitiesItem?.filter(single => single !== itemId),
      );
      setPgStep4Item({
        common_area_amenities: PgStep4Item?.common_area_amenities?.filter(
          single => single.id !== itemId,
        ),
        parking_avail: PgStep4Item?.parking_avail,
        usp_category: PgStep4Item?.usp_category,
        pg_usp: PgStep4Item?.pg_usp,
      });
    } else {
      setCommon_area_amenitiesItem([...common_area_amenitiesItem, itemId]);
      const selectedItem = CommonAmenitiesData.find(
        single => single.id === itemId,
      );
      setPgStep4Item({
        common_area_amenities: [
          ...PgStep4Item?.common_area_amenities,
          selectedItem,
        ],
        parking_avail: PgStep4Item?.parking_avail,
        usp_category: PgStep4Item?.usp_category,
        pg_usp: PgStep4Item?.pg_usp,
      });
    }
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

  const confirmPost = async () => {
    try {
      var {replace} = navigation;
      if (step4SelectedItem?.p_facing?.value?.length > 0) {
        var data = {
          property_action: step1SelectedItem?.post?.value,
          property_type:
            step1SelectedItem?.post?.value === 'sell'
              ? step1SelectedItem?.kind?.value == 'residential'
                ? step1SelectedItem?.type?.value
                : step1SelectedItem?.commercialPropType?.value
              : step1RentSelectedItem?.kind?.value == 'residential'
              ? step1RentSelectedItem?.type?.value
              : step1RentSelectedItem?.commercialPropType?.value,
          location: city,
          real_estate:
            step1SelectedItem?.post?.value === 'sell'
              ? step1SelectedItem?.kind?.value
              : step1RentSelectedItem?.kind?.value,
          property_name: step1SelectedItem?.name,
          locality: landmark,
          features: [
            {
              key: 1,
              title: 'bedroom',
              value: step2SelectedItem?.bedrooms?.value,
            },
            {
              key: 2,
              title: 'balconies',
              value: step2SelectedItem?.balconies?.value,
            },
            {
              key: 3,
              title: 'baths',
              value: step2SelectedItem?.bathrooms?.value,
            },
            {
              key: 4,
              title: 'floor',
              value: step2SelectedItem?.noFloorsOnProperty?.value,
            },
            {
              key: 5,
              title: 'total_floors',
              value: step2SelectedItem?.totalBuildingFloors,
            },
            {
              key: 6,
              title: 'furnish_status',
              value: step2SelectedItem?.furnishingDeatils?.value,
            },
          ],
          amenities: step4SelectedItem?.amenities,
          area: {
            carpet_area: unit?.carpetValue,
            carpet_area_unit: unit?.carpetStatus?.value,
            super_area: unit?.superValue,
            super_area_unit: unit?.superStatus?.value,
          },
          facing: step4SelectedItem?.p_facing?.value,
          availability: step2SelectedItem?.availability?.value,
          property_age: step2SelectedItem?.ageOfProperty?.value ?? '',
          expected_price: step3SelectedItem?.pricingDetails?.expected,
          token_amount: step3SelectedItem?.pricingDetails?.token,
          address: step1SelectedItem?.address,
          seller_id: user_id,
          description: step1SelectedItem?.description,
          device_id: 2,
          main_image: step3SelectedItem?.main_image,
          sub_images: step3SelectedItem?.sub_images ?? [],
          fcm_token: token,
          exclusive: exclusivePost,
          advantages: step4SelectedItem?.features,
          price_negotiations: step3SelectedItem?.checked,
          rera_id: reraID,
        };
        const postProperty = await fetchData.create(data);
        if (postProperty?.message == 'Success') {
          dispatch(
            setPostPropertyLocation({
              city: null,
              landmark: null,
            }),
          );
          replace('postCompleted');
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Please select the required fields');
        } else {
          alert('Please select all the required fields');
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  function handleBackButtonClick() {
    if (routeName.name == 'step4') {
      navigation.goBack();
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.header,
          marginVertical: Platform.OS == 'ios' ? 40 : 10,
        }}>
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
          STEP 4 OF 4
        </Text>
      </View>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={3}
          stepCount={4}
          labels={labels}
          renderStepIndicator={(position, stepStatus) => {
            switch (position?.stepStatus) {
              case 'current':
                return (
                  <Text style={{fontSize: 14, color: Color.white}}>
                    {position?.position + 1}
                  </Text>
                );
              case 'finished':
                return <FIcon name="check" size={16} color={Color.white} />;
              case 'unfinished':
                return (
                  <Text style={{fontSize: 14, color: Color.white}}>
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
        {step1SelectedItem?.post?.value == 'sell' ||
        step1SelectedItem?.post?.value == 'rent' ? (
          <View style={{marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                Nearby Amenities
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                }}>
                (Select Nearby Amenities)
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Amenities & USP’s
                </Text>
              </View> */}
              {/* <Text
              style={{
                fontSize: 14,
                fontFamily: Poppins.Medium,
                color: Color.red,
              }}>
              {amenitiesError}
            </Text> */}
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
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: AmenitiesSelectedItem.includes(
                            item?.id,
                          )
                            ? '#8C193F20'
                            : Color.white,
                          // width: width / 3.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          // height: 60,
                          padding: 10,
                          marginVertical: 10,
                          marginHorizontal: 5,
                          borderColor: AmenitiesSelectedItem.includes(item?.id)
                            ? Color.primary
                            : Color.lightgrey,
                          borderWidth: 1,
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          handleAmenitiesPress(item.id);
                          if (step4SelectedItem?.amenities?.length < 0) {
                            var msg = 'Please select atleast one Amenities';
                            setAmenitiesError(msg);
                            return;
                          } else {
                            setAmenitiesError(false);
                          }
                        }}>
                        <FIcon
                          name={
                            AmenitiesSelectedItem.includes(item?.id)
                              ? 'minus'
                              : 'plus'
                          }
                          size={16}
                          color={Color.black}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontWeight: 'bold',
                            marginHorizontal: 5,
                          }}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  {/* {showLoadMore && (
                    <TouchableOpacity
                      onPress={() => {
                        setAmenitiesVisible(true);
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: Color.primary,
                          marginHorizontal: 5,
                        }}>
                        +{Amenities.length - visibleData.length} more
                      </Text>
                    </TouchableOpacity>
                  )} */}
                  <Modal
                    transparent={true}
                    visible={amenitiesVisible}
                    animationType="fade">
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: Color.transparantBlack,
                      }}>
                      <Pressable
                        style={{flex: 1}}
                        onPress={() => {
                          setAmenitiesVisible(false);
                        }}
                      />
                      <View
                        style={{
                          backgroundColor: Color.white,
                          flex: 2,
                          padding: 10,
                          borderTopRightRadius: 30,
                          borderTopLeftRadius: 30,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: Color.black,
                              fontWeight: 'bold',
                            }}>
                            Nearby Amenities
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              marginVertical: 10,
                              color: Color.cloudyGrey,
                            }}>
                            (Select Nearby Amenities)
                          </Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          {Amenities.map((item, index) => {
                            return (
                              <AmenitiesCheckbox
                                key={index}
                                label={item.title}
                                checked={AmenitiesSelectedItem.includes(
                                  item.id,
                                )}
                                onPress={() => handleAmenitiesPress(item.id)}
                              />
                            );
                          })}
                          <Button
                            title={'Add'}
                            buttonStyle={{backgroundColor: Color.primary}}
                            onPress={() => {
                              setAmenitiesVisible(false);
                            }}
                          />
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            </View>

            {/* <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Water source
                </Text>
                <Text
                  style={{ color: Color.red, marginHorizontal: 5, fontSize: 20 }}>
                  *
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Poppins.Medium,
                  color: Color.red,
                }}>
                {waterError}
              </Text>
              <View style={{ marginVertical: 10 }}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    paddingEnd: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                  }}>
                  {water.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: waterSelectedItem.includes(item.id)
                            ? '#8C193F20'
                            : Color.white,
                          // width: width / 3.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          // height: 60,
                          padding: 10,
                          marginVertical: 10,
                          marginHorizontal: 5,
                          borderColor: waterSelectedItem.includes(item.id)
                            ? Color.primary
                            : Color.lightgrey,
                          borderWidth: 1,
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          handleWaterPress(item?.id);
                          if (step4SelectedItem?.water?.length < 0) {
                            var msg = 'Please select atleast one water source';
                            setWaterError(msg);
                            return;
                          } else {
                            setWaterError(false);
                          }
                        }}>
                        <FIcon
                          name={
                            waterSelectedItem.includes(item.id)
                              ? 'minus'
                              : 'plus'
                          }
                          size={16}
                          color={Color.black}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontWeight: 'bold',
                            marginHorizontal: 5,
                          }}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View> */}
            {/* 
            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Overlooking
                </Text>
             
              </View>
              <View style={{ marginVertical: 10 }}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    paddingEnd: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                  }}>
                  {Overlooking.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: overLookingSelectedItem.includes(
                            item.id,
                          )
                            ? '#8C193F20'
                            : Color.white,
                          // width: width / 3.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          // height: 60,
                          padding: 10,
                          marginHorizontal: 5,
                          marginVertical: 10,
                          borderColor: overLookingSelectedItem.includes(item.id)
                            ? Color.primary
                            : Color.lightgrey,
                          borderWidth: 1,
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          handleOverLookingPress(item?.id);
                          if (step4SelectedItem?.overlooking?.length < 0) {
                            var msg = 'Please select atleast one Overlooking';
                            setOverlookingError(msg);
                            return;
                          } else {
                            setOverlookingError(false);
                          }
                        }}>
                        <FIcon
                          name={
                            overLookingSelectedItem.includes(item.id)
                              ? 'minus'
                              : 'plus'
                          }
                          size={16}
                          color={Color.black}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontWeight: 'bold',
                            marginHorizontal: 5,
                          }}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View> */}

            {/* <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Location advantages
                </Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    paddingEnd: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                  }}>
                  {LocationvisibleData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: localAdvantageSelectedItem.includes(
                            item.id,
                          )
                            ? '#8C193F20'
                            : Color.white,
                          // width: width / 3.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          // height: 60,
                          padding: 10,
                          marginVertical: 10,
                          marginHorizontal: 5,
                          borderColor: localAdvantageSelectedItem.includes(
                            item.id,
                          )
                            ? Color.primary
                            : Color.lightgrey,
                          borderWidth: 1,
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          handleLocalAdvantagePress(item?.id);
                          if (
                            step4SelectedItem?.locationAdvantage?.length < 0
                          ) {
                            var msg = 'Please select atleast one Overlooking';
                            setLocationAdvantageError(msg);
                            return;
                          } else {
                            setLocationAdvantageError(false);
                          }
                        }}>
                        <FIcon
                          name={
                            localAdvantageSelectedItem.includes(item.id)
                              ? 'minus'
                              : 'plus'
                          }
                          size={16}
                          color={Color.black}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontWeight: 'bold',
                            marginHorizontal: 5,
                          }}>
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  {showLocationLoadMore && (
                    <TouchableOpacity onPress={LocationloadMoreItems}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: Color.primary,
                        }}>
                        +
                        {LocationAdvantages.length - LocationvisibleData.length}
                        more
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View> */}

            {/* <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Power Backup
                </Text>
                <Text
                  style={{ color: Color.red, marginHorizontal: 5, fontSize: 20 }}>
                  *
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Poppins.Medium,
                  color: Color.red,
                }}>
                {powerBackUpError}
              </Text>
              <View style={{ marginVertical: 10 }}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    paddingEnd: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                  }}>
                  {PowerBackup.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor:
                            step4SelectedItem?.powerBackUp?.id == item?.id
                              ? '#8C193F20'
                              : Color.white,
                          width: width / 3.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          padding: 10,
                          marginVertical: 10,
                          borderColor:
                            step4SelectedItem?.powerBackUp?.id == item?.id
                              ? Color.primary
                              : Color.lightgrey,
                          borderWidth: 1,
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          setStep4SelectedItem({
                            amenities: step4SelectedItem?.amenities,
                            water: step4SelectedItem?.water,
                            overlooking: step4SelectedItem?.overlooking,
                            locationAdvantage:
                              step4SelectedItem?.locationAdvantage,
                            powerBackUp: item,
                            p_facing: step4SelectedItem?.p_facing,
                            flooringType: step4SelectedItem?.flooringType,
                            features: step4SelectedItem?.features,
                          });
                          if (
                            step4SelectedItem?.powerBackUp?.value?.length === 0
                          ) {
                            var msg = 'Please select atleast one Overlooking';
                            setPowerBackUpError(msg);
                            return;
                          } else {
                            setPowerBackUpError(false);
                          }
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
            </View> */}

            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Property facing
                </Text>
                <Text
                  style={{color: Color.red, marginHorizontal: 5, fontSize: 20}}>
                  *
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Poppins.Medium,
                  color: Color.red,
                }}>
                {p_facingError}
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
                            step4SelectedItem?.p_facing?.id == item?.id
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
                            step4SelectedItem?.p_facing?.id == item?.id
                              ? Color.primary
                              : Color.lightgrey,
                          borderWidth: 1,
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          setStep4SelectedItem({
                            amenities: step4SelectedItem?.amenities,
                            water: step4SelectedItem?.water,
                            overlooking: step4SelectedItem?.overlooking,
                            locationAdvantage:
                              step4SelectedItem?.locationAdvantage,
                            powerBackUp: step4SelectedItem?.powerBackUp,
                            p_facing: item,
                            flooringType: step4SelectedItem?.flooringType,
                            features: step4SelectedItem?.features,
                          });
                          if (
                            step4SelectedItem?.p_facing?.value?.length === 0
                          ) {
                            var msg = 'Please select atleast one Overlooking';
                            setP_facingError(msg);
                            return;
                          } else {
                            setP_facingError(false);
                          }
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

            {/* <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Type of Flooring
                </Text>
                <Text
                  style={{ color: Color.red, marginHorizontal: 5, fontSize: 20 }}>
                  *
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: Poppins.Medium,
                  color: Color.red,
                }}>
                {flooringTypeError}
              </Text>
              <View style={{ marginVertical: 10 }}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    paddingEnd: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                  }}>
                  {FlooringTypes.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor:
                            step4SelectedItem?.flooringType?.id == item?.id
                              ? '#8C193F20'
                              : Color.white,
                          // width: width / 3.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          padding: 10,
                          marginVertical: 10,
                          marginHorizontal: 10,
                          borderColor:
                            step4SelectedItem?.flooringType?.id == item?.id
                              ? Color.primary
                              : Color.lightgrey,
                          borderWidth: 1,
                          flexDirection: 'row',
                        }}
                        onPress={() => {
                          setStep4SelectedItem({
                            amenities: step4SelectedItem?.amenities,
                            water: step4SelectedItem?.water,
                            overlooking: step4SelectedItem?.overlooking,
                            locationAdvantage:
                              step4SelectedItem?.locationAdvantage,
                            powerBackUp: step4SelectedItem?.powerBackUp,
                            p_facing: step4SelectedItem?.p_facing,
                            flooringType: item,
                            features: step4SelectedItem?.features,
                          });
                          if (
                            step4SelectedItem?.flooringType?.value?.length === 0
                          ) {
                            var msg = 'Please select Flooring Type';
                            setFlooringTypeError(msg);
                            return;
                          } else {
                            setFlooringTypeError(false);
                          }
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
            </View> */}

            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                Other Features{' '}
                <Text style={{fontSize: 14, color: Color.lightgrey}}>
                  (Optional)
                </Text>
              </Text>
              <View style={{marginVertical: 10}}>
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
            </View>
          </View>
        ) : (
          <View style={{marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                Nearby Amenities
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                }}>
                (Select Nearby Amenities)
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                Common Area Amenities
              </Text>
              <View style={{marginVertical: 10}}>
                {CommonAmenitiesData.map((item, index) => {
                  return (
                    <RightCheckBox
                      key={index}
                      label={item.title}
                      checked={common_area_amenitiesItem.includes(item.id)}
                      onPress={() => handlePGAreaAmenitiesItem(item.id)}
                    />
                  );
                })}
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Parking Availability
                </Text>
                <Text
                  style={{
                    color: Color.red,
                    marginHorizontal: 5,
                    fontSize: 20,
                  }}>
                  *
                </Text>
                <View style={{flex: 1}}>
                  <Switch
                    value={checked}
                    onValueChange={() => {
                      setChecked(!checked);
                    }}
                  />
                </View>
              </View>
              {checked && (
                <View style={{marginVertical: 10}}>
                  {radioData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 10,
                        }}
                        onPress={() => {
                          setPgStep4Item({
                            common_area_amenities:
                              PgStep4Item?.common_area_amenities,
                            parking_avail: item,
                            usp_category: PgStep4Item?.usp_category,
                            pg_usp: PgStep4Item?.pg_usp,
                          });
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 16,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                          }}>
                          {item.title}
                        </Text>
                        <Icon
                          name={
                            PgStep4Item?.parking_avail?.id === item.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          size={20}
                          color={
                            PgStep4Item?.parking_avail?.id === item.id
                              ? Color.primary
                              : Color.black
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
            {/* <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Write a USP about your PG
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
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    color: Color.cloudyGrey,
                    marginHorizontal: 5,
                    fontSize: 14,
                  }}>
                  Select Category
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setUspVisible(true);
                  }}
                  style={{
                    backgroundColor: Color.white,
                    borderColor: Color.cloudyGrey,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    // height: 40,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      flex: 1,
                      fontFamily: Poppins.SemiBold,
                      fontSize: 14,
                      textTransform: 'capitalize',
                    }}>
                    {PgStep4Item?.usp_category?.value?.length > 0
                      ? PgStep4Item?.usp_category?.value
                      : 'Select'}
                  </Text>
                  <Icon name="caret-down" size={20} color={Color.black} />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={uspVisible}
                  animationType="fade">
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: Color.transparantBlack,
                    }}>
                    <Pressable
                      style={{flex: 1}}
                      onPress={() => {
                        setUspVisible(false);
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: Color.white,
                        padding: 10,
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        height: cardHeight,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Color.cloudyGrey,
                          fontWeight: 'bold',
                          marginVertical: 10,
                        }}>
                        Select
                      </Text>
                      <Divider style={styles.Divider} />
                      <View
                        style={{
                          marginHorizontal: 20,
                        }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          {usp_categoryData.map((item, index) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  setPgStep4Item({
                                    common_area_amenities:
                                      PgStep4Item?.common_area_amenities,
                                    parking_avail: PgStep4Item?.parking_avail,
                                    usp_category: item,
                                    pg_usp: PgStep4Item?.pg_usp,
                                  });
                                  setUspVisible(false);
                                }}>
                                <View style={{alignItems: 'center'}}>
                                  <Text style={styles.ModalDataText}>
                                    {item?.label}
                                  </Text>
                                </View>
                                <Divider style={styles.Divider} />
                              </TouchableOpacity>
                            );
                          })}
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
              <View
                style={{
                  marginVertical: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    Write PG USP
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
                <TextInput
                  placeholder="Enter your usp..."
                  placeholderTextColor={Color.cloudyGrey}
                  value={PgStep4Item?.pg_usp}
                  textAlignVertical="top"
                  onChangeText={value => {
                    setPgStep4Item({
                      common_area_amenities: PgStep4Item?.common_area_amenities,
                      parking_avail: PgStep4Item?.parking_avail,
                      usp_category: PgStep4Item?.usp_category,
                      pg_usp: value,
                    });
                  }}
                  style={{
                    flex: 1,
                    color: Color.black,
                    padding: 10,
                    height: 150,
                    borderWidth: 1,
                    borderColor: Color.cloudyGrey,
                    marginVertical: 5,
                    borderRadius: 5,
                  }}
                />
              </View>
              {PgStep4Item?.usp_category?.value?.length > 0 && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      marginHorizontal: 5,
                      fontSize: 16,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    Example USP's
                  </Text>
                  <ExampleUSPS data={PgStep4Item?.usp_category?.value} />
                </View>
              )}
            </View> */}
          </View>
        )}
        {step1SelectedItem?.post?.value != 'pg' && (
          <>
            <View
              style={{
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Enter Your RERA Id
              </Text>

              <TextInput
                placeholder="Enter your RERA Id..."
                placeholderTextColor={Color.cloudyGrey}
                value={reraID}
                textAlignVertical="top"
                onChangeText={value => {
                  setReraID(value);
                }}
                style={{
                  flex: 1,
                  color: Color.black,
                  padding: 10,
                  height: 45,
                  borderWidth: 1,
                  borderColor: Color.cloudyGrey,
                  marginVertical: 5,
                  borderRadius: 5,
                  fontSize: 15,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 20,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                style={{}}
                onPress={() => setExclusivePost(!exclusivePost)}>
                <MCIcon
                  name={
                    exclusivePost ? 'checkbox-marked' : 'checkbox-blank-outline'
                  }
                  color={Color.primary}
                  size={30}
                  style={{}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  width: '80%',
                  marginHorizontal: 10,
                  fontSize: 14,
                  fontFamily: Poppins.SemiBold,
                  color: Color.cloudyGrey,
                  textAlign: 'justify',
                }}>
                I'm posting this property on 'exclusively' on Albion Property
                Hub
              </Text>
              <MCIcon
                name="brightness-percent"
                size={24}
                color={Color.primary}
              />
            </View>
          </>
        )}
        <Button
          title={
            step1SelectedItem?.post?.value == 'sell' ||
            step1SelectedItem?.post?.value == 'rent'
              ? 'Confirm Post'
              : 'Next'
          }
          buttonStyle={{
            backgroundColor: Color.primary,
            height: 45,
            marginVertical: 20,
          }}
          onPress={() => {
            step1SelectedItem?.post?.value == 'sell' ||
            step1SelectedItem?.post?.value == 'rent'
              ? confirmPost(navigation)
              : step4Data(navigation);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default PostStep4Screen;

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
  ModalDataView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ModalDataText: {
    // flex: 1,
    fontSize: 16,
    fontFamily: Poppins.SemiBold,
    color: Color.black,
    textTransform: 'capitalize',
  },
  Divider: {height: 1, marginVertical: 10},
});
