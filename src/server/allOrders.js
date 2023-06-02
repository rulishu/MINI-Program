import request from '../utils/request';

// 获取订单列表
export const getAllOrders = (params) => {
  return request.post(
    `/jcgl-mall/app/order/info/select/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    { orderStatus: params?.orderStatus },
  );
};
