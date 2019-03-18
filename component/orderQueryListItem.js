import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class orderQueryListItem extends Component {

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
        return (
            <TouchableOpacity onPress={onPress} disabled>
                <View style={styles.containerStyle} >
                    <Text style={[styles.textStyle, { marginTop: 10 }]}>{data.ordertime.split(' ')[0].replace(/\//g, "-")}</Text>
                    <View style={{ height: 1, marginHorizontal: 10, marginTop: 10, backgroundColor: 'lightgray' }}></View>
                    <Text style={[styles.textStyle, { marginTop: 10 }]}>接单时间：{data.ordertime.replace(/\//g, "-")}</Text>
                    <Text style={[styles.textStyle]}>客户名称：{data.name}</Text>
                    <Text style={[styles.textStyle]}>客户地址：{data.address}</Text>
                    <Text style={[styles.textStyle]}>工单种类：{type}</Text>
                    <Text style={[styles.textStyle]}>工单描述：{data.describe}</Text>
                    <Text style={[styles.textStyle]}>开单金额：{data.peice}</Text>
                    <Text style={[styles.textStyle]}>积分：{data.integral}</Text>
                    <Text style={[styles.textStyle, { marginBottom: 10 }]}>积分2：{data.integralex}</Text>
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
        marginVertical: 3,
        //   justifyContent: 'center',
        //    alignItems: 'center',
        borderRadius: 9
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: 10,
        marginVertical: 3,
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