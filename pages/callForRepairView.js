

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
    "Table": [{ "sl": 1, "equipmentid": 36, "clientid": 12, "facilitycode": "8000052", "name": "台州杰士达办公设备有限公司", "address": "双水路", "classift": "工", "brand": "L", "model": "22", "doorplate": "30", "remark": "", "purchase": "1900/1/1 0:00:00", "assetnumber": "", "webbaoxiu": 0 }], "Table1": [{ "id": 81, "orderid": 152, "phenomena": "", "handling": "", "jthandling": "", "feedback": "", "peice": 0.00, "addtime": "2019/1/7 12:15:12", "doorplate": "30" }, { "id": 63, "orderid": 119, "phenomena": "无", "handling": "1", "jthandling": "1", "feedback": "0", "peice": 1.00, "addtime": "2018/12/17 20:41:43", "doorplate": "30" }],
    "Table2": [{ "id": 1, "c_Name": "浙江省测试用户科技有限公司", "c_tel": "0571-88888888", "c_addr": "浙江省测试路18号", "tag": 0, "c_icon": "F2A0F7890A7955D8F040EBE59A7591CD.png", "c_print_title": "测试公司销售清单", "c_print_intro": "附注内容\r\n 本销售单的全部内容经双方认可，购买单位经办人已经对本单销售货物的名称、型号、数量验收合格，并承诺7天内结清货款。购买单位逾期付款总额的1%向本单位支付违约金，经办人自愿承担连带偿还货款以及由此引起的相关法律责任。发生争议协商不成时，双方一致同意向法院起诉。\r\n地址： 测试公司地址     电话88888888    投诉：8888888", "c_open_url": "https:\/\/www.baidu.com\/", "c_open_name": "测试用户网上商城", "baoxiu_status": 0, "c_imgBg": "131930715104678101.jpg", "c_imgLogo": "131930533534676809.jpg", "c_logoTop": "65", "c_logoLeft": "210", "printMaxId": "", "c_logowidth": "72", "c_logoSize": "1" }]
}
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
            datarecord: dataRecordTest,
        };
    }

    _quearyParam(url) {
        var result = {};
        var query = url.split("?")[1];
        var queryArr = query.split("&");
        queryArr.map((item) => {
            var key = item.split("=")[0];
            var value = item.split("=")[1];
            result[key] = value;
        });
        return result;
    }
    componentDidMount() {
        const { navigation } = this.props;
        const data = navigation.getParam('data', 1);
        const queary = this._quearyParam(data.data);
        this.code = queary.code;
        this.clientid = queary.clientid;
        httpApi.getBarCodeInfo(this.code).then(data => {
            this.setState({ data });
        });
    }

    _onPressButton() {
        this.props.navigation.navigate("OnlineService", { data: this.state.data });
    }
    render() {

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
                            <Text style={styles.textStyle}>{this.state.data.Table[0].purchase}</Text>
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
                                            <Text style={{ marginBottom: 20, fontSize: 20 }}>没有记录</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={{ height: 6, backgroundColor: 'lightgray' }}></View>
                                )
                            }}
                            ListFooterComponent={() => {
                                return (
                                    this.state.data && this.state.data.Table1 && this.state.data.Table1.length !== 0 ?
                                        <View style={{ marginVertical: 15, alignItems: 'center' }}>
                                            <View style={{ height: 1, width: width - 25, backgroundColor: 'lightgray' }}></View>
                                            <Text style={{ alignSelf: 'center', marginTop: 15 }}>没有数据了</Text>
                                        </View> : null
                                )
                            }}
                            data={this.state.data.Table1}
                            keyExtractor={(item, index) => { return "index" + item.orderid }}
                            renderItem={({ item }) => <CallForRepairListItem data={item} style={{ margin: 22 }}
                                onPress={() => {
                                    let a = 1;
                                    this.props.navigation.navigate('onlineServiceReplenish', { id: item.orderid });
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