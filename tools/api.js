import { instance, getData, getHeader, uploadPic, post, postData, resetData, saveData, loginPost } from './http.js'


class httpapi {

    // static getBaidu() {
    //     return getData("/aaa", { "abc": "pccc" });
    // }

    // static getCompanyLoginCookie() {
    //     return getHeader("/login0.aspx").then((headers) => {
    //         headers["Set-Cookie:"];
    //         // headers["Server"];
    //     })
    // }

    static companyLogin(param = {}) {
        return loginPost("/Login.asmx/Login_Company", param);
    }

    static personLogin(account, username, password) {
        return loginPost("/Login.asmx/Login_User", { account: account, username: username, password: password });
    }

    // 公告列表
    static getAnnouncement(page, keys = '') {
        return postData("/commList.asmx/NewsList", { page: page, keys: keys });
    }

    static getAnnouncementDetail(id) {
        return postData("/commList.asmx/NewsDetails", { id });
    }
    // 抢单列表
    static getOrderQiang() {
        return postData("/Order.asmx/ReceiveOrderQiang");
    }

    // 派单列表
    static getOrderPai() {
        return postData("/Order.asmx/ReceiveOrderPai");
    }

    // 业务员派单列表
    static getOrderListDaiPai(count) {
        return postData("/Order.asmx/OrderListDaiPai", { count });
    }

    static getOrderDetails(orderid) {
        return postData("/Order.asmx/OrderDetails", { orderid });
    }
    static cancelOrder(orderid, cause) {
        return postData("/Order.asmx/OrderCancel", { orderid, cause });
    }

    static confirmOrder(orderid, clientid, tel) {
        return postData("/Order.asmx/OrderArrive", { orderid, clientid, tel });
    }
    static transferOrder(orderid, toUid) {
        return postData("/Order.asmx/OrderTransfer", { orderid, toUid });
    }

    static getDanJuList() {
        return postData("/Order.asmx/OrderDanJu");
    }

    static danJuYiJiao(did, type) {
        return postData("/Order.asmx/OrderDanJuYiJiao", { did, type });
    }
    // 获取租机抄表列表
    static getRentList(count, keys) {
        return postData("/Rent.asmx/RentList", { count, keys });
    }
    // 获取租机详细信息
    static getRentDetail(rentid) {
        return postData("/Rent.asmx/RentDetails", { rentid });
    }

    // 获取租机最近10次的读取数据
    static getRentReadingTop10(equipid) {
        return postData("/Rent.asmx/RentReadingTop10", { equipid });
    }

    //  最后抄表记录详情
    static getRentLast(equipid) {
        return postData("/Rent.asmx/RentLast", { equipid });
    }


    /**
     *发送保养抄表记录
     *
     * @static
     * @param {*} did 定单编号，即contractno
     * @param {*} reading 黑色读数
     * @param {*} readingex 彩色读数
     * @param {*} whether 是否完成保养
     * @param {*} equipid 设备编号
     * @param {*} reada3 黑色A3读数
     * @param {*} readexa3 彩色A3读数
     * @param {*} scan 扫描读数
     * @param {*} cycle 抄表月数
     * @param {*} img 图片id
     * @param {*} remark 备注
     * @returns
     * @memberof httpapi
     */
    static RentMeterReading(did, reading, readingex, whether, equipid, reada3, readexa3, scan, cycle, img, remark) {
        return postData("/Rent.asmx/RentMeterReading", { did, reading, readingex, whether, equipid, reada3, readexa3, scan, cycle, img, remark });
    }
    static uploadPic(base64str) {
        return uploadPic({ base64str });
    }
    //count实际为页数
    static getEquipmentList(count = 1, name = '') {
        return postData("/commList.asmx/EquipmentList", { count, name });
    }

    //根据条码code获取设备信息
    static getEquipmentDetailsByCode(code) {
        return postData("/commList.asmx/EquipmentDetailsByCode", { code });
    }

    //增加新设备
    static addEquipment(facilitycode, cid, classift, brand, model, doorplate, purchase, assetnumber, remark) {
        return postData("/commList.asmx/EquipmentAdd", { facilitycode, cid, classift, brand, model, doorplate, purchase, assetnumber, remark });
    }

    //车辆list
    static getCarList(count, starttime, endtime) {
        return postData("/Car.asmx/CarList", { count, starttime, endtime });
    }

    //车辆信息
    static getCarDetail(carId) {
        return postData("/Car.asmx/CarDetails", { carId });
    }

    //车辆行驶记录上传
    static postCarReturn(carid, Afterkilometre, Afterimg) {
        return postData("/Car.asmx/CarReturn", { carid, Afterkilometre, Afterimg });
    }

