import request from '../utils/request';

export const getPhone = (params) => {
  return request.post('/jcgl-user/wx/login/getPhone', params);
};
