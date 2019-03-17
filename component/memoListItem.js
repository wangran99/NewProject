import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class memoListItem extends Component {

    render() {
        const { data, onPress } = this.props
        let state = data.state;
        let backgroundColor = (state == 0 ? "red" : "black");
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.containerStyle} onPress={onPress}>
                    <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: 'row', }}>
                        <Text style={[styles.textStyle, { fontSize: 20, color: backgroundColor }]} numberOfLines={1}>
                            {data.headline}
                        </Text>
                        <Text style={[styles.textStyle, {
                            position: 'absolute',
                            right: 3,
                        }]} numberOfLines={1}>
                            {data.addtime.replace(/\//g, "-").split(" ")[0]}
                        </Text>
                    </View>
                    <Text style={[styles.textStyle, { marginBottom: 10, marginHorizontal: 10, color: backgroundColor }]} numberOfLines={3}> {data.details}</Text>
                    {/* <Image style={{width:60,height:60, backgroundColor:'blue',borderRadius:30}}  source={require('../img/new-memorandum.png')}></Image> */}
                </View>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        flex: 1,
        marginHorizontal: 6,
        marginVertical: 2,
        //   justifyContent: 'center',
        //    alignItems: 'center',
        borderRadius: 8
    },
    textStyle: {
        fontSize: 18,
        color: 'black'
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