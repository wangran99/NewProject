/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

var CompanyLoginView = require('./pages/companyLoginView')
var UserLoginView = require('./pages/userLoginView')
var MainView = require('./pages/mainView')
var TestView = require('./pages/testView')
var AuthView = require('./pages/authLoadingView')
var NewsDetailView = require('./pages/newsDetailView')
var OrderDetailView = require('./pages/orderDetailView')
var CancelOrderView = require('./pages/cancelOrderView')
var OrderTransferView = require('./pages/orderTransferView')
var OrderPaiView = require('./pages/orderPaiView')
var DanjuListView = require('./pages/danjuListView')
var RentListView = require('./pages/rentListView')
var RentDetailView = require('./pages/rentDetailView')
var RentingMeterReadingView = require('./pages/rentingMeterReadingView')
var EquipmentListView = require('./pages/equipmentListView')
var BarCodeCameraView = require('./pages/barCodeCameraView')
var AddNewEquipmentView = require('./pages/addNewEquipmentView')
var KilometerStatisticsView = require('./pages/kilometerStatisticsView')
var CarDetailView = require('./pages/carDetailView')
var CarManagementView = require('./pages/carManagementView')
var ProjectListView = require('./pages/projectListView')
var ProjectProcessView = require('./pages/projectProcessView')
var ProjectProcessAddView = require('./pages/projectProcessAddView')
var MaintenanceExperienceView = require('./pages/maintenanceExperienceView')
var MemoListView = require('./pages/memoListView')
var AddMemoView = require('./pages/addMemoView')
var MemoDetailView = require('./pages/memoDetailView')
var OrderMemoDetailView = require('./pages/orderMemoDetailView')

var EditMemoView = require('./pages/editMemoView')
var OrderRepairView = require('./pages/orderRepairView')
var OrderRepairDetailView = require('./pages/orderRepairDetailView')
var OrderDeliveryDetailView = require('./pages/orderDeliveryDetailView')

var OrderRepairReplenishView = require('./pages/orderRepairReplenishView')
var AddOrderRepairReportView = require('./pages/addOrderRepairReportView')
var OrderDeliveryView = require('./pages/orderDeliveryView')
var OrderDeliveryReplenishView = require('./pages/orderDeliveryReplenishView')
var OrderInstallView = require('./pages/orderInstallView')
var OrderInstallDetailView = require('./pages/orderInstallDetailView')
var OrderInstallReplenishView = require('./pages/orderInstallReplenishView')
var OrderListDaiPaiView = require('./pages/orderListDaiPaiView')
var AddNewOrderView = require('./pages/addNewOrderView')
var TechnologyArticleView = require('./pages/technologyArticleView')
var TechnologyArticleDetailView = require('./pages/technologyArticleDetailView')

var CallForRepairView = require('./pages/callForRepairView')
var OnlineServiceView = require('./pages/onlineServiceView')
var OnlineServiceReplenishView = require('./pages/onlineServiceReplenishView')

var BusinessDisclosureView = require('./pages/businessDisclosureView')

var ChangePhoneNumberView = require('./pages/changePhoneNumberView')
var OrderQueryView = require('./pages/orderQueryView')
var ChangePasswordView = require('./pages/changePasswordView')

var ShortRentListView = require('./pages/shortRentListView')
var ShortRentEquipListView = require('./pages/shortRentEquipListView')


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const AppStack = createStackNavigator(
  {
    // CompanyLogin: CompanyLoginView,
    // UserLogin: UserLoginView,
    Main: MainView,
    NewsDetail: NewsDetailView,
    OrderDetail: OrderDetailView,
    CancelOrder: CancelOrderView,
    OrderTransfer: OrderTransferView,
    OrderPai: OrderPaiView,
    DanjuList: DanjuListView,
    RentList: RentListView,
    RentDetail: RentDetailView,
    RentingMeterReading: RentingMeterReadingView,
    EquipmentList: EquipmentListView,
    BarCodeCamera: BarCodeCameraView,
    AddNewEquipment: AddNewEquipmentView,
    KilometerStatistics: KilometerStatisticsView,
    CarDetail: CarDetailView,
    CarManagement: CarManagementView,
    ProjectList: ProjectListView,
    ProjectProcess: ProjectProcessView,
    ProjectProcessAdd: ProjectProcessAddView,
    MaintenanceExperience: MaintenanceExperienceView,
    MemoList: MemoListView,
    AddMemo: AddMemoView,
    MemoDetail: MemoDetailView,
    OrderMemoDetail: OrderMemoDetailView,
    EditMemo: EditMemoView,
    OrderRepair: OrderRepairView,
    OrderRepairDetail: OrderRepairDetailView,
    OrderRepairReplenish: OrderRepairReplenishView,
    AddOrderRepairReport: AddOrderRepairReportView,
    OrderDelivery: OrderDeliveryView,
    OrderDeliveryDetail: OrderDeliveryDetailView,
    OrderDeliveryReplenish: OrderDeliveryReplenishView,
    OrderInstall: OrderInstallView,
    OrderInstallDetail: OrderInstallDetailView,
    OrderInstallReplenish: OrderInstallReplenishView,
    OrderListDaiPai: OrderListDaiPaiView,
    AddNewOrder: AddNewOrderView,
    TechnologyArticle: TechnologyArticleView,
    TechnologyArticleDetail: TechnologyArticleDetailView,
    CallForRepair: CallForRepairView,
    OnlineService: OnlineServiceView,
    onlineServiceReplenish: OnlineServiceReplenishView,
    BusinessDisclosure: BusinessDisclosureView,
    OrderQuery: OrderQueryView,
    ChangePhoneNumber: ChangePhoneNumberView,
    ChangePassword: ChangePasswordView,
    ShortRentList: ShortRentListView,
    ShortRentEquipList: ShortRentEquipListView,
    Test: TestView,
  },
  {
    //  initialRouteName: 'CompanyLogin',
    //  initialRouteName: 'Test',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1B82D2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        // fontWeight: 'bold',
      },
    },
  }
);
const AuthStack = createStackNavigator({
  CompanyLogin: CompanyLoginView,
  UserLogin: UserLoginView,
},
  {
    //  initialRouteName: 'CompanyLogin',
    //  initialRouteName: 'Test',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1B82D2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        // fontWeight: 'bold',
      },
    },
  });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthView,
    App: AppStack,
    Auth: AuthStack,
    Test: TestView,
  },
  {
    initialRouteName: 'AuthLoading',
    //  initialRouteName: 'Test',
  }
));

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}

