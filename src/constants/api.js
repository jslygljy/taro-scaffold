import Taro from '@tarojs/taro'
/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
function version(){
  let version = __wxConfig.envVersion;
  if(Taro.getStorageSync('isDev')){
    version = 'develop';
  }else{
    version = 'release';
  }
  switch (version)
  {
    case 'develop':
      return 'https://develop.com';
      break;
    case 'trial':
      return 'https://trial.com';
      // return 'https://rocketzone-restart-gw-admin-pre.qttcs3.cn';
      return 'https://rocketzone-restart-gw-app-qa.qutoutiao.net';
      break;
    case 'release':
      return 'https://develop.com';
      break;
    default:
      return 'https://develop.com';
  }
}

export const API_AFTER_SALE = `${version()}/wx/order/serviceListDetail`          //获取售后信息

export const API_GOOD_LIST = `${version()}/wx/commodity/index`          //获取商品列表
