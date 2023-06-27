/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { evaluationList, getAddEvaluation } from '@/server/evaluate';

export default {
  namespace: 'evaluate',
  state: {
    // 初始化数据
    releaseOpen: false,
    evaluationRating: [],
    evaluationList: [],
  },

  effects: {
    // 评价列表
    *evaluationList({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(evaluationList, params);
        if (result.code === 200) {
          const evaluationRating = result?.result?.records.filter((item) => item?.rating === 1);
          yield put({
            type: 'update',
            payload: {
              evaluationRating: evaluationRating,
              evaluationList: result?.result?.records,
            },
          });
        }
      } catch (err) {}
    },
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
