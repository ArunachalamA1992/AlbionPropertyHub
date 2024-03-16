import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  TextInput,
  Keyboard,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
  UIManager,
  TouchableWithoutFeedback,
  LogBox,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { primarycolor } from '../../Utils/Colors';
import Color from '../../Config/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import ExpandableComponent from '../../Utils/ExpandableComponent';
import { Media } from '../../Global/Media';
import common_fn from '../../Config/common_fn';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function EmiCalculation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);

  const [showEmi, setShowEmi] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [intRate, setIntRate] = useState('');

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log("catch in use_effect's EMI's : ", error);
    }
  }, []);

  function calculateEMIClick() {
    try {
      let emi = 0;
      let r = intRate;
      let p = totalAmount;
      let n = loanPeriod;
      if (r === 0 || p === 0 || n === 0) {
        setShowEmi(0);
      } else {
        r = intRate / 12 / 100;
        emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
        setShowEmi(emi.toFixed(2));
      }
    } catch (error) {
      console.log('catch in calculate_EMI : ', error);
    }
  }
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
    <ScrollView
      contentContainerStyle={{ justifyContent: 'center' }}
      keyboardShouldPersistTaps="handled">
      <DismissKeyboard>
        <View style={styles.container}>
          <View
            style={{
              width: scr_width,
              height: scr_height,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginVertical: 20,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    flex: 1.1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      width: '70%',
                      textAlign: 'left',
                      fontSize: 16,
                      color: '#333',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Your Monthly EMI
                  </Text>
                  <Text
                    style={{
                      width: '70%',
                      textAlign: 'left',
                      fontSize: 26,
                      color: 'black',
                      fontFamily: 'Poppins-Bold',
                    }}>
                    ₹ {showEmi}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('HomeLoanService')}
                    style={{
                      backgroundColor: '#239D0F',
                      padding: 12,
                      paddingHorizontal: 30,
                      borderRadius: 10,
                    }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>
                      Check Eligibility
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '90%',
                  height: 0.5,
                  backgroundColor: '#666',
                  marginVertical: 10,
                }}></View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: '#239D0F',
                        borderRadius: 50,
                        marginHorizontal: 5,
                      }}></View>
                    <Text
                      style={{
                        width: '70%',
                        textAlign: 'left',
                        fontSize: 14,
                        color: '#333',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Total Amount
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: '70%',
                      textAlign: 'left',
                      fontSize: 20,
                      color: '#333',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    ₹{totalAmount}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: '#FFA825',
                        borderRadius: 50,
                        marginHorizontal: 5,
                      }}></View>
                    <Text
                      style={{
                        width: '70%',
                        textAlign: 'left',
                        fontSize: 14,
                        color: '#333',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Total Interest
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: '70%',
                      textAlign: 'left',
                      fontSize: 20,
                      color: '#333',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    {intRate}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0,
                alignItems: 'center',
                backgroundColor: 'white',
                marginVertical: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    width: '90%',
                    fontSize: 16,
                    color: '#333',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Total Loan Amount
                </Text>
                <View style={[styles.incomeBoxConatiner, { marginVertical: 10 }]}>
                  <TextInput
                    placeholder="₹ 00,00,000"
                    placeholderTextColor={Color.grey}
                    value={totalAmount}
                    keyboardType="number-pad"
                    maxLength={10}
                    // onChangeText={number => {
                    //     chkNumber(number);
                    // }}
                    onChangeText={val => setTotalAmount(val)}
                    style={styles.numberTextBox}
                  />
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#333',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Loan Period
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#888',
                      paddingHorizontal: 5,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    (Months)
                  </Text>
                </View>
                <View style={[styles.incomeBoxConatiner, { marginVertical: 10 }]}>
                  <TextInput
                    placeholder="00"
                    placeholderTextColor={Color.grey}
                    value={loanPeriod}
                    keyboardType="number-pad"
                    maxLength={2}
                    // onChangeText={number => {
                    //     chkNumber(number);
                    // }}
                    onChangeText={val => setLoanPeriod(val)}
                    style={styles.numberTextBox}
                  />
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    width: '90%',
                    fontSize: 16,
                    color: '#333',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Interest Rate
                </Text>
                <View style={[styles.incomeBoxConatiner, { marginVertical: 10 }]}>
                  <TextInput
                    placeholder="00"
                    placeholderTextColor={Color.grey}
                    value={intRate}
                    keyboardType="number-pad"
                    maxLength={2}
                    // onChangeText={number => {
                    //     chkNumber(number);
                    // }}
                    onChangeText={val => setIntRate(val)}
                    style={styles.numberTextBox}
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 0, alignItems: 'center', marginVertical: 10 }}>
              <TouchableOpacity
                onPress={() => calculateEMIClick()}
                style={{
                  width: '90%',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: primarycolor,
                  borderRadius: 10,
                }}>
                <Text style={{ fontSize: 16, color: 'white' }}>
                  Calculate EMI
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scr_width,
    height: scr_height,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  incomeBoxConatiner: {
    width: '90%',
    borderColor: Color.grey,
    marginVertical: 0,
    borderWidth: 1,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  numberTextBox: {
    width: '100%',
    height: 50,
    color: Color.black,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  invalidLogin: {
    width: '90%',
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
    paddingVertical: 5,
  },
});

export default EmiCalculation;
