import request from '../utils/request';

// 统计
export const myFansCount = (params) => {
  return request.post(`/jcgl-user/app/consumer/userFans/myFansCount`, params);
};

// 列表
export const selectPage = (params) => {
  return request.post(
    `/jcgl-user/app/consumer/userFans/selectPage?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};
