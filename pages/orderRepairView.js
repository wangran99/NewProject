

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';
import { Tabs, Icon, SearchBar, } from '@ant-design/react-native';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

import OrderRepairUnfinishedView from './orderRepairUnfinishedView'
import OrderRepairfinishedView from './orderRepairfinishedView'
import OrderRepairCancanlledView from './orderRepairCancanlledView'
import OrderRepairAllView from './orderRepairAllView'

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

type Props = {};
export default class orderRepairView extends Component<Props> {

    static navigationOptions = {
        title: '维修工单',
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
    _onPressButton() {
        // Alert.alert('You tapped the button!'+local.get("code"));
        // local.get('code').then((code) => {
        //     console.log("get code:"+ code);
        // });
        //    httpApi.personLogin(this.state.userName, this.state.password)
        httpApi.personLogin('yhj', '123456')
            .then((response) => {
                let code = response.data['data0'];
                if (code == 1000) {
                    let cookie = response.headers["Cookie"];
                    local.set("cookie", cookie);
                    this.props.navigation.navigate('Main');
                }
                else
                    Alert.alert('错误', JSON.stringify(data));
            });
        //   this.props.navigation.navigate('UserLogin');
    }
    render() {
        const tabs = [
            { title: '未完成' },
            { title: '已完成' },
            { title: '已取消' },
            { title: '全部工单' },
        ];
        return (
            // <View style={styles.container}>
            //     <Tabs tabs={tabs} animated></Tabs>
            //     <OrderRepairUnfinishedView style={{ height:'100%', backgroundColor: 'red' }}></OrderRepairUnfinishedView>
            //     <OrderRepairUnfinishedView style={{ height:'100%', backgroundColor: 'red' }}></OrderRepairUnfinishedView>
            //     <OrderRepairUnfinishedView style={{ height:'100%', backgroundColor: 'red' }}></OrderRepairUnfinishedView>
            //     <OrderRepairUnfinishedView style={{ height:'100%', backgroundColor: 'red' }}></OrderRepairUnfinishedView>

            // </View>
            <ScrollableTabView style={{ backgroundColor: 'lightgray' }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
            >
                {/* <Text tabLabel='Tab #1'>My</Text>
                <Text tabLabel='Tab #2 word word'>favorite</Text>
                <Text tabLabel='Tab #3 word word word'>project</Text>
                <Text tabLabel='Tab #4 word word word word'>favorite</Text>
                <Text tabLabel='Tab #5'>project</Text> */}
                <OrderRepairUnfinishedView tabLabel='未完成' navig={this.props.navigation}></OrderRepairUnfinishedView>
                <OrderRepairfinishedView tabLabel='已完成'></OrderRepairfinishedView>
                <OrderRepairCancanlledView tabLabel='已取消'></OrderRepairCancanlledView>
                <OrderRepairAllView tabLabel='全部工单'></OrderRepairAllView>
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
module.exports = orderRepairView;