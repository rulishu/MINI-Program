/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
// import { goodsAll } from '@/server/cart';

export default {
  namespace: 'goodInfo', // 这是模块名
  state: {
    // 初始化数据
    visible: false,
  },

  effects: {
    // *goodsAll(_, { call, put }) {
    //   try {
    //     const result = yield call(goodsAll);
    //     let dataList = result.result.map((item) => item.goodsDtoList);
    //     if (result) {
    //       yield put({
    //         type: 'update',
    //         payload: {
    //           shoppingList: dataList || [],
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
