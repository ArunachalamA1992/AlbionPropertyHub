import React, {useState, useCallback, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SectionList,
  Alert,
  Pressable,
} from 'react-native';
import {Text, View} from 'react-native';
import Color from '../../Config/Color';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import CustomRange from '../../Components/CustomRange';
import {Button, Divider} from 'react-native-elements';
import LocationBottomModal from '../../Components/LocationBottomModal';
import {useDispatch, useSelector} from 'react-redux';
import {Media} from '../../Global/Media';
import {setFilterLocation} from '../../Redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dropdown} from 'react-native-element-dropdown';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import {Poppins} from '../../Global/FontFamily';

const {width, height} = Dimensions.get('screen');

const IconData = ({item, select}) => {
  switch (item) {
    case 'lift':
      return <MCIcon name="elevator-passenger" size={25} color={select} />;
    case 'Lift':
      return <MCIcon name="elevator-passenger" size={25} color={select} />;
    case 'Park':
      return <MCIcon name="slide" size={20} color={select} />;
    case 'Visitor Parking':
      return <F5Icon name="parking" size={25} color={select} />;
    case 'Water':
      return (
        <MCIcon name="diving-scuba-tank-multiple" size={25} color={select} />
      );
    case 'Water Storage':
      return (
        <MCIcon name="diving-scuba-tank-multiple" size={25} color={select} />
      );
    case 'Piped gas':
      return <MCIcon name="gas-station" size={25} color={select} />;
    case 'Lights':
      return <MCIcon name="ceiling-light" size={25} color={select} />;
    case 'Power':
      return <MCIcon name="transmission-tower" size={25} color={select} />;
    case 'wifi':
      return <MCIcon name="wifi" size={25} color={select} />;
    case 'Building Wi-Fi':
      return <MCIcon name="wifi" size={25} color={select} />;
    case 'Fitness centre':
      return <MIcon name="fitness-center" size={25} color={select} />;
    case 'Spa':
      return <F5Icon name="spa" size={25} color={select} />;
    case 'Swimming pools':
      return <F5Icon name="swimming-pool" size={25} color={select} />;
    case 'Maintenance Staff':
      return <F5Icon name="tools" size={25} color={select} />;
    case 'Surveillance cameras':
      return <MCIcon name="cctv" size={25} color={select} />;
    case 'Billiards Table':
      return <MCIcon name="billiards" size={25} color={select} />;
    case 'Office Space':
      return <MCIcon name="office-building" size={25} color={select} />;
    case 'shop':
      return <F6Icon name="shop" size={25} color={select} />;
    case 'House':
      return <MCIcon name="home-city" size={25} color={select} />;
    case 'Villa':
      return <MIcon name="villa" size={25} color={select} />;
    case 'Flat':
      return <MIcon name="apartment" size={25} color={select} />;
    case 'Plot':
      return <F6Icon name="map-location-dot" size={25} color={select} />;
    case 'Agriculture':
      return <MIcon name="agriculture" size={25} color={select} />;
    case 'Piped gas':
      return <MCIcon name="gas-station" size={25} color={select} />;
  }
};

