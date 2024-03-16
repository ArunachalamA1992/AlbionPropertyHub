import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import AICon from 'react-native-vector-icons/AntDesign';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Config/Color';
import ProfileScreen from '../Screens/Profile';
import {NavigationDrawerStructure} from './Nav/NavDrawer';
import HomeScreen from '../Screens/Home/HomeScreen';
import LogoTitle, {PrimeLogoTitle} from './LogoTitle';
import LoginScreen from '../Screens/Auth/Login';
import OTPScreen from '../Screens/Auth/OTPScreen';
import PostStep1Screen from '../Screens/Home/Post/Step1';
import PostStep2Screen from '../Screens/Home/Post/Step2';
import PostStep3Screen from '../Screens/Home/Post/step3';
import PostStep4Screen from '../Screens/Home/Post/step4';
import BestOfferScreen from './BestOffers';
import ConfirmPostScreen from '../Screens/Home/Post/ConfirmPost';
import PostCompletedScreen from '../Screens/Home/Post/PostCompletedScreen';
import LinearGradient from 'react-native-linear-gradient';
import WishlistScreen from '../Screens/Profile/Wishlist';
import PrimeScreen from '../Screens/Prime/PrimeScreen';
import EditProfile from '../Screens/Profile/EditProfile';
import {Media} from '../Global/Media';
import {Poppins} from '../Global/FontFamily';
import LegalServices from '../Screens/SideMenu/LegalServices';
import PackersMovers from '../Screens/SideMenu/PackersMovers';
import FreeRentAgreement from '../Screens/SideMenu/FreeRentAgreement';
import HomeInterior from '../Screens/SideMenu/HomeInterior';
import HomeLoanService from '../Screens/SideMenu/HomeLoanService';
import EmiCalculation from '../Screens/SideMenu/EmiCalculation';
import PropertyNews from '../Screens/SideMenu/PropertyNews';
import LegalTexationNews from '../Screens/SideMenu/LegalTexationNews';
import TenantVerification from '../Screens/SideMenu/TenantVerification';
import Advertisement from '../Screens/SideMenu/Advertisement';
import Prop_Valuation from '../Screens/SideMenu/Prop_Valuation';
import AboutUs from '../Screens/SideMenu/AboutUs';
import NotificationList from '../Screens/SideMenu/NotificationList';
import {Badge} from 'react-native-paper';
import AdvocateOnCall from '../Screens/SideMenu/AdvocateOnCall';
import Astrology from '../Screens/SideMenu/Astrology';

