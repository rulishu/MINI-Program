import request from '../utils/request';

// 获取地址列表
export const getAddress = () => {
  return request.get(`/jcgl-mall/app/receiving/address/select/all`, '');
};

// 新增收货地址
export const addAddress = (params) => {
  return request.post(`/jcgl-mall/app/receiving/address/create`, params);
};

// 获取地区列表
export const treeList = (params) => {
  return request.get(`/jcgl-user/area/query/treeList`, params);
};

// 编辑收货地址
export const editAddress = (params) => {
  return request.post(`/jcgl-mall/app/receiving/address/update`, params);
};
