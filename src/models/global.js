import Taro from '@tarojs/taro';
import { getPhone, newLogin } from '@/server/global';

export default {
  namespace: 'global', // 这是模块名
  state: {
    // 初始化数据
    userInfo: {},
    vipTypeList: [],
    activeIndex: 0,
    isGetPhone: false,
  },

  effects: {
    // eslint-disable-next-line require-yield, no-unused-vars
    *getPhone({ payload }, { call, put }) {
      Taro.showLoading({ title: '手机号码登录...', mask: true });
      try {
        // const accountInfo = Taro.getAccountInfoSync();
        const params = {
          ...payload,
          appId: 'jcgl-mall-admin',
          // appId: accountInfo.miniProgram.appId,
        };
        const result = yield call(getPhone, params);
        if (result && result.code === 200) {
          Taro.hideLoading();
          const { userDto, access_token, refresh_token } = result.result || {};
          Taro.setStorage({
            key: 'userInfo',
            data: userDto,
          });
          Taro.setStorage({
            key: 'token',
            data: access_token,
          });
          Taro.setStorage({
            key: 'refresh_token',
            data: refresh_token,
          });
          yield put({
            type: 'update',
            payload: {
              userInfo: { ...userDto },
              activeIndex: 0,
            },
          });
          const pageHistory = getCurrentPages();
          if (pageHistory[0].route === 'pages/my/index') {
            yield put({
              type: 'update',
              payload: {
                activeIndex: 4,
              },
            });
            payload.callBack(userDto.id);
          }
          Taro.navigateBack({
            delta: 1,
          });
        } else {
          Taro.showToast({
            title: '请稍后再试',
            icon: 'none',
            duration: 2000,
          });
          Taro.hideLoading();
        }
      } catch (err) {
        Taro.hideLoading();
      }
    },
    *newLogin({ payload }, { call, put }) {
      Taro.showLoading({ title: '获取用户信息...', mask: true });
      try {
        // const accountInfo = Taro.getAccountInfoSync();
        const params = {
          ...payload,
          appId: 'jcgl-mall-admin',
          // appId: accountInfo.miniProgram.appId,
        };
        const result = yield call(newLogin, params);
        if (result && result.code === 200) {
          Taro.hideLoading();
          const { userDto, access_token, refresh_token } = result.result || {};
          Taro.setStorage({
            key: 'userInfo',
            data: userDto,
          });
          Taro.setStorage({
            key: 'token',
            data: access_token,
          });
          Taro.setStorage({
            key: 'refresh_token',
            data: refresh_token,
          });
          yield put({
            type: 'update',
            payload: {
              userInfo: { ...userDto },
              activeIndex: 0,
            },
          });
          const pageHistory = getCurrentPages();
          if (pageHistory[0].route === 'pages/my/index') {
            yield put({
              type: 'update',
              payload: {
                activeIndex: 4,
              },
            });
            payload.callBack(userDto.id);
          }
          Taro.navigateBack({
            delta: 1,
          });
          // Taro.switchTab({ url: '/pages/home/index' });
        } else {
          Taro.showToast({
            title: '请授权获取手机号',
            icon: 'none',
            duration: 2000,
          });
          Taro.hideLoading();
          yield put({
            type: 'update',
            payload: {
              isGetPhone: true,
            },
          });
        }
      } catch (err) {
        Taro.hideLoading();
      }
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
