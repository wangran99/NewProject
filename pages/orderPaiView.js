

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, View, Alert, DeviceEventEmitter } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'
import OrderItem from '../component/orderItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var orderPaiListTest = {
    "Table": [],
    "Table1": [{ "counts": 3, "pagecounts": 1 }]
}

type Props = {};
export default class orderPaiView extends Component<Props> {

    static navigationOptions = {
        title: '新工单',
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
            orderPaiList: orderPaiListTest,
            isRefreshing: false,
        }
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

    componentDidMount() {
        this.getOrderPaiList();
        //收到监听
        this.updateOderPaiListlistener = DeviceEventEmitter.addListener('orderPaiList', (e) => {
            this.getOrderPaiList();
        });
    }

    componentWillUnmount() {
        // 移除监听 
        this.updateOderPaiListlistener.remove();
    }
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('code', 'NO-ID');
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                {/* <SearchBar placeholder="OrderView" showCancelButton /> */}
                {this.state.orderPaiList.Table && this.state.orderPaiList.Table.length !== 0 ?
                    <View alignItems='center'>
                        <Text style={{ margin: 2, fontSize: 20 }} alignSelf='center'>出门请核对物料</Text>
                    </View> : null
                }
                <FlatList
                    style={{ marginTop: 0 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.getOrderPaiList.bind(this)}
                    // onEndReached={this.fetchMoreAnnouncement.bind(this)}
                    // onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this.getOrderPaiList()}
                                activeOpacity={0.3}>
                                <View style={{ flex: 1, height: 350, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                    {/* <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View> */}
                                    <Image style={{
                                        width: 80,
                                        height: 80,
                                    }} source={require('../img/refresh.jpg')}></Image>
                                    <Text style={{ marginTop: 20, fontSize: 20 }}>请点击或下拉刷新</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            this.state.orderPaiList.Table && this.state.orderPaiList.Table.length !== 0 ?
                                <View style={{ marginTop: 25, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.orderPaiList.Table}
                    renderItem={({ item }) => <OrderItem data={item} style={{ margin: 22 }}
                        onPress={() => {
                            let a = 0;
                            let b = item;
                            this.props.navigation.navigate('OrderDetail', { id: item.id });
                        }} />}
                    removeClippedSubviews={true}
                />
            </View>);
    }

    getOrderPaiList() {
        httpApi.getOrderPai().then((data) => {
            this.setState({
                orderPaiList: data
            });
        });
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
module.exports = orderPaiView;