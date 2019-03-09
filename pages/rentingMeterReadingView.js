

import React, { Component } from 'react';
import { CheckBox, Button } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, Text, TextInput, Image, View, Alert, PixelRatio } from 'react-native';

import local from '../tools/storage'
import httpApi from '../tools/api'
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker'; //第三方相机
import { } from '@ant-design/react-native';

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
            blackNumber: '',
            colorNumber: '',
            blackA3Number: '',
            colorA3Number: '',
            scanNumber: '',
            month: "",
            remark: "",
            checked: false,
            avatarSource: null,
        }
        const { navigation } = this.props;
        this.equipmentid = navigation.getParam('equipmentid', 1);
        this.contractno = navigation.getParam('contractno', -1);
        this.picNumber = '';

    }

    caculate() {
        let quota = this.state.data.Table1[0].quota;
        let quotaex = this.state.data.Table1[0].quotaex;
        let rent = this.state.data.Table1[0].rent;
        let cycle = Number(this.state.month);
        let blackNumber = Number(this.state.blackNumber);
        let colorNumber = Number(this.state.colorNumber);
        let blackA3Number = Number(this.state.blackA3Number);
        let colorA3Number = Number(this.state.colorA3Number);
        let scanNumber = Number(this.state.scanNumber);
        let reading = this.state.data.Table[0].reading;
        let readingex = this.state.data.Table[0].readingex;
        let readingA3 = this.state.data.Table[0].readingA3;
        let readingexA3 = this.state.data.Table[0].readingexA3;
        let reading_scan = this.state.data.Table[0].reading_scan;
        let exceed = this.state.data.Table1[0].exceed;
        let exceedex = this.state.data.Table1[0].exceedex;
        let scan = this.state.data.Table1[0].scan;
        var money = 0;
        if (quota == "0" && quotaex == "0") {
            if ((rent * cycle) > ((blackNumber + blackA3Number - reading - readingA3) * exceed + (colorNumber + colorA3Number - readingex - readingexA3) * exceedex)) {
                money = Number(rent * cycle + (scanNumber - reading_scan) * scan);
            }
            else {
                money = Number((blackNumber + blackA3Number - reading - readingA3) * (exceed * 1000) / 1000 + (colorNumber + colorA3Number - readingex - readingexA3) * (exceedex * 1000) / 1000 + (scanNumber - reading_scan) * scan);
            }
        }
        else {
            money = Number(rent * cycle + (scanNumber - reading_scan) * scan);

            console.log("number11:" + (Number(blackNumber) + Number(blackA3Number) - reading - readingA3));
            console.log("number22:" + (quota * cycle));

            if ((blackNumber + blackA3Number - reading - readingA3) > (quota * cycle)) {
                money = Number(money) + (blackNumber + blackA3Number - reading - readingA3 - (quota * cycle)) * (exceed * 1000) / 1000;

            }

            if ((colorNumber + colorA3Number - readingex - readingexA3) > quotaex * cycle) {
                money += (colorNumber + colorA3Number - readingex - readingexA3 - (quotaex * cycle)) * (exceedex * 1000) / 1000;
            }

        }
        return String(money);
    }
    _onPressButton() {
        if (this.state.blackNumber == "" && this.state.colorNumber == "" && this.state.blackA3Number == "" &&
            this.state.colorA3Number == "" && this.state.scanNumber == "") {
            alert("请输入正确的保养读数！");
            return;
        }
        if (!this.state.checked) {
            alert("请选择保养进程");
            return;
        }
        if (!this.state.month) {
            alert("请输入正确的抄表月数");
            return;
        }
        Alert.alert(
            '抄表信息确认',
            "月租：" + this.state.data.Table1[0].rent + "元\r\n" + this.caculate() +
            "黑色保底张数：" + this.state.data.Table1[0].quota + "\r\n" +
            "黑色超张费/元/张：" + this.state.data.Table1[0].exceed + "\r\n" +
            "彩色保底张数：" + this.state.data.Table1[0].quotaex + "\r\n" +
            "彩色超张费/元/张：" + this.state.data.Table1[0].exceedex + "\r\n" +
            "扫描费/元/张：" + this.state.data.Table1[0].scan + "\r\n" +
            "抄表月数：" + this.state.month + "个月\r\n" +

            "本期黑色读数：" + this.state.blackNumber + " 本期张数：" + (this.state.blackNumber - this.state.data.Table[0].reading) + "\r\n" +
            "本期彩色读数：" + this.state.colorNumber + " 本期张数：" + (this.state.colorNumber - this.state.data.Table[0].readingex) + "\r\n" +
            "本期黑色A3读数：" + this.state.blackA3Number + " 本期张数：" + (this.state.blackA3Number - this.state.data.Table[0].readingA3) + "\r\n" +
            "本期彩色A3读数：" + this.state.colorA3Number + " 本期张数：" + (this.state.colorA3Number - this.state.data.Table[0].readingexA3) + "\r\n" +
            "本期扫描读数：" + this.state.scanNumber + " 本期张数：" + (this.state.scanNumber - this.state.data.Table[0].reading_scan) + "\r\n" +
            "合计金额：" + String(this.caculate())+"元",
            [{ text: "重填", onPress: () => console.log('chongtian Pressed') },
            {
                text: "确定", onPress: () => {
                    httpApi.RentMeterReading(this.contractno, Number(this.state.blackNumber),
                        Number(this.state.colorNumber), this.state.checked ? 1 : 0, this.equipmentid,
                        Number(this.state.blackA3Number), Number(this.state.colorA3Number),
                        Number(this.state.scanNumber), Number(this.state.month), this.picNumber,
                        this.state.remark).then((data) => {
                            if (data.Table[0].Column1 == 1000) {
                                this.props.navigation.pop(2);
                            }
                            else
                                Alert.alert('错误', JSON.stringify(data.Table[0].Column2));
                        });
                }
            }]

        )


    }

    componentDidMount() {
        httpApi.getRentLast(this.equipmentid).then((data) => {
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
                        } placeholder={'输入本期黑色读数'} onChangeText={(value) => this.setState({ blackNumber: value })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].readingex}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期彩色读数'} onChangeText={(value) => this.setState({ colorNumber: value })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].readingA3}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期黑色A3读数'} onChangeText={(value) => this.setState({ blackA3Number: value })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].readingexA3}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期彩色A3读数'} onChangeText={(value) => this.setState({ colorA3Number: value })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上期读数:{this.state.data.Table[0].reading_scan}</Text>
                        <TextInput style={[styles.textStyle, { fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入本期扫描读数'} onChangeText={(value) => this.setState({ scanNumber: value })} keyboardType='numeric'></TextInput>
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

                    <View style={[styles.textRowContainer, { marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.textStyle]}>是否完成保养:</Text>
                        <CheckBox
                            title='是'
                            checked={this.state.checked}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ checked: true })}
                        />
                        <CheckBox
                            title='否'
                            checked={!this.state.checked}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ checked: false })}
                        />
                    </View>

                    <View style={[styles.textRowContainer, { flexDirection: 'row' }]}>
                        <Text style={[styles.textStyle]}>拍照上传</Text>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer, { marginLeft: 15, marginBottom: 30 }]}>
                                {this.state.avatarSource === null ? <Text>选择照片</Text> :
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.textRowContainer, { flexDirection: 'row' }]}>
                        <Text style={styles.textStyle}>上次图片 </Text>
                        <Image style={[styles.avatar, { marginLeft: 15 }]} source={{ uri: ("http://ys2.glk119.com/upload/images/" + this.state.data.Table[0].img) }} />
                    </View>
                    <View style={[styles.textRowContainer, { marginBottom: 30 }]}>
                        <Button title='确认提交' onPress={this._onPressButton.bind(this)}></Button>
                    </View>
                </View>
            </ScrollView>
        );
    }

    //选择图片
    selectPhotoTapped() {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            // customButtons: [
            //     {name: 'fb', title: 'Choose Photo from Facebook'},
            //   ],
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 800,
            maxHeight: 1000,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                httpApi.uploadPic(response.data).then((data) => {
                    if (data.data0 == 1000)
                        this.picNumber = data.data1;
                    else
                        alert(data.data1);
                });
                this.setState({
                    avatarSource: source
                });
            }
        });
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
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        // borderRadius: 50,
        width: 100,
        height: 100
    },
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
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