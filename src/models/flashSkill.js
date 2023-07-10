/* eslint-disable no-unused-vars */
import { getFlashDetails } from '@/server/flashSkill';

export default {
  namespace: 'flashSkill',
  state: {
    productList: [], // 活动商品列表
    flashDetails: {}, // 活动信息详情
    flashAvailability: false, // 活动有效性
  },

  effects: {
    // 获取活动详情
    *getFlashDetails({ payload }, { call, put }) {
      try {
        const data = yield call(getFlashDetails, payload);
        if (data && data.code === 200) {
          yield put({
            type: 'update',
            payload: {
              flashDetails: data.result || {},
              flashAvailability: true,
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
