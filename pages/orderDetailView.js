

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "id": "", "facilitycode": "", "assetnumber": "", "name": "中国电信衢州分公司",
        "address": "衢州西安路45", "doorplate": "", "classift": "", "brand": "", "model": "", "purchase": "", "upkeep": "",
        "contacts": "", "orderid": 170, "ordertime": "2019/3/5 12:10:21", "phone": "33", "describe": "无",
        "orderamount": 0.00, "orderstatus": 0, "ordertype": 1, "cause": "无", "orderlevel": 0
    }]
};
type Props = {};
export default class orderDetailView extends Component<Props> {

    static navigationOptions = {
        title: '接单',
        /* No more header config here! */
    };

    constructor(props) {
        super(props);
        this.state = {
            type: 'type',
            data: dataTest,
        };
        this.orderId = 1;
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', '1');

        httpApi.getOrderDetails(id).then(data => {
            this.orderId = data.Table[0].orderid;
            let type = '';
            if (data.Table[0].ordertype == 0)
                type = "设备安装";
            else if (data.Table[0].ordertype == 1)
                type = "设备维修";
            if (data.Table[0].ordertype == 2)
                type = "送货";
            else if (data.Table[0].ordertype == 3)
                type = "设备临修";
            this.setState({ type, data });
        });
    }

    cancelOrder() {
        httpApi.cancelOrder()
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={{ marginHorizontal: 10, marginTop: 5, marginBottom: 10, borderRadius: 8, backgroundColor: 'white' }}>
                    <View style={{ marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 19, marginHorizontal: 5 }} numberOfLines={2}>
                            {this.state.type}
                        </Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'black' }}></View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>是否加急：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].orderlevel == 1 ? "加急" : "普通"}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>工单编号：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].orderid}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>设备编码：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].facilitycode}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>故障设备：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].classift}</Text>
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
                        <Text style={styles.textStyle}>科室门牌：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].doorplate}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>工单说明：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].cause}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>故障描述：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].describe}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>联 系 人：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].contacts}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>联系电话：</Text>
                        <Text style={styles.textStyle}>{this.state.data.Table[0].phone}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>故障图片：</Text>
                        <Image source={{ uri: ("http://www.glk119.com/UploadFile/images/" + this.state.data.Table[0].img) }} style={{ width: 60, height: 80 }} />
                    </View>
                    <View style={[styles.textRowStyle, { flexDirection: 'row', marginBottom: 10 }]} justifyContent='flex-end'>
                        <View style={{ marginHorizontal: 5 }}>
                            <Button type='outline' title="  返回  " onPress={() => this.props.navigation.navigate("CancelOrder", { orderId: this.state.data.Table[0].orderid })}></Button>
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <Button title="工单转派" onPress={() => { this.props.navigation.navigate("OrderTransfer", { orderId: this.state.data.Table[0].orderid }) }}></Button>
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <Button title="确认工单" onPress={() => {
                                Alert.alert(
                                    '客户名称' + this.state.data.Table[0].name,
                                    '联系电话:' + this.state.data.Table[0].phone,
                                    [
                                        { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        {
                                            text: '确定', onPress: () => {
                                                httpApi.confirmOrder(this.state.data.Table[0].orderid, 11, this.state.data.Table[0].phone)
                                                    .then(data => this.props.navigation.goBack());
                                            }
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }}></Button>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },

    textStyle: {
        fontSize: 18,
    },
    textRowStyle: {
        paddingHorizontal: 5,
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
module.exports = orderDetailView;