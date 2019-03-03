import React, { Component } from 'react';
//import { Button } from 'react-native-elements';
import { List, InputItem, Button, WingBlank, Carousel } from '@ant-design/react-native';
import { ActivityIndicator, StyleSheet, Text, TextInput, StatusBar,Image, View, Alert, AsyncStorage } from 'react-native';

class authLoadingView extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const account = await AsyncStorage.getItem('account');
        const userName = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        const uid = await AsyncStorage.getItem('uid');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if (uid)
            this.props.navigation.navigate('App');
        else
            this.props.navigation.navigate('Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

//输出一个类
module.exports = authLoadingView;