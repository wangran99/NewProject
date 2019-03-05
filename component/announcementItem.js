import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Image, View, Alert } from 'react-native';

export default class announcementItem extends Component {

  render() {
    const { data, onPress } = this.props
    let tag = '';
    if (data.type == 0)
      tag = "【公告】";
    else if (data.type == 1)
      tag = "【通知】";
    if (data.type == 2)
      tag = "【技术资料】";


    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.containerStyle}>
          <View >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.headerStyle}>
                <Text style={{ fontSize: 17, color: 'black' }}>
                  {tag}
                </Text>
                <Text style={{ marginRight: 25, fontSize: 17, color: 'black' }}
                  numberOfLines={1}>
                  {data.headline}
                </Text>
              </View>
              <Text style={{
                fontSize: 14, color: 'red',
                borderWidth: data.status == 0 ? 1 : 0,
                borderRadius: 5, borderColor: 'red'
              }}> {data.status == 0 ? '未读' : ''}</Text>
            </View>

          </View>
          <Text style={{ fontSize: 16, marginTop: 5 }}
            numberOfLines={3}>
            {/* 发布的html原文去掉各种html标签，只显示内容 */}
            {data.details.replace(/<[^>]+>/g, "")}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    //  backgroundColor: 'blue',
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 10,
    //   justifyContent: 'center',
    //    alignItems: 'center',
    //  borderRadius: 8
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