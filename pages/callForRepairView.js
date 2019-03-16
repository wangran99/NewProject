

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView, StyleSheet, Text, FlatList, Image, View, Alert, TouchableOpacity } from 'react-native';
import { Icon, SearchBar, } from '@ant-design/react-native';
import local from '../tools/storage'
import httpApi from '../tools/api'
import CallForRepairListItem from '../component/callForRepairListItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var dataTest = {
    "Table": [{
        "id": 24, "facilitycode": "11111", "assetnumber": "无", "clientid": 11,
        "name": "", "address": "111", "doorplate": "11", "classift": "11",
        "brand": "11", "model": "4650", "purchase": "1900/1/1 0:00:00", "upkeep": 0, "contacts": "", "orderid": 187,
        "ordertime": "2019/3/7 15:20:15", "phone": "121212366", "describe": "11", "orderamount": 1.00,
        "orderstatus": 3, "ordertype": 1, "cause": "12", "orderlevel": 0
    }]
};
var dataRecordTest = {
    "Table": [{ "orderid": 94, "facilitycode": "", "issuetime": "2011/11/1 11:11:", "phenomena": "111", "handling": "111", "jthandling": "111", "orderstatus": 5 },
    ]
};
type Props = {};
export default class callForRepairView extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        const options = {
            quality: 1,
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };

        return {
            title: '在线报修系统',

        };
    };
    constructor(props) {
        super(props);
        this.state = {
            data: dataTest,
            dataRecord: dataRecordTest,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 1);
        httpApi.getOrderDetails(id).then(data => {
            this.setState({ data });
            return httpApi.getOrderRecord(data.Table[0].id);
        }).then(data => this.setState({ dataRecord: data }))
    }

    _onPressButton() {

    }
    render() {
        let dt = this.state.data.Table[0];
        let type = '';
        if (dt.ordertype == 0) {
            type = "安装";
        }
        else if (dt.ordertype == 3) {
            type = "临修";
        }
        else if (dt.ordertype == 1) {
            type = "维修";
        } else {
            type = "送货";
        }

        let status = (dt.orderstatus == 0 && "未派单" || dt.orderstatus == 1 && "1已派单" || dt.orderstatus == 2 && "已取消"
            || dt.orderstatus == 3 && "已接单" || dt.orderstatus == 4 && "已到达（处理中）" || dt.orderstatus == 5 && "已完成"
            || dt.orderstatus == 6 && "未解决" || dt.orderstatus == 7 && "送修中");

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 10, marginVertical: 10, borderRadius: 8, backgroundColor: 'white' }}>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>设备编号：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].facilitycode}</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>客户名称：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].name}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>客户地址：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].address}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>设备分类：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].classift}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>品      牌：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].brand}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>设备名称及型号：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].model}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>购买日期：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].ordertime}</Text>
                        </View>
                        <View style={{ marginVertical: 20, marginHorizontal: 10 }} >
                            <Button style={{ width: width * 0.85, }} title='在线召唤服务' onPress={this._onPressButton.bind(this)}></Button>
                        </View>
                        <View style={{ height: 10, backgroundColor: 'lightgray' }}></View>


                        <FlatList
                            style={{ flex: 1, }}
                            // refreshing={this.state.isRefreshing}
                            // onRefresh={this._refreshProjectList.bind(this)}
                            // onEndReached={this.isRefreshing.bind(this)} 
                            // onEndReachedThreshold={0.1}
                            initialNumToRender={5}
                            ListEmptyComponent={() => {
                                return (
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        // onPress={() => this._refreshProjectList()}
                                        activeOpacity={0.3}>
                                        <View style={{ flex: 1, height: height - 65, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 1, marginBottom: 20 }}>
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
                                    this.state.dataRecord.Table && this.state.dataRecord.Table.length !== 0 ?
                                        <View style={{ marginVertical: 15, alignItems: 'center' }}>
                                            <View style={{ height: 1, width: width - 25, backgroundColor: 'lightgray' }}></View>
                                            <Text style={{ alignSelf: 'center', marginTop: 5 }}>没有数据了</Text>
                                        </View> : null
                                )
                            }}
                            data={this.state.dataRecord.Table}
                            keyExtractor={(item, index) => { return "index" + item.id }}
                            renderItem={({ item }) => <CallForRepairListItem data={item} style={{ margin: 22 }}
                                onPress={() => {
                                    // let a = 1;
                                    // this.props.navigation.navigate('ProjectProcess', { id: item.id });
                                }} />}
                            removeClippedSubviews={true}
                        />
                    </View>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },

    textStyle: {
        fontSize: 18,
        color: 'black'
    },
    textRowStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
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
module.exports = callForRepairView;