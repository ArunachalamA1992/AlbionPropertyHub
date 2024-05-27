import React, {useEffect, useState} from 'react';
import {
  LogBox,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator, {Auth} from './Components/route';
import CustomDrawerContent from './Components/Nav/CustomDrawerContent';
import Color from './Config/Color';
import SplashScreen from './Splash';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Store from './Redux/Store';
import Icon from 'react-native-vector-icons/Ionicons';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainCalculatorScreen from './Components/Calculator';
import ForegroundHandler from './Components/pushNotify/ForegroundHandler';
import {requestUserPermission} from './Components/pushNotify/pushnotification_helper';
import {Provider as PaperProvider} from 'react-native-paper';
import FilterScreen from './Screens/Home/FilterScreen';
import SinglePropertyScreen from './Screens/Home/SingleProperty';
import MapSearchScreen from './Screens/Home/MapSearch';
import ProductMapScreen from './Screens/Home/ProductMapScreen';
import RentalScreen from './Screens/Store/RentalScreen';
import PGScreen from './Screens/Store/PGScreen';
import BuyScreen from './Screens/Store/BuyScreen';
import CommercialScreen from './Screens/Store/CommercialScreen';
import OnboardingScreen1 from './Screens/Onboarding/OnboardingScreen1';
import OnboardingScreen2 from './Screens/Onboarding/OnboardingScreen2';
import OnboardingScreen3 from './Screens/Onboarding/OnboardingScreen3';
import EditProfile from './Screens/Profile/EditProfile';
import SearchScreen from './Screens/Home/SearchScreen';
import {Poppins} from './Global/FontFamily';
import {Media} from './Global/Media';
import BuyRentPropertyScreen from './Screens/Store/BuyRentPropertyScreen';
import EditPropertyScreen from './Screens/Profile/EditProperty';
import WelcomePage from './Screens/Home/WelcomePage';
import fetchData from './Config/fetchData';
import ActionSelect from './ActionSelect';
import LoginScreen from './AuctionScreen/Auth/Login';
import Register from './AuctionScreen/Auth/Register';
import HomeScreen from './AuctionScreen/Screens/HomeScreen';
import {NavigationDrawerStructure} from './Components/Nav/NavDrawer';
import {Badge} from 'react-native-paper';
import LogoTitle from './Components/LogoTitle';
import ListScreen from './AuctionScreen/Screens/ListScreen';
import ActionSingleProperty from './AuctionScreen/Screens/ActionSingleProperty';
import CategoriesList from './AuctionScreen/Screens/CategoriesList';
import AuctionSearchScreen from './AuctionScreen/Screens/AuctionSearchScreen';
import {Linking} from 'react-native';
import AuctionOTPScreen from './AuctionScreen/Auth/OTPScreen';
import ForgotPassword from './AuctionScreen/Auth/ForgotPassword';
import NumberVerify from './AuctionScreen/Auth/NumberVerify';
import UpdatePassword from './AuctionScreen/Auth/UpdatePassword';

import AuctionAboutUs from './AuctionScreen/Screens/SideMenu/AuctionAboutUs';
import AuctionContactUs from './AuctionScreen/Screens/SideMenu/AuctionContactUs';
import AuctionFAQs from './AuctionScreen/Screens/SideMenu/AuctionFAQs';
import AuctionNotificationList from './AuctionScreen/Screens/SideMenu/AuctionNotificationList';
import AuctionNotifyProperties from './AuctionScreen/Screens/SideMenu/AuctionNotifyProperties';
import InterestedProperties from './AuctionScreen/Screens/SideMenu/InterestedProperties';
import AdvanceSearch from './AuctionScreen/Screens/SideMenu/AdvanceSearch';
import AuctionProfile from './AuctionScreen/Screens/profile/AuctionProfile';
import ChangePassword from './AuctionScreen/Auth/ChangePassword';
import AuctionPrivacyPolicy from './AuctionScreen/Screens/SideMenu/AuctionPrivacyPolicy';
import AuctionTermsConditions from './AuctionScreen/Screens/SideMenu/AuctionTermsConditions';
import Feedback from './Screens/SideMenu/Feedback';
import {navigate, navigationRef} from '../RootNavigation';
import PayView from './Screens/Prime/PayView';
import ChatScreen from './Screens/chat';
import {Dropdown} from 'react-native-element-dropdown';
import {setAuctionSort} from './Redux';
import {Divider} from 'react-native-elements';
import {Modal} from 'react-native';
import {Text} from 'react-native';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import PostCompletedScreen from './Screens/Home/Post/PostCompletedScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const linking = {
    prefixes: ['albion://'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'home',
        },
        SingleProperty: {
          path: 'review/:p_id',
        },
      },
    },
  };

  useEffect(() => {
    const handleInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const reviewMatch = initialUrl.match(/\/review\/(\d+)/);
        if (reviewMatch) {
          const p_id = reviewMatch[1];
          navigationRef.current?.navigate('SingleProperty', {p_id});
        }
      }
    };

    handleInitialUrl();
  }, []);

  useEffect(() => {
    const handleDeepLink = ({url}) => {
      const reviewMatch = url.match(/\/review\/(\d+)/);
      if (reviewMatch) {
        const p_id = reviewMatch[1];
        navigationRef.current?.navigate('SingleProperty', {p_id});
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{swipeEnabled: false}}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={MainApp}
            options={{headerShown: false}}
          />
          <Drawer.Screen
            name="SingleProperty"
            component={SinglePropertyScreen}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <MyDrawer />
    </Provider>
  );
};

const MainApp = () => {
  const [sortVisible, setSortVisible] = useState(false);
  const [height, setHeight] = useState(undefined);
  const dispatch = useDispatch();
  const [sortData] = useState([
    {id: 1, label: 'Newest', value: 'created_at', order: 'desc'},
    {id: 2, label: 'Recent', value: 'created_at', order: 'asc'},
    {
      id: 3,
      label: 'Reserve Price (High to Low)',
      value: 'reserve_price',
      order: 'desc',
    },
    {
      id: 4,
      label: 'Reserve Price (Low to High)',
      value: 'reserve_price',
      order: 'asc',
    },
  ]);
  return (
    <>
      <StatusBar backgroundColor={Color.primary} />
      <ForegroundHandler />
      <Stack.Navigator initialRouteName="UpgradeTab">
        {/* Property Screens */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="OnboardingScreen1"
          component={OnboardingScreen1}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="OnboardingScreen2"
          component={OnboardingScreen2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnboardingScreen3"
          component={OnboardingScreen3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="postCompleted"
          component={PostCompletedScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PayView"
          component={PayView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Filter',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={({navigation, route}) => ({
            headerTitle: 'Feedback',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="SingleProperty"
          component={SinglePropertyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MapSearchScreen"
          component={MapSearchScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Search your location',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ProductMap"
          component={ProductMapScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Maps',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Rent"
          component={RentalScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Rent',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="PG"
          component={PGScreen}
          options={({navigation, route}) => ({
            headerTitle: 'PG',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="BUY"
          component={BuyScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Buy',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="propertyPage"
          component={BuyRentPropertyScreen}
          options={({navigation, route}) => ({
            headerTitle: route?.params?.property_type,
            headerTitleStyle: {color: Color.white, textTransform: 'capitalize'},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Commercial"
          component={CommercialScreen}
          options={({navigation, route}) => ({
            headerTitle:
              route?.params?.property_type?.length > 0
                ? route?.params?.property_type
                : 'Commercial',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({navigation, route}) => ({
            headerTitle: 'Edit Profile',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            },
            headerStyle: {backgroundColor: Color.white},
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.primary}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="EditProperty"
          component={EditPropertyScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Edit Property',
            headerTitleStyle: {
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            },
            headerStyle: {backgroundColor: Color.white},
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.primary}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Search',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="chat"
          component={ChatScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Chat',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ActionSelect"
          component={ActionSelect}
          options={{headerShown: false}}
        />
        {/* Actions Screens */}
        <Stack.Screen
          name="ActionLogin"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ActionRegister"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.primary}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="NumberVerify"
          component={NumberVerify}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.primary}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="updatepassword"
          component={UpdatePassword}
          options={({navigation, route}) => ({
            headerTitle: '',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.white},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.primary}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ActionHome"
          component={HomeScreen}
          options={({navigation}) => ({
            headerTitle: props => <LogoTitle {...props} />,
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: Color.primary, elevation: 0},
            headerLeft: () => (
              <NavigationDrawerStructure navigation={navigation} />
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{marginEnd: 10}}
                onPress={() => {
                  navigation.navigate('AuctionProfile');
                }}>
                <FontAwesome name="user" size={25} color={Color.white} />
              </TouchableOpacity>
            ),
            headerRightContainerStyle: {right: 10},
          })}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Auction List',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  marginHorizontal: 10,
                  marginRight: 20,
                  alignItems: 'flex-end',
                }}>
                <F5Icon
                  name="sort-amount-down-alt"
                  style={{width: '100%'}}
                  size={20}
                  color={Color.white}
                  onPress={() => {
                    setSortVisible(true);
                  }}
                />
                <Modal
                  transparent={true}
                  visible={sortVisible}
                  animationType="fade">
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: Color.transparantBlack,
                    }}>
                    <Pressable
                      style={{flex: 1}}
                      onPress={() => {
                        setSortVisible(false);
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: Color.white,
                        height: height,
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
                        Select Your Sort Method
                      </Text>
                      <Divider style={{height: 1, marginVertical: 10}} />
                      <View
                        style={{
                          marginHorizontal: 20,
                        }}>
                        {sortData?.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{}}
                              onPress={() => {
                                dispatch(setAuctionSort(item));
                                setSortVisible(false);
                              }}>
                              <Text
                                style={{
                                  color: Color.black,
                                  fontSize: 16,
                                  fontFamily: Poppins.Medium,
                                }}>
                                {item?.label}
                              </Text>
                              {index < sortData?.length - 1 && (
                                <Divider
                                  style={{height: 1, marginVertical: 10}}
                                />
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ActionSingleProperty"
          component={ActionSingleProperty}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CategoriesList"
          component={CategoriesList}
          options={({navigation, route}) => ({
            headerTitle: 'Categories List',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionSearchScreen"
          component={AuctionSearchScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Search',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionOTPScreen"
          component={AuctionOTPScreen}
          options={({navigation, route}) => ({
            headerTitle: 'Enter OTP',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionAboutUs"
          component={AuctionAboutUs}
          options={({navigation, route}) => ({
            headerTitle: 'About Us',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AuctionContactUs"
          component={AuctionContactUs}
          options={({navigation, route}) => ({
            headerTitle: 'Contact Us',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionFAQs"
          component={AuctionFAQs}
          options={({navigation, route}) => ({
            headerTitle: 'FAQs',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionNotificationList"
          component={AuctionNotificationList}
          options={({navigation, route}) => ({
            headerTitle: 'Notification List',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionNotifyProperties"
          component={AuctionNotifyProperties}
          options={({navigation, route}) => ({
            headerTitle: 'Notify Property ',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="InterestedProperties"
          component={InterestedProperties}
          options={({navigation, route}) => ({
            headerTitle: 'Interested Properties',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AdvanceSearch"
          component={AdvanceSearch}
          options={({navigation, route}) => ({
            headerTitle: 'Advanced Search',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionProfile"
          component={AuctionProfile}
          options={({navigation, route}) => ({
            headerTitle: 'Your Auction Profile',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionPrivacyPolicy"
          component={AuctionPrivacyPolicy}
          options={({navigation, route}) => ({
            headerTitle: 'Privacy Policy',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="AuctionTermsConditions"
          component={AuctionTermsConditions}
          options={({navigation, route}) => ({
            headerTitle: 'Terms & Conditions',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={({navigation, route}) => ({
            headerTitle: 'Change Password',
            headerTitleStyle: {color: Color.white},
            headerStyle: {backgroundColor: Color.primary},
            headerLeft: () => (
              <View style={{marginHorizontal: 10}}>
                <Icon
                  name="arrow-back"
                  size={30}
                  color={Color.white}
                  onPress={() => navigation.goBack()}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default App;

LogBox.ignoreAllLogs;
