import React, {useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import Color from '../../../Config/Color';
import {LottieCheck} from '../../../Components/Lottie';
import {Button} from 'react-native-elements';
import {Poppins} from '../../../Global/FontFamily';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';

const PostCompletedScreen = ({}) => {
  const routeName = useRoute();
  const navigation = useNavigation();

  function handleBackButtonClick() {
    if (routeName.name == 'postCompleted') {
      navigation.dispatch(StackActions.replace('TabNavigator'));
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 10}}>
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
        <Button
          title={'Back'}
          titleStyle={{
            fontFamily: Poppins.SemiBold,
            fontSize: 18,
            color: Color.white,
          }}
          buttonStyle={{
            backgroundColor: Color.primary,
            marginVertical: 20,
          }}
          containerStyle={{width: '40%'}}
          onPress={() => {
            navigation.dispatch(StackActions.replace('TabNavigator'));
          }}
        />
      </View>
    </View>
  );
};

export default PostCompletedScreen;
