import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  ScrollView,
  BackHandler,
} from 'react-native';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

import { BottomSheet } from 'react-native-btr';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { primarycolor } from '../../Utils/Colors';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import Color from '../../Config/Color';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setEditVisible, setUserData } from '../../Redux';
import common_fn from '../../Config/common_fn';
import { Poppins } from '../../Global/FontFamily';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import RequestNumberSheet from '../../Components/RequestNumberSheet';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);

  const userData = useSelector(state => state.UserReducer.userData);
  var {
    user_id,
    username,
    profile,
    mobile_number,
    user_type_id,
    change_persona,
    email,
  } = userData;
  const [Username, setUsername] = useState(username);
  const [errorUsername, setErrorUsername] = useState('');
  const [number, setNumber] = useState(mobile_number);
  const [error, setError] = useState(false);
  const [Usermail, setUsermail] = useState(email);
  const [emailValidError, setEmailValidError] = useState('');
  const [imagebottomSheetVisible, setImagebottomSheetVisible] = useState(false);
  const [proimage, setProImage] = useState([]);
  const [image, setImage] = useState([]);
  const [addprofileImage, setAddprofileImage] = useState('');
  const [currentStatus, setCurrentStatus] = useState({});
  const NumberRBSheet = useRef();
  const [userType_data] = useState([
    { label: 'Buyer', value: '1' },
    { label: 'Agent', value: '2' },
    { label: 'Builder', value: '3' },
  ]);
  const [otpVisible, setOtpVisible] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
    NumberRBSheet.current.open();
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    NumberRBSheet.current.close();
  };

  useEffect(() => {
    const checkBottomSheetState = async () => {
      const storedState = await AsyncStorage.getItem('bottomSheetState');
      if (storedState === 'open') {
        openBottomSheet();
      }
    };

    checkBottomSheetState();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isBottomSheetOpen) {
          closeBottomSheet();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [isBottomSheetOpen]);

  useEffect(() => {
    const storeBottomSheetState = async () => {
      await AsyncStorage.setItem(
        'bottomSheetState',
        isBottomSheetOpen ? 'open' : 'closed',
      );
    };

    storeBottomSheetState();
  }, [isBottomSheetOpen]);

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log('catch in useEffect : ', error);
    }
  }, []);

  function changeUsername(text) {
    try {
      let Username = text;
      if (Username == '') {
        setUsername(Username);
        setErrorUsername('Enter the name');
      } else {
        setUsername(Username);
        setErrorUsername('');
      }
    } catch (error) {
      console.log('catch in profile change_Username ' + error);
    }
  }

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('Enter email address');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  const chkNumberError = number => {
    let reg = /^[6-9][0-9]*$/;

    if (number.length === 0) {
      setError('Enter Your Mobile Number');
    } else if (reg.test(number) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(number) === true) {
      setError('');
    }
  };

  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };

  /* ****************************************************  ADD IMAGE BOTTOMSHEET ****************************************************** */

  function addImage_toggleBottomView() {
    try {
      setImagebottomSheetVisible(!imagebottomSheetVisible);
    } catch (error) {
      console.log('Catch in addImage_toggleBottomView :', error);
    }
  }

  function addImage_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={imagebottomSheetVisible}
            onBackButtonPress={addImage_toggleBottomView}
            onBackdropPress={addImage_toggleBottomView}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: Color.white,
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => captureImage()}
                style={{
                  alignItems: 'center',
                  marginTop: 30,
                  flexDirection: 'row',
                  width: scr_width,
                }}>
                <Iconviewcomponent
                  viewstyle={{
                    width: 40,
                    height: 40,
                    marginStart: 20,
                    marginEnd: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    padding: 10,
                    borderRadius: 30,
                  }}
                  Icontag={'AntDesign'}
                  icon_size={18}
                  icon_color={'white'}
                  iconname={'camera'}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.black,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => imagePicker()}
                style={{
                  alignItems: 'center',
                  marginTop: 30,
                  flexDirection: 'row',
                  width: scr_width,
                }}>
                <Iconviewcomponent
                  viewstyle={{
                    width: 40,
                    height: 40,
                    marginStart: 20,
                    marginEnd: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    padding: 10,
                    borderRadius: 30,
                  }}
                  Icontag={'AntDesign'}
                  icon_size={18}
                  icon_color={'white'}
                  iconname={'picture'}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.black,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission',
            },
          );
          // If CAMERA Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn('catch in request_Camera_Permission', err);
          return false;
        }
      } else return true;
    } catch (error) {
      console.log('catch in requestCameraPermission ', error);
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('catch in request_External_Storage_Permission', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async () => {
    try {
      let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'low',
        durationLimit: 30, //Video max duration in seconds
        saveToPhotos: true,
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let temp_array_upload_docs = [];
      if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, response => {
          //console.log('camera Response = ', response.assets);

          if (response.didCancel) {
            alert('User cancelled camera picker');
            setImagebottomSheetVisible(false);
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            setImagebottomSheetVisible(false);
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            setImagebottomSheetVisible(false);
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            setImagebottomSheetVisible(false);
            return;
          } else {
            let source = response.assets;
            setProImage(response?.assets);
          }
          setImagebottomSheetVisible(!imagebottomSheetVisible);
        });
      }
    } catch (error) {
      console.log('catch in capture_Image  ', error);
    }
  };

  const imagePicker = async from => {
    try {
      let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        selectionLimit: 0,
      };
      let temp_array_upload_docs = [];
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          alert('User cancelled image picker');
          setImagebottomSheetVisible(false);
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          setImagebottomSheetVisible(false);
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          setImagebottomSheetVisible(false);
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          setImagebottomSheetVisible(false);
          return;
        } else {
          setProImage(response?.assets);
        }

        setImagebottomSheetVisible(!imagebottomSheetVisible);
      });
    } catch (error) {
      console.log('catch in Image_picker  ', error);
    }
  };
  /* ******************************************************************************* */
  const updateProfile = async () => {
    try {
      var data = {
        user_id: user_id,
        username: Username,
        mobile_number: number,
        email: Usermail,
        user_type_id: currentStatus?.value,
      };
      if (Username != '' && Usermail != '' && number != '') {
        const updateProfiledata = await fetchData.save_profile(data);
        if (image?.length != '') {
          const newForm = new FormData();
          var { uri, fileName, name } = image[0];
          newForm.append('image', { uri, type: 'image/jpeg', name });
          newForm.append('user_id', user_id);
          const add_image = await axios.post(
            `https://backend.albionpropertyhub.com/api/Profile/add_profile_img`,
            newForm,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                  'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              },
            },
          );
          setAddprofileImage(add_image?.data?.file_name);
        }
        if (updateProfiledata?.status == true) {
          await AsyncStorage.setItem(
            'user_data',
            JSON.stringify(updateProfiledata?.user),
          );
          const updatedUser = {
            ...updateProfiledata?.user,
            profile: addprofileImage?.length != '' ? addprofileImage : profile,
          };
          dispatch(setUserData(updatedUser));
          dispatch(setEditVisible(true));
          navigation.navigate('Profile');
        }
      } else {
        setErrorUsername('Enter the name');
        setEmailValidError('Enter email address');
        setError('Enter Your Mobile Number');
      }
    } catch (error) {
      console.log('catch in update_Profile :', error);
    }
  };

  const dataPayload = () => {
    var data = {
      user_id: user_id,
    };

    if (mobile_number !== number) {
      data.mobile_number = number;
    }

    if (email !== Usermail) {
      data.email = Usermail;
    }

    return data;
  };

  async function getOTP() {
    try {
      var data = dataPayload();
      const getVerify = await axios.post(
        'https://backend.albionpropertyhub.com/api/login/update_contact',
        data,
      );
      if (getVerify.data.message == 'Success') {
        if (Platform.OS === 'android') {
          common_fn.showToast('OTP sent successfully to your Email');
        } else {
          alert("OTP sent successfully to your Email")
        }
        NumberRBSheet.current.open();
        setOtpVisible(true);
      }
    } catch (error) {
      if (error.response.data.message === 'mobile_number Already Exists ') {
        if (Platform.OS === 'android') {
          common_fn.showToast('Mobile Number Already Exists');
        } else {
          alert("Mobile Number Already Exists")
        }
        return;
      }
      if (error.response.data.message === 'email Already Exists ') {
        if (Platform.OS === 'android') {
          common_fn.showToast('Email Alreaady Exists');
        } else {
          alert("Email Alreaady Exists")
        }
        return;
      }
      if (Platform.OS === 'android') {
        common_fn.showToast('Something Went Wrong');
      } else {
        alert("Something Went Wrong")
      }
    }
  }

  async function verifyOtp(code) {
    try {
      var data = {
        user_id: user_id,
        user_data: code,
      };
      const getVerify = await fetchData.profile_otpVerify(data)
      if (getVerify?.message == "Success") {
        if (Platform.OS === 'android') {
          common_fn.showToast('OTP Validated Successfully');
        } else {
          Alert.alert("OTP Validated Successfully")
        }
        NumberRBSheet?.current?.close();
        updateProfile();
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast(getVerify?.message);
        } else {
          Alert.alert(getVerify?.message)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const resizeImages = [];
    Promise.all(
      proimage.map(async (image, index) => {
        var path = image?.uri;
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
      setImage(resizeImages);
    });
  }, [proimage.length]);

  useEffect(() => {
    if (!netInfo_State) {
      const interval = setTimeout(() => {
        if (Platform.OS === 'android') {
          common_fn.showToast("can't connect.Please Check Your Internet Connection");
        } else {
          alert("can't connect.Please Check Your Internet Connection")
        }

      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [netInfo_State]);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              backgroundColor: '#f3f3f3',
              borderRadius: 100,
            }}>
            {proimage?.length != 0 ? (
              <Image
                source={{ uri: proimage[0]?.uri }}
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            ) : profile?.length > 0 ? (
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
                source={{ uri: Media.Userpng }}
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => addImage_toggleBottomView()}
              style={{
                padding: 10,
                borderRadius: 40,
                top: 60,
                right: 0,
                backgroundColor: '#888',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'edit'}
                icon_size={20}
                icon_color={'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
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
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={Color.cloudyGrey}
                multiline={false}
                value={Username}
                onChangeText={text => changeUsername(text)}
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
            {!Username && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  marginTop: 5,
                }}>
                {errorUsername}
              </Text>
            )}
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
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Enter your Email"
                placeholderTextColor={Color.cloudyGrey}
                multiline={false}
                value={Usermail}
                onChangeText={value => {
                  setUsermail(value);
                  handleValidEmail(value);
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
            {emailValidError ? (
              <Text
                style={{
                  width: '100%',
                  fontSize: 12,
                  color: 'red',
                  marginTop: 5,
                }}>
                {emailValidError}
              </Text>
            ) : null}

          </View>
          <View
            style={{
              width: '96%',
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
                keyboardType="phone-pad"
                maxLength={10}
                returnKeyType={'done'}
                onChangeText={number => {
                  chkNumber(number);
                  chkNumberError(number);
                }}
                style={styles.numberTextBox}
              />
            </View>
            {error && <Text style={styles.invalidLogin}>{error}</Text>}
          </View>
          <View style={{ width: '95%', marginVertical: 10 }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
                textAlign: 'left',
              }}>
              User Type
            </Text>
            <Dropdown
              style={{
                backgroundColor: Color.white,
                borderColor:
                  change_persona == 0 ? Color.lightgrey : Color.cloudyGrey,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                height: 50,
                width: '100%',
              }}
              disable={change_persona == 0}
              placeholderStyle={{
                fontSize: 16,
                color: change_persona == 0 ? Color.lightgrey : Color.black,
                marginHorizontal: 10,
              }}
              selectedTextStyle={{
                fontSize: 16,
                color: Color.black,
              }}
              iconStyle={{ width: 20, height: 20 }}
              itemTextStyle={{ fontSize: 16, color: Color.cloudyGrey }}
              data={userType_data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Your Type"
              searchPlaceholder="Search..."
              value={currentStatus?.title}
              onChange={item => {
                setCurrentStatus(item);
              }}
              renderRightIcon={() => (
                <Icon
                  style={{ width: 20, height: 20 }}
                  color={change_persona == 0 ? Color.lightgrey : Color.black}
                  name="chevron-down"
                  size={20}
                />
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (number == mobile_number && email == Usermail) {
                updateProfile();
              } else {
                getOTP();
              }
            }}
            style={{
              width: '100%',
              height: 45,
              marginVertical: 40,
              backgroundColor: primarycolor,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: 'white' }}>
              {number == mobile_number && email == Usermail
                ? 'Update'
                : 'Get OTP'}
            </Text>
          </TouchableOpacity>
        </View>
        {addImage_BottomSheetmenu()}
      </ScrollView>
      <RequestNumberSheet
        NumberRBSheet={NumberRBSheet}
        setOtpVisible={setOtpVisible}
        otpVisible={otpVisible}
        verifyOtp={verifyOtp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  NumberBoxConatiner: {
    width: '100%',
    // flex:1,
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  numberCountryCode: {
    color: Color.cloudyGrey,
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  invalidLogin: {
    width: '100%',
    fontSize: 12,
    color: 'red',
    marginTop: 5,
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
    // fontFamily: 'Poppins-SemiBold',
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

export default EditProfile;
