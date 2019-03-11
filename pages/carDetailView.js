

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, TextInput, Image, View, Alert, TouchableOpacity, PixelRatio, ScrollView } from 'react-native';
import { Button as ADButton } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

var dataTest = {
    "Table": [{
        "addtime": "2019/3/7 20:46:03", "username": "", "beforekilometre": 10.00,
        "beforetime": "2019/3/7 20:46:03", "beforeimg": "D884B0C33F8EBBCD40B22256FED1FB17.png",
        "Afterkilometre": "", "Aftertime": "", "Afterimg": "", "countkilometre": "", "status": 1, "state": 0,
        "licence": "浙3231"
    }]
};
type Props = {};
export default class carDetailView extends Component<Props> {

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
            isRefreshing: false,
            kilometer: '',
            avatarSource: null,
        };
        this.picNumber = '';
        const { navigation } = this.props;
        this.id = navigation.getParam('id', 1);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 1);
        httpApi.getCarDetail(id).then((data) => {
            this.setState(data)
        });
    }
    _onPressButton() {
        httpApi.postCarReturn(this.id, this.state.kilometer, this.picNumber)
            .then((data) => {
                let code = data.Table[0].Column1;
                if (code == 1000) {
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
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ backgroundColor: 'red', alignSelf: 'center', marginVertical: 10, width: width * 0.85 }}>
                        <ADButton type="warning" onPress={() => { this.props.navigation.pop(); }}>公里数统计</ADButton>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>车牌号:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].licence}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>出工前公里数:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].beforekilometre}</Text>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>上传图片:</Text>
                        <Image style={{ width: 100, height: 100 }} source={{ uri: ("http://ys2.glk119.com/upload/images/" + this.state.data.Table[0].beforeimg) }} ></Image>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>出工前时间:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].beforetime}</Text>
                    </View>
                    <View style={[styles.textRowContainer, { alignItems: 'center' }]}>
                        <Text style={[styles.textStyle,]}>出工后公里数:</Text>
                        <TextInput style={[styles.textStyle, { flex: 1, fontSize: 18, borderWidth: 1, backgroundColor: 'white', borderRadius: 6, borderColor: 'lightgray' }]
                        } placeholder={'输入公里数'} onChangeText={(value) => this.setState({ kilometer: value })} keyboardType='numeric'></TextInput>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>照片上传:</Text>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer, { marginLeft: 15, marginBottom: 30 }]}>
                                <Image style={styles.avatar} source={this.state.avatarSource} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.textRowContainer, {}]}>
                        <Text style={[styles.textStyle,]}>出工后时间:</Text>
                        <Text style={[styles.textStyle]}>{this.state.data.Table[0].Aftertime}</Text>
                    </View>

                    <View style={{ alignSelf: 'center', marginVertical: 35, width: width * 0.85 }}>
                        <Button style={{ color: 'white' }} title="确认提交" onPress={this._onPressButton.bind(this)} />
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //    alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
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
module.exports = carDetailView;