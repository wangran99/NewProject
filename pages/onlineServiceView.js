

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, TextInput, Image, View, Alert, TouchableOpacity, PixelRatio, ScrollView } from 'react-native';
import { TextareaItem } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;


type Props = {};
export default class onlineServiceView extends Component<Props> {

    static navigationOptions = {
        title: '在线召唤客服',
        /* No more header config here! */
    };
    // static code = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const data = navigation.getParam('data', '');
        this.state = {
            data: data,
            phone: '',
            describe: '',
            img: ''
        };
        // console.warn("data:" + JSON.stringify(data));

    }

    _onPressButton() {
        httpApi.postBaoXiu(this.state.data.Table[0].facilitycode, this.state.phone, this.state.describe, '')
            .then((data) => {
                let code = data.Table[0].Column1;
                if (code == 1000) {
                    Alert.alert(
                        '成功',
                        '' + data.Table[0].Column2,
                        [
                            {
                                text: '确定', onPress: () => this.props.navigation.navigate("onlineServiceReplenish", { id: data.Table[0].Column3 })
                            },
                        ],
                        { cancelable: false }
                    )
                }
                else
                    Alert.alert('错误', JSON.stringify(data.Table[0].Column2));
            });
        //   this.props.navigation.navigate('UserLogin');
    }


    render() {
        return (
            <ScrollView style={{ backgroundColor: 'lightgray' }}>
                <View style={styles.container}>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>设备编号:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].facilitycode}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>客户名称:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].name}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>设备分类:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].classift}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>设备品牌:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].brand}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>设备型号:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].model}</Text>
                    </View>

                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>故障现象:</Text>
                    </View>
                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, marginTop: 5, width: width * 0.9, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写故障现象'} rows={4} onChange={(problem) => this.setState({ problem })} ></TextareaItem >

                    <View style={[styles.textRowContainer, { alignItems: 'center', }]}>
                        <Text style={styles.textStyle}>报修电话 ：</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]} value={this.state.phone}
                            onChangeText={(phone) => this.setState({ phone })} keyboardType='numeric'></TextInput>
                    </View>

                    <View style={{ alignSelf: 'center', marginVertical: 35, width: width * 0.9 }}>
                        <Button style={{ color: 'white' }} title="提交" onPress={this._onPressButton.bind(this)} />
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //    alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },
    textRowContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
    },
    textStyle: {
        fontSize: 18,
        color: 'black'
        //   justifyContent: 'center',
        //    alignItems: 'center',
        //  borderRadius: 8
    },
    textInputStyle: {
        backgroundColor: 'white',
        width: width * 0.8,
        height: 40,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        paddingLeft: 15,
        borderRadius: 8,
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        // borderRadius: 50,
        width: 100,
        height: 100
    },
    loginBtnStyle: {
        height: 40,
        width: width * 0.8,
        backgroundColor: 'blue',
        marginTop: 30,
        marginBottom: 30,
        //flex布局
        justifyContent: 'center',
        //   alignItems: 'center',
        borderRadius: 8
    },
    settingStyle: {
        flexDirection: 'row',
        width: width * 0.8,
        justifyContent: 'space-between',
    },
    otherLoginStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 20
    },
    otherImageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
    },
});

//输出一个类
module.exports = onlineServiceView;