    //获得车辆列表
    static getCarListUser(starttime, endtime) {
        return postData("/Car.asmx/CarListUser", { starttime, endtime });
    }

    //发送车辆使用前信息
    //licence实际应为车辆id
    static postCarUse(licence, beforekilometre, beforeimg) {
        return postData("/Car.asmx/CarUse", { licence, beforekilometre, beforeimg });
    }

    //获得工程list
    static getProjectList(count, name) {
        return postData("/Project.asmx/ProjectList", { count, name });
    }

    //获得工程进度list
    static getProjectProcessList(count, pid) {
        return postData("/Project.asmx/ProjectProcessList", { count, pid });
    }

    //添加工程进度
    static projectProcessAdd(pid, schedule, explain, img) {
        return postData("/Project.asmx/ProjectProcessAdd", { pid, schedule, explain, img });
    }

    //获取技术文档
    static getTechnologyList(page, keys) {
        return postData("/commList.asmx/TechnologyList", { page, keys });
    }

    //获取备忘录列表 count:页数
    static getMemoList(count) {
        return postData("/Memo.asmx/MemoList", { count });
    }

    //添加备忘录 status  pub：是否公开
    static addMemo(headline, details, status, remark, pub) {
        return postData("/Memo.asmx/MemoAdd", { headline, details, status, remark, pub });
    }

    //获取单个备忘录内容
    static memoDetail(id) {
        return postData("/Memo.asmx/MemoDetails", { id });
    }

    //根据orderid获取备忘录内容
    static memoDetailByOrderid(orderid) {
        return postData("/Memo.asmx/MemoDetailsOrderid", { orderid });
    }

    //修改单个备忘录内容
    static editMemo(id, headline, details, status, remark, pub) {
        return postData("/Memo.asmx/MemoEdit", { id, headline, details, status, remark, pub });
    }

    //增加工单下的备忘录
    static addOrderMemo(orderid, headline, details, status, remark, pub) {
        return postData("/Memo.asmx/MemoPostOrderId", { orderid, headline, details, status, remark, pub });
    }

    //维修工单list。count：页数。 state：0：全部。1:已完成。2：已取消。3：未完成
    static getOrderRepairList(count, state) {
        return postData("/Order.asmx/OrderListWeiXiu", { count, state });
    }

    //送货工单list。count：页数。 state：0：全部。1:已完成。2：已取消。3：未完成
    static getOrderDeliveryList(count, state) {
        return postData("/Order.asmx/OrderListSongHuo", { count, state });
    }

    //安装工单list。count：页数。 state：0：全部。1:已完成。2：已取消。3：未完成
    static getOrderInstallList(count, state) {
        return postData("/Order.asmx/OrderListAnZhuang", { count, state });
    }

    //获取工单维修记录
    static getOrderRecord(equipId) {
        return postData("/Order.asmx/OrderRecord ", { equipId });
    }

    //补充工单
    static orderReplenish(orderId, facilitycode, ordertype, describe, phone, orderamount) {
        return postData("/Order.asmx/OrderReplenish", { orderId, facilitycode, ordertype, describe, phone, orderamount });
    }

    //送货补充工单
    static ordeDeliveryrReplenish(orderId, clientid, describe, phone, money, integral, integralex, rectype) {
        return postData("/Order.asmx/OrderReplenishSongHuo", { orderId, clientid, describe, phone, money, integral, integralex, rectype });
    }

    //添加工单维修报告
    static addOrderServiceReport(orderid, solution, replace, address, phenomena, handling,
        jthandling, feedback, peice, integral, integralex, rectype, img) {
        return postData("/Order.asmx/OrderServiceReport", {
            orderid, solution, replace, address, phenomena, handling, jthandling,
            feedback, peice, integral, integralex, rectype, img
        });
    }

    static orderBusinessStatistics(count, starttime, endtime, ordertype) {
        return postData("/Order.asmx/OrderBusinessStatistics", { count, starttime, endtime, ordertype });
    }

    static updateUserPhone(userphone) {
        return postData("/commList.asmx/UserUpdatePhone", { userphone });
    }

    static updateUserPassword(oldPwd, newPwd, rePwd) {
        return postData("/commList.asmx/UserUpdatePwd", { oldPwd, newPwd, rePwd });
    }

    static getUserList(keys) {
        return postData("/commList.asmx/UserList", { keys });
    }

    static getClientList(keys) {
        return postData("/commList.asmx/ClientList", { keys });
    }

    static saveLogin(params = {}) {
        saveData(params = {});
    }
    static logout() {
        resetData();
    }

    static getPersonInfo() {
        return postData("/commList.asmx/UserInfo");
    }
}

export default httpapi;