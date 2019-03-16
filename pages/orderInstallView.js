

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';
import { Tabs, Icon, SearchBar, } from '@ant-design/react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

import OrderInstallTabView from './orderInstallTabView'


import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

type Props = {};
export default class orderInstallView extends Component<Props> {

    static navigationOptions = {
        title: '安装工单',
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
            name: '', //搜索关键词
            isRefreshing: false,
            // equipmentList: equipmentListTest,
        };
    }

    render() {
        return (
            <ScrollableTabView style={{ backgroundColor: 'lightgray' }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />} >
                <OrderInstallTabView tabLabel='未完成' navig={this.props.navigation} status={3}></OrderInstallTabView>
                <OrderInstallTabView tabLabel='已完成' navig={this.props.navigation} status={1}></OrderInstallTabView>
                <OrderInstallTabView tabLabel='已取消' navig={this.props.navigation} status={2}></OrderInstallTabView>
                <OrderInstallTabView tabLabel='全部工单' navig={this.props.navigation} status={0}></OrderInstallTabView>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
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
module.exports = orderInstallView;