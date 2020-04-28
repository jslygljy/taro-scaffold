import request from '@utils/request'
import {API_GOOD_DETAIL}from '@constants/api'
import * as Order from "./action-type";


// 设置skuinfo
export const setOrderSku = (id, info) => {
  return {
    type: Order.SKUINFO,
    id,
    info
  };
};

// 获取商品详情
export const getOrderDetail = (id,share_user_id='',share_id='') => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await request({
      url:API_GOOD_DETAIL,
      method:'POST',
      payload:{
        id,
        share_user_id,
        share_id,
      }
    });
    dispatch({
      type: Order.GOODINFO,
      order: result
    });
  };
};
