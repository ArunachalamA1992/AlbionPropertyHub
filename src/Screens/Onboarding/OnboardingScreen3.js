import React, { useState, useCallback, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  View,
  PermissionsAndroid,
} from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { Switch } from 'react-native-paper';
import { Media } from '../../Global/Media';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { primarycolor } from '../../Utils/Colors';
import { Poppins } from '../../Global/FontFamily';

const { width, height } = Dimensions.get('screen');
const WIDTH_IMAGE = width - 80;
const HEIGHT_IMAGE = (WIDTH_IMAGE * 390) / 375;

let phonemsg =
  'This will help us to notify about the properties posted by your acquaintance so that you can help them get tenants/buyers faster or also help you close a house in case you find that house suitable';
let cameramsg =
  'The app may have features that involve capturing images directly within the application';
let micromsg = 'Let Albion use the microphone to translate search';
let mapmsg =
  'Your location wil be used in Google services such as Search, directions, and navigation';
let notifymsg =
  "Enable notifications so you don't miss another augmented reality experiences near you";

const OnboardingScreen3 = ({ navigation }) => {
  const [isPhoneSwitchOn, setIsPhoneSwitchOn] = React.useState(false);
  const [isCameraSwitchOn, setIsCameraSwitchOn] = React.useState(false);
  const [isMicroSwitchOn, setIsMicroSwitchOn] = React.useState(false);
  const [isLocSwitchOn, setIsLocSwitchOn] = React.useState(false);

  // const askForPermission = permission => {
  //     request(permission).then(result => {
  //         console.log("Result ----------- : ", result);
  //     })
  // }

  const onTogglePhoneSwitch = () => {
    setIsPhoneSwitchOn(!isPhoneSwitchOn);
  };

  const onToggleCameraSwitch = () => {
    setIsCameraSwitchOn(!isCameraSwitchOn);
  };

  const onToggleMicroSwitch = () => {
    setIsMicroSwitchOn(!isMicroSwitchOn);
  };

  const onToggleLocSwitch = () => {
    setIsLocSwitchOn(!isLocSwitchOn);
  };

  useEffect(() => {
    // checkPermission();
  }, [isPhoneSwitchOn, isCameraSwitchOn, isLocSwitchOn, isMicroSwitchOn]);

  async function allowAccess() {
    try {
      await contactAccess();
      await locationAccess();
      await requestMicrophone();
    } catch (error) {
      console.log('catch in allowAccess : ', error);
    }
  }

  function locationAccess() {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Location',
          message: 'This app would like to access your location',
        },
      ).then(() => {
        Alert('Permission Denied');
      });
    } catch (error) {
      console.log('catch in location_Access : ', error);
    }
  }

  function contactAccess() {
    try {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
          },
        ).then(() => {
          Alert('Permission Denied');
        });
      } else {
        // loadContacts();
      }
    } catch (error) {
      console.log('catch in contact_Access : ', error);
    }
  }

  const requestMicrophone = async () => {
    //replace your function with this code.
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for record audio',
            message: 'Give permission to your device to record audio',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('permission granted');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            fontSize: 16,
            color: Color.black,
            fontFamily: Poppins.SemiBold,
            marginVertical: 20, paddingHorizontal: 10
          }}>
          We Need Some Access To Make Your Experience Better
        </Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
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
                  Read Phone State & Contacts
                </Text>
                <View style={{ width: '95%', alignItems: 'flex-start' }}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 13,
                      color: '#666',
                      fontFamily: Poppins.Regular, lineHeight: 20
                    }}>
                    {phonemsg}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '95%',
              height: 1,
              marginVertical: 10,
              backgroundColor: '#e5e5e5',
            }}></View>


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
                <View style={{ width: '95%', alignItems: 'flex-start' }}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 13,
                      color: '#666',
                      fontFamily: Poppins.Regular, lineHeight: 20
                    }}>
                    {cameramsg}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* <View
            style={{
              width: '95%',
              height: 1,
              marginVertical: 10,
              backgroundColor: '#e5e5e5',
            }}></View> */}

          <View
            style={{
              width: '95%',
              height: 1,
              marginVertical: 10,
              backgroundColor: '#e5e5e5',
            }}></View>

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
              <Icon name="mic" size={16} color={Color.white} />
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
                  Albion would like to Access the Microphone and Allow to record audio?
                </Text>
                <View style={{ width: '95%', alignItems: 'flex-start' }}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 13,
                      color: '#666',
                      fontFamily: Poppins.Regular, lineHeight: 20
                    }}>
                    {micromsg}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '95%',
              height: 1,
              marginVertical: 10,
              backgroundColor: '#e5e5e5',
            }}></View>

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
                  Albion allow Google Maps to access your location while you
                  use the app?
                </Text>
                <View style={{ width: '95%', alignItems: 'flex-start' }}>
                  <Text
                    style={{
                      textAlign: 'justify',
                      fontSize: 13,
                      color: '#666',
                      fontFamily: Poppins.Regular, lineHeight: 20
                    }}>
                    {mapmsg}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 5
          }}>
          <Button
            title={'Prev'}
            titleStyle={{
              fontSize: 12,
              fontFamily: 'Poppins-SemiBold',
              color: Color.primary,
            }}
            buttonStyle={{
              // flex: 1,
              width: 100,
              height: 40,
              backgroundColor: Color.white,
              borderColor: Color.primary,
              borderWidth: 1,
              borderRadius: 50,
            }}
            containerStyle={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('OnboardingScreen2');
            }}
          />
          <Button
            title={`Let's Go`}
            titleStyle={{
              fontSize: 12,
              fontFamily: 'Poppins-SemiBold',
            }}
            buttonStyle={{
              // flex: 1,s
              width: 100,
              height: 40,
              backgroundColor: Color.primary,
              borderRadius: 50,
            }}
            containerStyle={styles.buttonContainer}
            onPress={() => navigation.replace('ActionSelect')}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default OnboardingScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  viewItem: {
    marginTop: 40,
    padding: 10,
  },
  image: {
    width: '100%',
    height: HEIGHT_IMAGE,
  },
  viewInfo: {
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 20,
  },
  viewPagination: {
    justifyContent: 'center',
  },
  viewButton: {
    // marginBottom: 20,
  },
  buttonTitle: {
    marginVertical: 2,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#2B2A28',
  },
  buttonContainer: {
    // marginHorizontal: 20,
    // width:"40%",
    alignItems: "center", justifyContent: "center"
  },
});
