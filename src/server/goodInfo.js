import request from '../utils/request';

export const infoDetails = (params) => {
  return request.get('/jcgl-mall/app/item/details', params);
};

// 确认订单
export const orderConfirm = (params) => {
  return request.post('/jcgl-mall/app/advance/order/confirm', params);
};

// 预订单
export const orderSubmit = (params) => {
  return request.post('/jcgl-mall/app/advance/order/submit', params);
};

// 微信支付
export const wxpay = (params) => {
  return request.put('/jcgl-mall/app/payment/flow/do/wxpay', params);
};

// 立即购买
export const newConfirm = (params) => {
  return request.post('/jcgl-mall/app/advance/order/newConfirm', params);
};

// 海报小程序码
export const miniprogramcode = (params) => {
  return request.get('/jcgl-user/wx/login/miniprogramcode', params);
};
