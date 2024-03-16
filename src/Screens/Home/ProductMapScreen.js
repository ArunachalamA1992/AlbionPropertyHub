import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import FeIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../Config/Color';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ProductMapScreen = ({navigation, route}) => {
  const [latitude, setLatitude] = useState(route.params.latitude);
  const [longitude, setLongitude] = useState(route.params.longitude);
  const mapRef = useRef();
  const markerRef = useRef();
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}>
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
        />
      </MapView>
    </View>
  );
};

export default ProductMapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
