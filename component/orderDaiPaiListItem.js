import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, DeviceEventEmitter, Image, View, Alert } from 'react-native';
import httpapi from '../tools/api';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class orderDaiPaiListItem extends Component {

    render() {
        const { data, onPress, navigator } = this.props

        let type = '';
        if (data.ordertype == 0) {
            type = "安装";
        }
        else if (data.ordertype == 3) {
            type = "临修";
        }
        else if (data.ordertype == 1) {
            type = "维修";
        } else {
            type = "送货";
        }

        if (data.orderlevel == 1) {
            type = '【加急】' + type;
        }


        let status = (data.orderstatus == 0 && "未派单" || data.orderstatus == 1 && "已派单" || data.orderstatus == 2 && "已取消"
            || data.orderstatus == 3 && "已接单" || data.orderstatus == 4 && "已到达（处理中）" || data.orderstatus == 5 && "已完成"
            || data.orderstatus == 6 && "未解决" || data.orderstatus == 7 && "送修中");


        return (
            <TouchableOpacity onPress={onPress} >
                <View style={styles.containerStyle} >
                    <Text style={[styles.textStyle, { alignSelf: 'center' }]}>{type}</Text>
                    <View style={{ marginHorizontal: 10, marginVertical: 5, height: 1, backgroundColor: 'lightgray' }}></View>

                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>设备编码:</Text>
                        <Text style={[styles.textStyle]}>{data.facilitycode}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>客户名称:</Text>
                        <Text style={[styles.textStyle]}>{data.name}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>客户地址:</Text>
                        <Text style={[styles.textStyle]}>{data.address}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>科室门牌:</Text>
                        <Text style={[styles.textStyle]}>{data.doorplate}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>联系电话:</Text>
                        <Text style={[styles.textStyle]}>{data.phone}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>工单说明:</Text>
                        <Text style={[styles.textStyle]}>{data.cause}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>接单时间:</Text>
                        <Text style={[styles.textStyle]}>{data.ordertime}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>工单状态:</Text>
                        <Text style={[styles.textStyle, { color: '#436EEE', fontSize: 20 }]}>{status}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button type="outline" title="进入工单" onPress={() =>
                            navigator.navigate("OrderDeliveryDetail", { id: data.id })
                        }></Button>
                        <Button type="outline" title="转抢派" onPress={() => {
                            Alert.alert(
                                '提示',
                                '确定转为抢派？',
                                [
                                    { text: '取消', },
                                    {
                                        text: '确定', onPress: () => {
                                            httpapi.ordePaiToQiang(data.id).then(data => {
                                                DeviceEventEmitter.emit('paiToQiangUpdate', "jianting"); //发监听

                                            });
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }

                        }></Button>
                        <Button type="outline" title="派技术员" onPress={() =>
                            navigator.navigate("OrderTransfer", { id: data.id })
                        }></Button>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    componentWillReceiveProps(pro) {
        let a = pro
    }
    pushOneDetails = () => {
        this.props.navigatorPush.navigate("Main");
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        flex: 1,
        marginHorizontal: 6,
        marginVertical: 5,
        //   justifyContent: 'center',
        //    alignItems: 'center',
        borderRadius: 9
    },
    textStyle: {
        fontSize: 18,
        color: 'black'
        //   justifyContent: 'center',
        //    alignItems: 'center',
        //  borderRadius: 8
    },
    header: {
        //   height: 60,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 40,
        alignItems: 'center',
        flexDirection: 'row',
    }
})