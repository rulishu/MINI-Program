import request from '../utils/request';

// 查询个人信息
export const getUserInfo = (params) => {
  return request.post(`/jcgl-user/wx/login/selectUserInfo`, params);
};

// 编辑个人信息
export const editUserInfo = (params) => {
  return request.post(`/jcgl-user/wx/login/update`, params);
};
