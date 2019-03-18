

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, View, Alert } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'

import OrderDeliveryListItem from '../component/orderDeliveryListItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var dataTest = {
    "Table": [],
    "Table1": [{ "counts": 3, "pagecounts": 1 }]
}
type Props = {};
export default class orderDeliveryTabView extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            data: dataTest,
        };
        this.status = this.props.status;
        this.pageIndex = 1;
    }

    _getOrderDeliveryList() {
        httpApi.getOrderDeliveryList(this.pageIndex, this.status).then(data => {
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
    _refreshOrderDeliveryList() {
        this.pageIndex = 1;
        this._getOrderDeliveryList();
    }
    componentDidMount() {
        this._getOrderDeliveryList();
    }
    render() {
        const { data, onPress, navig } = this.props;
        let a = 1;
        return (
            <FlatList
                style={{ marginHorizontal: 5, marginVertical: 10, flex: 1, marginTop: 2 }}
                refreshing={this.state.isRefreshing}
                onRefresh={this._refreshOrderDeliveryList.bind(this)}
                onEndReached={this._getOrderDeliveryList.bind(this)}
                onEndReachedThreshold={0.1}
                initialNumToRender={10}
                ListEmptyComponent={() => {
                    return (

                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => this._refreshOrderDeliveryList()}
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
                keyExtractor={(item, index) => { return "index"+item.id }}
                renderItem={({ item }) => <OrderDeliveryListItem data={item} navigator={navig} style={{ marginTop: 5 }}
                    onPress={() => {
                        let a = 1;
                        navig.navigate("OrderDeliveryDetail", { id: item.id })
                    }} />}
                removeClippedSubviews={true}
            />
        );
    }
    onParentClick1 = () => {

        this.props.navigation.navigate('Main', { id: item.id });
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
module.exports = orderDeliveryTabView;