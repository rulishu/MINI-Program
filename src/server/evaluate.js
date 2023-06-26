import request from '../utils/request';

// 评论列表
export const evaluationList = (params) => {
  return request.post(
    `/jcgl-mall/app/evaluation/select/page/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};
