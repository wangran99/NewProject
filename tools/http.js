import React, { Component } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import axios from 'axios'
import qs from 'qs'

import local from '../tools/storage'


let cookie;
let account;
let username;
let password;
let uid;
_bootstrapAsync = async () => {
    //   cookie = await local.get("cookie");
    account = await local.get("account");
    username = await local.get("username");
    password = await local.get("password");
    uid = await local.get("uid");
}


//console.warn("init cookie:" + JSON.stringify(cookie));
var instance = axios.create({
    baseURL: 'http://test.glk119.com/appService',
    timeout: 5000,
    headers: {
        //    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept': 'application/json',
        // 'X-Custom-Header': 'foobar',
        'Cookie': cookie,
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'max-age=0',
        'Host': 'www.glk119.com',
        //  'Referer': 'http://www.glk119.com/login0.aspx',
        'Upgrade-Insecure-Requests': '1',
        //    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
    },
});
instance.defaults.withCredentials = true;
//添加请求拦截器
instance.interceptors.request.use(
    config => {
        if (instance.Authorization != '') {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = '';
        }
        // config.headers = {
        //     // 'Content-Type':'application/x-www-form-urlencoded'
        // }
        // let cookie = local.get("cookie");
        // config.headers.Cookie = cookie;
        //  console.warn("request config:" + JSON.stringify(config));
        return config;
    },
    err => {
        console.warn("request error!!" + JSON.stringify(err));
        return Promise.reject(err);
    });

//http response 拦截器
// axios.interceptors.response.use(
//     response => {
//       if(response.data.errCode ==2){
//         router.push({
//           path:"/login",
//           querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//         })
//       }
//       return response;
//     },
//     error => {
//       return Promise.reject(error)
//     }
//   )
// 在这里你可以判断后台返回数据携带的请求码
// if (response.data.retcode === 200 || response.data.retcode === '200') {
//     return response.data.data || response.data
//   }else {
//     // 非200请求抱错
//     throw Error(response.data.msg || '服务异常')
//   }

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function getData(url, params = {}) {
    ToastAndroid.show("Aaaa pikachu appeared nearby !", ToastAndroid.SHORT);
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                ToastAndroid.show("ccccc pikachu appeared nearby !", ToastAndroid.SHORT);
                Alert.alert('error!!!', JSON.stringify(err));
                reject(err)
            })
    })
}

//可以获取更多数据，包括http头部信息
export function getHeader(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: params
        })
            .then(response => {
                console.warn("get header function response:" + JSON.stringify(response));
                resolve(response.headers);
            })
            .catch(err => {
                ToastAndroid.show("bbbbb pikachu appeared nearby !", ToastAndroid.SHORT);
                Alert.alert('error!!!', JSON.stringify(err));
                reject(err)
            })
    })
}

//未完成该方法
export function setHeader(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.setHeader()
        instance.get(url, {
            params: params
        })
            .then(response => {
                console.warn("get header function response:" + JSON.stringify(response));
                resolve(response.headers);
            })
            .catch(err => {
                ToastAndroid.show("bbbbb pikachu appeared nearby !", ToastAndroid.SHORT);
                Alert.alert('error!!!', JSON.stringify(err));
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, params = {}) {
    let data = extend(params, { uid: uid, code: code });
    return new Promise((resolve, reject) => {
        let sendData = qs.stringify(
            data,
            //   { arrayFormat: 'brackets' }
        );
        instance.post(url, sendData)
            .then(response => {
                resolve(response);
            }, err => {
                console.warn("Post function error:" + JSON.stringify(err));
                reject(err);
            })
    })
}

function extend(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}

/**
 * 封装post请求,只返回response中的data字段
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postData(url, params = {}) {
    if (!uid)
        _bootstrapAsync();
    let data = extend({ account: account, username: username, password: password, uid: uid }, params);
    return new Promise((resolve, reject) => {
        let pp = qs.stringify(
            data,
            // { arrayFormat: 'brackets' }
        );
        instance.post(url, pp)
            .then(response => {
                resolve(response.data);
            }, err => {
                console.warn("Post function error:" + JSON.stringify(err));
                reject(err);
            })
    })
}
// 重置原始数据
export function resetData(url, params = {}) {
    cookie = null;
    account = null;
    username = null;
    password = null;
    uid = null;
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

export default instance;