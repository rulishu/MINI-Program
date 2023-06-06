/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { getUserInfo, editUserInfo, statis } from '@/server/my';

export default {
  namespace: 'my', // 这是模块名
  state: {
    // 初始化数据
    userInfos: {},
    orderNumList: [],
  },

  effects: {
    // 查询个人信息
    *getUserInfos({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getUserInfo, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              userInfos: result.result || '',
            },
          });
        }
      } catch (err) {}
    },

    // 查询用户各类型订单数量
    *getOrderNum({}, { call, put }) {
      try {
        const result = yield call(statis);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              orderNumList: result.result || '',
            },
          });
        }
      } catch (err) {}
    },

    //编辑个人信息
    *editUserInfo({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(editUserInfo, params);
        if (result && result.code === 200) {
          // yield put({
          //   type: 'update',
          //   payload: {
          //   },
          // });
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
