

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, DeviceEventEmitter, View, Alert } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

type Props = {};
export default class cancelOrderView extends Component<Props> {

    static navigationOptions = {
        title: '取消原因',
        /* No more header config here! */
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }
    _onPressButton() {
        const { navigation } = this.props;
        const orderId = navigation.getParam('orderId', 1);
        httpApi.cancelOrder(orderId, this.state.value)
            .then((data) => {
                DeviceEventEmitter.emit('orderList',"jianting"); //发监听
                DeviceEventEmitter.emit('orderPaiList',"jianting"); //发监听
                navigation.pop(2); 
              
            });
        //   this.props.navigation.navigate('UserLogin');
    }
    render() {

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 18, marginVertical: 5, marginHorizontal: 5 }}>说明原因</Text>
                <TextInput style={{ height: 140, fontSize: 17, backgroundColor: "white" }}
                    onChangeText={(value) => this.setState({ value })}
                    multiline={true} placeholder={'请输入取消原因'}></TextInput>
                <View style={{ marginHorizontal: 5,marginVertical:10 }}>
                    <Button  title="提交" onPress={this._onPressButton.bind(this)}></Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },
    textStyle: {
        fontSize: 18,
        backgroundColor: 'white'
    },
    iconStyle: {
        width: 80,
        height: 80,
        marginTop: 50,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'orange',
        marginBottom: 30,
    },
    textInputStyle: {
        backgroundColor: 'white',
        width: width * 0.8,
        height: 40,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        paddingLeft: 15,
        borderRadius: 8,
    },
    loginBtnStyle: {
        height: 40,
        width: width * 0.8,
        backgroundColor: 'blue',
        marginTop: 30,
        marginBottom: 30,
        //flex布局
        justifyContent: 'center',
        //   alignItems: 'center',
        borderRadius: 8
    },
    settingStyle: {
        flexDirection: 'row',
        width: width * 0.8,
        justifyContent: 'space-between',
    },
    otherLoginStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 20
    },
    otherImageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
    },
});

//输出一个类
module.exports = cancelOrderView;