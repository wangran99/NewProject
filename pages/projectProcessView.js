

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, Text, FlatList, Image, View, Alert } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'
import ProjectProcessItem from '../component/projectProcessItem'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var dataTest = {
    "Table": [{ "rowId": 1, "id": 3, "projectname": "测试工程3", "name": "2号任务", "status": 0, "schedule": 100, "img": "D6A7E3263E18D398F0D056D79DD9DC66.png", "_explain": "完成" },
    { "rowId": 2, "id": 2, "projectname": "测试工程3", "name": "1号任务", "status": 0, "schedule": 0, "img": "", "_explain": "" }],
    "Table1": [{ "counts": 2, "pagecounts": 1 }]
};
type Props = {};
export default class projectProcessView extends Component<Props> {

    static navigationOptions = {
        title: '项目进度',
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
            isRefreshing: false,
            // equipmentList: equipmentListTest,
        };

        const { navigation } = this.props;
        this.projectId = navigation.getParam('id', 1);
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
        this._getProjectProcessList();
    }
    _getProjectProcessList() {
        httpApi.getProjectProcessList(this.pageIndex, this.projectId).then(data => { this.setState({ data }) });
    }
    _refreshProjectProcessList() {
        this.pageIndex = 1;
        this._getProjectProcessList();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.textRowContainer, { marginVertical: 10, backgroundColor: 'white' }]}>
                    <Text style={styles.textStyle}>进行中</Text>
                </View>


                <View style={styles.container}>
                    <Text style={[styles.textStyle,{marginHorizontal:10, marginHorizontal:15,fontSize:20}]}>项目名称：施工项目</Text>
                    <FlatList
                        style={{ flex: 1, marginTop: 2 }}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._refreshProjectProcessList.bind(this)}
                        // onEndReached={this.isRefreshing.bind(this)}
                        onEndReachedThreshold={0.1}
                        initialNumToRender={10}
                        ListEmptyComponent={() => {
                            return (
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => this._refreshProjectProcessList()}
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
                        renderItem={({ item }) => <ProjectProcessItem data={item} style={{ margin: 22 }}
                            onPress={() => {
                                let a = 1;
                                this.props.navigation.navigate('ProjectProcessAdd', { id: item.id });
                            }} />}
                        removeClippedSubviews={true}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },
    textRowContainer: {
        marginLeft: 15,
        marginTop: 10,
        marginHorizontal: 10,
    },
    textStyle: {
        fontSize: 16,
        color: 'black'
        //   justifyContent: 'center',
        //    alignItems: 'center',
        //  borderRadius: 8
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
module.exports = projectProcessView;