import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Color from '../../../Config/Color';
import { LottieCheck } from '../../../Components/Lottie';
import { Media } from '../../../Global/Media';
import { Button } from 'react-native-elements';
import { Poppins } from '../../../Global/FontFamily';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PostCompletedScreen = ({ navigation }) => {
  const routeName = useRoute();
  const [maxRating, setMaxRating] = useState([
    {
      id: 1,
      rating: 1,
      experience: 'poor',
    },
    {
      id: 2,
      rating: 2,
      experience: 'Bad',
    },
    {
      id: 3,
      rating: 3,
      experience: 'Okay',
    },
    {
      id: 4,
      rating: 4,
      experience: 'Average',
    },
    {
      id: 5,
      rating: 5,
      experience: 'Good',
    },
  ]);
  const [defaultRating, setDefaultRating] = useState(0);
  const starImageFilled = Media.star;
  const starImageCorner = Media.starOutline;

  function handleBackButtonClick() {
    if (routeName.name == "postCompleted") {
      navigation.replace('TabNavigator');
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: Color.white, padding: 10 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieCheck />
        <Text
          style={{
            fontSize: 25,
            color: Color.black,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Your Property Posted Successfully
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: Color.cloudyGrey,
            textAlign: 'center',
            marginVertical: 10,
          }}>
          Your property is now on display for eager buyers to discover  – get
          ready for inquiries.
        </Text>
        {/* <View style={styles.customRatingBarStyle}>
          {maxRating.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => setDefaultRating(item.rating)}
                style={{
                  marginHorizontal: 10,
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    item.rating <= defaultRating
                      ? starImageFilled
                      : starImageCorner
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('feedback');
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.primary,
              textAlign: 'center',
              marginVertical: 10,
              textDecorationLine: 'underline',
            }}>
            Feedback
          </Text>
        </TouchableOpacity> */}
        <Button
          title={'Back'}
          titleStyle={{
            fontFamily: Poppins.SemiBold,
            fontSize: 18,
            color: Color.white,
          }}
          buttonStyle={{
            backgroundColor: Color.primary,
            // borderColor: Color.primary,
            // borderWidth: 1,
            marginVertical: 20,
          }}
          containerStyle={{ width: '40%' }}
          onPress={() => {
            navigation.replace('TabNavigator');
          }}
        />
      </View>
    </View>
  );
};

export default PostCompletedScreen;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});
