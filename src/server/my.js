import request from '../utils/request';

// 查询个人信息
export const getUserInfo = (params) => {
  return request.post(`/jcgl-user/wx/login/selectUserInfo`, params);
};

// 查询各订单数量
export const statis = () => {
  return request.get(`/jcgl-mall/app/order/info/status/math/statis`);
};

// 编辑个人信息
export const editUserInfo = (params) => {
  return request.post(`/jcgl-user/wx/login/update`, params);
};

// 确认当前用户是否是经销商
export const checkUser = () => {
  return request.get(`/jcgl-user/wx/login/agent/check`);
};
