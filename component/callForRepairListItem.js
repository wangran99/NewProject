import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

export default class callForRepairListItem extends Component {

    render() {
        const { data, onPress, navigator } = this.props

        return (
            // <TouchableOpacity disabled>
            <View style={styles.containerStyle} >
                <View style={[styles.rowStyle, { borderRadius: 9, borderColor: 'blue', justifyContent: 'space-between' }]}>
                    <Text style={[styles.textStyle, { fontSize: 19, }]}>服务记录</Text>
                    {data.is_already == 1 ? <Button style={[styles.textStyle, {}]} title='报修中' onPress={onPress}></Button> :
                        <Button style={[styles.textStyle]} title='已确认' type="clear"></Button>}
                </View>
                <View style={[styles.rowStyle, { height: 1, backgroundColor: 'lightgray' }]}></View>
                <View style={styles.rowStyle}>
                    <Text style={[styles.textStyle]}>故障现象:</Text>
                    <Text style={[styles.textStyle]}>{data.phenomena}</Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={[styles.textStyle]}>处理办法:</Text>
                    <Text style={[styles.textStyle]}>{data.handling}</Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={[styles.textStyle]}>具体处理办法:</Text>
                    <Text style={[styles.textStyle]}>{data.jthandling}</Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={[styles.textStyle]}>联系电话:</Text>
                    <Text style={[styles.textStyle]}>{data.phone}</Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={[styles.textStyle]}>保修时间:</Text>
                    <Text style={[styles.textStyle]}>{data.issuetime}</Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={[styles.textStyle]}>完成时间:</Text>
                    <Text style={[styles.textStyle]}>{data.addtime}</Text>
                </View>

            </View>
            // </TouchableOpacity>
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
        borderRadius: 9,
        borderColor: 'red'

    },
    textStyle: {
        fontSize: 18,
        color: 'black'
        //   justifyContent: 'center',
        //    alignItems: 'center',
        //  borderRadius: 8
    },
    rowStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
    }
})