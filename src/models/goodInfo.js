/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { infoDetails } from '@/server/goodInfo';

export default {
  namespace: 'goodInfo', // 这是模块名
  state: {
    // 初始化数据
    visible: false,
    payVisible: false,
    queryInfo: {},
  },

  effects: {
    *infoDetails({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(infoDetails, params);
        if (result) {
          yield put({
            type: 'update',
            payload: {
              queryInfo: result.result,
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
