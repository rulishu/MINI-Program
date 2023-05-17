import request from '../utils/request';

export const getPhone = (params) => {
  // 注册
  return request.post('/jcgl-user/wx/login/getPhone', params);
};

export const newLogin = (params) => {
  // 查询是否有账号，如果有就登录
  return request.post('/jcgl-user/wx/login/newLogin', params);
};
