

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Button as AButton, Provider, Toast } from '@ant-design/react-native';
// import HTMLView from 'react-native-htmlview';
import MyWebView from 'react-native-webview-autoheight';
//import AButton from '@ant-design/react-native/lib/button';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert, DeviceEventEmitter } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import qs from 'qs'

import local from '../tools/storage'
import httpApi from '../tools/api'
import { ScrollView } from 'react-native-gesture-handler';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

type Props = {};
export default class technologyArticleDetailView extends Component<Props> {
    static navigationOptions = {
        title: '技术资料详情',
        /* No more header config here! */
    };

    constructor(props) {
        super(props);
        this.state = {
            title: "文章标题",
            content: "文章内容",
            addTime: "2019.1.1",
        };
        this.id = this.props.navigation.getParam('id', '1');
        const type = this.props.navigation.getParam('type', 1);
        this.tag = '1';
        if (type == 0)
            this.tag = "【公告】";
        else if (type == 1)
            this.tag = "【通知】";
        if (type == 2)
            this.tag = "【技术资料】";
    }

    componentDidMount() {

        httpApi.getAnnouncementDetail(this.id).then((data) => {
            let title = this.tag.concat(data.Table[0].headline);
            //   let content = data.Table[0].details.replace(/<[^>]+>/g, "");
            let content = data.Table[0].details;
            let addTime = data.Table[0].addtime;
            this.setState({
                title, content, addTime
            });
        });
    }
    componentWillUnmount(){
        // DeviceEventEmitter.emit('announcementList',"jianting"); //发监听
    }
    render() {
        // var htmlContent = '<p><a href="">&hearts; nice job!</a></p>';
        // const customStyle = "<style>* {max-width: 100%;} body {font-family: sans-serif;} h1 {color: red;}</style>";
        // const htmlContent = "<h1>This is title</h1><p>Throw your entire HTML here</p>";
        return (

            <ScrollView style={{ backgroundColor: 'lightgray' }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 20, color: "black", marginVertical: 20, textAlign:'center'}} >{this.state.title}</Text>
                    <Text style={{ fontSize: 15 }}>{this.state.addTime}</Text>

                    <MyWebView
                        style={{marginVertical:20, backgroundColor: 'lightgray' }}
                        source={{ html: this.state.content }}
                        startInLoadingState={true}
                   
                    />

                    {/* <Text style={{ fontSize: 19, marginVertical: 15, marginHorizontal: 20 }}>{this.state.content}</Text> */}

                </View>
            </ScrollView>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        //  alignItems:'center',
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
module.exports = technologyArticleDetailView;