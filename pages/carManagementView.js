

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert, TouchableOpacity, PixelRatio,DeviceEventEmitter } from 'react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机
import { Dropdown } from 'react-native-material-dropdown';

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var dataTest = {
    "Table": [{ "id": 4, "licence": "浙H77777(出厂中)" },
    { "id": 6, "licence": "浙3231(出厂中)" }]
};
type Props = {};
export default class carManagementView extends Component<Props> {

    static navigationOptions = {
        title: '车辆管理',
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
            avatarSource: null,
            beforekilometre: '',
            // isRefreshing: false,
            // equipmentList: equipmentListTest,
        };
        this.carArray = [];
        this.licence = '';
        this.picNumber = '';
    }

    componentDidMount() {
        httpApi.getCarListUser("", "").then((data) => {
            data.Table.map((item) => {
                this.carArray.push({ value: item.licence, id: item.id })
            });
            //   alert( JSON.stringify( this.carArray));
            this.setState({ data })
        });
    }
    _onPressButton() {
        httpApi.postCarUse(this.licence, this.state.beforekilometre, this.picNumber)
            .then((data) => {
                let code = data.Table[0].Column1;
                if (code == 1000) {
                    DeviceEventEmitter.emit('kilometerStatisticsList',"jianting"); //发监听
                    Alert.alert(
                        '成功',
                        '' + data.Table[0].Column2,
                        [
                            { text: '确定', onPress: () => this.props.navigation.pop() },
                        ],
                        { cancelable: false }
                    )
                }
                else
                    Alert.alert('错误', JSON.stringify(data.Table[0].Column2));
            });


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

    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('code', 'NO-ID');
        return (
            <View style={styles.container}>
                <View style={[styles.textRowContainer, { alignItems: 'center', marginTop: 25 }]}>
                    <Text style={[styles.textStyle,]}>车牌号:</Text>
                    <View style={{ width: width - 20, }}>
                        <Dropdown
                            label=' 请选择自己的车牌号'
                            // value={this.state.selectedClientName}
                            data={this.carArray}
                            onChangeText={(value, index, data) => {
                                this.licence = this.carArray[index].id;
                            }} />
                    </View>
                </View>
                <View style={[styles.textRowContainer, { alignItems: 'center' }]}>
                    <Text style={[styles.textStyle,]}>出工前公里数</Text>
                    <TextInput style={[styles.textStyle, { flex: 1, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                    } placeholder={'输入出工前公里数'} onChangeText={(value) => this.setState({ beforekilometre: value })} keyboardType='numeric'></TextInput>
                </View>
                <View style={[styles.textRowContainer, {}]}>
                    <Text style={[styles.textStyle,]}>上传图片:</Text>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer, { marginLeft: 15, marginBottom: 30 }]}>
                            <Image style={styles.avatar} source={this.state.avatarSource} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.textRowContainer, styles.textStyle]}>出工前时间</Text>
                <View style={{ alignSelf: 'center', marginVertical: 35, width: width * 0.85 }}>
                    <Button title='提交' onPress={this._onPressButton.bind(this)}></Button>
                </View>
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
    textRowContainer: {
        flexDirection: 'row',
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
module.exports = carManagementView;