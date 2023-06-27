/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { couponUserAll, couponUsedAll, couponUsedStaleAll } from '@/server/myCoupons';

export default {
  namespace: 'myCoupons',
  state: {
    couponUserAllList: [], //待使用
    couponUsedAllList: [], //已使用
    couponUsedStaleAllList: [], //已过期
  },

  effects: {
    // 待使用
    *couponUserAll({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(couponUserAll, params);
        if (result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              couponUserAllList: result?.result?.records,
            },
          });
        }
      } catch (err) {}
    },
    // 已使用
    *couponUsedAll({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(couponUsedAll, params);
        if (result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              couponUsedAllList: result?.result?.records,
            },
          });
        }
      } catch (err) {}
    },
    // 已过期
    *couponUsedStaleAll({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(couponUsedStaleAll, params);
        if (result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              couponUsedStaleAllList: result?.result?.records,
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
