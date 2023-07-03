import request from '../utils/request';

// 待使用
export const couponUserAll = () => {
  return request.get('/jcgl-mall/app/coupon/user/select/all', '');
};
// 已使用
export const couponUsedAll = () => {
  return request.get('/jcgl-mall/app/coupon/user/used/select/all', '');
};
// 已过期
export const couponUsedStaleAll = () => {
  return request.get('/jcgl-mall/app/coupon/user/stale/select/all', '');
};
