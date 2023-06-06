import { getBannerList, getLevel, getLevelList } from '@/server/home';

export default {
  namespace: 'home',
  state: {
    homeList: [],
    wineList: [],
    categoriesList: [],
    bannerList: [], // 轮播图列表
    activityList: [], // 活动列表
    levelTab: [], // 一级tab
    levelList: [], //商品列表
    pageNum: 1,
    pageSize: 20,
  },

  effects: {
    // 获取轮播图列表
    *getBannerList({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getBannerList, params);
        if (result && result.code === 200) {
          let bannerList = result.result.filter((item) => {
            return item.type === 1;
          });
          // 获取活动列表
          let activityList = result.result.filter((item) => {
            return item.type === 2;
          });
          yield put({
            type: 'update',
            payload: {
              bannerList: bannerList || [],
              activityList: activityList || [],
            },
          });
        }
      } catch (err) {}
    },

    // 查询一级分类
    *getLevel({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getLevel, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              levelTab: result.result || [],
            },
          });
        }
      } catch (err) {}
    },

    // 获取商品列表
    *getLevelList({ payload }, { call, put }) {
      try {
        const params = {
          ...payload,
        };
        const result = yield call(getLevelList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              levelList: result.result || [],
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
