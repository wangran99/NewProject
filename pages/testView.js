

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Button as AButton, Provider, Toast } from '@ant-design/react-native';
//import AButton from '@ant-design/react-native/lib/button';
import { FlatList, StyleSheet, Text, TextInput, Image, View, Alert, } from 'react-native';
 import { WebView } from "react-native-webview";
import { createStackNavigator, createAppContainer } from 'react-navigation';

import local from '../tools/storage'
import httpApi from '../tools/api'
import AnnouncementItem from '../component/announcementItem'
import { ScrollView } from 'react-native-gesture-handler';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var announcementTest = {
    "Table": [{ "rowId": 1, "id": 3, "uid": 18, "headline": "题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目", "details": "内容内同内容内容内容内容内同内容内容内容内容内同内容内容内容内容内同内容内容内容内容内同内容内容内容内容内同内容内容内容内容内同内容内容内容内容内同内容内容内容内容内同内容内容内容", "addtime": "2019/2/27 17:55:58", "type": 0, "status": 1 },
    { "rowId": 2, "id": 2, "uid": 0, "headline": "sss", "details": "<img src=\"http:\/\/ys2.glk119.com\/UploadFile\/image\/20181123\/20181123140047_4137.gif\" alt=\"\" \/>", "addtime": "2018/11/23 14:00:49", "type": 2, "status": 0 },
    { "rowId": 3, "id": 1, "uid": 0, "headline": "aa", "details": "aa", "addtime": "2018/11/22 10:29:12", "type": 0, "status": 1 }],
    "Table1": [{ "counts": 3, "pagecounts": 1 }]
}


type Props = {};
export default class testView extends Component<Props> {
    static navigationOptions = {
        title: 'test view',
        /* No more header config here! */
    };

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            announcement: announcementTest,
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
                <View style={{ flexDirection: 'row', backgroundColor: "green" }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "red" }}>
                        <Text>Title</Text>
                        <Text style={{ marginHorizontal: 33, }}>12345678888888888888888888888888888888888888888888888888888888888888</Text>
                    </View>

                    <Text>题目题目题目</Text>
                    {/* <WebView
                    source={{ uri: 'http://www.baidu.com' }}
                    style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
                /> */}
                </View>
                <WebView
                    source={{ uri: 'http://www.jianshu.com/u/d5b531888b2b' }}
                    style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
                />
            </View>
        );
    }

    _onRefresh = () => {
        httpApi.getAnnouncement(this.searchContent).then((data) => {
            //  let b = JSON.stringify(this.state);
            this.setState({
                announcement: data
            });
            let a = 1;
        });

        this.setState({ isRefreshing: false });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'red',
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
module.exports = testView;