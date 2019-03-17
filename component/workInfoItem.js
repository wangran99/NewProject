import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Icon } from '@ant-design/react-native';
import { TouchableHighlight, StyleSheet, Text, TextInput, Image, View, Alert } from 'react-native';

export default class workInfoItem extends Component {

  render() {
    const { number, title, icon, onPress } = this.props

    return (
      <TouchableHighlight onPress={onPress} disabled>
        <View style={styles.containerStyle}>
          <Icon
            name={icon} size="md"
          />
          <Text style={{ fontSize: 20, color: '#5588EE' }}>
            {number}
          </Text>
          <Text style={{ fontSize: 17, }}>
            {title}
          </Text>
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