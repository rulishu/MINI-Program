import request from '../utils/request';

// 获取轮播图、活动列表
export const getBannerList = (params) => {
  return request.post(`jcgl-mall/app/banner/select/all`, params);
};

// 查询一级分类
export const getLevel = (params) => {
  return request.post(`/jcgl-mall/app/item/category/select/root/level`, params);
};

// 首页查询商品列表
export const getLevelList = (params) => {
  return request.post(
    `/jcgl-mall/app/item/select/page/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};
