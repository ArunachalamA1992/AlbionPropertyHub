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
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { primarycolor } from '../../Utils/Colors';
import Color from '../../Config/Color';
import { Media } from '../../Global/Media';
import fetchData from '../../Config/fetchData';


// create a component
const NotificationList = ({ navigation }) => {
  const [notifyData, setNotifyData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id, user_type_id } = userData;

  function renderNotifyItem(item, index) {
    try {
      return (
        <View
          style={{
            width: '100%',
            padding: 10,
            margin: 5,
            paddingHorizontal: 10,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: Media.albionlogo }}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                marginHorizontal: 10,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {item?.title}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: '#666',
              fontFamily: 'Poppins-Regular',
              lineHeight: 25,
            }}>
            {item?.content}
          </Text>
          <Text
            style={{
              width: '100%',
              textAlign: 'right',
              fontStyle: 'italic',
              fontSize: 14,
              color: '#666',
              fontFamily: 'Poppins-Regular',
              lineHeight: 25,
            }}>
            {/* {new Date().toLocaleString('en-GB', {
              hour12: true,
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })} */}
            {item?.created_at}
          </Text>
        </View>
      );
    } catch (error) {
      console.log('catch in renderNotify_Item :', error);
    }
  }

  const getApiData = async () => {
    try {
      var data = 'user_id=' + user_id;
      const notify = await fetchData.getNotification(data);
      setNotifyData(notify);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: scr_height - 200,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <FlatList
          data={notifyData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => renderNotifyItem(item, index)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
});

//make this component available to the app
export default NotificationList;
