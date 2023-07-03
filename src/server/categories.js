import request from '../utils/request';

// 获取营销类目接口
export const selectAllLevelTwo = () => {
  return request.post('/jcgl-mall/app/marketing/relation/selectAllLevelTwo', '');
};

// 获取二级类目下商品接口
export const getList = (params) => {
  return request.post(
    `/jcgl-mall/app/marketing/relation/selectItemOne?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};
