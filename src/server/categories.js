import request from '../utils/request';

// 获取分类接口
export const getCategoriesList = () => {
  return request.post('/jcgl-mall/app/item/category/select/root/level', '');
};

// 通过id获取分类列表接口
export const getList = (params) => {
  return request.post(
    `/jcgl-mall/app/item/select/page/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};

// 获取一二级分类接口
export const getCategoriesTreeList = () => {
  return request.post('/jcgl-mall/app/item/category/select/tree', '');
};
