import React from 'react';
import {Pressable, Modal, View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
// import {LottieCancelled, LottieCheck} from '../../components/Lottie';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {setPayCancelVisible, setPaySuccessVisible} from '../../Redux';
import Color from '../../Config/Color';
import {Poppins} from '../../Global/FontFamily';
import {LottieCancelled, LottieCheck} from '../../Components/Lottie';

const PrimeModal = props => {
  const PaySuccessModal = useSelector(
    state => state.PayReducer.PaySuccessVisible,
  );
  const PayCancelVisible = useSelector(
    state => state.PayReducer.PayCancelVisible,
  );
  const dispatch = useDispatch();
  return (
    <Modal
      transparent={true}
      visible={PaySuccessModal ? PaySuccessModal : PayCancelVisible}
      animationType={'fade'}>
      <Pressable
        onPress={() =>
          PaySuccessModal
            ? dispatch(setPaySuccessVisible(false))
            : dispatch(setPayCancelVisible(false))
        }
        style={styles.OrderModalContainer}>
        <View style={styles.orderView}>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() =>
              PaySuccessModal
                ? dispatch(setPaySuccessVisible(false))
                : dispatch(setPayCancelVisible(false))
            }>
            <MCIcon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity>
          {PaySuccessModal ? <LottieCheck /> : <LottieCancelled />}
          <Text style={styles.orderStatus}>
            {PaySuccessModal ? 'Payment Successfull' : 'Payment Cancelled'}
          </Text>
          <Text style={styles.orderModalMsg}>
            {PaySuccessModal
              ? 'You Have Successfully made an Payment '
              : 'Your Payment has been cancelled, Please try again'}
          </Text>
          {/* <Button
            title={PaySuccessModal ? 'View Order' : 'Try Again'}
            buttonStyle={styles.OrderModalButton}
            containerStyle={{marginVertical: 10}}
            onPress={() =>
              PaySuccessModal
                ? props.navigation.navigate('TabNavig')
                : dispatch(setPayCancelVisible(false))
            }
          /> */}
        </View>
      </Pressable>
    </Modal>
  );
};

export default PrimeModal;

const styles = StyleSheet.create({
  OrderModalContainer: {
    backgroundColor: Color.transparantBlack,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  orderView: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  closeModal: {position: 'absolute', right: 10, top: 10},
  orderStatus: {
    fontSize: 20,
    fontFamily: Poppins.Bold,
    textAlign: 'center',
    color: Color.black,
  },
  orderModalMsg: {
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
    textAlign: 'center',
    marginVertical: 10,
    color: Color.cloudyGrey,
    textTransform: 'capitalize',
  },
  OrderModalButton: {
    backgroundColor: Color.primary,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
