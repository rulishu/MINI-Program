/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import {
  agentSelectDetail,
  agentSelectList,
  dividendSelectDetail,
} from '@/server/proxyDividendDetails';

export default {
  namespace: 'proxyDividendDetails',
  state: {
    // 初始化数据
    popupOpen: false,
    orderActive: 0,
    detailData: {}, // 代理分润数据
    agentDataList: [], // 代理和经销分润列表
    dividendDetailData: [], // 经销分润数据
    pageNum: 1,
    pageSize: 20,
    total: 0,
  },

  effects: {
    // 代理管理分润明细查询
    *agentSelectDetail({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(agentSelectDetail, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              detailData: result?.result,
            },
          });
        }
      } catch (err) {}
    },
    // 代理管理分润列表查询
    *agentSelectList({ payload }, { call, put }) {
      Taro.showLoading({ title: '加载中...', mask: true });
      try {
        const params = { ...payload };
        const result = yield call(agentSelectList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              agentDataList: result?.result?.records || [],
              total: result?.result?.total,
            },
          });
          Taro.hideLoading();
        }
      } catch (err) {
        Taro.hideLoading();
      }
    },
    *dividendSelectDetail({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(dividendSelectDetail, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              dividendDetailData: result?.result,
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
