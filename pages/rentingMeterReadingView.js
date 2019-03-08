

import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'
import { ScrollView } from 'react-native-gesture-handler';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{ "reading": 0, "readingex": 0, "reading_scan": 0, "readingA3": 0, "readingexA3": 0, "addtime": "2000/2/21 15:15:46", "img": "3359A4EB0A6B1E774EB92F5863058811.png", "cycle": 1 }],
    "Table1": [{ "rent": 1.00, "quota": 2, "quotaex": 0, "exceed": 1.000, "exceedex": 0.000, "scan": 0.000 }],
    "Table2": [{ "contractno": "888", "addtime": "2018-09-01", "timeremaining": "2019-12-01" }]
};
//保养抄表页面
type Props = {};
export default class rentingMeterReadingView extends Component<Props> {

    static navigationOptions = {
        title: '个人中心',
        /* No more header config here! */
    };
    // static code = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };

    constructor(props) {
        super(props);
        this.announcementPageIndex = 1;
        this.state = {
            data: dataTest,
            month: "1",
            remark: "",
            checked: false,
        }
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
        const { navigation } = this.props;
        const equipmentid = navigation.getParam('equipmentid', 1);
        httpApi.getRentLast(equipmentid).then((data) => {
            this.setState({ data, month: "" + data.Table[0].cycle });
        });
    }
    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.textRowContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                        <Text style={[styles.textStyle]}>上次抄表日期:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].addtime}</Text>
                    </View>
                    <View style={[styles.textRowContainer, { justifyContent: 'flex-start' }]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].reading}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期黑色读数'} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].readingex}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期彩色读数'} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].readingA3}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期黑色A3读数'} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].readingexA3}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期彩色A3读数'} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].reading_scan}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期扫描读数'} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>抄表月数</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入抄表月数'} keyboardType='numeric'
                            value={this.state.month}
                            onChangeText={(value) => this.setState({ month: value })}></TextInput>
                    </View>

                    <TextInput style={[styles.textStyle, { marginHorizontal: 10, marginVertical: 10, height: 155, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'输入备注信息'}
                        multiline={true}
                        onChangeText={(value) => this.setState({ remark: value })}></TextInput>

                    <View style={[styles.textRowContainer, { marginHorizontal: 10, flexDirection: 'row',alignItems:'center' }]}>
                        <Text style={[styles.textStyle]}>是否完成保养:</Text>
                        <CheckBox
                            title='是'
                            checked={this.state.checked}
                            textStyle={{fontSize:17}}
                            containerStyle={{backgroundColor:'transparent'}}
                            onPress={() => this.setState({ checked: true })}
                        />
                        <CheckBox
                            title='否'
                            checked={!this.state.checked}
                            textStyle={{fontSize:17}}
                            containerStyle={{backgroundColor:'transparent'}}
                            onPress={() => this.setState({ checked: false })}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: '#EFEFF4',
    },
    textRowContainer: {
        // marginLeft: 15,
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
module.exports = rentingMeterReadingView;