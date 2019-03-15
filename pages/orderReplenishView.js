

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "sl": 1, "facilitycode": "8000078", "equipmentid": 24, "classift": "电脑",
        "brand": "联想", "model": "4650", "clientid": 11, "name": "杭州共基网络科技有限公司", "address": "江干区"
    }],
    "Table1": [{ "id": 187, "issuetime": "2019/3/7 15:19:14", "phone": "121212366", "describe": "但是", "ordertype": 1 }],
    "Table2": [{ "Column1": 1 }]
};
type Props = {};
export default class orderReplenishView extends Component<Props> {

    static navigationOptions = {
        title: '补充工单',
        /* No more header config here! */
    };
    // static code = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    constructor(props) {
        super(props);
        this.state = {
            data: dataTest,
            describe: '',
            phone: '',
            amount: '',
        };
        const { navigation } = this.props;
        const data = navigation.getParam('data', 1);
        const queary = this._quearyParam(data.data);
        this.code = queary.code;
        this.clientid = queary.clientid;
    }
    _quearyParam(url) {
        var result = {};
        var query = url.split("?")[1];
        var queryArr = query.split("&");
        queryArr.map((item) => {
            var key = item.split("=")[0];
            var value = item.split("=")[1];
            result[key] = value;
        });
        return result;
    }
    _onPressButton() {
        httpApi.orderReplenish('yhj', '123456')
            .then((response) => {
                let code = response.data['data0'];
                if (code == 1000) {
                    let cookie = response.headers["Cookie"];
                    local.set("cookie", cookie);
                    this.props.navigation.navigate('Main');
                }
                else
                    Alert.alert('错误', JSON.stringify(data));
            });
        //   this.props.navigation.navigate('UserLogin');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                    <Text style={styles.textStyle}>设备编号：</Text>
                    <Text style={styles.textStyle}>{this.state.data.Table[0].facilitycode}</Text>
                </View>
                <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                    <Text style={styles.textStyle}>工单种类：</Text>
                    <Text style={styles.textStyle}>{this.state.data.Table[0].orderlevel == 1 ? "加急" : "普通"}</Text>
                </View>
                <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                    <Text style={styles.textStyle}>客户名称：</Text>
                    <Text style={styles.textStyle}>{this.state.data.Table[0].name}</Text>
                </View>
                <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                    <Text style={styles.textStyle}>客户地址：</Text>
                    <Text style={styles.textStyle}>{this.state.data.Table[0].address}</Text>
                </View>
                <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                    <Text style={styles.textStyle}>设备分类：</Text>
                    <Text style={styles.textStyle}>{this.state.data.Table[0].classift}</Text>
                </View>

                <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                    <Text style={styles.textStyle}>品      牌：</Text>
                    <Text style={styles.textStyle}>{this.state.data.Table[0].brand}</Text>
                </View>
                <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                    <Text style={styles.textStyle}>型      号：</Text>
                    <Text style={styles.textStyle}>{this.state.data.Table[0].model}</Text>
                </View>
                <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                    <Text style={styles.textStyle}>接单时间：</Text>
                    <Text style={styles.textStyle}>{this.state.data.Table1[0].issuetime}</Text>
                </View>
                <View style={[styles.textRowStyle, { marginVertical: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={styles.textStyle}>问题描述：</Text>
                    <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]} value={this.state.describe}
                        onChangeText={(describe) => this.setState({ describe })}></TextInput>
                </View>

                <View style={[styles.textRowStyle, { marginVertical: 1, flexDirection: 'row', alignItems: 'center', }]}>
                    <Text style={styles.textStyle}>联系电话：</Text>
                    <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]} value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone })} keyboardType='numeric'></TextInput>
                </View>
                <View style={[styles.textRowStyle, { marginVertical: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={styles.textStyle}>开单金额：</Text>
                    <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]} value={this.state.amount}
                        onChangeText={(amount) => this.setState({ amount })} keyboardType='numeric'></TextInput>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }} >
                    <Button style={{ width: width * 0.85, }} title='保存' onPress={this._onPressButton.bind(this)}></Button>
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
        color: 'black'
    },
    textRowStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
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
module.exports = orderReplenishView;