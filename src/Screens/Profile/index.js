import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  ScrollView,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {primarycolor} from '../../Utils/Colors';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/Ionicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Media} from '../../Global/Media';
import {Poppins} from '../../Global/FontFamily';
import Color from '../../Config/Color';
import {Divider} from 'react-native-elements';
import {
  setActionUserData,
  setEditVisible,
  setLoginType,
  setUserData,
} from '../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import {base_image_properties, base_profile} from '../../Config/base_url';
import BottomLogin from '../../Components/BottomLogin';

var {width, height} = Dimensions.get('screen');
const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [login, setLogin] = useState(false);
  const [proimage, setProImage] = useState('null');
  const [profileCompletion, setProfileCompletion] = useState(0);
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id, username, profile, user_type_id, mobile_number, email} =
    userData;
  const Auction_userData = useSelector(
    state => state.UserReducer.auctionUserData,
  );
  var {id} = Auction_userData;
  const EditVisible = useSelector(state => state.UserReducer.editUserVisible);
  const [contacted, setContacted] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log('catch in useEffect  :', error);
    }
  }, []);

  const calculateProfileCompletion = () => {
    const totalFields = 3;
    let completedFields = 0;

    if (username?.trim() !== '') {
      completedFields++;
    }
    if (email?.trim() !== '') {
      completedFields++;
    }
    if (mobile_number?.trim() !== '') {
      completedFields++;
    }

    const percentage = (completedFields / totalFields) * 100;
    setProfileCompletion(percentage);
  };

  useEffect(() => {
    calculateProfileCompletion();
    myResponseList();
    setLoading(true);
    getUsers().finally(() => {
      setLoading(false);
    });
  }, [username, email, mobile_number]);

  useEffect(() => {
    if (!netInfo_State) {
      const interval = setTimeout(() => {
        if (Platform.OS === 'android') {
          common_fn.showToast(
            "can't connect.Please Check Your Internet Connection",
          );
        } else {
          alert("can't connect.Please Check Your Internet Connection");
        }
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [netInfo_State]);

  const myResponseList = async () => {
    try {
      var data = `seller_id=${user_id}`;
      const response = await fetchData.Contacted(data);
      setContacted(response?.length);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getUsers = useCallback(async () => {
    try {
      var data = 'user_id=' + user_id;
      const usersData = await fetchData.show_users(data);
      dispatch(setUserData(usersData));
      setTotalPost(userData?.properties_posted);
      setLoading(true);
    } catch (error) {
      console.log('error', error);
    }
  }, [profile, userData]);

  const deleteUser = async () => {
    try {
      var data = {
        user_id: user_id,
      };
      Alert.alert(
        '',
        'Do You like to remove your account',
        [
          {
            text: 'No',
            onPress: async () => {},
          },
          {
            text: 'Yes',
            onPress: async () => {
              const usersData = await fetchData.deleteData(data);
              if (usersData?.message == 'Disabled') {
                AsyncStorage.clear();
                navigation.replace('ActionSelect');
                dispatch(setUserData({}));
                dispatch(setLoginType(''));
              }
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // height: height / 1.5,
          }}>
          <Image
            source={{uri: Media.loader}}
            style={{width: 80, height: 80, resizeMode: 'contain'}}
          />
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginVertical: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 130,
                    height: 130,
                    backgroundColor: '#f3f3f3',
                    borderRadius: 100,
                  }}>
                  {profile?.length != 0 ? (
                    <Image
                      source={{
                        uri:
                          // base_profile +
                          profile,
                      }}
                      style={{
                        width: 130,
                        height: 130,
                        resizeMode: 'contain',
                        borderRadius: 100,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: Media.Userpng}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </View>

                {user_id == undefined ||
                  (userData?.length > 0 && userData == undefined ? (
                    <View />
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.white,
                        fontFamily: Poppins.Bold,
                        marginHorizontal: 20,
                        backgroundColor: Color.sunShade,
                        borderRadius: 50,
                        padding: 5,
                        paddingHorizontal: 10,
                      }}>
                      {user_type_id == '1'
                        ? 'Buyer'
                        : user_type_id == '2'
                        ? 'Agent'
                        : 'Builder'}
                    </Text>
                  ))}
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {user_id == undefined ||
                (userData?.length > 0 && userData == undefined) ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Color.sunShade,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 20,
                      borderRadius: 10,
                      paddingHorizontal: 5,
                      marginVertical: 20,
                    }}
                    onPress={() => {
                      setLogin(true);
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.white,
                        fontFamily: Poppins.Bold,
                        paddingTop: 7,
                      }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 20,
                        color: Color.black,
                        fontFamily: Poppins.Bold,
                      }}>
                      {user_id == undefined ||
                      (userData?.length > 0 && userData == undefined)
                        ? '********'
                        : username?.length != ''
                        ? username
                        : '*****'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#444',
                        fontFamily: Poppins.SemiBold,
                        marginVertical: 5,
                      }}>
                      {mobile_number}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.black,
                        fontFamily: Poppins.Bold,
                      }}>
                      {user_id == undefined ||
                      (userData?.length > 0 && userData == undefined)
                        ? 'Email'
                        : email?.length != ''
                        ? email
                        : 'Email'}
                    </Text>
                  </>
                )}
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.green,
                    fontFamily: Poppins.Bold,
                    marginVertical: 5,
                  }}>
                  {user_id == undefined ||
                  (userData?.length > 0 && userData == undefined)
                    ? 0
                    : profileCompletion.toFixed(0)}{' '}
                  %{' '}
                  {user_id == undefined ||
                  (userData?.length > 0 && userData == undefined)
                    ? '( Need to Login for status )'
                    : 'Completed'}
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginVertical: 10,
              }}>
              <View
                style={{
                  // height: 90,
                  padding: 10,
                  flexDirection: 'row',
                  backgroundColor: primarycolor,
                  borderRadius: 5,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
                    {contacted}
                  </Text>
                  <Text style={{fontSize: 14, color: 'white'}}>Contacted</Text>
                </View>
                <View
                  style={{
                    width: 0.5,
                    height: '75%',
                    backgroundColor: 'white',
                  }}></View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
                    {totalPost || 0}
                  </Text>
                  <Text style={{fontSize: 14, color: 'white'}}>Total Post</Text>
                </View>
              </View>
            </View>

            <View style={{marginVertical: 20}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  user_id == undefined ||
                  (userData?.length > 0 && userData == undefined)
                    ? setLogin(true)
                    : navigation.navigate('myProperty');
                }}>
                <MCIcon name="home-city" size={25} color={Color.primary} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginHorizontal: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{fontSize: 16, color: '#333', fontWeight: 'bold'}}>
                      My properties
                    </Text>
                  </View>
                  <Text style={{fontSize: 12, color: '#666'}}>
                    Your property details and reviews
                  </Text>
                </View>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'chevron-forward'}
                  icon_size={20}
                  icon_color={'#666'}
                />
              </TouchableOpacity>
              <Divider style={{height: 1, marginVertical: 10}} />

              {Platform.OS == 'android' && (
                <>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                      marginHorizontal: 10,
                    }}
                    onPress={() => {
                      navigation.navigate('UpgradeTab');
                    }}>
                    <F6Icon name="award" size={25} color={Color.primary} />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginHorizontal: 10,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#333',
                            fontWeight: 'bold',
                          }}>
                          Subscriptions
                        </Text>
                        <View
                          style={{
                            padding: 5,
                            paddingHorizontal: 20,
                            marginHorizontal: 10,
                            backgroundColor: '#FFA825',
                            borderRadius: 40,
                          }}>
                          <Text style={{fontSize: 12, color: 'white'}}>
                            FREE
                          </Text>
                        </View>
                      </View>
                      <Text style={{fontSize: 12, color: '#666'}}>
                        Free / Per Month
                      </Text>
                    </View>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={'chevron-forward'}
                      icon_size={20}
                      icon_color={'#666'}
                    />
                  </TouchableOpacity>

                  <Divider style={{height: 1, marginVertical: 10}} />
                </>
              )}

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  user_id == undefined ||
                  (userData?.length > 0 && userData == undefined)
                    ? setLogin(true)
                    : navigation.navigate('wishTab');
                }}>
                <Icon name="heart" size={25} color={Color.primary} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, color: '#333', fontWeight: 'bold'}}>
                    Wishlist
                  </Text>
                  <Text style={{fontSize: 12, color: '#666'}}>
                    List of your Favourite Property
                  </Text>
                </View>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'chevron-forward'}
                  icon_size={20}
                  icon_color={'#666'}
                />
              </TouchableOpacity>

              <Divider style={{height: 1, marginVertical: 10}} />

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  if (
                    id != undefined ||
                    (Auction_userData?.length > 0 &&
                      Auction_userData !== undefined)
                  ) {
                    // AsyncStorage.clear();
                    navigation.replace('ActionHome');
                    dispatch(setLoginType('Auction'));
                    // dispatch(setActionUserData({}));
                    // dispatch(setUserData({}));
                  } else {
                    // AsyncStorage.clear();
                    navigation.replace('ActionLogin');
                    dispatch(setLoginType(''));
                    // dispatch(setActionUserData({}));
                    // dispatch(setUserData({}));
                  }
                }}>
                <MIcon name="villa" size={25} color={Color.primary} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, color: '#333', fontWeight: 'bold'}}>
                    Bank Auction
                  </Text>
                  <Text style={{fontSize: 12, color: '#666'}}>
                    Redirect to Auction Properties
                  </Text>
                </View>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'chevron-forward'}
                  icon_size={20}
                  icon_color={'#666'}
                />
              </TouchableOpacity>

              <Divider style={{height: 1, marginVertical: 10}} />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  deleteUser();
                }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  iconname={'deleteuser'}
                  icon_size={24}
                  icon_color={Color.primary}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, color: '#333', fontWeight: 'bold'}}>
                    Delete User
                  </Text>
                  <Text style={{fontSize: 12, color: '#666'}}>
                    Removing Your Account
                  </Text>
                </View>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'chevron-forward'}
                  icon_size={20}
                  icon_color={'#666'}
                />
              </TouchableOpacity>
              <Divider style={{height: 1, marginVertical: 10}} />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  AsyncStorage.clear();
                  navigation.replace('ActionSelect');
                  dispatch(setUserData({}));
                  dispatch(setLoginType(''));
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'log-out'}
                  icon_size={24}
                  icon_color={Color.primary}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{fontSize: 16, color: '#333', fontWeight: 'bold'}}>
                    Logout
                  </Text>
                </View>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'chevron-forward'}
                  icon_size={20}
                  icon_color={'#666'}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Modal
            visible={EditVisible}
            transparent={true}
            animationType={'fade'}>
            <Pressable
              style={{
                backgroundColor: Color.transparantBlack,
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
              onPress={() => {
                dispatch(setEditVisible(false));
              }}
            />
            <View
              style={{
                paddingVertical: 20,
                backgroundColor: Color.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <TouchableOpacity
                style={{position: 'absolute', right: 10, top: 10}}
                onPress={() => {
                  dispatch(setEditVisible(false));
                }}>
                <MCIcon name="close-circle" size={30} color={Color.red} />
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: Media.alert_success}}
                  style={{width: 100, height: 100, resizeMode: 'contain'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Poppins.SemiBold,
                  textAlign: 'center',
                  color: Color.black,
                  marginVertical: 20,
                  lineHeight: 20,
                }}>
                Your profile has been updated successfully
              </Text>
            </View>
          </Modal>
        </>
      )}
      {login == true && <BottomLogin login={login} setLogin={setLogin} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default ProfileScreen;
