import request from '../utils/request';

// 获取售后列表
export const getOrderList = (params) => {
  return request.post(
    `/jcgl-mall/app/after/service/record/after/service/record/service/new/page?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    {},
  );
};

// 取消售后订单
export const cancelSales = (params) => {
  return request.post(`/jcgl-mall/app/after/service/record/cancel`, params);
};
