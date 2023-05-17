import { getCategoriesList, getList } from '@/server/categories';

export default {
  namespace: 'categories', // 这是模块名
  state: {
    categoriesList: [],
    subList: [],
    subInfoList: {},
  },

  effects: {
    // 获取分类列表
    *getCategoriesList({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
          appId: 'jcgl-mall-admin',
        };
        const result = yield call(getCategoriesList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              categoriesList: result.result,
            },
          });
        }
      } catch (err) {}
    },

    // 获取id对应分类数据
    *getList({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(getList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              subList: result.result.records,
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
