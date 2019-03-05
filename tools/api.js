import { instance, getData, getHeader, post, postData, resetData, saveData, loginPost } from './http.js'


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

    static getOrderDetails(orderid){
        return   postData("/Order.asmx/OrderDetails", { orderid });
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