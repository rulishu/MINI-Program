import request from '../utils/request';

// 代理管理分润
export const agentSelectDetail = (params) => {
  return request.get(`/jcgl-mall/app/agent/select/detail?id=${params?.id}`);
};

// 代理分润列表查询 && 经销收益列表查询
export const agentSelectList = (params) => {
  return request.post(
    `/jcgl-mall/app/dividend/flow/select/page/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};

// 经销权益分润
export const dividendSelectDetail = (params) => {
  return request.get(`/jcgl-mall/app/dividend/flow/select/user/detail?id=${params?.id}`);
};
