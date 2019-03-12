import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import { Button, TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class carListItem extends Component {

    render() {
        const { data, onPress } = this.props
        let addDate = data.addtime.split(' ')[0];
        let addMonthAndDay = addDate.split('/')[1] + "/" + addDate.split('/')[2]
        let addYear = addDate.split('/')[0];
        let a = data.Afterkilometre == "" ? "暂无" : (data.Afterkilometre + 'km');
        let b = data.Aftertime == "" ? "暂无" : data.Aftertime.split(" ")[1];

        let backgroundColor = data.status != 0 ? '' : '#25c4ff';
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.containerStyle} onPress={onPress}>
                    <View style={{ alignItems: 'center', marginHorizontal: 3,  }}>
                        <Text style={[styles.nobordertextStyle, { fontSize: 20, }]}>{addMonthAndDay}</Text>
                        <Text style={[styles.nobordertextStyle]}>{addYear}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginHorizontal: 2, flex: 1, flexDirection: 'row' }}>
                            {/* <View style={{}}> */}
                            <Text style={[styles.textStyle, { textAlign: 'center', paddingVertical: 10, flex: 1 }]} numberOfLines={1}>出工前公里数/时间</Text>
                            <Text style={[styles.textStyle, { textAlign: 'center', paddingVertical: 10, flex: 1 }]} numberOfLines={1}>结算公里数/时间</Text>

                            {/* <View style={{ width: 1, backgroundColor: 'lightgray' }} /> */}
                        </View>
                        {/* </View> */}
                        <View style={{ marginHorizontal: 2, flex: 1, flexDirection: 'row' }}>
                            {/* <View style={{ width: 1, backgroundColor: 'lightgray' }} /> */}
                            <Text style={[styles.textStyle, { textAlign: 'center', paddingVertical: 10, flex: 1 }]}>{data.beforekilometre == "" ? "暂无" : (data.beforekilometre + 'km') + '  ' + (data.beforetime == "" ? "暂无" : data.beforetime.split(" ")[1])}</Text>
                            <Text style={[styles.textStyle, { textAlign: 'center', paddingVertical: 10, flex: 1 }]}
                                numberOfLines={1}>
                                {(data.Afterkilometre == "" ? "暂无" : (data.Afterkilometre + 'km')) + '  ' + (data.Aftertime == "" ? "暂无" : data.Aftertime.split(" ")[1])}
                            </Text>
                        </View>
                        <Text style={[styles.textStyle, { marginHorizontal: 2, paddingVertical: 10, color: '#5CACEE', textAlign: 'center' }]}>使用公里数：{data.countkilometre == "" ? "暂无" : (data.countkilometre + 'km')}</Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        flex: 1,
        marginHorizontal: 6,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'lightgray',
        borderWidth: 1,
    },
    textStyle: {
        fontSize: 16,
        color: 'black',
        //   justifyContent: 'center',
        //    alignItems: 'center',
        //  borderRadius: 8
        borderColor: 'lightgray',
        borderWidth: 1,
    },
    nobordertextStyle: {
        fontSize: 16,
        color: 'black',
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