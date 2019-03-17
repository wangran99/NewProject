import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class orderQueryListItem extends Component {

    render() {
        const { data, onPress, navigator } = this.props
        let type = '送货';
        if (data.orderlevel == 1) {
            type = '【加急】送货';
        }

        return (
            <TouchableOpacity onPress={onPress} disabled>
                <View style={styles.containerStyle} >
                    <Text style={[styles.textStyle,{marginTop:10}]}>接单时间：</Text>
                    <Text style={[styles.textStyle]}>客户名称：</Text>
                    <Text style={[styles.textStyle]}>客户地址：</Text>
                    <Text style={[styles.textStyle]}>工单种类：</Text>
                    <Text style={[styles.textStyle]}>设备：</Text>
                    <Text style={[styles.textStyle]}>开单金额：</Text>
                    <Text style={[styles.textStyle]}>积分：</Text>
                    <Text style={[styles.textStyle,{marginBottom:10}]}>积分2：</Text>
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
        marginVertical:3,
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