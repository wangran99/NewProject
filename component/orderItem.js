import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';

export default class orderItem extends Component {

    render() {
        const { data, onPress } = this.props
        let type = '';
        if (data.ordertype == 0)
            type = "【安装】";
        else if (data.ordertype == 1)
            type = "【维修】";
        if (data.ordertype == 2)
            type = "【送货】";
        else if (data.ordertype == 3)
            type = "【临修】";

        let emergency = '';
        if (data.orderlevel == 1)
            emergency = "【急】";

        return (
            <TouchableOpacity  onPress={onPress}>
                <View style={styles.containerStyle}>
                    <View style={{marginTop:10, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'red' }}>
                            {emergency}
                        </Text>
                        <Text style={{ marginRight: 16, fontSize: 18, color: 'black' }}
                            numberOfLines={1}>
                            {data.clientname + type}
                        </Text>
                    </View>
                    <View alignItems='center'>
                        <Text style={{ fontSize: 16, color: 'black', marginVertical: 10, }}>{data.address}</Text>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            marginBottom:10,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: 'white',
                            paddingVertical: 5,
                            paddingHorizontal: 25
                        }}>点击查看详情</Text>
                    </View>
                </View>

            </TouchableOpacity >


            // <View style={{backgroundColor:'blue'}}>
            //     <Text>1237897907907</Text>
            // </View>

        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#66CCFF',
        flex: 1,
         marginHorizontal: 8,
         marginVertical: 10,
        //   justifyContent: 'center',
        //    alignItems: 'center',
         borderRadius: 9
    },
    headerStyle: {
        //  backgroundColor: 'blue',
        flex: 1,
        flexDirection: 'row',
        //   justifyContent: 'center',
        //    alignItems: 'center',
        //  borderRadius: 8
    },
    header: {
        //   height: 60,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 40,
        alignItems: 'center',
        flexDirection: 'row',
    }
})