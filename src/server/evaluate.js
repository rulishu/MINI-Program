import request from '../utils/request';

// 评论列表
export const evaluationList = (params) => {
  return request.post(
    `/jcgl-mall/app/evaluation/select/page/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};
// 批量创建订单商品评价
export const getAddEvaluation = (params) => {
  return request.post(`/jcgl-mall/app/evaluation/batch/create`, params);
};

// 上传图片
export const upload = (params) => {
  return request.post(`/jcgl-user/oss/uploadBase64`, params);
};
