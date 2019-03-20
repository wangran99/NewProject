import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TextareaItem, Icon, PickerView } from '@ant-design/react-native';

import { TouchableHighlight, TextInput, StyleSheet, Text, DeviceEventEmitter, Image, View, Alert } from 'react-native';
import httpApi from '../tools/api';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class addNewOrderView extends Component {

    static navigationOptions = ({ navigation }) => {
        const options = {
            quality: 1,
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };

        return {
            title: '增加新工单',

        };
    };

    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            clientArray: [],
            orderNum: '',
            phone: '',
            cause: '',
            describe: '',
        };
        this.orderreceiving = -1;
        this.ordertype = 0;
        this.orderlevel = 0;
        this.clientid = -1;


    }
    componentDidMount() {
        httpApi.getUserList('').then((data) => {
            var arr = new Array();
            data.Table.map((item) => {
                arr.push({ value: item.username, id: item.id })
            });

            this.setState({ userArray: arr });
        });

        httpApi.getClientList('').then((data) => {
            var arr = new Array();
            data.Table.map((item) => {
                arr.push({ value: item.name, id: item.id })
            });

            this.setState({ clientArray: arr });
        });
    }
    _onPressButton() {
        httpApi.orderAddNull(this.orderreceiving, this.ordertype, this.orderlevel, this.state.orderNum,
            this.clientid, this.state.phone, this.state.cause, this.state.describe).then(data => {
                let a = data.Table[0].Column1;
                if (a == 1000) {
                    Alert.alert(
                        '成功',
                        data.Table[0].Column2,
                        [
                            {
                                text: '确定', onPress: () => {
                                    // DeviceEventEmitter.emit('memoUpdate', "jianting"); //发监听;
                                    this.props.navigation.pop();
                                }
                            },
                            // {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            // {text: '其他', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    );
                } else
                    alert(data.Table[0].Column2);
            });
    }
    render() {
        const { data, onPress, navigator } = this.props
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

                <View style={styles.containerStyle} >
                    <Text style={[styles.textStyle, { marginHorizontal: 10, marginVertical: 10 }]}>指定技术员(接单人)</Text>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Dropdown
                            style={{}}
                            label=' 请选择接单人'
                            // value={"未完成"}
                            // value={this.state.selectedClientName}
                            data={this.state.userArray}
                            onChangeText={(value, index, data) => {
                                this.orderreceiving = data[index].id;
                            }} />
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>工单种类:</Text>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Dropdown
                                style={{}}
                                label=' 请选择工单种类'
                                value={"安装"}
                                // value={this.state.selectedClientName}
                                data={[{ value: '安装', id: 0 }, { value: '维修', id: 1 }, { value: '送货', id: 2 },]}
                                onChangeText={(value, index, data) => {
                                    this.ordertype = data[index].id;
                                }} />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>工单级别:</Text>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Dropdown
                                style={{}}
                                label=' 请选择工单级别'
                                value={"普通"}
                                // value={this.state.selectedClientName}
                                data={[{ value: '普通', id: 0 }, { value: '加急', id: 1 }]}
                                onChangeText={(value, index, data) => {
                                    this.orderlevel = index;
                                }} />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>一次性派单数量:</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]}
                            onChangeText={(orderNum) => this.setState({ orderNum })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>指定客户:</Text>
                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                            <Dropdown
                                style={{}}
                                label=' 请选择客户'
                                // value={""}
                                // value={this.state.selectedClientName}
                                data={this.state.clientArray}
                                onChangeText={(value, index, data) => {
                                    this.clientid = data[index].id;
                                }} />
                        </View>
                    </View>

                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>联系电话:</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]}
                            onChangeText={(phone) => this.setState({ phone })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>工单说明:</Text>
                    </View>
                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, width: width * 0.9, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写工单说明'} rows={4} onChange={(cause) => this.setState({ cause })} ></TextareaItem >

                    <View style={{ marginHorizontal: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>故障描述:</Text>
                    </View>
                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, width: width * 0.9, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写故障信息'} rows={4} onChange={(describe) => this.setState({ describe })} ></TextareaItem >

                    <View style={{ alignSelf: 'center', marginVertical: 35, width: width * 0.9 }}>
                        <Button style={{ color: 'white' }} title="保存" onPress={this._onPressButton.bind(this)} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
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
        backgroundColor: 'lightgray',
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
});

//输出一个类
module.exports = addNewOrderView;