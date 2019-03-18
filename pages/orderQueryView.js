import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView, StyleSheet, Text, FlatList, TouchableOpacity, View, Image } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

import WorkInfoItem from '../component/workInfoItem'
import OrderQueryListItem from '../component/orderQueryListItem'

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var dataTest = {
    "Table": [],
    "Table1": [{ "counts": 5, "pagecounts": 1 }],
    "Table2": [{ "yjdd": 5, "ljje": 340.00, "ljjf": 21212.00 }]
}
type Props = {};
export default class orderQueryView extends Component<Props> {

    static navigationOptions = {
        title: '单据查询',
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
            start: '',
            end: '',
            yjdd: 0,
            ljje: 0,
            ljjf: 0,
            ljjf2: 0,
            // equipmentList: equipmentListTest,
        };
        this.type = '';
        this.pageIndex = 1;
    }
    _onPressButton() {
        this.pageIndex = 1;
        this._getOrderBusinessStatistics();
    }

    _getOrderBusinessStatistics() {
        httpApi.orderBusinessStatistics(this.pageIndex, this.state.start, this.state.end, this.type)
            .then((data) => {
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

                this.setState({
                    yjdd: data.Table2[0].yjdd, ljje: data.Table2[0].ljje,
                    ljjf: data.Table2[0].ljjf, ljjf2: data.Table2[0].ljjf2
                });
            });
    }

    componentDidMount() {
        this._getOrderBusinessStatistics();
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 20, backgroundColor: 'white' }}>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="已接工单" number={this.state.yjdd} icon={"carry-out"} />
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="累计金额" number={this.state.ljje} icon={"dollar"} />
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="累计积分" number={this.state.ljjf} icon={"account-book"} />
                        </View>
                        <View style={{ flex: 1, }} >
                            <WorkInfoItem title="累计积分2" number={this.state.ljjf2} icon={"account-book"} />
                        </View>
                        {/* <Image source={require('../img/userLogin.jpg')} style={styles.iconStyle} /> */}
                    </View>
                    <View style={[styles.textRowContainer, { alignItems: 'center', }]}>
                        <Text style={styles.textStyle}>工单种类：</Text>
                        <View style={{ flex: 1 }}>
                            <Dropdown
                                style={{}}
                                label=' 请选择工单种类'
                                textColor='black'
                                value={"全部"}
                                // value={this.state.selectedClientName}
                                data={[{ value: '全部', id: '' }, { value: '维修', id: 1 },
                                { value: '送货', id: 2 }, { value: '安装', id: 0 }]}
                                onChangeText={(value, index, data) => {
                                    this.type = data[index].id;
                                    this._onPressButton();
                                }} />
                        </View>
                    </View>
                    <View style={[{ flexDirection: 'row', marginLeft: 3, alignItems: 'center' }]}>
                        <TouchableOpacity>
                            <DatePicker
                                style={{ marginVertical: 5, }}
                                date={this.state.start}
                                // date={'2018-11-11'}
                                mode='date'
                                placeholder='请选择起始时间'
                                minDate="2018-01-01"
                                maxDate="2050-01-01"
                                format='YYYY-MM-DD'      //这里定义时间的样式
                                // format='YYYY-MM-DD HH:mm'      //⚠️⚠️⚠️如果想使用24小时的时间制度这里的hh要使用大写的HH....哈哈哈
                                confirmBtnText='确定'
                                cancelBtnText='取消'
                                customStyles={{//
                                    dateIcon: { //设置图标的位置
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 8
                                    },
                                    dateInput: {
                                        fontSize: 16,
                                        marginLeft: 5,
                                        borderRadius: 5,
                                        borderWidth: 1 //设置日期选择器的样式，这里可以去掉边框，这样看起来是不是更漂亮呢😊😯
                                    },
                                    // dateText:{
                                    //     fontSize:16,
                                    //     width:120,
                                    // },
                                }}
                                onDateChange={(date) => { this.setState({ start: date }); }}
                            />
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: 2 }}>至</Text>
                        <TouchableOpacity>
                            <DatePicker
                                style={{ marginVertical: 5 }}
                                date={this.state.end}
                                mode='date'
                                // placeholder='请选择时间'
                                minDate="2018-01-01"
                                maxDate="2050-01-01"
                                format='YYYY-MM-DD'      //这里定义时间的样式
                                // format='YYYY-MM-DD HH:mm'      //⚠️⚠️⚠️如果想使用24小时的时间制度这里的hh要使用大写的HH....哈哈哈
                                confirmBtnText='确定'
                                cancelBtnText='取消'
                                customStyles={{//
                                    dateIcon: { //设置图标的位置
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 8
                                    },
                                    dateInput: {
                                        fontSize: 16,
                                        marginLeft: 5,
                                        borderRadius: 5,
                                        borderWidth: 1 //设置日期选择器的样式，这里可以去掉边框，这样看起来是不是更漂亮呢😊😯
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ end: date }); }}
                            />
                        </TouchableOpacity>
                        <View style={{ marginHorizontal: 2 }} >
                            <Button title='搜索' onPress={this._onPressButton.bind(this)}></Button>
                        </View>
                    </View>
                    <FlatList
                        style={{ flex: 1, }}
                        // refreshing={this.state.isRefreshing}
                        // onRefresh={this._refreshProjectList.bind(this)}
                        onEndReached={this._getOrderBusinessStatistics.bind(this)}
                        onEndReachedThreshold={0.1}
                        initialNumToRender={10}
                        ListEmptyComponent={() => {
                            return (
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    // onPress={() => this._refreshProjectList()}
                                    activeOpacity={0.3}>
                                    <View style={{ flex: 1, height: height / 2 + 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 1, marginBottom: 20 }}>
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
                                    <View style={{ marginVertical: 15, alignItems: 'center' }}>
                                        <View style={{ height: 1, width: width - 25, backgroundColor: 'lightgray' }}></View>
                                        <Text style={{ alignSelf: 'center', marginTop: 15 }}>没有数据了</Text>
                                    </View> : null
                            )
                        }}
                        data={this.state.data.Table}
                        keyExtractor={(item, index) => { return "index" + item.id }}
                        renderItem={({ item }) => <OrderQueryListItem data={item} style={{ margin: 10 }}
                            onPress={() => {
                                // let a = 1;
                                // this.props.navigation.navigate('ProjectProcess', { id: item.id });
                            }} />}
                        removeClippedSubviews={true}
                    />
                </View>
            </ScrollView>
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
    textRowContainer: {
        flexDirection: 'row',
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
module.exports = orderQueryView;