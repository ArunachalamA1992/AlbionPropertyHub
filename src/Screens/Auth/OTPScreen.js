import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import Color from '../../Config/Color';
import {Media} from '../../Global/Media';
import OTPInput from '../../Components/OTPInput';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import RNOtpVerify from 'react-native-otp-verify';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {profileCompletion} from '../../Utils/utils';
import {setLoginType} from '../../Redux';
import {useDispatch} from 'react-redux';
import {Poppins} from '../../Global/FontFamily';
import {primarycolor} from '../../Utils/Colors';
import {firebase} from '@react-native-firebase/analytics';
// import { PERMISSIONS, request } from 'react-native-permissions';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const requestPermissionTransparency = async () => {
  return await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
};

const OTPScreen = ({route}) => {
  const navigation = useNavigation();
  const [number] = useState(route.params.number);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;
  const [error, setError] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(30);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const ResendOTP = async number => {
    setSeconds(30);
    const ResendOtpVerify = await fetchData.login({mobile_number: number});
    var {message, user_id} = ResendOtpVerify;
    if (user_id) {
      if (Platform.OS === 'android') {
        common_fn.showToast('OTP Sent Successfully');
      } else {
        alert('OTP Sent Successfully');
      }
    } else {
      var msg = 'message';
      setError(msg);
    }
  };

  const chkOTPError = OTP => {
    let reg = /^[6-9][0-9]*$/;

    if (OTP.length === 0) {
      setError('Enter Your OTP Code');
    } else if (reg.test(OTP) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(OTP) === true) {
      setError('');
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
    // if (otpCode?.length == 4) {
    // navigation.dispatch(StackActions.replace('TabNavigator'));
    // } else {
    //   setLoading(false);
    // }
  }, [token]);

  const [percentage, setPercentage] = useState(0);
  const VerifyOTP = async () => {
    setLoading(true);
    if (otpCode.length == 4) {
      const VerifyOTP = await fetchData.verify_OTP({
        mobile_number: number,
        otp: otpCode,
        token: token,
      });
      // var {user_id} = VerifyOTP?.data;
      console.log('navigation.replace', navigation.replace);
      if (VerifyOTP?.message == 'Success') {
        var {user_id, username, mobile_number, email} = VerifyOTP?.data;
        const percentage = profileCompletion(
          user_id,
          username,
          mobile_number,
          email,
        );
        setPercentage(percentage);
        const UserLogin = {
          ...VerifyOTP?.data,
        };
        await AsyncStorage.setItem(
          'user_data',
          JSON.stringify(VerifyOTP?.data),
        );
        await AsyncStorage.setItem(
          'action_login_type',
          JSON.stringify({login_type: 'properties'}),
        );
        dispatch(setLoginType('properties'));
        if (percentage == 100) {
          // navigation.replace('TabNavigator', UserLogin);
          navigation.dispatch(StackActions.replace('TabNavigator'));
        } else {
          navigation.dispatch(StackActions.replace('TabNavigator'));
        }
        locationTrack();
        if (Platform.OS === 'android') {
          common_fn.showToast(`Welcome to Albion ${VerifyOTP?.data?.username}`);
        } else {
          alert(`Welcome to Albion ${VerifyOTP?.data?.username}`);
        }

        common_fn.locationPermission();
        setLoading(false);
        setVisible(false);
      } else {
        setOTPCode('');
        inputRef.current.focus();
        var msg = VerifyOTP?.message;
        setError(msg);
        setLoading(false);
        setVisible(false);
      }
    } else {
      if (Platform.OS === 'android') {
        common_fn.showToast(
          'Invalid OTP Code Please Enter Your 4 Digit OTP Code',
        );
      } else {
        alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
        setLoading(false);
        setVisible(false);
      }
    }

    // request(PERMISSIONS.IOS.CONTACTS).then(result => {
    //   console.log(result);
    // });
  };

  async function locationTrack() {
    try {
      // useEffect(async () => {

      const result = await requestPermissionTransparency();
      if (result === RESULTS.GRANTED) {
        await firebase.analytics().setAnalyticsCollectionEnabled(true);
      } else {
        await firebase.analytics().setAnalyticsCollectionEnabled(false);
      }

      // }, [dispatch]);
    } catch (error) {
      console.log('catch in location_Track :', error);
    }
  }

  // useEffect(async () => {

  //   const result = await requestPermissionTransparency();
  //   if (result === RESULTS.GRANTED) {
  //     await firebase.analytics().setAnalyticsCollectionEnabled(true);
  //   } else {
  //     await firebase.analytics().setAnalyticsCollectionEnabled(false);
  //   }

  // }, [dispatch]);

  const checkPermmissions = () => {
    try {
      setVisible(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  const declineApp = navigation => {
    try {
      navigation.replace('Auth');
    } catch (error) {
      console.log('error', error);
    }
  };

  const requestSMSPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: 'SMS Permission',
            message: 'This app needs access to your SMS messages.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startListeningForOtp();
        } else {
          console.log('SMS permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestSMSPermission();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getHash()
        .then(hash => console.log('Hash:', hash))
        .catch(error => console.error('Error getting hash:', error));

      startListeningForOtp();
    }
  }, []);

  useEffect(() => {
    // This block of code will execute whenever OTPCode changes
    console.log('OTPCode changed:', otpCode);
  }, [otpCode]);

  const otpHandler = message => {
    try {
      console.log('Received SMS for OTP processing:', message);
      const otpMatch = /(\d{4})/g.exec(message);
      console.log('otpMatch', otpMatch);
      if (otpMatch && otpMatch[1]) {
        const otpDigit = otpMatch[1];

        // Append the new digit to the existing OTPCode
        setOTPCode(prevOTP => prevOTP + otpDigit);

        console.log('Updated OTP Code:', otpCode + otpDigit);

        // Check if the complete OTP is received
        if (otpCode.length + otpDigit.length === 4) {
          console.log('Complete OTP received:', otpCode + otpDigit);
          // Do any further processing or validation here
        }
      } else {
        console.log('No valid OTP found in the message:', message);
      }
    } catch (e) {
      console.error('Error extracting OTP:', e);
    }
  };

  const startListeningForOtp = () => {
    RNOtpVerify.getOtp()
      .then(receivedSMS => {
        console.log('Received SMS:', receivedSMS);
        // setOTPCode('1234');
        RNOtpVerify.addListener(otpHandler.bind(this));
      })
      .catch(error => console.error('Error getting SMS:', error));
  };
  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', flex: 1}}
      keyboardShouldPersistTaps="handled">
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.white,
            padding: 20,
          }}>
          <Modal visible={visible} transparent={true} animationType="slide">
            <View
              style={{
                flex: 1,
                backgroundColor: Color.transparantBlack,
                justifyContent: 'center',
                padding: 15,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: Poppins.Bold,
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Permissions
                </Text>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: Color.primary,
                      borderRadius: 40,
                      marginHorizontal: 10,
                    }}>
                    <Icon name="call" size={16} color={Color.white} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          textAlign: 'justify',
                          fontSize: 14,
                          color: '#333',
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Read Phone & Contacts
                      </Text>
                      <View style={{ width: '95%', alignItems: 'flex-start' }}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 13,
                            color: '#666',
                            fontFamily: Poppins.Regular, lineHeight: 20
                          }}>
                          We need access to your contacts to enhance your experience by allowing you to easily connect with friends
                        </Text>
                      </View>
                    </View>
                  </View>
                </View> */}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: Color.primary,
                      borderRadius: 40,
                      marginHorizontal: 10,
                    }}>
                    <Icon name="camera" size={16} color={Color.white} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          textAlign: 'justify',
                          fontSize: 14,
                          color: '#333',
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Albion would like to Access the Camera?
                      </Text>
                      <View style={{width: '95%', alignItems: 'flex-start'}}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 13,
                            color: '#666',
                            fontFamily: Poppins.Regular,
                            lineHeight: 20,
                          }}>
                          Albion Property Hub requires camera access to allow
                          you to take photos directly from your phone while
                          posting your property. This makes the process quick
                          and convenient, ensuring you can showcase your
                          property effectively
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: Color.primary,
                      borderRadius: 40,
                      marginHorizontal: 10,
                    }}>
                    <Icon name="location" size={16} color={Color.white} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          textAlign: 'justify',
                          fontSize: 14,
                          color: '#333',
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Albion want to access your location
                      </Text>
                      <View style={{width: '95%', alignItems: 'flex-start'}}>
                        <Text
                          style={{
                            textAlign: 'justify',
                            fontSize: 13,
                            color: '#666',
                            fontFamily: Poppins.Regular,
                            lineHeight: 20,
                          }}>
                          Our app automatically accesses your location via GPS
                          to deliver nearby properties tailored to your area.
                          You don't need to provide it manually, making it
                          effortless to find properties in your desired
                          location.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  {/* <TouchableOpacity onPress={() => declineApp(navigation)} style={{ width: '45%', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: primarycolor, borderRadius: 40, }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Decline</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => VerifyOTP()}
                    style={{
                      width: '100%',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: primarycolor,
                      borderRadius: 40,
                    }}>
                    <Text style={{fontSize: 14, color: 'white'}}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={{uri: Media.otp}}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
          </View>
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: Color.black,
                marginRight: 10,
                marginVertical: 10,
              }}>
              Enter OTP
            </Text>
            <Text style={styles.invalidLogin}>{error}</Text>
            <View style={styles.otpInputView}>
              <OTPInput
                inputRef={inputRef}
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={4}
                setIsPinReady={setIsPinReady}
                chkOTPError={chkOTPError}
              />
            </View>
            {seconds > 0 || minutes > 0 ? (
              <View style={styles.noReceivecodeView}>
                <Text style={styles.noReceiveText}>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </View>
            ) : (
              <View style={styles.noReceivecodeView}>
                <TouchableOpacity onPress={() => ResendOTP(number)}>
                  <Text style={styles.resendOtp}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            )}
            <Button
              title={'Submit'}
              titleStyle={{}}
              buttonStyle={{
                height: 50,
                backgroundColor: Color.primary,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onPress={() => {
                // VerifyOTP(navigation);
                checkPermmissions();
              }}
              loading={loading}
            />
          </View>
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
};

export default OTPScreen;
const styles = StyleSheet.create({
  otpInputView: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noReceivecodeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 15,
    marginRight: 10,
  },
  noReceiveText: {
    color: Color.black,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  resendOtp: {
    color: Color.primary,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  invalidLogin: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
    textAlign: 'center',
  },
});
