import Taro from '@tarojs/taro';
import { getOrderList, cancelSales, bindReturns } from '@/server/afterSales';

export default {
  namespace: 'sales', // 这是模块名
  state: {
    orderList: [],
    orderId: 0, // 选中弹窗itemid
    visible: false,
    pageNum: 1,
    pageSize: 20,
    total: 0,
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

    // 绑定退货单
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
            title: '提交成功',
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

    // 取消售后
    *cancelOrder({ payload }, { call }) {
      try {
        const { callBack, ...other } = payload;
        const data = yield call(cancelSales, other);
        if (data && data.code === 200) {
          Taro.hideLoading();
          callBack();
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
