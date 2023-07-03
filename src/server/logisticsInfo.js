import request from '../utils/request';

// 获取订单包裹
export const getPackageList = (params) => {
  return request.get(`jcgl-mall/app/order/logistics/select/list?id=${params.id}`);
};

// 获取包裹物流信息
export const packageTrace = (params) => {
  return request.post(`/jcgl-mall/app/logistics/trace/trace`, params);
};
