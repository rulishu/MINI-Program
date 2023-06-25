import { packageTrace } from '@/server/logisticsInfo';
// import Taro from '@tarojs/taro';

export default {
  namespace: 'logisticsInfo', // 这是模块名
  state: {
    id: 0, // 订单id
    packageList: [], // 包裹列表
    packageActive: 0, // tab栏选中
    traceInfo: [], //包裹物流信息
  },

  effects: {
    // 获取包裹物流信息
    *getTrace({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(packageTrace, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              traceInfo: result.result.data || [],
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
