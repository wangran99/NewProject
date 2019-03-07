

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Modal, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, Image, View, Alert, DeviceEventEmitter } from 'react-native';
import { Provider } from '@ant-design/react-native';
import { Dropdown } from 'react-native-material-dropdown';


import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var dialogWidth = screenWidth - 80;
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
            clientArray: [],
            clientTel: '',
            visible: false,
            selectedClientName: "",
        };
        this.orderId = -1;
        this.clientId = -1;
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', '1');

        httpApi.getOrderDetails(id).then(data => {
            this.orderId = data.Table[0].orderid;
            this.clientId = data.Table[0].clientid;
            let type = '';
            if (data.Table[0].ordertype == 0)
                type = "设备安装";
            else if (data.Table[0].ordertype == 1)
                type = "设备维修";
            if (data.Table[0].ordertype == 2)
                type = "送货";
            else if (data.Table[0].ordertype == 3)
                type = "设备临修";
            this.setState({ type, data, clientTel: data.Table[0].phone, selectedClientName: data.Table[0].name });
            // 获取客户列表
            return httpApi.getClientList('');
        }).then((data) => {
            var arr = new Array();
            data.Table.map((item) => {
                arr.push({ value: item.name, id: item.id })
            });

            this.setState({ clientArray: arr, });
        });
    }

    setModalVisible(visible) {
        this.setState({ visible: visible });
    }
    onClose() {
        this.setState({ visible: false });
    }
    _confirmOrder() {
        this.setModalVisible(false);
        let a = 1;

        httpApi.confirmOrder(this.orderId, this.clientId, this.state.clientTel)
            .then(data => {
                if (data.Table[0].Column1 == 1000) {
                    DeviceEventEmitter.emit('orderList', "jianting"); //发监听
                    DeviceEventEmitter.emit('orderPaiList', "jianting"); //发监听
                    this.props.navigation.goBack();
                }
                else
                    Alert.alert('错误', data.Table[0].Column2);
            });
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
                            <Button type='outline' title="  取消  " onPress={() => this.props.navigation.navigate("CancelOrder", { orderId: this.state.data.Table[0].orderid })}></Button>
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <Button title="工单转派" onPress={() => { this.props.navigation.navigate("OrderTransfer", { orderId: this.state.data.Table[0].orderid }) }}></Button>
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <Button title="确认工单" onPress={() => this.setModalVisible(true)}></Button>
                        </View>
                        <Modal
                            animationType={"slide"}
                            transparent={true}
                            visible={this.state.visible}
                            onRequestClose={() => { this.setModalVisible(false) }}
                        >
                            <TouchableOpacity style={{ flex: 1 }} onPress={this.onClose.bind(this)}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    padding: 40,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                }}>
                                    <View style={{
                                        borderRadius: 12,
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        padding: 20
                                    }}>
                                        <Text style={{ fontSize: 18 }}>确认工单</Text>
                                        <View style={{ width: dialogWidth - 20, }}>
                                            <Dropdown
                                                label=' 客户列表'
                                                value={this.state.selectedClientName}
                                                data={this.state.clientArray}
                                                onChangeText={(value, index, data) => {
                                                    this.clientId = data[index].id;
                                                }}
                                            />
                                        </View>

                                        <TextInput
                                            style={{
                                                width: dialogWidth - 20,
                                                marginTop: 10,
                                            }}
                                            value={this.state.data.Table[0].phone}
                                            value={this.state.clientTel}
                                            onChangeText={(clientTel) => this.setState({ clientTel })}
                                            placeholder="请输入客户电话"
                                            keyboardType="numeric"
                                        />
                                        <View style={{
                                            width: dialogWidth - 20,
                                            borderTopWidth: 1,
                                            borderTopColor: 'lightgray',
                                            alignItems: 'center'
                                        }}>
                                            <View flexDirection='row'>
                                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible)
                                                }}>
                                                    <Text style={{ fontSize: 17, marginTop: 10 }} onPress={() => {
                                                    }}>取消</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                                    onPress={this._confirmOrder.bind(this)}>
                                                    <Text style={{ fontSize: 17, marginTop: 10 }} >确认</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Modal>
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