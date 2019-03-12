

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Slider, StyleSheet, Text, ScrollView, Image, View, Alert, TouchableOpacity, PixelRatio } from 'react-native';
import { TextareaItem, Icon, SearchBar, } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

type Props = {};
export default class projectProcessAddView extends Component<Props> {

    static navigationOptions = {
        title: '添加项目进度',
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
            value: 0, //搜索关键词
            text: "",
            avatarSource: null,
            // equipmentList: equipmentListTest,
        };
        const { navigation } = this.props;
        this.id = navigation.getParam('id', 1);
        this.picNumber = "";
    }
    _onPressButton() {
        httpApi.projectProcessAdd(this.id, this.state.value, this.state.text, this.picNumber).then((data) => {
            let a = data.Table[0].Column1;
            if (a == 1000) {
                Alert.alert(
                    '成功',
                    '' + data.Table[0].Column2,
                    [
                        { text: 'OK', onPress: () => this.props.navigation.pop(2) },
                    ],
                    { cancelable: false }
                )
            } else
                alert(data.Table[0].Column2);
        });
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
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textStyle}>
                        项目当前进度
                </Text>
                    <View style={{ width: width, flexDirection: 'row' }}>
                        <Slider
                            style={{ flex: 1 }}
                            minimumValue={0}
                            step={1}
                            maximumValue={100}
                            value={this.state.value}
                            onValueChange={(value) => this.setState({ value })} />
                        <Text style={styles.textStyle}>
                            {this.state.value}%
                    </Text>
                    </View>
                    <Text style={styles.textStyle}>
                        项目当前进度说明
                    </Text>
                    <TextareaItem
                        style={{ marginHorizontal: 10 }}
                        rows={4} placeholder="进度说明"
                        onChange={(value) => this.setState({ text: value })} />
                    <Text style={styles.textStyle}>
                        上传当前进度图片
                    </Text>
                    <View style={[styles.textRowContainer, {}]}>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer, { marginLeft: 15, marginBottom: 30 }]}>
                                <Image style={styles.avatar} source={this.state.avatarSource} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'center', marginVertical: 35, width: width * 0.9 }}>
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
        // alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'lightgray',
    },
    textStyle: {
        fontSize: 17,
        color: 'black',
        marginVertical: 5,
        marginHorizontal: 10,
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
module.exports = projectProcessAddView;