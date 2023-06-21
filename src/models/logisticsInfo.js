/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';

export default {
  namespace: 'logisticsInfo', // 这是模块名
  state: {
    id: 0,
    // 初始化数据
  },

  effects: {},
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
