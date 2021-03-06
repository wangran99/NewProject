

import React, { Component } from 'react';
import { ListItem, SearchBar as ElementSearchBar } from 'react-native-elements';
import { Carousel, Icon, SearchBar, TabBar, Grid, Button, Badge } from '@ant-design/react-native';
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
    name: 'file',
    text: `单据管理`,
}, {
    name: 'car',
    text: `车辆管理`,
}, {
    name: 'clock-circle',
    text: `租机抄表`,
}, {
    name: 'cluster',
    text: `添加设备`,
}, {
    name: 'project',
    text: `工程管理`,
}, {
    name: 'read',
    text: `维修经验`,
}, {
    name: 'solution',
    text: `备忘录`,
}, {
    name: 'tool',
    text: `维修工单`,
}, {
    name: 'reload-time',
    text: `送货工单`,
}, {
    name: 'carry-out',
    text: `安装工单`,
}, {
    name: 'audit',
    text: `业务员派单`,
}, {
    name: 'read',
    text: `技术资料`,
}, {
    name: 'notification',
    text: `业务公开`,
}, {
    name: 'calculator',
    text: `短租`,
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
            headerRight: params ? params.headerRight : (
                <TouchableOpacity onPress={() => { navigation.navigate("BarCodeCamera", { from: "mainView" }); }}>
                    <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'white' }}>报修</Text>
                        <Icon name={"scan"} size="lg" />
                    </View>
                </TouchableOpacity>
            ),
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
            //   activeSlide: 1
            personInfo: {
                "Table": [{ "jobnumber": "laowang", "userphone": "13362001700" }],
                "Table1": [{ "c_Name": "浙江省测试用户科技有限公司" }]
            },
            // 用相应的clone方法设置datasource的初始值
            // 创建ListView datasource数据源
            announcement: announcementTest,
            orderList: orderListTest,
            //业务统计的四个数据
            yjdd: 0,
            ljje: 0,
            ljjf: 0,
            ljjf2: 0,

            newNum: {},
            isRefreshing: false,

        };

    }
    _getOrderBusinessStatistics() {
        httpApi.orderBusinessStatistics(1, '', '', '')
            .then((data) => {
                this.setState({
                    yjdd: data.Table2[0].yjdd, ljje: data.Table2[0].ljje,
                    ljjf: data.Table2[0].ljjf, ljjf2: data.Table2[0].ljjf2
                });
            });
    }
    componentDidMount() {
        httpApi.getPersonInfo().then((personInfo) => {
            // Alert.alert('person name:' + personInfo.Table[0].jobnumber, JSON.stringify(personInfo));
            this.setState({ personInfo })
        });
        this._refreshAnnouncement();
        this.getOrderList();
        this._getOrderBusinessStatistics();
        this._getNewNumberList();
        //收到监听
        this.updateOderListlistener = DeviceEventEmitter.addListener('orderList', (e) => {
            this.getOrderList();
        });
        this.updateAnnouncementListlistener = DeviceEventEmitter.addListener('announcementList', (e) => {
            this._refreshAnnouncement("");
        });
        this.timer = setInterval(
            () => {
                console.log('把一个定时器的引用挂在this上');
                this._getNewNumberList();
            },
            6 * 1000
        );
    }
    componentWillUnmount() {
        // 移除监听 
        this.updateOderListlistener.remove();
        this.updateAnnouncementListlistener.remove();
        this.timer && clearInterval(this.timer);
    }
    _getAnnouncement(page, keys) {
        httpApi.getAnnouncement(page, keys).then((data) => {
            Alert.alert('错误', JSON.stringify(data));
        });
        Keyboard.dismiss;
    }
    dismissKeyboardClick() {

    }
    _getNewNumberList() {
        httpApi.getIndexNewNum().then(data => {
            data.Table[0].danju = data.Table[0].danju + data.Table[0].danjuRent;
            this.setState({ newNum: data.Table[0] });
        });
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
                        value={this.state.keys}
                        onCancel={this.clear.bind(this)}
                        onSubmit={this._refreshAnnouncement.bind(this)}
                    >
                    </SearchBar>
                </TouchableOpacity>
                <View style={{ backgroundColor: 'lightgray', marginTop: 0, width: width }}
                    onPress={this.clear.bind(this)}>
                    <Text style={styles.titleText} onPress={this.clear.bind(this)}> 公告列表</Text >
                </View>

                {/* <View style={{ flex: 1, width: width, }}> */}
                <FlatList
                    style={{ flex: 1, marginTop: 2 }}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._refreshAnnouncement.bind(this)}
                    onEndReached={this._getAnnouncement.bind(this)}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={10}
                    ListEmptyComponent={() => {
                        return (
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => this._refreshAnnouncement.bind(this)}
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
                            this.state.announcement.Table && this.state.announcement.Table.length !== 0 ?
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
    _getAnnouncement() {
        httpApi.getAnnouncement(this.announcementPageIndex, this.state.keys).then((data) => {
            if (this.announcementPageIndex == 1)
                this.setState({ announcement: data });
            else if (this.announcementPageIndex <= data.Table1[0].pagecounts) {
                let newArry = this.state.announcement.Table.concat(data.Table);
                this.state.announcement.Table = newArry;
                let newjson = JSON.parse(JSON.stringify(this.state.announcement));
                newjson.Table = newArry;
                this.setState({ announcement: newjson });
            }
            this.announcementPageIndex++;
        });
    }
    clear() {
        this.setState({ keys: '' });
        this._refreshAnnouncement();
        Keyboard.dismiss;
    }
    _refreshAnnouncement() {
        this.announcementPageIndex = 1;
        this._getAnnouncement();
    }

    renderOrderView() {
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
                            let number = 0;
                            if (index == 0)
                                number = this.state.newNum.zhipaidan;
                            else if (index == 1)
                                number = this.state.newNum.danju;
                            else if (index == 3)
                                number = this.state.newNum.chaobiao;
                            else if (index == 8)
                                number = this.state.newNum.weixiu;
                            else if (index == 9)
                                number = this.state.newNum.songhuo;
                            else if (index == 10)
                                number = this.state.newNum.anzhuang;
                            return <Badge text={number} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                                    <Icon name={el.name} size="lg"></Icon>
                                    <Text style={{ fontSize: 16 }}>{el.text}</Text>
                                </View>
                            </Badge>
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
        else if (index == 2)
            this.props.navigation.navigate("KilometerStatistics");
        else if (index == 3)
            this.props.navigation.navigate("RentList");
        else if (index == 4)
            this.props.navigation.navigate("EquipmentList");
        else if (index == 5)
            this.props.navigation.navigate("ProjectList");
        else if (index == 6)
            this.props.navigation.navigate("MaintenanceExperience");
        else if (index == 7)
            this.props.navigation.navigate("MemoList");
        else if (index == 8)
            this.props.navigation.navigate("OrderRepair");
        else if (index == 9)
            this.props.navigation.navigate("OrderDelivery");
        else if (index == 10)
            this.props.navigation.navigate("OrderInstall");
        else if (index == 11)
            this.props.navigation.navigate("OrderListDaiPai");
        else if (index == 12)
            this.props.navigation.navigate("TechnologyArticle");
        else if (index == 13)
            this.props.navigation.navigate("BusinessDisclosure");
        else if (index == 14)
            this.props.navigation.navigate("ShortRentList");
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
                    <Image source={require('../img/avator.jpg')} style={styles.iconStyle} />
                    <Text style={[styles.nameText,]}>{this.state.personInfo.Table[0].username}</Text>
                    <View style={{ backgroundColor: 'lightgray', marginTop: 10, width: width }}>
                        <Text style={styles.titleText} > 业务信息</Text >
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="已接工单" number={this.state.yjdd} icon={"carry-out"} onPress={this._onPressMyGridItem.bind(this, 0)} />
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="累计金额" number={this.state.ljje} icon={"dollar"} onPress={this._onPressMyGridItem.bind(this, 1)} />
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }} >
                            <WorkInfoItem title="累计积分" number={this.state.ljjf} icon={"account-book"} onPress={this._onPressMyGridItem.bind(this, 2)} />
                        </View>
                        <View style={{ flex: 1, }} >
                            <WorkInfoItem title="累计积分2" number={this.state.ljjf2} icon={"account-book"} onPress={this._onPressMyGridItem.bind(this, 3)} />
                        </View>
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
                </View >
            </ScrollView>
        );
    }
    _onPressMyListItem(index) {
        if (index == 0)
            this.props.navigation.navigate('OrderQuery');
        else if (index == 1)
            this.props.navigation.navigate('ChangePhoneNumber');
        else if (index == 2)
            this.props.navigation.navigate('ChangePassword');
    }
    _onPressMyGridItem(index) {
        //    alert("my grid item index" + index);
        console.log("pressed my grid item index:" + index);
        //   this.props.navigation.navigate('UserLogin');
    }
    _onPressLogoutButton() {
        Alert.alert(
            '提示',
            '确定要退出登录吗？',
            [
                {
                    text: '确定', onPress: () => {
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
                            alert("删除登录信息失败");
                        });
                    }
                },
                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                // {text: '其他', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        );

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
        this.props.navigation.setParams({
            title: title,
            headerRight: null
        });

        if (tabName === 'workTab')
            this.props.navigation.setParams({
                headerRight: (
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("BarCodeCamera", { from: "mainView" }); }}>
                        <View style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>报修</Text>
                            <Icon name={"scan"} size="lg" />
                        </View>
                    </TouchableOpacity>
                ),
            });
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
                    badge={this.state.newNum.gonggaolan}
                    icon={<Icon name="ordered-list" />}
                    selected={this.state.selectedTab === 'announcementTab'}
                    onPress={() => this.onChangeTab('announcementTab')}
                >
                    {this.renderAnnouncementView()}
                </TabBar.Item>

                <TabBar.Item
                    icon={<Icon name='bell' />}
                    title="抢单"
                    badge={this.state.newNum.qiangdan}
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