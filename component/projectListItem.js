import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';
// import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

// var width = Dimensions.get('window').width;

export default class projectListItem extends Component {

    render() {
        const { data, onPress } = this.props

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.containerStyle} onPress={onPress}>
                    <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle]}>工程名称:</Text>
                        <Text style={[styles.textStyle]} numberOfLines={1}>
                            {data.projectname}
                        </Text>
                        <View style={{
                            position: 'absolute',
                            //   left: 20,
                            top: 0,
                            right: 7,
                            //  marginLeft: 30
                        }} >
                            <Button title="进 度" onPress={onPress}></Button>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 10, height: 1, backgroundColor: 'lightgray' }}></View>

                    <View style={{ marginHorizontal: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>项目名称:</Text>
                        <Text style={[styles.textStyle]}>{data.itemsname}</Text>
                    </View>
                    <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={[styles.textStyle]}>时       间:</Text>
                        <Text style={[styles.textStyle]}>{data.addtime.replace(/\//g, "-").split(" ")[0]}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        flex: 1,
        marginHorizontal: 6,
        marginVertical: 10,
        //   justifyContent: 'center',
        //    alignItems: 'center',
        borderRadius: 9
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