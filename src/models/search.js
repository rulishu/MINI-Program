/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { searchHistoryList, searchSelectList, getHistory, deleteHistory } from '@/server/search';

export default {
  namespace: 'search', // 这是模块名
  state: {
    // 初始化数据
    hotLists: [],
    pageNum: 1,
    pageSize: 20,
    selectLists: [],
    searchValue: '',
    historyLists: [],
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

    // 搜索
    *searchSelectList({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(searchSelectList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              selectLists: result.result.records || [],
            },
          });
        }
      } catch (err) {}
    },

    // 搜索历史
    *getHistory({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getHistory, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              historyLists: result.result.slice(0, 20) || [],
            },
          });
        }
      } catch (err) {}
    },

    // 删除搜索历史
    *deleteHistory({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(deleteHistory, params);
        if (result && result.code === 200) {
          Taro.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
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
