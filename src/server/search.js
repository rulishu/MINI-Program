import request from '../utils/request';

// 搜索记录排名查询
export const searchHistoryList = (params) => {
  return request.post(`/jcgl-mall/web/search/history/top/keyword/list`, params);
};

//分页查询商品信息
export const searchSelectList = (params) => {
  return request.post(
    `/jcgl-mall/app/item/select/page/list?pageSize=${params.pageSize}&pageNum=${params.pageNum}`,
    params,
  );
};

// 搜索历史记录
export const getHistory = (params) => {
  return request.post(`/jcgl-user/app/searchHistory/recent/getHistory`, params);
};

// 删除搜索历史记录
export const deleteHistory = (params) => {
  return request.post(`/jcgl-user/app/searchHistory/recent/delete`, params);
};

// 记录游客状态搜索记录
export const recentRecord = (params) => {
  return request.post(`/jcgl-user/app/searchHistory/recent/record`, params);
};
