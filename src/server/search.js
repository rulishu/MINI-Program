import request from '../utils/request';

// 搜索记录排名查询
export const searchHistoryList = (params) => {
  return request.post(`/jcgl-mall/web/search/history/top/keyword/list`, params);
};
