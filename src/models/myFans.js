/* eslint-disable no-unused-vars */

export default {
  namespace: 'myFans',
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
