/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { getAllOrders, deleteOrder, receipt, cancelOrder } from '@/server/allOrders';
import { wxpay } from '@/server/goodInfo';

export default {
  namespace: 'allOrders', // 这是模块名
  state: {
    // 初始化数据
    orderActive: 0,
    orderList: [],
    pageNum: 1,
    pageSize: 20,
    total: 0,
    refreshHasMore: false,
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
              total: data.result?.total,
            },
          });
          Taro.hideLoading();
        } else {
          Taro.hideLoading();
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
          Taro.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000,
          });
          // payload.callBack();
          Taro.navigateTo({ url: '/pages/allOrders/index' });
        }
      } catch (err) {}
    },

    // 确认收货
    *receiptOrder({ payload }, { call, put }) {
      try {
        const data = yield call(receipt, payload.id);
        if (data && data.code === 200) {
          yield put({
            type: 'getAllOrders',
            payload: {
              pageNum: 1,
              pageSize: 10,
            },
          });
          Taro.showToast({
            title: data.message,
            icon: 'success',
            duration: 2000,
          });
          payload.callBack();
        } else {
          Taro.showToast({
            title: data.message,
            icon: 'error',
            duration: 2000,
          });
        }
      } catch (err) {}
    },

    //微信支付
    *wxpay({ payload }, { call, put }) {
      try {
        const { callBack, ...other } = payload;
        const result = yield call(wxpay, other);
        if (result.code === 200) {
          let payDetail = result.result.gatewayBody;
          Taro.requestPayment({
            timeStamp: payDetail.timeStamp,
            nonceStr: payDetail.nonceStr,
            package: payDetail.package, // 订单包
            signType: payDetail.signType, // 加密方式统一'
            paySign: payDetail.paySign, // 后台支付签名返回
            provider: payDetail.provider, //支付类型
            appId: payDetail.appId, //小程序Appid
            success: function (res) {
              Taro.showToast({
                title: '支付成功',
                icon: 'none',
                duration: 2000,
              });
              if (res.errMsg === 'requestPayment:ok') {
                callBack();
              }
              Taro.hideLoading();
            },
            fail: async function (res) {
              Taro.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 2000,
              });
              Taro.hideLoading();
            },
          });
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
