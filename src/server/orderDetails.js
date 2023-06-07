import request from '../utils/request';

// 订单详情
export const selectPrimaryKey = (params) => {
  return request.post(`/jcgl-mall/app/order/info/selectPrimaryKey`, params);
};

// 申请退款
export const serviceApply = (params) => {
  return request.post(`/jcgl-mall/app/after/service/record/after/service/apply`, params);
};
