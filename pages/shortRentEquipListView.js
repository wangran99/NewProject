

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
    FlatList, StyleSheet, Text, Animated,
    Easing, DeviceEventEmitter, TouchableOpacity, Image, View, Alert, Keyboard
} from 'react-native';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机
import { RNCamera } from 'react-native-camera'


import local from '../tools/storage'
import httpApi from '../tools/api'
import ShortRentEquipListItem from '../component/shortRentEquipListItem'


var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var equipmentListTest = { "Table": [], "Table1": [{ "counts": 0, "pagecounts": 0 }] };
type Props = {};
export default class shortRentEquipListView extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        const options = {
            quality: 1,
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };

        return {
            title: '设备清单',
            //   headerTitle: <Icon name={"alert"} size="lg" />,
            headerRight: (
                <TouchableOpacity onPress={() => { navigation.navigate("BarCodeCamera", { from: "shortRentEquipListView" }); }}>
                    <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>添加</Text>
                        <Icon name={"scan"} size="lg" />
                    </View>
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '', //搜索关键词
            isRefreshing: false,
            shortRentEquipmentList: [],
            animate: new Animated.Value(0), // 二维坐标{x:0,y:0}
        };

        const { navigation } = this.props;
        this.id = navigation.getParam('id', '1');
        this.orderid = navigation.getParam('id', '1');
    }

    componentDidMount() {
        this._getShortRentEquipmentList();
        //收到监听
        this.updateListlistener = DeviceEventEmitter.addListener('shortRentEquipListUpdate', (e) => {
            var myDate = new Date();
            var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            var month = myDate.getMonth() + 1;       //获取当前月份(1-12)
            var day = myDate.getDate();        //获取当前日(1-31)
            //获取完整年月日
            var newDay = year + '-' + month + '-' + day;
            httpApi.addShortRentEquipment(this.orderid, e.Table[0].id, newDay, "").then(data => {
                if (data.Table[0].Column1 == 1000) {
                    this._getShortRentEquipmentList();
                    alert(data.Table[0].Column2);
                }
                else
                    alert(data.Table[0].Column2);
            });

        });
    }

    _getShortRentEquipmentList() {
        httpApi.getShortRentEquipmentList(this.id).then((data) => {
            this.setState({ shortRentEquipmentList: data });
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgray' }}>

                <FlatList
                    style={{ flex: 1, marginTop: 1 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._getShortRentEquipmentList.bind(this)}
                    // onEndReached={this._getShortRentList.bind(this)}
                    // onEndReachedThreshold={0.1}
                    initialNumToRender={5}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                // onPress={() => this._getEquipmentList()}
                                activeOpacity={0.3}>
                                <View style={{ flex: 1, height: height - 65, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 1, marginBottom: 20 }}>
                                    {/* <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View> */}
                                    <Image style={{
                                        width: 80,
                                        height: 80,
                                    }} source={require('../img/refresh.jpg')}></Image>
                                    <Text style={{ marginTop: 20, fontSize: 20 }}>暂无数据</Text>
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
                            this.state.shortRentEquipmentList.Table && this.state.shortRentEquipmentList.Table.length !== 0 ?
                                <View style={{ marginTop: 25, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.shortRentEquipmentList.Table}
                    renderItem={({ item }) => <ShortRentEquipListItem data={item} style={{ marginTop: 4 }}
                        onPress={() => {
                            Alert.alert(
                                '提示',
                                '确定要删除该短租合同下的设备吗？',
                                [
                                    {
                                        text: '确定', onPress: () => {
                                            httpApi.delShortRentEquipment(this.orderid, item.ID)
                                                .then(data => { 
                                                    this._getShortRentEquipmentList(); });


                                        }
                                    },
                                    { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    // {text: '其他', onPress: () => console.log('OK Pressed')},
                                ],
                                { cancelable: false }
                            );
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
module.exports = shortRentEquipListView;