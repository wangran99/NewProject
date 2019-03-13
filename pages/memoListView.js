

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, Text, FlatList, Image, View, Alert } from 'react-native';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'
import MemoListItem from '../component/memoListItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{ "rowId": 1, "id": 35, "oid": 0, "headline": "head", "details": "content", "addtime": "2018/8/8 14:21:16", "state": 0 }],
    "Table1": [{ "counts": 10, "pagecounts": 1 }]
};
type Props = {};
export default class memoListView extends Component<Props> {

    static navigationOptions = ({ navigation }) => {
        const options = {
            quality: 1,
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };

        return {
            title: '备忘录',
            //   headerTitle: <Icon name={"alert"} size="lg" />,
            headerRight: (
                <TouchableOpacity onPress={() => { navigation.navigate("AddMemo"); }}>
                    <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={"plus-square"} size="lg" />
                    </View>
                </TouchableOpacity>
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:false,
            data: dataTest,
        };
        this.pageIndex = 1;
    }

    componentDidMount() {
        this._getMemoList();
    }

    _getMemoList() {
        httpApi.getMemoList(this.pageIndex).then(data => {
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
    _refreshMemoList() {
        this.pageIndex = 1;
        this._getMemoList();
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
        return (
            <View style={styles.container}>
                {/*{头像}*/}
                <Image style={{ width: width, height: 130 }} source={require('../img/memorandum-list-icon.jpg')}  />
                {/* <Image source={require('../img/new-memorandum.png')} style={[styles.iconStyle,{ position: 'absolute',
                                        left: (width/2-35),
                                      //  bottom:35,
                                         top: 100,
                                        // marginLeft: 10
                                        }]} /> */}
                <FlatList
                    style={{ flex: 1, marginTop: 2 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refreshMemoList.bind(this)}
                    onEndReached={this._getMemoList.bind(this)}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this._refreshMemoList()}
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
                    renderItem={({ item }) => <MemoListItem data={item} style={{ marginTop: 5 }}
                        onPress={() => {
                            // let a = 1;
                            // this.props.navigation.navigate('RentDetail', { id: item.id });
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
        //   alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },
    iconStyle: {
        width: 70,
        height: 70,
      //  marginTop: 50,
        borderRadius: 35,
        borderWidth: 1,
        backgroundColor:'blue',
        borderColor: 'orange',
        // marginBottom: 30,
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
module.exports = memoListView;