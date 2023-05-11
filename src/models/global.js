import Taro from '@tarojs/taro';

export default {
  namespace: 'global', // 这是模块名
  state: {
    // 初始化数据
    name: '欢迎来到Taro-Ui',
    userInfo: {},
  },

  effects: {
    *login({ payload }, { call }) {
      const data = yield call('', payload);
      if (data.code === 1) {
        Taro.setStorage({ key: 'token', data: data.data.token });
      } else {
      }
    },
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
