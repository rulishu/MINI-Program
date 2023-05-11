import request from '../utils/request';

/**登录*/
export const login = (params) => {
  return request.post('/jcgl-user/wx/login/login', params);
};

export const getPhone = (params) => {
  return request.post('/jcgl-user/wx/login/getPhone', params);
};
