import request from '../utils/request';

// 查询销量前100中，随机取10个商品列表
export const selectItemTopTen = (params) => {
  return request.post(
    `/jcgl-mall/app/marketing/relation/selectItemTopTen?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};
