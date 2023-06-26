/* eslint-disable no-unused-vars */

export default {
  namespace: 'proxyManagement',
  state: {
    // 初始化数据
    popupOpen: false,
    orderActive: 0,
  },

  effects: {},
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
