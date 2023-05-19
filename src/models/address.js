/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { getAddress } from '@/server/address';

export default {
  namespace: 'address', // 这是模块名
  state: {
    // 初始化数据
    addressList: [],
  },

  effects: {
    // 获取地址列表
    *getAddress({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getAddress, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              addressList: result.result || [],
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
