import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import { Button, TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class danJuListItem extends Component {

    render() {
        const { data, onPress } = this.props
        let status = '';
        if (data.documentstatus == -1)
            status = "未生成";
        else if (data.documentstatus == 0)
            status = "未移交";
        else if (data.documentstatus == 1)
            status = "等待后台确认";
        else if (data.documentstatus == 2)
            status = "已移交";



        let type = '';
        if (data.class == 1) {
            if (data.ordertype == 0)
                type = "安装";
            else if (data.ordertype == 1)
                type = "维修";
            else if (data.ordertype == 2)
                type = "送货";
        } else
            type = "保养抄表";

        return (

            <View style={styles.containerStyle}>
                <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>客户名称:</Text>
                    <Text style={[styles.textStyle]}
                        numberOfLines={1}>
                        {data.name}
                    </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10, height: 1, backgroundColor: 'lightgray' }}></View>

                <View style={{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>编      号:</Text>
                    <Text style={[styles.textStyle]}>{data.tid}</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>工单种类:</Text>
                    <Text style={[styles.textStyle]}>{type}</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>开单金额:</Text>
                    <Text style={[styles.textStyle]}>{data.price}</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>时      间:</Text>
                    <Text style={[styles.textStyle]}>{data.documenttime}</Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', }}>
                    <Text style={[styles.textStyle]}>状      态:</Text>
                    <Text style={[styles.textStyle]}>{status}</Text>

                </View>
                {data.documentstatus == 0 ?
                    <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                        <Button style={{
                            marginVertical: 10,
                            backgroundColor: 'blue',
                        }} title='移交' onPress={onPress}></Button>
                    </View> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        flex: 1,
        marginHorizontal: 6,
        marginVertical: 10,
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