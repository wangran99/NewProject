

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, Text, FlatList, Image, View, Alert } from 'react-native';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';


import local from '../tools/storage'
import httpApi from '../tools/api'
import TechnologyListItem from '../component/technologyListItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var dataTest = {
    "Table": [{ "rowId": 1, "addtime": "2019/3/8 16:59:42", "phenomena": "无", "handling": "", "classift": "", "brand": "", "model": "" },],
    "Table1": [{ "counts": 1, "pagecounts": 1 }]
};
type Props = {};
export default class maintenanceExperienceView extends Component<Props> {

    static navigationOptions = {
        title: '维修经验',
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
            keys: '', //搜索关键词
            isRefreshing: false,
            // equipmentList: equipmentListTest,
        };
        this.pageIndex = 1;
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
    componentDidMount() {
        this._getTechnologyList();
    }
    _getTechnologyList() {
        httpApi.getTechnologyList(this.pageIndex, this.state.keys).then(data => {
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
        });
    }
    _refreshTechnologyList() {
        this.pageIndex = 1;
        this._getTechnologyList();
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity backgroundColor='red' activeOpacity={1.0} >
                    <SearchBar placeholder="故障现象"
                        ref="searchBar"
                        // inputRef={(searinput) => this.searinput = searinput}
                        onChange={(value) => {
                            this.setState({ keys: value });
                        }}
                        value={this.state.keys}
                        onCancel={() => { this.setState({ keys: '' }); Keyboard.dismiss; }}
                        onSubmit={this._refreshTechnologyList.bind(this)}
                    >
                    </SearchBar>
                </TouchableOpacity>
                <FlatList
                    style={{ flex: 1, marginTop: 2 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refreshTechnologyList.bind(this)}
                    onEndReached={this._getTechnologyList.bind(this)}
                    onEndReachedThreshold={0.2}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this._refreshTechnologyList()}
                                activeOpacity={0.3}>
                                <View style={{ flex: 1, height: (height - 65), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 1, marginBottom: 20 }}>
                                    {/* <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View> */}
                                    <Image style={{
                                        width: 80,
                                        height: 80,
                                        marginBottom: 35,
                                    }} source={require('../img/refresh.jpg')}></Image>
                                    <View style={{ marginBottom: 45 }}>
                                        <Text style={{ marginBottom: 20, fontSize: 20 }}>请点击或下拉刷新</Text>
                                    </View>
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
                    renderItem={({ item }) => <TechnologyListItem data={item} style={{ margin: 22 }}
                        onPress={() => {
                            // let a = 1;
                            // this.props.navigation.navigate('ProjectProcess', { id: item.id });
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
module.exports = maintenanceExperienceView;