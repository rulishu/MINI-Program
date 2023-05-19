import request from '../utils/request';

export const infoDetails = (params) => {
  return request.get('/jcgl-mall/app/item/details', params);
};
