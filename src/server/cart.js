import request from '../utils/request';

// 查询所有商品
export const cartGoodsAll = (params) => {
  return request.get('/jcgl-mall/app/shopping/cart/goods/select/all', params);
};

// 清空购物车
export const cartGoodsClear = (params) => {
  return request.delete(`/jcgl-mall/app/shopping/cart/goods/clear`, params);
};

// 删除单个商品
export const cartGoodsDelete = (params) => {
  return request.delete(`/jcgl-mall/app/shopping/cart/goods/delete?ids=${params.ids}`);
};

// 新增购物车
export const cartGoodsCreate = (params) => {
  return request.post(`/jcgl-mall/app/shopping/cart/goods/create`, params);
};

// 购物车商品数量
export const cartGoodsCount = (params) => {
  return request.post(`/jcgl-mall/app/shopping/cart/goods/count`, params);
};

// 购物车加减
export const additionSubtraction = (params) => {
  return request.post(`/jcgl-mall/app/shopping/cart/goods/addition/and/subtraction`, params);
};

// 结算
