/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { getAddress, addAddress, treeList } from '@/server/address';

export default {
  namespace: 'address', // 这是模块名
  state: {
    // 初始化数据
    addressList: [],
    treeDate: [],
  },

  effects: {
    // 获取地址列表
    *getAddress({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getAddress, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              addressList: result.result || [],
            },
          });
        }
      } catch (err) {}
    },

    // 新增地址
    *addAddress({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(addAddress, params);
        if (result && result.code === 200) {
          Taro.showToast({
            title: '新增收货地址成功',
            icon: 'success',
            duration: 2000,
          });
        }
      } catch (err) {}
    },

    // 获取地址列表
    *treeList({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(treeList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              treeDate: result.result || [],
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
