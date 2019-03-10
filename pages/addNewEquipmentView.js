

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView, StyleSheet, Text, TextInput, Image, View, Alert, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "id": 33, "clientId": 12, "clientName": "",
        "clientAddr": "", "facilitycode": "", "assetnumber": "", "classift": "", "brand": "",
        "model": "", "purchase": "2018/11/6 0:00:00", "upkeep": 0, "tag": 0, "userid": 18, "doorplate": ""
    }]
};
type Props = {};
export default class addNewEquipmentView extends Component<Props> {

    static navigationOptions = {
        title: '添加新设备',
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
            clientName: '',
            classift: '', //分类
            brand: '',
            model: '',
            doorplate: '', //科室门牌
            assetnumber: '', //资产编号
            purchase: '', //采购时间
            remark: '',
        };
        const { navigation } = this.props;
        const data = navigation.getParam('data', 1);
        const queary = this._quearyParam(data.data);
        this.code = queary.code;
        this.clientid = queary.clientid;
    }
    _quearyParam(url) {
        var result = {};
        var query = url.split("?")[1];
        var queryArr = query.split("&");
        queryArr.map((item) => {
            var key = item.split("=")[0];
            var value = item.split("=")[1];
            result[key] = value;
        });
        return result;
    }
    componentDidMount() {
        httpApi.getEquipmentDetailsByCode(this.code).then((data) => {
            this.setState({
                clientName: data.Table[0].clientName, classift: data.Table[0].classift,
                brand: data.Table[0].brand, model: data.Table[0].model, doorplate: data.Table[0].doorplate,
                assetnumber: data.Table[0].assetnumber, purchase: data.Table[0].purchase
            });
        });
    }
    _onPressButton() {
        httpApi.addEquipment(this.code, this.state.data.Table[0].clientId,
            this.state.classift, this.state.brand, this.state.model, this.state.doorplate,
            this.state.purchase, this.state.assetnumber, this.state.remark)
            .then((data) => {
                let code = data.Table[0].Column1;
                if (code == 1000) {
                    //  this.props.navigation.pop(2);
                    Alert.alert(
                        '添加成功',
                        '' + data.Table[0].Column,
                        [
                            { text: '确定', onPress: () => this.props.navigation.pop(2) },
                            // {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            // {text: '其他', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    );
                }
                else
                    Alert.alert('错误', JSON.stringify(data.Table[0].Column2));
            });
        //   this.props.navigation.navigate('UserLogin');
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.textRowContainer, { marginHorizontal: 10, flexDirection: 'row', justifyContent: 'flex-start' }]}>
                        <Text style={[styles.textStyle]}>设备编码:</Text>
                        <Text style={[styles.textStyle, { marginLeft: 3 }]}>{this.state.data.Table[0].facilitycode}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 5, height: 1, backgroundColor: 'lightgray' }}></View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>客户名称:</Text>
                        <TextInput style={[styles.textInputStyle,]} value={this.state.clientName} onChangeText={(value) => this.setState({ clientName: value })}></TextInput>

                        {/* <Text style={[styles.textStyle]}>{this.state.data.Table[0].clientName}</Text> */}
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>客户地址:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].clientAddr}</Text>
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>设备分类:</Text>
                        <TextInput style={[styles.textInputStyle,]} value={this.state.classift} onChangeText={(value) => this.setState({ classift: value })}></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>品       牌:</Text>
                        <TextInput style={[styles.textInputStyle,]} value={this.state.brand} onChangeText={(value) => this.setState({ brand: value })}></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>型       号:</Text>
                        <TextInput style={[styles.textInputStyle,]} value={this.state.model} onChangeText={(value) => this.setState({ model: value })}></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>科室门牌:</Text>
                        <TextInput style={[styles.textInputStyle,]} value={this.state.doorplate} onChangeText={(value) => this.setState({ doorplate: value })}></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>资产编号:</Text>
                        <TextInput style={[styles.textInputStyle,]} value={this.state.assetnumber}
                            placeholder={"选填"} onChangeText={(value) => this.setState({ assetnumber: value })}></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>采购时间:</Text>
                        {/* <Text style={[styles.textStyle]}>{this.state.data.Table[0].parentsNumber10 < 0 ? "超出" + Math.abs(this.state.data.Table[0].parentsNumber10) + "天" : this.state.data.Table[0].parentsNumber10 + "天"}</Text> */}
                        {/* <TextInput style={[styles.textInputStyle,]} value={this.state.purchase}
                            placeholder={"选填"} onChangeText={(value) => this.setState({ purchase: value })}></TextInput> */}
                        <TouchableOpacity>
                            <DatePicker
                                style={{ width: 220 }}
                                date={this.state.purchase}
                                mode='date'
                                placeholder='请选择时间'
                                minDate="2010-01-01"
                                maxDate="2050-01-01"
                                format='YYYY-MM-DD'      //这里定义时间的样式
                                // format='YYYY-MM-DD HH:mm'      //⚠️⚠️⚠️如果想使用24小时的时间制度这里的hh要使用大写的HH....哈哈哈
                                confirmBtnText='确定'
                                cancelBtnText='取消'
                                customStyles={{//
                                    dateIcon: { //设置图标的位置
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 10
                                    },
                                    dateInput: {
                                        fontSize: 16,
                                        marginLeft: 5,
                                        borderRadius: 5,
                                        borderWidth: 1 //设置日期选择器的样式，这里可以去掉边框，这样看起来是不是更漂亮呢😊😯
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ purchase: date }); }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>备       注:</Text>
                        <TextInput style={[styles.textInputStyle,]} value={this.state.remark} placeholder={"选填"}
                            onChangeText={(value) => this.setState({ remark: value })}></TextInput>
                    </View>
                    <View style={{ marginHorizontal: 15, marginVertical: 38 }}>
                        <Button title='添加' onPress={this._onPressButton.bind(this)}></Button>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: '#E4E4E4',
    },
    textRowContainer: {
        marginLeft: 15,
        marginTop: 10,
        marginHorizontal: 10,
    },
    textStyle: {
        fontSize: 16,
        color: 'black'
        //   justifyContent: 'center',
        //    alignItems: 'center',
        //  borderRadius: 8
    },
    textInputStyle: {
        backgroundColor: 'white',
        flex: 1,
        fontSize: 16,
        // height: 40,
        // marginBottom: 2,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'left',
        // paddingLeft: 15,
        borderRadius: 6,
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
    }
});
//输出一个类
module.exports = addNewEquipmentView;