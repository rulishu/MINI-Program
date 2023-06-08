import Taro from '@tarojs/taro';
import { getOrderList, cancelSales, bindReturns } from '@/server/afterSales';

export default {
  namespace: 'sales', // 这是模块名
  state: {
    orderList: [],
    visible: false,
  },

  effects: {
    // 获取售后订单列表
    *getAllOrders({ payload }, { call, put }) {
      try {
        const data = yield call(getOrderList, payload);
        if (data && data.code === 200) {
          yield put({
            type: 'update',
            payload: {
              orderList: data.result.records || [],
            },
          });
          Taro.hideLoading();
        } else {
          Taro.hideLoading();
        }
      } catch (err) {}
    },

    // 取消售后
    *bindReturns({ payload }, { call, put }) {
      try {
        const data = yield call(bindReturns, payload);
        if (data && data.code === 200) {
          yield put({
            type: 'getAllOrders',
            payload: {
              pageNum: 1,
              pageSize: 10,
            },
          });
          Taro.hideLoading();
          Taro.showToast({
            title: '绑定成功',
            icon: 'none',
            duration: 2000,
          });
          yield put({
            type: 'update',
            payload: {
              visible: false,
            },
          });
        } else {
          Taro.hideLoading();
        }
      } catch (err) {}
    },

    // 绑定退货单
    *cancelOrder({ payload }, { call, put }) {
      try {
        const data = yield call(cancelSales, payload);
        if (data && data.code === 200) {
          yield put({
            type: 'getAllOrders',
            payload: {
              pageNum: 1,
              pageSize: 10,
            },
          });
          Taro.hideLoading();
        } else {
          Taro.hideLoading();
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
