import request from '../utils/request';

// 查询头部一级镖局
export const selectAreaClassAagent = (params) => {
  return request.post(`/jcgl-user/app/agent/select/area/selectAreaClassAagent`, params);
};

// 根据一级镖局获取二级镖局
export const selectAreaClassBagent = (params) => {
  return request.post(`/jcgl-user/app/agent/select/area/selectAreaClassBagent`, params);
};

// 根据镖局地区码获取所属商品信息
export const selectList = (params) => {
  return request.post(
    `/jcgl-mall/app/item/select/page/list?pageSize=${params.pageSize}&pageNum=${params.pageNum}`,
    params,
  );
};
