/* eslint-disable no-unused-vars */
// import Taro from '@tarojs/taro';
import { selectAreaClassAagent, selectAreaClassBagent, selectList } from '@/server/select';

export default {
  namespace: 'select', // 这是模块名
  state: {
    // 初始化数据
    scrollTop: 0,
    Threshold: 20,
    firstLevelAreaClassAgent: [], //一级镖局
    secondLevelAreaClassAgent: [], //二级镖局
    list: [], //商品信息
    pageNum: 1,
    pageSize: 20,
    total: 0,
    currentIndex: 0,
    interval: 2000,
  },

  effects: {
    // 查询头部一级镖局
    *selectAreaClassAagent({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(selectAreaClassAagent, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              firstLevelAreaClassAgent: result.result || [],
            },
          });
        }
      } catch (err) {}
    },

    // 根据一级镖局获取二级镖局
    *selectAreaClassBagent({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(selectAreaClassBagent, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              secondLevelAreaClassAgent: result.result || [],
            },
          });
          payload.callBack(parseInt(result.result?.at(0)?.areaId));
        }
      } catch (err) {}
    },

    // 根据镖局地区码获取所属商品信息
    *selectList({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(selectList, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              list: result.result.records || [],
            },
          });
          Taro.hideLoading();
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
