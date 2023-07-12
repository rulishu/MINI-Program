import request from '../utils/request';

// 获取粉丝数量
export const getMyFansCount = () => {
  return request.post(`/jcgl-user/app/consumer/userFans/myFansCount`);
};

// 获取当前用户团队消费额
export const getTeamEffectiveOrderPrice = () => {
  return request.post(`/jcgl-user/app/consumer/userFans/teamEffectiveOrderPrice`);
};
