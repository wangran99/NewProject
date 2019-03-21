import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class unfinishedOrderListItem extends Component {

    render() {
        const { data, onPress, navigator } = this.props
        let type = '';
        if (data.ordertype == 0)
            type = "【安装】";
        else if (data.ordertype == 1)
            type = "【维修】";
        if (data.ordertype == 2)
            type = "【送货】";
        else if (data.ordertype == 3)
            type = "【临修】";


        let status = '';
        if (data.orderstatus == 0) {//未派单
            status = "暂未补充";
            buttonGroup.push(a);
            buttonGroup.push(b);
        } else if (data.orderstatus == 1) {//已派单
            status = "暂未补充";
            buttonGroup.push(a);
            buttonGroup.push(b);
        } else if (data.orderstatus == 2) {//已取消
            status = "已取消";
        } else if (data.orderstatus == 3) {//已接单
            status = "未完成";
            buttonGroup.push(a);
            buttonGroup.push(b);
            buttonGroup.push(c);
        } else if (data.orderstatus == 4) {//已到达（处理中）
            status = "未完成";
            buttonGroup.push(a);
        } else if (data.orderstatus == 5) {//已完成
            status = "已完成";
            buttonGroup.push(a);
        } else if (data.orderstatus == 6) {//未解决
            status = "未完成";
            buttonGroup.push(a);
            buttonGroup.push(b);
        } else if (data.orderstatus == 7) {//送修中
            status = "已完成";
            buttonGroup.push(a);
            buttonGroup.push(b);
        }



        return (
            <TouchableOpacity onPress={onPress} disabled>
                <View style={styles.containerStyle} >
                    <Text style={[styles.textStyle, { marginVertical: 5, color: 'black', alignSelf: 'center' }]}>{type}</Text>
                    <View style={{ marginHorizontal: 10, height: 1, backgroundColor: 'lightgray' }}></View>

                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>工单编号:</Text>
                        <Text style={[styles.textStyle]}>{data.ID}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>客户名称:</Text>
                        <Text style={[styles.textStyle]}>{data.clientName}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>设备编码:</Text>
                        <Text style={[styles.textStyle]}>{data.facilitycode}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>分      类:</Text>
                        <Text style={[styles.textStyle]}>{data.classift}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>接单人:</Text>
                        <Text style={[styles.textStyle]}>{data.orderreceiving}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>工单种类:</Text>
                        <Text style={[styles.textStyle]}>{type}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>工单状态:</Text>
                        <Text style={[styles.textStyle, { color: '#436EEE', fontSize: 19 }]}>{data.orderstatus}</Text>
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