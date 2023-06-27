import request from '../utils/request';

// 批量创建订单商品评价
export const getAddEvaluation = (params) => {
  return request.post(`/jcgl-mall/app/evaluation/batch/create`, params);
};
