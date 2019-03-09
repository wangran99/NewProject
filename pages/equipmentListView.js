

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, View, Alert, Keyboard } from 'react-native';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'
import EquipmentListItem from '../component/equipmentListItem'


var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var equipmentListTest = { "Table": [], "Table1": [{ "counts": 0, "pagecounts": 0 }] };
type Props = {};
export default class equipmentListView extends Component<Props> {

    static navigationOptions = {
        title: '设备管理',
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
            equipmentList: equipmentListTest,
        };
        this.page = 1;//默认获取第一页数据
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
        this._getEquipmentList();
    }

    _getEquipmentList() {
        httpApi.getEquipmentList(this.page, this.state.name).then((data) => {
            if (this.page == 1)
                this.setState({ equipmentList: data });
            else if (this.page <= data.Table1[0].pagecounts) {
                let newArry = this.state.equipmentList.Table.concat(data.Table);
                this.state.equipmentList.Table = newArry;
                let newjson = JSON.parse(JSON.stringify(this.state.equipmentList));
                newjson.Table = newArry;
                this.setState({ equipmentList: newjson });
            }
            this.page++;
        });
    }
    _refreshEquipmentList() {
        this.page = 1;
        this._getEquipmentList();
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
                <TouchableOpacity backgroundColor='red' activeOpacity={1.0} >
                    <SearchBar placeholder="请输入客户名称或编码"
                        ref="searchBar"
                        // inputRef={(searinput) => this.searinput = searinput}
                        onChange={(value) => {
                            this.setState({ name: value });
                        }}
                        value={this.state.name}
                        onCancel={() => { this.setState({ name: '' }); Keyboard.dismiss; }}
                        onSubmit={this._refreshEquipmentList.bind(this)}
                    >
                    </SearchBar>
                </TouchableOpacity>
                <FlatList
                    style={{ flex: 1, marginTop: 2 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refreshEquipmentList.bind(this)}
                    onEndReached={this._getEquipmentList.bind(this)}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this._getEquipmentList()}
                                activeOpacity={0.3}>
                                <View style={{ flex: 1, height: height - 65, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 1, marginBottom: 20 }}>
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
                            this.state.equipmentList.Table && this.state.equipmentList.Table.length !== 0 ?
                                <View style={{ marginTop: 25, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.equipmentList.Table}
                    renderItem={({ item }) => <EquipmentListItem data={item} style={{ marginTop: 5 }}
                        onPress={() => {
                            let a = 1;
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

});

//输出一个类
module.exports = equipmentListView;