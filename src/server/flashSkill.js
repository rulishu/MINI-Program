import request from '../utils/request';

// 翻页查询秒杀活动下商品
export const getFlashList = (params) => {
  const { pageNum, pageSize, ...other } = params;
  return request.post(
    `/jcgl-mall/app/activity/item/select/page/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    other,
  );
};

//查询活动信息
export const getFlashDetails = (params) => {
  return request.get(`/jcgl-mall/app/activity/details?id=${params}`);
};
