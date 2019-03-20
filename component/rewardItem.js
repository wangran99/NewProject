import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Icon } from '@ant-design/react-native';
import { TouchableHighlight, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';

export default class rewardItem extends Component {

    render() {
        const { name, type, onPress } = this.props;
        let comp = null;
        if (type == 'gold')
            comp = <Image style={{ width: 100, height: 140 }} source={require('../img/gold.png')} resizeMode='contain'></Image>
        else if (type == 'silver')
            comp = <Image style={{ width: 80, height: 100 }} source={require('../img/silver.png')} resizeMode='contain'></Image>
        else
            comp = <Image style={{ width: 80, height: 100 }} source={require('../img/copper.png')} resizeMode='contain'></Image>


        return (
            <TouchableHighlight onPress={onPress} disabled>
                <View style={styles.containerStyle}>


                    <Text style={{ fontSize: 21, color: 'black' }}>
                        {name}
                    </Text>
                    {comp}
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        //  backgroundColor: 'blue',
        flex: 1,
        //flex布局
        justifyContent: 'center',
        alignItems: 'center',
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