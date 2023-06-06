import request from '../utils/request';

// 获取订单列表
export const getAllOrders = (params) => {
  return request.post(
    `/jcgl-mall/app/order/info/select/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    { orderStatus: params?.orderStatus },
  );
};

// 删除订单
export const deleteOrder = (params) => {
  return request.delete(`/jcgl-mall/app/order/info/delete?id=${params.id}`);
};

// // 取消订单
// export const cancelOrder = (params) => {
//   return request.get(`/jcgl-mall/app/order/info/cancel?id=${params}`);
// };
