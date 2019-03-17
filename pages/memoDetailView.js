

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, Text, TextInput, Image, View, DeviceEventEmitter } from 'react-native';
import { Carousel, Icon, SearchBar, } from '@ant-design/react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'
import { ScrollView } from 'react-native-gesture-handler';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = { "Table": [{ "id": 48, "uid": 15, "oid": 0, "headline": "head", "details": "", "addtime": "2010/0/0 20:35:56", "is_read": 0, "state": 0, "remark": "啊咯", "ispub": 1 }] }
type Props = {};
export default class memoDetailView extends Component<Props> {
    static thiz = this;
    static data;
    static navigationOptions = ({ navigation }) => {
        self = memoDetailView;
        const options = {
            quality: 1,
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };

        return {
            title: '备忘录详情',
            //   headerTitle: <Icon name={"alert"} size="lg" />,
            headerRight: (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("EditMemo", { memoid: navigation.getParam("id", null) })
                }}>
                    <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={"form"} size="lg" />
                    </View>
                </TouchableOpacity>
            ),
        };
    };


    constructor(props) {
        super(props);
        this.props.data = 1;
        this.state = {
            data: dataTest,

        };

    }

    componentDidMount() {
        const { navigation } = this.props;
        this.id = navigation.getParam('id', null);

        this._getMemoDetail();

        //收到监听
        this.updateDetaillistener = DeviceEventEmitter.addListener('memoUpdate', (e) => {
            this._getMemoDetail();
        });
    }
    componentWillUnmount() {
        // 移除监听 
        this.updateDetaillistener.remove();
    }
    _getMemoDetail() {
        httpApi.memoDetail(this.id).then(data => {
            if (JSON.stringify(data) != "{}") {
                this.setState({ data });
             
            }
        });
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>

                    <Image style={{ width: width, height: 130 }} source={require('../img/memorandum-icon.jpg')} />
                    <Text style={[styles.textStyle, {
                        position: 'absolute',
                        //    right:0,
                        top: 50,
                        alignSelf: 'center'

                    }]}>
                        {this.state.data.Table[0].headline}
                    </Text>
                    <Text style={[styles.textStyle, {
                        position: 'absolute',
                        top: 80,
                        alignSelf: 'center'
                    }]}>
                        {this.state.data.Table[0].addtime.split(" ")[0].replace(/\//g, "-")}
                    </Text>

                    <Text style={[{ fontSize: 18, color: 'black' }, { marginHorizontal: 10, marginVertical: 10 }]}>
                        {this.state.data.Table[0].details}
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        // backgroundColor: 'red',
    },
    textStyle: {
        fontSize: 20,
        color: 'white'

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
module.exports = memoDetailView;