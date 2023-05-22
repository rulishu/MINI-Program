/* eslint-disable no-unused-vars */
import Taro from '@tarojs/taro';
import { goodsAll, deleteGood } from '@/server/cart';

export default {
  namespace: 'cart', // 这是模块名
  state: {
    // 初始化数据
    shoppingList: [],
  },

  effects: {
    // 查询所有购物车商品
    *goodsAll(_, { call, put }) {
      try {
        const result = yield call(goodsAll);
        let dataList = result.result.map((item) => item.goodsDtoList);
        if (result) {
          yield put({
            type: 'update',
            payload: {
              shoppingList: dataList || [],
            },
          });
        }
      } catch (err) {}
    },
    // 删除购物车商品
    *deleteGood({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(deleteGood, params);
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
