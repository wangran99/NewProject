import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

import RewardItem from '../component/rewardItem'
import local from '../tools/storage'
import httpApi from '../tools/api'
import { ScrollView } from 'react-native-gesture-handler';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{ "username": "", "status1": 2, "status2": 0, "status3": 0, "status4": 0, "status5": 0, "status6": 0 },
    { "username": "", "status1": 0, "status2": 0, "status3": 0, "status4": 0, "status5": 0, "status6": 0 },
    { "username": "", "status1": 0, "status2": 0, "status3": 0, "status4": 0, "status5": 0, "status6": 0 },
    { "username": "", "status1": 0, "status2": 0, "status3": 7, "status4": 0, "status5": 0, "status6": 0 }]
};


type Props = {};
export default class staffStateTabView extends Component<Props> {

    static navigationOptions = {
        title: '员工动态',
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
            tableHead: ['姓名', '未接单', '已取消', '已接单', '处理中', '已完成', '未解决'],
            tableData: []
        };
    }
    componentDidMount() {
        httpApi.orderStatUsers().then(data => {
            let tabledata = new Array();
            data.Table.map((item) => {
                let row = new Array();
                row.push(item.username);
                row.push(item.status1);
                row.push(item.status2);
                row.push(item.status3);
                row.push(item.status4);
                row.push(item.status5);
                row.push(item.status6);
                tabledata.push(row);
            })
            this.setState({ data: data, tableData: tabledata });
        });
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ marginTop: 40, flexDirection: 'row',alignItems:'flex-end' }}>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <RewardItem style={{ flex: 1 }} name={this.state.data.Table[1].username} type={"silver"}></RewardItem>
                        </View>
                        <View style={{ flex: 1, marginRight: 1, }} >
                            <RewardItem style={{ flex: 1 }} name={this.state.data.Table[0].username} type={"gold"}></RewardItem>
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <RewardItem style={{ flex: 1 }} name={this.state.data.Table[2].username} type={"copper"}></RewardItem>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                            <Rows data={this.state.tableData} textStyle={styles.text} />
                        </Table>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        //  alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        // margin: 6,
        textAlign: 'center'
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
module.exports = staffStateTabView;