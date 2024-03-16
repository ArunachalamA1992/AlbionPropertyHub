import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
  BackHandler,
  ScrollView,
} from 'react-native';
import Color from '../Config/Color';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../Global/FontFamily';
import { Button } from 'react-native-elements';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setPayCancelVisible, setPaySuccessVisible} from '../Redux';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {AgentPlanData, BuyerPlanData, OwnerPlanData} from '../contentJson';
import Table from './PayTable';
import fetchData from '../Config/fetchData';

const PlanPurchase = props => {
  const [planData, setPlanData] = useState([]);
  const [cardHeight] = useState(undefined);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectItem, setSelectItem] = useState({});
  const [selectPlan, setSelectPlan] = useState('');
  const userData = useSelector(state => state.UserReducer.userData);
  const [changeResponseText, setChangeResponseText] = useState('');
  var { user_id, username, mobile_number, user_type_id, change_persona, email } =
    userData;

  function selectPlanItem(item, index) {
    try {
      setSelectPlan(item.amount);
      setSelectItem(item);
    } catch (error) {
      console.log('catch in selectPlan_Item :', error);
    }
  }

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
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //     onError(error, orderID) {
  //       setChangeResponseText(
  //         'exception is : ' +
  //           JSON.stringify(error) +
  //           '\norderId is :' +
  //           orderID,
  //       );
  //       dispatch(setPayCancelVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
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
          console.log('data', data);
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

  function handleBackButtonClick() {
    props.setPlanVisible(false);
    navigation.replace('TabNavigator');
    return true;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Modal transparent visible={props?.planVisible} animationType="slide">
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          backgroundColor: Color.transparantBlack,
        }}
        onPress={() => {
          props.setPlanVisible(false);
          navigation.replace('TabNavigator');
        }}
      />
      <View
        style={{
          backgroundColor: Color.white,
          borderRadius: 10,
          padding: 10,
          height: cardHeight,
        }}>
        <ScrollView showsVerticalScrollIndicator>
          <TouchableOpacity
            onPress={() => {
              props.setPlanVisible(false);
              navigation.replace('TabNavigator');
            }}
            style={{
              marginRight: 10,
              // position: 'absolute',
              // left: 0,
              // right: 0,
              // top: 0,
              // bottom: 0,
              alignItems: 'flex-end',
            }}>
            <Icon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#EBF7EC',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.black,
                marginHorizontal: 10,
              }}>
              Your Plan Has Been Expired
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
              }}>
              Choose Your Plan
            </Text>
          </View>
          <Table data={planData} />
          <FlatList
            data={planData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
              let selecttextbg = 'black';
              let selectsubtextbg = '#666';
              // let selecttextbg = selectItem?.id === item?.id ? 'white' : 'black';
              // let selectsubtextbg = selectItem?.id === item?.id ? 'white' : '#666';

              let selectbg =
                selectItem?.plan_id === item?.plan_id ? '#008B89' : 'white';
              let selectTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              let selectSubTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectPlanItem(item, index);
                  }}
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: Color.lightgrey,
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor:
                      item?.plan_id == 1 ? Color.lightgrey : selectbg,
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
            }}
            showsVerticalScrollIndicator={false}
          />
          <Button
            title={'Purchase'}
            onPress={() => paymentDetails()}
            titleStyle={{
              fontSize: 16,
              fontFamily: Poppins.SemiBold,
              color: Color.white,
            }}
            // disabled={selectPlan?.length == 0}
            disabled={true}
            buttonStyle={{
              marginVertical: 20,
              backgroundColor: Color.primary,
            }}
          />
        </ScrollView>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export const PlanPhonePurchase = props => {
  const [planData, setPlanData] = useState([]);
  var {setPhoneQuotoVisible, phoneQuotoVisible} = props;
  const [cardHeight] = useState(undefined);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectItem, setSelectItem] = useState({});
  const [selectPlan, setSelectPlan] = useState('');
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, username, mobile_number, user_type_id, change_persona, email } =
    userData;
  function selectPlanItem(item, index) {
    try {
      setSelectPlan(item.amount);
      setSelectItem(item);
    } catch (error) {
      console.log('catch in selectPlan_Item :', error);
    }
  }
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
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //     onError(error, orderID) {
  //       setChangeResponseText(
  //         'exception is : ' +
  //           JSON.stringify(error) +
  //           '\norderId is :' +
  //           orderID,
  //       );
  //       dispatch(setPayCancelVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
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

  // function handleBackButtonClick() {
  //   console.log('Back button pressed');
  //   setPhoneQuotoVisible(false);
  //   return true;
  // }

  // useEffect(() => {
  //   console.log('Adding event listener');
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     console.log('Removing event listener');
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  // }, []);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async () => {
    try {
      const data = `plan_group=1&user_type_id=${user_type_id}`;
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
            plan_group: '1',
          };
          console.log('data', data);
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

  return (
    <Modal transparent visible={phoneQuotoVisible} animationType="slide">
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          backgroundColor: Color.transparantBlack,
        }}
        onPress={() => {
          setPhoneQuotoVisible(false);
        }}
      />
      <View
        style={{
          backgroundColor: Color.white,
          borderRadius: 10,
          padding: 10,
          height: cardHeight,
        }}>
        <ScrollView showsVerticalScrollIndicator>
          <TouchableOpacity
            onPress={() => {
              setPhoneQuotoVisible(false);
            }}
            style={{
              marginRight: 10,
              // position: 'absolute',
              // left: 0,
              // right: 0,
              // top: 0,
              // bottom: 0,
              alignItems: 'flex-end',
            }}>
            <Icon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#EBF7EC',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.black,
                marginHorizontal: 10,
              }}>
              Your Plan Has Been Expired
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
              }}>
              Choose Your Plan
            </Text>
          </View>
          <Table data={planData} />
          <FlatList
            data={planData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
              let selecttextbg = 'black';
              let selectsubtextbg = '#666';
              // let selecttextbg = selectItem?.id === item?.id ? 'white' : 'black';
              // let selectsubtextbg = selectItem?.id === item?.id ? 'white' : '#666';

              let selectbg =
                selectItem?.plan_id === item?.plan_id ? '#008B89' : 'white';
              let selectTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              let selectSubTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectPlanItem(item, index);
                  }}
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: Color.lightgrey,
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor:
                      item?.plan_id == 1 ? Color.lightgrey : selectbg,
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
            }}
            showsVerticalScrollIndicator={false}
          />
          <Button
            title={'Purchase'}
            onPress={() => paymentDetails()}
            titleStyle={{
              fontSize: 16,
              fontFamily: Poppins.SemiBold,
              color: Color.white,
            }}
            // disabled={selectPlan?.length == 0}
            disabled={true}
            buttonStyle={{
              marginVertical: 20,
              backgroundColor: Color.primary,
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export const AgentPlanPurchase = props => {
  const [planData, setPlanData] = useState([]);
  const [cardHeight] = useState(undefined);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectItem, setSelectItem] = useState({});
  const [selectPlan, setSelectPlan] = useState('');
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, username, mobile_number, user_type_id, change_persona, email } =
    userData;
  function selectPlanItem(item, index) {
    try {
      setSelectPlan(item.amount);
      setSelectItem(item);
    } catch (error) {
      console.log('catch in selectPlan_Item :', error);
    }
  }
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
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //     onError(error, orderID) {
  //       setChangeResponseText(
  //         'exception is : ' +
  //           JSON.stringify(error) +
  //           '\norderId is :' +
  //           orderID,
  //       );
  //       dispatch(setPayCancelVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
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
          console.log('data', data);
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

  function handleBackButtonClick() {
    props.setPlanVisible(false);
    navigation.replace('TabNavigator');
    return true;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Modal transparent visible={props?.planVisible} animationType="slide">
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          backgroundColor: Color.transparantBlack,
        }}
        onPress={() => {
          props.setPlanVisible(false);
          navigation.replace('TabNavigator');
        }}
      />
      <View
        style={{
          backgroundColor: Color.white,
          borderRadius: 10,
          padding: 10,
          height: cardHeight,
        }}>
        <ScrollView showsVerticalScrollIndicator>
          <TouchableOpacity
            onPress={() => {
              props.setPlanVisible(false);
              navigation.replace('TabNavigator');
            }}
            style={{
              marginRight: 10,
              // position: 'absolute',
              // left: 0,
              // right: 0,
              // top: 0,
              // bottom: 0,
              alignItems: 'flex-end',
            }}>
            <Icon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#EBF7EC',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.black,
                marginHorizontal: 10,
              }}>
              Your Plan Has Been Expired
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
              }}>
              Choose Your Plan
            </Text>
          </View>
          <Table data={planData} />
          <FlatList
            data={planData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
              let selecttextbg = 'black';
              let selectsubtextbg = '#666';
              // let selecttextbg = selectItem?.id === item?.id ? 'white' : 'black';
              // let selectsubtextbg = selectItem?.id === item?.id ? 'white' : '#666';

              let selectbg =
                selectItem?.plan_id === item?.plan_id ? '#008B89' : 'white';
              let selectTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              let selectSubTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              return (
                <TouchableOpacity
                  onPress={() => {
                    selectPlanItem(item, index);
                  }}
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: Color.lightgrey,
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor:
                      item?.plan_id == 1 ? Color.lightgrey : selectbg,
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
            }}
            showsVerticalScrollIndicator={false}
          />
          <Button
            title={'Purchase'}
            onPress={() => paymentDetails()}
            titleStyle={{
              fontSize: 16,
              fontFamily: Poppins.SemiBold,
              color: Color.white,
            }}
            // disabled={selectPlan?.length == 0}
            disabled={true}
            buttonStyle={{
              marginVertical: 20,
              backgroundColor: Color.primary,
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PlanPurchase;
