import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { setEditVisible, setUserData } from '../../Redux';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../../Config/Color';
import { Poppins } from '../../Global/FontFamily';
import { profileCompletion } from '../../Utils/utils';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Button } from 'react-native-elements';
import axios from 'axios';
import fetchData from '../../Config/fetchData';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import common_fn from '../../Config/common_fn';
import RequestNumberSheet from '../../Components/RequestNumberSheet';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

const WelcomePage = ({ }) => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, username, change_persona, mobile_number, email } = userData;
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState({});
  const [otpVisible, setOtpVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [Username, setUsername] = useState(username);
  const [number, setNumber] = useState(mobile_number);
  const [Usermail, setUsermail] = useState(email);
  const NumberRBSheet = useRef();
  const [userType_data] = useState([
    { label: 'Buyer', value: '1' },
    { label: 'Agent', value: '2' },
    { label: 'Builder', value: '3' },
  ]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
    NumberRBSheet.current.open();
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    NumberRBSheet.current.close();
  };

  //   async function checkVersion() {
  //     try {
  //       let VersionCheck = DeviceInfo.getVersion();
  //       let updateNeeded = await VersionCheck.needUpdate()
  //       console.log('updateNeeded ', updateNeeded);

  //       if (updateNeeded && updateNeeded.isNeeded) {
  //         Alert.alert(
  //           'Please Update',
  //           'A new version of the app is available now.  Please update your app to get the latest version.',
  //           [
  //             {
  //               text: 'Update',
  //               onPress: () => {
  //                 BackHandler.exitApp()
  //                 if (Platform.OS === 'android') {
  //                   Linking.openURL(updateNeeded.storeUrl)
  //                 } else {
  //                   Linking.openURL(VersionCheck.getAppStoreUrl)
  //                 }

  //               }
  //             }
  //           ]
  //         )
  //       }
  //     } catch (error) {

  //     }
  //   }

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

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_data');
      if (value !== null) {
        dispatch(setUserData(JSON.parse(value)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    const percentage = profileCompletion(
      user_id,
      username,
      mobile_number,
      email,
    );
    setPercentage(percentage);
  }, []);

  var text = `Welcome To Albion ${username} Complete Your Profile to get more experience`;
  var colorText = text.split(' ').map((word, i) => (
    <Text key={i}>
      <Text
        style={{
          color: word == `Albion` && Color.sunShade,
        }}>
        {word}{' '}
      </Text>
    </Text>
  ));

  async function getOTP() {
    try {
      var data = {
        user_id: user_id,
        email: Usermail,
      };
      const getVerify = await axios.post(
        'https://backend.albionpropertyhub.com/api/login/update_contact',
        data,
      );
      if (getVerify.data.message == 'Success') {
        if (Platform.OS === 'android') {
          common_fn.showToast('OTP sent successfully to your registered Email');
        } else {
          alert("OTP sent successfully to your registered Email")
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
    var data = {
      user_id: user_id,
      user_data: code,
    };
    const getVerify = await axios.post(
      'https://backend.albionpropertyhub.com/api/login/contact_verify',
      data,
    );
    if (getVerify?.status == 200) {
      if (Platform.OS === 'android') {
        common_fn.showToast('OTP Validated Successfully');
      } else {
        alert("OTP Validated Successfully")
      }
      NumberRBSheet?.current?.close();
      updateProfile();
    }
  }

  const updateProfile = async () => {
    try {
      var data = {
        user_id: user_id,
        username: Username,
        mobile_number: mobile_number,
        email: Usermail,
        user_type_id: currentStatus?.value,
      };
      if (Username != '' && Usermail != '' && mobile_number != '') {
        const updateProfiledata = await fetchData.save_profile(data);
        if (updateProfiledata?.status == true) {
          await AsyncStorage.setItem(
            'user_data',
            JSON.stringify(updateProfiledata?.user),
          );
          dispatch(setUserData(updateProfiledata?.user));
          dispatch(setEditVisible(true));
          navigation.replace('TabNavigator');
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Please Enter the Fields');
        } else {
          alert("Please Enter the Fields")
        }
      }
    } catch (error) {
      console.log('catch in update_Profile :', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.white, padding: 10 }}>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.replace('TabNavigator');
        }}>
        <Text
          style={{
            fontFamily: Poppins.SemiBold,
            color: Color.primary,
            fontSize: 16,
            textAlign: 'right',
            marginVertical: 10,
          }}>
          Skip
        </Text>
      </TouchableOpacity> */}
      <View
        style={{
          marginVertical: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: Poppins.SemiBold,
            color: Color.black,
            fontSize: 18,
            textAlign: 'center',
          }}>
          {colorText}
        </Text>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
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
                fontSize: 12,
                paddingHorizontal: 20,
                flexDirection: 'row',
              }}
            />

            <Iconviewcomponent
              Icontag={'FontAwesome5'}
              iconname={'user-edit'}
              icon_size={18}
              icon_color={Color.lightBlack}
            />
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
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
                fontSize: 12,
                paddingHorizontal: 20,
                flexDirection: 'row',
              }}
            />

            <Iconviewcomponent
              Icontag={'MaterialCommunityIcons'}
              iconname={'email-edit'}
              icon_size={18}
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
              fontSize: 14,
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
              value={mobile_number}
              keyboardType="phone-pad"
              maxLength={10}
              returnKeyType={'done'}
              onChangeText={number => {
                chkNumber(number);
              }}
              editable={false}
              style={styles.numberTextBox}
            />
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 14,
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
              borderRadius: 10,
              paddingHorizontal: 20,
            }}
            disable={change_persona == 0}
            placeholderStyle={{
              fontSize: 12,
              color: change_persona == 0 ? Color.lightgrey : Color.black,
            }}
            selectedTextStyle={{
              fontSize: 12,
              color: Color.black,
            }}
            iconStyle={{ width: 20, height: 20 }}
            itemTextStyle={{
              fontSize: 12,
              color: Color.cloudyGrey,
            }}
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
        <Button
          title={email == Usermail ? 'Submit' : 'Get OTP'}
          buttonStyle={{
            backgroundColor: Color.primary,
            marginVertical: 20,
            borderRadius: 10,
          }}
          onPress={() => {
            if (email == Usermail) {
              updateProfile();
            } else {
              getOTP();
            }
          }}
        />
      </View>
      <RequestNumberSheet
        NumberRBSheet={NumberRBSheet}
        setOtpVisible={setOtpVisible}
        otpVisible={otpVisible}
        verifyOtp={verifyOtp}
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      />
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  NumberBoxConatiner: {
    width: '100%',
    borderColor: Color.lightgrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  numberCountryCode: {
    color: Color.lightgrey,
    marginHorizontal: 10,
    fontSize: 12,
    fontFamily: Poppins.SemiBold,
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
    borderLeftColor: Color.lightgrey,
    borderLeftWidth: 1,
    color: Color.lightgrey,
    marginVertical: 10,
    fontSize: 12,
  },
});
