/* eslint-disable no-unused-vars */
import { getUserInfo } from '@/server/my';
import { getMyFansCount, getTeamEffectiveOrderPrice } from '@/server/dealer';

export default {
  namespace: 'dealer',
  state: {
    popupOpen: false, // 弹窗状态
    userInfos: {}, // 用户数据
    fansCount: 0, // 用户粉丝
    consumptionAmount: 0, // 团队销售额
    fansPercent: 0, // 粉丝任务完成百分比
    amountPercent: 0, // 消费额百分比任务完成百分比
  },

  effects: {
    // 查询个人信息
    *getUserInfos({ payload }, { call, put }) {
      try {
        const params = { ...payload };
        const result = yield call(getUserInfo, params);
        if (result && result.code === 200) {
          yield put({
            type: 'update',
            payload: {
              userInfos: result.result || '',
            },
          });
          yield put({
            // 获取粉丝数
            type: 'getMyFansCount',
          });
          yield put({
            // 获取用户团队销售额
            type: 'getTeamEffectiveOrderPrice',
          });
        }
      } catch (err) {}
    },
    // 查询用户粉丝数量
    *getMyFansCount({ payload }, { call, put }) {
      try {
        const result = yield call(getMyFansCount);
        if (result && result.code === 200) {
          let percent;
          if (dealer?.userInfos?.level === '3') {
            percent = result?.result / 10;
          } else {
            percent = result?.result / 20;
          }
          yield put({
            type: 'update',
            payload: {
              fansCount: result.result.directFans || 0,
              fansPercent: percent,
            },
          });
        }
      } catch (err) {}
    },
    // 查询用户团队销售额
    *getTeamEffectiveOrderPrice({ payload }, { call, put, select }) {
      try {
        const result = yield call(getTeamEffectiveOrderPrice);
        const { dealer } = yield select();

        if (result && result.code === 200) {
          let percent;
          if (dealer?.userInfos?.level === '3') {
            percent = result?.result / 3000;
          } else {
            percent = result?.result / 20000;
          }
          yield put({
            type: 'update',
            payload: {
              consumptionAmount: result?.result || 0,
              amountPercent: percent,
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
