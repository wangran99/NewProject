

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
    Vibration, Animated,
    Easing, InteractionManager, StyleSheet, Text, TouchableHighlight, View
} from 'react-native';
import { RNCamera, Camera } from 'react-native-camera';

var Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');

type Props = {};
export default class barCodeCameraView extends Component<Props> {
    static navigationOptions = {
        title: '扫描条码',
        /* No more header config here! */
    };
    constructor(props) {
        super(props);
        this.state = {
            enable: false,
            transCode: '', // 条码
            type: '', // 条码类型
            show: true,
            animate: new Animated.Value(0), // 二维坐标{x:0,y:0}
        }
        this.barcode = '';
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.startAnimation()
        })
    }
    // 动画开始
    startAnimation() {
        if (this.state.show) {
            this.state.animate.setValue(0);
            Animated.timing(this.state.animate, {
                toValue: 1,   // 运动终止位置，比值
                duration: 2500,  // 动画时长
                easing: Easing.linear,  // 线性的渐变函数
                delay: 0.5,// 在一段时间之后开始动画（单位是毫秒），默认为0
            }).start(() => this.startAnimation())
        }
    }
    componentWillUnmount() {
        this.state.show = false;
    }
    barcodeReceived(e) {
        if (this.state.show && this.barcode !== e.data) {
            // Vibration.vibrate([0, 500, 1000, 500],false)
            Vibration.vibrate();
            console.log(e);

            this.barcode = e.data;
            const { navigation } = this.props;
            const from = navigation.getParam('from', '');
            if (from == "equipmentListView")
                navigation.navigate("AddNewEquipment", { data: e });
            else if (from == "orderRepairDetailView")
                navigation.navigate("OrderRepairReplenish", { data: e });
            else if (from == "orderInstallDetailView")
                navigation.navigate("OrderInstallReplenish", { data: e });
            else if (from == "mainView")
                navigation.navigate("CallForRepair", { data: e });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    onCameraReady={() => {
                        console.log('ready')
                    }}
                    permissionDialogTitle={'扫码需要摄像头权限'}
                    permissionDialogMessage={'请给与软件使用摄像头权限'}
                    // barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                    captureAudio={false}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                    style={styles.camera}
                >
                    <View style={styles.box}>
                        <View style={styles.kuang}>
                            <Animated.View style={{
                                alignItems: 'center',
                                transform: [{
                                    // translateX: x轴移动
                                    // translateY: y轴移动
                                    translateY: this.state.animate.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 200]
                                    })
                                }]
                            }}>
                                <Text style={{ width: 250, height: 1, backgroundColor: '#00ff00' }}></Text>
                            </Animated.View>
                        </View>
                        <Text style={{
                            marginTop: 5, alignSelf: 'center', fontSize: 15,
                            color: 'lightgray'
                        }}>将二维码/条码放入框内,即可自动扫描</Text>
                    </View>
                    {/* <View style={styles.info}>
                        <Text>条码信息：{this.state.transCode}</Text>
                        <Text>条码类型：{this.state.type}</Text>
                    </View> */}
                </RNCamera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    kuang: {
        width: 260,
        height: 260,
        borderWidth: 1,
        borderColor: 'skyblue',
        backgroundColor: '#rgba(255,255,255,0.1)'
    },
    info: {
        width: width,
        height: 80,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingBottom: 5,
        justifyContent: 'space-around',
    }
});



//输出一个类
module.exports = barCodeCameraView;