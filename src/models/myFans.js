/* eslint-disable no-unused-vars */
import { myFansCount, selectPage } from '@/server/myFans';

export default {
  namespace: 'myFans',
  state: {
    // 初始化数据
    popupOpen: false,
    orderActive: 0,
    myFansCountList: {},
    fansList: [],
  },

  effects: {
    // 统计
    *myFansCount({ payload }, { call, put }) {
      try {
        const result = yield call(myFansCount, {});
        if (result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              myFansCountList: result.result,
            },
          });
        }
      } catch (err) {}
    },
    // 列表
    *selectPage({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(selectPage, params);
        if (result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              fansList: result?.result,
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
