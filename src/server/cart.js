import request from '../utils/request';

export const goodsAll = (params) => {
  return request.get('/jcgl-mall/app/shopping/cart/goods/select/all', params);
};
