import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { FlatList, StyleSheet, Text, TouchableOpacity, Image, View, Alert } from 'react-native';
import local from '../tools/storage';
import httpApi from '../tools/api';
import DanJuListItem from '../component/danJuListItem';


var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var danJuListTest = {
    "Table": [],
    "Table1": [{ "counts": 5, "pagecounts": 10 }]
};

type Props = {};
export default class DanjuListView extends Component<Props> {

    static navigationOptions = {
        title: '单据管理',
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
            danJuList: danJuListTest,
            isRefreshing: false,
            visible: false,
        }
    }

    componentDidMount() {
        this._getDanJuList();
    }
    _getDanJuList() {
        httpApi.getDanJuList().then((data) => {
            this.setState({ danJuList: data });
        });
    }
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('code', 'NO-ID');
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'lightgray' }}>
                <FlatList
                    style={{ marginTop: 0 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._getDanJuList.bind(this)}
                    // onEndReached={this.fetchMoreAnnouncement.bind(this)}
                    // onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this._getDanJuList()}
                                activeOpacity={0.3}>
                                <View style={{ flex: 1, height: height - 65, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 20 }}>
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
                    // ItemSeparatorComponent={() => {
                    //     return (
                    //         <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                    //     )
                    // }}
                    ListFooterComponent={() => {
                        return (
                            this.state.danJuList.Table && this.state.danJuList.Table.length !== 0 ?
                                <View style={{ marginTop: 20, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center',  }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.danJuList.Table}
                    renderItem={({ item }) => <DanJuListItem data={item} style={{ margin: 22 }}
                        onPress={() => {
                            Alert.alert(
                                '提示',
                                '确定移交？',
                                [
                                    { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    {
                                        text: '确定', onPress: () => {
                                            let a = item;
                                            httpApi.danJuYiJiao(item.tid, item.class).then((data) => {
                                                if (data.Table[0].Column1 == 1000)
                                                    this._getDanJuList();
                                                else
                                                    alert(data.Table[0].Column2);
                                            });
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                            //  this.props.navigation.navigate('OrderDetail', { id: item.id });
                        }} />}
                    removeClippedSubviews={true}
                />

            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'red',
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
module.exports = DanjuListView;