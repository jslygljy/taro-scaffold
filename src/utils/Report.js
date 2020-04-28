import MobleReport from '@qtt/fe-mobile-report-wx'
import {getStorage} from '@utils/util'
import Taro from '@tarojs/taro'

const res = Taro.getSystemInfoSync();
let openid = async ()=> {
  return await getStorage('id'); 
}

// eslint-disable-next-line no-undef
let version=__wxConfig.envVersion;
let url =( version == 'develop') ? 'http://develop.net' : 'http://logserver.com';

const option ={
  app:"appname",
  topic:"topic",
  url,
  wxOpenId: openid ,
  systemInfo: {
    ...res
  }
}

export default (event='',action="click",extend_info={})=>{
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length-1]    //获取当前页面的对象
  let page = currentPage.route;
  let defaultReportData = {
    option:{
      ...currentPage.options
    }
  };
  const mobleReport = new MobleReport(option,defaultReportData);
  mobleReport.report({
    event,
    page,
    action,
    extend_info,
  })
}
  
  