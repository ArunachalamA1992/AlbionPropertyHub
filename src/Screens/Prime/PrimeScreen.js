import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';
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
} from 'react-native';
import {scr_height, scr_width} from '../../Utils/Dimensions';
import {primarycolor} from '../../Utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {Iconviewcomponent} from '../../Components/Icontag';
import {Media} from '../../Global/Media';
import Color from '../../Config/Color';
import common_fn from '../../Config/common_fn';
import axios from 'axios';
import {Poppins} from '../../Global/FontFamily';
import {setPayCancelVisible, setPaySuccessVisible} from '../../Redux';
import {AgentPlanData, BuilderPlanData, OwnerPlanData} from '../../contentJson';
// import PhonePePaymentSDK from 'react-native-phonepe-pg';
// import RNUpiPayment from 'react-native-upi-payment';
import RazorpayCheckout from 'react-native-razorpay';
import Table from '../../Components/PayTable';
import fetchData from '../../Config/fetchData';

const PrimeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectItem, setSelectItem] = useState({});
  const [selectPlan, setSelectPlan] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const [purchaseVisible, setPurchaseVisible] = useState(false);
  const [isPhonePeInstalled, setPhonePeInstalled] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {user_id, username, mobile_number, user_type_id, change_persona, email} =
    userData;
  const headerOpacity = animatedOpacityValue.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 1],
    extrapolate: 'clamp',
    useNativeDriver: false,
  });
  const [planData, setPlanData] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      crashlytics().recordError(
        "catch in use_effect's netinfo Profile Page :" + error,
      );
    }
  }, []);

  // useEffect(() => {
  //   PhonePePaymentSDK.isPhonePeInstalled().then((installed) => {
  //     setPhonePeInstalled(installed);
  //   });
  // }, []);
  // function generateChecksum(data) {
  //   let checksum = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     checksum ^= data.charCodeAt(i);
  //   }
  //   return checksum.toString(16);
  // }

  // function generateUniqueIdentifier() {
  //   const timestamp = Date.now().toString();
  //   const randomSuffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  //   return 'MUID' + timestamp + randomSuffix;
  // }

  // const getPhonePayCheckout = async () => {
  //   const merchantTransactionID = generateUniqueIdentifier()
  //   const transactionPayload = {
  //     "merchantId": "PHONEPEPGTEST43",
  //     "merchantTransactionId": `${merchantTransactionID}`,
  //     "merchantUserId": "MUID123",
  //     "amount": 1000,
  //     "mobileNumber": "9999999999",
  //     "callbackUrl": "https://webhook.site/callback-url",
  //     "paymentInstrument": {
  //       "type": "UPI_INTENT",
  //       "targetApp": "com.phonepe.app"
  //     },
  //     "deviceContext": {
  //       "deviceOS": "ANDROID"
  //     }
  //   };

  //   try {
  //     const merchantKey = '3cb6a6d7-5ae4-4a01-9bdc-61f27ccefe46';
  //     const merchantId = 'MUID' + Math.random().toString(36).substr(2, 6);
  //     const checksum = generateChecksum(merchantId + merchantKey);
  //     console.log('checksum', checksum,transactionPayload)
  //     await PhonePePaymentSDK.init('SANDBOX', 'PHONEPEPGTEST43', user_id, true);

  //     const result = await PhonePePaymentSDK.startTransaction(
  //       JSON.stringify(transactionPayload),
  //       checksum,
  //       null,
  //       null
  //     );

  //     console.log('Transaction Result:', result);
  //   } catch (error) {
  //     console.error('Error initiating transaction:', error);
  //   }
  // };

  const [requestBody, setRequestBody] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [appId, setAppId] = useState('');

  const [checksum, setChecksum] = useState('');

  const [openEnvironment, setOpenEnvironment] = useState(false);
  const [environmentDropDownValue, setEnvironmentValue] =
    useState('PRODUCTION');

  const [environements, setEnvironment] = useState([
    {label: 'SANDBOX', value: 'SANDBOX'},
    {label: 'PRODUCTION', value: 'PRODUCTION'},
  ]);

  const [packageName, setPackageName] = useState('');
  const [callbackURL, setCallbackURL] = useState('reactDemoAppScheme');

  // const handleStartTransaction = () => {
  //   PhonePePaymentSDK.startTransaction(
  //     requestBody,
  //     checksum,
  //     packageName,
  //     callbackURL
  //   ).then(a => {
  //     setMessage(JSON.stringify(a));
  //   }).catch(error => {
  //     setMessage("error:" + error.message);
  //   })
  // };

  // const initPhonePeSDK = () => {
  //   PhonePePaymentSDK.init(
  //     environmentDropDownValue,
  //     merchantId,
  //     appId,
  //     true
  //   ).then(result => {
  //     setMessage("Message: SDK Initialisation ->" + JSON.stringify(result));
  //   }).catch(error => {
  //     setMessage("error:" + error.message);
  //   })
  // };

  const [, setPhonePeAppInstalled] = useState(false);
  const [, setGPayAppInstalled] = useState(false);
  const [, setPaytmAppInstalled] = useState(false);
  const [message, setMessage] = useState('Message: ');

  // const handleIsPhonePeAppInstalled = () => {
  //   PhonePePaymentSDK.isPhonePeInstalled().then(a => {
  //     setPhonePeAppInstalled(a);
  //     if (a) {
  //       setMessage("Message: PhonePe App Installed")
  //     } else {
  //       setMessage("Message: PhonePe App Unavailable")
  //     }
  //   }).catch(error => {
  //     setMessage("error:" + error.message);
  //   })
  // };

  // const handleIsGPayAppInstalled = () => {
  //   PhonePePaymentSDK.isGPayAppInstalled().then(a => {
  //     setGPayAppInstalled(a);
  //     if (a) {
  //       setMessage("Message: Gpay App Installed")
  //     } else {
  //       setMessage("Message: Gpay App Unavailable")
  //     }
  //   }).catch(error => {
  //     setMessage("error:" + error.message);
  //   })
  // };

  // const handleIsPaytmInstalled = () => {
  //   PhonePePaymentSDK.isPaytmAppInstalled().then(a => {
  //     setPaytmAppInstalled(a);
  //     if (a) {
  //       setMessage("Message: Paytm App Installed")
  //     } else {
  //       setMessage("Message: Paytm App Unavailable")
  //     }
  //   }).catch(error => {
  //     setMessage("error:" + error.message);
  //   })
  // };

  // const getPackageSignatureForAndroid = () => {
  //   if (Platform.OS === 'android') {
  //     PhonePePaymentSDK.getPackageSignatureForAndroid().then(packageSignture => {
  //       setMessage(JSON.stringify(packageSignture));
  //     }).catch(error => {
  //       setMessage("error:" + error.message);
  //     })
  //   }
  // };

  // const getUpiAppsForAndroid = () => {
  //   if (Platform.OS === 'android') {
  //     PhonePePaymentSDK.getUpiAppsForAndroid().then(upiApps => {
  //       console.log('upiApps', upiApps)
  //       if (upiApps != null)
  //         setMessage(JSON.stringify(JSON.parse(upiApps)));
  //     }).catch(error => {
  //       setMessage("error:" + error.message);
  //     })
  //   }
  // };

  const getCheckout = () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        user_id: user_id,
        amount: selectItem?.amount,
        return: 'https://albionpropertyhub.com/',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      fetch('https://grance.in/albion/api/payments/phonepe', requestOptions)
        .then(response => response.json())
        .then(result => {
          const redirectUrl = result?.redirect_url;
          if (redirectUrl) {
            navigation.navigate('PayView', {uri: redirectUrl});
          } else {
            console.log('Error: Redirect URL is undefined or null');
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    try {
      const data = `plan_group=2&user_type_id=${user_type_id}`;
      const plan_data = await fetchData.check_plan(data);
      setPlanData(plan_data);
    } catch (error) {
      console.log('error', error);
    }
  };
  const paymentDetails = async () => {
    const paymentData = {
      user_id: user_id,
      plan_id: selectItem?.plan_id,
    };
    const payment_start = await fetchData.pay_plan(paymentData);
    RazorpayCheckout.open(payment_start)
      .then(
        async ({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        }) => {
          var data = {
            orderCreationId: paymentData?.order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            razorpaySignature: razorpay_signature,
            plan_id: selectItem?.plan_id,
            user_id: user_id,
            plan_group: '2',
          };
          console.log('data', data)
          const placeOrder = await fetchData.verify_pay(data);
          console.log('placeOrder', placeOrder);
          dispatch(setPaySuccessVisible(true));
          navigation?.replace('TabNavigator', {user_id});
        },
      )
      .catch(error => {
        dispatch(setPayCancelVisible(true));
        navigation?.replace('TabNavigator', {user_id});
      });
  };

  // const [paymentStatus, setPaymentStatus] = useState('');

  // function getPhonePayCheckout() {
  //   try {
  //     console.log("click in payment button");

  //     RNUpiPayment.initializePayment(
  //       {
  //         vpa: '9629009376@ybl',
  //         payeeName: 'Gokul Raj',
  //         amount: '1',
  //         transactionRef: 'aasf-332-aoei-fn',
  //       },
  //       successCallback,
  //       failureCallback
  //     );

  //   } catch (error) {
  //     console.log("catch in payment_Click's :", error);
  //   }
  // }

  // function successCallback(data) {
  //   // do whatever with the data
  //   console.log("Sucess in payment_Click's :", data);
  // }

  // function failureCallback(data) {
  //   // do whatever with the data
  //   console.log("failure in payment_Click's :", data);
  // }
  function selectPlanItem(item, index) {
    try {
      setSelectPlan(item.amount);
      setSelectItem(item);
    } catch (error) {
      console.log('catch in selectPlan_Item :', error);
    }
  }

  function renderPlanItem(item, index) {
    try {
      let selecttextbg = 'black';
      let selectsubtextbg = '#666';
      // let selecttextbg = selectItem?.id === item?.id ? 'white' : 'black';
      // let selectsubtextbg = selectItem?.id === item?.id ? 'white' : '#666';

      let selectbg =
        selectItem?.plan_id === item?.plan_id ? '#008B89' : 'white';
      let selectTextColor =
        selectItem?.plan_id === item?.plan_id ? Color.white : Color.cloudyGrey;
      let selectSubTextColor =
        selectItem?.plan_id === item?.plan_id ? Color.white : Color.cloudyGrey;
      return (
        <TouchableOpacity
          onPress={() => {
            selectPlanItem(item, index);
            setPurchaseVisible(true);
          }}
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            borderWidth: 1,
            borderColor: Color.lightgrey,
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: item?.plan_id == 1 ? Color.lightgrey : selectbg,
            borderRadius: 10,
            width: 150,
            marginHorizontal: 10,
            paddingVertical: 10,
          }}
          disabled={item?.plan_name == 'Free'}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: Color.white,
                  fontFamily: Poppins.SemiBold,
                  paddingTop: 7,
                  backgroundColor:
                    item.plan_name == 'Free'
                      ? Color.grey
                      : item.plan_name == 'Basic'
                      ? Color.lightgrey
                      : item.plan_name == 'Standard'
                      ? Color.blue
                      : item.plan_name == 'Premium'
                      ? Color.green
                      : item.plan_name == 'Premium Plus'
                      ? Color.purple
                      : Color.sunShade,
                  borderRadius: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                }}>
                {item.plan_name}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: selectSubTextColor,
                  fontFamily: Poppins.SemiBold,
                  textDecorationLine: 'line-through',
                }}>
                ₹ {item?.price}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: selectTextColor,
                  fontFamily: Poppins.SemiBold,
                  marginHorizontal: 5,
                }}>
                ₹ {item.amount}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } catch (error) {
      console.log('catch in renderPlanItem : ', error);
    }
  }

  function renderHeaderItem() {
    try {
      return (
        <View style={{width: '95%'}}>
          <View
            style={{
              paddingHorizontal: 10,
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 24,
                color: Color.primary,
                paddingVertical: 10,
                fontFamily: Poppins.Bold,
                textAlign: 'justify',
              }}>
              This is just for the advertisement/demo.
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Color.cloudyGrey,
                fontFamily: Poppins.Regular,
              }}>
              Choose Your Plan
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'check'}
                icon_size={26}
                icon_color={'#239D0F'}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginHorizontal: 10,
                  fontFamily: Poppins.Regular,
                }}>
                Pay Zero Commission & Call Owner Directly
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Iconviewcomponent
                Icontag={'Feather'}
                iconname={'check'}
                icon_size={26}
                icon_color={'#239D0F'}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  marginHorizontal: 10,
                  fontFamily: Poppins.Regular,
                }}>
                Save Money : Get Direct Access to Owner Properties
              </Text>
            </View>
          </View>
          <Table data={planData} />
        </View>
      );
    } catch (error) {
      console.log('catch in renderHeaderitem : ', error);
    }
  }

  function renderFooterItem() {
    try {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Poppins.SemiBold,
                color: 'black',
                paddingHorizontal: 10,
              }}>
              How it works
            </Text>

            <View style={{paddingHorizontal: 10, paddingVertical: 0}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  padding: 5,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                1. Become an Albion Prime Member & explore owner posted
                properties
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  padding: 5,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                2. Access Albion Prime Properties unlocked exclusively for you{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  padding: 5,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                3. Contact owners directly to view and finalize property
              </Text>
            </View>
          </View>

          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Poppins.SemiBold,
                color: 'black',
                paddingHorizontal: 10,
              }}>
              Frequently Asked Questions?
            </Text>

            <View style={{paddingHorizontal: 10, paddingVertical: 0}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  padding: 5,
                  fontFamily: Poppins.SemiBold,
                }}>
                1. What is Albion Prime?
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#333',
                  padding: 5,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                Albion Prime is a membership programme that gives you execlusive
                access to properties posted directly by owners, so you can save
                on Money.
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                  fontFamily: Poppins.SemiBold,
                  padding: 3,
                }}>
                Key benefits of this Membership includes:
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                * Priority access to properties posted by Owners.
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                * View contact no.of upto 35 Owners
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                * On-call support for queries
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                * Upto 100% savings on Rent Agreement
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                * Special discount deals from partner brands
              </Text>
            </View>

            <View style={{paddingHorizontal: 10, paddingVertical: 0}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  padding: 5,
                  fontFamily: Poppins.SemiBold,
                }}>
                2. How to avail Albion Prime benefits?
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#333',
                  padding: 5,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                Albion Prime makes your property search really easy, quick, and
                stress-free. Here's how you can avail all the benefits;
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                step 1: Become a Albion Prime Member and tell us your
                requirements
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                step 2: Get Priority Access to properties posted directly by
                Owners{' '}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                step 3: View contact no.of uptp 50 Owners(or 25 if you are a
                Basic Member)
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                step 4: Finalize the property you like & Save big on Brokerage
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#666',
                  padding: 2,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                step 5: Save extra on Rent Agreement/Home Loan and Packers &
                Movers
              </Text>
            </View>

            <View style={{paddingHorizontal: 10, paddingVertical: 0}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  padding: 5,
                  fontFamily: Poppins.SemiBold,
                }}>
                3. How does the On-call Assistant help?
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#666',
                  padding: 5,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                As an Albion Prime member, you will have an On-call Assistant to
                address all your queries throughout the journey & ensure a
                smooth experience for you.
              </Text>
            </View>

            <View style={{paddingHorizontal: 10, paddingVertical: 0}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  padding: 5,
                  fontFamily: Poppins.SemiBold,
                }}>
                4. What if i can not find the right property evern after taking
                Albion Prime Membership?
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#666',
                  padding: 5,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  fontFamily: Poppins.Regular,
                }}>
                We've a wide collection of properties on ALbion for evry
                requirements and budget and we try our best to find the best
                matches for you. However, in a situation where you can't find
                the property of your choice, we would request you to
                modify/adjust your requirement a little bit.
              </Text>
            </View>
          </View>
        </View>
      );
    } catch (error) {
      console.log('catch in renderFooterItem : ', error);
    }
  }

  // function purchaseClick() {
  //   try {
  //     Alert.alert(
  //       //title
  //       'Albion Prime',
  //       //body
  //       `Do you want to Purchase this Plan : ` + selectPlan,
  //       [
  //         {
  //           text: 'Yes',
  //           onPress: () => alert('Purchase Successfully'),
  //         },
  //         {
  //           text: 'No',
  //           onPress: () => alert('Your Purchase Plan Cancalled'),
  //           style: 'cancel',
  //         },
  //       ],
  //       { cancelable: false },
  //       //clicking out side of alert will not cancel
  //     );
  //   } catch (error) {
  //     console.log('catch in purchase_Click : ', error);
  //   }
  // }

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

  const [changeResponseText, setChangeResponseText] = useState('');

  // const getCheckOut = async () => {
  //   var data = {
  //     order_amount: selectPlan,
  //     order_id: `order_${Math.floor(Math.random() * 10000 + 1)}`,
  //     order_currency: 'INR',
  //     customer_details: {
  //       customer_id: user_id,
  //       customer_name: username,
  //       customer_email: email,
  //       customer_phone: mobile_number,
  //     },
  //     order_meta: {
  //       notify_url: 'https://test.cashfree.com',
  //     },
  //     order_note: 'some order note here',
  //   };
  //   const response = await axios.post(
  //     'https://sandbox.cashfree.com/pg/orders',
  //     data,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-client-id': 'TEST1004441509edc9fd654c1afc69b351444001',
  //         'x-client-secret': 'TESTfe5eaf6e51b092252f62e2f31bdfedfa1248206f',
  //         'x-api-version': '2022-09-01',
  //         'x-request-id': 'Veeramani',
  //       },
  //     },
  //   );
  //   const resp = {
  //     session_id: response?.data?.payment_session_id,
  //     order_id: response?.data?.order_id,
  //   };
  //   startCheckout(resp);
  // };

  // useEffect(() => {
  //   CFPaymentGatewayService.setCallback({
  //     async onVerify(orderID) {
  //       setChangeResponseText('orderId is :' + orderID);

  //       const Payments = await axios.get(
  //         `https://backend.albionpropertyhub.com/api/Payments/return_order?order_id=${orderID}&plan_id=${selectItem?.id}&user_id=${user_id}`,
  //       );
  //       console.log('Payments', Payments?.data);
  //       dispatch(setPaySuccessVisible(true));
  //       navigation.replace('TabNavigator', { user_id });
  //     },
  //     onError(error, orderID) {
  //       setChangeResponseText(
  //         'exception is : ' +
  //         JSON.stringify(error) +
  //         '\norderId is :' +
  //         orderID,
  //       );
  //       dispatch(setPayCancelVisible(true));
  //       navigation.replace('TabNavigator', { user_id });
  //     },
  //   });

  //   return () => {
  //     CFPaymentGatewayService.removeCallback();
  //   };
  // }, []);

  // const startCheckout = async response => {
  //   try {
  //     const session = new CFSession(
  //       response.session_id,
  //       response.order_id,
  //       CFEnvironment.SANDBOX,
  //     );
  //     const theme = new CFThemeBuilder()
  //       .setNavigationBarBackgroundColor('#E64A19') // ios
  //       .setNavigationBarTextColor('#FFFFFF') // ios
  //       .setButtonBackgroundColor('#FFC107') // ios
  //       .setButtonTextColor('#FFFFFF') // ios
  //       .setPrimaryTextColor('#212121')
  //       .setSecondaryTextColor('#757575') // ios
  //       .build();
  //     const dropPayment = new CFUPIIntentCheckoutPayment(session, theme);
  //     const resp = await CFPaymentGatewayService.doUPIPayment(dropPayment);
  //   } catch (e) {
  //     console.log('error msg ----------- :', e.message);
  //   }
  // };

  const taby = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateRight: 'clamp',
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={planData}
        numColumns={2}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={() => renderHeaderItem()}
        renderItem={({item, index}) => renderPlanItem(item, index)}
        ListFooterComponent={() => renderFooterItem()}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
      />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {purchaseVisible && (
          <Animated.View
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 0,
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 10,
              backgroundColor: Color.white,
            }}>
            <TouchableOpacity
              // onPress={() => getUpiAppsForAndroid()}
              onPress={() => paymentDetails()}
              style={{
                backgroundColor: Color.primary,
                padding: 10,
                width: '100%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontFamily: Poppins.SemiBold,
                }}>
                Purchase
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default PrimeScreen;
