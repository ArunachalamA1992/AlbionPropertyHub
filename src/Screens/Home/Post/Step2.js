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
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterLocation } from '../../../Redux';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Divider } from 'react-native-elements';
import { Modal } from 'react-native';
import { Poppins } from '../../../Global/FontFamily';
import common_fn from '../../../Config/common_fn';
import { RightCheckBox } from '../../../Components/Checkbox';
import { Switch } from 'react-native-paper';
import { BackHandler } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
  'Property Features',
  'Photos & Pricing',
  'Amenities',
];

const Plotlabels = ['Basic Details', 'Property Features', 'Photos & Pricing'];

const PostStep2Screen = ({ navigation, route }) => {
  const routeName = useRoute();
  const [step1SelectedItem] = useState(route.params.step1SelectedItem);
  const [propertyLocation] = useState(route.params.propertyLocation);
  const [step1RentSelectedItem] = useState(route.params.step1RentSelectedItem);
  const [PgStep1Item] = useState(route.params.PgStep1Item);
  const [buildingCount, setBuildingCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('');
  const [floorVisible, setFloorVisible] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);
  const [bedrooms] = useState([
    { id: 1, title: '1', value: '1' },
    { id: 2, title: '2', value: '2' },
    { id: 3, title: '3', value: '3' },
    { id: 4, title: '4', value: '4' },
    { id: 5, title: '5', value: '5' },
    { id: 6, title: '5+', value: '5+' },
  ]);
  const [PGbedrooms] = useState([
    { id: 1, title: 'single', value: 'single' },
    { id: 2, title: 'double', value: 'double' },
    { id: 3, title: 'triple', value: 'triple' },
    { id: 4, title: 'four', value: 'four' },
  ]);
  const [single_rooms] = useState([
    { id: 1, title: '1', value: '1' },
    { id: 2, title: '2', value: '2' },
    { id: 3, title: '3', value: '3' },
    { id: 4, title: '4', value: '4' },
    { id: 5, title: '5', value: '5' },
    { id: 6, title: '5+', value: '5+' },
  ]);
  const [washrooms] = useState([
    { id: 1, title: '1', value: '1' },
    { id: 2, title: '2', value: '2' },
    { id: 3, title: '3', value: '3' },
    { id: 4, title: '4', value: '4' },
    { id: 5, title: '5', value: '5' },
    { id: 6, title: '5+', value: '5+' },
  ]);
  const [bathrooms] = useState([
    { id: 1, title: '1', value: '1' },
    { id: 2, title: '2', value: '2' },
    { id: 3, title: '3', value: '3' },
    { id: 4, title: '4', value: '4' },
    { id: 5, title: '5', value: '5' },
    { id: 6, title: '5+', value: '5+' },
  ]);
  const [balconies] = useState([
    { id: 1, title: '1', value: '1' },
    { id: 2, title: '2', value: '2' },
    { id: 3, title: '3', value: '3' },
    { id: 4, title: '4', value: '4' },
    { id: 5, title: 'More than 4', value: 'more_than_4' },
  ]);
  const [availability] = useState([
    { id: 1, title: 'Ready to move', value: 'ready_to_move' },
    { id: 2, title: 'Under Construction', value: 'under_construction' },
  ]);
  const [step2SelectedItem, setStep2SelectedItem] = useState({
    bedrooms: {},
    bathrooms: {},
    balconies: {},
    totalBuildingFloors: 0,
    plotSpec: {
      plotAllowed: {},
      noOfopenSide: {},
    },
    plotFacing: 0,
    constructionDone: {},
    boundryWall: {},
    gatedColony: {},
    propertyArea: {
      plotArea: '',
      plotlength: '',
      plotBreath: '',
    },
    ApprovalAuthority: '',
    noFloorsOnProperty: {},
    furnishingDeatils: {},
    otherRooms: [],
    availability: {},
    ageOfProperty: {},
    completionTime: {},
    propertyFacing: {},
  });
  const [PropertyFacing] = useState([
    { id: 1, title: 'North', value: 'north' },
    { id: 2, title: 'North -  East', value: 'north_east' },
    { id: 3, title: 'East', value: 'east' },
    { id: 4, title: 'West', value: 'west' },
    { id: 5, title: 'South', value: 'south' },
    { id: 6, title: 'South - East', value: 'south_east' },
    { id: 7, title: 'South - West', value: 'south_west' },
    { id: 8, title: 'North - West', value: 'north_west' },
  ]);
  const [plotStatus, setPlotStatus] = useState({
    label: 'sq.ft',
    value: 'sq.ft',
  });
  const [plotValue, setPlotValue] = useState('');
  const [plotAreaunit] = useState([
    { label: 'sq.ft', value: 'sq.ft' },
    { label: 'cent', value: 'cent' },
  ]);
  const [step2CommercialSelected, setStep2CommercialSelected] = useState({
    pantry: {},
    washroom: {},
    totalBuildingFloors: 0,
    noFloorsOnProperty: {},
    furnishingDeatils: {},
    propertyArea: {
      plotArea: '',
      plotlength: '',
      plotBreath: '',
    },
    perWash: {},
    noSeats: '',
    corShop: {},
    mainRoadFace: {},
    modifyInterior: {},
    lockPeriod: {},
  });
  const [areaSelectedItem, setAreaSelectedItem] = useState({
    Carpet: '',
    builtupArea: '',
    superArea: '',
  });
  const [floors] = useState([
    { id: 1, label: 'basement', value: 'basement' },
    { id: 2, label: 'ground Floor', value: 'ground_floor' },
    { id: 3, label: '1', value: '1' },
    { id: 4, label: '2', value: '2' },
    { id: 5, label: '3', value: '3' },
    { id: 6, label: '4', value: '4' },
    { id: 7, label: '5', value: '5' },
    { id: 8, label: '6', value: '6' },
    { id: 9, label: '7', value: '7' },
    { id: 10, label: '8', value: '8' },
    { id: 11, label: '9', value: '9' },
    { id: 12, label: '10', value: '10' },
    { id: 13, label: '11', value: '11' },
    { id: 14, label: '12', value: '12' },
    { id: 15, label: '13', value: '13' },
    { id: 16, label: '14', value: '14' },
    { id: 17, label: '15', value: '15' },
  ]);

  const filteredFloors = floors.filter((floor) => floor.label <= step2SelectedItem?.totalBuildingFloors);
  filteredFloors.unshift({ id: 1, label: 'basement', value: 'basement' },
    { id: 2, label: 'ground Floor', value: 'ground_floor' })

  const [FurnishingStatus] = useState([
    { id: 1, title: 'Un Furnished', value: 'unfurnished' },
    { id: 2, title: 'Semi Furnished', value: 'semi_furnished' },
    { id: 3, title: 'Furnished', value: 'furnished' },
  ]);
  const [otherRooms] = useState([
    { id: 1, title: 'Study Room', value: "study_room" },
    { id: 2, title: 'Gym', value: "gym" },
    { id: 3, title: 'Store Room', value: "store_room" },
    { id: 4, title: 'Pooja Room', value: "pooja_room" },
    { id: 5, title: 'Others', value: "others" },
  ]);
  const [otherRoomsSelectedItem, setOtherRoomsSelectedItem] = useState([]);
  const handleotherRooms = itemId => {
    if (otherRoomsSelectedItem.includes(itemId)) {
      setOtherRoomsSelectedItem(
        otherRoomsSelectedItem?.filter(single => single !== itemId),
      );
      setStep2SelectedItem({
        bedrooms: step2SelectedItem.bedrooms,
        bathrooms: step2SelectedItem.bathrooms,
        balconies: step2SelectedItem.balconies,
        totalBuildingFloors: step2SelectedItem.totalBuildingFloors,
        noFloorsOnProperty: step2SelectedItem.noFloorsOnProperty,
        furnishingDeatils: step2SelectedItem.furnishingDeatils,
        otherRooms: step2SelectedItem?.otherRooms?.filter(
          single => single.id !== itemId,
        ),
        availability: step2SelectedItem.availability,
        ageOfProperty: step2SelectedItem.ageOfProperty,
        completionTime: step2SelectedItem.completionTime,
        plotSpec: {
          plotAllowed: step2SelectedItem?.plotSpec?.plotAllowed,
          noOfopenSide: step2SelectedItem?.plotSpec?.noOfopenSide,
        },
        plotFacing: step2SelectedItem?.plotFacing,
        constructionDone: step2SelectedItem?.constructionDone,
        boundryWall: step2SelectedItem?.boundryWall,
        gatedColony: step2SelectedItem?.gatedColony,
        propertyArea: {
          plotArea: step2SelectedItem?.propertyArea?.plotArea,
          plotlength: step2SelectedItem?.propertyArea?.plotlength,
          plotBreath: step2SelectedItem?.propertyArea?.plotBreath,
        },
        ApprovalAuthority: step2SelectedItem?.ApprovalAuthority,
        propertyFacing: step2SelectedItem?.propertyFacing,
      });
    } else {
      setOtherRoomsSelectedItem([...otherRoomsSelectedItem, itemId]);
      const selectedItem = otherRooms.find(single => single.id === itemId);
      setStep2SelectedItem({
        bedrooms: step2SelectedItem.bedrooms,
        bathrooms: step2SelectedItem.bathrooms,
        balconies: step2SelectedItem.balconies,
        totalBuildingFloors: step2SelectedItem.totalBuildingFloors,
        noFloorsOnProperty: step2SelectedItem.noFloorsOnProperty,
        furnishingDeatils: step2SelectedItem.furnishingDeatils,
        otherRooms: [...step2SelectedItem?.otherRooms, selectedItem],
        availability: step2SelectedItem.availability,
        ageOfProperty: step2SelectedItem.ageOfProperty,
        completionTime: step2SelectedItem.completionTime,
        plotSpec: {
          plotAllowed: step2SelectedItem?.plotSpec?.plotAllowed,
          noOfopenSide: step2SelectedItem?.plotSpec?.noOfopenSide,
        },
        plotFacing: step2SelectedItem?.plotFacing,
        constructionDone: step2SelectedItem?.constructionDone,
        boundryWall: step2SelectedItem?.boundryWall,
        gatedColony: step2SelectedItem?.gatedColony,
        propertyArea: {
          plotArea: step2SelectedItem?.propertyArea?.plotArea,
          plotlength: step2SelectedItem?.propertyArea?.plotlength,
          plotBreath: step2SelectedItem?.propertyArea?.plotBreath,
        },
        ApprovalAuthority: step2SelectedItem?.ApprovalAuthority,
        propertyFacing: step2SelectedItem?.propertyFacing,
      });
    }
  };
  const [ageOfProperty] = useState([
    { id: 1, title: 'New', value: 'New' },
    { id: 2, title: '0-1 Years', value: '0-1 Years' },
    { id: 3, title: '1-5 Years', value: '1-5 Years' },
    { id: 4, title: '5-10 Years', value: '5-10 Years' },
    { id: 5, title: '10+ Years', value: '10+ Years' },
  ]);
  const [propertyCompleteDuration] = useState([
    { id: 1, title: 'New', value: 'new' },
    { id: 2, title: '0-6 mon', value: '0-6_mon' },
    { id: 3, title: '0-1 Years', value: '0-1_years' },
    { id: 4, title: '1-5 Years', value: '1-5_years' },
  ]);

  //PG

  const [PgStep2Item, setPgStep2Item] = useState({
    bedrooms: [],
    no_single_rooms: {},
    monthly_rent: {
      single_bed: "",
      double_bed: "",
      triple_bed: "",
      four_bed: ""
    },
    security_deposit: {
      single_bed: "",
      double_bed: "",
      triple_bed: "",
      four_bed: ""
    },
    room_facility: [],
    gender: {},
    tententPreferences: {},
    pg_rules: [],
    notice_period: {},
    gate_closing_time: null,
    service_avail: [],
    food_provide: [],
    veg_non_veg_food: {},
    food_charges: {},
    parking_avail: {},
  });

  //PG Bedrooms
  const [PGbedroomsSelectedItem, setPGbedroomsSelectedItem] = useState([]);
  const handlePGbedroomsPress = itemId => {
    if (PGbedroomsSelectedItem.includes(itemId)) {
      setPGbedroomsSelectedItem(
        PGbedroomsSelectedItem?.filter(single => single !== itemId),
      );
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms?.filter(
          single => single.id !== itemId,
        ),
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility,
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules,
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail,
        food_provide: PgStep2Item?.food_provide,
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    } else {
      setPGbedroomsSelectedItem([...PGbedroomsSelectedItem, itemId]);
      const selectedItem = PGbedrooms.find(single => single.id === itemId);
      setPgStep2Item({
        bedrooms: [...PgStep2Item?.bedrooms, selectedItem],
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility,
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules,
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail,
        food_provide: PgStep2Item?.food_provide,
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    }
  };
  const [roomFacility, setRoomFacility] = useState([
    // { id: 1, title: 'Geyser', value: 'geyser' },
    // { id: 2, title: 'Washrooms', value: 'washrooms' },
    // { id: 3, title: 'cupboard', value: 'cupboard' },
    // { id: 4, title: 'TV', value: 'tv' },
    // { id: 5, title: 'AC', value: 'ac' },
    // { id: 6, title: 'Cot', value: 'cot' },
    // { id: 7, title: 'Mattress', value: 'mattress' },
    // { id: 8, title: 'Side Table', value: 'side_table' },
    // { id: 9, title: 'Air Cooler', value: 'air_cooler' },
    { id: 1, title: 'Washrooms', value: 'washrooms' },
    { id: 2, title: 'AC', value: 'ac' },
    { id: 3, title: 'TV', value: 'tv' },
    { id: 4, title: 'cupboard', value: 'cupboard' },
    { id: 5, title: 'Cot', value: 'cot' },
    { id: 6, title: 'Gymnasium', value: 'gymnasium' },
    { id: 7, title: 'wifi', value: 'wifi' },
    { id: 8, title: 'power backup', value: 'power_backup' },
    { id: 9, title: 'lift', value: 'lift' },
  ]);
  const [serviceAvailableData] = useState([
    { id: 1, title: 'Laundry', value: 'laundry' },
    { id: 2, title: 'Room Cleaning', value: 'room_cleaning' },
    { id: 3, title: 'Warden', value: 'warden' },
  ]);
  const [FoodProvidedData] = useState([
    { id: 1, title: 'Breakfast', value: 'breakfast' },
    { id: 2, title: 'Lunch', value: 'lunch' },
    { id: 3, title: 'Dinner', value: 'dinner' },
  ]);

  const [room_facilityItem, setRoom_facilityItem] = useState([]);
  const handleRoomFacilityItem = itemId => {
    if (room_facilityItem.includes(itemId)) {
      setRoom_facilityItem(
        room_facilityItem?.filter(single => single !== itemId),
      );
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms,
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility?.filter(
          single => single.id !== itemId,
        ),
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules,
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail,
        food_provide: PgStep2Item?.food_provide,
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    } else {
      setRoom_facilityItem([...room_facilityItem, itemId]);
      const selectedItem = roomFacility.find(single => single.id === itemId);
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms,
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: [...PgStep2Item?.room_facility, selectedItem],
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules,
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail,
        food_provide: PgStep2Item?.food_provide,
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    }
  };
  const [pg_rulesItem, setPg_rulesItem] = useState([]);
  const handlePGRulesItem = itemId => {
    if (pg_rulesItem.includes(itemId)) {
      setPg_rulesItem(pg_rulesItem?.filter(single => single !== itemId));
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms,
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility,
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules?.filter(single => single.id !== itemId),
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail,
        food_provide: PgStep2Item?.food_provide,
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    } else {
      setPg_rulesItem([...pg_rulesItem, itemId]);
      const selectedItem = PgRulesData.find(single => single.id === itemId);
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms,
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility,
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: [...PgStep2Item?.pg_rules, selectedItem],
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail,
        food_provide: PgStep2Item?.food_provide,
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    }
  };
  const [FoodProvidedItem, setFoodProvidedItem] = useState([]);
  const handleFoodProvidedItem = (itemId, value) => {
    if (FoodProvidedItem.includes(itemId)) {
      setFoodProvidedItem(
        FoodProvidedItem?.filter(single => single !== itemId),
      );
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms,
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility,
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules,
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail,
        food_provide: PgStep2Item?.food_provide?.filter(
          single => single !== value,
        ),
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    } else {
      setFoodProvidedItem([...FoodProvidedItem, itemId]);
      const selectedItem = FoodProvidedData.find(
        single => single.id === itemId,
      );
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms,
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility,
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules,
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail,
        food_provide: [...PgStep2Item?.food_provide, value],
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    }
  };
  const [service_availItem, setService_availItem] = useState([]);
  const handleServiceAvailItem = itemId => {
    if (service_availItem.includes(itemId)) {
      setService_availItem(
        service_availItem?.filter(single => single !== itemId),
      );
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms,
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility,
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules,
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: PgStep2Item?.service_avail?.filter(
          single => single.id !== itemId,
        ),
        food_provide: PgStep2Item?.food_provide,
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    } else {
      setService_availItem([...service_availItem, itemId]);
      const selectedItem = serviceAvailableData.find(
        single => single.id === itemId,
      );
      setPgStep2Item({
        bedrooms: PgStep2Item?.bedrooms,
        no_single_rooms: PgStep2Item?.no_single_rooms,
        monthly_rent: {
          single_bed: PgStep2Item?.monthly_rent?.single_bed,
          double_bed: PgStep2Item?.monthly_rent?.double_bed,
          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
          four_bed: PgStep2Item?.monthly_rent?.four_bed
        },
        security_deposit: {
          single_bed: PgStep2Item?.security_deposit?.single_bed,
          double_bed: PgStep2Item?.security_deposit?.double_bed,
          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
          four_bed: PgStep2Item?.security_deposit?.four_bed
        },
        room_facility: PgStep2Item?.room_facility,
        gender: PgStep2Item?.gender,
        tententPreferences: PgStep2Item?.tententPreferences,
        pg_rules: PgStep2Item?.pg_rules,
        notice_period: PgStep2Item?.notice_period,
        gate_closing_time: PgStep2Item?.gate_closing_time,
        service_avail: [...PgStep2Item?.service_avail, selectedItem],
        food_provide: PgStep2Item?.food_provide,
        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
        food_charges: PgStep2Item?.food_charges,
        parking_avail: PgStep2Item?.parking_avail
      });
    }
  };

  //unit value
  const [carpetStatus, setCarpetStatus] = useState({
    label: 'sq.ft',
    value: 'sq.ft',
  });
  const [carpetValue, setCarpetValue] = useState('');
  const [carpetUnit] = useState([
    { label: 'sq.ft', value: 'sq.ft' },
    { label: 'cent', value: 'cent' },
  ]);

  const [buildStatus, setBuildStatus] = useState({
    label: 'sq.ft',
    value: 'sq.ft',
  });
  const [buildValue, setBuildValue] = useState('');
  const [buildUnit] = useState([
    { label: 'sq.ft', value: 'sq.ft' },
    { label: 'cent', value: 'cent' },
  ]);

  const [superStatus, setSuperStatus] = useState({
    label: 'sq.ft',
    value: 'sq.ft',
  });
  const [superValue, setSuperValue] = useState('');
  const [superUnit] = useState([
    { label: 'sq.ft', value: 'sq.ft' },
    { label: 'cent', value: 'cent' },
  ]);

  const [bedroomsError, setBedroomsError] = useState(false);
  const [bathroomsError, setBathroomsError] = useState(false);
  const [balconiesError, setBalconiesError] = useState(false);
  const [totalBuildingFloorsError, setTotalBuildingFloorsError] =
    useState(false);
  const [noFloorsOnPropertyError, setNoFloorsOnPropertyError] = useState(false);
  const [furnishingDeatilsError, setFurnishingDeatilsError] = useState(false);
  const [otherRoomsError, setOtherRoomsError] = useState(false);
  const [carpetError, setCarpetError] = useState(false);
  const [buildError, setBuildError] = useState(false);
  const [superError, setSuperError] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);
  const [ageOfPropertyError, setAgeOfPropertyError] = useState(false);
  const [PropertyCompletionError, setPropertyCompletionError] = useState(false);
  const [PlotSpecVisible, setPlotSpecVisible] = useState(false);
  const [NOPlotSidesVisible, setNOPlotSidesVisible] = useState(false);

  const checkTextInput = () => {
    if (!step2SelectedItem?.bedrooms?.value) {
      var msg = 'Please select bedrroms';
      setBedroomsError(msg);
      return;
    } else {
      setBedroomsError(false);
    }
    if (!step2SelectedItem?.bathrooms?.value) {
      var msg = 'Please select bathrooms';
      setBathroomsError(msg);
      return;
    } else {
      setBathroomsError(false);
    }
    if (!step2SelectedItem?.balconies?.value) {
      var msg = 'Please select balconies';
      setBalconiesError(msg);
      return;
    } else {
      setBalconiesError(false);
    }
    if (!step2SelectedItem?.totalBuildingFloors) {
      var msg = 'Please select the total building floors';
      setTotalBuildingFloorsError(msg);
      return;
    } else {
      setTotalBuildingFloorsError(false);
    }
    if (!step2SelectedItem?.noFloorsOnProperty?.value) {
      var msg = 'Please select your floor type';
      setNoFloorsOnPropertyError(msg);
      return;
    } else {
      setNoFloorsOnPropertyError(false);
    }
    if (!carpetValue) {
      var msg = 'Please select and type carpet area';
      setCarpetError(msg);
      return;
    } else {
      setCarpetError(false);
    }
    if (!step2SelectedItem?.availability?.value) {
      var msg = 'Please select your availability';
      setAvailabilityError(msg);
      return;
    } else {
      setAvailabilityError(false);
    }
    if (!step2SelectedItem?.ageOfProperty?.value) {
      var msg = 'Please select your age of property';
      setAgeOfPropertyError(msg);
      return;
    } else {
      setAgeOfPropertyError(false);
    }
    if (!step2SelectedItem?.completionTime?.value) {
      var msg = 'Please select your Property Completion Time';
      setPropertyCompletionError(msg);
      return;
    } else {
      setPropertyCompletionError(false);
    }
    if (!superValue) {
      var msg = 'Please select and type super area';
      setSuperError(msg);
      return;
    } else {
      setSuperError(false);
    }
    if (!step2SelectedItem?.furnishingDeatils?.value) {
      var msg = 'Please select furnishing';
      setFurnishingDeatilsError(msg);
      return;
    } else {
      setFurnishingDeatilsError(false);
    }
    if (!step2SelectedItem?.otherRooms?.value) {
      var msg = 'Please select other rooms';
      setOtherRoomsError(msg);
      return;
    } else {
      setOtherRoomsError(false);
    }
  };

  // const step2Data = navigation => {
  //   try {
  //     if (
  //       step1SelectedItem?.post?.value == 'sell' ||
  //       step1SelectedItem?.post?.value == 'rent'
  //     ) {
  //       if (
  //         // Check conditions based on property post, type and kind
  //         // Residential Property

  //         (step1SelectedItem?.kind?.value == 'Residential' &&
  //           step1SelectedItem?.post?.value == 'sell') ||
  //           (step1RentSelectedItem?.kind?.value == 'Residential' &&
  //             step1SelectedItem?.post?.value == 'rent')
  //           ? // Plot type property conditions
  //           (step1SelectedItem?.type?.value == 'Plot' &&
  //             step1SelectedItem?.post?.value == 'sell') ||
  //             (step1RentSelectedItem?.type?.value == 'Plot' &&
  //               step1SelectedItem?.post?.value == 'rent')
  //             ? // Check specific conditions for Plot type property
  //             step2SelectedItem?.constructionDone?.value?.length > 0 &&
  //             step2SelectedItem?.propertyFacing?.value?.length > 0 &&
  //             step2SelectedItem?.boundryWall?.value?.length > 0 &&
  //             step2SelectedItem?.gatedColony?.value?.length > 0 &&
  //             step2SelectedItem?.propertyArea?.plotArea?.length > 0
  //             : // Flat type property conditions
  //             (step1SelectedItem?.type?.value == 'flat' &&
  //               step1SelectedItem?.post?.value == 'sell') ||
  //               (step1RentSelectedItem?.type?.value == 'flat' &&
  //                 step1SelectedItem?.post?.value == 'rent')
  //               ? // Check specific conditions for Flat type property
  //               step2SelectedItem?.bedrooms?.value?.length > 0 &&
  //               step2SelectedItem?.bathrooms?.value?.length > 0 &&
  //               step2SelectedItem?.balconies?.value?.length > 0 &&
  //               carpetValue?.length > 0 &&
  //               superValue?.length > 0 &&
  //               parseInt(carpetValue) != 0 &&
  //               parseInt(superValue) != 0 &&
  //               parseInt(carpetValue) <= parseInt(superValue) &&
  //               step2SelectedItem?.totalBuildingFloors !== 0 &&
  //               step2SelectedItem?.noFloorsOnProperty?.value?.length > 0 &&
  //               step2SelectedItem?.availability?.value?.length > 0 &&
  //               (step2SelectedItem?.ageOfProperty?.value?.length > 0 ||
  //                 step2SelectedItem?.completionTime?.value?.length > 0)
  //               : // Other Residential type property conditions
  //               step2SelectedItem?.bedrooms?.value?.length > 0 &&
  //               step2SelectedItem?.bathrooms?.value?.length > 0 &&
  //               step2SelectedItem?.balconies?.value?.length > 0 &&
  //               carpetValue?.length > 0 &&
  //               superValue?.length > 0 &&
  //               parseInt(carpetValue) != 0 &&
  //               parseInt(superValue) != 0 &&
  //               parseInt(carpetValue) <= parseInt(superValue) &&
  //               step2SelectedItem?.availability?.value?.length > 0 &&
  //               (step2SelectedItem?.ageOfProperty?.value?.length > 0 ||
  //                 step2SelectedItem?.completionTime?.value?.length > 0)
  //           : // Commercial Office Property conditions
  //           ((step1SelectedItem?.kind?.value === 'Commercial' ||
  //             step1RentSelectedItem?.kind?.value === 'Commercial') &&
  //             step1SelectedItem?.commercialPropType?.value == 'Office' &&
  //             step1SelectedItem?.post?.value == 'sell') ||
  //             (step1RentSelectedItem?.commercialPropType?.value == 'Office' &&
  //               step1SelectedItem?.post?.value == 'rent' &&
  //               step2CommercialSelected?.washroom?.value !== 0 &&
  //               step2CommercialSelected?.noSeats?.length > 0 &&
  //               step2SelectedItem?.propertyFacing?.value?.length > 0 &&
  //               step2CommercialSelected?.totalBuildingFloors !== 0 &&
  //               step2CommercialSelected?.noFloorsOnProperty?.value?.length >
  //               0 &&
  //               step2CommercialSelected?.propertyArea?.plotArea?.length > 0) ||
  //             // Commercial Shop Property conditions
  //             (step1SelectedItem?.commercialPropType?.value == 'Shop' &&
  //               step1SelectedItem?.post?.value == 'sell') ||
  //             (step1RentSelectedItem?.commercialPropType?.value == 'Shop' &&
  //               step1SelectedItem?.post?.value == 'rent')
  //             ? step2CommercialSelected?.totalBuildingFloors !== 0 &&
  //             step2SelectedItem?.propertyFacing?.value?.length > 0 &&
  //             step2CommercialSelected?.noFloorsOnProperty?.value?.length > 0 &&
  //             step2CommercialSelected?.propertyArea?.plotArea?.length > 0
  //             : // Commercial Plot Property conditions
  //             step1RentSelectedItem?.commercialPropType?.value == 'Plot' &&
  //               step1SelectedItem?.post?.value == 'rent'
  //               ? step2SelectedItem?.propertyFacing?.value?.length > 0 &&
  //               step2CommercialSelected?.propertyArea?.plotArea?.length > 0
  //               : step2SelectedItem?.boundryWall?.value?.length > 0 &&
  //               step2SelectedItem?.propertyFacing?.value?.length > 0 &&
  //               step2CommercialSelected?.propertyArea?.plotArea?.length > 0
  //       ) {
  //         navigation.navigate('step3', {
  //           step2SelectedItem,
  //           propertyLocation,
  //           step1SelectedItem,
  //           step1RentSelectedItem,
  //           step2CommercialSelected,
  //           unit: {
  //             carpetStatus,
  //             carpetValue,
  //             buildStatus,
  //             buildValue,
  //             superStatus,
  //             superValue,
  //             plotStatus,
  //             plotValue,
  //           },
  //           PgStep1Item,
  //           PgStep2Item,
  //         });
  //       } else {
  //         common_fn.showToast('Please select all the required fields');
  //       }
  //     } else {
  //       common_fn.showToast('Please select all the required fields');
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const step2Data = (navigation) => {
    try {
      const isResidential =
        (step1SelectedItem?.kind?.value === 'residential' &&
          step1SelectedItem?.post?.value === 'sell') ||
        (step1RentSelectedItem?.kind?.value === 'residential' &&
          step1SelectedItem?.post?.value === 'rent');

      const isPlot =
        (step1SelectedItem?.type?.value === 'plot' &&
          step1SelectedItem?.post?.value === 'sell') ||
        (step1RentSelectedItem?.type?.value === 'plot' &&
          step1SelectedItem?.post?.value === 'rent');

      const isFlat =
        (step1SelectedItem?.type?.value === 'flat' &&
          step1SelectedItem?.post?.value === 'sell') ||
        (step1SelectedItem?.type?.value == 'house' &&
          step1SelectedItem?.post?.value == 'sell') ||
        (step1SelectedItem?.type?.value == 'house' &&
          step1SelectedItem?.post?.value == 'rent') ||
        (step1RentSelectedItem?.type?.value === 'flat' &&
          step1SelectedItem?.post?.value === 'rent');
      const isHOuseOrVilla =
        (step1SelectedItem?.type?.value == 'house' &&
          step1SelectedItem?.post?.value == 'sell') ||
        (step1SelectedItem?.type?.value == 'house' &&
          step1SelectedItem?.post?.value == 'rent') ||
        (step1SelectedItem?.type?.value == 'villa' &&
          step1SelectedItem?.post?.value == 'sell') ||
        (step1SelectedItem?.type?.value == 'villa' &&
          step1SelectedItem?.post?.value == 'rent')

      const isCommercialOffice =
        ((step1SelectedItem?.kind?.value === 'commercial' ||
          step1RentSelectedItem?.kind?.value === 'commercial') &&
          step1SelectedItem?.commercialPropType?.value === 'office' &&
          step1SelectedItem?.post?.value === 'sell') ||
        (step1RentSelectedItem?.commercialPropType?.value === 'office' &&
          step1SelectedItem?.post?.value === 'rent');

      const isCommercialShop =
        (step1SelectedItem?.commercialPropType?.value === 'shop' &&
          step1SelectedItem?.post?.value === 'sell') ||
        (step1RentSelectedItem?.commercialPropType?.value === 'shop' &&
          step1SelectedItem?.post?.value === 'rent');

      const isCommercialPlot =
        step1RentSelectedItem?.commercialPropType?.value === 'plot' &&
        step1SelectedItem?.post?.value === 'rent';

      const isOtherResidential =
        step1SelectedItem?.kind?.value === 'residential' &&
        step1SelectedItem?.post?.value !== 'sell' &&
        step1RentSelectedItem?.kind?.value === 'residential' &&
        step1SelectedItem?.post?.value !== 'rent';

      const ispg = step1SelectedItem?.post?.value === 'pg';
      if (
        (isPlot &&
          step2SelectedItem?.constructionDone?.value?.length > 0 &&
          step2SelectedItem?.propertyFacing?.value?.length > 0 &&
          step2SelectedItem?.boundryWall?.value?.length > 0 &&
          step2SelectedItem?.gatedColony?.value?.length > 0 &&
          step2SelectedItem?.propertyArea?.plotArea?.length > 0) ||
        (isFlat &&
          step2SelectedItem?.bedrooms?.value?.length > 0 &&
          step2SelectedItem?.bathrooms?.value?.length > 0 &&
          step2SelectedItem?.balconies?.value?.length > 0 &&
          carpetValue?.length > 0 &&
          superValue?.length > 0 &&
          parseInt(carpetValue) !== 0 &&
          parseInt(superValue) !== 0 &&
          parseInt(carpetValue) <= parseInt(superValue) &&
          step2SelectedItem?.totalBuildingFloors !== 0 &&
          step2SelectedItem?.noFloorsOnProperty?.value?.length > 0 &&
          step2SelectedItem?.availability?.value?.length > 0 &&
          (step2SelectedItem?.ageOfProperty?.value?.length > 0 ||
            step2SelectedItem?.completionTime?.value?.length > 0)) ||
        (isHOuseOrVilla &&
          step2SelectedItem?.bedrooms?.value?.length > 0 &&
          step2SelectedItem?.bathrooms?.value?.length > 0 &&
          step2SelectedItem?.balconies?.value?.length > 0 &&
          carpetValue?.length > 0 &&
          superValue?.length > 0 &&
          parseInt(carpetValue) !== 0 &&
          parseInt(superValue) !== 0 &&
          parseInt(carpetValue) <= parseInt(superValue) &&
          step2SelectedItem?.availability?.value?.length > 0 &&
          (step2SelectedItem?.ageOfProperty?.value?.length > 0 ||
            step2SelectedItem?.completionTime?.value?.length > 0)) ||
        (isOtherResidential &&
          step2SelectedItem?.bedrooms?.value?.length > 0 &&
          step2SelectedItem?.bathrooms?.value?.length > 0 &&
          step2SelectedItem?.balconies?.value?.length > 0 &&
          carpetValue?.length > 0 &&
          superValue?.length > 0 &&
          parseInt(carpetValue) !== 0 &&
          parseInt(superValue) !== 0 &&
          parseInt(carpetValue) <= parseInt(superValue) &&
          step2SelectedItem?.availability?.value?.length > 0 &&
          (step2SelectedItem?.ageOfProperty?.value?.length > 0 ||
            step2SelectedItem?.completionTime?.value?.length > 0)) ||
        (isCommercialOffice &&
          step2CommercialSelected?.washroom?.value !== 0 &&
          step2CommercialSelected?.noSeats?.length > 0 &&
          step2SelectedItem?.propertyFacing?.value?.length > 0 &&
          step2CommercialSelected?.totalBuildingFloors !== 0 &&
          step2CommercialSelected?.noFloorsOnProperty?.value?.length > 0 &&
          step2CommercialSelected?.propertyArea?.plotArea?.length > 0) ||
        (isCommercialShop &&
          step2CommercialSelected?.totalBuildingFloors !== 0 &&
          step2SelectedItem?.propertyFacing?.value?.length > 0 &&
          step2CommercialSelected?.noFloorsOnProperty?.value?.length > 0 &&
          step2CommercialSelected?.propertyArea?.plotArea?.length > 0) ||
        (isCommercialPlot &&
          step2SelectedItem?.propertyFacing?.value?.length > 0 &&
          step2CommercialSelected?.propertyArea?.plotArea?.length > 0) ||
        ispg &&
        PgStep2Item?.bedrooms?.length > 0 &&
        PgStep2Item?.no_single_rooms?.value?.length > 0 &&
        PgStep2Item?.room_facility?.length > 0 &&
        PgStep2Item?.gender?.value?.length > 0 &&
        PgStep2Item?.tententPreferences?.value?.length > 0 &&
        PgStep2Item?.pg_rules?.length > 0 &&
        PgStep2Item?.notice_period?.value?.length > 0 &&
        PgStep2Item?.gate_closing_time != null &&
        PgStep2Item?.service_avail?.length > 0 &&
        PgStep2Item?.food_provide?.length > 0 &&
        PgStep2Item?.veg_non_veg_food?.value?.length > 0 &&
        PgStep2Item?.food_charges?.value?.length > 0 &&
        PgStep2Item?.parking_avail?.value?.length > 0 &&
        (
          PgStep2Item?.monthly_rent?.single_bed?.length > 0 ||
          PgStep2Item?.monthly_rent?.double_bed?.length > 0 ||
          PgStep2Item?.monthly_rent?.triple_bed?.length > 0 ||
          PgStep2Item?.monthly_rent?.four_bed?.length > 0
        ) &&
        (
          PgStep2Item?.security_deposit?.single_bed?.length > 0 ||
          PgStep2Item?.security_deposit?.double_bed?.length > 0 ||
          PgStep2Item?.security_deposit?.triple_bed?.length > 0 ||
          PgStep2Item?.security_deposit?.four_bed?.length > 0
        )
      ) {
        navigation.navigate('step3', {
          step2SelectedItem,
          propertyLocation,
          step1SelectedItem,
          step1RentSelectedItem,
          step2CommercialSelected,
          unit: {
            carpetStatus,
            carpetValue,
            buildStatus,
            buildValue,
            superStatus,
            superValue,
            plotStatus,
            plotValue,
          },
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

  const [PlotSpec] = useState([
    { id: 1, label: 'basement', value: 'basement' },
    { id: 2, label: 'ground Floor', value: 'ground_floor' },
    { id: 3, label: '1', value: '1' },
    { id: 4, label: '2', value: '2' },
    { id: 5, label: '3', value: '3' },
    { id: 6, label: '4', value: '4' },
    { id: 7, label: '5', value: '5' },
    { id: 8, label: '6', value: '6' },
    { id: 9, label: '7', value: '7' },
    { id: 10, label: '8', value: '8' },
    { id: 11, label: '9', value: '9' },
    { id: 12, label: '10', value: '10' },
    { id: 13, label: '11', value: '11' },
    { id: 14, label: '12', value: '12' },
    { id: 15, label: '13', value: '13' },
    { id: 16, label: '14', value: '14' },
    { id: 17, label: '15', value: '15' },
  ]);
  const [LockYears] = useState([
    { id: 1, label: '1', value: '1' },
    { id: 2, label: '2', value: '2' },
    { id: 3, label: '3', value: '3' },
    { id: 4, label: '4', value: '4' },
    { id: 5, label: '5', value: '5' },
    { id: 6, label: '6', value: '6' },
    { id: 7, label: '7', value: '7' },
    { id: 8, label: '8', value: '8' },
    { id: 9, label: '9', value: '9' },
    { id: 10, label: '10', value: '10' },
    { id: 11, label: '11', value: '11' },
    { id: 12, label: '12', value: '12' },
    { id: 13, label: '13', value: '13' },
    { id: 14, label: '14', value: '14' },
    { id: 15, label: '15', value: '15' },
  ]);
  const [radioData] = useState([
    { id: 1, title: 'Yes', value: 'Yes' },
    { id: 2, title: 'No', value: 'No' },
  ]);
  const [parkingRadioData] = useState([
    { id: 1, title: 'Two Wheeler', value: 'two_wheeler' },
    { id: 2, title: 'Four Wheeler', value: 'four_wheeler' },
    { id: 3, title: 'Both', value: 'both' },
  ]);
  const [gender] = useState([
    { id: 1, title: 'Male', value: 'male' },
    { id: 2, title: 'Female', value: 'female' },
    { id: 3, title: 'Both', value: 'both' },
  ]);
  const [tententPreferences] = useState([
    { id: 1, title: 'Professionals', value: 'professionals' },
    { id: 2, title: 'Student', value: 'student' },
    { id: 3, title: 'Professional & Students', value: 'professional_&_students' },
  ]);
  const [PgRulesData] = useState([
    { id: 1, title: 'Veg Only', value: 'true' },
    { id: 2, title: 'No Smoking', value: 'true' },
    { id: 3, title: 'Drinking Alcohol Not Allowed', value: 'true' },
    {
      id: 4,
      title: 'Restrict of opposite gender',
      value: 'true',
    },
    { id: 5, title: 'Guardian not allowed', value: 'true' },
  ]);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [gateVisible, setGateVisible] = useState(false);
  const [vegNonVisible, setVegNonVisible] = useState(false);
  const [FoodVisible, setFoodVisible] = useState(false);
  const [cardHeight, setCardHeight] = useState(undefined);
  const [tenentChecked, setTenentChecked] = useState(false);
  const [foodChecked, setFoodChecked] = useState(false);
  const [noticePeriodData] = useState([
    { id: 1, label: '1 week', value: '1 week' },
    { id: 2, label: '15 days', value: '15 days' },
    { id: 3, label: '1 month', value: '1 month' },
    { id: 4, label: '2 month', value: '2 month' },
    { id: 5, label: '+2 month', value: '+2 month' },
  ]);
  const [gateClosingData] = useState([
    { id: 1, label: '7pm', value: '7pm' },
    { id: 2, label: '8pm', value: '8pm' },
    { id: 3, label: '8:30pm', value: '8:30pm' },
    { id: 4, label: '9pm', value: '9pm' },
    { id: 5, label: '10pm', value: '10pm' },
  ]);
  const [foodchargesData] = useState([
    { id: 1, label: 'Included in rent', value: 'included_in_rent' },
    { id: 2, label: 'Per meal basis', value: 'per_meal_basis' },
    { id: 3, label: 'Fixed monthly amount', value: 'fixed_monthly_amount' },
  ]);
  const [veg_non_vegData] = useState([
    { id: 1, label: 'Veg', value: 'veg' },
    { id: 2, label: 'Veg & Non-Veg', value: 'veg_&_non-veg' },
  ]);
  const [Approved_Authority] = useState([
    { id: 1, title: 'TNHB', value: 'tnhb' },
  ]);
  const [pantryData] = useState([
    { id: 1, title: 'Dry', value: 'dry' },
    { id: 2, title: 'Wet', value: 'wet' },
    { id: 3, title: 'Not Available', value: 'not_available' },
  ]);

  const isPlotSelected =
    // step1SelectedItem?.type?.value === 'Plot' ||
    // step1SelectedItem?.commercialPropType?.value === 'Plot';
    (step1SelectedItem?.kind?.value === 'residential' &&
      step1SelectedItem?.type?.value === 'plot') ||
    step1SelectedItem?.kind?.value === 'commercial' || step1SelectedItem?.post?.value == "pg";
  const isRentPlotSelected =
    // step1RentSelectedItem?.type?.value === 'Plot' ||
    // step1RentSelectedItem?.commercialPropType?.value === 'Plot';
    (step1RentSelectedItem?.kind?.value === 'residential' &&
      step1RentSelectedItem?.type?.value === 'plot') ||
    step1RentSelectedItem?.kind?.value === 'commercial' || step1SelectedItem?.post?.value == "pg";

  const stepCount = isPlotSelected || isRentPlotSelected ? 3 : 4;

  const Datalabels = isPlotSelected || isRentPlotSelected ? Plotlabels : labels;

  function handleBackButtonClick() {
    if (routeName.name == "step2") {
      navigation.goBack();
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  const hideDatePicker = () => {
    setGateVisible(false);
  };

  const handleConfirm = (date) => {
    setPgStep2Item({
      bedrooms: PgStep2Item?.bedrooms,
      no_single_rooms:
        PgStep2Item?.no_single_rooms,
      monthly_rent: {
        single_bed: PgStep2Item?.monthly_rent?.single_bed,
        double_bed: PgStep2Item?.monthly_rent?.double_bed,
        triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
        four_bed: PgStep2Item?.monthly_rent?.four_bed
      },
      security_deposit: {
        single_bed: PgStep2Item?.security_deposit?.single_bed,
        double_bed: PgStep2Item?.security_deposit?.double_bed,
        triple_bed: PgStep2Item?.security_deposit?.triple_bed,
        four_bed: PgStep2Item?.security_deposit?.four_bed
      },
      room_facility: PgStep2Item?.room_facility,
      gender: PgStep2Item?.gender,
      tententPreferences:
        PgStep2Item?.tententPreferences,
      pg_rules: PgStep2Item?.pg_rules,
      notice_period: PgStep2Item?.notice_period,
      gate_closing_time: date,
      service_avail: PgStep2Item?.service_avail,
      food_provide: PgStep2Item?.food_provide,
      veg_non_veg_food:
        PgStep2Item?.veg_non_veg_food,
      food_charges: PgStep2Item?.food_charges,
      parking_avail: PgStep2Item?.parking_avail
    });
    hideDatePicker();
  };

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
          STEP 2 OF {stepCount}
        </Text>
      </View>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={1}
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
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {step1SelectedItem?.post?.value == 'sell' ||
          step1SelectedItem?.post?.value == 'rent' ? (
          <View style={{ marginVertical: 10 }}>
            {(step1SelectedItem?.kind?.value == 'residential' &&
              step1SelectedItem?.post?.value == 'sell') ||
              (step1RentSelectedItem?.kind?.value == 'rResidential' &&
                step1SelectedItem?.post?.value == 'rent') ? (
              (step1SelectedItem?.type?.value == 'plot' &&
                step1SelectedItem?.post?.value == 'sell') ||
                (step1RentSelectedItem?.type?.value == 'plot' &&
                  step1SelectedItem?.post?.value == 'rent') ? (
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Property Features
                  </Text>
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Plot Specification{' '}
                      <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                        (Optional)
                      </Text>
                    </Text>
                    <View style={{ marginVertical: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          setPlotSpecVisible(true);
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
                          {common_fn.formatText(step2SelectedItem?.plotSpec?.plotAllowed?.value) ??
                            'Number Of Floors Allowed For Contruction'}
                        </Text>
                        <Icon name="caret-down" size={20} color={Color.black} />
                      </TouchableOpacity>
                      <Modal
                        transparent={true}
                        visible={PlotSpecVisible}
                        animationType="fade">
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: Color.transparantBlack,
                          }}>
                          <Pressable
                            style={{ flex: 1 }}
                            onPress={() => {
                              setPlotSpecVisible(false);
                            }}
                          />
                          <View
                            style={{
                              backgroundColor: Color.white,
                              flex: 1,
                              padding: 10,
                              borderTopRightRadius: 30,
                              borderTopLeftRadius: 30,
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: Color.cloudyGrey,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              Select Number Of Floors Allowed For Contruction
                            </Text>
                            <Divider style={styles.Divider} />
                            <View
                              style={{
                                marginHorizontal: 20,
                              }}>
                              <ScrollView showsVerticalScrollIndicator={false}>
                                {PlotSpec.map((item, index) => {
                                  return (
                                    <TouchableOpacity
                                      key={index}
                                      onPress={() => {
                                        setStep2SelectedItem({
                                          bedrooms: step2SelectedItem.bedrooms,
                                          bathrooms:
                                            step2SelectedItem.bathrooms,
                                          balconies:
                                            step2SelectedItem.balconies,
                                          totalBuildingFloors:
                                            step2SelectedItem.totalBuildingFloors,
                                          noFloorsOnProperty:
                                            step2SelectedItem.noFloorsOnProperty,
                                          furnishingDeatils:
                                            step2SelectedItem.furnishingDeatils,
                                          otherRooms:
                                            step2SelectedItem.otherRooms,
                                          availability:
                                            step2SelectedItem.availability,
                                          ageOfProperty:
                                            step2SelectedItem.ageOfProperty,
                                          completionTime:
                                            step2SelectedItem.completionTime,
                                          plotSpec: {
                                            plotAllowed: item,
                                            noOfopenSide:
                                              step2SelectedItem?.plotSpec
                                                ?.noOfopenSide,
                                          },
                                          plotFacing:
                                            step2SelectedItem?.plotFacing,
                                          constructionDone:
                                            step2SelectedItem?.constructionDone,
                                          boundryWall:
                                            step2SelectedItem?.boundryWall,
                                          gatedColony:
                                            step2SelectedItem?.gatedColony,
                                          propertyArea: {
                                            plotArea:
                                              step2SelectedItem?.propertyArea
                                                ?.plotArea,
                                            plotlength:
                                              step2SelectedItem?.propertyArea
                                                ?.plotlength,
                                            plotBreath:
                                              step2SelectedItem?.propertyArea
                                                ?.plotBreath,
                                          },
                                          ApprovalAuthority:
                                            step2SelectedItem?.ApprovalAuthority,
                                          propertyFacing:
                                            step2SelectedItem?.propertyFacing,
                                        });
                                        setPlotSpecVisible(false);
                                      }}>
                                      <View style={{ alignItems: 'center' }}>
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
                      <TouchableOpacity
                        onPress={() => {
                          setNOPlotSidesVisible(true);
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
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            color: Color.cloudyGrey,
                            flex: 1,
                            fontFamily: Poppins.SemiBold,
                            fontSize: 14,
                            textTransform: 'capitalize',
                          }}>
                          {common_fn.formatText(step2SelectedItem?.plotSpec?.noOfopenSide?.value) ??
                            'Number Of Open Sides'}
                        </Text>
                        <Icon name="caret-down" size={20} color={Color.black} />
                      </TouchableOpacity>
                      <Modal
                        transparent={true}
                        visible={NOPlotSidesVisible}
                        animationType="fade">
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: Color.transparantBlack,
                          }}>
                          <Pressable
                            style={{ flex: 1 }}
                            onPress={() => {
                              setNOPlotSidesVisible(false);
                            }}
                          />
                          <View
                            style={{
                              backgroundColor: Color.white,
                              flex: 1,
                              padding: 10,
                              borderTopRightRadius: 30,
                              borderTopLeftRadius: 30,
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: Color.cloudyGrey,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              Select Number Of Floors Allowed For Contruction
                            </Text>
                            <Divider style={styles.Divider} />
                            <View
                              style={{
                                marginHorizontal: 20,
                              }}>
                              <ScrollView showsVerticalScrollIndicator={false}>
                                {PlotSpec.map((item, index) => {
                                  return (
                                    <TouchableOpacity
                                      key={index}
                                      onPress={() => {
                                        setStep2SelectedItem({
                                          bedrooms: step2SelectedItem.bedrooms,
                                          bathrooms:
                                            step2SelectedItem.bathrooms,
                                          balconies:
                                            step2SelectedItem.balconies,
                                          totalBuildingFloors:
                                            step2SelectedItem.totalBuildingFloors,
                                          noFloorsOnProperty:
                                            step2SelectedItem.noFloorsOnProperty,
                                          furnishingDeatils:
                                            step2SelectedItem.furnishingDeatils,
                                          otherRooms:
                                            step2SelectedItem.otherRooms,
                                          availability:
                                            step2SelectedItem.availability,
                                          ageOfProperty:
                                            step2SelectedItem.ageOfProperty,
                                          completionTime:
                                            step2SelectedItem.completionTime,
                                          plotSpec: {
                                            plotAllowed:
                                              step2SelectedItem?.plotSpec
                                                ?.plotAllowed,
                                            noOfopenSide: item,
                                          },
                                          plotFacing:
                                            step2SelectedItem?.plotFacing,
                                          constructionDone:
                                            step2SelectedItem?.constructionDone,
                                          boundryWall:
                                            step2SelectedItem?.boundryWall,
                                          gatedColony:
                                            step2SelectedItem?.gatedColony,
                                          propertyArea: {
                                            plotArea:
                                              step2SelectedItem?.propertyArea
                                                ?.plotArea,
                                            plotlength:
                                              step2SelectedItem?.propertyArea
                                                ?.plotlength,
                                            plotBreath:
                                              step2SelectedItem?.propertyArea
                                                ?.plotBreath,
                                          },
                                          ApprovalAuthority:
                                            step2SelectedItem?.ApprovalAuthority,
                                          propertyFacing:
                                            step2SelectedItem?.propertyFacing,
                                        });
                                        setNOPlotSidesVisible(false);
                                      }}>
                                      <View style={{ alignItems: 'center' }}>
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
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Property facing
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
                        {PropertyFacing.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{
                                backgroundColor:
                                  step2SelectedItem?.propertyFacing?.id ==
                                    item?.id
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
                                  step2SelectedItem?.propertyFacing?.id ==
                                    item?.id
                                    ? Color.primary
                                    : Color.lightgrey,
                                borderWidth: 1,
                                flexDirection: 'row',
                              }}
                              onPress={() => {
                                setStep2SelectedItem({
                                  bedrooms: step2SelectedItem.bedrooms,
                                  bathrooms: step2SelectedItem.bathrooms,
                                  balconies: step2SelectedItem.balconies,
                                  totalBuildingFloors:
                                    step2SelectedItem.totalBuildingFloors,
                                  noFloorsOnProperty:
                                    step2SelectedItem.noFloorsOnProperty,
                                  furnishingDeatils:
                                    step2SelectedItem.furnishingDeatils,
                                  otherRooms: step2SelectedItem.otherRooms,
                                  availability: step2SelectedItem.availability,
                                  ageOfProperty:
                                    step2SelectedItem.ageOfProperty,
                                  completionTime:
                                    step2SelectedItem.completionTime,
                                  plotSpec: {
                                    plotAllowed:
                                      step2SelectedItem?.plotSpec?.plotAllowed,
                                    noOfopenSide:
                                      step2SelectedItem?.plotSpec?.noOfopenSide,
                                  },
                                  plotFacing: step2SelectedItem?.plotFacing,
                                  constructionDone:
                                    step2SelectedItem?.constructionDone,
                                  boundryWall: step2SelectedItem?.boundryWall,
                                  gatedColony: step2SelectedItem?.gatedColony,
                                  propertyArea: {
                                    plotArea:
                                      step2SelectedItem?.propertyArea?.plotArea,
                                    plotlength:
                                      step2SelectedItem?.propertyArea
                                        ?.plotlength,
                                    plotBreath:
                                      step2SelectedItem?.propertyArea
                                        ?.plotBreath,
                                  },
                                  ApprovalAuthority:
                                    step2SelectedItem?.ApprovalAuthority,
                                  propertyFacing: item,
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
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Width of Road Facing the Plot{' '}
                      <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                        (Optional)
                      </Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput
                        placeholder="Road Width"
                        placeholderTextColor={Color.cloudyGrey}
                        value={step2SelectedItem?.plotFacing}
                        onChangeText={text => {
                          setStep2SelectedItem({
                            bedrooms: step2SelectedItem.bedrooms,
                            bathrooms: step2SelectedItem.bathrooms,
                            balconies: step2SelectedItem.balconies,
                            totalBuildingFloors:
                              step2SelectedItem.totalBuildingFloors,
                            noFloorsOnProperty:
                              step2SelectedItem.noFloorsOnProperty,
                            furnishingDeatils:
                              step2SelectedItem.furnishingDeatils,
                            otherRooms: step2SelectedItem.otherRooms,
                            availability: step2SelectedItem.availability,
                            ageOfProperty: step2SelectedItem.ageOfProperty,
                            completionTime: step2SelectedItem.completionTime,
                            plotSpec: {
                              plotAllowed:
                                step2SelectedItem?.plotSpec?.plotAllowed,
                              noOfopenSide:
                                step2SelectedItem?.plotSpec?.noOfopenSide,
                            },
                            plotFacing: text,
                            constructionDone:
                              step2SelectedItem?.constructionDone,
                            boundryWall: step2SelectedItem?.boundryWall,
                            gatedColony: step2SelectedItem?.gatedColony,
                            propertyArea: {
                              plotArea:
                                step2SelectedItem?.propertyArea?.plotArea,
                              plotlength:
                                step2SelectedItem?.propertyArea?.plotlength,
                              plotBreath:
                                step2SelectedItem?.propertyArea?.plotBreath,
                            },
                            ApprovalAuthority:
                              step2SelectedItem?.ApprovalAuthority,
                            propertyFacing: step2SelectedItem?.propertyFacing,
                          });
                        }}
                        style={{
                          flex: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: Color.black,
                          color: Color.black,
                          width: '70%',
                        }}
                      />
                      <Text
                        style={{
                          color: Color.black,
                          fontSize: 16,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Meters
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Any Contruction Done
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
                            setStep2SelectedItem({
                              bedrooms: step2SelectedItem.bedrooms,
                              bathrooms: step2SelectedItem.bathrooms,
                              balconies: step2SelectedItem.balconies,
                              totalBuildingFloors:
                                step2SelectedItem.totalBuildingFloors,
                              noFloorsOnProperty:
                                step2SelectedItem.noFloorsOnProperty,
                              furnishingDeatils:
                                step2SelectedItem.furnishingDeatils,
                              otherRooms: step2SelectedItem.otherRooms,
                              availability: step2SelectedItem.availability,
                              ageOfProperty: step2SelectedItem.ageOfProperty,
                              completionTime: step2SelectedItem.completionTime,
                              plotSpec: {
                                plotAllowed:
                                  step2SelectedItem?.plotSpec?.plotAllowed,
                                noOfopenSide:
                                  step2SelectedItem?.plotSpec?.noOfopenSide,
                              },
                              plotFacing: step2SelectedItem?.plotFacing,
                              constructionDone: item,
                              boundryWall: step2SelectedItem?.boundryWall,
                              gatedColony: step2SelectedItem?.gatedColony,
                              propertyArea: {
                                plotArea:
                                  step2SelectedItem?.propertyArea?.plotArea,
                                plotlength:
                                  step2SelectedItem?.propertyArea?.plotlength,
                                plotBreath:
                                  step2SelectedItem?.propertyArea?.plotBreath,
                              },
                              ApprovalAuthority:
                                step2SelectedItem?.ApprovalAuthority,
                              propertyFacing: step2SelectedItem?.propertyFacing,
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
                              step2SelectedItem.constructionDone?.id === item.id
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            size={20}
                            color={
                              step2SelectedItem.constructionDone?.id === item.id
                                ? Color.primary
                                : Color.black
                            }
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Boundry Wall Made
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
                            setStep2SelectedItem({
                              bedrooms: step2SelectedItem.bedrooms,
                              bathrooms: step2SelectedItem.bathrooms,
                              balconies: step2SelectedItem.balconies,
                              totalBuildingFloors:
                                step2SelectedItem.totalBuildingFloors,
                              noFloorsOnProperty:
                                step2SelectedItem.noFloorsOnProperty,
                              furnishingDeatils:
                                step2SelectedItem.furnishingDeatils,
                              otherRooms: step2SelectedItem.otherRooms,
                              availability: step2SelectedItem.availability,
                              ageOfProperty: step2SelectedItem.ageOfProperty,
                              completionTime: step2SelectedItem.completionTime,
                              plotSpec: {
                                plotAllowed:
                                  step2SelectedItem?.plotSpec?.plotAllowed,
                                noOfopenSide:
                                  step2SelectedItem?.plotSpec?.noOfopenSide,
                              },
                              plotFacing: step2SelectedItem?.plotFacing,
                              constructionDone:
                                step2SelectedItem?.constructionDone,
                              boundryWall: item,
                              gatedColony: step2SelectedItem?.gatedColony,
                              propertyArea: {
                                plotArea:
                                  step2SelectedItem?.propertyArea?.plotArea,
                                plotlength:
                                  step2SelectedItem?.propertyArea?.plotlength,
                                plotBreath:
                                  step2SelectedItem?.propertyArea?.plotBreath,
                              },
                              ApprovalAuthority:
                                step2SelectedItem?.ApprovalAuthority,
                              propertyFacing: step2SelectedItem?.propertyFacing,
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
                              step2SelectedItem?.boundryWall?.id === item?.id
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            size={20}
                            color={
                              step2SelectedItem?.boundryWall?.id === item?.id
                                ? Color.primary
                                : Color.black
                            }
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Is In a gated Colony
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
                            setStep2SelectedItem({
                              bedrooms: step2SelectedItem.bedrooms,
                              bathrooms: step2SelectedItem.bathrooms,
                              balconies: step2SelectedItem.balconies,
                              totalBuildingFloors:
                                step2SelectedItem.totalBuildingFloors,
                              noFloorsOnProperty:
                                step2SelectedItem.noFloorsOnProperty,
                              furnishingDeatils:
                                step2SelectedItem.furnishingDeatils,
                              otherRooms: step2SelectedItem.otherRooms,
                              availability: step2SelectedItem.availability,
                              ageOfProperty: step2SelectedItem.ageOfProperty,
                              completionTime: step2SelectedItem.completionTime,
                              plotSpec: {
                                plotAllowed:
                                  step2SelectedItem?.plotSpec?.plotAllowed,
                                noOfopenSide:
                                  step2SelectedItem?.plotSpec?.noOfopenSide,
                              },
                              plotFacing: step2SelectedItem?.plotFacing,
                              constructionDone:
                                step2SelectedItem?.constructionDone,
                              boundryWall: step2SelectedItem?.boundryWall,
                              gatedColony: item,
                              propertyArea: {
                                plotArea:
                                  step2SelectedItem?.propertyArea?.plotArea,
                                plotlength:
                                  step2SelectedItem?.propertyArea?.plotlength,
                                plotBreath:
                                  step2SelectedItem?.propertyArea?.plotBreath,
                              },
                              ApprovalAuthority:
                                step2SelectedItem?.ApprovalAuthority,
                              propertyFacing: step2SelectedItem?.propertyFacing,
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
                              step2SelectedItem?.gatedColony?.id === item?.id
                                ? 'radio-button-on'
                                : 'radio-button-off'
                            }
                            size={20}
                            color={
                              step2SelectedItem?.gatedColony?.id === item?.id
                                ? Color.primary
                                : Color.black
                            }
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Property Area
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput
                        value={step2SelectedItem?.propertyArea?.plotArea}
                        placeholder="Plot Area"
                        placeholderTextColor={Color.cloudyGrey}
                        keyboardType="number-pad"
                        onChangeText={text => {
                          setStep2SelectedItem({
                            bedrooms: step2SelectedItem.bedrooms,
                            bathrooms: step2SelectedItem.bathrooms,
                            balconies: step2SelectedItem.balconies,
                            totalBuildingFloors:
                              step2SelectedItem.totalBuildingFloors,
                            noFloorsOnProperty:
                              step2SelectedItem.noFloorsOnProperty,
                            furnishingDeatils:
                              step2SelectedItem.furnishingDeatils,
                            otherRooms: step2SelectedItem.otherRooms,
                            availability: step2SelectedItem.availability,
                            ageOfProperty: step2SelectedItem.ageOfProperty,
                            completionTime: step2SelectedItem.completionTime,
                            plotSpec: {
                              plotAllowed:
                                step2SelectedItem?.plotSpec?.plotAllowed,
                              noOfopenSide:
                                step2SelectedItem?.plotSpec?.noOfopenSide,
                            },
                            plotFacing: step2SelectedItem?.plotFacing,
                            constructionDone: step2SelectedItem?.completionTime,
                            boundryWall: step2SelectedItem?.boundryWall,
                            gatedColony: step2SelectedItem?.gatedColony,
                            propertyArea: {
                              plotArea: text,
                              plotlength:
                                step2SelectedItem?.propertyArea?.plotlength,
                              plotBreath:
                                step2SelectedItem?.propertyArea?.plotBreath,
                            },
                            ApprovalAuthority:
                              step2SelectedItem?.ApprovalAuthority,
                            propertyFacing: step2SelectedItem?.propertyFacing,
                          });
                        }}
                        style={{
                          flex: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: Color.black,
                          color: Color.black,
                          fontSize: 16,
                          fontFamily: Poppins.Medium,
                        }}
                      />
                      <Dropdown
                        style={{
                          padding: 5,
                          borderRadius: 5,
                          width: 100,
                          position: 'absolute',
                          right: 0,
                        }}
                        placeholderStyle={{
                          fontSize: 16,
                          color: Color.black,
                          marginHorizontal: 10,
                        }}
                        selectedTextStyle={{
                          fontSize: 16,
                          color: Color.black,
                        }}
                        iconStyle={{ width: 20, height: 20 }}
                        itemTextStyle={{
                          fontSize: 16,
                          color: Color.cloudyGrey,
                        }}
                        data={plotAreaunit}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select"
                        searchPlaceholder="Search..."
                        value={plotStatus}
                        onChange={item => {
                          setPlotStatus(item);
                        }}
                        renderRightIcon={() => (
                          <Icon
                            style={{ width: 20, height: 20 }}
                            color={Color.black}
                            name="chevron-down"
                            size={20}
                          />
                        )}
                      />
                    </View>
                    <TextInput
                      value={step2SelectedItem?.propertyArea?.plotlength}
                      placeholder="Plot Length In Yrd(Optional)"
                      placeholderTextColor={Color.cloudyGrey}
                      keyboardType="number-pad"
                      onChangeText={text => {
                        setStep2SelectedItem({
                          bedrooms: step2SelectedItem.bedrooms,
                          bathrooms: step2SelectedItem.bathrooms,
                          balconies: step2SelectedItem.balconies,
                          totalBuildingFloors:
                            step2SelectedItem.totalBuildingFloors,
                          noFloorsOnProperty:
                            step2SelectedItem.noFloorsOnProperty,
                          furnishingDeatils:
                            step2SelectedItem.furnishingDeatils,
                          otherRooms: step2SelectedItem.otherRooms,
                          availability: step2SelectedItem.availability,
                          ageOfProperty: step2SelectedItem.ageOfProperty,
                          completionTime: step2SelectedItem.completionTime,
                          plotSpec: {
                            plotAllowed:
                              step2SelectedItem?.plotSpec?.plotAllowed,
                            noOfopenSide:
                              step2SelectedItem?.plotSpec?.noOfopenSide,
                          },
                          plotFacing: step2SelectedItem?.plotFacing,
                          constructionDone: step2SelectedItem?.completionTime,
                          boundryWall: step2SelectedItem?.boundryWall,
                          gatedColony: step2SelectedItem?.gatedColony,
                          propertyArea: {
                            plotArea: step2SelectedItem?.propertyArea?.plotArea,
                            plotlength: text,
                            plotBreath:
                              step2SelectedItem?.propertyArea?.plotBreath,
                          },
                          ApprovalAuthority:
                            step2SelectedItem?.ApprovalAuthority,
                          propertyFacing: step2SelectedItem?.propertyFacing,
                        });
                      }}
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Color.black,
                        color: Color.black,
                        fontSize: 16,
                        fontFamily: Poppins.Medium,
                      }}
                    />
                    <TextInput
                      value={step2SelectedItem?.propertyArea?.plotBreath}
                      placeholder="Plot Breath In Yrd(Optional)"
                      placeholderTextColor={Color.cloudyGrey}
                      keyboardType="number-pad"
                      onChangeText={text => {
                        setStep2SelectedItem({
                          bedrooms: step2SelectedItem.bedrooms,
                          bathrooms: step2SelectedItem.bathrooms,
                          balconies: step2SelectedItem.balconies,
                          totalBuildingFloors:
                            step2SelectedItem.totalBuildingFloors,
                          noFloorsOnProperty:
                            step2SelectedItem.noFloorsOnProperty,
                          furnishingDeatils:
                            step2SelectedItem.furnishingDeatils,
                          otherRooms: step2SelectedItem.otherRooms,
                          availability: step2SelectedItem.availability,
                          ageOfProperty: step2SelectedItem.ageOfProperty,
                          completionTime: step2SelectedItem.completionTime,
                          plotSpec: {
                            plotAllowed:
                              step2SelectedItem?.plotSpec?.plotAllowed,
                            noOfopenSide:
                              step2SelectedItem?.plotSpec?.noOfopenSide,
                          },
                          plotFacing: step2SelectedItem?.plotFacing,
                          constructionDone: step2SelectedItem?.completionTime,
                          boundryWall: step2SelectedItem?.boundryWall,
                          gatedColony: step2SelectedItem?.gatedColony,
                          propertyArea: {
                            plotArea: step2SelectedItem?.propertyArea?.plotArea,
                            plotlength:
                              step2SelectedItem?.propertyArea?.plotlength,
                            plotBreath: text,
                          },
                          ApprovalAuthority:
                            step2SelectedItem?.ApprovalAuthority,
                          propertyFacing: step2SelectedItem?.propertyFacing,
                        });
                      }}
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Color.black,
                        color: Color.black,
                        fontSize: 16,
                        fontFamily: Poppins.Medium,
                      }}
                    />
                  </View>
                  {/* <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Approval Authority
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
                    {Approved_Authority?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          style={{
                            backgroundColor:
                              step2SelectedItem?.ApprovalAuthority?.id ===
                                item?.id
                                ? Color.primary
                                : Color.white,
                            borderRadius: 50,
                            marginVertical: 10,
                            padding: 10,
                            marginHorizontal: 5,
                            borderColor: Color.lightgrey,
                            borderWidth: 1,
                            width: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => {
                            step2SelectedItem?.ApprovalAuthority?.id == item?.id
                              ? setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty:
                                  step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step1SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea
                                      ?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea
                                      ?.plotBreath,
                                },
                                ApprovalAuthority: null,
                                propertyFacing:
                                  step2SelectedItem?.propertyFacing,
                              })
                              : setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty:
                                  step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step1SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea
                                      ?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea
                                      ?.plotBreath,
                                },
                                ApprovalAuthority: item,
                                propertyFacing:
                                  step2SelectedItem?.propertyFacing,
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
                                color:
                                  step2SelectedItem?.ApprovalAuthority?.id ===
                                    item?.id
                                    ? Color.white
                                    : Color.black,
                                fontWeight: 'bold',
                                marginHorizontal: 10,
                              }}>
                              TNHB
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View> */}
                </View>
              ) : (
                <>
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property Features
                    </Text>
                    {/* <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontWeight: 'bold',
                      }}>
                      Area, Furnishings and Room details
                    </Text> */}
                  </View>
                  <View style={{ marginVertical: 0 }}>
                    {/* <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Room details
                    </Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Bedrooms
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

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {bedrooms.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2SelectedItem?.bedrooms?.id == item?.id
                                  ? '#8C193F20'
                                  : Color.white,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginHorizontal: 5,
                              borderRadius: 50,
                              width: 45,
                              height: 45,
                              marginVertical: 10,
                              borderColor:
                                step2SelectedItem?.bedrooms?.id == item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              setStep2SelectedItem({
                                bedrooms: item,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing:
                                  step2SelectedItem?.propertyFacing,
                              });
                              if (
                                step2SelectedItem?.bedrooms?.value?.length == 0
                              ) {
                                var msg = 'Please Select Bedrooms';
                                setBedroomsError(msg);
                                return;
                              } else {
                                setBedroomsError(false);
                              }
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color:
                                  step2SelectedItem?.bedrooms?.id == item?.id
                                    ? Color.primary
                                    : Color.black,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {bedroomsError}
                    </Text>
                  </View>

                  <View style={{ marginVertical: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Balconies
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

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {balconies.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2SelectedItem?.balconies?.id == item?.id
                                  ? '#8C193F20'
                                  : Color.white,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginHorizontal: 5,
                              borderRadius: 50,
                              width: item?.title?.length > 6 ? 100 : 45,
                              height: 45,
                              marginVertical: 10,
                              borderColor:
                                step2SelectedItem?.balconies?.id == item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: item,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing:
                                  step2SelectedItem?.propertyFacing,
                              });
                              if (
                                step2SelectedItem?.balconies?.value?.length == 0
                              ) {
                                var msg = 'Please Select balconies';
                                setBalconiesError(msg);
                                return;
                              } else {
                                setBalconiesError(false);
                              }
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color:
                                  step2SelectedItem?.balconies?.id == item?.id
                                    ? Color.primary
                                    : Color.black,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {balconiesError}
                    </Text>
                  </View>
                  <View style={{ marginVertical: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Bathrooms
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

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {bathrooms.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2SelectedItem?.bathrooms?.id == item?.id
                                  ? '#8C193F20'
                                  : Color.white,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginHorizontal: 5,
                              borderRadius: 50,
                              width: 45,
                              height: 45,
                              marginVertical: 10,
                              borderColor:
                                step2SelectedItem?.bathrooms?.id == item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: item,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,

                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing:
                                  step2SelectedItem?.propertyFacing,
                              });
                              if (
                                step2SelectedItem?.bathrooms?.value?.length == 0
                              ) {
                                var msg = 'Please Select Bathrooms';
                                setBathroomsError(msg);
                                return;
                              } else {
                                setBathroomsError(false);
                              }
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color:
                                  step2SelectedItem?.bathrooms?.id == item?.id
                                    ? Color.primary
                                    : Color.black,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {bathroomsError}
                    </Text>
                  </View>

                  {(step1SelectedItem?.type?.value == 'flat' &&
                    step1SelectedItem?.post?.value == 'sell') ||
                    (step1RentSelectedItem?.type?.value == 'flat' &&
                      step1SelectedItem?.post?.value == 'rent') ? (
                    <View style={{ marginVertical: 0 }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontWeight: 'bold',
                          }}>
                          Floor Details
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
                          color: Color.cloudyGrey,
                          fontWeight: 'bold',
                          marginVertical: 10,
                        }}>
                        Total No. of Floors
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 10,
                        }}>
                        <TouchableOpacity
                          style={{
                            width: 40,
                            height: 40,
                            borderWidth: 1,
                            borderColor: Color.lightgrey,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          disabled={step2SelectedItem?.totalBuildingFloors == 0}
                          onPress={() => {
                            setStep2SelectedItem({
                              bedrooms: step2SelectedItem.bedrooms,
                              bathrooms: step2SelectedItem.bathrooms,
                              balconies: step2SelectedItem.balconies,
                              totalBuildingFloors:
                                step2SelectedItem.totalBuildingFloors - 1,
                              noFloorsOnProperty:
                                step2SelectedItem?.noFloorsOnProperty,
                              furnishingDeatils:
                                step2SelectedItem.furnishingDeatils,
                              otherRooms: step2SelectedItem.otherRooms,
                              availability: step2SelectedItem.availability,
                              ageOfProperty: step2SelectedItem.ageOfProperty,
                              completionTime: step2SelectedItem.completionTime,
                              plotSpec: {
                                plotAllowed:
                                  step2SelectedItem?.plotSpec?.plotAllowed,
                                noOfopenSide:
                                  step2SelectedItem?.plotSpec?.noOfopenSide,
                              },
                              plotFacing: step2SelectedItem?.plotFacing,
                              constructionDone:
                                step2SelectedItem?.constructionDone,
                              boundryWall: step2SelectedItem?.boundryWall,
                              gatedColony: step2SelectedItem?.gatedColony,
                              propertyArea: {
                                plotArea:
                                  step2SelectedItem?.propertyArea?.plotArea,
                                plotlength:
                                  step2SelectedItem?.propertyArea?.plotlength,
                                plotBreath:
                                  step2SelectedItem?.propertyArea?.plotBreath,
                              },
                              ApprovalAuthority:
                                step2SelectedItem?.ApprovalAuthority,
                              propertyFacing: step2SelectedItem?.propertyFacing,
                            });
                            if (step2SelectedItem?.totalBuildingFloors == 1) {
                              var msg = 'Please select your floor type';
                              setTotalBuildingFloorsError(msg);
                              return;
                            } else {
                              setTotalBuildingFloorsError(false);
                            }
                          }}>
                          <FIcon
                            name="minus"
                            size={18}
                            color={Color.cloudyGrey}
                          />
                        </TouchableOpacity>
                        <View
                          style={{
                            width: 60,
                            height: 40,
                            borderWidth: 1,
                            borderColor: Color.lightgrey,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 10,
                            borderRadius: 5,
                            display: "flex"
                          }}>
                          <TextInput
                            value={step2SelectedItem.totalBuildingFloors.toString()}
                            placeholderTextColor={Color.cloudyGrey}
                            style={{ color: Color.black, textAlign: 'center', alignItems: "center", justifyContent: "center" }}
                            keyboardType="number-pad"
                            onChangeText={text => {
                              setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors: text,
                                noFloorsOnProperty:
                                  step2SelectedItem?.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing:
                                  step2SelectedItem?.propertyFacing,
                              });
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          style={{
                            width: 40,
                            height: 40,
                            borderWidth: 1,
                            borderColor: Color.lightgrey,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => {
                            setStep2SelectedItem({
                              bedrooms: step2SelectedItem.bedrooms,
                              bathrooms: step2SelectedItem.bathrooms,
                              balconies: step2SelectedItem.balconies,
                              totalBuildingFloors:
                                step2SelectedItem.totalBuildingFloors + 1,
                              noFloorsOnProperty:
                                step2SelectedItem?.noFloorsOnProperty,
                              furnishingDeatils:
                                step2SelectedItem.furnishingDeatils,
                              otherRooms: step2SelectedItem.otherRooms,
                              availability: step2SelectedItem.availability,
                              ageOfProperty: step2SelectedItem.ageOfProperty,
                              completionTime: step2SelectedItem.completionTime,
                              plotSpec: {
                                plotAllowed:
                                  step2SelectedItem?.plotSpec?.plotAllowed,
                                noOfopenSide:
                                  step2SelectedItem?.plotSpec?.noOfopenSide,
                              },
                              plotFacing: step2SelectedItem?.plotFacing,
                              constructionDone:
                                step2SelectedItem?.constructionDone,
                              boundryWall: step2SelectedItem?.boundryWall,
                              gatedColony: step2SelectedItem?.gatedColony,
                              propertyArea: {
                                plotArea:
                                  step2SelectedItem?.propertyArea?.plotArea,
                                plotlength:
                                  step2SelectedItem?.propertyArea?.plotlength,
                                plotBreath:
                                  step2SelectedItem?.propertyArea?.plotBreath,
                              },
                              ApprovalAuthority:
                                step2SelectedItem?.ApprovalAuthority,
                              propertyFacing: step2SelectedItem?.propertyFacing,
                            });
                            if (step2SelectedItem?.totalBuildingFloors < 0) {
                              var msg = 'Please select building floors';
                              setTotalBuildingFloorsError(msg);
                              return;
                            } else {
                              setTotalBuildingFloorsError(false);
                            }
                          }}>
                          <FIcon
                            name="plus"
                            size={18}
                            color={Color.cloudyGrey}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                          color: Color.red,
                        }}>
                        {totalBuildingFloorsError}
                      </Text>

                      <View style={{ marginVertical: 5 }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.cloudyGrey,
                            fontWeight: 'bold',
                          }}>
                          Flat Floor No
                        </Text>

                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <TouchableOpacity
                            onPress={() => {
                              setFloorVisible(true);
                            }}
                            style={{
                              backgroundColor: Color.white,
                              borderColor: Color.cloudyGrey,
                              borderWidth: 1,
                              padding: 10,
                              borderRadius: 5,
                              // height: 40,
                              width: '100%',
                              marginVertical: 10,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {step2SelectedItem?.noFloorsOnProperty != '' ? (
                              <Text
                                style={{
                                  color: Color.cloudyGrey,
                                  flex: 1,
                                  fontFamily: Poppins.SemiBold,
                                  fontSize: 14,
                                  textTransform: 'capitalize',
                                }}>
                                {step2SelectedItem?.noFloorsOnProperty?.label ??
                                  'Select Your Floor'}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  color: Color.cloudyGrey,
                                  flex: 1,
                                  fontFamily: Poppins.SemiBold,
                                  fontSize: 18,
                                }}>
                                {'Select'}
                              </Text>
                            )}
                            <Icon
                              name="caret-down"
                              size={20}
                              color={Color.black}
                            />
                          </TouchableOpacity>
                          <Modal
                            transparent={true}
                            visible={floorVisible}
                            animationType="fade">
                            <View
                              style={{
                                flex: 1,
                                backgroundColor: Color.transparantBlack,
                              }}>
                              <Pressable
                                style={{ flex: 1 }}
                                onPress={() => {
                                  setFloorVisible(false);
                                }}
                              />
                              <View
                                style={{
                                  backgroundColor: Color.white,
                                  flex: 1,
                                  padding: 10,
                                  borderTopRightRadius: 30,
                                  borderTopLeftRadius: 30,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.black,
                                    fontWeight: 'bold',
                                    marginVertical: 10,
                                  }}>
                                  Select Your Floors
                                </Text>
                                <Divider style={styles.Divider} />
                                <View
                                  style={{
                                    marginHorizontal: 20,
                                  }}>
                                  <ScrollView
                                    showsVerticalScrollIndicator={false}>
                                    {filteredFloors.map((item, index) => {
                                      return (
                                        <TouchableOpacity
                                          key={index}
                                          onPress={() => {
                                            setStep2SelectedItem({
                                              bedrooms:
                                                step2SelectedItem.bedrooms,
                                              bathrooms:
                                                step2SelectedItem.bathrooms,
                                              balconies:
                                                step2SelectedItem.balconies,
                                              totalBuildingFloors:
                                                step2SelectedItem.totalBuildingFloors,
                                              noFloorsOnProperty: item,
                                              furnishingDeatils:
                                                step2SelectedItem.furnishingDeatils,
                                              otherRooms:
                                                step2SelectedItem.otherRooms,
                                              availability:
                                                step2SelectedItem.availability,
                                              ageOfProperty:
                                                step2SelectedItem.ageOfProperty,
                                              completionTime:
                                                step2SelectedItem.completionTime,
                                              plotSpec: {
                                                plotAllowed:
                                                  step2SelectedItem?.plotSpec
                                                    ?.plotAllowed,
                                                noOfopenSide:
                                                  step2SelectedItem?.plotSpec
                                                    ?.noOfopenSide,
                                              },
                                              plotFacing:
                                                step2SelectedItem?.plotFacing,
                                              constructionDone:
                                                step2SelectedItem?.constructionDone,
                                              boundryWall:
                                                step2SelectedItem?.boundryWall,
                                              gatedColony:
                                                step2SelectedItem?.gatedColony,
                                              propertyArea: {
                                                plotArea:
                                                  step2SelectedItem
                                                    ?.propertyArea?.plotArea,
                                                plotlength:
                                                  step2SelectedItem
                                                    ?.propertyArea?.plotlength,
                                                plotBreath:
                                                  step2SelectedItem
                                                    ?.propertyArea?.plotBreath,
                                              },
                                              ApprovalAuthority:
                                                step2SelectedItem?.ApprovalAuthority,
                                              propertyFacing:
                                                step2SelectedItem?.propertyFacing,
                                            });

                                            if (
                                              step2SelectedItem
                                                ?.noFloorsOnProperty?.value
                                                ?.length == 0
                                            ) {
                                              var msg =
                                                'Please Type your Property Name';
                                              setNoFloorsOnPropertyError(msg);
                                              return;
                                            } else {
                                              setNoFloorsOnPropertyError(false);
                                            }
                                            setFloorVisible(false);
                                          }}>
                                          <View style={{ alignItems: 'center' }}>
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
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: Poppins.Medium,
                            color: Color.red,
                          }}>
                          {noFloorsOnPropertyError}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View />
                  )}
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Furnishing Status
                    </Text>
                    <View
                      style={{
                        backgroundColor: Color.white,
                        paddingEnd: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                      {FurnishingStatus.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2SelectedItem?.furnishingDeatils?.id ==
                                  item?.id
                                  ? '#8C193F20'
                                  : Color.white,
                              width: width / 2.5,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginHorizontal: 5,
                              borderRadius: 50,
                              height: 45,
                              marginVertical: 10,
                              borderColor:
                                step2SelectedItem?.furnishingDeatils?.id ==
                                  item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils: item,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing:
                                  step2SelectedItem?.propertyFacing,
                              });
                            }}>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 14,
                                color: Color.black,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                  {/* <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Are there any other rooms ?{' '}
                      <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                        (Optional)
                      </Text>
                    </Text>
                    <View
                      style={{
                        justifyContent: 'space-between',
                      }}>
                      <FlatList
                        nestedScrollEnabled
                        data={otherRooms}
                        keyExtractor={(item, index) => item + index}
                        numColumns={3}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{
                                backgroundColor:
                                  otherRoomsSelectedItem?.includes(item?.id)
                                    ? '#8C193F20'
                                    : Color.white,
                                height: 40,
                                width: width / 3.5,
                                borderRadius: 50,
                                marginVertical: 10,
                                padding: 10,
                                marginHorizontal: 5,
                                borderColor: otherRoomsSelectedItem?.includes(
                                  item?.id,
                                )
                                  ? Color.primary
                                  : Color.lightgrey,
                                borderWidth: 1,
                              }}
                              onPress={() => {
                                handleotherRooms(item?.id);
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                {otherRoomsSelectedItem?.includes(item?.id) ? (
                                  <FIcon
                                    name="check-circle"
                                    size={18}
                                    color={Color.primary}
                                  />
                                ) : (
                                  <FIcon
                                    name="plus"
                                    size={18}
                                    color={Color.black}
                                  />
                                )}
                                <Text
                                  style={{
                                    flex: 1,
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
                  </View> */}
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Area Details
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.cloudyGrey,
                          paddingHorizontal: 5,
                        }}>
                        (Provide either Carpet Area or Super Area)
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.cloudyGrey,
                          marginVertical: 10,
                        }}>
                        Carpet Area
                      </Text>
                      <Text
                        style={{
                          color: Color.red,
                          // marginHorizontal: 5,
                          fontSize: 20,
                        }}>
                        *
                      </Text>
                    </View>
                    {parseInt(carpetValue) == 0 && (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                          color: Color.red,
                        }}>
                        Please enter your Carpet Area more than Zero
                      </Text>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: Color.lightgrey,
                          borderRadius: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: 45,
                        }}>
                        <TextInput
                          style={{
                            flex: 1,
                            marginHorizontal: 10,
                            color: Color.black,
                          }}
                          placeholderTextColor={Color.cloudyGrey}
                          value={carpetValue}
                          onChangeText={text => {
                            setCarpetValue(text);
                            if (text?.length == 0) {
                              var msg = 'Please Type your Carpet Area';
                              setCarpetError(msg);
                              return;
                            } else {
                              setCarpetError(false);
                            }
                          }}
                          placeholder="Enter Carpet Area"
                          keyboardType="numeric"
                        />
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Dropdown
                            style={{
                              backgroundColor: '#CCCCCC70',
                              padding: 5,
                              borderRadius: 5,
                              width: 100,
                            }}
                            placeholderStyle={{
                              fontSize: 16,
                              color: Color.black,
                              marginHorizontal: 10,
                            }}
                            selectedTextStyle={{
                              fontSize: 16,
                              color: Color.black,
                            }}
                            iconStyle={{ width: 20, height: 20 }}
                            itemTextStyle={{
                              fontSize: 16,
                              color: Color.cloudyGrey,
                            }}
                            data={carpetUnit}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select"
                            searchPlaceholder="Search..."
                            value={carpetStatus}
                            onChange={item => {
                              setCarpetStatus(item);
                            }}
                            renderRightIcon={() => (
                              <Icon
                                style={{ width: 20, height: 20 }}
                                color={Color.black}
                                name="caret-down"
                                size={20}
                              />
                            )}
                          />
                        </View>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {carpetError}
                    </Text>

                    {/* <Text
                      style={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                        marginVertical: 10,
                      }}>
                      Builtup Area{' '}
                      <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                        (Optional)
                      </Text>
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: Color.lightgrey,
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: 40,
                        }}>
                        <TextInput
                          style={{
                            flex: 1,
                            marginHorizontal: 10,
                            color: Color.black,
                          }}
                          editable={buildStatus?.length > 0}
                          placeholderTextColor={Color.cloudyGrey}
                          value={buildValue}
                          onChangeText={text => setBuildValue(text)}
                          placeholder="Enter Builtup Area"
                          keyboardType="numeric"
                        />
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Dropdown
                            style={{
                              backgroundColor: '#CCCCCC70',
                              padding: 5,
                              borderRadius: 5,
                              // height: 40,
                              width: 100,
                              // marginVertical: 10,
                            }}
                            placeholderStyle={{
                              fontSize: 16,
                              color: Color.black,
                              marginHorizontal: 10,
                            }}
                            selectedTextStyle={{
                              fontSize: 16,
                              color: Color.black,
                            }}
                            iconStyle={{ width: 20, height: 20 }}
                            itemTextStyle={{
                              fontSize: 16,
                              color: Color.cloudyGrey,
                            }}
                            data={buildUnit}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select"
                            searchPlaceholder="Search..."
                            value={buildStatus}
                            onChange={item => {
                              setBuildStatus(item);
                            }}
                            renderRightIcon={() => (
                              <Icon
                                style={{ width: 20, height: 20 }}
                                color={Color.black}
                                name="caret-down"
                                size={20}
                              />
                            )}
                          />
                        </View>
                      </View>
                    </View> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.cloudyGrey,
                          marginVertical: 0,
                        }}>
                        Super Area
                      </Text>
                      <Text
                        style={{
                          color: Color.red,
                          // marginHorizontal: 5,
                          fontSize: 16,
                        }}>
                        *
                      </Text>
                    </View>
                    {carpetValue != '' &&
                      parseInt(carpetValue) >= parseInt(superValue) && (
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: Poppins.Medium,
                            color: Color.red,
                          }}>
                          Please enter your Super Area more than the Carpet Area
                        </Text>
                      )}
                    {parseInt(superValue) == 0 && (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                          color: Color.red,
                        }}>
                        Please enter your Super Area more than Zero
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: Color.lightgrey,
                          borderRadius: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: 45,
                        }}>
                        <TextInput
                          style={{
                            flex: 1,
                            marginHorizontal: 10,
                            color: Color.black,
                          }}
                          // editable={superStatus?.length > 0}
                          placeholderTextColor={Color.cloudyGrey}
                          value={superValue}
                          onChangeText={text => {
                            setSuperValue(text);
                            if (text?.length == 0) {
                              var msg = 'Please Type your Super Area';
                              setSuperError(msg);
                              return;
                            } else {
                              setSuperError(false);
                            }
                          }}
                          placeholder="Enter Super Area"
                          keyboardType="numeric"
                        />
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Dropdown
                            style={{
                              backgroundColor: '#CCCCCC70',
                              padding: 5,
                              borderRadius: 5,
                              // height: 40,
                              width: 100,
                              // marginVertical: 10,
                            }}
                            placeholderStyle={{
                              fontSize: 16,
                              color: Color.black,
                              marginHorizontal: 10,
                            }}
                            selectedTextStyle={{
                              fontSize: 16,
                              color: Color.black,
                            }}
                            iconStyle={{ width: 20, height: 20 }}
                            itemTextStyle={{
                              fontSize: 16,
                              color: Color.cloudyGrey,
                            }}
                            data={superUnit}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select"
                            searchPlaceholder="Search..."
                            value={superStatus}
                            onChange={item => {
                              setSuperStatus(item);
                            }}
                            renderRightIcon={() => (
                              <Icon
                                style={{ width: 20, height: 20 }}
                                color={Color.black}
                                name="caret-down"
                                size={20}
                              />
                            )}
                          />
                        </View>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {superError}
                    </Text>
                  </View>

                  <View style={{ marginVertical: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        Availability
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
                        justifyContent: 'space-between',
                      }}>
                      <FlatList
                        nestedScrollEnabled
                        data={availability}
                        horizontal
                        keyExtractor={(item, index) => item + index}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{
                                backgroundColor:
                                  step2SelectedItem?.availability?.id ==
                                    item?.id
                                    ? '#8C193F20'
                                    : Color.white,
                                height: 40,
                                borderRadius: 50,
                                marginVertical: 10,
                                padding: 10,
                                marginHorizontal: 5,
                                borderColor:
                                  step2SelectedItem?.availability?.id ==
                                    item?.id
                                    ? Color.primary
                                    : Color.lightgrey,
                                borderWidth: 1,
                              }}
                              onPress={() => {
                                setStep2SelectedItem({
                                  bedrooms: step2SelectedItem.bedrooms,
                                  bathrooms: step2SelectedItem.bathrooms,
                                  balconies: step2SelectedItem.balconies,
                                  totalBuildingFloors:
                                    step2SelectedItem.totalBuildingFloors,
                                  noFloorsOnProperty:
                                    step2SelectedItem.noFloorsOnProperty,
                                  furnishingDeatils:
                                    step2SelectedItem.furnishingDeatils,
                                  otherRooms: step2SelectedItem.otherRooms,
                                  availability: item,
                                  ageOfProperty:
                                    step2SelectedItem.ageOfProperty,
                                  completionTime:
                                    step2SelectedItem.completionTime,
                                  plotSpec: {
                                    plotAllowed:
                                      step2SelectedItem?.plotSpec?.plotAllowed,
                                    noOfopenSide:
                                      step2SelectedItem?.plotSpec?.noOfopenSide,
                                  },
                                  plotFacing: step2SelectedItem?.plotFacing,
                                  constructionDone:
                                    step2SelectedItem?.constructionDone,
                                  boundryWall: step2SelectedItem?.boundryWall,
                                  gatedColony: step2SelectedItem?.gatedColony,
                                  propertyArea: {
                                    plotArea:
                                      step2SelectedItem?.propertyArea?.plotArea,
                                    plotlength:
                                      step2SelectedItem?.propertyArea
                                        ?.plotlength,
                                    plotBreath:
                                      step2SelectedItem?.propertyArea
                                        ?.plotBreath,
                                  },
                                  ApprovalAuthority:
                                    step2SelectedItem?.ApprovalAuthority,
                                  propertyFacing:
                                    step2SelectedItem?.propertyFacing,
                                });

                                if (
                                  step2SelectedItem?.availability?.value
                                    ?.length == 0
                                ) {
                                  var msg = 'Please Select your Availability';
                                  setAvailabilityError(msg);
                                  return;
                                } else {
                                  setAvailabilityError(false);
                                }
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    flex: 1,
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
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {availabilityError}
                    </Text>
                  </View>

                  {step2SelectedItem?.availability?.value == 'ready_to_move' ? (
                    <View style={{ marginVertical: 0 }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontWeight: 'bold',
                          }}>
                          Age Of Property
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
                          justifyContent: 'space-between',
                        }}>
                        <FlatList
                          nestedScrollEnabled
                          data={ageOfProperty}
                          numColumns={3}
                          keyExtractor={(item, index) => item + index}
                          showsHorizontalScrollIndicator={false}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  backgroundColor:
                                    step2SelectedItem?.ageOfProperty?.id ==
                                      item?.id
                                      ? '#8C193F20'
                                      : Color.white,
                                  borderRadius: 50,
                                  marginVertical: 10,
                                  padding: 10,
                                  marginHorizontal: 5,
                                  borderColor:
                                    step2SelectedItem?.ageOfProperty?.id ==
                                      item?.id
                                      ? Color.primary
                                      : Color.lightgrey,
                                  borderWidth: 1,
                                }}
                                onPress={() => {
                                  setStep2SelectedItem({
                                    bedrooms: step2SelectedItem.bedrooms,
                                    bathrooms: step2SelectedItem.bathrooms,
                                    balconies: step2SelectedItem.balconies,
                                    totalBuildingFloors:
                                      step2SelectedItem.totalBuildingFloors,
                                    noFloorsOnProperty:
                                      step2SelectedItem.noFloorsOnProperty,
                                    furnishingDeatils:
                                      step2SelectedItem.furnishingDeatils,
                                    otherRooms: step2SelectedItem.otherRooms,
                                    availability:
                                      step2SelectedItem.availability,
                                    ageOfProperty: item,
                                    completionTime:
                                      step2SelectedItem.completionTime,
                                    plotSpec: {
                                      plotAllowed:
                                        step2SelectedItem?.plotSpec
                                          ?.plotAllowed,
                                      noOfopenSide:
                                        step2SelectedItem?.plotSpec
                                          ?.noOfopenSide,
                                    },
                                    plotFacing: step2SelectedItem?.plotFacing,
                                    constructionDone:
                                      step2SelectedItem?.constructionDone,
                                    boundryWall: step2SelectedItem?.boundryWall,
                                    gatedColony: step2SelectedItem?.gatedColony,
                                    propertyArea: {
                                      plotArea:
                                        step2SelectedItem?.propertyArea
                                          ?.plotArea,
                                      plotlength:
                                        step2SelectedItem?.propertyArea
                                          ?.plotlength,
                                      plotBreath:
                                        step2SelectedItem?.propertyArea
                                          ?.plotBreath,
                                    },
                                    ApprovalAuthority:
                                      step2SelectedItem?.ApprovalAuthority,
                                    propertyFacing:
                                      step2SelectedItem?.propertyFacing,
                                  });
                                  if (
                                    step2SelectedItem?.ageOfProperty?.value
                                      ?.length == 0
                                  ) {
                                    var msg =
                                      'Please Select your Age Of Property';
                                    setAgeOfPropertyError(msg);
                                    return;
                                  } else {
                                    setAgeOfPropertyError(false);
                                  }
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
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                          color: Color.red,
                        }}>
                        {ageOfPropertyError}
                      </Text>
                    </View>
                  ) : (
                    <View style={{ marginVertical: 0 }}>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontWeight: 'bold',
                          }}>
                          Property Completion Duration
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
                          justifyContent: 'space-between',
                        }}>
                        <FlatList
                          nestedScrollEnabled
                          data={propertyCompleteDuration}
                          numColumns={3}
                          keyExtractor={(item, index) => item + index}
                          showsHorizontalScrollIndicator={false}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                style={{
                                  backgroundColor:
                                    step2SelectedItem?.completionTime?.id ==
                                      item?.id
                                      ? '#8C193F20'
                                      : Color.white,
                                  borderRadius: 50,
                                  marginVertical: 10,
                                  padding: 10,
                                  marginHorizontal: 5,
                                  borderColor:
                                    step2SelectedItem?.completionTime?.id ==
                                      item?.id
                                      ? Color.primary
                                      : Color.lightgrey,
                                  borderWidth: 1,
                                }}
                                onPress={() => {
                                  setStep2SelectedItem({
                                    bedrooms: step2SelectedItem.bedrooms,
                                    bathrooms: step2SelectedItem.bathrooms,
                                    balconies: step2SelectedItem.balconies,
                                    totalBuildingFloors:
                                      step2SelectedItem.totalBuildingFloors,
                                    noFloorsOnProperty:
                                      step2SelectedItem.noFloorsOnProperty,
                                    furnishingDeatils:
                                      step2SelectedItem.furnishingDeatils,
                                    otherRooms: step2SelectedItem.otherRooms,
                                    availability:
                                      step2SelectedItem.availability,
                                    ageOfProperty:
                                      step2SelectedItem?.ageOfProperty,
                                    completionTime: item,
                                    plotSpec: {
                                      plotAllowed:
                                        step2SelectedItem?.plotSpec
                                          ?.plotAllowed,
                                      noOfopenSide:
                                        step2SelectedItem?.plotSpec
                                          ?.noOfopenSide,
                                    },
                                    plotFacing: step2SelectedItem?.plotFacing,
                                    constructionDone:
                                      step2SelectedItem?.constructionDone,
                                    boundryWall: step2SelectedItem?.boundryWall,
                                    gatedColony: step2SelectedItem?.gatedColony,
                                    propertyArea: {
                                      plotArea:
                                        step2SelectedItem?.propertyArea
                                          ?.plotArea,
                                      plotlength:
                                        step2SelectedItem?.propertyArea
                                          ?.plotlength,
                                      plotBreath:
                                        step2SelectedItem?.propertyArea
                                          ?.plotBreath,
                                    },
                                    ApprovalAuthority:
                                      step2SelectedItem?.ApprovalAuthority,
                                    propertyFacing:
                                      step2SelectedItem?.propertyFacing,
                                  });
                                  if (
                                    step2SelectedItem?.completionTime?.value
                                      ?.length == 0
                                  ) {
                                    var msg =
                                      'Please Select your Completion Duration';
                                    setPropertyCompletionError(msg);
                                    return;
                                  } else {
                                    setPropertyCompletionError(false);
                                  }
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
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                          color: Color.red,
                        }}>
                        {PropertyCompletionError}
                      </Text>
                    </View>
                  )}
                </>
              )
            ) : (step1SelectedItem?.commercialPropType?.value == 'office' &&
              step1SelectedItem?.post?.value == 'sell') ||
              (step1RentSelectedItem?.commercialPropType?.value == 'office' &&
                step1SelectedItem?.post?.value == 'rent') ? (
              <View style={{ marginVertical: 10 }}>
                {step1RentSelectedItem?.commercialPropType?.value == 'office' &&
                  step1SelectedItem?.post?.value == 'rent' && (
                    <>
                      <View style={{ marginVertical: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontWeight: 'bold',
                          }}>
                          Lock-in Period in years{' '}
                          <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                            (Optional)
                          </Text>
                        </Text>
                        <View style={{ marginVertical: 10 }}>
                          <TouchableOpacity
                            onPress={() => {
                              setPlotSpecVisible(true);
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
                              {common_fn.formatText(step2CommercialSelected?.lockPeriod?.value) ??
                                'Lock-in Period in years'}
                            </Text>
                            <Icon
                              name="caret-down"
                              size={20}
                              color={Color.black}
                            />
                          </TouchableOpacity>
                          <Modal
                            transparent={true}
                            visible={PlotSpecVisible}
                            animationType="fade">
                            <View
                              style={{
                                flex: 1,
                                backgroundColor: Color.transparantBlack,
                              }}>
                              <Pressable
                                style={{ flex: 1 }}
                                onPress={() => {
                                  setPlotSpecVisible(false);
                                }}
                              />
                              <View
                                style={{
                                  backgroundColor: Color.white,
                                  flex: 1,
                                  padding: 10,
                                  borderTopRightRadius: 30,
                                  borderTopLeftRadius: 30,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: Color.cloudyGrey,
                                    fontWeight: 'bold',
                                    marginVertical: 10,
                                  }}>
                                  Select the Lock-in period in years
                                </Text>
                                <Divider style={styles.Divider} />
                                <View
                                  style={{
                                    marginHorizontal: 20,
                                  }}>
                                  <ScrollView
                                    showsVerticalScrollIndicator={false}>
                                    {LockYears.map((item, index) => {
                                      return (
                                        <TouchableOpacity
                                          key={index}
                                          onPress={() => {
                                            setStep2CommercialSelected({
                                              pantry:
                                                step2CommercialSelected?.pantry,
                                              washroom:
                                                step2CommercialSelected?.washroom,
                                              totalBuildingFloors:
                                                step2CommercialSelected?.totalBuildingFloors,
                                              noFloorsOnProperty:
                                                step2CommercialSelected?.noFloorsOnProperty,
                                              furnishingDeatils:
                                                step2CommercialSelected?.furnishingDeatils,
                                              propertyArea: {
                                                plotArea:
                                                  step2CommercialSelected
                                                    ?.propertyArea?.plotArea,
                                                plotlength:
                                                  step2CommercialSelected
                                                    ?.propertyArea?.plotlength,
                                                plotBreath:
                                                  step2CommercialSelected
                                                    ?.propertyArea?.plotlength,
                                              },
                                              perWash:
                                                step2CommercialSelected?.perWash,
                                              corShop:
                                                step2CommercialSelected?.corShop,
                                              mainRoadFace:
                                                step2CommercialSelected?.mainRoadFace,
                                              modifyInterior:
                                                step2CommercialSelected?.modifyInterior,
                                              lockPeriod: item,
                                              noSeats:
                                                step2CommercialSelected?.noSeats,
                                            });
                                            setPlotSpecVisible(false);
                                          }}>
                                          <View style={{ alignItems: 'center' }}>
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
                      </View>
                      <View style={{ marginVertical: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.black,
                            fontWeight: 'bold',
                          }}>
                          Willing to modify interior{' '}
                          <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                            (Optional)
                          </Text>
                        </Text>
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
                                setStep2CommercialSelected({
                                  pantry: step2CommercialSelected?.pantry,
                                  washroom: step2CommercialSelected?.washroom,
                                  totalBuildingFloors:
                                    step2CommercialSelected?.totalBuildingFloors,
                                  noFloorsOnProperty:
                                    step2CommercialSelected?.noFloorsOnProperty,
                                  furnishingDeatils:
                                    step2CommercialSelected?.furnishingDeatils,
                                  propertyArea: {
                                    plotArea:
                                      step2CommercialSelected?.propertyArea
                                        ?.plotArea,
                                    plotlength:
                                      step2CommercialSelected?.propertyArea
                                        ?.plotlength,
                                    plotBreath:
                                      step2CommercialSelected?.propertyArea
                                        ?.plotlength,
                                  },
                                  perWash: step2CommercialSelected?.perWash,
                                  corShop: step2CommercialSelected?.corShop,
                                  mainRoadFace:
                                    step2CommercialSelected?.mainRoadFace,
                                  modifyInterior: item,
                                  lockPeriod:
                                    step2CommercialSelected?.lockPeriod,
                                  noSeats: step2CommercialSelected?.noSeats,
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
                                  step2CommercialSelected?.modifyInterior
                                    ?.id === item.id
                                    ? 'radio-button-on'
                                    : 'radio-button-off'
                                }
                                size={20}
                                color={
                                  step2CommercialSelected?.modifyInterior
                                    ?.id === item.id
                                    ? Color.primary
                                    : Color.black
                                }
                              />
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </>
                  )}
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Pantry / Cafeteria{' '}
                    <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                      (Optional)
                    </Text>
                  </Text>
                  {pantryData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 10,
                        }}
                        onPress={() => {
                          setStep2CommercialSelected({
                            pantry: item,
                            washroom: step2CommercialSelected?.washroom,
                            totalBuildingFloors:
                              step2CommercialSelected?.totalBuildingFloors,
                            noFloorsOnProperty:
                              step2CommercialSelected?.noFloorsOnProperty,
                            furnishingDeatils:
                              step2CommercialSelected?.furnishingDeatils,
                            propertyArea: {
                              plotArea:
                                step2CommercialSelected?.propertyArea?.plotArea,
                              plotlength:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                              plotBreath:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                            },
                            perWash: step2CommercialSelected?.perWash,
                            corShop: step2CommercialSelected?.corShop,
                            mainRoadFace: step2CommercialSelected?.mainRoadFace,
                            modifyInterior:
                              step2CommercialSelected?.modifyInterior,
                            lockPeriod: step2CommercialSelected?.lockPeriod,
                            noSeats: step2CommercialSelected?.noSeats,
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
                            step2CommercialSelected.pantry?.id === item.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          size={22}
                          color={
                            step2CommercialSelected.pantry?.id === item.id
                              ? Color.primary
                              : Color.black
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property facing
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
                      {PropertyFacing.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2SelectedItem?.propertyFacing?.id ==
                                  item?.id
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
                                step2SelectedItem?.propertyFacing?.id ==
                                  item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                              flexDirection: 'row',
                            }}
                            onPress={() => {
                              setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing: item,
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
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Unit Details
                  </Text>
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Color.black,
                          fontWeight: 'bold',
                        }}>
                        washrooms
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {washrooms.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2CommercialSelected?.washroom?.id ==
                                  item?.id
                                  ? '#8C193F20'
                                  : Color.white,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginHorizontal: 5,
                              borderRadius: 50,
                              width: 45,
                              height: 45,
                              marginVertical: 10,
                              borderColor:
                                step2CommercialSelected?.washroom?.id ==
                                  item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                            }}
                            onPress={() => {
                              setStep2CommercialSelected({
                                pantry: step2CommercialSelected?.pantry,
                                washroom: item,
                                totalBuildingFloors:
                                  step2CommercialSelected?.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2CommercialSelected?.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2CommercialSelected?.furnishingDeatils,
                                propertyArea: {
                                  plotArea:
                                    step2CommercialSelected?.propertyArea
                                      ?.plotArea,
                                  plotlength:
                                    step2CommercialSelected?.propertyArea
                                      ?.plotlength,
                                  plotBreath:
                                    step2CommercialSelected?.propertyArea
                                      ?.plotlength,
                                },
                                perWash: step2CommercialSelected?.perWash,
                                corShop: step2CommercialSelected?.corShop,
                                mainRoadFace:
                                  step2CommercialSelected?.mainRoadFace,
                                modifyInterior:
                                  step2CommercialSelected?.modifyInterior,
                                lockPeriod: step2CommercialSelected?.lockPeriod,
                                noSeats: step2CommercialSelected?.noSeats,
                              });
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color:
                                  step2CommercialSelected?.washroom?.id ==
                                    item?.id
                                    ? Color.primary
                                    : Color.black,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                      }}>
                      No.Of Seats
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
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      placeholder="Enter Your Seats"
                      placeholderTextColor={Color.cloudyGrey}
                      value={step2CommercialSelected?.noSeats}
                      onChangeText={value => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea:
                              step2CommercialSelected?.propertyArea?.plotArea,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: value,
                        });
                      }}
                      keyboardType="number-pad"
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Color.black,
                        color: Color.black,
                      }}
                    />
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Floor Details
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.cloudyGrey,
                        fontWeight: 'bold',
                        marginVertical: 10,
                      }}>
                      Total No. of Floors in Building
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
                  {/* <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {totalBuildingFloorsError}
                    </Text> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 35,
                        height: 35,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      disabled={
                        step2CommercialSelected?.totalBuildingFloors == 0
                      }
                      onPress={() => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors - 1,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea:
                              step2CommercialSelected?.propertyArea?.plotArea,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: step2CommercialSelected?.noSeats,
                        });
                      }}>
                      <FIcon name="minus" size={18} color={Color.cloudyGrey} />
                    </TouchableOpacity>
                    <View
                      style={{
                        width: 100,
                        height: 40,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        borderRadius: 5,
                      }}>
                      {/* <Text
                      style={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {step2CommercialSelected.totalBuildingFloors}
                    </Text> */}
                      <TextInput
                        value={step2CommercialSelected?.totalBuildingFloors.toString()}
                        placeholderTextColor={Color.cloudyGrey}
                        style={{ color: Color.black }}
                        keyboardType="number-pad"
                        onChangeText={text => {
                          setStep2CommercialSelected({
                            pantry: step2CommercialSelected?.pantry,
                            washroom: step2CommercialSelected?.washroom,
                            totalBuildingFloors: text,
                            noFloorsOnProperty:
                              step2CommercialSelected?.noFloorsOnProperty,
                            furnishingDeatils:
                              step2CommercialSelected?.furnishingDeatils,
                            propertyArea: {
                              plotArea:
                                step2CommercialSelected?.propertyArea?.plotArea,
                              plotlength:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                              plotBreath:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                            },
                            perWash: step2CommercialSelected?.perWash,
                            corShop: step2CommercialSelected?.corShop,
                            mainRoadFace: step2CommercialSelected?.mainRoadFace,
                            modifyInterior:
                              step2CommercialSelected?.modifyInterior,
                            lockPeriod: step2CommercialSelected?.lockPeriod,
                            noSeats: step2CommercialSelected?.noSeats,
                          });
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 35,
                        height: 35,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors + 1,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea:
                              step2CommercialSelected?.propertyArea?.plotArea,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: step2CommercialSelected?.noSeats,
                        });
                      }}>
                      <FIcon name="plus" size={18} color={Color.cloudyGrey} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                        }}>
                        Floors No. of Your Property
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
                    {/* <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                          color: Color.red,
                        }}>
                        {noFloorsOnPropertyError}
                      </Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          setFloorVisible(true);
                        }}
                        style={{
                          backgroundColor: Color.white,
                          borderColor: Color.cloudyGrey,
                          borderWidth: 1,
                          padding: 10,
                          borderRadius: 5,
                          // height: 40,
                          width: '100%',
                          marginVertical: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {step2CommercialSelected?.noFloorsOnProperty != '' ? (
                          <Text
                            style={{
                              color: Color.cloudyGrey,
                              flex: 1,
                              fontFamily: Poppins.SemiBold,
                              fontSize: 14,
                              textTransform: 'capitalize',
                            }}>
                            {step2CommercialSelected?.noFloorsOnProperty
                              ?.label ?? 'Select Your Floor'}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: Color.cloudyGrey,
                              flex: 1,
                              fontFamily: Poppins.SemiBold,
                              fontSize: 18,
                            }}>
                            {'Select'}
                          </Text>
                        )}
                        <Icon name="caret-down" size={20} color={Color.black} />
                      </TouchableOpacity>
                      <Modal
                        transparent={true}
                        visible={floorVisible}
                        animationType="fade">
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: Color.transparantBlack,
                          }}>
                          <Pressable
                            style={{ flex: 1 }}
                            onPress={() => {
                              setFloorVisible(false);
                            }}
                          />
                          <View
                            style={{
                              backgroundColor: Color.white,
                              flex: 1,
                              padding: 10,
                              borderTopRightRadius: 30,
                              borderTopLeftRadius: 30,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: Color.black,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              Select Your Floors
                            </Text>
                            <Divider style={styles.Divider} />
                            <View
                              style={{
                                marginHorizontal: 20,
                              }}>
                              <ScrollView showsVerticalScrollIndicator={false}>
                                {filteredFloors.map((item, index) => {
                                  return (
                                    <TouchableOpacity
                                      key={index}
                                      onPress={() => {
                                        setStep2CommercialSelected({
                                          pantry:
                                            step2CommercialSelected?.pantry,
                                          washroom:
                                            step2CommercialSelected?.washroom,
                                          totalBuildingFloors:
                                            step2CommercialSelected?.totalBuildingFloors,
                                          noFloorsOnProperty: item,
                                          furnishingDeatils:
                                            step2CommercialSelected?.furnishingDeatils,
                                          propertyArea: {
                                            plotArea:
                                              step2CommercialSelected
                                                ?.propertyArea?.plotArea,
                                            plotlength:
                                              step2CommercialSelected
                                                ?.propertyArea?.plotlength,
                                            plotBreath:
                                              step2CommercialSelected
                                                ?.propertyArea?.plotlength,
                                          },
                                          perWash:
                                            step2CommercialSelected?.perWash,
                                          corShop:
                                            step2CommercialSelected?.corShop,
                                          mainRoadFace:
                                            step2CommercialSelected?.mainRoadFace,
                                          modifyInterior:
                                            step2CommercialSelected?.modifyInterior,
                                          lockPeriod:
                                            step2CommercialSelected?.lockPeriod,
                                          noSeats:
                                            step2CommercialSelected?.noSeats,
                                        });
                                        setFloorVisible(false);
                                      }}>
                                      <View style={{ alignItems: 'center' }}>
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
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Furnishing Status
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
                      backgroundColor: Color.white,
                      paddingEnd: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    {FurnishingStatus.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor:
                              step2CommercialSelected?.furnishingDeatils?.id ==
                                item?.id
                                ? '#8C193F20'
                                : Color.white,
                            width: width / 2.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                            borderRadius: 50,
                            height: 40,
                            marginVertical: 10,
                            borderColor:
                              step2CommercialSelected?.furnishingDeatils?.id ==
                                item?.id
                                ? Color.primary
                                : Color.lightgrey,
                            borderWidth: 1,
                          }}
                          onPress={() => {
                            setStep2CommercialSelected({
                              pantry: step2CommercialSelected?.pantry,
                              washroom: step2CommercialSelected?.washroom,
                              totalBuildingFloors:
                                step2CommercialSelected?.totalBuildingFloors,
                              noFloorsOnProperty:
                                step2CommercialSelected?.noFloorsOnProperty,
                              furnishingDeatils: item,
                              propertyArea: {
                                plotArea:
                                  step2CommercialSelected?.propertyArea
                                    ?.plotArea,
                                plotlength:
                                  step2CommercialSelected?.propertyArea
                                    ?.plotlength,
                                plotBreath:
                                  step2CommercialSelected?.propertyArea
                                    ?.plotlength,
                              },
                              perWash: step2CommercialSelected?.perWash,
                              corShop: step2CommercialSelected?.corShop,
                              mainRoadFace:
                                step2CommercialSelected?.mainRoadFace,
                              modifyInterior:
                                step2CommercialSelected?.modifyInterior,
                              lockPeriod: step2CommercialSelected?.lockPeriod,
                              noSeats: step2CommercialSelected?.noSeats,
                            });
                          }}>
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 14,
                              color: Color.black,
                              fontWeight: 'bold',
                              marginVertical: 10,
                            }}>
                            {item.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property Area
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      value={step2CommercialSelected?.propertyArea?.plotArea}
                      placeholder="Plot Area"
                      placeholderTextColor={Color.cloudyGrey}
                      keyboardType="number-pad"
                      onChangeText={text => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea: text,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: step2CommercialSelected?.noSeats,
                        });
                      }}
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: Color.black,
                        color: Color.black,
                        fontSize: 16,
                        fontFamily: Poppins.Medium,
                      }}
                    />
                    <Dropdown
                      style={{
                        padding: 5,
                        borderRadius: 5,
                        width: 100,
                        position: 'absolute',
                        right: 0,
                      }}
                      placeholderStyle={{
                        fontSize: 16,
                        color: Color.black,
                        marginHorizontal: 10,
                      }}
                      selectedTextStyle={{
                        fontSize: 16,
                        color: Color.black,
                      }}
                      iconStyle={{ width: 20, height: 20 }}
                      itemTextStyle={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                      }}
                      data={plotAreaunit}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select"
                      searchPlaceholder="Search..."
                      value={plotStatus}
                      onChange={item => {
                        setPlotStatus(item);
                      }}
                      renderRightIcon={() => (
                        <Icon
                          style={{ width: 20, height: 20 }}
                          color={Color.black}
                          name="chevron-down"
                          size={20}
                        />
                      )}
                    />
                  </View>
                  <TextInput
                    value={step2CommercialSelected?.propertyArea?.plotlength}
                    placeholder="Plot Length In Yrd(Optional)"
                    placeholderTextColor={Color.cloudyGrey}
                    keyboardType="number-pad"
                    onChangeText={text => {
                      setStep2CommercialSelected({
                        pantry: step2CommercialSelected?.pantry,
                        washroom: step2CommercialSelected?.washroom,
                        totalBuildingFloors:
                          step2CommercialSelected?.totalBuildingFloors,
                        noFloorsOnProperty:
                          step2CommercialSelected?.noFloorsOnProperty,
                        furnishingDeatils:
                          step2CommercialSelected?.furnishingDeatils,
                        propertyArea: {
                          plotArea:
                            step2CommercialSelected?.propertyArea?.plotArea,
                          plotlength: text,
                          plotBreath:
                            step2CommercialSelected?.propertyArea?.plotlength,
                        },
                        perWash: step2CommercialSelected?.perWash,
                        corShop: step2CommercialSelected?.corShop,
                        mainRoadFace: step2CommercialSelected?.mainRoadFace,
                        modifyInterior: step2CommercialSelected?.modifyInterior,
                        lockPeriod: step2CommercialSelected?.lockPeriod,
                        noSeats: step2CommercialSelected?.noSeats,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.black,
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.Medium,
                    }}
                  />
                  <TextInput
                    value={step2CommercialSelected?.propertyArea?.plotBreath}
                    placeholder="Plot Breath In Yrd(Optional)"
                    placeholderTextColor={Color.cloudyGrey}
                    keyboardType="number-pad"
                    onChangeText={text => {
                      setStep2CommercialSelected({
                        pantry: step2CommercialSelected?.pantry,
                        washroom: step2CommercialSelected?.washroom,
                        totalBuildingFloors:
                          step2CommercialSelected?.totalBuildingFloors,
                        noFloorsOnProperty:
                          step2CommercialSelected?.noFloorsOnProperty,
                        furnishingDeatils:
                          step2CommercialSelected?.furnishingDeatils,
                        propertyArea: {
                          plotArea:
                            step2CommercialSelected?.propertyArea?.plotArea,
                          plotlength:
                            step2CommercialSelected?.propertyArea?.plotlength,
                          plotBreath: text,
                        },
                        perWash: step2CommercialSelected?.perWash,
                        corShop: step2CommercialSelected?.corShop,
                        mainRoadFace: step2CommercialSelected?.mainRoadFace,
                        modifyInterior: step2CommercialSelected?.modifyInterior,
                        lockPeriod: step2CommercialSelected?.lockPeriod,
                        noSeats: step2CommercialSelected?.noSeats,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.black,
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.Medium,
                    }}
                  />
                </View>
              </View>
            ) : (step1SelectedItem?.commercialPropType?.value == 'shop' &&
              step1SelectedItem?.post?.value == 'sell') ||
              (step1RentSelectedItem?.commercialPropType?.value == 'shop' &&
                step1SelectedItem?.post?.value == 'rent') ? (
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Washroom{' '}
                  {/* <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                    (Optional)
                  </Text> */}
                </Text>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Personal washroom
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
                          setStep2CommercialSelected({
                            pantry: step2CommercialSelected?.pantry,
                            washroom: step2CommercialSelected?.washroom,
                            totalBuildingFloors:
                              step2CommercialSelected?.totalBuildingFloors - 1,
                            noFloorsOnProperty:
                              step2CommercialSelected?.noFloorsOnProperty,
                            furnishingDeatils:
                              step2CommercialSelected?.furnishingDeatils,
                            propertyArea: {
                              plotArea:
                                step2CommercialSelected?.propertyArea?.plotArea,
                              plotlength:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                              plotBreath:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                            },
                            perWash: item,
                            corShop: step2CommercialSelected?.corShop,
                            mainRoadFace: step2CommercialSelected?.mainRoadFace,
                            modifyInterior:
                              step2CommercialSelected?.modifyInterior,
                            lockPeriod: step2CommercialSelected?.lockPeriod,
                            noSeats: step2CommercialSelected?.noSeats,
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
                            step2CommercialSelected?.perWash?.id === item.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          size={20}
                          color={
                            step2CommercialSelected?.perWash?.id === item.id
                              ? Color.primary
                              : Color.black
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Lock-in Period in years{' '}
                    <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                      (Optional)
                    </Text>
                  </Text>
                  <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setPlotSpecVisible(true);
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
                        {common_fn.formatText(step2CommercialSelected?.lockPeriod?.value) ??
                          'Lock-in Period in years'}
                      </Text>
                      <Icon name="caret-down" size={20} color={Color.black} />
                    </TouchableOpacity>
                    <Modal
                      transparent={true}
                      visible={PlotSpecVisible}
                      animationType="fade">
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: Color.transparantBlack,
                        }}>
                        <Pressable
                          style={{ flex: 1 }}
                          onPress={() => {
                            setPlotSpecVisible(false);
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: Color.white,
                            flex: 1,
                            padding: 10,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: Color.cloudyGrey,
                              fontWeight: 'bold',
                              marginVertical: 10,
                            }}>
                            Select the Lock-in period in years
                          </Text>
                          <Divider style={styles.Divider} />
                          <View
                            style={{
                              marginHorizontal: 20,
                            }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                              {LockYears.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                      setStep2CommercialSelected({
                                        pantry: step2CommercialSelected?.pantry,
                                        washroom:
                                          step2CommercialSelected?.washroom,
                                        totalBuildingFloors:
                                          step2CommercialSelected?.totalBuildingFloors,
                                        noFloorsOnProperty:
                                          step2CommercialSelected?.noFloorsOnProperty,
                                        furnishingDeatils:
                                          step2CommercialSelected?.furnishingDeatils,
                                        propertyArea: {
                                          plotArea:
                                            step2CommercialSelected
                                              ?.propertyArea?.plotArea,
                                          plotlength:
                                            step2CommercialSelected
                                              ?.propertyArea?.plotlength,
                                          plotBreath:
                                            step2CommercialSelected
                                              ?.propertyArea?.plotlength,
                                        },
                                        perWash:
                                          step2CommercialSelected?.perWash,
                                        corShop:
                                          step2CommercialSelected?.corShop,
                                        mainRoadFace:
                                          step2CommercialSelected?.mainRoadFace,
                                        modifyInterior:
                                          step2CommercialSelected?.modifyInterior,
                                        lockPeriod: item,
                                        noSeats:
                                          step2CommercialSelected?.noSeats,
                                      });
                                      setPlotSpecVisible(false);
                                    }}>
                                    <View style={{ alignItems: 'center' }}>
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
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Pantry / Cafeteria{' '}
                    <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                      (Optional)
                    </Text>
                  </Text>
                  {pantryData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 10,
                        }}
                        onPress={() => {
                          setStep2CommercialSelected({
                            pantry: item,
                            washroom: step2CommercialSelected?.washroom,
                            totalBuildingFloors:
                              step2CommercialSelected?.totalBuildingFloors,
                            noFloorsOnProperty:
                              step2CommercialSelected?.noFloorsOnProperty,
                            furnishingDeatils:
                              step2CommercialSelected?.furnishingDeatils,
                            propertyArea: {
                              plotArea:
                                step2CommercialSelected?.propertyArea?.plotArea,
                              plotlength:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                              plotBreath:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                            },
                            perWash: step2CommercialSelected?.perWash,
                            corShop: step2CommercialSelected?.corShop,
                            mainRoadFace: step2CommercialSelected?.mainRoadFace,
                            modifyInterior:
                              step2CommercialSelected?.modifyInterior,
                            lockPeriod: step2CommercialSelected?.lockPeriod,
                            noSeats: step2CommercialSelected?.noSeats,
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
                            step2CommercialSelected.pantry?.id === item.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          size={22}
                          color={
                            step2CommercialSelected.pantry?.id === item.id
                              ? Color.primary
                              : Color.black
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Cornor Shop{' '}
                    <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                      (Optional)
                    </Text>
                  </Text>
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
                          setStep2CommercialSelected({
                            pantry: step2CommercialSelected?.pantry,
                            washroom: step2CommercialSelected?.washroom,
                            totalBuildingFloors:
                              step2CommercialSelected?.totalBuildingFloors,
                            noFloorsOnProperty:
                              step2CommercialSelected?.noFloorsOnProperty,
                            furnishingDeatils:
                              step2CommercialSelected?.furnishingDeatils,
                            propertyArea: {
                              plotArea:
                                step2CommercialSelected?.propertyArea?.plotArea,
                              plotlength:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                              plotBreath:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                            },
                            perWash: step2CommercialSelected?.perWash,
                            corShop: item,
                            mainRoadFace: step2CommercialSelected?.mainRoadFace,
                            modifyInterior:
                              step2CommercialSelected?.modifyInterior,
                            lockPeriod: step2CommercialSelected?.lockPeriod,
                            noSeats: step2CommercialSelected?.noSeats,
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
                            step2CommercialSelected?.corShop?.id === item.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          size={20}
                          color={
                            step2CommercialSelected?.corShop?.id === item.id
                              ? Color.primary
                              : Color.black
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Is Main Road Facing{' '}
                    <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                      (Optional)
                    </Text>
                  </Text>
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
                          setStep2CommercialSelected({
                            pantry: step2CommercialSelected?.pantry,
                            washroom: step2CommercialSelected?.washroom,
                            totalBuildingFloors:
                              step2CommercialSelected?.totalBuildingFloors,
                            noFloorsOnProperty:
                              step2CommercialSelected?.noFloorsOnProperty,
                            furnishingDeatils:
                              step2CommercialSelected?.furnishingDeatils,
                            propertyArea: {
                              plotArea:
                                step2CommercialSelected?.propertyArea?.plotArea,
                              plotlength:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                              plotBreath:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                            },
                            perWash: step2CommercialSelected?.perWash,
                            corShop: step2CommercialSelected?.corShop,
                            mainRoadFace: item,
                            modifyInterior:
                              step2CommercialSelected?.modifyInterior,
                            lockPeriod: step2CommercialSelected?.lockPeriod,
                            noSeats: step2CommercialSelected?.noSeats,
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
                            step2CommercialSelected?.mainRoadFace?.id ===
                              item.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          size={20}
                          color={
                            step2CommercialSelected?.mainRoadFace?.id ===
                              item.id
                              ? Color.primary
                              : Color.black
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property facing
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
                      {PropertyFacing.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2SelectedItem?.propertyFacing?.id ==
                                  item?.id
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
                                step2SelectedItem?.propertyFacing?.id ==
                                  item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                              flexDirection: 'row',
                            }}
                            onPress={() => {
                              setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing: item,
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
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Floor Details
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
                      color: Color.cloudyGrey,
                      fontWeight: 'bold',
                      marginVertical: 10,
                    }}>
                    Total No. of Floors in Building
                  </Text>
                  {/* <Text
                      style={{
                        fontSize: 14,
                        fontFamily: Poppins.Medium,
                        color: Color.red,
                      }}>
                      {totalBuildingFloorsError}
                    </Text> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 35,
                        height: 35,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      disabled={
                        step2CommercialSelected?.totalBuildingFloors == 0
                      }
                      onPress={() => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors - 1,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea:
                              step2CommercialSelected?.propertyArea?.plotArea,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: step2CommercialSelected?.noSeats,
                        });
                      }}>
                      <FIcon name="minus" size={18} color={Color.cloudyGrey} />
                    </TouchableOpacity>
                    <View
                      style={{
                        width: 100,
                        height: 40,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        borderRadius: 5,
                      }}>
                      {/* <Text
                      style={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {step2CommercialSelected.totalBuildingFloors}
                    </Text> */}
                      <TextInput
                        value={step2CommercialSelected?.totalBuildingFloors.toString()}
                        placeholderTextColor={Color.cloudyGrey}
                        style={{ color: Color.black }}
                        keyboardType="number-pad"
                        onChangeText={text => {
                          setStep2CommercialSelected({
                            pantry: step2CommercialSelected?.pantry,
                            washroom: step2CommercialSelected?.washroom,
                            totalBuildingFloors: text,
                            noFloorsOnProperty:
                              step2CommercialSelected?.noFloorsOnProperty,
                            furnishingDeatils:
                              step2CommercialSelected?.furnishingDeatils,
                            propertyArea: {
                              plotArea:
                                step2CommercialSelected?.propertyArea?.plotArea,
                              plotlength:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                              plotBreath:
                                step2CommercialSelected?.propertyArea
                                  ?.plotlength,
                            },
                            perWash: step2CommercialSelected?.perWash,
                            corShop: step2CommercialSelected?.corShop,
                            mainRoadFace: step2CommercialSelected?.mainRoadFace,
                            modifyInterior:
                              step2CommercialSelected?.modifyInterior,
                            lockPeriod: step2CommercialSelected?.lockPeriod,
                            noSeats: step2CommercialSelected?.noSeats,
                          });
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 35,
                        height: 35,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors + 1,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea:
                              step2CommercialSelected?.propertyArea?.plotArea,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: step2CommercialSelected?.noSeats,
                        });
                      }}>
                      <FIcon name="plus" size={18} color={Color.cloudyGrey} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                      }}>
                      Floors No. of Your Property
                    </Text>
                    {/* <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Poppins.Medium,
                          color: Color.red,
                        }}>
                        {noFloorsOnPropertyError}
                      </Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          setFloorVisible(true);
                        }}
                        style={{
                          backgroundColor: Color.white,
                          borderColor: Color.cloudyGrey,
                          borderWidth: 1,
                          padding: 10,
                          borderRadius: 5,
                          // height: 40,
                          width: '100%',
                          marginVertical: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {step2CommercialSelected?.noFloorsOnProperty != '' ? (
                          <Text
                            style={{
                              color: Color.cloudyGrey,
                              flex: 1,
                              fontFamily: Poppins.SemiBold,
                              fontSize: 14,
                              textTransform: 'capitalize',
                            }}>
                            {step2CommercialSelected?.noFloorsOnProperty
                              ?.label ?? 'Select Your Floor'}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              color: Color.cloudyGrey,
                              flex: 1,
                              fontFamily: Poppins.SemiBold,
                              fontSize: 18,
                            }}>
                            {'Select'}
                          </Text>
                        )}
                        <Icon name="caret-down" size={20} color={Color.black} />
                      </TouchableOpacity>
                      <Modal
                        transparent={true}
                        visible={floorVisible}
                        animationType="fade">
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: Color.transparantBlack,
                          }}>
                          <Pressable
                            style={{ flex: 1 }}
                            onPress={() => {
                              setFloorVisible(false);
                            }}
                          />
                          <View
                            style={{
                              backgroundColor: Color.white,
                              flex: 1,
                              padding: 10,
                              borderTopRightRadius: 30,
                              borderTopLeftRadius: 30,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: Color.black,
                                fontWeight: 'bold',
                                marginVertical: 10,
                              }}>
                              Select Your Floors
                            </Text>
                            <Divider style={styles.Divider} />
                            <View
                              style={{
                                marginHorizontal: 20,
                              }}>
                              <ScrollView showsVerticalScrollIndicator={false}>
                                {filteredFloors.map((item, index) => {
                                  return (
                                    <TouchableOpacity
                                      key={index}
                                      onPress={() => {
                                        setStep2CommercialSelected({
                                          pantry:
                                            step2CommercialSelected?.pantry,
                                          washroom:
                                            step2CommercialSelected?.washroom,
                                          totalBuildingFloors:
                                            step2CommercialSelected?.totalBuildingFloors,
                                          noFloorsOnProperty: item,
                                          furnishingDeatils:
                                            step2CommercialSelected?.furnishingDeatils,
                                          propertyArea: {
                                            plotArea:
                                              step2CommercialSelected
                                                ?.propertyArea?.plotArea,
                                            plotlength:
                                              step2CommercialSelected
                                                ?.propertyArea?.plotlength,
                                            plotBreath:
                                              step2CommercialSelected
                                                ?.propertyArea?.plotlength,
                                          },
                                          perWash:
                                            step2CommercialSelected?.perWash,
                                          corShop:
                                            step2CommercialSelected?.corShop,
                                          mainRoadFace:
                                            step2CommercialSelected?.mainRoadFace,
                                          modifyInterior:
                                            step2CommercialSelected?.modifyInterior,
                                          lockPeriod:
                                            step2CommercialSelected?.lockPeriod,
                                          noSeats:
                                            step2CommercialSelected?.noSeats,
                                        });
                                        setFloorVisible(false);
                                      }}>
                                      <View style={{ alignItems: 'center' }}>
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
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property Area
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      value={step2CommercialSelected?.propertyArea?.plotArea}
                      placeholder="Plot Area"
                      keyboardType="number-pad"
                      placeholderTextColor={Color.cloudyGrey}
                      onChangeText={text => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea: text,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: step2CommercialSelected?.noSeats,
                        });
                      }}
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: Color.black,
                        color: Color.black,
                        fontSize: 16,
                        fontFamily: Poppins.Medium,
                      }}
                    />
                    <Dropdown
                      style={{
                        padding: 5,
                        borderRadius: 5,
                        width: 100,
                        position: 'absolute',
                        right: 0,
                      }}
                      placeholderStyle={{
                        fontSize: 16,
                        color: Color.black,
                        marginHorizontal: 10,
                      }}
                      selectedTextStyle={{
                        fontSize: 16,
                        color: Color.black,
                      }}
                      iconStyle={{ width: 20, height: 20 }}
                      itemTextStyle={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                      }}
                      data={plotAreaunit}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select"
                      searchPlaceholder="Search..."
                      value={plotStatus}
                      onChange={item => {
                        setPlotStatus(item);
                      }}
                      renderRightIcon={() => (
                        <Icon
                          style={{ width: 20, height: 20 }}
                          color={Color.black}
                          name="chevron-down"
                          size={20}
                        />
                      )}
                    />
                  </View>
                  <TextInput
                    value={step2CommercialSelected?.propertyArea?.plotlength}
                    placeholder="Plot Length In Yrd(Optional)"
                    placeholderTextColor={Color.cloudyGrey}
                    onChangeText={text => {
                      setStep2CommercialSelected({
                        pantry: step2CommercialSelected?.pantry,
                        washroom: step2CommercialSelected?.washroom,
                        totalBuildingFloors:
                          step2CommercialSelected?.totalBuildingFloors,
                        noFloorsOnProperty:
                          step2CommercialSelected?.noFloorsOnProperty,
                        furnishingDeatils:
                          step2CommercialSelected?.furnishingDeatils,
                        propertyArea: {
                          plotArea:
                            step2CommercialSelected?.propertyArea?.plotArea,
                          plotlength: text,
                          plotBreath:
                            step2CommercialSelected?.propertyArea?.plotBreath,
                        },
                        perWash: step2CommercialSelected?.perWash,
                        corShop: step2CommercialSelected?.corShop,
                        mainRoadFace: step2CommercialSelected?.mainRoadFace,
                        modifyInterior: step2CommercialSelected?.modifyInterior,
                        lockPeriod: step2CommercialSelected?.lockPeriod,
                        noSeats: step2CommercialSelected?.noSeats,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.black,
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.Medium,
                    }}
                  />
                  <TextInput
                    value={step2CommercialSelected?.propertyArea?.plotBreath}
                    placeholder="Plot Breath In Yrd(Optional)"
                    placeholderTextColor={Color.cloudyGrey}
                    onChangeText={text => {
                      setStep2CommercialSelected({
                        pantry: step2CommercialSelected?.pantry,
                        washroom: step2CommercialSelected?.washroom,
                        totalBuildingFloors:
                          step2CommercialSelected?.totalBuildingFloors,
                        noFloorsOnProperty:
                          step2CommercialSelected?.noFloorsOnProperty,
                        furnishingDeatils:
                          step2CommercialSelected?.furnishingDeatils,
                        propertyArea: {
                          plotArea:
                            step2CommercialSelected?.propertyArea?.plotArea,
                          plotlength:
                            step2CommercialSelected?.propertyArea?.plotlength,
                          plotBreath: text,
                        },
                        perWash: step2CommercialSelected?.perWash,
                        corShop: step2CommercialSelected?.corShop,
                        mainRoadFace: step2CommercialSelected?.mainRoadFace,
                        modifyInterior: step2CommercialSelected?.modifyInterior,
                        lockPeriod: step2CommercialSelected?.lockPeriod,
                        noSeats: step2CommercialSelected?.noSeats,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.black,
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.Medium,
                    }}
                  />
                </View>
              </View>
            ) : step1RentSelectedItem?.commercialPropType?.value == 'plot' &&
              step1SelectedItem?.post?.value == 'rent' ? (
              <View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property Area
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      value={step2CommercialSelected?.propertyArea?.plotArea}
                      placeholder="Plot Area"
                      keyboardType="number-pad"
                      placeholderTextColor={Color.cloudyGrey}
                      onChangeText={text => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea: text,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: step2CommercialSelected?.noSeats,
                        });
                      }}
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: Color.black,
                        color: Color.black,
                        fontSize: 16,
                        fontFamily: Poppins.Medium,
                      }}
                    />
                    <Dropdown
                      style={{
                        padding: 5,
                        borderRadius: 5,
                        width: 100,
                        position: 'absolute',
                        right: 0,
                      }}
                      placeholderStyle={{
                        fontSize: 16,
                        color: Color.black,
                        marginHorizontal: 10,
                      }}
                      selectedTextStyle={{
                        fontSize: 16,
                        color: Color.black,
                      }}
                      iconStyle={{ width: 20, height: 20 }}
                      itemTextStyle={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                      }}
                      data={plotAreaunit}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select"
                      searchPlaceholder="Search..."
                      value={plotStatus}
                      onChange={item => {
                        setPlotStatus(item);
                      }}
                      renderRightIcon={() => (
                        <Icon
                          style={{ width: 20, height: 20 }}
                          color={Color.black}
                          name="chevron-down"
                          size={20}
                        />
                      )}
                    />
                  </View>
                  <TextInput
                    value={step2CommercialSelected?.propertyArea?.plotlength}
                    placeholder="Plot Length In Yrd(Optional)"
                    placeholderTextColor={Color.cloudyGrey}
                    onChangeText={text => {
                      setStep2CommercialSelected({
                        pantry: step2CommercialSelected?.pantry,
                        washroom: step2CommercialSelected?.washroom,
                        totalBuildingFloors:
                          step2CommercialSelected?.totalBuildingFloors,
                        noFloorsOnProperty:
                          step2CommercialSelected?.noFloorsOnProperty,
                        furnishingDeatils:
                          step2CommercialSelected?.furnishingDeatils,
                        propertyArea: {
                          plotArea:
                            step2CommercialSelected?.propertyArea?.plotArea,
                          plotlength: text,
                          plotBreath:
                            step2CommercialSelected?.propertyArea?.plotBreath,
                        },
                        perWash: step2CommercialSelected?.perWash,
                        corShop: step2CommercialSelected?.corShop,
                        mainRoadFace: step2CommercialSelected?.mainRoadFace,
                        modifyInterior: step2CommercialSelected?.modifyInterior,
                        lockPeriod: step2CommercialSelected?.lockPeriod,
                        noSeats: step2CommercialSelected?.noSeats,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.black,
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.Medium,
                    }}
                  />
                  <TextInput
                    value={step2CommercialSelected?.propertyArea?.plotBreath}
                    placeholder="Plot Breath In Yrd(Optional)"
                    placeholderTextColor={Color.cloudyGrey}
                    onChangeText={text => {
                      setStep2CommercialSelected({
                        pantry: step2CommercialSelected?.pantry,
                        washroom: step2CommercialSelected?.washroom,
                        totalBuildingFloors:
                          step2CommercialSelected?.totalBuildingFloors,
                        noFloorsOnProperty:
                          step2CommercialSelected?.noFloorsOnProperty,
                        furnishingDeatils:
                          step2CommercialSelected?.furnishingDeatils,
                        propertyArea: {
                          plotArea:
                            step2CommercialSelected?.propertyArea?.plotArea,
                          plotlength:
                            step2CommercialSelected?.propertyArea?.plotlength,
                          plotBreath: text,
                        },
                        perWash: step2CommercialSelected?.perWash,
                        corShop: step2CommercialSelected?.corShop,
                        mainRoadFace: step2CommercialSelected?.mainRoadFace,
                        modifyInterior: step2CommercialSelected?.modifyInterior,
                        lockPeriod: step2CommercialSelected?.lockPeriod,
                        noSeats: step2CommercialSelected?.noSeats,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.black,
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.Medium,
                    }}
                  />
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property facing
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
                      {PropertyFacing.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2SelectedItem?.propertyFacing?.id ==
                                  item?.id
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
                                step2SelectedItem?.propertyFacing?.id ==
                                  item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                              flexDirection: 'row',
                            }}
                            onPress={() => {
                              setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing: item,
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
              </View>
            ) : (
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Property Features
                </Text>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Plot Specification{' '}
                    <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                      (Optional)
                    </Text>
                  </Text>
                  <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setPlotSpecVisible(true);
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
                        {common_fn.formatText(step2SelectedItem?.plotSpec?.plotAllowed?.value) ??
                          'Number Of Floors Allowed For Contruction'}
                      </Text>
                      <Icon name="caret-down" size={20} color={Color.black} />
                    </TouchableOpacity>
                    <Modal
                      transparent={true}
                      visible={PlotSpecVisible}
                      animationType="fade">
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: Color.transparantBlack,
                        }}>
                        <Pressable
                          style={{ flex: 1 }}
                          onPress={() => {
                            setPlotSpecVisible(false);
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: Color.white,
                            flex: 1,
                            padding: 10,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: Color.cloudyGrey,
                              fontWeight: 'bold',
                              marginVertical: 10,
                            }}>
                            Select Number Of Floors Allowed For Contruction
                          </Text>
                          <Divider style={styles.Divider} />
                          <View
                            style={{
                              marginHorizontal: 20,
                            }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                              {PlotSpec.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                      setStep2SelectedItem({
                                        bedrooms: step2SelectedItem.bedrooms,
                                        bathrooms: step2SelectedItem.bathrooms,
                                        balconies: step2SelectedItem.balconies,
                                        totalBuildingFloors:
                                          step2SelectedItem.totalBuildingFloors,
                                        noFloorsOnProperty:
                                          step2SelectedItem.noFloorsOnProperty,
                                        furnishingDeatils:
                                          step2SelectedItem.furnishingDeatils,
                                        otherRooms:
                                          step2SelectedItem.otherRooms,
                                        availability:
                                          step2SelectedItem.availability,
                                        ageOfProperty:
                                          step2SelectedItem.ageOfProperty,
                                        completionTime:
                                          step2SelectedItem.completionTime,
                                        plotSpec: {
                                          plotAllowed: item,
                                          noOfopenSide:
                                            step2SelectedItem?.plotSpec
                                              ?.noOfopenSide,
                                        },
                                        plotFacing:
                                          step2SelectedItem?.plotFacing,
                                        constructionDone:
                                          step2SelectedItem?.constructionDone,
                                        boundryWall:
                                          step2SelectedItem?.boundryWall,
                                        gatedColony:
                                          step2SelectedItem?.gatedColony,
                                        propertyArea: {
                                          plotArea:
                                            step2SelectedItem?.propertyArea
                                              ?.plotArea,
                                          plotlength:
                                            step2SelectedItem?.propertyArea
                                              ?.plotlength,
                                          plotBreath:
                                            step2SelectedItem?.propertyArea
                                              ?.plotBreath,
                                        },
                                        ApprovalAuthority:
                                          step2SelectedItem?.ApprovalAuthority,
                                        propertyFacing:
                                          step2SelectedItem?.propertyFacing,
                                      });
                                      setPlotSpecVisible(false);
                                    }}>
                                    <View style={{ alignItems: 'center' }}>
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
                    <TouchableOpacity
                      onPress={() => {
                        setNOPlotSidesVisible(true);
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
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          color: Color.cloudyGrey,
                          flex: 1,
                          fontFamily: Poppins.SemiBold,
                          fontSize: 14,
                          textTransform: 'capitalize',
                        }}>
                        {common_fn.formatText(step2SelectedItem?.plotSpec?.noOfopenSide?.value) ??
                          'Number Of Open Sides'}
                      </Text>
                      <Icon name="caret-down" size={20} color={Color.black} />
                    </TouchableOpacity>
                    <Modal
                      transparent={true}
                      visible={NOPlotSidesVisible}
                      animationType="fade">
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: Color.transparantBlack,
                        }}>
                        <Pressable
                          style={{ flex: 1 }}
                          onPress={() => {
                            setNOPlotSidesVisible(false);
                          }}
                        />
                        <View
                          style={{
                            backgroundColor: Color.white,
                            flex: 1,
                            padding: 10,
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: Color.cloudyGrey,
                              fontWeight: 'bold',
                              marginVertical: 10,
                            }}>
                            Select Number Of Floors Allowed For Contruction
                          </Text>
                          <Divider style={styles.Divider} />
                          <View
                            style={{
                              marginHorizontal: 20,
                            }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                              {PlotSpec.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                      setStep2SelectedItem({
                                        bedrooms: step2SelectedItem.bedrooms,
                                        bathrooms: step2SelectedItem.bathrooms,
                                        balconies: step2SelectedItem.balconies,
                                        totalBuildingFloors:
                                          step2SelectedItem.totalBuildingFloors,
                                        noFloorsOnProperty:
                                          step2SelectedItem.noFloorsOnProperty,
                                        furnishingDeatils:
                                          step2SelectedItem.furnishingDeatils,
                                        otherRooms:
                                          step2SelectedItem.otherRooms,
                                        availability:
                                          step2SelectedItem.availability,
                                        ageOfProperty:
                                          step2SelectedItem.ageOfProperty,
                                        completionTime:
                                          step2SelectedItem.completionTime,
                                        plotSpec: {
                                          plotAllowed:
                                            step2SelectedItem?.plotSpec
                                              ?.plotAllowed,
                                          noOfopenSide: item,
                                        },
                                        plotFacing:
                                          step2SelectedItem?.plotFacing,
                                        constructionDone:
                                          step2SelectedItem?.constructionDone,
                                        boundryWall:
                                          step2SelectedItem?.boundryWall,
                                        gatedColony:
                                          step2SelectedItem?.gatedColony,
                                        propertyArea: {
                                          plotArea:
                                            step2SelectedItem?.propertyArea
                                              ?.plotArea,
                                          plotlength:
                                            step2SelectedItem?.propertyArea
                                              ?.plotlength,
                                          plotBreath:
                                            step2SelectedItem?.propertyArea
                                              ?.plotBreath,
                                        },
                                        ApprovalAuthority:
                                          step2SelectedItem?.ApprovalAuthority,
                                        propertyFacing:
                                          step2SelectedItem?.propertyFacing,
                                      });
                                      setNOPlotSidesVisible(false);
                                    }}>
                                    <View style={{ alignItems: 'center' }}>
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
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property facing
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
                      {PropertyFacing.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                step2SelectedItem?.propertyFacing?.id ==
                                  item?.id
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
                                step2SelectedItem?.propertyFacing?.id ==
                                  item?.id
                                  ? Color.primary
                                  : Color.lightgrey,
                              borderWidth: 1,
                              flexDirection: 'row',
                            }}
                            onPress={() => {
                              setStep2SelectedItem({
                                bedrooms: step2SelectedItem.bedrooms,
                                bathrooms: step2SelectedItem.bathrooms,
                                balconies: step2SelectedItem.balconies,
                                totalBuildingFloors:
                                  step2SelectedItem.totalBuildingFloors,
                                noFloorsOnProperty:
                                  step2SelectedItem.noFloorsOnProperty,
                                furnishingDeatils:
                                  step2SelectedItem.furnishingDeatils,
                                otherRooms: step2SelectedItem.otherRooms,
                                availability: step2SelectedItem.availability,
                                ageOfProperty: step2SelectedItem.ageOfProperty,
                                completionTime:
                                  step2SelectedItem.completionTime,
                                plotSpec: {
                                  plotAllowed:
                                    step2SelectedItem?.plotSpec?.plotAllowed,
                                  noOfopenSide:
                                    step2SelectedItem?.plotSpec?.noOfopenSide,
                                },
                                plotFacing: step2SelectedItem?.plotFacing,
                                constructionDone:
                                  step2SelectedItem?.constructionDone,
                                boundryWall: step2SelectedItem?.boundryWall,
                                gatedColony: step2SelectedItem?.gatedColony,
                                propertyArea: {
                                  plotArea:
                                    step2SelectedItem?.propertyArea?.plotArea,
                                  plotlength:
                                    step2SelectedItem?.propertyArea?.plotlength,
                                  plotBreath:
                                    step2SelectedItem?.propertyArea?.plotBreath,
                                },
                                ApprovalAuthority:
                                  step2SelectedItem?.ApprovalAuthority,
                                propertyFacing: item,
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
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Width of Road Facing the Plot{' '}
                    <Text style={{ fontSize: 14, color: Color.lightgrey }}>
                      (Optional)
                    </Text>
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      placeholder="Road Width"
                      placeholderTextColor={Color.cloudyGrey}
                      value={step2SelectedItem?.plotFacing}
                      onChangeText={text => {
                        setStep2SelectedItem({
                          bedrooms: step2SelectedItem.bedrooms,
                          bathrooms: step2SelectedItem.bathrooms,
                          balconies: step2SelectedItem.balconies,
                          totalBuildingFloors:
                            step2SelectedItem.totalBuildingFloors,
                          noFloorsOnProperty:
                            step2SelectedItem.noFloorsOnProperty,
                          furnishingDeatils:
                            step2SelectedItem.furnishingDeatils,
                          otherRooms: step2SelectedItem.otherRooms,
                          availability: step2SelectedItem.availability,
                          ageOfProperty: step2SelectedItem.ageOfProperty,
                          completionTime: step2SelectedItem.completionTime,
                          plotSpec: {
                            plotAllowed:
                              step2SelectedItem?.plotSpec?.plotAllowed,
                            noOfopenSide:
                              step2SelectedItem?.plotSpec?.noOfopenSide,
                          },
                          plotFacing: text,
                          constructionDone: step2SelectedItem?.constructionDone,
                          boundryWall: step2SelectedItem?.boundryWall,
                          gatedColony: step2SelectedItem?.gatedColony,
                          propertyArea: {
                            plotArea: step2SelectedItem?.propertyArea?.plotArea,
                            plotlength:
                              step2SelectedItem?.propertyArea?.plotlength,
                            plotBreath:
                              step2SelectedItem?.propertyArea?.plotBreath,
                          },
                          ApprovalAuthority:
                            step2SelectedItem?.ApprovalAuthority,
                          propertyFacing: step2SelectedItem?.propertyFacing,
                        });
                      }}
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: Color.black,
                        color: Color.black,
                        width: '70%',
                      }}
                    />
                    <Text
                      style={{
                        color: Color.black,
                        fontSize: 16,
                        fontFamily: Poppins.SemiBold,
                      }}>
                      Meters
                    </Text>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Boundry Wall Made
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
                          setStep2SelectedItem({
                            bedrooms: step2SelectedItem.bedrooms,
                            bathrooms: step2SelectedItem.bathrooms,
                            balconies: step2SelectedItem.balconies,
                            totalBuildingFloors:
                              step2SelectedItem.totalBuildingFloors,
                            noFloorsOnProperty:
                              step2SelectedItem.noFloorsOnProperty,
                            furnishingDeatils:
                              step2SelectedItem.furnishingDeatils,
                            otherRooms: step2SelectedItem.otherRooms,
                            availability: step2SelectedItem.availability,
                            ageOfProperty: step2SelectedItem.ageOfProperty,
                            completionTime: step2SelectedItem.completionTime,
                            plotSpec: {
                              plotAllowed:
                                step2SelectedItem?.plotSpec?.plotAllowed,
                              noOfopenSide:
                                step2SelectedItem?.plotSpec?.noOfopenSide,
                            },
                            plotFacing: step2SelectedItem?.plotFacing,
                            constructionDone:
                              step2SelectedItem?.constructionDone,
                            boundryWall: item,
                            gatedColony: step2SelectedItem?.gatedColony,
                            propertyArea: {
                              plotArea:
                                step2SelectedItem?.propertyArea?.plotArea,
                              plotlength:
                                step2SelectedItem?.propertyArea?.plotlength,
                              plotBreath:
                                step2SelectedItem?.propertyArea?.plotBreath,
                            },
                            ApprovalAuthority:
                              step2SelectedItem?.ApprovalAuthority,
                            propertyFacing: step2SelectedItem?.propertyFacing,
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
                            step2SelectedItem?.boundryWall?.id === item?.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          size={20}
                          color={
                            step2SelectedItem?.boundryWall?.id === item?.id
                              ? Color.primary
                              : Color.black
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Property Area
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      value={step2CommercialSelected?.propertyArea?.plotArea}
                      placeholder="Plot Area"
                      keyboardType="number-pad"
                      placeholderTextColor={Color.cloudyGrey}
                      onChangeText={text => {
                        setStep2CommercialSelected({
                          pantry: step2CommercialSelected?.pantry,
                          washroom: step2CommercialSelected?.washroom,
                          totalBuildingFloors:
                            step2CommercialSelected?.totalBuildingFloors,
                          noFloorsOnProperty:
                            step2CommercialSelected?.noFloorsOnProperty,
                          furnishingDeatils:
                            step2CommercialSelected?.furnishingDeatils,
                          propertyArea: {
                            plotArea: text,
                            plotlength:
                              step2CommercialSelected?.propertyArea?.plotlength,
                            plotBreath:
                              step2CommercialSelected?.propertyArea?.plotlength,
                          },
                          perWash: step2CommercialSelected?.perWash,
                          corShop: step2CommercialSelected?.corShop,
                          mainRoadFace: step2CommercialSelected?.mainRoadFace,
                          modifyInterior:
                            step2CommercialSelected?.modifyInterior,
                          lockPeriod: step2CommercialSelected?.lockPeriod,
                          noSeats: step2CommercialSelected?.noSeats,
                        });
                      }}
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: Color.black,
                        color: Color.black,
                        fontSize: 16,
                        fontFamily: Poppins.Medium,
                      }}
                    />
                    <Dropdown
                      style={{
                        padding: 5,
                        borderRadius: 5,
                        width: 100,
                        position: 'absolute',
                        right: 0,
                      }}
                      placeholderStyle={{
                        fontSize: 16,
                        color: Color.black,
                        marginHorizontal: 10,
                      }}
                      selectedTextStyle={{
                        fontSize: 16,
                        color: Color.black,
                      }}
                      iconStyle={{ width: 20, height: 20 }}
                      itemTextStyle={{
                        fontSize: 16,
                        color: Color.cloudyGrey,
                      }}
                      data={plotAreaunit}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select"
                      searchPlaceholder="Search..."
                      value={plotStatus}
                      onChange={item => {
                        setPlotStatus(item);
                      }}
                      renderRightIcon={() => (
                        <Icon
                          style={{ width: 20, height: 20 }}
                          color={Color.black}
                          name="chevron-down"
                          size={20}
                        />
                      )}
                    />
                  </View>
                  <TextInput
                    value={step2CommercialSelected?.propertyArea?.plotlength}
                    placeholder="Plot Length In Yrd(Optional)"
                    placeholderTextColor={Color.cloudyGrey}
                    keyboardType="number-pad"
                    onChangeText={text => {
                      setStep2CommercialSelected({
                        pantry: step2CommercialSelected?.pantry,
                        washroom: step2CommercialSelected?.washroom,
                        totalBuildingFloors:
                          step2CommercialSelected?.totalBuildingFloors,
                        noFloorsOnProperty:
                          step2CommercialSelected?.noFloorsOnProperty,
                        furnishingDeatils:
                          step2CommercialSelected?.furnishingDeatils,
                        propertyArea: {
                          plotArea:
                            step2CommercialSelected?.propertyArea?.plotArea,
                          plotlength: text,
                          plotBreath:
                            step2CommercialSelected?.propertyArea?.plotBreath,
                        },
                        perWash: step2CommercialSelected?.perWash,
                        corShop: step2CommercialSelected?.corShop,
                        mainRoadFace: step2CommercialSelected?.mainRoadFace,
                        modifyInterior: step2CommercialSelected?.modifyInterior,
                        lockPeriod: step2CommercialSelected?.lockPeriod,
                        noSeats: step2CommercialSelected?.noSeats,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.black,
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.Medium,
                    }}
                  />
                  <TextInput
                    value={step2CommercialSelected?.propertyArea?.plotBreath}
                    placeholder="Plot Breath In Yrd(Optional)"
                    placeholderTextColor={Color.cloudyGrey}
                    keyboardType="number-pad"
                    onChangeText={text => {
                      setStep2CommercialSelected({
                        pantry: step2CommercialSelected?.pantry,
                        washroom: step2CommercialSelected?.washroom,
                        totalBuildingFloors:
                          step2CommercialSelected?.totalBuildingFloors,
                        noFloorsOnProperty:
                          step2CommercialSelected?.noFloorsOnProperty,
                        furnishingDeatils:
                          step2CommercialSelected?.furnishingDeatils,
                        propertyArea: {
                          plotArea:
                            step2CommercialSelected?.propertyArea?.plotArea,
                          plotlength:
                            step2CommercialSelected?.propertyArea?.plotlength,
                          plotBreath: text,
                        },
                        perWash: step2CommercialSelected?.perWash,
                        corShop: step2CommercialSelected?.corShop,
                        mainRoadFace: step2CommercialSelected?.mainRoadFace,
                        modifyInterior: step2CommercialSelected?.modifyInterior,
                        lockPeriod: step2CommercialSelected?.lockPeriod,
                        noSeats: step2CommercialSelected?.noSeats,
                      });
                    }}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Color.black,
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.Medium,
                    }}
                  />
                </View>
                {/* <View style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontWeight: 'bold',
                      }}>
                      Approval Authority
                    </Text>
                  </View>
                  {Approved_Authority?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={{
                          backgroundColor:
                            step2SelectedItem?.ApprovalAuthority?.id ===
                              item?.id
                              ? Color.primary
                              : Color.white,
                          borderRadius: 50,
                          marginVertical: 10,
                          padding: 10,
                          marginHorizontal: 5,
                          borderColor: Color.lightgrey,
                          borderWidth: 1,
                          width: 100,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          step2SelectedItem?.ApprovalAuthority?.id == item?.id
                            ? setStep2SelectedItem({
                              bedrooms: step2SelectedItem.bedrooms,
                              bathrooms: step2SelectedItem.bathrooms,
                              balconies: step2SelectedItem.balconies,
                              totalBuildingFloors:
                                step2SelectedItem.totalBuildingFloors,
                              noFloorsOnProperty:
                                step2SelectedItem.noFloorsOnProperty,
                              furnishingDeatils:
                                step2SelectedItem.furnishingDeatils,
                              otherRooms: step2SelectedItem.otherRooms,
                              availability: step2SelectedItem.availability,
                              ageOfProperty: step2SelectedItem.ageOfProperty,
                              completionTime:
                                step2SelectedItem.completionTime,
                              plotSpec: {
                                plotAllowed:
                                  step1SelectedItem?.plotSpec?.plotAllowed,
                                noOfopenSide:
                                  step2SelectedItem?.plotSpec?.noOfopenSide,
                              },
                              plotFacing: step2SelectedItem?.plotFacing,
                              constructionDone:
                                step2SelectedItem?.constructionDone,
                              boundryWall: step2SelectedItem?.boundryWall,
                              gatedColony: step2SelectedItem?.gatedColony,
                              propertyArea: {
                                plotArea:
                                  step2SelectedItem?.propertyArea?.plotArea,
                                plotlength:
                                  step2SelectedItem?.propertyArea?.plotlength,
                                plotBreath:
                                  step2SelectedItem?.propertyArea?.plotBreath,
                              },
                              ApprovalAuthority: null,
                              propertyFacing:
                                step2SelectedItem?.propertyFacing,
                            })
                            : setStep2SelectedItem({
                              bedrooms: step2SelectedItem.bedrooms,
                              bathrooms: step2SelectedItem.bathrooms,
                              balconies: step2SelectedItem.balconies,
                              totalBuildingFloors:
                                step2SelectedItem.totalBuildingFloors,
                              noFloorsOnProperty:
                                step2SelectedItem.noFloorsOnProperty,
                              furnishingDeatils:
                                step2SelectedItem.furnishingDeatils,
                              otherRooms: step2SelectedItem.otherRooms,
                              availability: step2SelectedItem.availability,
                              ageOfProperty: step2SelectedItem.ageOfProperty,
                              completionTime:
                                step2SelectedItem.completionTime,
                              plotSpec: {
                                plotAllowed:
                                  step1SelectedItem?.plotSpec?.plotAllowed,
                                noOfopenSide:
                                  step2SelectedItem?.plotSpec?.noOfopenSide,
                              },
                              plotFacing: step2SelectedItem?.plotFacing,
                              constructionDone:
                                step2SelectedItem?.constructionDone,
                              boundryWall: step2SelectedItem?.boundryWall,
                              gatedColony: step2SelectedItem?.gatedColony,
                              propertyArea: {
                                plotArea:
                                  step2SelectedItem?.propertyArea?.plotArea,
                                plotlength:
                                  step2SelectedItem?.propertyArea?.plotlength,
                                plotBreath:
                                  step2SelectedItem?.propertyArea?.plotBreath,
                              },
                              ApprovalAuthority: item,
                              propertyFacing:
                                step2SelectedItem?.propertyFacing,
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
                              color:
                                step2SelectedItem?.ApprovalAuthority?.id ===
                                  item?.id
                                  ? Color.white
                                  : Color.black,
                              fontWeight: 'bold',
                              marginHorizontal: 10,
                            }}>
                            TNHB
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View> */}
              </View>
            )}
            <Button
              title={'NEXT'}
              buttonStyle={{
                backgroundColor: Color.primary,
                height: 45,
                marginVertical: 20,
              }}
              onPress={() => {
                step2Data(navigation);
                checkTextInput();
              }}
            />
          </View>
        ) : (
          <View style={{ marginVertical: 10 }}>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                PG Details
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontWeight: 'bold',
                }}>
                Area, Furnishings and Room details
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
                  Select Available Room Categories
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
              <View style={{
                flexDirection: 'row', alignItems: 'center',
                flexWrap: "wrap",
              }}>
                {PGbedrooms.map((item, index) => {
                  const bedIcons = Array.from({ length: item?.id }, (_, i) => (
                    <Icon
                      key={i}
                      name='bed'
                      size={20}
                      color={PGbedroomsSelectedItem.includes(item?.id) ? Color.primary : Color.black}
                    />
                  ));
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          PGbedroomsSelectedItem.includes(item?.id)
                            ? '#8C193F20'
                            : Color.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 50,
                        width: width / 2.5,
                        marginVertical: 10,
                        borderColor:
                          PGbedroomsSelectedItem.includes(item?.id)
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                        marginVertical: 20,
                      }}
                      onPress={() => {
                        handlePGbedroomsPress(item.id);
                      }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {bedIcons}
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            PGbedroomsSelectedItem.includes(item?.id)
                              ? Color.primary
                              : Color.black,
                          fontWeight: 'bold',
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  No.of Single Rooms In Your PG
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {single_rooms.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          PgStep2Item?.no_single_rooms?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 50,
                        width: 40,
                        height: 40,
                        marginVertical: 10,
                        borderColor:
                          PgStep2Item?.no_single_rooms?.id == item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setPgStep2Item({
                          bedrooms: PgStep2Item?.bedrooms,
                          no_single_rooms: item,
                          monthly_rent: {
                            single_bed: PgStep2Item?.monthly_rent?.single_bed,
                            double_bed: PgStep2Item?.monthly_rent?.double_bed,
                            triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                            four_bed: PgStep2Item?.monthly_rent?.four_bed
                          },
                          security_deposit: {
                            single_bed: PgStep2Item?.security_deposit?.single_bed,
                            double_bed: PgStep2Item?.security_deposit?.double_bed,
                            triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                            four_bed: PgStep2Item?.security_deposit?.four_bed
                          },
                          room_facility: PgStep2Item?.room_facility,
                          gender: PgStep2Item?.gender,
                          tententPreferences: PgStep2Item?.tententPreferences,
                          pg_rules: PgStep2Item?.pg_rules,
                          notice_period: PgStep2Item?.notice_period,
                          gate_closing_time: PgStep2Item?.gate_closing_time,
                          service_avail: PgStep2Item?.service_avail,
                          food_provide: PgStep2Item?.food_provide,
                          veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                          food_charges: PgStep2Item?.food_charges,
                          parking_avail: PgStep2Item?.parking_avail
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            PgStep2Item?.no_single_rooms?.id == item?.id
                              ? Color.primary
                              : Color.black,
                          fontWeight: 'bold',
                          marginVertical: 10,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {PgStep2Item?.bedrooms?.length > 0 &&
              <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Monthly Rent for Bed
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
                {common_fn.getValueByTitle(PgStep2Item?.bedrooms, "single") &&
                  <TextInput
                    placeholder="Monthly rent single bed (₹)..."
                    placeholderTextColor={Color.cloudyGrey}
                    value={PgStep2Item?.monthly_rent?.single_bed}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: value,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}
                    style={{
                      flex: 1,
                      color: Color.black,
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}
                  />
                }
                {common_fn.getValueByTitle(PgStep2Item?.bedrooms, "double") &&
                  <TextInput
                    placeholder="Monthly rent double bed (₹)"
                    placeholderTextColor={Color.cloudyGrey}
                    value={PgStep2Item?.monthly_rent?.double_bed}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: value,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}
                    style={{
                      flex: 1,
                      color: Color.black,
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}
                  />
                }
                {common_fn.getValueByTitle(PgStep2Item?.bedrooms, "triple") &&
                  <TextInput
                    placeholder="Monthly rent triple bed (₹)..."
                    placeholderTextColor={Color.cloudyGrey}
                    value={PgStep2Item?.monthly_rent?.triple_bed}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: value,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}
                    style={{
                      flex: 1,
                      color: Color.black,
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}
                  />
                }
                {common_fn.getValueByTitle(PgStep2Item?.bedrooms, "four") &&
                  <TextInput
                    placeholder="Monthly rent four bed (₹)..."
                    placeholderTextColor={Color.cloudyGrey}
                    value={PgStep2Item?.monthly_rent?.four_bed}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: value
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}
                    style={{
                      flex: 1,
                      color: Color.black,
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}
                  />
                }
              </View>
            }
            {PgStep2Item?.bedrooms?.length > 0 &&
              <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontWeight: 'bold',
                    }}>
                    Security Deposit Per Bed (₹)
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
                {common_fn.getValueByTitle(PgStep2Item?.bedrooms, "single") &&
                  <TextInput
                    placeholder="Security deposit single bed (₹)"
                    placeholderTextColor={Color.cloudyGrey}
                    value={PgStep2Item?.security_deposit?.single_bed}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: value,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}
                    style={{
                      flex: 1,
                      color: Color.black,
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}
                  />
                }
                {common_fn.getValueByTitle(PgStep2Item?.bedrooms, "double") &&
                  <TextInput
                    placeholder="Security deposit double bed (₹)..."
                    placeholderTextColor={Color.cloudyGrey}
                    value={PgStep2Item?.security_deposit?.double_bed}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: value,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}
                    style={{
                      flex: 1,
                      color: Color.black,
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}
                  />
                }
                {common_fn.getValueByTitle(PgStep2Item?.bedrooms, "triple") &&
                  <TextInput
                    placeholder="Security deposit triple bed (₹)..."
                    placeholderTextColor={Color.cloudyGrey}
                    value={PgStep2Item?.security_deposit?.triple_bed}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: value,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}
                    style={{
                      flex: 1,
                      color: Color.black,
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}
                  />
                }
                {common_fn.getValueByTitle(PgStep2Item?.bedrooms, "four") &&
                  <TextInput
                    placeholder="Security deposit four bed (₹)..."
                    placeholderTextColor={Color.cloudyGrey}
                    value={PgStep2Item?.security_deposit?.four_bed}
                    textAlignVertical="top"
                    keyboardType="number-pad"
                    onChangeText={value => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: value
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}
                    style={{
                      flex: 1,
                      color: Color.black,
                      padding: 10,
                      height: 40,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      marginVertical: 5,
                      borderRadius: 5,
                    }}
                  />
                }
              </View>
            }

            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Preferred Gender
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
              {gender.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}
                    onPress={() => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: item,
                        tententPreferences: PgStep2Item?.tententPreferences,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail
                      });
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Poppins.Medium,
                      }}>
                      {item.title}
                    </Text>
                    <Icon
                      name={
                        PgStep2Item.gender?.id === item.id
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={20}
                      color={
                        PgStep2Item.gender?.id === item.id
                          ? Color.primary
                          : Color.black
                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                Amenities
              </Text>
              <View style={{ marginVertical: 10 }}>
                {roomFacility.map((item, index) => {
                  return (
                    <RightCheckBox
                      key={index}
                      label={item.title}
                      checked={room_facilityItem.includes(item.id)}
                      onPress={() => handleRoomFacilityItem(item.id)}
                    />
                  );
                })}
              </View>
            </View>


            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Set Your Tenant Preferrences
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
              {tententPreferences.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}
                    onPress={() => {
                      setPgStep2Item({
                        bedrooms: PgStep2Item?.bedrooms,
                        no_single_rooms: PgStep2Item?.no_single_rooms,
                        monthly_rent: {
                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                        },
                        security_deposit: {
                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                          four_bed: PgStep2Item?.security_deposit?.four_bed
                        },
                        room_facility: PgStep2Item?.room_facility,
                        gender: PgStep2Item?.gender,
                        tententPreferences: item,
                        pg_rules: PgStep2Item?.pg_rules,
                        notice_period: PgStep2Item?.notice_period,
                        gate_closing_time: PgStep2Item?.gate_closing_time,
                        service_avail: PgStep2Item?.service_avail,
                        food_provide: PgStep2Item?.food_provide,
                        veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                        food_charges: PgStep2Item?.food_charges,
                        parking_avail: PgStep2Item?.parking_avail,
                      });
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Poppins.Medium,
                      }}>
                      {item.title}
                    </Text>
                    <Icon
                      name={
                        PgStep2Item.tententPreferences?.id === item.id
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={20}
                      color={
                        PgStep2Item.tententPreferences?.id === item.id
                          ? Color.primary
                          : Color.black
                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  PG Rules
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
              {PgRulesData.map((item, index) => {
                return (
                  <RightCheckBox
                    key={index}
                    label={item.title}
                    checked={pg_rulesItem.includes(item.id)}
                    onPress={() => handlePGRulesItem(item.id)}
                  />
                );
              })}
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Select Notice Period
                </Text>
                <Text
                  style={{ color: Color.red, marginHorizontal: 5, fontSize: 20 }}>
                  *
                </Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setNoticeVisible(true);
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
                    {PgStep2Item?.notice_period?.value?.length > 0
                      ? common_fn.formatText(PgStep2Item?.notice_period?.value)
                      : 'Select your Period'}
                  </Text>
                  <Icon name="caret-down" size={20} color={Color.black} />
                </TouchableOpacity>
                <Modal
                  transparent={true}
                  visible={noticeVisible}
                  animationType="fade">
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: Color.transparantBlack,
                    }}>
                    <Pressable
                      style={{ flex: 1 }}
                      onPress={() => {
                        setNoticeVisible(false);
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
                          {noticePeriodData.map((item, index) => {
                            return (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  setPgStep2Item({
                                    bedrooms: PgStep2Item?.bedrooms,
                                    no_single_rooms:
                                      PgStep2Item?.no_single_rooms,
                                    monthly_rent: {
                                      single_bed: PgStep2Item?.monthly_rent?.single_bed,
                                      double_bed: PgStep2Item?.monthly_rent?.double_bed,
                                      triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                                      four_bed: PgStep2Item?.monthly_rent?.four_bed
                                    },
                                    security_deposit: {
                                      single_bed: PgStep2Item?.security_deposit?.single_bed,
                                      double_bed: PgStep2Item?.security_deposit?.double_bed,
                                      triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                                      four_bed: PgStep2Item?.security_deposit?.four_bed
                                    },
                                    room_facility: PgStep2Item?.room_facility,
                                    gender: PgStep2Item?.gender,
                                    tententPreferences:
                                      PgStep2Item?.tententPreferences,
                                    pg_rules: PgStep2Item?.pg_rules,
                                    notice_period: item,
                                    gate_closing_time:
                                      PgStep2Item?.gate_closing_time,
                                    service_avail: PgStep2Item?.service_avail,
                                    food_provide: PgStep2Item?.food_provide,
                                    veg_non_veg_food:
                                      PgStep2Item?.veg_non_veg_food,
                                    food_charges: PgStep2Item?.food_charges,
                                    parking_avail: PgStep2Item?.parking_avail,
                                  });
                                  setNoticeVisible(false);
                                }}>
                                <View style={{ alignItems: 'center' }}>
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
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Gate Closing
                </Text>
                <Text
                  style={{
                    color: Color.red,
                    marginHorizontal: 5,
                    fontSize: 20,
                  }}>
                  *
                </Text>
                <View style={{ flex: 1 }}>
                  <Switch
                    value={tenentChecked}
                    onValueChange={() => {
                      setTenentChecked(!tenentChecked);
                    }}
                  />
                </View>
              </View>
              {tenentChecked && (
                <View style={{ marginVertical: 10 }}>
                  {/* <Text
                    style={{
                      color: Color.cloudyGrey,
                      marginHorizontal: 5,
                      fontSize: 14,
                    }}>
                    Gate Closing Time
                  </Text> */}
                  <TouchableOpacity
                    onPress={() => {
                      setGateVisible(true);
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
                      {PgStep2Item?.gate_closing_time != null
                        ? PgStep2Item?.gate_closing_time?.toLocaleTimeString()
                        : 'Select Time'}
                    </Text>
                    <Icon name="caret-down" size={20} color={Color.black} />
                  </TouchableOpacity>
                  <View
                    style={{
                      padding: 20,
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <DateTimePickerModal
                      date={new Date()}
                      isVisible={gateVisible}
                      mode="time"
                      is24Hour
                      locale="en_GB"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                  {/* <Modal
                    transparent={true}
                    visible={gateVisible}
                    animationType="fade">
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: Color.transparantBlack,
                      }}>
                      <Pressable
                        style={{ flex: 1 }}
                        onPress={() => {
                          setGateVisible(false);
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
                            {gateClosingData.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    setGateVisible(false);
                                  }}>
                                  <View style={{ alignItems: 'center' }}>
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
                  </Modal> */}
                </View>
              )}
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontWeight: 'bold',
                }}>
                Service Available
              </Text>
              <View style={{ marginVertical: 0 }}>
                {serviceAvailableData.map((item, index) => {
                  return (
                    <RightCheckBox
                      key={index}
                      label={item.title}
                      checked={service_availItem.includes(item.id)}
                      onPress={() => handleServiceAvailItem(item.id)}
                    />
                  );
                })}
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Food Provided
                </Text>
                <Text
                  style={{
                    color: Color.red,
                    marginHorizontal: 5,
                    fontSize: 20,
                  }}>
                  *
                </Text>
                <View style={{ flex: 1 }}>
                  <Switch
                    value={foodChecked}
                    onValueChange={() => {
                      setFoodChecked(!foodChecked);
                    }}
                  />
                </View>
              </View>
              {foodChecked && (
                <View style={{ marginVertical: 10 }}>
                  <View style={{ marginVertical: 10 }}>
                    {FoodProvidedData.map((item, index) => {
                      return (
                        <RightCheckBox
                          key={index}
                          label={item.title}
                          checked={FoodProvidedItem.includes(item.id)}
                          onPress={() =>
                            handleFoodProvidedItem(item.id, item?.value)
                          }
                        />
                      );
                    })}
                  </View>

                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        color: Color.black,
                        marginHorizontal: 5,
                        fontSize: 16,
                        fontFamily: Poppins.SemiBold,
                      }}>
                      Food Charges
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setFoodVisible(true);
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
                        marginVertical: 5
                      }}>
                      <Text
                        style={{
                          color: Color.cloudyGrey,
                          flex: 1,
                          fontFamily: Poppins.SemiBold,
                          fontSize: 14,
                          textTransform: 'capitalize',
                        }}>
                        {PgStep2Item?.food_charges?.value?.length > 0
                          ? common_fn.formatText(PgStep2Item?.food_charges?.value)
                          : 'Select'}
                      </Text>
                      <Icon name="caret-down" size={20} color={Color.black} />
                    </TouchableOpacity>
                    <Modal
                      transparent={true}
                      visible={FoodVisible}
                      animationType="fade">
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: Color.transparantBlack,
                        }}>
                        <Pressable
                          style={{ flex: 1 }}
                          onPress={() => {
                            setFoodVisible(false);
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
                              {foodchargesData.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                      setPgStep2Item({
                                        bedrooms: PgStep2Item?.bedrooms,
                                        no_single_rooms:
                                          PgStep2Item?.no_single_rooms,
                                        monthly_rent: {
                                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                                        },
                                        security_deposit: {
                                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                                          four_bed: PgStep2Item?.security_deposit?.four_bed
                                        },
                                        room_facility:
                                          PgStep2Item?.room_facility,
                                        gender: PgStep2Item?.gender,
                                        tententPreferences:
                                          PgStep2Item?.tententPreferences,
                                        pg_rules: PgStep2Item?.pg_rules,
                                        notice_period:
                                          PgStep2Item?.notice_period,
                                        gate_closing_time:
                                          PgStep2Item?.gate_closing_time,
                                        service_avail:
                                          PgStep2Item?.service_avail,
                                        food_provide: PgStep2Item?.food_provide,
                                        veg_non_veg_food:
                                          PgStep2Item?.veg_non_veg_food,
                                        food_charges: item,
                                        parking_avail: PgStep2Item?.parking_avail,
                                      });
                                      setFoodVisible(false);
                                    }}>
                                    <View style={{ alignItems: 'center' }}>
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

                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        color: Color.black,
                        marginHorizontal: 5,
                        fontSize: 16,
                        fontFamily: Poppins.SemiBold,
                      }}>
                      Veg/Non-Veg food provided
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setVegNonVisible(true);
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
                        marginVertical: 5
                      }}>
                      <Text
                        style={{
                          color: Color.cloudyGrey,
                          flex: 1,
                          fontFamily: Poppins.SemiBold,
                          fontSize: 14,
                          textTransform: 'capitalize',
                        }}>
                        {PgStep2Item?.veg_non_veg_food?.value?.length > 0
                          ? common_fn.formatText(PgStep2Item?.veg_non_veg_food?.value)
                          : 'Select'}
                      </Text>
                      <Icon name="caret-down" size={20} color={Color.black} />
                    </TouchableOpacity>
                    <Modal
                      transparent={true}
                      visible={vegNonVisible}
                      animationType="fade">
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: Color.transparantBlack,
                        }}>
                        <Pressable
                          style={{ flex: 1 }}
                          onPress={() => {
                            setVegNonVisible(false);
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
                              {veg_non_vegData.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                      setPgStep2Item({
                                        bedrooms: PgStep2Item?.bedrooms,
                                        no_single_rooms:
                                          PgStep2Item?.no_single_rooms,
                                        monthly_rent: {
                                          single_bed: PgStep2Item?.monthly_rent?.single_bed,
                                          double_bed: PgStep2Item?.monthly_rent?.double_bed,
                                          triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                                          four_bed: PgStep2Item?.monthly_rent?.four_bed
                                        },
                                        security_deposit: {
                                          single_bed: PgStep2Item?.security_deposit?.single_bed,
                                          double_bed: PgStep2Item?.security_deposit?.double_bed,
                                          triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                                          four_bed: PgStep2Item?.security_deposit?.four_bed
                                        },
                                        room_facility:
                                          PgStep2Item?.room_facility,
                                        gender: PgStep2Item?.gender,
                                        tententPreferences:
                                          PgStep2Item?.tententPreferences,
                                        pg_rules: PgStep2Item?.pg_rules,
                                        notice_period:
                                          PgStep2Item?.notice_period,
                                        gate_closing_time:
                                          PgStep2Item?.gate_closing_time,
                                        service_avail:
                                          PgStep2Item?.service_avail,
                                        food_provide: PgStep2Item?.food_provide,
                                        veg_non_veg_food: item,
                                        food_charges: PgStep2Item?.food_charges,
                                        parking_avail: PgStep2Item?.parking_avail,
                                      });
                                      setVegNonVisible(false);
                                    }}>
                                    <View style={{ alignItems: 'center' }}>
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

                </View>
              )}
            </View>

            <View style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                <View style={{ flex: 1 }}>
                  <Switch
                    value={parkingChecked}
                    onValueChange={() => {
                      setParkingChecked(!parkingChecked);
                    }}
                  />
                </View>
              </View>
              {parkingChecked && (
                <View style={{ marginVertical: 10 }}>
                  {parkingRadioData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 10,
                        }}
                        onPress={() => {
                          setPgStep2Item({
                            bedrooms: PgStep2Item?.bedrooms,
                            no_single_rooms:
                              PgStep2Item?.no_single_rooms,
                            monthly_rent: {
                              single_bed: PgStep2Item?.monthly_rent?.single_bed,
                              double_bed: PgStep2Item?.monthly_rent?.double_bed,
                              triple_bed: PgStep2Item?.monthly_rent?.triple_bed,
                              four_bed: PgStep2Item?.monthly_rent?.four_bed
                            },
                            security_deposit: {
                              single_bed: PgStep2Item?.security_deposit?.single_bed,
                              double_bed: PgStep2Item?.security_deposit?.double_bed,
                              triple_bed: PgStep2Item?.security_deposit?.triple_bed,
                              four_bed: PgStep2Item?.security_deposit?.four_bed
                            },
                            room_facility:
                              PgStep2Item?.room_facility,
                            gender: PgStep2Item?.gender,
                            tententPreferences:
                              PgStep2Item?.tententPreferences,
                            pg_rules: PgStep2Item?.pg_rules,
                            notice_period:
                              PgStep2Item?.notice_period,
                            gate_closing_time:
                              PgStep2Item?.gate_closing_time,
                            service_avail:
                              PgStep2Item?.service_avail,
                            food_provide: PgStep2Item?.food_provide,
                            veg_non_veg_food: PgStep2Item?.veg_non_veg_food,
                            food_charges: PgStep2Item?.food_charges,
                            parking_avail: item,
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
                            PgStep2Item?.parking_avail?.id === item.id
                              ? 'radio-button-on'
                              : 'radio-button-off'
                          }
                          size={20}
                          color={
                            PgStep2Item?.parking_avail?.id === item.id
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
            <Button
              title={'NEXT'}
              buttonStyle={{
                backgroundColor: Color.primary,
                height: 45,
                marginVertical: 20,
              }}
              onPress={() => {
                step2Data(navigation);
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PostStep2Screen;

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
  Divider: { height: 1, marginVertical: 10 },
});
