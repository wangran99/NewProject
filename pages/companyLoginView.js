

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Button as AButton, Provider, Toast } from '@ant-design/react-native';
//import AButton from '@ant-design/react-native/lib/button';
import { ScrollView, StyleSheet, Text, TextInput, Image, View, Alert, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import qs from 'qs'

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

type Props = {};
export default class companyLoginView extends Component<Props> {
    static navigationOptions = {
        title: '企业登录',
        /* No more header config here! */
    };

    constructor(props) {
        super(props);
        this.state = { code: '66' };
    }

    _onPressButton() {
        //  ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
        // Alert.alert('You tapped the button!');
        // httpApi.getCompanyLoginCookie().then((data) => {
        //     Alert.alert('title123', JSON.stringify(data));
        //     console.warn("response:"+JSON.stringify(data));
        //  });
        //    httpApi.companyLogin({ account: this.state.companyCode, psw: this.state.password })
        httpApi.companyLogin({ username: 'cs', password: '123456' })
            .then((data) => {
                let code = data.code;
                if (code == 1000) {
                    local.set("account", data.account);
                    this.props.navigation.navigate('UserLogin', { account: data.account });
                }
                else
                    Alert.alert('错误', JSON.stringify(data));
            });
        //  
        //  local.set("code", this.state.code);
    }
    render() {
        return (
            <ScrollView style={{backgroundColor:'lightgray'}}>
                <View style={styles.container}>
                    {/*{头像}*/}
                    <Image source={require('../img/company.jpg')} style={styles.iconStyle} />
                    {/*账号和密码*/}
                    <TextInput placeholder={'请输入企业编码'}
                        clearButtonMode="while-editing"//只有在iOS系统有效
                        style={styles.textInputStyle}
                        //    value="cs"
                        onChangeText={(companyCode) => this.setState({ companyCode })}
                    />
                    <TextInput placeholder={'请输入密码'}
                        style={[styles.textInputStyle, { marginTop: 5 }]}
                        clearButtonMode="while-editing"//只有在iOS系统有效
                        //    value="123456"
                        onChangeText={(password) => this.setState({ password })}
                        password={true}
                        secureTextEntry={true}
                    />
                    {/*登录*/}
                    <View style={styles.loginBtnStyle}>
                        <Button style={{ color: 'white' }} title="登录" onPress={this._onPressButton.bind(this)} />
                    </View>
                    {/* <AButton type='primary' size={'large'} style={{ margin: 16 }} >登陆antd</AButton> */}
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
    iconStyle: {
        width: 80,
        height: 80,
        marginTop: 50,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'orange',
        marginBottom: 30,
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
        //  alignItems:'center',
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
module.exports = companyLoginView;