/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { getUserInfo } from '@/server/my';

export default {
  namespace: 'my', // 这是模块名
  state: {
    // 初始化数据
    userInfo: {},
  },

  effects: {
    // 查询个人信息
    *getUserInfo({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getUserInfo, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              userInfo: result.result || '',
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
