/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { getAllOrders } from '@/server/allOrders';

export default {
  namespace: 'allOrders', // 这是模块名
  state: {
    // 初始化数据
    orderActive: 0,
    orderList: [],
  },

  effects: {
    // 获取订单列表
    *getAllOrders({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const data = yield call(getAllOrders, params);
        if (data && data.code === 200) {
          yield put({
            type: 'update',
            payload: {
              orderList: data.result.records || [],
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
