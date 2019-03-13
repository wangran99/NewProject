import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';
import { TextareaItem, Picker, PickerView } from '@ant-design/react-native';
import { Dropdown } from 'react-native-material-dropdown';

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var data = [
    {
        label: '2013',
        value: '2013',
    },
    {
        label: '2014',
        value: '2014',
    },
    {
        label: '2016',
        value: '2016',
    },
];
var data1 = ["私密", "公开"];


type Props = {};
export default class addMemoView extends Component<Props> {


    static navigationOptions = {
        title: '添加备忘录',
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
            headline: '',
            details: '',
            remark: '',
        };
        this.status = 0;
        this.pub = 1;
    }
    _onPressButton() {
        httpApi.addMemo(this.state.headline, this.state.details, this.status,
            this.state.remark, this.pub).then(data => {
                let a = data.Table[0].Column1;
                if (a == 1000) {
                    Alert.alert(
                        '成功',
                        data.Table[0].Column2,
                        [
                            { text: '确定', onPress: () => this.props.navigation.pop() },
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
        const { navigation } = this.props;
        const itemId = navigation.getParam('code', 'NO-ID');
        return (
            <ScrollView style={{ backgroundColor: 'lightgray' }}>
                <View style={styles.container}>
                    <TextInput style={[styles.textStyle, {marginTop:10, marginHorizontal: 10, width: width * 0.9, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写标题'} onChangeText={(value) => this.setState({ headline: value })} ></TextInput>

                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, width: width * 0.9, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写备忘录信息'} rows={5} autoHeight onChange={(value) => this.setState({ details: value })} ></TextareaItem >

                    <View style={{ width: width * 0.9 }}>
                        <Dropdown
                            style={{}}
                            label=' 请选择状态'
                            value={"未完成"}
                            // value={this.state.selectedClientName}
                            data={[{ value: '未完成', id: 0 }, { value: '已完成', id: 1 }]}
                            onChangeText={(value, index, data) => {
                                this.status = index;
                            }} />
                    </View>

                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, width: width * 0.9, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写完成说明'} autoHeight rows={5} onChange={(value) => this.setState({ remark: value })} ></TextareaItem >


                    <View style={{ width: width * 0.9 }}>
                        <Dropdown
                            style={{}}
                            label='请选择公开状态'
                            value={"公开"}
                            // value={this.state.selectedClientName}
                            data={[{ value: '公开', id: 1 }, { value: '私密', id: 0 }]}
                            onChangeText={(value, index, data) => {
                                this.pub = data[index].id;
                            }} />
                    </View>
                    <View style={{ alignSelf: 'center', marginVertical: 35, width: width * 0.9 }}>
                        <Button style={{ color: 'white' }} title="确认提交" onPress={this._onPressButton.bind(this)} />
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
module.exports = addMemoView;