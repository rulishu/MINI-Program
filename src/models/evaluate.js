/* eslint-disable no-unused-vars */
import { getAddEvaluation } from '@/server/evaluate';
import Taro from '@tarojs/taro';

export default {
  namespace: 'evaluate',
  state: {
    // 初始化数据
    releaseOpen: false,
    releaseData: [],
  },

  effects: {
    // 批量创建订单商品评价
    *getAddEvaluation({ payload }, { call, put }) {
      const { releaseData, callBack } = payload;
      try {
        const params = [...releaseData];
        const data = yield call(getAddEvaluation, params);
        if (data && data.code === 200) {
          Taro.showToast({
            title: '评论已发布',
            icon: 'none',
            duration: 2000,
          });
        }
        callBack();
      } catch (err) {}
    },
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
