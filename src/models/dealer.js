/* eslint-disable no-unused-vars */

export default {
  namespace: 'dealer',
  state: {
    // 初始化数据
    popupOpen: false,
  },

  effects: {},
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
