/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
export default {
  namespace: 'orderDetails', // 这是模块名
  state: {
    // 初始化数据
    orderRefund: false,
    orderStatus: undefined,
    orderAfterSales: false,
    refundType: '',
  },

  effects: {},

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
