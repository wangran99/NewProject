import { instance, getData, getHeader, post, postData, resetData } from './http.js'


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
        return postData("/Login.asmx/Login_Company", param);
    }

    static personLogin(account, username, password) {
        return postData("/Login.asmx/Login_User", { account: account, username: username, password: password });
    }

    static getAnnouncement(page, keys = '') {
        return postData("/commList.asmx/NewsList", { page: page, keys: keys });
    }

    static getAnnouncementDetail(id) {
        return postData("/commList.asmx/NewsDetails", { id });
    }

    static getAnnouncementDetail(id) {
        return postData("/commList.asmx/NewsDetails", { id: id });
    }

    static logout() {
        resetData();
    }

    static getPersonInfo() {
        return postData("/commlist.ashx", { parms: [0, 12] });
    }
}

export default httpapi;