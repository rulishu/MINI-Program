/* eslint-disable no-unused-vars */

export default {
  namespace: 'evaluate',
  state: {
    // 初始化数据
    releaseOpen: false,
  },

  effects: {},
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
