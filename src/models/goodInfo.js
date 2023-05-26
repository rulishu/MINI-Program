/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { infoDetails, orderConfirm, wxpay, orderSubmit } from '@/server/goodInfo';

const productDetail = {
  storageFee: 0,
  insurancePremium: 0,
  coupon: 0,
  coSubtractive: 0,
  goodsPrice: 0,
  allGoodsPrice: 0,
  goodsTotalNum: 0, //商品购买个数
};
export default {
  namespace: 'goodInfo', // 这是模块名
  state: {
    // 初始化数据
    visible: false,
    payVisible: false,
    queryInfo: {},
    productDetails: { ...productDetail },
    confirmList: [],
    orderInfo: {},
    payInfo: {}, //支付信息
    currentAddress: {}, //选中地址信息
    submitOrder: {}, //预订单信息
  },

  effects: {
    *infoDetails({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(infoDetails, params);
        if (result) {
          yield put({
            type: 'update',
            payload: {
              queryInfo: result.result,
            },
          });
        }
      } catch (err) {}
    },

    //确认订单
    *orderConfirm({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(orderConfirm, params);
        if (result) {
          yield put({
            type: 'update',
            payload: {
              confirmList: result.result.shoppingCartVOList.map((a) => a.cartVOList).flat() || [],
              orderInfo: result.result || {},
            },
          });
          Taro.setStorageSync('orderInfo', result.result);
        }
      } catch (err) {}
    },

    // 预订单
    *orderSubmit({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(orderSubmit, params);
        if (result) {
          yield put({
            type: 'update',
            payload: {
              submitOrder: result.result || {},
            },
          });
          Taro.removeStorageSync('orderInfo');
          Taro.setStorageSync('submitInfo', result.result);
        }
      } catch (err) {}
    },

    //微信支付
    *wxpay({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(wxpay, params);
        Taro.setStorageSync('payInfo', result.result.gatewayBody);
        if (result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              payInfo: result.result.gatewayBody || {},
            },
          });
          callback();
          Taro.removeStorageSync('submitInfo');
          Taro.removeStorageSync('payInfo');
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
