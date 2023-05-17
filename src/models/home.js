import { getList } from '@/server/home';

export default {
  namespace: 'home', // 这是模块名
  state: {
    homeList: [],
    wineList: [],
    categoriesList: [],
  },

  effects: {
    // 查询商品列表
    *getList({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              homeList: result.result.records.slice(0, 2) || [],
              wineList: result.result.records.slice(0, 4) || [],
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
