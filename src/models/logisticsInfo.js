// import Taro from '@tarojs/taro';

export default {
  namespace: 'logisticsInfo', // 这是模块名
  state: {
    id: 0, // 订单id
    packageList: [], // 包裹列表
    packageActive: 0, // tab栏选中
  },

  effects: {},
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