//Post Property
import MyPropertyScreen from '../Screens/Profile/MyPropertyScreen';
import PropertyAdvice from '../Screens/SideMenu/PropertyAdvice';
import {useSelector} from 'react-redux';
import fetchData from '../Config/fetchData';
import TermsCondition from '../Screens/SideMenu/TermsCondition';
import PrivacyPolicy from '../Screens/SideMenu/PrivacyPolicy';
import RateReviews from '../Screens/SideMenu/RateReviews';
import ContactUs from '../Screens/SideMenu/ContactUs';
import {getHash} from 'react-native-otp-verify';
import PropertyServices from '../Screens/Home/PropertyServices';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  const userData = useSelector(state => state.UserReducer.userData);
  const [notifyData, setNotifyData] = useState([]);
  var {user_id, user_type_id} = userData;

  const getNotificationData = async () => {
    try {
      var data = 'user_id=' + user_id;
      const notifyData = await fetchData.getNotification(data);
      if (notifyData) {
        setNotifyData(notifyData);
      }
    } catch (error) {
      console.log('catch in getNotification_Data : ', error);
    }
  };

  useEffect(() => {
    const notify = setInterval(() => {
      getNotificationData();
      unreadNotify();
    }, 2000);
    return () => {
      clearInterval(notify);
    };
  }, [notifyData, userData, unreadCount]);

  const [unreadCount, setUnreadCount] = useState(0);

  const unreadNotify = async () => {
    let unreadNotifications = notifyData?.filter(
      notification => notification.isRead == 1,
    );
    setUnreadCount(unreadNotifications.length);
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: props => <LogoTitle {...props} />,
          // headerTitle: 'Albion',
          headerTitleAlign: 'center',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: Color.primary, elevation: 0},
          headerLeft: () => (
            <NavigationDrawerStructure navigation={navigation} />
          ),
        })}
      />

      <Stack.Screen
        name="step1"
        component={PostStep1Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="step2"
        component={PostStep2Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="step3"
        component={PostStep3Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="step4"
        component={PostStep4Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="confirmPost"
        component={ConfirmPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="postCompleted"
        component={PostCompletedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="bestOffers"
        component={BestOfferScreen}
        options={({navigation, route}) => ({
          headerTitle: route?.params?.routename,
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
        name="HomeLoanService"
        component={HomeLoanService}
        options={({navigation, route}) => ({
          headerTitle: 'Home Loan Service',
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
        name="HomeInterior"
        component={HomeInterior}
        options={({navigation, route}) => ({
          headerTitle: 'Home Interior Design',
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
        name="FreeRentAgreement"
        component={FreeRentAgreement}
        options={({navigation, route}) => ({
          headerTitle: 'Free Rent Agreement',
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
        name="PackersMovers"
        component={PackersMovers}
        options={({navigation, route}) => ({
          headerTitle: 'Packers and Movers Services',
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
        name="LegalServices"
        component={LegalServices}
        options={({navigation, route}) => ({
          headerTitle: 'Legal Services',
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
        name="EmiCalculation"
        component={EmiCalculation}
        options={({navigation, route}) => ({
          headerTitle: 'Emi Home Calculator',
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
        name="PropertyNews"
        component={PropertyNews}
        options={({navigation, route}) => ({
          headerTitle: 'Property News',
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
        name="LegalTexationNews"
        component={LegalTexationNews}
        options={({navigation, route}) => ({
          headerTitle: 'Legal & Texation News',
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
        name="TenantVerification"
        component={TenantVerification}
        options={({navigation, route}) => ({
          headerTitle: 'Tenant Verification',
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
        name="Advertisement"
        component={Advertisement}
        options={({navigation, route}) => ({
          headerTitle: 'Advertisement With US',
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
        name="Prop_Valuation"
        component={Prop_Valuation}
        options={({navigation, route}) => ({
          headerTitle: 'Property Valuation',
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
        name="AboutUs"
        component={AboutUs}
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
        name="ContactUs"
        component={ContactUs}
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
        name="NotificationList"
        component={NotificationList}
        options={({navigation, route}) => ({
          headerTitle: 'Notifications List',
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
        name="AdvocateOnCall"
        component={AdvocateOnCall}
        options={({navigation, route}) => ({
          headerTitle: 'Advocate On Call',
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
        name="Astrology"
        component={Astrology}
        options={({navigation, route}) => ({
          headerTitle: 'Property Astrology',
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
        name="PropertyAdvice"
        component={PropertyAdvice}
        options={({navigation, route}) => ({
          headerTitle: 'Property Advice & Assistance',
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
        name="TermsCondition"
        component={TermsCondition}
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
        name="PrivacyPolicy"
        component={PrivacyPolicy}
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
        name="RateReviews"
        component={RateReviews}
        options={({navigation, route}) => ({
          headerTitle: 'Rate & Reviews',
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
  );
};

export const UpgradeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Prime">
      <Stack.Screen
        name="Prime"
        component={PrimeScreen}
        options={({navigation, route}) => ({
          headerTitle: props => <PrimeLogoTitle {...props} />,
          headerTitleAlign: 'center',
          headerTitleStyle: {color: Color.primary},
          headerStyle: {backgroundColor: Color.white, elevation: 0},
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
          headerRight: () => (
            <View style={{marginHorizontal: 10}}>
              <Image
                source={{uri: Media.albionlogo}}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const PostStack = () => {
  return (
    <Stack.Navigator initialRouteName="step1">
      <Stack.Screen
        name="step1"
        component={PostStep1Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="step2"
        component={PostStep2Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="step3"
        component={PostStep3Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="step4"
        component={PostStep4Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="confirmPost"
        component={ConfirmPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="postCompleted"
        component={PostCompletedScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const WishStack = () => {
  return (
    <Stack.Navigator initialRouteName="wish">
      <Stack.Screen
        name="wish"
        component={WishlistScreen}
        options={({navigation, route}) => ({
          headerTitle: 'WishList',
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
  );
};

// export const PropServices = () => {
//   return (
//     <Stack.Navigator initialRouteName="PropServices">
//       <Stack.Screen
//         name="PropServices"
//         component={PropertyServices}
//         options={({ navigation, route }) => ({
//           headerTitle: 'Property Services',
//           headerTitleStyle: { color: Color.white },
//           headerStyle: { backgroundColor: Color.primary },
//           headerLeft: () => (
//             <View style={{ marginHorizontal: 10 }}>
//               <Icon
//                 name="arrow-back"
//                 size={30}
//                 color={Color.white}
//                 onPress={() => navigation.goBack()}
//               />
//             </View>
//           ),
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

export const Auth = () => {
  getHash()
    .then(hash => {
      console.log('Use this hash to construct otp message', hash);
    })
    .catch(error => console.log(error));
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id} = userData;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation, route}) => ({
          headerTitle: 'Profile',
          headerTitleStyle: {color: Color.black, fontFamily: Poppins.SemiBold},
          headerTitleAlign: 'center',
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
          headerRight: () =>
            user_id == undefined ||
            (userData?.length > 0 && userData == undefined ? (
              <View />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
                style={{marginHorizontal: 10}}>
                <Text
                  style={{
                    fontFamily: Poppins.SemiBold,
                    fontSize: 18,
                    color: Color.primary,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            )),
          headerRightContainerStyle: {marginRight: 10},
        })}
      />
      <Stack.Screen
        name="myProperty"
        component={MyPropertyScreen}
        options={({navigation, route}) => ({
          headerTitle: 'My Properties',
          headerTitleStyle: {color: Color.white, fontFamily: Poppins.SemiBold},
          headerStyle: {backgroundColor: Color.primary, elevation: 0},
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
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id} = userData;
  // console.log(user_id !== undefined || userData !== undefined);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 5,
                  }}>
                  <LinearGradient
                    colors={
                      focused
                        ? ['#8C193F', '#DD4074']
                        : [Color.smokeyGrey, Color.smokeyGrey]
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name={'home'} size={25} color={Color.white} />
                  </LinearGradient>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  Home
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Icon name={'home'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? '#8C193F' : '#000',
                  }}>
                  Home
                </Text>
              </View>
            );
          } else if (route.name === 'UpgradeTab' && Platform.OS == 'android') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 5,
                  }}>
                  <LinearGradient
                    colors={
                      focused
                        ? ['#8C193F', '#DD4074']
                        : [Color.smokeyGrey, Color.smokeyGrey]
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MCIcon
                      name={'brightness-percent'}
                      size={25}
                      color={Color.white}
                    />
                  </LinearGradient>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  UpGrade
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <MCIcon name={'brightness-percent'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.primary : Color.black,
                  }}>
                  UpGrade
                </Text>
              </View>
            );
          }
          // else if (route.name === 'PropServices') {
          //   return focused ? (
          //     <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          //       <View
          //         style={{
          //           backgroundColor: Color.white,
          //           width: 50,
          //           height: 50,
          //           borderRadius: 50,
          //           alignItems: 'center',
          //           justifyContent: 'center',
          //           position: 'absolute',
          //           bottom: 5,
          //         }}>
          //         <LinearGradient
          //           colors={
          //             focused
          //               ? ['#8C193F', '#DD4074']
          //               : [Color.smokeyGrey, Color.smokeyGrey]
          //           }
          //           style={{
          //             width: 40,
          //             height: 40,
          //             borderRadius: 50,
          //             alignItems: 'center',
          //             justifyContent: 'center',
          //           }}>
          //           <Image
          //             source={{ uri: Media.albionlogo }}
          //             style={{
          //               width: 35,
          //               height: 35,
          //               resizeMode: 'contain',
          //             }}
          //           />
          //           {/* <AICon name={'plus'} size={25} color={Color.white} /> */}
          //         </LinearGradient>
          //       </View>
          //       <Text
          //         style={{
          //           fontSize: 12,
          //           marginBottom: -15,
          //           color: focused ? Color.primary : Color.black,
          //           backgroundColor: Color.lightYellow,
          //           paddingHorizontal: 10,
          //           paddingVertical: 2,
          //           borderRadius: 50,
          //         }}>
          //         Property Services
          //       </Text>
          //     </View>
          //   ) : (
          //     <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          //       {/* <AICon name={'pluscircle'} size={25} color={color} /> */}
          //       <Image
          //         source={{ uri: Media.albionlogo }}
          //         style={{
          //           width: 35,
          //           height: 35,
          //           resizeMode: 'contain',
          //         }}
          //       />
          //       <Text
          //         style={{
          //           fontSize: 12,
          //           marginBottom: -5,
          //           color: focused ? Color.primary : Color.black,
          //         }}>
          //         Services
          //       </Text>
          //     </View>
          //   );
          // }
          else if (route.name === 'PostTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 5,
                  }}>
                  <LinearGradient
                    colors={
                      focused
                        ? ['#8C193F', '#DD4074']
                        : [Color.smokeyGrey, Color.smokeyGrey]
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <AICon name={'plus'} size={25} color={Color.white} />
                  </LinearGradient>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  Post
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <AICon name={'pluscircle'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.primary : Color.black,
                  }}>
                  Post
                </Text>
              </View>
            );
          } else if (route.name === 'wishTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 5,
                  }}>
                  <LinearGradient
                    colors={
                      focused
                        ? ['#8C193F', '#DD4074']
                        : [Color.smokeyGrey, Color.smokeyGrey]
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name={'heart'} size={25} color={Color.white} />
                  </LinearGradient>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  Wishlist
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Icon name={'heart'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.primary : Color.black,
                  }}>
                  Wishlist
                </Text>
              </View>
            );
          } else if (route.name === 'ProfileTab') {
            return focused ? (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    backgroundColor: Color.white,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 5,
                  }}>
                  <LinearGradient
                    colors={
                      focused
                        ? ['#8C193F', '#DD4074']
                        : [Color.smokeyGrey, Color.smokeyGrey]
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name={'person-circle-outline'}
                      size={25}
                      color={Color.white}
                    />
                  </LinearGradient>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -15,
                    color: focused ? Color.primary : Color.black,
                    backgroundColor: Color.lightYellow,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 50,
                  }}>
                  Profile
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <Icon name={'person-circle-outline'} size={25} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: -5,
                    color: focused ? Color.primary : Color.black,
                  }}>
                  Profile
                </Text>
              </View>
            );
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.smokeyGrey,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{headerShown: false}}
      />
      {Platform.OS == 'android' && (
        <Tab.Screen
          name="UpgradeTab"
          component={UpgradeStack}
          options={{headerShown: false}}
        />
      )}

      {/* <Tab.Screen
        name="PropServices"
        component={PropServices}
        options={() => ({
          headerShown: false,
        })}
      /> */}

      {user_id !== undefined && userData !== undefined ? (
        <Tab.Screen
          name="PostTab"
          component={PostStack}
          options={() => ({
            headerShown: false,
          })}
        />
      ) : null}

      {user_id !== undefined && userData !== undefined ? (
        <Tab.Screen
          name="wishTab"
          component={WishStack}
          options={{headerShown: false}}
        />
      ) : null}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

//route

const styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
