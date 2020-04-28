import * as Order from "./action-type";

const defaultState = {
  goods:{
    specifications_skus:[{
      specification_note:''
    }],
    specifications_list:[],
    service_notes:[],
    carousel_picture_url:[],
    detailed_picture_url:[]
  },
  skuid:'',
  skuInfo:{
    specification_note:'',
    sku_code:'',
    favorable_price:0
  }
};

const order = (state = defaultState, action) => {
  switch (action.type) {
    case Order.GOODINFO:
      return {
        ...state,
        goods: action.order
      };
    case Order.SKUINFO:
        return {
          ...state,
          skuid: action.id,
          skuInfo: action.info
        };
    default:
      return state;
  }
};

export default order;
