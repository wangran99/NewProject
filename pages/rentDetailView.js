

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

import local from '../tools/storage'
import httpApi from '../tools/api'
import { ScrollView } from 'react-native-gesture-handler';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "equipmentid": 22, "id": 7, "contractno": "888", "facilitycode": "123456789",
        "name": "杭州共基网络科技有限公司", "address": "江干区", "classift": "复印机", "brand": "京瓷", "model": "1880",
        "initialcount": 0, "cycle": 1
    }],
    "Table1": [{ "id": 6, "is_sign": 0 }]
}

var tableDataTest = {
    tableHead: ['抄表读数(黑白)', '抄表读数(彩色)', '抄表时间',],
    tableData: [[], []],
};

type Props = {};
export default class rentDetailView extends Component<Props> {

    static navigationOptions = {
        title: '租机详情',
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
            data: dataTest,
            // rentReadingTop10:null,
            tableData: tableDataTest,
        };
    }
    _onPressButton() {

        this.props.navigation.navigate('RentingMeterReading', { "equipmentid": 22 });
    }

    componentDidMount() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('id', '1');

        httpApi.getRentDetail(itemId).then((data) => {
            this.setState({ data: data });



            return httpApi.getRentReadingTop10(data.Table[0].equipmentid);
        }).then((data) => {
            let a = 11;
            if (data.Table && data.Table.length > 0) {
                tempTable = { tableHead: [], tableData: [] };
                tempTable.tableHead = ['抄表读数(黑白)', '抄表读数(彩色)', '抄表时间'];

                data.Table.map((item) => {
                    tempTable.tableData.push([item.reading, item.readingex, item.addtime.replace(/\//g, "-")]);
                });
                this.setState({ tableData: tempTable });
            }
        });
    }
    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.innercontainer}>
                        <View style={[styles.textRowContainer, { marginHorizontal: 10, flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <Text style={[styles.textStyle]}>设备编号:</Text>
                            <Text style={[styles.textStyle]}>{this.state.data.Table[0].facilitycode}</Text>
                        </View>
                        <View style={{ marginHorizontal: 10, marginVertical: 5, height: 1, backgroundColor: 'lightgray' }}></View>
                        <View style={[styles.textRowContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <Text style={[styles.textStyle]}>客户名称:</Text>
                            <Text style={[styles.textStyle]}>{this.state.data.Table[0].name}</Text>
                        </View>
                        <View style={[styles.textRowContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <Text style={[styles.textStyle]}>客户地址:</Text>
                            <Text style={[styles.textStyle]}>{this.state.data.Table[0].address}</Text>
                        </View>
                        <View style={[styles.textRowContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <Text style={[styles.textStyle]}>分类:</Text>
                            <Text style={[styles.textStyle]}>{this.state.data.Table[0].classift}</Text>
                        </View>
                        <View style={[styles.textRowContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <Text style={[styles.textStyle]}>品牌:</Text>
                            <Text style={[styles.textStyle]}>{this.state.data.Table[0].brand}</Text>
                        </View>
                        <View style={[styles.textRowContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <Text style={[styles.textStyle]}>型号:</Text>
                            <Text style={[styles.textStyle]}>{this.state.data.Table[0].model}</Text>
                        </View>
                        <View style={[styles.textRowContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <Text style={[styles.textStyle]}>初期读数:</Text>
                            <Text style={[styles.textStyle]}>{this.state.data.Table[0].initialcount}</Text>
                        </View>
                        <View style={[styles.textRowContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <Text style={[styles.textStyle]}>剩余天数:</Text>
                            {/* <Text style={[styles.textStyle]}>{this.state.data.Table[0].parentsNumber10 < 0 ? "超出" + Math.abs(this.state.data.Table[0].parentsNumber10) + "天" : this.state.data.Table[0].parentsNumber10 + "天"}</Text> */}
                            <Text style={[styles.textStyle]}>{this.state.data.Table[0].cycle + "天"}</Text>
                        </View>

                        <Text style={[styles.textRowContainer, styles.textStyle]}>抄表记录</Text>
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Table borderStyle={{ marginHorizontal: 20, borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={this.state.tableData.tableHead} style={styles.head} textStyle={styles.text} />
                                <Rows data={this.state.tableData.tableData} textStyle={styles.text} />
                            </Table>
                        </View>
                        {/* {
                            this.state.data.dy.PAGE.length > 0 ? <Button title='保养抄表'
                                onPress={this._onPressButton.bind(this)}></Button> : null
                        } */}
                        <Button title='保养抄表' style={{ marginBottom: 30 }}
                            onPress={this._onPressButton.bind(this)}></Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal:10,
        // alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },

    innercontainer: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 9,
        // alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'white',
    },
    textRowContainer: {
        marginLeft: 15,
        marginTop: 10,
        marginHorizontal: 10,
    },
    textStyle: {
        fontSize: 18,
        color: 'black'
        //   justifyContent: 'center',
        //    alignItems: 'center',
        //  borderRadius: 8
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 6
    }
});

//输出一个类
module.exports = rentDetailView;