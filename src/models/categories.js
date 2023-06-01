import { getCategoriesList, getList, selectAllLevelTwo } from '@/server/categories';

export default {
  namespace: 'categories', // 这是模块名
  state: {
    categoriesList: [],
    getCategoriesTree: [],
    getCategoriesTwoTree: [],
    subList: [],
    subInfoList: {},
    visible: false,
  },

  effects: {
    // 获取分类列表
    *getCategoriesList({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
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

    // // 一二级分类接口
    // *getCategoriesTreeList({ payload }, { call, put }) {
    //   try {
    //     const params = {
    //       ...payload,
    //       appId: 'jcgl-mall-admin',
    //     };
    //     const result = yield call(getCategoriesTreeList, params);
    //     if (result && result.code === 200) {
    //       yield put({
    //         type: 'update',
    //         payload: {
    //           getCategoriesTree: result.result,
    //         },
    //       });
    //     }
    //   } catch (err) { }
    // },
    // 营销类目接口
    *selectAllLevelTwo({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
          appId: 'jcgl-mall-admin',
        };
        const result = yield call(selectAllLevelTwo, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              getCategoriesTree: result.result,
            },
          });
        }
      } catch (err) {}
    },
    // 商品图片接口
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
              subList: result.result,
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
