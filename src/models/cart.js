/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import {
  cartGoodsAll,
  cartGoodsClear,
  cartGoodsDelete,
  cartGoodsCreate,
  cartGoodsCount,
  additionSubtraction,
} from '@/server/cart';

export default {
  namespace: 'cart', // 这是模块名
  state: {
    cartList: [], // 初始化数据
    cartCount: 0, // 购物车数量
  },

  effects: {
    // 查询所有购物车商品
    *cartGoodsAll(_, { call, put }) {
      try {
        const result = yield call(cartGoodsAll);
        if (result?.code === 200) {
          yield put({
            type: 'update',
            payload: {
              cartList: result?.result || [],
            },
          });
        }
      } catch (err) {}
    },
    // 清空购物车商品
    *cartGoodsClear({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(cartGoodsClear, params);
        if (result && result.code === 200) {
          Taro.showToast({
            title: '清空成功',
            icon: 'success',
            duration: 2000,
          });
          payload?.callBack?.();
        }
      } catch (err) {}
    },
    // 删除单个商品
    *cartGoodsDelete({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(cartGoodsDelete, params);
        if (result && result.code === 200) {
          Taro.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
          });
          payload?.callBack?.();
        }
      } catch (err) {}
    },
    // 购物车商品数量
    *cartGoodsCount({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(cartGoodsCount, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              cartCount: result?.result,
            },
          });
        }
      } catch (err) {}
    },
    // 新增购物车
    *cartGoodsCreate({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(cartGoodsCreate, params);
        if (result && result.code === 200) {
          Taro.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
          });
          payload?.callBack?.();
        }
      } catch (err) {}
    },
    // 购物车加减
    *additionSubtraction({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(additionSubtraction, params);
        if (result && result.code === 200) {
          // yield put({
          //   type: 'update',
          //   payload: {
          //     cartCount: result?.result,
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
