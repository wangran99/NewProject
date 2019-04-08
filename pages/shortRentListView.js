

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
    FlatList, StyleSheet, Text, Animated,
    Easing, InteractionManager, TouchableOpacity, Image, View, Alert, Keyboard
} from 'react-native';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机
import { RNCamera } from 'react-native-camera'


import local from '../tools/storage'
import httpApi from '../tools/api'
import ShortRentListItem from '../component/shortRentListItem'


var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var equipmentListTest = { "Table": [], "Table1": [{ "counts": 0, "pagecounts": 0 }] };
type Props = {};
export default class shortRentListView extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        const options = {
            quality: 1,
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };

        return {
            title: '短租列表',
            //   headerTitle: <Icon name={"alert"} size="lg" />,
            // headerRight: (
            //     <TouchableOpacity onPress={() => { navigation.navigate("BarCodeCamera", { from: "equipmentListView" }); }}>
            //         <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            //             <Text style={{ fontSize: 20, color: 'white' }}>添加</Text>
            //             <Icon name={"scan"} size="lg" />
            //         </View>
            //     </TouchableOpacity>
            // ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '', //搜索关键词
            isRefreshing: false,
            shortRentList: [],
            animate: new Animated.Value(0), // 二维坐标{x:0,y:0}
        };
        this.page = 1;//默认获取第一页数据
    }

    componentDidMount() {
        this._getShortRentList();
    }

    _getShortRentList() {
        httpApi.getShortRentList(100, this.state.name).then((data) => {
            if (this.page == 1)
                this.setState({ shortRentList: data });
            else if (this.page <= data.Table1[0].pagecounts) {
                let newArry = this.state.shortRentList.Table.concat(data.Table);
                this.state.shortRentList.Table = newArry;
                let newjson = JSON.parse(JSON.stringify(this.state.equipmentList));
                newjson.Table = newArry;
                this.setState({ shortRentList: newjson });
            }
            this.page++;
        });
    }
    _refreshShortRentList() {
        this.page = 1;
        this._getShortRentList();
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
                <TouchableOpacity backgroundColor='red' activeOpacity={1.0} >
                    <SearchBar placeholder="请输入合同号"
                        ref="searchBar"
                        // inputRef={(searinput) => this.searinput = searinput}
                        onChange={(value) => {
                            this.setState({ name: value });
                        }}
                        value={this.state.name}
                        onCancel={() => { this.setState({ name: '' }); Keyboard.dismiss; }}
                        onSubmit={this._refreshShortRentList.bind(this)}
                    >
                    </SearchBar>
                </TouchableOpacity>
                <FlatList
                    style={{ flex: 1, marginTop: 1 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refreshShortRentList.bind(this)}
                    onEndReached={this._getShortRentList.bind(this)}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this._refreshShortRentList()}
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
                            this.state.shortRentList.Table && this.state.shortRentList.Table.length !== 0 ?
                                <View style={{ marginTop: 25, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.shortRentList.Table}
                    renderItem={({ item }) => <ShortRentListItem data={item} style={{ marginTop: 4 }}
                        onPress={() => {
                            // let a = 1;
                            this.props.navigation.navigate('ShortRentEquipList', { id: item.ID, orderid: item.orderNo });
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
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
module.exports = shortRentListView;