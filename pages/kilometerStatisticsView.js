

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, View, Alert,DeviceEventEmitter } from 'react-native';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';
import DatePicker from 'react-native-datepicker';

import local from '../tools/storage'
import httpApi from '../tools/api'
import CarListItem from '../component/carListItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "rowId": 1, "id": 3, "addtime": "2019/3/7 20:46:03", "username": "", "beforekilometre": 10.00,
        "beforetime": "2019/3/7 20:46:03", "beforeimg": "D884B0C33F8EBBCD40B22256FED1FB17.png", "Afterkilometre": "", "Aftertime": "", "Afterimg": "", "countkilometre": "", "status": 1, "state": 0
    }, { "rowId": 2, "id": 2, "addtime": "2018/12/17 16:33:06", "username": "", "beforekilometre": 100.00, "beforetime": "2018/12/17 16:33:06", "beforeimg": "566906AD353AC366B18B4789CB6B703B.png", "Afterkilometre": "", "Aftertime": "", "Afterimg": "", "countkilometre": "", "status": 1, "state": 0 }],
    "Table1": [{ "counts": 2, "pagecounts": 1 }], "Table2": [{ "Column1": "" }]
}
//公里数统计
type Props = {};
export default class kilometerStatisticsView extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        const options = {
            quality: 1,
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };

        return {
            title: '公里数统计',
            //   headerTitle: <Icon name={"alert"} size="lg" />,
            headerRight: (
                <TouchableOpacity onPress={() => { navigation.navigate("CarManagement"); }}>
                    <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Text style={{ fontSize: 20, color: 'white' }}>添加</Text> */}
                        <Icon name={"plus-square"} size="lg" />
                    </View>
                </TouchableOpacity>
            ),
        };
    };
    constructor(props) {
        var date = new Date();
        let endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        super(props);
        this.state = {
            isRefreshing: false,
            start: '2018-11-11',
            end: endDate,
            count_distance: '0',
            data: dataTest,
        };
        this.pageIndex = 1;
    }

    componentDidMount() {
        this._getCarList();
          //收到监听
          this.kilometerStatisticsListlistener = DeviceEventEmitter.addListener('kilometerStatisticsList', (e) => {
            this._getCarList();
        });
    }

    componentWillUnmount() {
        // 移除监听 
        this.kilometerStatisticsListlistener.remove();
    }
    _getCarList() {
        httpApi.getCarList(this.pageIndex, this.state.start, this.state.end)
            .then((data) => {
                if (this.pageIndex == 1)
                    this.setState({ data });
                else if (this.page <= data.Table1[0].pagecounts) {
                    let newArry = this.state.data.Table.concat(data.Table);
                    this.state.data.Table = newArry;
                    let newjson = JSON.parse(JSON.stringify(this.state.data));
                    newjson.Table = newArry;
                    this.setState({ data: newjson });
                }
                this.pageIndex++;
            });
    }
    _refreshCarList() {
        this.pageIndex = 1;
        this._getCarList();
    }
    render() {
        return (
            <View style={styles.container}>
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
                            minDate="2010-01-01"
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
                            minDate="2010-01-01"
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
                <View style={[{ flexDirection: 'row', marginLeft: 7, alignItems: 'center' }]}>
                    <Text style={{ fontSize: 17 }}>使用公里数:{this.state.data.Table2[0].Column1 == "" ? 0 : this.state.data.Table2[0].Column1} km</Text>
                </View>

                <FlatList
                    style={{ flex: 1, marginTop: 2 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refreshCarList.bind(this)}
                    onEndReached={this._getCarList.bind(this)}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this._refreshCarList()}
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
                            this.state.data.Table && this.state.data.Table.length !== 0 ?
                                <View style={{ marginTop: 25, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.data.Table}
                    renderItem={({ item }) => <CarListItem data={item} style={{ marginTop: 5 }}
                        onPress={() => {
                         this.props.navigation.navigate('CarDetail', { id: item.id });
                        }} />}
                    removeClippedSubviews={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: '#E4E4E4',
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
    }
});

//输出一个类
module.exports = kilometerStatisticsView