import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import WebView from 'react-native-webview'
import { linearGradient } from '../../Global/GlobalStyles'

const PayView = ({ route, navigation }) => {
    const [uri] = useState(route.params.uri);
    const handleNavigationStateChange = (response) => {
        var { url } = response;
        if (
            url ==
            'https://albionpropertyhub.com/'
        ) {
            navigation?.removeListener('beforeRemove');
            navigation.replace("TabNavigator")
        }
    };
    return (
        <LinearGradient
            colors={linearGradient.color}
            start={linearGradient.start}
            end={linearGradient.end}
            style={linearGradient.style}>
            <View style={styles.container}>
                <WebView
                    source={{ uri: uri }}
                    onNavigationStateChange={e => handleNavigationStateChange(e)}
                />
            </View>
        </LinearGradient>
    )
}

export default PayView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
    },
});