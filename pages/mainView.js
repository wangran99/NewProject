

import React, { Component } from 'react';
import { ListItem, SearchBar as ElementSearchBar } from 'react-native-elements';
import { Carousel, Icon, SearchBar, TabBar, Grid, Button } from '@ant-design/react-native';
import {
    FlatList, StyleSheet, Text, Keyboard, TouchableOpacity, Image, View, ScrollView,
    Alert, AsyncStorage, StatusBar, RefreshControl, DeviceEventEmitter
} from 'react-native';
import _ from 'lodash'
import local from '../tools/storage'
import httpApi from '../tools/api'
import WorkInfoItem from '../component/workInfoItem'
import AnnouncementItem from '../component/announcementItem'
import OrderItem from '../component/orderItem'
import DismissKeyboardView from '../component/dismissKeyboardView'
import { TextInput } from 'react-native-gesture-handler';


var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const data1 = Array.from(new Array(15)).map((_val, i) => ({
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: `Name${i}`,
}));
const data = [{
    name: 'alert',
    text: `指派单`,
}, {
    name: 'http://www.glk119.com/UploadFile/images/15159C480396D49FA6793C2B7C363843.png',
    text: `单据管理`,
}, {
    name: 'alipay-circle',
    text: `车辆管理`,
}, {
    name: 'alipay-circle',
    text: `租机抄表`,
}, {
    name: 'alipay-circle',
    text: `添加设备`,
}, {
    name: 'alipay-circle',
    text: `工程管理`,
}, {
    name: 'alipay-circle',
    text: `维修经验`,
}, {
    name: 'alipay-circle',
    text: `备忘录`,
}, {
    name: 'alipay-circle',
    text: `维修工单`,
}, {
    name: 'alipay-circle',
    text: `送货工单`,
}, {
    name: 'alipay-circle',
    text: `安装工单`,
}, {
    name: 'alipay-circle',
    text: `业务员派单`,
}, {
    name: 'alipay-circle',
    text: `技术资料`,
}, {
    name: 'alipay-circle',
    text: `业务公开`,
}];

var announcementTest = {
    "Table": [],
    "Table1": [{ "counts": 3, "pagecounts": 1 }]
}

var orderListTest = {
    "Table": [],
    "Table1": [{ "counts": 3, "pagecounts": 1 }]
}
    ;
type Props = {};
export default class mainView extends Component<Props> {

