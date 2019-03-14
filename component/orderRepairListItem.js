import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class orderRepairListItem extends Component {

    render() {
        const { data, onPress, navigator } = this.props
        let type = '';
        if (data.orderlevel == 1) {
            type = '【加急】';
        }

        if (data.ordertype == 1) {
            type += '设备维修';
        }
        else {
            type += '临时维修';
        }

        let status = '';
        if (data.orderstatus == 0) {//未派单
            status = "未完成";
        } else if (data.orderstatus == 1) {//已派单
            status = "未完成";
        } else if (data.orderstatus == 2) {//已取消
            status = "已取消";
        } else if (data.orderstatus == 3) {//已接单
            status = "未完成";
        } else if (data.orderstatus == 4) {//已到达（处理中）
            status = "未完成";
        } else if (data.orderstatus == 5) {//已完成
            status = "已完成";
        } else if (data.orderstatus == 6) {//未解决
            status = "未完成";
        } else if (data.orderstatus == 7) {//送修中
            status = "已完成";
        }


        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.containerStyle} >
                    <Text style={[styles.textStyle, { marginVertical: 5, alignSelf: 'center' }]}>{type}</Text>
                    <View style={{ marginHorizontal: 10, height: 1, backgroundColor: 'lightgray' }}></View>
                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>工单编号:</Text>
                        <Text style={[styles.textStyle]}>{data.id}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>设备编码:</Text>
                        <Text style={[styles.textStyle]}>{data.facilitycode}</Text>
                    </View>

                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>故障设备:</Text>
                        <Text style={[styles.textStyle]}>{data.classift}</Text>
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
                        <Text style={[styles.textStyle]}>{data.contactNumber}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>工单说明:</Text>
                        <Text style={[styles.textStyle]}>{data.cause}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>接单时间:</Text>
                        <Text style={[styles.textStyle]}>{data.ordertime}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>到达时间:</Text>
                        <Text style={[styles.textStyle]}>{data.arrivaltime == '' ? '暂未到达' : data.arrivaltime}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>工单状态:</Text>
                        <Text style={[styles.textStyle]}>{status}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button type="outline" title="进入工单" onPress={() =>
                            navigator.pop()
                        }></Button>
                        <Button type="outline" title="取消工单"></Button>
                        <Button type="outline" title="备忘录"></Button>
                        <Button type="outline" title="工单转派"></Button>
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