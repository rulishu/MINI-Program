/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { searchHistoryList } from '@/server/search';

export default {
  namespace: 'search', // 这是模块名
  state: {
    // 初始化数据
    hotLists: [],
  },

  effects: {
    // 搜索记录排名查询
    *searchHistoryList({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(searchHistoryList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              hotLists: result.result || '',
            },
          });
        }
      } catch (err) {}
    },
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
