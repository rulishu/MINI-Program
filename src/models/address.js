/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { getAddress, addAddress, treeList, editAddress, deleteAddress } from '@/server/address';

export default {
  namespace: 'address', // 这是模块名
  state: {
    // 初始化数据
    addressList: [],
    treeDate: [],
    reData: {},
  },

  effects: {
    // 获取地址列表
    *getAddress({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getAddress, params);
        if (result && result.code === 200) {
          // 默认地址
          const defultAddress = result.result
            ?.filter((item) => {
              return item.isDefault === 1;
            })
            .at(0);
          const lastAddress = defultAddress === undefined ? '添加收货地址' : defultAddress;
          Taro.setStorageSync('defultAddress', lastAddress);
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
            title: '新增成功',
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

    // 编辑地址
    *editAddress({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(editAddress, params);
        if (result && result.code === 200) {
          Taro.showToast({
            title: '编辑成功',
            icon: 'success',
            duration: 2000,
          });
        }
      } catch (err) {}
    },

    // 删除地址
    *deleteAddress({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(deleteAddress, params);
        if (result && result.code === 200) {
          Taro.showToast({
            title: '删除成功',
            icon: 'success',
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
