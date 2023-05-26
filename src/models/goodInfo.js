/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { infoDetails, orderConfirm } from '@/server/goodInfo';

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
    shareVisible: false,
    queryInfo: {},
    productDetails: { ...productDetail },
    confirmList: [],
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
