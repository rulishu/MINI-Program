import request from '../utils/request';

// 查询所有购物车商品
export const goodsAll = (params) => {
  return request.get('/jcgl-mall/app/shopping/cart/goods/select/all', params);
};

// 新增购物车商品
export const addGood = (params) => {
  return request.post(`/jcgl-mall/app/shopping/cart/goods/select/create`, params);
};

// 删除购物车商品
export const deleteGood = (params) => {
  return request.get(`/jcgl-mall/app/shopping/cart/goods/delete`, params);
};
