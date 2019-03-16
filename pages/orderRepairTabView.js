

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, View, Alert } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'

import OrderRepairListItem from '../component/orderRepairListItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var dataTest = {
    "Table": [],
    "Table1": [{ "counts": 14, "pagecounts": 2 }]
}
type Props = {};
export default class orderRepairTabView extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            data: dataTest,
        };
        this.status = this.props.status;
        this.pageIndex = 1;
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
    _getOrderRepairList() {
        httpApi.getOrderRepairList(this.pageIndex, this.status).then(data => {
            if (this.pageIndex == 1)
                this.setState({ data });
            else if (this.pageIndex <= data.Table1[0].pagecounts) {
                let newArry = this.state.data.Table.concat(data.Table);
                this.state.data.Table = newArry;
                let newjson = JSON.parse(JSON.stringify(this.state.data));
                newjson.Table = newArry;
                this.setState({ data: newjson });
            }
            this.pageIndex++;
        });
    }
    _refreshOrderRepairList() {
        this.pageIndex = 1;
        this._getOrderRepairList();
    }
    componentDidMount() {
        this._getOrderRepairList();
    }
    render() {
        const { data, onPress, navig } = this.props;
        let a = 1;
        return (
            <FlatList
                style={{ marginHorizontal: 5, marginVertical: 10, flex: 1, marginTop: 2 }}
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshOrderRepairList.bind(this)}
                onEndReached={this._getOrderRepairList.bind(this)}
                onEndReachedThreshold={0.1}
                initialNumToRender={10}
                ListEmptyComponent={() => {
                    return (

                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => this._refreshOrderRepairList()}
                            activeOpacity={0.3}>
                            <View style={{ flex: 1, height: height - 55, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                                {/* <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View> */}
                                <Image style={{
                                    width: 80,
                                    height: 80,
                                }} source={require('../img/refresh.jpg')}></Image>
                                <Text style={{ marginBottom: 20, fontSize: 20 }}>请点击或下拉刷新</Text>
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
                        this.state.data.Table && this.state.data.Table.length !== 0 ?
                            <View style={{ marginTop: 25, marginBottom: 25 }}>
                                <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                            </View> : null
                    )
                }}
                data={this.state.data.Table}
                renderItem={({ item }) => <OrderRepairListItem data={item} navigator={navig} style={{ marginTop: 5 }}
                    onPress={() => {
                        let a = 1;
                        navig.navigate("OrderRepairDetail", { id: item.id })
                    }} />}
                removeClippedSubviews={true}
            />
        );
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
module.exports = orderRepairTabView;