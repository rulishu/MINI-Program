/* eslint-disable no-unused-vars */
import { getAgent } from '@/server/myFans';
import Taro from '@tarojs/taro';

export default {
  namespace: 'proxyManagement',
  state: {
    // 初始化数据
    popupOpen: false,
    orderActive: 0,
    popType: 0, // 弹窗类型
    agentInfo: {}, //代理地盘信息
  },

  effects: {
    *getAgent({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getAgent, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              agentInfo: result.result || '',
            },
          });
          Taro.hideLoading();
        } else {
          Taro.hideLoading();
        }
      } catch (err) {
        Taro.hideLoading();
      }
    },
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
