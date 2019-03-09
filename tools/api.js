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