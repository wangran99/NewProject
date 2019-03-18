

import React, { Component } from 'react';
import { Button, CheckBox } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';
import { Carousel, TextareaItem, SearchBar, } from '@ant-design/react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "sl": 1, "facilitycode": "00000", "equipmentid": 24, "classift": "",
        "brand": " ", "model": " ", "clientid": 11, "name": " ", "address": " "
    }],
    "Table1": [{ "id": 187, "issuetime": "2019/3/7 15:19:14", "phone": "121212366", "describe": "但是", "ordertype": 1 }],
    "Table2": [{ "Column1": 1 }]
};
type Props = {};
export default class orderInstallReplenishView extends Component<Props> {

    static navigationOptions = {
        title: '安装补充工单',
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
        this.orderId = navigation.getParam('id', '');
        // const queary = this._quearyParam(data.data);
        // this.code = queary.code;
        // this.clientid = queary.clientid;
    }

    _onPressButton() {
        let dt = this.state.data.Table[0];
        httpApi.orderReplenish(this.orderId, dt.facilitycode, dt.ordertype, this.state.describe,
            this.state.phone, this.state.amount)
            .then((data) => {
                // console.warn("repair:" + JSON.stringify(data));
                let code = data.Table[0].Column1;
                if (code == 1000) {
                    Alert.alert(
                        '成功',
                        data.Table[0].Column2,
                        [
                            {
                                text: '确定', onPress: () => {
                                    this.props.navigation.pop(2);
                                }
                            },
                            // {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            // {text: '其他', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    );
                }
                else
                    Alert.alert('错误', JSON.stringify(data.Table[0].Column2));
            });
    }

    componentDidMount() {
        httpApi.getOrderDetails(this.orderId).then(data => {
            let dt = data.Table[0];
            // console.warn("delivery:" + JSON.stringify(data));
            this.setState({
                data: data, describe: dt.describe, amount: "" + dt.orderamount,
                phone: "" + dt.phone,
            })
        });
    }

    render() {
        let dt = this.state.data.Table[0];
        let type = '';
        if (dt.ordertype == 0) {
            type = "安装";
        }
        else if (dt.ordertype == 3) {
            type = "临修";
        }
        else if (dt.ordertype == 1) {
            type = "维修";
        } else {
            type = "送货";
        }
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.container}>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>设备编码：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].facilitycode}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>工单种类：</Text>
                        <Text style={styles.textStyle}>{type}</Text>
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
                        <Text style={styles.textStyle}>品       牌：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].brand}</Text>
                    </View>

                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>型       号：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].model}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>接单时间：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].ordertime}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginVertical: 1, flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>问题描述：</Text>
                    </View>
                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写完成说明'} rows={4} value={this.state.describe} onChange={(describe) => this.setState({ describe })} ></TextareaItem >


                    <View style={[styles.textRowStyle, { marginVertical: 5, marginTop: 10, flexDirection: 'row', alignItems: 'center', }]}>
                        <Text style={styles.textStyle}>手 机 号 ：</Text>
                        <TextInput style={[styles.textStyle, { marginLeft: 5, flex: 1, backgroundColor: 'white', borderRadius: 6 }]} value={this.state.phone}
                            value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowStyle, { marginVertical: 5, flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>开单金额：</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]} value={this.state.amount}
                            value={this.state.amount} onChangeText={(amount) => this.setState({ amount })} keyboardType='numeric'></TextInput>
                    </View>

                    <View style={{ marginTop: 20, marginBottom: 40, marginHorizontal: 10 }} >
                        <Button style={{ width: width * 0.85, }} title='保存' onPress={this._onPressButton.bind(this)}></Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
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
        flexDirection: 'row'
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
module.exports = orderInstallReplenishView;