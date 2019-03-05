

import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Platform, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-material-dropdown';

import local from '../tools/storage'
import httpApi from '../tools/api'

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

type Props = {};
// 工单转派页面
export default class orderTransferView extends Component<Props> {

    static navigationOptions = {
        title: '工单转派',
        /* No more header config here! */
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            userArray: [],
        };

        const { navigation } = this.props;
        this.orderId = navigation.getParam('orderId', 1);
        this.toUid = 0;
    }

    componentDidMount() {
        httpApi.getUserList('').then((data) => {
            var arr = new Array();
            data.Table.map((item) => {
                arr.push({ value: item.username, id: item.id })
            });

            this.setState({ data, userArray: arr });
        });
    }
    _onPressButton() {

        httpApi.transferOrder(this.orderId, this.toUid)
            .then((data) => {
                this.props.navigation.goBack();
            });
        //   this.props.navigation.navigate('UserLogin');
    }
    render() {
        let data = [{
            value: 'Banana',
        }, {
            value: 'Mango',
        }, {
            value: 'Pear',
        }];
        return (
            <View style={styles.container}>
                <View flexDirection='row' alignItems='center'>
                    <Text style={{ fontSize: 18, marginVertical: 5 }}>请选择技术员:</Text>
                    <View style={{ flex: 1 }}>
                        {/* <ModalDropdown textStyle={{ fontSize: 18 }} dropdownStyle={{ fontSize: 27 }}
                            renderRow={(option, index, isSelected) => {
                                return <View style={{flex:1}}>
                                    <Text style={{ fontSize: 18, }}>你好</Text>
                                </View>
                            }}
                            options={['option 1', 'option 2']} /> */}
                        <Dropdown
                            label=' 人员列表'
                            data={this.state.userArray}
                            onChangeText={(value, index, data) => {
                                this.toUid = data[index].id;
                            }}
                        />
                    </View>

                </View>
                <Button style={{ marginHorizontal: 20 }} title="提交" onPress={this._onPressButton.bind(this)}></Button>
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
    textStyle: {
        fontSize: 18,
        backgroundColor: 'white'
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
module.exports = orderTransferView;