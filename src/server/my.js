import request from '../utils/request';

// 查询商品列表
export const getUserInfo = (params) => {
  return request.post(`/jcgl-mall/app/user/center/select/user/details`, params);
};
