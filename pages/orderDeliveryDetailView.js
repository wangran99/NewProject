

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView, StyleSheet, Text, FlatList, Image, View, Alert, TouchableOpacity } from 'react-native';
import { Icon, SearchBar, } from '@ant-design/react-native';
import local from '../tools/storage'
import httpApi from '../tools/api'
import OrderRepairRecordListItem from '../component/orderRepairRecordListItem'

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
export default class orderDeliveryDetailView extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        const options = {
            quality: 1,
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };

        return {
            title: '送货工单详情',
            //   headerTitle: <Icon name={"alert"} size="lg" />,
            // headerRight: (
            //     <TouchableOpacity onPress={() => { navigation.navigate("BarCodeCamera", { from: "orderRepairDetailView" }); }}>
            //         <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            //             <Text style={{ fontSize: 20, color: 'white' }}>签到</Text>
            //             <Icon name={"scan"} size="lg" />
            //         </View>
            //     </TouchableOpacity>
            // ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            data: dataTest,
            // dataRecord: dataRecordTest,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 1);
        httpApi.getOrderDetails(id).then(data => {
            this.setState({ data });
        });
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
            <ScrollView style={{ backgroundColor: 'lightgray' }}>
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 10, marginVertical: 10, borderRadius: 8, backgroundColor: 'white' }}>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>工单种类：</Text>
                            <Text style={styles.textStyle}>{type}</Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>是否加急：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].orderlevel == 1 ? "加急" : "普通"}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>工单编号：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].orderid}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>客户名称：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].name}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>客户地址：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].address}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>科室门牌：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].doorplate}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>接单时间：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].ordertime}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>工单描述：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].describe}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>手机号：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].phone}</Text>
                        </View>
                        <View style={[styles.textRowStyle, { flexDirection: 'row' }]}>
                            <Text style={styles.textStyle}>开单金额：</Text>
                            <Text style={styles.textStyle}>{this.state.data.Table[0].orderamount}</Text>
                        </View>



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
module.exports = orderDeliveryDetailView;