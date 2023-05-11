import Taro from '@tarojs/taro';
import { login, getPhone } from '@/server/global';

export default {
  namespace: 'global', // 这是模块名
  state: {
    // 初始化数据
    name: '欢迎来到Taro-Ui',
    userInfo: {},
    vipTypeList: [],
  },

  effects: {
    // eslint-disable-next-line require-yield, no-unused-vars
    *login({ payload }, { call }) {
      Taro.showLoading({ title: '登陆中...', mask: true });
      try {
        const result = yield call(login, payload);
        if (result.code === 200) {
          Taro.hideLoading();
          Taro.reLaunch({
            url: '/pages/home/index',
            success() {
              Taro.showToast({
                title: '登录成功！',
                icon: 'success',
                duration: 2000,
              });
            },
          });
        } else {
          // 提示登录失败
          Taro.showToast({
            title: '登录失败！',
            icon: 'none',
            duration: 2000,
          });
        }
      } catch (err) {
        Taro.hideLoading();
      }
    },
    *getPhone({ payload }, { call, put }) {
      Taro.showLoading({ title: '获取用户信息...', mask: true });
      try {
        const accountInfo = Taro.getAccountInfoSync();
        const params = {
          ...payload,
          appId: accountInfo.miniProgram.appId,
        };
        const result = yield call(getPhone, params);
        if (result && result.code === 200) {
          Taro.hideLoading();
          const { data } = result || {};
          yield put({
            type: 'update',
            payload: {
              userInfo: { ...data },
            },
          });
          yield call(login, { appId: params.appId, jsCode: params.jsCode });
        }
      } catch (err) {}
    },
    // *getMemberType(_, { call, put }) {
    //   try {
    //     const result = yield call(getMemberType);
    //     if (result) {
    //       yield put({
    //         type: 'update',
    //         payload: {
    //           vipTypeList: result?.data || [],
    //         },
    //       });
    //     }
    //   } catch (err) { }
    // },
  },

  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
