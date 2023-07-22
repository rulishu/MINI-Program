/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { evaluationList, getAddEvaluation, upload } from '@/server/evaluate';
import { selectPrimaryKey } from '@/server/orderDetails';

export default {
  namespace: 'evaluate',
  state: {
    // 初始化数据
    releaseOpen: false,
    evaluationRating: [],
    evaluationList: [],
    imagesList: '',
    evaluationTotal: 0,
    orderInfo: {},
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
              evaluationTotal: result?.result.total,
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
        Taro.hideLoading();
      } catch (err) {}
    },

    // 上传图片
    *upload({ payload }, { call, put }) {
      const { file, callBack } = payload;
      try {
        const data = yield call(upload, file);
        if (data && data.code === 200) {
          yield put({
            type: 'update',
            payload: {
              imagesList: data.result || '',
            },
          });
          callBack(data.result);
          Taro.showToast({
            title: '上传成功',
            icon: 'none',
            duration: 2000,
          });
        }
      } catch (err) {}
    },

    // 订单详情
    *selectPrimaryKey({ payload }, { call, put }) {
      try {
        const { callback, id } = payload;
        const result = yield call(selectPrimaryKey, { id: id });
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              orderInfo: result.result || {},
            },
          });
          callback?.(result);
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
