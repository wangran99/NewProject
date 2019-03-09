

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Keyboard, StyleSheet, Text, TouchableOpacity, FlatList, Image, View, Alert } from 'react-native';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';
import local from '../tools/storage'
import httpApi from '../tools/api'

import RentListItem from '../component/rentListItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var rentListTest = {
    "Table": [],
    "Table1": [{ "counts": 1, "pagecounts": 1 }]
};

type Props = {};
export default class rentListView extends Component<Props> {

    static navigationOptions = {
        title: '租机抄表',
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
            keys: '',
            isRefreshing: false,
            rentList: rentListTest,
        };
    }

    _getRentList() {
        httpApi.getRentList(100, this.state.keys).then((data) => {
            this.setState({ rentList: data });
            let a =[];
            a.push("abc");
            a.push("123");
        });
    }

    componentDidMount() {
        this._getRentList(100, '');
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
                <TouchableOpacity backgroundColor='red' activeOpacity={1.0} >
                    <SearchBar placeholder="请输入客户或设备编码"
                        ref="searchBar"
                        // inputRef={(searinput) => this.searinput = searinput}
                        onChange={(value) => {
                            this.setState({ keys: value });
                        }}
                        value={this.state.keys}
                        onCancel={() => { this.setState({ keys: '' }); Keyboard.dismiss; }}
                        onSubmit={this._getRentList.bind(this, 100, this.state.keys)}
                    >
                    </SearchBar>
                </TouchableOpacity>
                <FlatList
                    style={{ flex: 1, marginTop: 2 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._getRentList.bind(this)}
                    // onEndReached={this.isRefreshing.bind(this)}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this._getRentList()}
                                activeOpacity={0.3}>
                                <View style={{ flex: 1, height: height-65, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 1, marginBottom: 20 }}>
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
                            this.state.rentList.Table && this.state.rentList.Table.length !== 0 ?
                                <View style={{ marginTop: 25, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.rentList.Table}
                    renderItem={({ item }) => <RentListItem data={item} style={{ margin: 22 }}
                        onPress={() => {
                            let a =1;
                            this.props.navigation.navigate('RentDetail', { id: item.id });
                        }} />}
                    removeClippedSubviews={true}
                />

            </View >

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
module.exports = rentListView;