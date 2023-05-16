import request from '../utils/request';

// 获取分类接口
export const getCategoriesList = () => {
  return request.post('/jcgl-mall/app/item/category/select/root/level', '');
};

// 通过id获取分类列表接口
export const getList = (params) => {
  return request.post(`/jcgl-mall/admin/item/info/select/page/list?pageNum=1&pageSize=20`, params);
};
