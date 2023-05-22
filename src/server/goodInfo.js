import request from '../utils/request';

export const infoDetails = (params) => {
  return request.get('/jcgl-mall/app/item/details', params);
};

// 确认订单
export const orderConfirm = (params) => {
  return request.post('jcgl-mall/app/advance/order/confirm', params);
};
