//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Color from '../../Config/Color';
import { Iconviewcomponent } from '../../Components/Icontag';

import { useNavigation } from '@react-navigation/native';
import { Media } from '../../Global/Media';

// create a component
const PropertyServices = () => {

    const navigation = useNavigation();
    const [height, setHeight] = useState(undefined);
    return (
        <ScrollView style={{ flex: 1, height: height, backgroundColor: 'white', }}>
            <View style={styles.container}>

                <View style={{ width: '100%', height: '100%', backgroundColor: 'white', }}>

                    <View style={{ width: '100%', height: '45%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
                        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'FontAwesome5'}
                                iconname={'user-edit'}
                                icon_size={20}
                                icon_color={'black'}
                            /><Text>Property Advice</Text></View>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: Color.cloudyGrey }}></View> */}
                        <TouchableOpacity onPress={() => navigation.navigate("HomeLoanService")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                            <Iconviewcomponent
                                Icontag={'MaterialCommunityIcons'}
                                iconname={'hand-coin-outline'}
                                icon_size={28}
                                icon_color={'black'}
                            />
                            <Text>Home Loans</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.cloudyGrey }}></View>
                    <View style={{ width: '100%', height: '45%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("HomeInterior")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'MaterialCommunityIcons'}
                                iconname={'home-city-outline'}
                                icon_size={26}
                                icon_color={'black'}
                            />
                            <Text>Home Interior</Text>
                        </TouchableOpacity>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: Color.cloudyGrey }}></View>
                        <TouchableOpacity onPress={() => navigation.navigate("PackersMovers")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'MaterialCommunityIcons'}
                                iconname={'truck-fast-outline'}
                                icon_size={30}
                                icon_color={'black'}
                            />
                            <Text>Packers and Movers</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.cloudyGrey }}></View>
                    <View style={{ width: '100%', height: '45%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("FreeRentAgreement")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'book-outline'}
                                icon_size={26}
                                icon_color={'black'}
                            />
                            <Text>Free Rent Agreement</Text>
                        </TouchableOpacity>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: Color.cloudyGrey }}></View>
                        <TouchableOpacity onPress={() => navigation.navigate("LegalServices")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'FontAwesome'}
                                iconname={'legal'}
                                icon_size={28}
                                icon_color={'black'}
                            />
                            <Text>Legal Services</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.cloudyGrey }}></View>
                    <View style={{ width: '100%', height: '45%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("TenantVerification")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'MaterialCommunityIcons'}
                                iconname={'file-document-edit-outline'}
                                icon_size={28}
                                icon_color={'black'}
                            />
                            <Text>Tenant Verification</Text>
                        </TouchableOpacity>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: Color.cloudyGrey }}></View>
                        <TouchableOpacity onPress={() => navigation.navigate("Prop_Valuation")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Iconviewcomponent
                                Icontag={'FontAwesome5'}
                                iconname={'user-edit'}
                                icon_size={20}
                                icon_color={'black'}
                            /> */}
                            <Image
                                source={{ uri: Media.problack }}
                                style={{ width: 30, height: 30, resizeMode: 'contain' }}
                            />
                            <Text>Property Valuation</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.cloudyGrey }}></View>
                    <View style={{ width: '100%', height: '45%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("AdvocateOnCall")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'FontAwesome5'}
                                iconname={'balance-scale'}
                                icon_size={26}
                                icon_color={'black'}
                            />
                            <Text>Advocate on Call</Text>
                        </TouchableOpacity>
                        <View style={{ width: 0.5, height: '100%', backgroundColor: Color.cloudyGrey }}></View>
                        <TouchableOpacity onPress={() => navigation.navigate("Astrology")} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'FontAwesome5'}
                                iconname={'star-of-david'}
                                icon_size={26}
                                icon_color={'black'}
                            />
                            <Text>Property Astrology</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: Color.cloudyGrey }}></View>
                </View>
            </View>

        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default PropertyServices;
