/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { getUserInfo, editUserInfo, statis, checkUser } from '@/server/my';
import Taro from '@tarojs/taro';

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

    //验证是否为代理
    *checkUser({ callBack }, { call, put }) {
      try {
        const result = yield call(checkUser);
        if (result && result.code === 200) {
          result.result
            ? callBack()
            : Taro.showToast({
                title: '该用户不是代理商',
                icon: 'error',
                duration: 2000,
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
