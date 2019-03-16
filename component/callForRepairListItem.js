import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class callForRepairListItem extends Component {

    render() {
        const { data, onPress, navigator } = this.props

        return (
            <TouchableOpacity onPress={onPress} disabled>
                <View style={styles.containerStyle} >
                    <Text style={[styles.textStyle, { marginHorizontal: 10, marginVertical: 5 }]}>服务记录:</Text>
                    <View style={[styles.rowStyle, { height: 1, backgroundColor: 'lightgray' }]}></View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.textStyle]}>故障现象:</Text>
                        <Text style={[styles.textStyle]}>{data.id}</Text>
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.textStyle]}>处理办法:</Text>
                        <Text style={[styles.textStyle]}>{data.name}</Text>
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.textStyle]}>具体处理办法:</Text>
                        <Text style={[styles.textStyle]}>{data.address}</Text>
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.textStyle]}>联系电话:</Text>
                        <Text style={[styles.textStyle]}>{data.doorplate}</Text>
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.textStyle]}>保修时间:</Text>
                        <Text style={[styles.textStyle]}>{data.contactNumber}</Text>
                    </View>
                    <View style={styles.rowStyle}>
                        <Text style={[styles.textStyle]}>完成时间:</Text>
                        <Text style={[styles.textStyle]}>{data.cause}</Text>
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
    rowStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
    }
})