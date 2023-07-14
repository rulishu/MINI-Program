/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { agentSelectDetail, agentSelectList } from '@/server/proxyDividendDetails';

export default {
  namespace: 'proxyDividendDetails',
  state: {
    // 初始化数据
    popupOpen: false,
    orderActive: 0,
    detailData: {}, // 分润明细查询数据
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
      try {
        const params = { ...payload };
        const result = yield call(agentSelectList, params);
      } catch (err) {}
    },
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
