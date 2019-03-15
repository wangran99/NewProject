import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import { Button, TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class orderRepairRecordListItem extends Component {

    render() {
        const { data, onPress } = this.props
    
        return (

            <View style={styles.containerStyle}>
                <View style={{ marginButtom: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>时      间:</Text>
                    <Text style={[styles.textStyle]}>
                        {data.issuetime}
                    </Text>
                </View>
                {/* <View style={{ marginHorizontal: 10, marginVertical: 10, height: 1, backgroundColor: 'lightgray' }}></View> */}

                <View style={{marginVertical:5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>工单编号:</Text>
                    <Text style={[styles.textStyle]}>{data.orderid}</Text>
                </View>
                <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>故障现象:</Text>
                    <Text style={[styles.textStyle]}>{data.phenomena}</Text>
                </View>
                <View style={{ marginVertical: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.textStyle]}>故障处理:</Text>
                    <Text style={[styles.textStyle]}>{data.handling}</Text>
                </View>
                <View style={{ marginVertical: 5, flexDirection: 'row', }}>
                    <Text style={[styles.textStyle]}>具体处理:</Text>
                    <Text style={[styles.textStyle]}>{data.jthandling}</Text>
                </View>
            </View>
        )
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