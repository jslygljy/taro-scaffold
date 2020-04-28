import Taro from '@tarojs/taro'

const globalData = {}

// 设置全局变量
export function setGlobalData (key, val) {
  globalData[key] = val
}

// 获取全局变量
export function getGlobalData (key) {
  return globalData[key]
}

/**
 * 时间格式化
 * @param {string} fmt
 * @param {Date} Date
 */
export function dateFormat (fmt, date = new Date()) {
    let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
    }
    return fmt;
}
/**
 * 返回 querystring 对象
 * @param url
 * @return {Object} 对象
 */
export function queryParse (url) {
    let dic = {};
    url = url || window.location.search.slice(1);
    let array = url.split('&');
    for (let i = 0, len = array.length; i < len; i++) {
        let params = array[i].split('=');
        if (params[0]) {
            dic[decodeURIComponent(params[0])] = decodeURIComponent(params[1])
        }
    }
    return dic;
}

/**
 * 根据key返回url中的value
 * @param {string} key
 * @param {string} [url]
 * @returns {string}
 */
export function query (key, url) {
    return queryParse(url)[key];
}

export const getStorage =function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}
export const updateStorage = function updateStorage(token) {
  return Taro.setStorage({ key: 'token', data: token }).then(res => res.data).catch(() => '')
}
export const setStorage = function setStorage(key,token) {
  return Taro.setStorage({ key: key, data: token }).then(res => res.data).catch(() => '')
}
export const removeStorage =function removeStorage(key) {
  return Taro.removeStorage({ key }).then(res => res.data).catch(() => '')
}

// 拨打客服电话
export function callphone(){
  Taro.makePhoneCall({
      phoneNumber: '###' 
  })
}
