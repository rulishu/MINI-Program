/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { selectPrimaryKey } from '@/server/orderDetails';

export default {
  namespace: 'orderDetails', // 这是模块名
  state: {
    // 初始化数据
    orderRefund: false,
    orderStatus: undefined,
    orderAfterSales: false,
    refundType: '',
    orderInfo: {}, //订单详情
  },

  effects: {
    // 订单详情
    *selectPrimaryKey({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(selectPrimaryKey, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              orderInfo: result.result || '',
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
