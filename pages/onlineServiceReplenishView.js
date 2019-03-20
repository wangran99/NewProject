

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, TextInput, Image, View, Alert, TouchableOpacity, PixelRatio, ScrollView } from 'react-native';
import { TextareaItem } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "addtime": "2019/3/7 20:46:03", "username": "", "beforekilometre": 10.00,
        "beforetime": "2019/3/7 20:46:03", "beforeimg": "D884B0C33F8EBBCD40B22256FED1FB17.png",
        "Afterkilometre": "", "Aftertime": "", "Afterimg": "", "countkilometre": "", "status": 1, "state": 0,
        "licence": "浙3231"
    }]
};
type Props = {};
export default class onlineServiceReplenishView extends Component<Props> {

    static navigationOptions = {
        title: '在线补充工单',
        /* No more header config here! */
    };
    // static code = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    constructor(props) {
        super(props);
        this.state = {
            data: dataTest,
            describe: '',
            phone: '',

        };
        this.id = '';
        this.orderamount = '';
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.id = navigation.getParam('id', 1);
        httpApi.getOrderDetails(this.id).then((data) => {
            this.setState({
                data: data, describe: data.Table[0].describe,
                phone: data.Table[0].phone,
            })
        });
    }
    _onPressButton() {

        httpApi.postOrderReplenish(this.id, this.state.data.Table[0].facilitycode, this.state.data.Table[0].ordertype,
            this.state.describe, this.state.phone, this.orderamount)
            .then((data) => {
                let code = data.Table[0].Column1;
                if (code == 1000) {
                    Alert.alert(
                        '成功',
                        '' + data.Table[0].Column2,
                        [
                            { text: '确定', onPress: () => this.props.navigation.pop() },
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
        let dt = this.state.data.Table[0];
        let type = '';
        if (dt.ordertype == 0) {
            type = "安装";
        }
        else if (dt.ordertype == 3) {
            type = "临修";
        }
        else if (dt.ordertype == 1) {
            type = "维修";
        } else {
            type = "送货";
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>设备编号:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].facilitycode}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>工单种类:</Text>
                        <Text style={[styles.textStyle]}>{type}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>客户名称:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].name}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>客户地址:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].address}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>设备分类:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].classift}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>品       牌:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].brand}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>型       号:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].model}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>接单时间:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].ordertime}</Text>
                    </View>

                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>问题描述:</Text>
                    </View>
                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, marginTop: 5, width: width * 0.9, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写问题描述'} value={this.state.describe} rows={4} onChange={(value) => this.setState({ describe: value })} ></TextareaItem >

                    <View style={[styles.textRowContainer, { alignItems: 'center', }]}>
                        <Text style={styles.textStyle}>手 机 号 ：</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, marginLeft: 5, backgroundColor: 'white', borderRadius: 6 }]} value={this.state.phone}
                            value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, { alignItems: 'center', }]}>
                        <Text style={styles.textStyle}>开单金额：</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]}
                            onChangeText={(orderamount) => this.orderamount = orderamount} keyboardType='numeric'></TextInput>
                    </View>

                    <View style={{ alignSelf: 'center', marginVertical: 35, width: width * 0.9 }}>
                        <Button style={{ color: 'white' }} title="保存" onPress={this._onPressButton.bind(this)} />
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
module.exports = onlineServiceReplenishView;