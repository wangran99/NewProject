

import React, { Component } from 'react';
import { Button, CheckBox } from 'react-native-elements';
import { TextareaItem } from '@ant-design/react-native';
import { ScrollView, KeyboardAvoidingView, StyleSheet, Text, TextInput, Image, View, Alert, TouchableOpacity, PixelRatio } from 'react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "id": 24, "facilitycode": "8000078", "assetnumber": "无", "clientid": 11,
        "name": "杭州共基网络科技有限公司", "address": "江干区", "doorplate": "机房", "classift": "电脑",
        "brand": "联想", "model": "4650", "purchase": "1900/1/1 0:00:00", "upkeep": 0, "contacts": "", "orderid": 187,
        "ordertime": "2019/3/7 15:20:15", "phone": "121212366", "describe": "但是", "orderamount": 119.00,
        "orderstatus": 4, "ordertype": 1, "cause": "12", "orderlevel": 0
    }]
};
type Props = {};
export default class addOrderRepairReportView extends Component<Props> {

    static navigationOptions = {
        title: '维修报告',
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
            solution: null,
            replace: null,
            address: null,
            phenomena: '',
            handling: '',
            jthandling: '',
            peice: '',
            integral: '',
            integralex: '',
            rectype: null,
            img: '',
            avatarSource: ''//上传图片显示的小图标
        };
        this.picNumber = '';
    }

    _onPressButton() {
        // Alert.alert('You tapped the button!'+local.get("code"));
        // local.get('code').then((code) => {
        //     console.log("get code:"+ code);
        // });
        //    httpApi.personLogin(this.state.userName, this.state.password)
        httpApi.addOrderServiceReport('yhj', '123456')
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
        const orderId = navigation.getParam('orderId', 1);
        httpApi.getOrderDetails(orderId).then(data => {
            this.setState({ data });
        });
    }
    render() {
        let dt = this.state.data.Table[0];
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                 {/* <ScrollView> */}

                <View style={styles.container}>
                    <View style={[styles.textRowStyle, {}]}>
                        <Text style={styles.textStyle}>设备编码：</Text>
                        <Text style={styles.textStyle}>{dt.facilitycode}</Text>
                    </View>
                    <View style={[styles.textRowStyle, {}]}>
                        <Text style={styles.textStyle}>维修设备：</Text>
                        <Text style={styles.textStyle}>{dt.classift}</Text>
                    </View>
                    <View style={[styles.textRowStyle, { marginVertical: 1, alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>解决情况：</Text>
                        <CheckBox
                            title='已解决'
                            checked={this.state.solution}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ solution: true })}
                        />
                        <CheckBox
                            title='未解决'
                            checked={!this.state.solution}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ solution: false })}
                        />
                    </View>
                    <View style={[styles.textRowStyle, { marginVertical: 1, alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>是否更新配件：</Text>
                        <CheckBox
                            title='是'
                            checked={this.state.replace}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ replace: true })}
                        />
                        <CheckBox
                            title='否'
                            checked={!this.state.replace}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ replace: false })}
                        />
                    </View>
                    <View style={[styles.textRowStyle, { marginVertical: 1, alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>维修地点：</Text>
                        <CheckBox
                            title='现场'
                            checked={this.state.address}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ address: true })}
                        />
                        <CheckBox
                            title='带回'
                            checked={!this.state.address}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ address: false })}
                        />
                    </View>
                    <View style={[styles.textRowStyle, { alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>故障现象：</Text>
                    </View>
                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写故障现象'} value={this.state.phenomena} rows={4} onChange={(value) => this.setState({ phenomena: value })} ></TextareaItem >

                    <View style={[styles.textRowStyle, { alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>故障处理方法：</Text>
                    </View>
                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写故障处理方法'} value={this.state.handling} rows={4} onChange={(value) => this.setState({ handling: value })} ></TextareaItem >

                    <View style={[styles.textRowStyle, { alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>具体处理方法：</Text>
                    </View>
                    <TextareaItem style={[styles.textStyle, { marginHorizontal: 10, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'请填写具体处理方法'} value={this.state.jthandling} rows={4} onChange={(value) => this.setState({ jthandling: value })} ></TextareaItem >

                    <View style={[styles.textRowStyle, { alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>维修金额：</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]} keyboardType='numeric'
                            onChangeText={(peice) => this.setState({ peice })}></TextInput>
                    </View>
                    <View style={[styles.textRowStyle, { alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>积        分：</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]} keyboardType='numeric'
                            value={this.state.integral} onChangeText={(integral) => this.setState({ integral })}></TextInput>
                    </View>
                    <View style={[styles.textRowStyle, { alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>积      分2：</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, backgroundColor: 'white', borderRadius: 6 }]} keyboardType='numeric'
                            value={this.state.integralex} onChangeText={(integralex) => this.setState({ integralex })}></TextInput>
                    </View>

                    <View style={[styles.textRowStyle, { marginVertical: 1, alignItems: 'center' }]}>
                        <Text style={styles.textStyle}>收款方式：</Text>
                        <CheckBox
                            title='挂账'
                            style={{ borderColor: 'lightgray' }}
                            checked={this.state.rectype}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ rectype: true })}
                        />
                        <CheckBox
                            title='现金'
                            checked={!this.state.rectype}
                            textStyle={{ fontSize: 17 }}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            onPress={() => this.setState({ rectype: false })}
                        />
                    </View>
                    <View style={[styles.textRowStyle, {}]}>
                        <Text style={[styles.textStyle,]}>照片上传:</Text>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer, { marginLeft: 15, marginBottom: 10 }]}>
                                <Image style={styles.avatar} source={this.state.avatarSource} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/*登录*/}
                    <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                        <Button style={{ color: 'white' }} title="提交" onPress={this._onPressButton.bind(this)} />
                    </View>
                    {/*设置*/}

                </View>
                {/* </ScrollView> */}

            </KeyboardAwareScrollView>
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
        //  alignItems: 'center',
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
    textStyle: {
        fontSize: 18,
        color: 'black'
    },
    textRowStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row'
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
module.exports = addOrderRepairReportView;