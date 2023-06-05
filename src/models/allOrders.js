/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { getAllOrders, deleteOrder, cancelOrder } from '@/server/allOrders';

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

    // 删除订单
    *deleteOrder({ payload }, { call }) {
      try {
        const data = yield call(deleteOrder, { id: payload.id });
        if (data && data.code === 200) {
          Taro.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
          });
          payload.callBack();
        }
      } catch (err) {}
    },

    // 取消订单
    *cancelOrder({ payload }, { call, put }) {
      try {
        const data = yield call(cancelOrder, payload);
        if (data && data.code === 200) {
          yield put({
            type: 'getAllOrders',
            payload: {
              pageNum: 1,
              pageSize: 10,
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