const FilterData = ({
  item,
  Propertylow,
  setPropertyLow,
  Propertyhigh,
  setPropertyHigh,
  lowsqrt,
  setLowsqrt,
  highsqrt,
  setHighsqrt,
  setVisible,
  setAgree,
  agree,
  propertyTypes,
  minsqrt,
  setMinsqrt,
  maxsqrt,
  setMaxsqrt,
  filter_data,
  setLocationInput,
  Propertymin,
  setPropertyMin,
  Propertymax,
  setPropertyMax,
  Bedrooms,
  FurnishingStatus,
  Amenities,
  listedBy,
  reraApproved,
  handleValueChange,
  handlesqrtValueChange,
  setBuySelectedItem,
  buySelectedItem,
  setAmenitiesSelectedItem,
  AmenitiesSelectedItem,
  setPropertyTypeSelectedItem,
  PropertyTypeSelectedItem,
  setBHKSelectedItem,
  BHKSelectedItem,
  PlotTypes,
  buyfilteredFloors,
  //Rent
  setRentSelectedItem,
  RentSelectedItem,
  Rentlow,
  setRentLow,
  Renthigh,
  setRentHigh,
  Rentmin,
  setRentMin,
  Rentmax,
  setRentMax,
  RentBedrooms,
  RentFurnishingStatus,
  RentAmenities,
  RentlistedBy,
  RentReraApproved,
  RenthandleValueChange,
  RentpropertyTypes,
  setRentAmenitiesSelectedItem,
  RentAmenitiesSelectedItem,
  setRentPropertyTypeSelectedItem,
  RentPropertyTypeSelectedItem,
  setRentBHKSelectedItem,
  RentBHKSelectedItem,
  rentfilteredFloors,
  RentAgree,
  setRentAgree,
  //pg
  setPgSelectedItem,
  pgSelectedItem,
  setGenderData,
  genderData,
  minBudget,
  maxBudget,
  PGAmenities,
  PGFoodData,
  PGPreferredTenants,
  VerifiedPG,
  PGOperatingSince,
  PGPosted,
  PGoccupency,

  //common
  getFilterData,
  PlotTypeSelectedItem,
  setPlotTypeSelectedItem,
  countFilter,
  propertyKind,
  floors,
  plotAreaunit,
  plotValue,
  setPlotValue,
  plotStatus,
  setPlotStatus,
  countLoad,
  dispatch,
  city_id,
}) => {
  // const filter_data = useSelector(state => state.UserReducer.filterLocation);
  var {city, landmark} = filter_data;
  // const dispatch = useDispatch();
  const [more, setMore] = useState(false);
  const [floorVisible, setFloorVisible] = useState(false);
  //Buy
  //Amenities
  const toggleItem = (itemId, value) => {
    if (AmenitiesSelectedItem.includes(itemId)) {
      setAmenitiesSelectedItem(
        AmenitiesSelectedItem?.filter(single => single !== itemId),
      );
      setBuySelectedItem({
        post: buySelectedItem?.post,
        kind: buySelectedItem?.kind,
        type: buySelectedItem?.type,
        bedrooms: buySelectedItem.bedrooms,
        plotType: buySelectedItem.plotType,
        noSeats: buySelectedItem.noSeats,
        furnished: buySelectedItem.furnished,
        amenities: buySelectedItem?.amenities?.filter(
          single => single !== value,
        ),
        listTypes: buySelectedItem.listTypes,
        reraApproved: buySelectedItem.reraApproved,
        locationItem: buySelectedItem.locationItem,
        totalBuildingFloors: buySelectedItem.totalBuildingFloors,
        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
        plotArea: buySelectedItem.plotArea,
      });
    } else {
      setAmenitiesSelectedItem([...AmenitiesSelectedItem, itemId]);
      const selectedItem = Amenities.find(single => single.id === itemId);
      setBuySelectedItem({
        post: buySelectedItem?.post,
        kind: buySelectedItem?.kind,
        type: buySelectedItem?.type,
        plotType: buySelectedItem.plotType,
        bedrooms: buySelectedItem.bedrooms,
        noSeats: buySelectedItem.noSeats,
        furnished: buySelectedItem.furnished,
        amenities: [...buySelectedItem?.amenities, value],
        listTypes: buySelectedItem.listTypes,
        reraApproved: buySelectedItem.reraApproved,
        locationItem: buySelectedItem.locationItem,
        totalBuildingFloors: buySelectedItem.totalBuildingFloors,
        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
        plotArea: buySelectedItem.plotArea,
      });
    }
  };
  // Property Type
  const togglePropertyTypeItem = (itemId, value) => {
    if (PropertyTypeSelectedItem.includes(itemId)) {
      setPropertyTypeSelectedItem(
        PropertyTypeSelectedItem?.filter(single => single !== itemId),
      );
      setBuySelectedItem({
        post: buySelectedItem?.post,
        kind: buySelectedItem?.kind,
        type: buySelectedItem?.type?.filter(single => single !== value),
        plotType: buySelectedItem.plotType,
        bedrooms: buySelectedItem.bedrooms,
        noSeats: buySelectedItem.noSeats,
        furnished: buySelectedItem.furnished,
        amenities: buySelectedItem.amenities,
        listTypes: buySelectedItem.listTypes,
        reraApproved: buySelectedItem.reraApproved,
        locationItem: buySelectedItem.locationItem,
        totalBuildingFloors: buySelectedItem.totalBuildingFloors,
        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
        plotArea: buySelectedItem.plotArea,
      });
    } else {
      setPropertyTypeSelectedItem([...PropertyTypeSelectedItem, itemId]);
      const selectedItem = propertyTypes.find(single => single.id === itemId);
      setBuySelectedItem({
        post: buySelectedItem?.post,
        kind: buySelectedItem?.kind,
        type: [...buySelectedItem?.type, value],
        plotType: buySelectedItem.plotType,
        bedrooms: buySelectedItem.bedrooms,
        noSeats: buySelectedItem.noSeats,
        furnished: buySelectedItem.furnished,
        amenities: buySelectedItem.amenities,
        listTypes: buySelectedItem.listTypes,
        reraApproved: buySelectedItem.reraApproved,
        locationItem: buySelectedItem.locationItem,
        totalBuildingFloors: buySelectedItem.totalBuildingFloors,
        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
        plotArea: buySelectedItem.plotArea,
      });
    }
  };
  //BHK
  const toggleBHKItem = (itemId, value) => {
    if (BHKSelectedItem.includes(itemId)) {
      setBHKSelectedItem(BHKSelectedItem?.filter(single => single !== itemId));
      setBuySelectedItem({
        post: buySelectedItem?.post,
        kind: buySelectedItem?.kind,
        type: buySelectedItem?.type,
        plotType: buySelectedItem.plotType,
        bedrooms: buySelectedItem?.bedrooms?.filter(single => single !== value),
        noSeats: buySelectedItem.noSeats,
        furnished: buySelectedItem.furnished,
        amenities: buySelectedItem.amenities,
        listTypes: buySelectedItem.listTypes,
        reraApproved: buySelectedItem.reraApproved,
        locationItem: buySelectedItem.locationItem,
        totalBuildingFloors: buySelectedItem.totalBuildingFloors,
        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
        plotArea: buySelectedItem.plotArea,
      });
    } else {
      setBHKSelectedItem([...BHKSelectedItem, itemId]);
      const selectedItem = Bedrooms.find(single => single.id === itemId);
      setBuySelectedItem({
        post: buySelectedItem?.post,
        kind: buySelectedItem?.kind,
        type: buySelectedItem?.type,
        plotType: buySelectedItem.plotType,
        bedrooms: [...buySelectedItem.bedrooms, value],
        noSeats: buySelectedItem.noSeats,
        furnished: buySelectedItem.furnished,
        amenities: buySelectedItem.amenities,
        listTypes: buySelectedItem.listTypes,
        reraApproved: buySelectedItem.reraApproved,
        locationItem: buySelectedItem.locationItem,
        totalBuildingFloors: buySelectedItem.totalBuildingFloors,
        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
        plotArea: buySelectedItem.plotArea,
      });
    }
  };
  //Plot Type
  const togglePlotItem = (itemId, value) => {
    if (PlotTypeSelectedItem.includes(itemId)) {
      setPlotTypeSelectedItem(
        PlotTypeSelectedItem?.filter(single => single !== itemId),
      );
      setBuySelectedItem({
        post: buySelectedItem?.post,
        kind: buySelectedItem?.kind,
        type: buySelectedItem?.type,
        plotType: buySelectedItem.plotType?.filter(single => single !== value),
        bedrooms: buySelectedItem.bedrooms,
        noSeats: buySelectedItem.noSeats,
        furnished: buySelectedItem.furnished,
        amenities: buySelectedItem.amenities,
        listTypes: buySelectedItem.listTypes,
        reraApproved: buySelectedItem.reraApproved,
        locationItem: buySelectedItem.locationItem,
        totalBuildingFloors: buySelectedItem.totalBuildingFloors,
        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
        plotArea: buySelectedItem.plotArea,
      });
    } else {
      setPlotTypeSelectedItem([...PlotTypeSelectedItem, itemId]);
      const selectedItem = PlotTypes.find(single => single.id === itemId);
      setBuySelectedItem({
        post: buySelectedItem?.post,
        kind: buySelectedItem?.kind,
        type: buySelectedItem?.type,
        plotType: [...buySelectedItem.plotType, value],
        bedrooms: buySelectedItem.bedrooms,
        value,
        noSeats: buySelectedItem.noSeats,
        furnished: buySelectedItem.furnished,
        amenities: buySelectedItem.amenities,
        listTypes: buySelectedItem.listTypes,
        reraApproved: buySelectedItem.reraApproved,
        locationItem: buySelectedItem.locationItem,
        totalBuildingFloors: buySelectedItem.totalBuildingFloors,
        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
        plotArea: buySelectedItem.plotArea,
      });
    }
  };

  //Rent
  //Amenities
  const RentToggleAmenitiesItem = (itemId, value) => {
    if (RentAmenitiesSelectedItem.includes(itemId)) {
      setRentAmenitiesSelectedItem(
        RentAmenitiesSelectedItem?.filter(single => single !== itemId),
      );
      setRentSelectedItem({
        post: RentSelectedItem?.post,
        kind: RentSelectedItem?.kind,
        type: RentSelectedItem?.type,
        bedrooms: RentSelectedItem.bedrooms,
        furnished: RentSelectedItem.furnished,
        amenities: RentSelectedItem.amenities?.filter(
          single => single !== value,
        ),
        listTypes: RentSelectedItem.listTypes,
        reraApproved: RentSelectedItem.reraApproved,
        locationItem: RentSelectedItem.locationItem,
        noSeats: RentSelectedItem.noSeats,
        plotType: RentSelectedItem.plotType,
        totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
        plotArea: RentSelectedItem.plotArea,
      });
    } else {
      setRentAmenitiesSelectedItem([...RentAmenitiesSelectedItem, itemId]);
      const selectedItem = RentAmenities.find(single => single.id === itemId);
      setRentSelectedItem({
        post: RentSelectedItem?.post,
        kind: RentSelectedItem?.kind,
        type: RentSelectedItem?.type,
        bedrooms: RentSelectedItem.bedrooms,
        furnished: RentSelectedItem.furnished,
        amenities: [...RentSelectedItem.amenities, value],
        listTypes: RentSelectedItem.listTypes,
        reraApproved: RentSelectedItem.reraApproved,
        locationItem: RentSelectedItem.locationItem,
        noSeats: RentSelectedItem.noSeats,
        plotType: RentSelectedItem.plotType,
        totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
        plotArea: RentSelectedItem.plotArea,
      });
    }
  };
  // Property Type
  const RentTogglePropertyTypeItem = (itemId, value) => {
    if (RentPropertyTypeSelectedItem.includes(itemId)) {
      setRentPropertyTypeSelectedItem(
        RentPropertyTypeSelectedItem?.filter(single => single !== itemId),
      );
      setRentSelectedItem({
        post: RentSelectedItem?.post,
        kind: RentSelectedItem?.kind,
        type: RentSelectedItem?.type?.filter(single => single !== value),
        bedrooms: RentSelectedItem.bedrooms,
        furnished: RentSelectedItem.furnished,
        amenities: RentSelectedItem.amenities,
        listTypes: RentSelectedItem.listTypes,
        reraApproved: RentSelectedItem.reraApproved,
        locationItem: RentSelectedItem.locationItem,
        noSeats: RentSelectedItem.noSeats,
        plotType: RentSelectedItem.plotType,
        totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
        plotArea: RentSelectedItem.plotArea,
      });
    } else {
      setRentPropertyTypeSelectedItem([
        ...RentPropertyTypeSelectedItem,
        itemId,
      ]);
      const selectedItem = RentpropertyTypes.find(
        single => single.id === itemId,
      );
      setRentSelectedItem({
        post: RentSelectedItem?.post,
        kind: RentSelectedItem?.kind,
        type: [...RentSelectedItem?.type, value],
        bedrooms: RentSelectedItem.bedrooms,
        furnished: RentSelectedItem.furnished,
        amenities: RentSelectedItem.amenities,
        listTypes: RentSelectedItem.listTypes,
        reraApproved: RentSelectedItem.reraApproved,
        locationItem: RentSelectedItem.locationItem,
        noSeats: RentSelectedItem.noSeats,
        plotType: RentSelectedItem.plotType,
        totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
        plotArea: RentSelectedItem.plotArea,
      });
    }
  };
  //BHK
  const RentToggleBHKItem = (itemId, value) => {
    if (RentBHKSelectedItem.includes(itemId)) {
      setRentBHKSelectedItem(
        RentBHKSelectedItem?.filter(single => single !== itemId),
      );
      setRentSelectedItem({
        post: RentSelectedItem?.post,
        kind: RentSelectedItem?.kind,
        type: RentSelectedItem?.type,
        bedrooms: RentSelectedItem.bedrooms?.filter(single => single !== value),
        furnished: RentSelectedItem.furnished,
        amenities: RentSelectedItem.amenities,
        listTypes: RentSelectedItem.listTypes,
        reraApproved: RentSelectedItem.reraApproved,
        locationItem: RentSelectedItem.locationItem,
        noSeats: RentSelectedItem.noSeats,
        plotType: RentSelectedItem.plotType,
        totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
        plotArea: RentSelectedItem.plotArea,
      });
    } else {
      setRentBHKSelectedItem([...RentBHKSelectedItem, itemId]);
      const selectedItem = RentBedrooms.find(single => single.id === itemId);
      setRentSelectedItem({
        post: RentSelectedItem?.post,
        kind: RentSelectedItem?.kind,
        type: RentSelectedItem?.type,
        bedrooms: [...RentSelectedItem.bedrooms, value],
        furnished: RentSelectedItem.furnished,
        amenities: RentSelectedItem.amenities,
        listTypes: RentSelectedItem.listTypes,
        reraApproved: RentSelectedItem.reraApproved,
        locationItem: RentSelectedItem.locationItem,
        noSeats: RentSelectedItem.noSeats,
        plotType: RentSelectedItem.plotType,
        totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
        plotArea: RentSelectedItem.plotArea,
      });
    }
  };

  //Plot Type
  const toggleRentPlotItem = (itemId, value) => {
    if (PlotTypeSelectedItem.includes(itemId)) {
      setPlotTypeSelectedItem(
        PlotTypeSelectedItem?.filter(single => single !== itemId),
      );
      setRentSelectedItem({
        post: RentSelectedItem?.post,
        kind: RentSelectedItem?.kind,
        type: RentSelectedItem?.type,
        bedrooms: RentSelectedItem.bedrooms,
        furnished: RentSelectedItem.furnished,
        amenities: RentSelectedItem.amenities,
        listTypes: RentSelectedItem.listTypes,
        reraApproved: RentSelectedItem.reraApproved,
        locationItem: RentSelectedItem.locationItem,
        noSeats: RentSelectedItem.noSeats,
        plotType: RentSelectedItem.plotType?.filter(single => single !== value),
        totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
        plotArea: RentSelectedItem.plotArea,
      });
    } else {
      setPlotTypeSelectedItem([...PlotTypeSelectedItem, itemId]);
      const selectedItem = PlotTypes.find(single => single.id === itemId);
      setRentSelectedItem({
        post: RentSelectedItem?.post,
        kind: RentSelectedItem?.kind,
        type: RentSelectedItem?.type,
        bedrooms: RentSelectedItem.bedrooms,
        furnished: RentSelectedItem.furnished,
        amenities: RentSelectedItem.amenities,
        listTypes: RentSelectedItem.listTypes,
        reraApproved: RentSelectedItem.reraApproved,
        locationItem: RentSelectedItem.locationItem,
        noSeats: RentSelectedItem.noSeats,
        plotType: [...RentSelectedItem.plotType, value],
        totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
        plotArea: RentSelectedItem.plotArea,
      });
    }
  };

  const filteredPropertyTypes = propertyTypes.filter(type =>
    buySelectedItem?.kind?.value === 'Residential' ? type.id <= 3 : type.id > 3,
  );
  const filteredRentPropertyTypes = RentpropertyTypes.filter(type =>
    RentSelectedItem?.kind?.value === 'Residential'
      ? type.id <= 3
      : type.id >= 3,
  );

  const [cityData, setCityData] = useState([]);

  const locationData = async () => {
    try {
      var data = 'location=' + 'city' + '&state=' + '31';
      const filterloc = await fetchData.Location(data);
      setCityData(filterloc?.city);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    locationData();
  }, [cityData]);

  const [occupencySelectedItem, setOccupencySelectedItem] = useState([]);
  const handleOccupencyPress = (itemId, value) => {
    if (occupencySelectedItem.includes(itemId)) {
      setOccupencySelectedItem(
        occupencySelectedItem?.filter(single => single !== itemId),
      );
      setPgSelectedItem({
        gender: pgSelectedItem.gender,
        occupency: pgSelectedItem?.occupency?.filter(
          single => single !== value,
        ),
        budget: {
          minBudget: pgSelectedItem?.budget.minValue,
          maxBudget: pgSelectedItem?.budget.maxBudget,
        },
        amenities: pgSelectedItem.amenities,
        foods: pgSelectedItem.foods,
        tenants: pgSelectedItem.tenants,
        verifiedPG: pgSelectedItem.verifiedPG,
        since: pgSelectedItem.since,
        posted: pgSelectedItem.posted,
      });
    } else {
      setOccupencySelectedItem([...occupencySelectedItem, itemId]);
      const selectedItem = PGoccupency.find(single => single.id === itemId);
      setPgSelectedItem({
        gender: pgSelectedItem.gender,
        occupency: [...pgSelectedItem?.occupency, value],
        budget: {
          minBudget: pgSelectedItem?.budget.minValue,
          maxBudget: pgSelectedItem?.budget.maxBudget,
        },
        amenities: pgSelectedItem.amenities,
        foods: pgSelectedItem.foods,
        tenants: pgSelectedItem.tenants,
        verifiedPG: pgSelectedItem.verifiedPG,
        since: pgSelectedItem.since,
        posted: pgSelectedItem.posted,
      });
    }
  };
  const [PGAmenitiesSelectedItem, setPGAmenitiesSelectedItem] = useState([]);
  const handlePGAmenitiesPress = (itemId, value) => {
    if (PGAmenitiesSelectedItem.includes(itemId)) {
      setPGAmenitiesSelectedItem(
        PGAmenitiesSelectedItem?.filter(single => single !== itemId),
      );
      setPgSelectedItem({
        gender: pgSelectedItem.gender,
        occupency: pgSelectedItem?.occupency,
        budget: {
          minBudget: pgSelectedItem?.budget.minValue,
          maxBudget: pgSelectedItem?.budget.maxBudget,
        },
        amenities: pgSelectedItem.amenities?.filter(single => single !== value),
        foods: pgSelectedItem.foods,
        tenants: pgSelectedItem.tenants,
        verifiedPG: pgSelectedItem.verifiedPG,
        since: pgSelectedItem.since,
        posted: pgSelectedItem.posted,
      });
    } else {
      setPGAmenitiesSelectedItem([...PGAmenitiesSelectedItem, itemId]);
      const selectedItem = PGAmenities.find(single => single.id === itemId);
      setPgSelectedItem({
        gender: pgSelectedItem.gender,
        occupency: pgSelectedItem?.occupency,
        budget: {
          minBudget: pgSelectedItem?.budget.minValue,
          maxBudget: pgSelectedItem?.budget.maxBudget,
        },
        amenities: [...pgSelectedItem.amenities, value],
        foods: pgSelectedItem.foods,
        tenants: pgSelectedItem.tenants,
        verifiedPG: pgSelectedItem.verifiedPG,
        since: pgSelectedItem.since,
        posted: pgSelectedItem.posted,
      });
    }
  };

  switch (item) {
    case 'Buy':
      return (
        <View style={{flex: 1}}>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                What kind of property?
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {propertyKind.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        buySelectedItem?.kind?.id == item?.id
                          ? '#8C193F20'
                          : Color.white,
                      // width: width / 3.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      borderRadius: 10,
                      padding: 10,
                      marginVertical: 10,
                      borderColor:
                        buySelectedItem?.kind?.id == item?.id
                          ? Color.primary
                          : Color.lightgrey,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      setBuySelectedItem({
                        post: buySelectedItem?.post,
                        kind: item,
                        type: [],
                        bedrooms: [],
                        plotType: [],
                        furnished: buySelectedItem.furnished,
                        noSeats: buySelectedItem.noSeats,
                        amenities: buySelectedItem.amenities,
                        listTypes: buySelectedItem.listTypes,
                        reraApproved: buySelectedItem?.reraApproved,
                        locationItem: buySelectedItem.locationItem,
                        totalBuildingFloors:
                          buySelectedItem.totalBuildingFloors,
                        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
                        plotArea: buySelectedItem.plotArea,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          buySelectedItem?.kind?.id == item?.id
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                  marginVertical: 10,
                }}>
                Location / Landmark
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
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {city != '' && (
                <View style={styles.pillContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#d4e9f4',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={styles.pillText}>{city}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setFilterLocation({
                            city: '',
                            landmark: landmark,
                          }),
                        );
                      }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Icon size={20} name="close-circle" color="#b1cddb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {landmark != '' && (
                <View style={styles.pillContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#d4e9f4',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={styles.pillText}>{landmark}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setFilterLocation({
                            city: city,
                            landmark: '',
                          }),
                        );
                      }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Icon size={20} name="close-circle" color="#b1cddb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setVisible(true);
              }}>
              <TextInput
                placeholder="Enter your city / Landmark / Project..."
                placeholderTextColor={Color.cloudyGrey}
                onChangeText={value => setLocationInput(value)}
                style={{
                  flex: 1,
                  color: Color.black,
                  padding: 10,
                }}
                editable={false}
              />
              <MIcon
                name="my-location"
                size={20}
                color={Color.primary}
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity> */}
            <LocationBottomModal
              // visible={visible}
              // setVisible={setVisible}
              data={cityData}
              city_id={city_id}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              Property Type
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <FlatList
                nestedScrollEnabled
                data={filteredPropertyTypes}
                horizontal
                keyExtractor={(item, index) => item + index}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          buySelectedItem?.type?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        width: width / 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        borderRadius: 10,
                        // height: 80,
                        marginVertical: 10,
                        padding: 10,
                        borderColor:
                          buySelectedItem?.type?.id == item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setBuySelectedItem({
                          post: buySelectedItem?.post,
                          kind: buySelectedItem?.kind,
                          type: item,
                          noSeats: '',
                          bedrooms: [],
                          furnished: {},
                          plotType: [],
                          amenities: [],
                          listTypes: {},
                          reraApproved: {},
                          totalBuildingFloors: 0,
                          noFloorsOnProperty: {},
                          plotArea: '',
                        });
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {/* <Image
                          source={item.image}
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'contain',
                            padding: 5,
                          }}
                        /> */}
                        <IconData
                          item={item.title}
                          select={
                            buySelectedItem?.type?.id == item?.id
                              ? Color.primary
                              : Color.black
                          }
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color:
                              buySelectedItem?.type?.id == item?.id
                                ? Color.primary
                                : Color.black,
                            fontFamily: Poppins.Medium,
                            marginVertical: 5,
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
          {buySelectedItem?.type?.value === 'Office' && (
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                No.Of Seats
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="Enter Your Seats"
                  placeholderTextColor={Color.cloudyGrey}
                  value={buySelectedItem?.noSeats}
                  onChangeText={value => {
                    setBuySelectedItem({
                      post: buySelectedItem?.post,
                      kind: buySelectedItem?.kind,
                      type: buySelectedItem?.type,
                      plotType: buySelectedItem.plotType,
                      bedrooms: buySelectedItem.bedrooms,
                      noSeats: value,
                      furnished: buySelectedItem.furnished,
                      amenities: buySelectedItem.amenities,
                      listTypes: buySelectedItem.listTypes,
                      reraApproved: buySelectedItem.reraApproved,
                      locationItem: buySelectedItem.locationItem,
                      totalBuildingFloors: buySelectedItem.totalBuildingFloors,
                      noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
                      plotArea: buySelectedItem.plotArea,
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
          )}
          {/* {buySelectedItem?.type?.value == 'Plot' && (
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Plot Type
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <FlatList
                  nestedScrollEnabled
                  data={PlotTypes}
                  horizontal
                  keyExtractor={(item, index) => item + index}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: PlotTypeSelectedItem.includes(
                            item.id,
                          )
                            ? '#8C193F20'
                            : Color.white,
                          width: width / 4,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: 10,
                          borderRadius: 10,
                          marginVertical: 10,
                          padding: 10,
                          borderColor: PlotTypeSelectedItem.includes(item.id)
                            ? Color.primary
                            : Color.lightgrey,
                          borderWidth: 1,
                        }}
                        onPress={() => {
                          togglePlotItem(item.id, item?.value);
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <IconData
                            item={item.title}
                            select={
                              PlotTypeSelectedItem.includes(item.id)
                                ? Color.primary
                                : Color.black
                            }
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Poppins.Medium,
                              marginVertical: 5,
                            }}>
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Property Area
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    value={buySelectedItem?.plotArea}
                    placeholder="Plot Area"
                    placeholderTextColor={Color.cloudyGrey}
                    keyboardType="number-pad"
                    onChangeText={text => {
                      setBuySelectedItem({
                        post: buySelectedItem?.post,
                        kind: buySelectedItem?.kind,
                        type: buySelectedItem?.type,
                        plotType: buySelectedItem.plotType,
                        bedrooms: buySelectedItem.bedrooms,
                        noSeats: buySelectedItem?.noSeats,
                        furnished: buySelectedItem.furnished,
                        amenities: buySelectedItem.amenities,
                        listTypes: buySelectedItem.listTypes,
                        reraApproved: buySelectedItem.reraApproved,
                        locationItem: buySelectedItem.locationItem,
                        totalBuildingFloors:
                          buySelectedItem.totalBuildingFloors,
                        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
                        plotArea: text,
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
              </View>
            </View>
          )} */}
          {buySelectedItem?.type?.value == 'Flat' && (
            <View style={{marginVertical: 10}}>
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
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontWeight: 'bold',
                  marginVertical: 10,
                }}>
                Total No. of Floors in Building
              </Text>
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
                  disabled={buySelectedItem.totalBuildingFloors == 0}
                  onPress={() => {
                    setBuySelectedItem({
                      post: buySelectedItem?.post,
                      kind: buySelectedItem?.kind,
                      type: buySelectedItem?.type,
                      plotType: buySelectedItem?.plotType,
                      bedrooms: buySelectedItem.bedrooms,
                      noSeats: buySelectedItem.noSeats,
                      furnished: buySelectedItem.furnished,
                      amenities: buySelectedItem.amenities,
                      listTypes: buySelectedItem.listTypes,
                      reraApproved: buySelectedItem.reraApproved,
                      locationItem: buySelectedItem.locationItem,
                      totalBuildingFloors:
                        buySelectedItem.totalBuildingFloors - 1,
                      noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
                      plotArea: buySelectedItem.plotArea,
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
                  <TextInput
                    value={buySelectedItem.totalBuildingFloors.toString()}
                    placeholderTextColor={Color.cloudyGrey}
                    style={{color: Color.black}}
                    keyboardType="number-pad"
                    onChangeText={text => {
                      setBuySelectedItem({
                        post: buySelectedItem?.post,
                        kind: buySelectedItem?.kind,
                        type: buySelectedItem?.type,
                        plotType: buySelectedItem?.plotType,
                        bedrooms: buySelectedItem.bedrooms,
                        noSeats: buySelectedItem.noSeats,
                        furnished: buySelectedItem.furnished,
                        amenities: buySelectedItem.amenities,
                        listTypes: buySelectedItem.listTypes,
                        reraApproved: buySelectedItem.reraApproved,
                        locationItem: buySelectedItem.locationItem,
                        totalBuildingFloors: text,
                        noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
                        plotArea: buySelectedItem.plotArea,
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
                    setBuySelectedItem({
                      post: buySelectedItem?.post,
                      kind: buySelectedItem?.kind,
                      type: buySelectedItem?.type,
                      plotType: buySelectedItem?.plotType,
                      bedrooms: buySelectedItem.bedrooms,
                      noSeats: buySelectedItem.noSeats,
                      furnished: buySelectedItem.furnished,
                      amenities: buySelectedItem.amenities,
                      listTypes: buySelectedItem.listTypes,
                      reraApproved: buySelectedItem.reraApproved,
                      locationItem: buySelectedItem.locationItem,
                      totalBuildingFloors:
                        buySelectedItem.totalBuildingFloors + 1,
                      noFloorsOnProperty: buySelectedItem.noFloorsOnProperty,
                      plotArea: buySelectedItem.plotArea,
                    });
                  }}>
                  <FIcon name="plus" size={18} color={Color.cloudyGrey} />
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                  }}>
                  Floors No. of Your Property
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    {buySelectedItem?.noFloorsOnProperty != '' ? (
                      <Text
                        style={{
                          color: Color.cloudyGrey,
                          flex: 1,
                          fontFamily: Poppins.SemiBold,
                          fontSize: 14,
                          textTransform: 'capitalize',
                        }}>
                        {buySelectedItem?.noFloorsOnProperty?.label ??
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
                        style={{flex: 1}}
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
                            {buyfilteredFloors.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    setBuySelectedItem({
                                      post: buySelectedItem?.post,
                                      kind: buySelectedItem?.kind,
                                      type: buySelectedItem?.type,
                                      plotType: buySelectedItem?.plotType,
                                      bedrooms: buySelectedItem.bedrooms,
                                      noSeats: buySelectedItem.noSeats,
                                      furnished: buySelectedItem.furnished,
                                      amenities: buySelectedItem.amenities,
                                      listTypes: buySelectedItem.listTypes,
                                      reraApproved:
                                        buySelectedItem.reraApproved,
                                      locationItem:
                                        buySelectedItem.locationItem,
                                      totalBuildingFloors:
                                        buySelectedItem.totalBuildingFloors,
                                      noFloorsOnProperty: item,
                                      plotArea: buySelectedItem.plotArea,
                                    });
                                    setFloorVisible(false);
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
              </View>
            </View>
          )}
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              Price Range
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                {common_fn.formatNumberIndianEnglishCommas(Propertylow) || 0}{' '}
                {/* <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginVertical: 10,
                    fontFamily: Poppins.Medium,
                  }}>
                  K
                </Text> */}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                to
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                {common_fn.formatNumberIndianEnglishCommas(Propertyhigh) || 0}{' '}
                {/* <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginVertical: 10,
                    fontFamily: Poppins.Medium,
                  }}>
                  Lakh
                </Text> */}
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <CustomRange
                low={item == 'Buy' && Propertylow}
                setLow={item == 'Buy' && setPropertyLow}
                high={item == 'Buy' && Propertyhigh}
                setHigh={item == 'Buy' && setPropertyHigh}
                min={item == 'Buy' && Propertymin}
                setMin={item == 'Buy' && setPropertyMin}
                max={item == 'Buy' && Propertymax}
                setMax={item == 'Buy' && setPropertyMax}
                handleValueChange={item == 'Buy' && handleValueChange}
              />
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <TextInput
                placeholder="Enter your Min Amount"
                value={Propertylow}
                onChangeText={value => {
                  setPropertyLow(value);
                  setPropertyMin(value);
                }}
                style={{
                  backgroundColor: Color.white,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  width: '45%',
                  marginHorizontal: 10,
                }}
              />
              <TextInput
                placeholder="Enter your Max Amount"
                value={Propertyhigh}
                onChangeText={value => {
                  setPropertyHigh(value);
                  setPropertyMax(value);
                }}
                style={{
                  backgroundColor: Color.white,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  width: '45%',
                  marginHorizontal: 10,
                }}
              />
            </View> */}
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              Property Size
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                {common_fn.formatNumberIndianEnglishCommas(lowsqrt) || 0}{' '}
                {/* {lowsqrt}{' '} */}
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginVertical: 10,
                    fontFamily: Poppins.Medium,
                  }}>
                  sqft
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                to
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                {common_fn.formatNumberIndianEnglishCommas(highsqrt) || 0}{' '}
                {/* {highsqrt}{' '} */}
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginVertical: 10,
                    fontFamily: Poppins.Medium,
                  }}>
                  sqft
                </Text>
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <CustomRange
                low={lowsqrt}
                setLow={setLowsqrt}
                high={highsqrt}
                setHigh={setHighsqrt}
                min={minsqrt}
                setMin={setMinsqrt}
                max={maxsqrt}
                setMax={setMaxsqrt}
                handleValueChange={handlesqrtValueChange}
              />
            </View>
          </View>
          {buySelectedItem?.type?.value === 'Plot' ||
          buySelectedItem?.type?.value === 'shop' ||
          buySelectedItem?.kind?.value === 'Commercial' ||
          buySelectedItem?.type?.value === 'Office' ? (
            <View />
          ) : (
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                BHK Type
              </Text>
              <View
                style={{
                  backgroundColor: Color.white,
                  // paddingEnd: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {Bedrooms.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: BHKSelectedItem.includes(item?.id)
                          ? '#8C193F20'
                          : Color.white,
                        // width: width / 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 5,
                        // height: 40,
                        padding: 10,
                        marginVertical: 10,
                        borderColor: BHKSelectedItem.includes(item?.id)
                          ? Color.primary
                          : Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => toggleBHKItem(item.id, item?.value)}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          fontFamily: Poppins.Medium,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {buySelectedItem?.type?.value != 'Plot' && (
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Furnishing Type
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
                          buySelectedItem?.furnished?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        // width: width / 2.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 10,
                        // height: 80,
                        marginVertical: 10,
                        padding: 10,
                        borderColor: Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        if (buySelectedItem?.furnished?.value == item?.value) {
                          setBuySelectedItem({
                            post: buySelectedItem?.post,
                            kind: buySelectedItem?.kind,
                            type: buySelectedItem?.type,
                            plotType: buySelectedItem.plotType,
                            bedrooms: buySelectedItem.bedrooms,
                            noSeats: buySelectedItem.noSeats,
                            furnished: null,
                            amenities: buySelectedItem.amenities,
                            listTypes: buySelectedItem.listTypes,
                            reraApproved: buySelectedItem.reraApproved,
                            locationItem: buySelectedItem.locationItem,
                            totalBuildingFloors:
                              buySelectedItem.totalBuildingFloors,
                            noFloorsOnProperty:
                              buySelectedItem.noFloorsOnProperty,
                            plotArea: buySelectedItem.plotArea,
                          });
                        } else {
                          setBuySelectedItem({
                            post: buySelectedItem?.post,
                            kind: buySelectedItem?.kind,
                            type: buySelectedItem?.type,
                            plotType: buySelectedItem.plotType,
                            bedrooms: buySelectedItem.bedrooms,
                            noSeats: buySelectedItem.noSeats,
                            furnished: item,
                            amenities: buySelectedItem.amenities,
                            listTypes: buySelectedItem.listTypes,
                            reraApproved: buySelectedItem.reraApproved,
                            locationItem: buySelectedItem.locationItem,
                            totalBuildingFloors:
                              buySelectedItem.totalBuildingFloors,
                            noFloorsOnProperty:
                              buySelectedItem.noFloorsOnProperty,
                            plotArea: buySelectedItem.plotArea,
                          });
                        }
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontFamily: Poppins.Medium,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {/* <TouchableOpacity
            onPress={() => {
              setMore(!more);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                {!more ? 'Add More' : 'Add Less'}
              </Text>
              <FIcon
                name={!more ? 'plus' : 'minus'}
                size={18}
                color={Color.black}
              />
            </View>
            <Divider style={{height: 1, marginVertical: 10}} />
          </TouchableOpacity> */}
          {/* {more && ( */}
          <View>
            {buySelectedItem?.type?.value === 'Plot' ||
            buySelectedItem?.type?.value === 'shop' ||
            buySelectedItem?.type?.value === 'Commercial' ||
            buySelectedItem?.type?.value === 'Office' ? (
              <View />
            ) : (
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Amenities
                </Text>
                <View
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  <FlatList
                    nestedScrollEnabled
                    data={Amenities}
                    horizontal
                    keyExtractor={(item, index) => item + index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor:
                              // buySelectedItem?.amenities?.id == item?.id
                              //   ? '#8C193F20'
                              //   : Color.white,
                              AmenitiesSelectedItem.includes(item.id)
                                ? '#8C193F20'
                                : Color.white,
                            // width: width / 4,
                            width: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 10,
                            borderRadius: 10,
                            // height: 80,
                            marginVertical: 10,
                            padding: 10,
                            borderColor: Color.lightgrey,
                            borderWidth: 1,
                          }}
                          onPress={() => toggleItem(item.id, item?.value)}>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* <Image
                                source={item.image}
                                style={{
                                  height: 30,
                                  width: 30,
                                  resizeMode: 'contain',
                                }}
                              /> */}
                            <IconData
                              item={item.title}
                              select={
                                AmenitiesSelectedItem.includes(item.id)
                                  ? Color.primary
                                  : Color.black
                              }
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.black,
                                fontFamily: Poppins.Medium,
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
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Listed By
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <FlatList
                  nestedScrollEnabled
                  data={listedBy}
                  keyExtractor={(item, index) => item + index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor:
                            buySelectedItem?.listTypes?.id == item?.id
                              ? '#8C193F20'
                              : Color.white,
                          borderRadius: 10,
                          marginVertical: 10,
                          padding: 10,
                          marginHorizontal: 5,
                          borderColor: Color.lightgrey,
                          borderWidth: 1,
                        }}
                        onPress={() => {
                          setBuySelectedItem({
                            post: buySelectedItem?.post,
                            kind: buySelectedItem?.kind,
                            type: buySelectedItem?.type,
                            plotType: buySelectedItem.plotType,
                            bedrooms: buySelectedItem.bedrooms,
                            noSeats: buySelectedItem.noSeats,
                            furnished: buySelectedItem.furnished,
                            amenities: buySelectedItem.amenities,
                            listTypes: item,
                            reraApproved: buySelectedItem.reraApproved,
                            locationItem: buySelectedItem.locationItem,
                            totalBuildingFloors:
                              buySelectedItem.totalBuildingFloors,
                            noFloorsOnProperty:
                              buySelectedItem.noFloorsOnProperty,
                            plotArea: buySelectedItem.plotArea,
                          });
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {buySelectedItem?.listTypes?.id == item?.id ? (
                            <FIcon
                              name="check-circle"
                              size={18}
                              color={Color.primary}
                            />
                          ) : (
                            <FIcon name="plus" size={18} color={Color.black} />
                          )}
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Poppins.Medium,
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
            {/* <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  RERA Approved
                </Text>
                <View
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  <FlatList
                    nestedScrollEnabled
                    data={reraApproved}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor:
                              buySelectedItem?.reraApproved?.id == item?.id
                                ? '#8C193F20'
                                : Color.white,
                            borderRadius: 10,
                            marginVertical: 10,
                            padding: 10,
                            marginHorizontal: 5,
                            borderColor: Color.lightgrey,
                            borderWidth: 1,
                          }}
                          onPress={() => {
                            setBuySelectedItem({
                              post: buySelectedItem?.post,
                              kind: buySelectedItem?.kind,
                              type: buySelectedItem?.type,
                              plotType: buySelectedItem.plotType,
                              bedrooms: buySelectedItem.bedrooms,
                              noSeats: buySelectedItem.noSeats,
                              furnished: buySelectedItem.furnished,
                              amenities: buySelectedItem.amenities,
                              listTypes: buySelectedItem.listTypes,
                              reraApproved: item,
                              locationItem: buySelectedItem.locationItem,
                              totalBuildingFloors:
                                buySelectedItem.totalBuildingFloors,
                              noFloorsOnProperty:
                                buySelectedItem.noFloorsOnProperty,
                              plotArea: buySelectedItem.plotArea,
                            });
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {buySelectedItem?.reraApproved?.id == item?.id ? (
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
                                fontFamily: Poppins.Medium,
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
            <Divider style={{height: 1, marginVertical: 5}} />
          </View>
          {/* )} */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity style={{}} onPress={() => setAgree(!agree)}>
              <MCIcon
                name={agree ? 'checkbox-marked' : 'checkbox-blank-outline'}
                color={Color.primary}
                size={25}
                style={{}}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 14,
                fontFamily: Poppins.SemiBold,
                color: Color.cloudyGrey,
              }}>
              Properties with Discounts and Offers
            </Text>
            <MCIcon name="brightness-percent" size={18} color={Color.primary} />
          </View>
          <View style={{marginVertical: 10, marginBottom: 20}}>
            <Button
              // title={`Search Result ${countFilter ?? 0}`}
              title={`Search`}
              buttonStyle={{backgroundColor: Color.primary, height: 45}}
              onPress={() => {
                if (Object.values(buySelectedItem?.kind)?.length == 0) {
                  Alert.alert(
                    '',
                    'Please Choose Your Property Kind',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {},
                      },
                    ],
                    {cancelable: false},
                  );
                } else if (city == '') {
                  Alert.alert(
                    '',
                    'Choose Your Location',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {},
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  getFilterData();
                }
              }}
              // loading={countLoad}
            />
          </View>
        </View>
      );
    case 'Rent':
      return (
        <SafeAreaView style={{flex: 1}}>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                What kind of property?
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
              {kindError}
            </Text> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {propertyKind.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        RentSelectedItem?.kind?.id == item?.id
                          ? '#8C193F20'
                          : Color.white,
                      // width: width / 3.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      borderRadius: 10,
                      padding: 10,
                      marginVertical: 10,
                      borderColor:
                        RentSelectedItem?.kind?.id == item?.id
                          ? Color.primary
                          : Color.lightgrey,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      setRentSelectedItem({
                        post: RentSelectedItem?.post,
                        kind: item,
                        type: RentSelectedItem?.type,
                        bedrooms: RentSelectedItem.bedrooms,
                        furnished: RentSelectedItem.furnished,
                        amenities: RentSelectedItem.amenities,
                        listTypes: RentSelectedItem.listTypes,
                        reraApproved: RentSelectedItem.reraApproved,
                        locationItem: RentSelectedItem.locationItem,
                        noSeats: RentSelectedItem.noSeats,
                        plotType: RentSelectedItem.plotType,
                        totalBuildingFloors:
                          RentSelectedItem.totalBuildingFloors,
                        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
                        plotArea: RentSelectedItem.plotArea,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          RentSelectedItem?.kind?.id == item?.id
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                  marginVertical: 10,
                }}>
                Location / Landmark
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
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {city != '' && (
                <View style={styles.pillContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#d4e9f4',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={styles.pillText}>{city}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setFilterLocation({
                            city: '',
                            landmark: landmark,
                          }),
                        );
                      }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Icon size={20} name="close-circle" color="#b1cddb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {landmark != '' && (
                <View style={styles.pillContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#d4e9f4',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      borderRadius: 50,
                    }}>
                    <Text style={styles.pillText}>{landmark}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          setFilterLocation({
                            city: city,
                            landmark: '',
                          }),
                        );
                      }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Icon size={20} name="close-circle" color="#b1cddb" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={{
                height: 40,
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setVisible(true);
              }}>
              <TextInput
                placeholder="Enter your city / Landmark / Project..."
                placeholderTextColor={Color.cloudyGrey}
                onChangeText={value => setLocationInput(value)}
                style={{
                  flex: 1,
                  color: Color.black,
                  padding: 10,
                }}
                editable={false}
              />
              <MIcon
                name="my-location"
                size={20}
                color={Color.primary}
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity> */}
            <LocationBottomModal
              // visible={visible}
              // setVisible={setVisible}
              data={cityData}
              city_id={city_id}
            />
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              Property Type
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <FlatList
                nestedScrollEnabled
                data={filteredRentPropertyTypes}
                horizontal
                keyExtractor={(item, index) => item + index}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          RentSelectedItem?.type?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        width: width / 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        borderRadius: 10,
                        // height: 80,
                        marginVertical: 10,
                        padding: 10,
                        borderColor:
                          RentSelectedItem?.type?.id == item?.id
                            ? Color.primary
                            : Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        // RentTogglePropertyTypeItem(item.id, item?.value);
                        setRentSelectedItem({
                          post: RentSelectedItem?.post,
                          kind: RentSelectedItem?.kind,
                          type: item,
                          bedrooms: [],
                          furnished: {},
                          amenities: [],
                          listTypes: {},
                          reraApproved: {},
                          noSeats: '',
                          plotType: [],
                          totalBuildingFloors: 0,
                          noFloorsOnProperty: {},
                          plotArea: '',
                        });
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {/* <Image
                          source={item.image}
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'contain',
                            padding: 5,
                          }}
                        /> */}
                        <IconData
                          item={item.title}
                          select={
                            RentSelectedItem?.type?.id == item?.id
                              ? Color.primary
                              : Color.cloudyGrey
                          }
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontFamily: Poppins.Medium,
                            marginVertical: 5,
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
          {RentSelectedItem?.type?.value === 'Office' && (
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                No.Of Seats
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="Enter Your Seats"
                  placeholderTextColor={Color.cloudyGrey}
                  value={RentSelectedItem?.noSeats}
                  onChangeText={value => {
                    setRentSelectedItem({
                      post: RentSelectedItem?.post,
                      kind: RentSelectedItem?.kind,
                      type: RentSelectedItem?.type,
                      bedrooms: RentSelectedItem.bedrooms,
                      furnished: RentSelectedItem.furnished,
                      amenities: RentSelectedItem.amenities,
                      listTypes: RentSelectedItem.listTypes,
                      reraApproved: RentSelectedItem.reraApproved,
                      locationItem: RentSelectedItem.locationItem,
                      noSeats: value,
                      plotType: RentSelectedItem.plotType,
                      totalBuildingFloors: RentSelectedItem.totalBuildingFloors,
                      noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
                      plotArea: RentSelectedItem.plotArea,
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
          )}
          {/* {RentSelectedItem?.type?.value == 'Plot' && (
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Plot Type
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <FlatList
                  nestedScrollEnabled
                  data={PlotTypes}
                  horizontal
                  keyExtractor={(item, index) => item + index}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor: PlotTypeSelectedItem.includes(
                            item.id,
                          )
                            ? '#8C193F20'
                            : Color.white,
                          width: width / 4,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: 10,
                          borderRadius: 10,
                          marginVertical: 10,
                          padding: 10,
                          borderColor: PlotTypeSelectedItem.includes(item.id)
                            ? Color.primary
                            : Color.lightgrey,
                          borderWidth: 1,
                        }}
                        onPress={() => {
                          toggleRentPlotItem(item.id, item?.value);
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <IconData
                            item={item.title}
                            select={
                              PlotTypeSelectedItem.includes(item.id)
                                ? Color.primary
                                : Color.black
                            }
                          />
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Poppins.Medium,
                              marginVertical: 5,
                            }}>
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontWeight: 'bold',
                  }}>
                  Property Area
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    value={RentSelectedItem?.plotArea}
                    placeholder="Plot Area"
                    placeholderTextColor={Color.cloudyGrey}
                    keyboardType="number-pad"
                    onChangeText={text => {
                      setRentSelectedItem({
                        post: RentSelectedItem?.post,
                        kind: RentSelectedItem?.kind,
                        type: RentSelectedItem?.type,
                        bedrooms: RentSelectedItem.bedrooms,
                        furnished: RentSelectedItem.furnished,
                        amenities: RentSelectedItem.amenities,
                        listTypes: RentSelectedItem.listTypes,
                        reraApproved: RentSelectedItem.reraApproved,
                        locationItem: RentSelectedItem.locationItem,
                        noSeats: RentSelectedItem?.noSeats,
                        plotType: RentSelectedItem.plotType,
                        totalBuildingFloors:
                          RentSelectedItem.totalBuildingFloors,
                        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
                        plotArea: text,
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
              </View>
            </View>
          )} */}
          {RentSelectedItem?.type?.value == 'Flat' && (
            <View style={{marginVertical: 10}}>
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
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontWeight: 'bold',
                  marginVertical: 10,
                }}>
                Total No. of Floors in Building
              </Text>
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
                  disabled={RentSelectedItem.totalBuildingFloors == 0}
                  onPress={() => {
                    setRentSelectedItem({
                      post: RentSelectedItem?.post,
                      kind: RentSelectedItem?.kind,
                      type: RentSelectedItem?.type,
                      bedrooms: RentSelectedItem.bedrooms,
                      furnished: RentSelectedItem.furnished,
                      amenities: RentSelectedItem.amenities,
                      listTypes: RentSelectedItem.listTypes,
                      reraApproved: RentSelectedItem.reraApproved,
                      locationItem: RentSelectedItem.locationItem,
                      noSeats: RentSelectedItem.noSeats,
                      plotType: RentSelectedItem.plotType,
                      totalBuildingFloors:
                        RentSelectedItem.totalBuildingFloors - 1,
                      noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
                      plotArea: RentSelectedItem.plotArea,
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
                  <TextInput
                    value={buySelectedItem.totalBuildingFloors.toString()}
                    placeholderTextColor={Color.cloudyGrey}
                    style={{color: Color.black}}
                    keyboardType="number-pad"
                    onChangeText={text => {
                      setRentSelectedItem({
                        post: RentSelectedItem?.post,
                        kind: RentSelectedItem?.kind,
                        type: RentSelectedItem?.type,
                        bedrooms: RentSelectedItem.bedrooms,
                        furnished: RentSelectedItem.furnished,
                        amenities: RentSelectedItem.amenities,
                        listTypes: RentSelectedItem.listTypes,
                        reraApproved: RentSelectedItem.reraApproved,
                        locationItem: RentSelectedItem.locationItem,
                        noSeats: RentSelectedItem.noSeats,
                        plotType: RentSelectedItem.plotType,
                        totalBuildingFloors: text,
                        noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
                        plotArea: RentSelectedItem.plotArea,
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
                    setRentSelectedItem({
                      post: RentSelectedItem?.post,
                      kind: RentSelectedItem?.kind,
                      type: RentSelectedItem?.type,
                      bedrooms: RentSelectedItem.bedrooms,
                      furnished: RentSelectedItem.furnished,
                      amenities: RentSelectedItem.amenities,
                      listTypes: RentSelectedItem.listTypes,
                      reraApproved: RentSelectedItem.reraApproved,
                      locationItem: RentSelectedItem.locationItem,
                      noSeats: RentSelectedItem.noSeats,
                      plotType: RentSelectedItem.plotType,
                      totalBuildingFloors:
                        RentSelectedItem.totalBuildingFloors + 1,
                      plotArea: RentSelectedItem.plotArea,
                      noFloorsOnProperty: RentSelectedItem.noFloorsOnProperty,
                    });
                  }}>
                  <FIcon name="plus" size={18} color={Color.cloudyGrey} />
                </TouchableOpacity>
              </View>
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                  }}>
                  Floors No. of Your Property
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    {RentSelectedItem?.noFloorsOnProperty != '' ? (
                      <Text
                        style={{
                          color: Color.cloudyGrey,
                          flex: 1,
                          fontFamily: Poppins.SemiBold,
                          fontSize: 14,
                          textTransform: 'capitalize',
                        }}>
                        {RentSelectedItem?.noFloorsOnProperty?.label ??
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
                        style={{flex: 1}}
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
                            {rentfilteredFloors.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    setRentSelectedItem({
                                      post: RentSelectedItem?.post,
                                      kind: RentSelectedItem?.kind,
                                      type: RentSelectedItem?.type,
                                      bedrooms: RentSelectedItem.bedrooms,
                                      furnished: RentSelectedItem.furnished,
                                      amenities: RentSelectedItem.amenities,
                                      listTypes: RentSelectedItem.listTypes,
                                      reraApproved:
                                        RentSelectedItem.reraApproved,
                                      locationItem:
                                        RentSelectedItem.locationItem,
                                      noSeats: RentSelectedItem.noSeats,
                                      plotType: RentSelectedItem.plotType,
                                      totalBuildingFloors:
                                        RentSelectedItem.totalBuildingFloors,
                                      plotArea: RentSelectedItem.plotArea,
                                      noFloorsOnProperty: item,
                                    });
                                    setFloorVisible(false);
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
              </View>
            </View>
          )}
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              Price Range
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                {common_fn.formatNumberIndianEnglishCommas(Rentlow) || 0}{' '}
                {/* <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginVertical: 10,
                    fontFamily: Poppins.Medium,
                  }}>
                  K
                </Text> */}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                to
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  marginVertical: 10,
                  fontFamily: Poppins.SemiBold,
                }}>
                {common_fn.formatNumberIndianEnglishCommas(Renthigh) || 0}{' '}
                {/* <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginVertical: 10,
                    fontFamily: Poppins.Medium,
                  }}>
                  Lakh
                </Text> */}
              </Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <CustomRange
                low={item == 'Rent' && Rentlow}
                setLow={item == 'Rent' && setRentLow}
                high={item == 'Rent' && Renthigh}
                setHigh={item == 'Rent' && setRentHigh}
                min={item == 'Rent' && Rentmin}
                setMin={item == 'Rent' && setRentMin}
                max={item == 'Rent' && Rentmax}
                setMax={item == 'Rent' && setRentMax}
                handleValueChange={item == 'Rent' && RenthandleValueChange}
              />
            </View>
          </View>
          {RentSelectedItem?.type?.value === 'Plot' ||
          RentSelectedItem?.type?.value === 'shop' ||
          RentSelectedItem?.type?.value === 'Commercial' ||
          RentSelectedItem?.type?.value === 'Office' ? (
            <View />
          ) : (
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                BHK Type
              </Text>
              <View
                style={{
                  backgroundColor: Color.white,
                  paddingEnd: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {RentBedrooms.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: RentBHKSelectedItem.includes(item?.id)
                          ? '#8C193F20'
                          : Color.white,
                        // width: width / 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 5,
                        // height: 40,
                        padding: 10,
                        marginVertical: 10,
                        borderColor: RentBHKSelectedItem.includes(item?.id)
                          ? Color.primary
                          : Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => RentToggleBHKItem(item.id, item?.value)}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.black,
                          fontFamily: Poppins.Medium,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {RentSelectedItem?.type?.value != 'Plot' && (
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Furnishing Type
              </Text>
              <View
                style={{
                  backgroundColor: Color.white,
                  paddingEnd: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                {RentFurnishingStatus.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          RentSelectedItem?.furnished?.id == item?.id
                            ? '#8C193F20'
                            : Color.white,
                        // width: width / 2.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 10,
                        // height: 80,
                        marginVertical: 10,
                        padding: 10,
                        borderColor: Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setRentSelectedItem({
                          post: RentSelectedItem?.post,
                          kind: RentSelectedItem?.kind,
                          type: RentSelectedItem?.type,
                          bedrooms: RentSelectedItem.bedrooms,
                          furnished: item,
                          amenities: RentSelectedItem.amenities,
                          listTypes: RentSelectedItem.listTypes,
                          reraApproved: RentSelectedItem.reraApproved,
                          locationItem: RentSelectedItem.locationItem,
                          noSeats: RentSelectedItem.noSeats,
                          plotType: RentSelectedItem.plotType,
                          totalBuildingFloors:
                            RentSelectedItem.totalBuildingFloors,
                          noFloorsOnProperty:
                            RentSelectedItem.noFloorsOnProperty,
                          plotArea: RentSelectedItem.plotArea,
                        });
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black,
                            fontFamily: Poppins.Medium,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
          {/* <TouchableOpacity
            onPress={() => {
              setMore(!more);
            }}
            style={{marginVertical: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                {!more ? 'Add More' : 'Add Less'}
              </Text>
              <FIcon
                name={!more ? 'plus' : 'minus'}
                size={18}
                color={Color.black}
              />
            </View>
            <Divider style={{height: 1, marginVertical: 10}} />
          </TouchableOpacity> */}
          {/* {more && ( */}
          <View>
            {RentSelectedItem?.type?.value === 'Plot' ||
            RentSelectedItem?.type?.value === 'shop' ||
            RentSelectedItem?.type?.value === 'Commercial' ||
            RentSelectedItem?.type?.value === 'Office' ? (
              <View />
            ) : (
              <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Amenities
                </Text>
                <View
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  <FlatList
                    nestedScrollEnabled
                    data={Amenities}
                    horizontal
                    keyExtractor={(item, index) => item + index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor:
                              // buySelectedItem?.amenities?.id == item?.id
                              //   ? '#8C193F20'
                              //   : Color.white,
                              RentAmenitiesSelectedItem.includes(item.id)
                                ? '#8C193F20'
                                : Color.white,
                            width: width / 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 10,
                            borderRadius: 10,
                            // height: 80,
                            marginVertical: 10,
                            padding: 10,
                            borderColor: Color.lightgrey,
                            borderWidth: 1,
                          }}
                          onPress={() =>
                            RentToggleAmenitiesItem(item.id, item?.value)
                          }>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* <Image
                                source={item.image}
                                style={{
                                  height: 30,
                                  width: 30,
                                  resizeMode: 'contain',
                                }}
                              /> */}
                            <IconData
                              item={item.title}
                              select={
                                RentAmenitiesSelectedItem.includes(item.id)
                                  ? Color.primary
                                  : Color.black
                              }
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: Color.black,
                                fontFamily: Poppins.Medium,
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
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}>
                Listed By
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <FlatList
                  nestedScrollEnabled
                  data={RentlistedBy}
                  keyExtractor={(item, index) => item + index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          backgroundColor:
                            RentSelectedItem?.listTypes?.id == item?.id
                              ? '#8C193F20'
                              : Color.white,
                          borderRadius: 10,
                          marginVertical: 10,
                          padding: 10,
                          marginHorizontal: 5,
                          borderColor: Color.lightgrey,
                          borderWidth: 1,
                        }}
                        onPress={() => {
                          setRentSelectedItem({
                            post: RentSelectedItem?.post,
                            kind: RentSelectedItem?.kind,
                            type: RentSelectedItem?.type,
                            bedrooms: RentSelectedItem.bedrooms,
                            furnished: RentSelectedItem.furnished,
                            amenities: RentSelectedItem.amenities,
                            listTypes: item,
                            reraApproved: RentSelectedItem.reraApproved,
                            locationItem: RentSelectedItem.locationItem,
                            noSeats: RentSelectedItem.noSeats,
                            plotType: RentSelectedItem.plotType,
                            totalBuildingFloors:
                              RentSelectedItem.totalBuildingFloors,
                            noFloorsOnProperty:
                              RentSelectedItem.noFloorsOnProperty,
                            plotArea: RentSelectedItem.plotArea,
                          });
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {RentSelectedItem?.listTypes?.id == item?.id ? (
                            <FIcon
                              name="check-circle"
                              size={18}
                              color={Color.primary}
                            />
                          ) : (
                            <FIcon name="plus" size={18} color={Color.black} />
                          )}
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 14,
                              color: Color.black,
                              fontFamily: Poppins.Medium,
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
            {/* <View style={{marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.black,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  RERA Approved
                </Text>
                <View
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  <FlatList
                    nestedScrollEnabled
                    data={RentReraApproved}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor:
                              RentSelectedItem?.reraApproved?.id == item?.id
                                ? '#8C193F20'
                                : Color.white,
                            borderRadius: 10,
                            marginVertical: 10,
                            padding: 10,
                            marginHorizontal: 5,
                            borderColor: Color.lightgrey,
                            borderWidth: 1,
                          }}
                          onPress={() => {
                            setRentSelectedItem({
                              post: RentSelectedItem?.post,
                              kind: RentSelectedItem?.kind,
                              type: RentSelectedItem?.type,
                              bedrooms: RentSelectedItem.bedrooms,
                              furnished: RentSelectedItem.furnished,
                              amenities: RentSelectedItem.amenities,
                              listTypes: RentSelectedItem.listTypes,
                              reraApproved: item,
                              locationItem: RentSelectedItem.locationItem,
                              noSeats:RentSelectedItem.noSeats,
                              plotType: RentSelectedItem.plotType,
                            });
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {RentSelectedItem?.reraApproved?.id == item?.id ? (
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
                                fontFamily: Poppins.Medium,
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
            <Divider style={{height: 1, marginVertical: 5}} />
          </View>
          {/* )} */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => setRentAgree(!RentAgree)}>
              <MCIcon
                name={RentAgree ? 'checkbox-marked' : 'checkbox-blank-outline'}
                color={Color.primary}
                size={25}
                style={{}}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 14,
                fontFamily: Poppins.SemiBold,
                color: Color.cloudyGrey,
              }}>
              Properties with Discounts and Offers
            </Text>
            <MCIcon name="brightness-percent" size={18} color={Color.primary} />
          </View>
          <View style={{}}>
            <Button
              // title={`Search Result ${countFilter ?? 0}`}
              title={`Search`}
              buttonStyle={{backgroundColor: Color.primary, height: 40}}
              onPress={() => {
                if (Object.values(RentSelectedItem?.kind)?.length == 0) {
                  Alert.alert(
                    '',
                    'Please Choose Your Property Kind',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {},
                      },
                    ],
                    {cancelable: false},
                  );
                } else if (city == '') {
                  Alert.alert(
                    '',
                    'Choose Your Location',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {},
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  getFilterData();
                }
              }}
              // loading={countLoad}
            />
          </View>
        </SafeAreaView>
      );
    case 'PG':
      return (
        <SafeAreaView style={{flex: 1}}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                  marginVertical: 10,
                }}>
                Location / Landmark
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
            <LocationBottomModal data={cityData} city_id={city_id} />
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
                marginVertical: 10,
              }}>
              Boys/Girls
            </Text>
            <View
              style={{
                backgroundColor: Color.white,
                paddingEnd: 10,
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {genderData.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        pgSelectedItem?.gender?.id == item?.id
                          ? Color.primary
                          : Color.white,
                      // width: width / 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      borderRadius: 5,
                      // height: 40,
                      padding: 10,
                      marginVertical: 10,
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      setPgSelectedItem({
                        gender: item,
                        occupency: pgSelectedItem.occupency,
                        budget: {
                          minBudget: pgSelectedItem?.budget.minValue,
                          maxBudget: pgSelectedItem?.budget.maxBudget,
                        },
                        amenities: pgSelectedItem.amenities,
                        foods: pgSelectedItem.foods,
                        tenants: pgSelectedItem.tenants,
                        verifiedPG: pgSelectedItem.verifiedPG,
                        since: pgSelectedItem.since,
                        posted: pgSelectedItem.posted,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          pgSelectedItem?.gender?.id == item?.id
                            ? Color.white
                            : Color.black,
                        fontFamily: Poppins.Medium,
                        // marginVertical: 10,
                      }}>
                      {item.title}
                    </Text>
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
                fontFamily: Poppins.SemiBold,
              }}>
              Occupancy Type
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {PGoccupency.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: occupencySelectedItem.includes(item?.id)
                        ? Color.primary
                        : Color.white,
                      // width: width / 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      borderRadius: 10,
                      // height: 80,
                      marginVertical: 10,
                      padding: 10,
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      handleOccupencyPress(item?.id, item?.value);
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="bed"
                        size={25}
                        color={
                          occupencySelectedItem.includes(item?.id)
                            ? Color.white
                            : Color.cloudyGrey
                        }
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: occupencySelectedItem.includes(item?.id)
                            ? Color.white
                            : Color.black,
                          fontFamily: Poppins.Medium,
                        }}>
                        {item.value}
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
                fontFamily: Poppins.SemiBold,
                marginVertical: 10,
              }}>
              Budget
            </Text>
            <View
              style={{
                backgroundColor: Color.white,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Dropdown
                style={{
                  marginHorizontal: 10,
                  backgroundColor: Color.white,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  height: 40,
                  width: 150,
                }}
                placeholderStyle={{
                  fontSize: 16,
                  color: Color.black,
                  marginHorizontal: 10,
                  fontFamily: Poppins.Medium,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}
                iconStyle={{width: 20, height: 20}}
                itemTextStyle={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  fontFamily: Poppins.Medium,
                }}
                data={minBudget}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="₹ Min"
                searchPlaceholder="Search..."
                value={pgSelectedItem?.budget?.minBudget}
                onChange={item => {
                  setPgSelectedItem({
                    gender: pgSelectedItem.gender,
                    occupency: pgSelectedItem?.occupency,
                    budget: {
                      minBudget: item?.value,
                      maxBudget: pgSelectedItem?.budget?.maxBudget,
                    },
                    amenities: pgSelectedItem.amenities,
                    foods: pgSelectedItem.foods,
                    tenants: pgSelectedItem.tenants,
                    verifiedPG: pgSelectedItem.verifiedPG,
                    since: pgSelectedItem.since,
                    posted: pgSelectedItem.posted,
                  });
                }}
                renderRightIcon={() => (
                  <Icon
                    style={{width: 20, height: 20}}
                    color={Color.black}
                    name="caret-down"
                    size={20}
                  />
                )}
              />
              <Dropdown
                style={{
                  marginHorizontal: 10,
                  backgroundColor: Color.white,
                  borderColor: Color.cloudyGrey,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  height: 40,
                  width: 150,
                }}
                placeholderStyle={{
                  fontSize: 16,
                  color: Color.black,
                  marginHorizontal: 10,
                  fontFamily: Poppins.Medium,
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  color: Color.black,
                  fontFamily: Poppins.SemiBold,
                }}
                iconStyle={{width: 20, height: 20}}
                itemTextStyle={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  fontFamily: Poppins.Medium,
                }}
                data={maxBudget}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="₹ Max"
                searchPlaceholder="Search..."
                value={pgSelectedItem?.budget?.maxBudget}
                onChange={item => {
                  setPgSelectedItem({
                    gender: pgSelectedItem.gender,
                    occupency: pgSelectedItem?.occupency,
                    budget: {
                      minBudget: pgSelectedItem?.budget?.minValue,
                      maxBudget: item?.value,
                    },
                    amenities: pgSelectedItem.amenities,
                    foods: pgSelectedItem.foods,
                    tenants: pgSelectedItem.tenants,
                    verifiedPG: pgSelectedItem.verifiedPG,
                    since: pgSelectedItem.since,
                    posted: pgSelectedItem.posted,
                  });
                }}
                renderRightIcon={() => (
                  <Icon
                    style={{width: 20, height: 20}}
                    color={Color.black}
                    name="caret-down"
                    size={20}
                  />
                )}
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
              }}>
              Amenities
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <FlatList
                nestedScrollEnabled
                data={PGAmenities}
                keyExtractor={(item, index) => item + index}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: PGAmenitiesSelectedItem.includes(
                          item?.id,
                        )
                          ? Color.primary
                          : Color.white,
                        width: width / 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 10,
                        // height: 80,
                        marginVertical: 10,
                        padding: 10,
                        borderColor: Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        handlePGAmenitiesPress(item?.id, item?.value);
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            height: 30,
                            width: 30,
                            resizeMode: 'contain',
                            tintColor: PGAmenitiesSelectedItem.includes(
                              item?.id,
                            )
                              ? Color.white
                              : Color.cloudyGrey,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: PGAmenitiesSelectedItem.includes(item?.id)
                              ? Color.white
                              : Color.black,
                            fontFamily: Poppins.Medium,
                            marginVertical: 5,
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
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
                marginVertical: 10,
              }}>
              Food Provided
            </Text>
            <View
              style={{
                backgroundColor: Color.white,
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {PGFoodData.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        pgSelectedItem?.foods?.id == item?.id
                          ? Color.primary
                          : Color.white,
                      // width: width / 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                      borderRadius: 5,
                      padding: 5,
                      // height: 40,

                      marginVertical: 10,
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                    }}
                    onPress={() => {
                      setPgSelectedItem({
                        gender: pgSelectedItem.gender,
                        occupency: pgSelectedItem.occupency,
                        budget: {
                          minBudget: pgSelectedItem?.budget.minValue,
                          maxBudget: pgSelectedItem?.budget.maxBudget,
                        },
                        amenities: pgSelectedItem.amenities,
                        foods: item,
                        tenants: pgSelectedItem.tenants,
                        verifiedPG: pgSelectedItem.verifiedPG,
                        since: pgSelectedItem.since,
                        posted: pgSelectedItem.posted,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          pgSelectedItem?.foods?.id == item?.id
                            ? Color.white
                            : Color.black,
                        fontFamily: Poppins.Medium,
                      }}>
                      {item.value}
                    </Text>
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
                fontFamily: Poppins.SemiBold,
                marginVertical: 10,
              }}>
              Preferred Tenants
            </Text>
            <View
              style={{
                backgroundColor: Color.white,
                paddingEnd: 10,
              }}>
              <FlatList
                data={PGPreferredTenants}
                horizontal
                // numColumns={3}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          pgSelectedItem?.tenants?.id == item?.id
                            ? Color.primary
                            : Color.white,
                        // width: width / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 5,
                        padding: 5,
                        // height: 40,
                        marginVertical: 10,
                        borderColor: Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setPgSelectedItem({
                          gender: pgSelectedItem.gender,
                          occupency: pgSelectedItem.occupency,
                          budget: {
                            minBudget: pgSelectedItem?.budget.minValue,
                            maxBudget: pgSelectedItem?.budget.maxBudget,
                          },
                          amenities: pgSelectedItem.amenities,
                          foods: pgSelectedItem.foods,
                          tenants: item,
                          verifiedPG: pgSelectedItem.verifiedPG,
                          since: pgSelectedItem.since,
                          posted: pgSelectedItem.posted,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            pgSelectedItem?.tenants?.id == item?.id
                              ? Color.white
                              : Color.black,
                          fontFamily: Poppins.Medium,
                        }}>
                        {item.value}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
                marginVertical: 10,
              }}>
              Operating Since
            </Text>
            <View
              style={{
                backgroundColor: Color.white,
                paddingEnd: 10,
              }}>
              <FlatList
                data={PGOperatingSince}
                horizontal
                // numColumns={3}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          pgSelectedItem?.since?.id == item?.id
                            ? Color.primary
                            : Color.white,
                        // width: width / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 5,
                        padding: 5,
                        // height: 40,
                        marginVertical: 10,
                        borderColor: Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setPgSelectedItem({
                          gender: pgSelectedItem.gender,
                          occupency: pgSelectedItem.occupency,
                          budget: {
                            minBudget: pgSelectedItem?.budget.minValue,
                            maxBudget: pgSelectedItem?.budget.maxBudget,
                          },
                          amenities: pgSelectedItem.amenities,
                          foods: pgSelectedItem.foods,
                          tenants: pgSelectedItem.tenants,
                          verifiedPG: pgSelectedItem.verifiedPG,
                          since: item,
                          posted: pgSelectedItem.posted,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            pgSelectedItem?.since?.id == item?.id
                              ? Color.white
                              : Color.black,
                          fontFamily: Poppins.Medium,
                        }}>
                        {item.value}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Poppins.SemiBold,
                marginVertical: 10,
              }}>
              Posted By
            </Text>
            <View
              style={{
                backgroundColor: Color.white,
                paddingEnd: 10,
              }}>
              <FlatList
                data={PGPosted}
                horizontal
                // numColumns={3}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          pgSelectedItem?.posted?.id == item?.id
                            ? Color.primary
                            : Color.white,
                        // width: width / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 5,
                        padding: 5,
                        // height: 40,
                        marginVertical: 10,
                        borderColor: Color.lightgrey,
                        borderWidth: 1,
                      }}
                      onPress={() => {
                        setPgSelectedItem({
                          gender: pgSelectedItem.gender,
                          occupency: pgSelectedItem.occupency,
                          budget: {
                            minBudget: pgSelectedItem?.budget.minValue,
                            maxBudget: pgSelectedItem?.budget.maxBudget,
                          },
                          amenities: pgSelectedItem.amenities,
                          foods: pgSelectedItem.foods,
                          tenants: pgSelectedItem.tenants,
                          verifiedPG: pgSelectedItem.verifiedPG,
                          since: pgSelectedItem.since,
                          posted: item,
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color:
                            pgSelectedItem?.posted?.id == item?.id
                              ? Color.white
                              : Color.black,
                          fontFamily: Poppins.Medium,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity style={{}} onPress={() => setAgree(!agree)}>
              <MCIcon
                name={agree ? 'checkbox-marked' : 'checkbox-blank-outline'}
                color={Color.primary}
                size={20}
                style={{}}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 14,
                fontFamily: Poppins.SemiBold,
                color: Color.cloudyGrey,
              }}>
              Properties with Discounts and Offers
            </Text>
            <MCIcon name="brightness-percent" size={18} color={Color.primary} />
          </View>
          <View style={{}}>
            <Button
              // title={`Search Result ${countFilter ?? 0}`}
              title={`Search`}
              buttonStyle={{backgroundColor: Color.primary, height: 40}}
              onPress={() => {
                if (city == '') {
                  Alert.alert(
                    '',
                    'Choose Your Location',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {},
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  getFilterData();
                }
              }}
              // loading={countLoad}
            />
          </View>
        </SafeAreaView>
      );
  }
};

const FilterScreen = ({navigation, route}) => {
  const [selectedItem, setSelectedItem] = useState(route.params.selectItem);
  const [city_id] = useState(route.params.city_id);
  const [agree, setAgree] = useState(false);
  const [propertyKind] = useState([
    {id: 1, title: 'Residential', value: 'Residential'},
    {id: 2, title: 'Commercial', value: 'Commercial'},
  ]);
  const dispatch = useDispatch();
  //buy
  const [buySelectedItem, setBuySelectedItem] = useState({
    post: {
      id: 1,
      title: 'Buy',
      value: 'sell',
    },
    kind: {},
    type: [],
    noSeats: '',
    bedrooms: [],
    furnished: {},
    plotType: [],
    amenities: [],
    listTypes: {},
    reraApproved: {},
    totalBuildingFloors: 0,
    noFloorsOnProperty: {},
    plotArea: '',
  });

  const [AmenitiesSelectedItem, setAmenitiesSelectedItem] = useState([]);
  const [PropertyTypeSelectedItem, setPropertyTypeSelectedItem] = useState([]);
  const [PlotTypeSelectedItem, setPlotTypeSelectedItem] = useState([]);
  const [BHKSelectedItem, setBHKSelectedItem] = useState([]);

  const filter_data = useSelector(state => state.UserReducer.filterLocation);
  const AutoFilter = useSelector(state => state.UserReducer.AutoFilter);
  var {city, landmark} = filter_data;
  const [locationInput, setLocationInput] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countLoad, setCountLoad] = useState(false);
  const [prevDataPayload, setPrevDataPayload] = useState(null);

  const [Propertylow, setPropertyLow] = useState(500000);
  const [Propertyhigh, setPropertyHigh] = useState(200000000);
  const [Propertymin, setPropertyMin] = useState(500000);
  const [Propertymax, setPropertyMax] = useState(200000000);

  const [lowsqrt, setLowsqrt] = useState(1000);
  const [highsqrt, setHighsqrt] = useState(8000);
  const [minsqrt, setMinsqrt] = useState(1000);
  const [maxsqrt, setMaxsqrt] = useState(8000);

  const [types] = useState([
    {id: 1, title: 'Buy', value: 'sell'},
    {id: 2, title: 'Rent', value: 'rent'},
    {id: 3, title: 'PG', value: 'PG'},
  ]);
  const [propertyTypes] = useState([
    {id: 1, title: 'Villa', value: 'villa', image: Media.lift},
    {id: 2, title: 'House', value: 'house', image: Media.lift},
    {id: 3, title: 'Flat', value: 'Flat', image: Media.parking},
    {id: 4, title: 'Plot', value: 'Plot', image: Media.water},
    {id: 5, title: 'Office Space', value: 'Office', image: Media.water},
    {id: 6, title: 'shop', value: 'shop', image: Media.water},
  ]);
  const [PlotTypes] = useState([
    {id: 1, title: 'Agriculture', value: 'Agriculture', image: Media.water},
  ]);
  const [Bedrooms] = useState([
    {id: 1, title: '1 BHK', value: 1},
    {id: 2, title: '2 BHK', value: 2},
    {id: 3, title: '3 BHK', value: 3},
    {id: 4, title: '4 BHK', value: 4},
    {id: 5, title: '5 BHK', value: 5},
  ]);
  const [FurnishingStatus] = useState([
    {
      id: 1,
      title: 'Furnished',
      image: Media.furniture,
      value: 'furnished',
    },
    {
      id: 2,
      title: 'Semi Furnished',
      image: Media.furniture,
      value: 'semi_furnished',
    },
    {
      id: 3,
      title: 'Un Furnished',
      image: Media.furniture,
      value: 'unfurnished',
    },
  ]);
  const [Amenities] = useState([
    {id: 1, title: 'Water Storage', value: 'water_storage'},
    {id: 2, title: 'Park', value: 'park'},
    {id: 3, title: 'Lift', value: 'lift'},
    {id: 4, title: 'Visitor Parking', value: 'visitor_parking'},
    {id: 5, title: 'Piped gas', value: 'piped_gas'},
    {id: 6, title: 'Lights', value: 'lights'},
    {id: 7, title: 'Maintenance Staff', value: 'maintenance_staff'},
  ]);
  const [listedBy, setListedBy] = useState([
    {id: 1, title: 'Owner', value: 'Owner'},
    {id: 2, title: 'Agent', value: 'Agent'},
    {id: 3, title: 'Builder', value: 'Builder'},
  ]);
  const [reraApproved, setReraApproved] = useState([
    {
      id: 1,
      title: 'RERA Approved properties',
      value: 'RERA Approved properties',
    },
    {id: 2, title: 'RERA Registered Agent', value: 'RERA Registered Agent'},
    {id: 3, title: 'DTCP Approved', value: 'DTCP Approved'},
  ]);
  const handleValueChange = useCallback((low, high) => {
    setPropertyLow(low);
    setPropertyHigh(high);
  }, []);
  const handlesqrtValueChange = useCallback((lowsqrt, highsqrt) => {
    setLowsqrt(lowsqrt);
    setHighsqrt(highsqrt);
  }, []);
  const [data] = useState([
    {
      id: 1,
      city: 'Coimbatore',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 2,
      city: 'Salem',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 3,
      city: 'Namakkal',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 4,
      city: 'Chennai',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 5,
      city: 'Tiruppur',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 6,
      city: 'Ramanathapuram',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
  ]);
  const [filterLocationData, setFilterLocationData] = useState([]);
  const [Section] = useState([
    {id: 1, title: 'types', data: ['types']},
    {id: 2, title: 'type_Details', data: ['type_Details']},
  ]);

  //Rent
  const [RentAgree, setRentAgree] = useState(false);
  const [RentSelectedItem, setRentSelectedItem] = useState({
    post: {
      id: 1,
      title: 'Buy',
      value: 'sell',
    },
    kind: {},
    type: [],
    bedrooms: [],
    furnished: {},
    amenities: [],
    listTypes: {},
    reraApproved: {},
    noSeats: '',
    plotType: [],
    totalBuildingFloors: 0,
    noFloorsOnProperty: {},
    plotArea: '',
  });

  const [RentAmenitiesSelectedItem, setRentAmenitiesSelectedItem] = useState(
    [],
  );
  const [RentPropertyTypeSelectedItem, setRentPropertyTypeSelectedItem] =
    useState([]);
  const [RentBHKSelectedItem, setRentBHKSelectedItem] = useState([]);

  const [Rentlow, setRentLow] = useState(1000);
  const [Renthigh, setRentHigh] = useState(1000000);
  const [Rentmin, setRentMin] = useState(1000);
  const [Rentmax, setRentMax] = useState(1000000);
  const [RentpropertyTypes] = useState([
    {id: 1, title: 'House', value: 'house', image: Media.lift},
    {id: 2, title: 'Villa', value: 'villa', image: Media.lift},
    {id: 3, title: 'Flat', value: 'Flat', image: Media.parking},
    {id: 4, title: 'Plot', value: 'Plot', image: Media.water},
    {id: 5, title: 'Office Space', value: 'Office', image: Media.water},
    {id: 6, title: 'shop', value: 'shop', image: Media.water},
  ]);
  const [RentBedrooms] = useState([
    {id: 1, title: '1 BHK', value: 1},
    {id: 2, title: '2 BHK', value: 2},
    {id: 3, title: '3 BHK', value: 3},
    {id: 4, title: '4 BHK', value: 4},
    {id: 5, title: '5 BHK', value: 5},
  ]);
  const [RentFurnishingStatus] = useState([
    {
      id: 1,
      title: 'Furnished',
      image: Media.furniture,
      value: 'furnished',
    },
    {
      id: 2,
      title: 'Semi Furnished',
      image: Media.furniture,
      value: 'semi_furnished',
    },
    {
      id: 3,
      title: 'Un Furnished',
      image: Media.furniture,
      value: 'unfurnished',
    },
  ]);

  const [floors] = useState([
    {id: 1, label: 'basement', value: 'basement'},
    {id: 2, label: 'ground Floor', value: 'ground Floor'},
    {id: 3, label: '1', value: '1'},
    {id: 4, label: '2', value: '2'},
    {id: 5, label: '3', value: '3'},
    {id: 6, label: '4', value: '4'},
    {id: 7, label: '5', value: '5'},
    {id: 8, label: '6', value: '6'},
    {id: 9, label: '7', value: '7'},
    {id: 10, label: '8', value: '8'},
    {id: 11, label: '9', value: '9'},
    {id: 12, label: '10', value: '10'},
    {id: 13, label: '11', value: '11'},
    {id: 14, label: '12', value: '12'},
    {id: 15, label: '13', value: '13'},
    {id: 16, label: '14', value: '14'},
    {id: 17, label: '15', value: '15'},
  ]);

  const buyfilteredFloors = floors.filter(
    floor => floor.label <= buySelectedItem?.totalBuildingFloors,
  );
  buyfilteredFloors.unshift(
    {id: 1, label: 'basement', value: 'basement'},
    {id: 2, label: 'ground Floor', value: 'ground Floor'},
  );

  const rentfilteredFloors = floors.filter(
    floor => floor.label <= RentSelectedItem?.totalBuildingFloors,
  );
  rentfilteredFloors.unshift(
    {id: 1, label: 'basement', value: 'basement'},
    {id: 2, label: 'ground Floor', value: 'ground Floor'},
  );

  const [plotStatus, setPlotStatus] = useState('sq.ft');
  const [plotValue, setPlotValue] = useState('');
  const [plotAreaunit] = useState([
    {label: 'sq.ft', value: 'sq.ft'},
    {label: 'cent', value: 'cent'},
  ]);
  const [RentAmenities] = useState([
    {id: 1, title: 'Water Storage', value: 'Water Storage'},
    {id: 2, title: 'Park', value: 'Park'},
    {id: 3, title: 'Lift', value: 'Lift'},
    {id: 4, title: 'Visitor Parking', value: 'Visitor Parking'},
    {id: 5, title: 'Piped gas', value: 'Piped gas'},
    {id: 6, title: 'Lights', value: 'Lights'},
    {id: 7, title: 'Maintenance Staff', value: 'Maintenance Staff'},
  ]);
  const [RentlistedBy, setRentListedBy] = useState([
    {id: 1, title: 'Owner', value: 'Owner'},
    {id: 2, title: 'Agent', value: 'Agent'},
    {id: 3, title: 'Builder', value: 'Builder'},
  ]);
  const [RentReraApproved, setRentReraApproved] = useState([
    {
      id: 1,
      title: 'RERA Approved properties',
      value: 'RERA Approved properties',
    },
    {id: 2, title: 'RERA Registered Agent', value: 'RERA Registered Agent'},
    {id: 3, title: 'DTCP Approved', value: 'DTCP Approved'},
  ]);
  const RenthandleValueChange = useCallback((low, high) => {
    setRentLow(low);
    setRentHigh(high);
  }, []);

  const [Rentdata] = useState([
    {
      id: 1,
      city: 'Coimbatore',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 2,
      city: 'Salem',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 3,
      city: 'Namakkal',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 4,
      city: 'Chennai',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 5,
      city: 'Tiruppur',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
    {
      id: 6,
      city: 'Ramanathapuram',
      landmark: [
        {
          id: 1,
          landmark: 'ramananthapuram',
        },
        {
          id: 2,
          landmark: 'Sai Baba Colony',
        },
        {
          id: 3,
          landmark: 'ondiputhur',
        },
        {
          id: 4,
          landmark: 'lakshmi mills',
        },
      ],
    },
  ]);
  const [RentfilterLocation, setRentFilterLocation] = useState([]);

  //PG
  const [pgSelectedItem, setPgSelectedItem] = useState({
    gender: {},
    occupency: [],
    budget: {
      minValue: '',
      MaxValue: '',
    },
    amenities: [],
    foods: {},
    tenants: {},
    verifiedPG: {},
    since: {},
    posted: {},
  });

  const [genderData, setGenderData] = useState([
    {id: 1, title: 'male', value: 'male'},
    {id: 2, title: 'female', value: 'female'},
    {id: 3, title: 'both', value: 'both'},
  ]);
  const [PGFoodData, setPGFoodData] = useState([
    {id: 1, label: 'Veg', value: 'Veg'},
    {id: 2, label: 'Veg & Non-Veg', value: 'Veg & Non-Veg'},
  ]);
  const [PGoccupency, setPGoccupency] = useState([
    {id: 1, title: 'single', value: 'single'},
    {id: 2, title: 'double', value: 'double'},
    {id: 3, title: 'triple', value: 'triple'},
    {id: 4, title: 'four', value: 'four'},
  ]);
  const [PGPreferredTenants, setPGPreferredTenants] = useState([
    {id: 1, title: 'professionals', value: 'professionals'},
    {id: 2, title: 'student', value: 'student'},
    {id: 3, title: 'both', value: 'both'},
  ]);
  const [VerifiedPG, setVerifiedPG] = useState([{id: 1, value: 'Verified'}]);
  const [PGOperatingSince, setPGOperatingSince] = useState([
    {id: 1, value: 'Last 5 Years'},
    {id: 2, value: 'Last 10 Years'},
    {id: 3, value: 'Any'},
  ]);
  const [minBudget] = useState([
    {label: '1000', value: '1000'},
    {label: '5000', value: '5000'},
    {label: '10000', value: '10000'},
    {label: '50000', value: '50000'},
  ]);
  const [maxBudget] = useState([
    {label: '5000', value: '5000'},
    {label: '10000', value: '10000'},
    {label: '50000', value: '50000'},
    {label: '100000', value: '100000'},
  ]);
  const [PGAmenities, setPGAmenities] = useState([
    {id: 1, title: 'Wifi', value: 'Wifi', image: Media.Wifi},
    {id: 2, title: 'AC', value: 'Ac', image: Media.Airconditioner},
    {
      id: 3,
      title: 'Power BackUp',
      value: 'Power BackUp',
      image: Media.Mattress,
    },
    {
      id: 4,
      title: 'Cleaning',
      value: 'Cleaning',
      image: Media.Electricgenerator,
    },
  ]);
  const [PGPosted] = useState([
    {id: 1, title: 'Owner', value: 'owner'},
    {id: 2, title: 'Agent', value: 'agent'},
    {id: 3, title: 'Builder', value: 'builder'},
  ]);

  const dataPayload = () => {
    const priceRange = {low: Propertylow, high: Propertyhigh};
    const rentPriceRange = {low: Rentlow, high: Renthigh};
    const pgPriceRange = {
      low: pgSelectedItem?.budget?.minValue,
      high: pgSelectedItem?.budget?.MaxValue,
    };

    const payload = {
      property_action:
        selectedItem?.title === 'PG' ? 'rent' : selectedItem?.value,
      real_estate:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.kind?.value
          : selectedItem?.title === 'PG'
          ? 'residential'
          : RentSelectedItem?.kind?.value,
      location: filter_data?.city ?? AutoFilter,
      min_budget:
        selectedItem?.title === 'Buy'
          ? priceRange?.low
          : selectedItem?.title === 'PG'
          ? pgPriceRange?.low
          : rentPriceRange?.low,
      max_budget:
        selectedItem?.title === 'Buy'
          ? priceRange?.high
          : selectedItem?.title === 'PG'
          ? pgPriceRange?.high
          : rentPriceRange?.high,
      locality: filter_data?.landmark,
      property_type:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.type?.value
          : selectedItem?.title === 'PG'
          ? 'pg'
          : RentSelectedItem?.type?.value,
      bedroom:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.bedrooms.join(',')
          : RentSelectedItem?.bedrooms.join(','),
      room_category: pgSelectedItem?.occupency.join(','),
      amenities:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.amenities.join(',')
          : selectedItem?.title === 'PG'
          ? pgSelectedItem?.amenities.join(',')
          : RentSelectedItem?.amenities.join(','),
      furnish_status:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.furnished?.value
          : RentSelectedItem?.furnished?.value,
      seller_type:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.listTypes?.value
          : selectedItem?.title === 'PG'
          ? pgSelectedItem?.posted?.value
          : RentSelectedItem?.listTypes?.value,
      super_area:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.plotArea
          : RentSelectedItem?.plotArea,
      floor:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.noFloorsOnProperty?.value
          : RentSelectedItem?.noFloorsOnProperty?.value,
      total_floors:
        selectedItem?.title === 'Buy'
          ? buySelectedItem?.totalBuildingFloors
          : RentSelectedItem?.totalBuildingFloors,

      gender: pgSelectedItem?.gender?.value,
      occupency: pgSelectedItem?.occupency?.value,
      foods: pgSelectedItem?.foods?.value,
      tenants: pgSelectedItem?.tenants?.value,
      verifiedPG: pgSelectedItem?.verifiedPG?.value,
      since: pgSelectedItem?.since?.value,
    };

    let params = '';

    for (const key in payload) {
      const value = payload[key];

      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        value !== 0
      ) {
        if (key === 'location' || key === 'locality') {
          params += `${key}=${encodeURIComponent(value)}&`;
        } else if (
          (key === 'bedroom' || key === 'amenities') &&
          value !== undefined &&
          value !== null &&
          value !== 0 &&
          value?.length > 0
        ) {
          params += `${key}=${value}&`;
        } else if (
          key === 'property_type' ||
          key === 'furnish_status' ||
          key === 'seller_type'
        ) {
          params += `${key}=${encodeURIComponent(value)}&`;
        } else {
          params += `${key}=${value}&`;
        }
      }
    }
    return params.slice(0, -1);
  };

  const getFilterData = async () => {
    const data = dataPayload();
    const location = filter_data?.city ?? AutoFilter;
    if (selectedItem?.title === 'Buy') {
      if (buySelectedItem?.kind?.value === 'Residential') {
        if (buySelectedItem?.type?.value !== 'Plot') {
          navigateTo('BUY', 'residential', '');
        } else {
          navigateTo('Commercial', 'commercial', 'plot');
        }
      } else if (buySelectedItem?.kind?.value === 'Commercial') {
        navigateTo('Commercial', 'commercial', '');
      }
    } else if (selectedItem?.title === 'Rent') {
      if (RentSelectedItem?.kind?.value === 'Residential') {
        if (RentSelectedItem?.type?.value !== 'Plot') {
          navigateTo('Rent', 'residential', '');
        } else {
          navigateTo('Commercial', 'commercial', 'plot');
        }
      } else if (RentSelectedItem?.kind?.value === 'Commercial') {
        navigateTo('Commercial', 'commercial', '');
      }
    } else if (selectedItem?.title === 'PG') {
      navigateTo('PG', 'residential', 'pg');
    }
    function navigateTo(screen, real_estate, propertyType) {
      navigation.navigate(screen, {
        location,
        property_action: selectedItem?.value.toLowerCase(),
        property_type: propertyType,
        data,
        filter: true,
        real_estate,
        city_id: city_id,
      });
      dispatch(setFilterLocation({city: null, landmark: null}));
    }
  };

  useEffect(() => {
    setLoading(true);
    const tutorialLoad = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearInterval(tutorialLoad);
  }, []);

  const locationData = async () => {
    var data = 'location=' + 'city' + '&state=' + '31';
    const filterloc = await fetchData.Location(data);
    setFilterLocationData(filterloc);
  };

  useEffect(() => {
    locationData();
  }, [filterLocationData]);

  //count data
  const [countFilter, setCountFilter] = useState(0);

  const filterCountData = async () => {
    try {
      setCountLoad(true);
      const currentData = dataPayload();
      if (currentData !== prevDataPayload) {
        const filterCount = await fetchData.get_property_count(currentData);
        setCountFilter(filterCount?.count);
        setPrevDataPayload(currentData);
        setCountLoad(false);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setCountLoad(false);
    }
  };
  useEffect(() => {
    filterCountData();
  }, [buySelectedItem, RentSelectedItem, filterLocationData]);

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
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
      ) : (
        <SectionList
          sections={Section}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => {
            switch (item) {
              case 'types':
                return (
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.black,
                        fontFamily: Poppins.SemiBold,
                      }}>
                      Looking for
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: Color.white,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                      }}>
                      <FlatList
                        nestedScrollEnabled
                        data={types}
                        horizontal
                        keyExtractor={(item, index) => item + index}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{
                                backgroundColor:
                                  selectedItem?.id == item?.id
                                    ? Color.primary
                                    : Color.filterColor,
                                width: width / 3.5,
                                // width: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginHorizontal: 5,
                                borderRadius: 5,
                                height: 40,
                                // padding: 10,
                                marginVertical: 5,
                              }}
                              onPress={() => {
                                setBuySelectedItem({
                                  post: item,
                                  kind: {},
                                  type: [],
                                  noSeats: '',
                                  bedrooms: [],
                                  furnished: {},
                                  plotType: [],
                                  amenities: [],
                                  listTypes: {},
                                  reraApproved: {},
                                  locationItem: buySelectedItem.locationItem,
                                  totalBuildingFloors: 0,
                                  noFloorsOnProperty: {},
                                  plotArea: '',
                                });
                                setRentSelectedItem({
                                  post: item,
                                  kind: {},
                                  type: [],
                                  bedrooms: [],
                                  furnished: {},
                                  amenities: [],
                                  listTypes: {},
                                  reraApproved: {},
                                  noSeats: '',
                                  plotType: [],
                                  totalBuildingFloors: 0,
                                  noFloorsOnProperty: {},
                                  plotArea: '',
                                });
                                dispatch(
                                  setFilterLocation({
                                    city: null,
                                    landmark: null,
                                  }),
                                );
                                setSelectedItem(item);
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color:
                                    selectedItem?.id == item?.id
                                      ? Color.white
                                      : Color.black,
                                  fontFamily: Poppins.SemiBold,
                                }}>
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  </View>
                );
              case 'type_Details':
                return (
                  <FilterData
                    item={selectedItem.title}
                    setBuySelectedItem={setBuySelectedItem}
                    buySelectedItem={buySelectedItem}
                    Propertylow={Propertylow}
                    setPropertyLow={setPropertyLow}
                    Propertyhigh={Propertyhigh}
                    setPropertyHigh={setPropertyHigh}
                    lowsqrt={lowsqrt}
                    setLowsqrt={setLowsqrt}
                    highsqrt={highsqrt}
                    setHighsqrt={setHighsqrt}
                    setVisible={setVisible}
                    minsqrt={minsqrt}
                    setMinsqrt={setMinsqrt}
                    maxsqrt={maxsqrt}
                    setMaxsqrt={setMaxsqrt}
                    filter_data={filter_data}
                    locationInput={locationInput}
                    setLocationInput={setLocationInput}
                    Propertymin={Propertymin}
                    setPropertyMin={setPropertyMin}
                    agree={agree}
                    setAgree={setAgree}
                    Propertymax={Propertymax}
                    setPropertyMax={setPropertyMax}
                    Bedrooms={Bedrooms}
                    FurnishingStatus={FurnishingStatus}
                    Amenities={Amenities}
                    listedBy={listedBy}
                    reraApproved={reraApproved}
                    handleValueChange={handleValueChange}
                    handlesqrtValueChange={handlesqrtValueChange}
                    propertyTypes={propertyTypes}
                    //buyMultiSelect
                    setAmenitiesSelectedItem={setAmenitiesSelectedItem}
                    AmenitiesSelectedItem={AmenitiesSelectedItem}
                    setPropertyTypeSelectedItem={setPropertyTypeSelectedItem}
                    PropertyTypeSelectedItem={PropertyTypeSelectedItem}
                    setBHKSelectedItem={setBHKSelectedItem}
                    BHKSelectedItem={BHKSelectedItem}
                    PlotTypes={PlotTypes}
                    buyfilteredFloors={buyfilteredFloors}
                    //Rent
                    setRentSelectedItem={setRentSelectedItem}
                    RentSelectedItem={RentSelectedItem}
                    Rentlow={Rentlow}
                    setRentLow={setRentLow}
                    Renthigh={Renthigh}
                    setRentHigh={setRentHigh}
                    setRentAgree={setRentAgree}
                    RentAgree={RentAgree}
                    Rentmin={Rentmin}
                    setRentMin={setRentMin}
                    Rentmax={Rentmax}
                    setRentMax={setRentMax}
                    RentBedrooms={RentBedrooms}
                    RentFurnishingStatus={RentFurnishingStatus}
                    RentAmenities={RentAmenities}
                    RentlistedBy={RentlistedBy}
                    RentReraApproved={RentReraApproved}
                    RenthandleValueChange={RenthandleValueChange}
                    RentpropertyTypes={RentpropertyTypes}
                    //RentMultiSelect
                    setRentAmenitiesSelectedItem={setRentAmenitiesSelectedItem}
                    RentAmenitiesSelectedItem={RentAmenitiesSelectedItem}
                    setRentPropertyTypeSelectedItem={
                      setRentPropertyTypeSelectedItem
                    }
                    RentPropertyTypeSelectedItem={RentPropertyTypeSelectedItem}
                    setRentBHKSelectedItem={setRentBHKSelectedItem}
                    RentBHKSelectedItem={RentBHKSelectedItem}
                    rentfilteredFloors={rentfilteredFloors}
                    //pg
                    setPgSelectedItem={setPgSelectedItem}
                    pgSelectedItem={pgSelectedItem}
                    setGenderData={setGenderData}
                    genderData={genderData}
                    minBudget={minBudget}
                    maxBudget={maxBudget}
                    PGAmenities={PGAmenities}
                    PGFoodData={PGFoodData}
                    PGPreferredTenants={PGPreferredTenants}
                    VerifiedPG={VerifiedPG}
                    PGOperatingSince={PGOperatingSince}
                    PGPosted={PGPosted}
                    PGoccupency={PGoccupency}
                    //common
                    getFilterData={getFilterData}
                    setPlotTypeSelectedItem={setPlotTypeSelectedItem}
                    PlotTypeSelectedItem={PlotTypeSelectedItem}
                    countFilter={countFilter}
                    propertyKind={propertyKind}
                    floors={floors}
                    plotAreaunit={plotAreaunit}
                    plotValue={plotValue}
                    setPlotValue={setPlotValue}
                    plotStatus={plotStatus}
                    setPlotStatus={setPlotStatus}
                    countLoad={countLoad}
                    dispatch={dispatch}
                    city_id={city_id}
                  />
                );
            }
          }}
        />
      )}
      {/* <LocationBottomModal
        visible={visible}
        setVisible={setVisible}
        data={filterLocation?.city}
      /> */}
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  pillContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pillText: {
    fontSize: 14,
    color: 'black',
    fontFamily: Poppins.SemiBold,
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  stepIndicator: {
    marginBottom: 10,
  },
  header: {
    marginVertical: 10,
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
