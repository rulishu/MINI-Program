import request from '../utils/request';

// 获取地址列表
export const getAddress = () => {
  return request.get(`/jcgl-mall/app/receiving/address/select/all`, '');
};
