import request from '../utils/request';

// 查询商品列表
export const getList = (params) => {
  return request.post(
    `/jcgl-mall/app/item/select/page/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};
