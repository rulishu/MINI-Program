/* eslint-disable no-unused-vars */

export default {
  namespace: 'proxyManagement',
  state: {
    // 初始化数据
    popupOpen: false,
    orderActive: 0,
    popType: 0, // 弹窗类型
  },

  effects: {},
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
