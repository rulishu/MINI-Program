/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { selectPrimaryKey, serviceApply } from '@/server/orderDetails';

export default {
  namespace: 'orderDetails', // 这是模块名
  state: {
    // 初始化数据
    orderRefund: false,
    orderStatus: undefined,
    orderAfterSales: false,
    refundType: '',
    orderInfo: {}, //订单详情
    isConfirm: false,
    orderAmount: 0,
    infoDetail: {},
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

    // 申请退款
    *serviceApply({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(serviceApply, params);
        if (result && result.code === 200) {
          Taro.showToast({
            title: '售后申请已提交',
            icon: 'none',
            duration: 2000,
          });
        } else {
          Taro.showToast({
            title: '售后申请失败',
            icon: 'none',
            duration: 2000,
          });
        }
        yield put({
          type: 'update',
          payload: {
            orderRefund: false,
            orderAfterSales: false,
          },
        });
        payload.callBack();
        Taro.navigateTo({ url: '/pages/allOrders/index' });
      } catch (err) {}
    },
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
