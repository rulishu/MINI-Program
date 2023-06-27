import { selectItemTopTen } from '@/server/dealDone';

export default {
  namespace: 'dealDone',
  state: {
    levelList: [],
    pageNum: 1,
    pageSize: 20,
  },

  effects: {
    // 查询销量前100中，随机取10个商品列表
    *selectItemTopTen({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(selectItemTopTen, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              levelList: result?.result || [],
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
