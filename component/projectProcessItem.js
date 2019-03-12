import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import { Progress } from '@ant-design/react-native';
import { Button, TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class projectProcessItem extends Component {

    render() {
        const { data, onPress } = this.props

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.containerStyle} onPress={onPress}>
                    <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>任务内容:</Text>
                        <Text style={[styles.textStyle]} numberOfLines={1}>
                            {data.name}
                        </Text>
                        <View style={{ position: 'absolute',right:5}}>
                            <Text style={[styles.textStyle,{color:'#6495ED'}]}  numberOfLines={1}>
                                {data.schedule < 100 ? "进行中" : "已完成"}
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 10, height: 1, backgroundColor: 'lightgray' }}></View>

                    <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Progress style={{ backgroundColor: 'lightgray' }} percent={data.schedule} />
                        <Text style={{marginHorizontal:4}}>{data.schedule}%</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>项目说明:</Text>
                        <Text style={[styles.textStyle]}>{data._explain}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 15, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Image source={{ uri: ("http://www.glk119.com/UploadFile/images/" + data.img) }} style={{ width: 80, height: 80 }} />
                    </View>

                </View>
            </TouchableOpacity>
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