    searchStr = "";
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.title : '工作台',
        }
    }
    constructor(props) {
        super(props);
        this.announcementPageIndex = 1;
        this.state = {
            selectedTab: 'workTab',
            //    data: ['1', '2', '3'],
            //   imgHeight: 176,
            keys: '',
            entries: [
                require('../img/companyLogin.jpg'),
                require('../img/userLogin.jpg'),
                require('../img/companyLogin.jpg')
            ],
            //   activeSlide: 1
            personInfo: {
                "Table": [{ "jobnumber": "laowang", "userphone": "13362001700" }],
                "Table1": [{ "c_Name": "浙江省测试用户科技有限公司" }]
            },
            // 用相应的clone方法设置datasource的初始值
            // 创建ListView datasource数据源
            announcement: announcementTest,
            orderList: orderListTest,
            isRefreshing: false,

        };

    }

    componentDidMount() {
        // this._navListener = this.props.navigation.addListener('didFocus', () => {
        //     StatusBar.setBarStyle('light-content');
        //     isAndroid && StatusBar.setBackgroundColor('#6a51ae');
        //   });

        console.log("componentDidMount1111");
        // httpApi.getAnnouncement().then((data) => {
        //     Alert.alert('错误', JSON.stringify(data));
        //  });
        httpApi.getPersonInfo().then((personInfo) => {
            // Alert.alert('person name:' + personInfo.Table[0].jobnumber, JSON.stringify(personInfo));
            this.setState({ personInfo })
        });
        this.refreshgetAnnouncement("");
        this.getOrderList();
        //收到监听
        this.updateOderListlistener = DeviceEventEmitter.addListener('orderList', (e) => {
            this.getOrderList();
        });
        this.updateAnnouncementListlistener = DeviceEventEmitter.addListener('announcementList', (e) => {
            this.refreshgetAnnouncement("");
        });
    }
    componentWillUnmount() {
        // 移除监听 
        this.updateOderListlistener.remove();
        this.updateAnnouncementListlistener.remove();
    }
    _getAnnouncement(page, keys) {
        httpApi.getAnnouncement(page, keys).then((data) => {
            Alert.alert('错误', JSON.stringify(data));
        });
        Keyboard.dismiss;
    }
    dismissKeyboardClick() {

    }
    renderAnnouncementView() {
        let test = 1;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* <ScrollView style={{ width: width, height: height, backgroundColor: 'blue' }} keyboardShouldPersistTaps={'never'}>
                    <View style={{ width: width, height: height, backgroundColor: 'blue' }}>
                        <TouchableOpacity backgroundColor='red' activeOpacity={1.0} onPress={this.dismissKeyboardClick.bind(this)}>
                            <SearchBar value={this.state.searchContent}
                                placeholder="请输入搜索内容11"
                                onChange={(value) => {
                                    this.setState({ searchContent: value });
                                }}
                                onCancel={this.clear}
                                onSubmit={this._getAnnouncement.bind(this,1)} />
                        </TouchableOpacity>
                    </View>
                </ScrollView> */}
                <TouchableOpacity backgroundColor='red' activeOpacity={1.0} onPress={this.dismissKeyboardClick.bind(this)}>

                    <SearchBar placeholder="请输入搜索内容"
                        ref="searchBar"
                        // inputRef={(searinput) => this.searinput = searinput}
                        onChange={(value) => {
                            this.setState({ keys: value });
                        }}
                        onCancel={this.clear.bind(this)}
                        onSubmit={this.refreshgetAnnouncement.bind(this, this.state.keys)}
                    >
                    </SearchBar>
                </TouchableOpacity>
                {/* <View style={{ marginTop: 2, width: width }}>
                    <ElementSearchBar
                        style={{
                            backgroundColor: "white",
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent',
                            borderColor: "red",
                            borderWidth: 1,
                        }}
                        ref={(elemsearchBar) => this._elemsearchBar = elemsearchBar}
                        containerStyle={{
                            backgroundColor: 'white',
                            borderWidth: 0, //no effect
                            shadowColor: 'white', //no effect
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent'
                        }}
                        inputStyle={{
                            backgroundColor: 'white',
                            borderWidth: 0, //no effect
                            shadowColor: 'white', //no effect
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent'
                        }}
                        placeholder="99999"
                        onCancel={
                            (value) => {
                                let a = 1;
                                this.clear();
                            }}

                        onClear={
                            (value) => {
                                let a = 1;
                                this.clear();
                            }}
                        onBlur={() => {

                        }}
                        onChangeText={this.updateSearch}
                        value={this.state.searchContent} />
                </View>
                <TextInput ref={(input) => this.input = input}></TextInput> */}
                <View style={{ backgroundColor: 'lightgray', marginTop: 0, width: width }}
                    onPress={this.clear.bind(this)}>
                    <Text style={styles.titleText} onPress={this.clear.bind(this)}> 公告列表</Text >
                </View>

                {/* <View style={{ flex: 1, width: width, }}> */}
                <FlatList
                    style={{ flex: 1, marginTop: 2 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.refreshgetAnnouncement.bind(this)}
                    onEndReached={this.fetchMoreAnnouncement.bind(this)}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this.refreshgetAnnouncement()}
                                activeOpacity={0.3}>
                                <View style={{ flex: 1, height: 350, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                    {/* <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View> */}
                                    <Image style={{
                                        width: 80,
                                        height: 80,
                                    }} source={require('../img/refresh.jpg')}></Image>
                                    <Text style={{ marginTop: 20, fontSize: 20 }}>请点击或下拉刷新</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            this.state.announcement.Table.length !== 0 ?
                                <View style={{ marginTop: 30, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.announcement.Table}
                    renderItem={({ item }) => <AnnouncementItem data={item} style={{ margin: 22 }}
                        onPress={() => {
                            let a = 0;
                            let b = item;
                            this.props.navigation.navigate('NewsDetail', { id: item.id, type: item.type });
                        }} />}
                    removeClippedSubviews={true}
                />
                {/* </View> */}
            </View >
        );
    }
    refreshgetAnnouncement(keys) {
        this.announcementPageIndex = 1;
        httpApi.getAnnouncement(1, keys).then((data) => {
            this.setState({
                announcement: data
            });
            this.clear();
            this.announcementPageIndex++;
        });

        this.setState({ isRefreshing: false });
    }
    clear() {
        this.setState({ keys: '' });
        // console.warn("cancel antd");
        this.refs.searchBar.inputRef.clear();
        this.refs.searchBar.inputRef.blur();
        Keyboard.dismiss
    }
    fetchMoreAnnouncement() {
        let a = this.state.keys;
        if (this.announcementPageIndex > this.state.announcement.Table1[0].pagecounts)
            return;
        httpApi.getAnnouncement(this.announcementPageIndex).then((data) => {
            //  let b = JSON.stringify(this.state);
            let newArry = this.state.announcement.Table.concat(data.Table);
            this.state.announcement.Table = newArry;
            this.clear();
            this.announcementPageIndex++;
        });
    }

    renderOrderView() {
        //   Alert.alert("cuowu",JSON.stringify(this.state.orderList.Table.length));

        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                {/* <SearchBar placeholder="OrderView" showCancelButton /> */}
                {this.state.orderList.Table && this.state.orderList.Table.length !== 0 ?
                    <View alignItems='center'>
                        <Text style={{ margin: 2, fontSize: 20 }} alignSelf='center'>出门请核对物料</Text>
                    </View> : null
                }
                <FlatList
                    style={{ marginTop: 0 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.getOrderList.bind(this)}
                    // onEndReached={this.fetchMoreAnnouncement.bind(this)}
                    // onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this.getOrderList()}
                                activeOpacity={0.3}>
                                <View style={{ flex: 1, height: 350, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                    {/* <View style={{ flex: 1, backgroundColor: 'lightgray' }}></View> */}
                                    <Image style={{
                                        width: 80,
                                        height: 80,
                                    }} source={require('../img/refresh.jpg')}></Image>
                                    <Text style={{ marginTop: 20, fontSize: 20 }}>请点击或下拉刷新</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            this.state.orderList.Table && this.state.orderList.Table.length !== 0 ?
                                <View style={{ marginTop: 30, marginBottom: 25 }}>
                                    <View style={{ height: 1, backgroundColor: 'lightgray' }}></View>
                                    <Text style={{ alignSelf: 'center', marginTop: 20 }}>没有数据了</Text>
                                </View> : null
                        )
                    }}
                    data={this.state.orderList.Table}
                    renderItem={({ item }) => <OrderItem data={item} style={{ margin: 22 }}
                        onPress={() => {
                            let a = 0;
                            let b = item;
                            this.props.navigation.navigate('OrderDetail', { id: item.id });
                        }} />}
                    removeClippedSubviews={true}
                />
            </View>
        );
    }

    getOrderList() {
        let a = 1;
        httpApi.getOrderQiang().then((data) => {
            this.setState({
                orderList: data
            });
        });
    }

    renderWorkView() {
        let slideImageHight = 190;
        return (<ScrollView>
            <View style={{
                flex: 1, // alignItems: 'center',
                //  backgroundColor: 'black'
            }}>
                <Carousel
                    style={{ marginTop: 0 }}
                    selectedIndex={2}
                    autoplay
                    infinite
                    autoplayInterval={3000}
                //    afterChange={this.onHorizontalSelectedIndexChange}
                >
                    <Image style={{ width: width, height: slideImageHight }} source={require('../img/slide0.png')} resizeMode='cover'></Image>
                    <Image style={{ width: width, height: slideImageHight }} source={require('../img/slide1.png')} resizeMode='contain'></Image>
                    <Image style={{ width: width, height: slideImageHight }} source={require('../img/slide2.png')} resizeMode='stretch'></Image>

                </Carousel>

                <View style={{ flex: 1, alignItems: 'center', }}>
                    {/* <Text>Grideview</Text> */}
                    <Grid
                        data={data}
                        columnNum={4}
                        itemStyle={{ fontSize: 10, }}
                        styles={[styles.text]}
                        renderItem={(el, index) => {
                            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                                <Icon name={el.name} size="lg"></Icon>
                                <Text style={{ fontSize: 16 }}>{el.text}</Text>
                            </View>
                        }}
                        onPress={(el, index) => this._onPressWorkGridItem(index)}
                    />
                </View>
            </View>
        </ScrollView>
        );
    }

    _onPressWorkGridItem(index) {
        if (index == 0)
            this.props.navigation.navigate("OrderPai");
        else if (index == 1)
            this.props.navigation.navigate("DanjuList");
    }
    renderMyView() {
        const list = [
            {
                name: '单据查询',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Vice President'
            },
            {
                name: '个人信息',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
            },
            {
                name: '修改密码',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
            },
        ];
        return (
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                    {/*{头像}*/}
                    <Image source={require('../img/userLogin.jpg')} style={styles.iconStyle} />
                    <Text style={[styles.nameText,]}>{this.state.personInfo.Table[0].username}</Text>
                    <View style={{ backgroundColor: 'lightgray', marginTop: 10, width: width }}>
                        <Text style={styles.titleText} > 业务信息</Text >
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="已接工单" number="12" source={require('../img/userLogin.jpg')} onPress={this._onPressMyGridItem.bind(this, 0)} />
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="累计金额" number="100" source={require('../img/companyLogin.jpg')} onPress={this._onPressMyGridItem.bind(this, 1)} />
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="累计积分" number="123" source={require('../img/userLogin.jpg')} onPress={this._onPressMyGridItem.bind(this, 2)} />
                        </View>
                        <View style={{ flex: 1, }} >
                            <WorkInfoItem title="累计积分" number="8" source={require('../img/companyLogin.jpg')} onPress={this._onPressMyGridItem.bind(this, 3)} />
                        </View>
                        {/* <Image source={require('../img/userLogin.jpg')} style={styles.iconStyle} /> */}
                    </View>

                    <View style={{ width: width, backgroundColor: 'white' }}>
                        {
                            list.map((l, i) => (
                                <ListItem
                                    key={i}
                                    //    leftAvatar={{ source: { uri: l.avatar_url } }}
                                    title={l.name}
                                    //    subtitle={l.subtitle}
                                    chevron
                                    topDivider
                                    bottomDivider
                                    onPress={this._onPressMyListItem.bind(this, i)}
                                />
                            ))
                        }
                    </View>
                    <View style={styles.logoutBtnStyle}>
                        <Button type="warning" onPress={this._onPressLogoutButton.bind(this)}>退出</Button>
                    </View>
                    {/* <Button activeStyle={{ backgroundColor: 'blue' }}>你好</Button> */}
                </View >
            </ScrollView>
        );
    }
    _onPressMyListItem(index) {
        alert("list item index" + index);
        //   this.props.navigation.navigate('UserLogin');
    }
    _onPressMyGridItem(index) {
        //    alert("my grid item index" + index);
        console.log("pressed my grid item index:" + index);
        //   this.props.navigation.navigate('UserLogin');
    }
    _onPressLogoutButton() {
        //    local.remove("cookie");
        local.remove("account").then(() => {
            return local.remove("username");
        }).then(() => {
            return local.remove("username");
        }).then(() => {
            return local.remove("password");
        }).then(() => {
            return local.remove("uid");
        }).then(() => {
            httpApi.logout();
            this.props.navigation.navigate('Auth');
        }).catch((value) => {
            let a = value;
        });
    }
    onChangeTab(tabName) {
        this.setState({
            selectedTab: tabName,
        });
        let title = '';
        if (tabName === 'announcementTab')
            title = "公告栏";
        else if (tabName === 'orderTab')
            title = "抢单";
        else if (tabName === 'workTab')
            title = "工作台";
        else if (tabName === 'myTab')
            title = "个人中心";
        this.props.navigation.setParams({ title: title });
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="#f5f5f5"
            >
                <TabBar.Item
                    title="公告栏"
                    icon={<Icon name="ordered-list" />}
                    selected={this.state.selectedTab === 'announcementTab'}
                    onPress={() => this.onChangeTab('announcementTab')}
                >
                    {this.renderAnnouncementView()}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name='bell' />}
                    title="抢单"
                    badge={2}
                    selected={this.state.selectedTab === 'orderTab'}
                    onPress={() => this.onChangeTab('orderTab')}
                >
                    {this.renderOrderView()}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="home" />}
                    title="工作台"
                    selected={this.state.selectedTab === 'workTab'}
                    onPress={() => this.onChangeTab('workTab')}
                >
                    {this.renderWorkView()}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon name="user" />}
                    title="我的"
                    selected={this.state.selectedTab === 'myTab'}
                    onPress={() => this.onChangeTab('myTab')}
                >
                    {this.renderMyView()}
                </TabBar.Item>
            </TabBar>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'black',
    },
    upContainerStyle: {
        flex: 1,
        backgroundColor: 'red',
    },
    downContainerStyle: {
        flex: 1,
        backgroundColor: 'blue',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        //  backgroundColor: '#F5FCFF',
        backgroundColor: 'red',
    },
    iconStyle: {
        width: 80,
        height: 80,
        marginTop: 20,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'orange',
        marginBottom: 12,
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
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 16,
        fontSize: 19,
        marginTop: 10,
        marginLeft: 2,
        marginBottom: 4,
        alignSelf: 'flex-start'
    },
    logoutBtnStyle: {
        height: 40,
        width: width * 0.85,
        backgroundColor: 'red',
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

    text: {
        fontSize: 53
    },
});
module.exports = mainView;