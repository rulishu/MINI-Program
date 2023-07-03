import { getList, selectAllLevelTwo } from '@/server/categories';
import Taro from '@tarojs/taro';

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
    // 营销类目接口
    *selectAllLevelTwo({ payload }, { call, put }) {
      Taro.showLoading({ title: '加载中...', mask: true });
      try {
        const params = {
          ...payload,
        };
        const result = yield call(selectAllLevelTwo, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              getCategoriesTree: result.result,
            },
          });
          Taro.hideLoading();
        }
      } catch (err) {}
    },
    // 商品图片接口
    *getList({ payload }, { call, put }) {
      Taro.showLoading({ title: '加载中...', mask: true });
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
          setTimeout(() => {
            Taro.hideLoading();
          }, 300);
        } else {
          Taro.hideLoading();
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
