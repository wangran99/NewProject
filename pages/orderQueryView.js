import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView, StyleSheet, Text, FlatList, TouchableOpacity, View, Alert } from 'react-native';
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
    "Table": [{
        "rowId": 1, "id": 3, "addtime": "2019/3/7 20:46:03", "username": "", "beforekilometre": 10.00,
        "beforetime": "2019/3/7 20:46:03", "beforeimg": "D884B0C33F8EBBCD40B22256FED1FB17.png", "Afterkilometre": "", "Aftertime": "", "Afterimg": "", "countkilometre": "", "status": 1, "state": 0
    }, { "rowId": 2, "id": 2, "addtime": "2018/12/17 16:33:06", "username": "", "beforekilometre": 100.00, "beforetime": "2018/12/17 16:33:06", "beforeimg": "566906AD353AC366B18B4789CB6B703B.png", "Afterkilometre": "", "Aftertime": "", "Afterimg": "", "countkilometre": "", "status": 1, "state": 0 }],
    "Table1": [{ "counts": 2, "pagecounts": 1 }], "Table2": [{ "Column1": "" }]
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
            data:dataTest,
            isRefreshing: false,
            // equipmentList: equipmentListTest,
        };
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
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('code', 'NO-ID');
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 20, backgroundColor: 'white' }}>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="已接工单" number="12" icon={"carry-out"} />
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="累计金额" number="88888" icon={"dollar"} />
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="累计积分" number="123" icon={"account-book"} />
                        </View>
                        <View style={{ flex: 1, }} >
                            <WorkInfoItem title="累计积分2" number="8" icon={"account-book"} />
                        </View>
                        {/* <Image source={require('../img/userLogin.jpg')} style={styles.iconStyle} /> */}
                    </View>
                    <View style={[styles.textRowContainer, { alignItems: 'center', }]}>
                        <Text style={styles.textStyle}>工单种类：</Text>
                        <View style={{ flex: 1 }}>
                            <Dropdown
                                style={{}}
                                label=' 请选择工单种类'
                                value={"未完成"}
                                // value={this.state.selectedClientName}
                                data={[{ value: '未完成', id: 0 }, { value: '已完成', id: 1 }]}
                                onChangeText={(value, index, data) => {
                                    this.status = index;
                                }} />
                        </View>
                    </View>
                    <View style={[{ flexDirection: 'row', marginLeft: 3, alignItems: 'center' }]}>
                        {/* <Text style={[styles.textStyle]}>采购时间:</Text> */}
                        {/* <Text style={[styles.textStyle]}>{this.state.data.Table[0].parentsNumber10 < 0 ? "超出" + Math.abs(this.state.data.Table[0].parentsNumber10) + "天" : this.state.data.Table[0].parentsNumber10 + "天"}</Text> */}
                        {/* <TextInput style={[styles.textInputStyle,]} value={this.state.purchase}
                            placeholder={"选填"} onChangeText={(value) => this.setState({ purchase: value })}></TextInput> */}
                        <TouchableOpacity>
                            <DatePicker
                                style={{ marginVertical: 5, }}
                                date={this.state.start}
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
                            <Button title='搜索'></Button>
                        </View>
                    </View>
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