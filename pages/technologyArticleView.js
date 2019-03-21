

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';

import { Keyboard, StyleSheet, Text, TouchableOpacity, Image, View, FlatList } from 'react-native';

import AnnouncementItem from '../component/announcementItem'

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

type Props = {};
export default class technologyArticleView extends Component<Props> {

    static navigationOptions = {
        title: '技术资料',
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
            data: '',
            keys: '',
            isRefreshing: false,

        };
        this.pageIndex = 1;
    }
    componentDidMount() {
        this._getList();
    }
    _getList() {
        httpApi.getTechnology(this.pageIndex, this.state.keys).then((data) => {
            if (this.pageIndex == 1)
                this.setState({ data: data });
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
    _refreshList() {
        this.pageIndex = 1;
        this._getList();
    }
    clear() {
        this.setState({ keys: '' });
        Keyboard.dismiss;
    }
    dismissKeyboardClick() {

    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity backgroundColor='red' activeOpacity={1.0} onPress={this.dismissKeyboardClick.bind(this)}>
                    <SearchBar placeholder="请输入搜索内容"
                        ref="searchBar"
                        // inputRef={(searinput) => this.searinput = searinput}
                        onChange={(value) => {
                            this.setState({ keys: value });
                        }}
                        value={this.state.keys}
                        onCancel={this.clear.bind(this)}
                        onSubmit={this._refreshList.bind(this)}
                    >
                    </SearchBar>
                </TouchableOpacity>
                <FlatList
                    style={{ flex: 1, }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refreshList.bind(this)}
                    onEndReached={this._getList.bind(this)}
                    onEndReachedThreshold={0.1}
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
                                    <Text style={{ alignSelf: 'center', marginTop: 5 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.data.Table}
                    renderItem={({ item }) => <AnnouncementItem data={item} style={{ margin: 22 }}
                        onPress={() => {
                            let a = 1;
                            this.props.navigation.navigate('TechnologyArticleDetail', { id: item.id, type: item.type });
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
        backgroundColor: 'white',
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
module.exports = technologyArticleView;