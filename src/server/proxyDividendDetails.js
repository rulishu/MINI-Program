import request from '../utils/request';

// 代理管理分润明细查询
export const agentSelectDetail = (params) => {
  return request.get(`/jcgl-mall/app/agent/select/detail?id=${params?.id}`);
};

// 代理管理分润列表查询
export const agentSelectList = (params) => {
  return request.post(
    `/jcgl-mall/app/dividend/flow/select/page/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    params,
  );
};
