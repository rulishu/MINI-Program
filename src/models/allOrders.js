/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
export default {
  namespace: 'allOrders', // 这是模块名
  state: {
    // 初始化数据
    orderActive: 0,
  },

  effects: {},

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
