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
  TouchableWithoutFeedback,
  LayoutAnimation,
  LogBox,
  Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { primarycolor } from '../../Utils/Colors';
import Color from '../../Config/Color';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import { Button } from 'react-native-elements';
import fetchData from '../../Config/fetchData';

const cutData = [
  {
    cus_id: '0',
    cus_name: 'Search Issue',
  },
  {
    cus_id: '1',
    cus_name: 'Post Property Issue',
  },
  {
    cus_id: '2',
    cus_name: 'Notification Issue',
  },
  {
    cus_id: '3',
    cus_name: 'Slow Response',
  },
  {
    cus_id: '4',
    cus_name: 'Login Issue',
  },
  {
    cus_id: '5',
    cus_name: 'Others',
  },
];

// create a component
const Feedback = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);
  const [selectItem, setselectItem] = useState('');
  const [notes, setNotes] = useState('');
  const [feebackVisible, setFeebackVisible] = useState(false);

  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, username, profile, user_type_id, mobile_number, email } =
    userData;

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log("catch in use_effect's Free_rental : ", error);
    }
  }, []);

  function renderCusReviewItem(item, index) {
    try {
      return (
        <TouchableOpacity
          onPress={() => selectedItem(item)}
          style={{
            padding: 10,
            marginHorizontal: 10,
            borderRadius: 40,
            backgroundColor:
              selectItem === item.cus_name ? primarycolor : 'white',
            borderColor: '#666',
            borderWidth: 0.5,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: selectItem === item.cus_name ? 'white' : 'black',
              fontFamily: Poppins.Medium,
            }}
            numberOfLines={1}>
            {item.cus_name}
          </Text>
        </TouchableOpacity>
      );
    } catch (error) {
      console.log('catch in renderCus_ReviewItem : ', error);
    }
  }

  function selectedItem(item) {
    try {
      setselectItem(item.cus_name);
    } catch (error) {
      console.log('catch in selected_Item : ', error);
    }
  }

  async function submitFeedback() {
    try {
      var data = {
        form_name: 'feedback',
        payload: {
          mobile_number: mobile_number,
          message: selectItem,
          comments: notes,
        },
        user_id: user_id,
      };
      const homeLoanData = await fetchData.homeLoan_Api(data);
      if (homeLoanData.status) {
        setFeebackVisible(true);
      } else {
        alert('Wait for some time');
        setFeebackVisible(false);
      }
    } catch (error) {
      console.log('catch in submitFeedback : ', error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: 'center' }}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            }}>
            Please share your{' '}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: primarycolor,
              paddingHorizontal: 5,
              fontFamily: Poppins.SemiBold,
            }}>
            Feedback
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.cloudyGrey,
              textAlign: 'justify',
              fontFamily: Poppins.Regular,
            }}>
            At Albion, we thrive on your feedback to enhance your experience.
            Share your thoughts, suggestions, and experiences with us to help us
            fine-tune our functionalities. Your feedback helps our commitment to
            delivering an exceptional user experience. Together, let's create a
            platform that caters perfectly to your needs. Thank you for being an
            integral part of the Albion community!
          </Text>
        </View>

        <View style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
          <FlatList
            data={cutData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => renderCusReviewItem(item, index)}
            numColumns={2}
          />
        </View>
        <View style={{ marginVertical: 10, alignItems: 'center' }}>
          <TextInput
            placeholder="Enter your message here !.."
            multiline={true}
            placeholderTextColor={Color.cloudyGrey}
            textAlignVertical="top"
            style={styles.message_input}
            value={notes}
            onChangeText={text => setNotes(text)}
            returnKeyType={'done'}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => submitFeedback()}
            style={{
              height: 45,
              backgroundColor: primarycolor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.white,
                fontFamily: Poppins.SemiBold,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={feebackVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: Color.transparantBlack,
            justifyContent: 'center',
            padding: 15,
          }}>
          <View
            style={{
              backgroundColor: Color.white,
              padding: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: Color.black,
                fontFamily: Poppins.Bold,
                fontSize: 20,
                textAlign: 'center',
              }}>
              Thank You
            </Text>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: Media.homeloan_ads }}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
              />
            </View>
            <Text
              style={{
                color: Color.cloudyGrey,
                fontFamily: Poppins.Medium,
                fontSize: 14,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              Thanks For giving a valuable feedback...!
            </Text>
            <Button
              title={'Go to Home Page'}
              buttonStyle={{
                backgroundColor: Color.primary,
                borderRadius: 50,
                marginVertical: 5,
              }}
              onPress={() => {
                navigation.replace('TabNavigator');
                setFeebackVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  message_input: {
    width: '95%',
    backgroundColor: '#f3f3f3',
    padding: 10,
    color: 'black',
    borderRadius: 5,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    minHeight: 140,
  },
});

//make this component available to the app
export default Feedback;
