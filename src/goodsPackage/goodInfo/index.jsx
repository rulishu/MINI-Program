import React, { useEffect } from 'react';
import './index.scss';
import { View } from '@tarojs/components';
import Share from './share';
import HeadsInfo from './HeadsInfo';
import Poster from './poster';
import Coupon from './coupon';
import Taro from '@tarojs/taro';
import { useDispatch } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();
  const params = Taro.getCurrentInstance().router.params;
  useEffect(() => {
    if (params?.inviterId) {
      Taro.setStorageSync('inviterId', params?.inviterId);
    } else {
      Taro.showToast({
        title: '请先添加个人信息',
        icon: 'none',
        duration: 2000,
      });
    }
    dispatch({
      type: 'goodInfo/infoDetails',
      payload: {
        id: params?.id,
      },
    });
    dispatch({
      type: 'evaluate/evaluationList',
      payload: {
        productId: Number(params?.id),
        pageNum: 1,
        pageSize: 20,
      },
    });
    dispatch({
      type: 'goodInfo/selectCoupons',
      payload: {
        id: params?.id,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <HeadsInfo />
      <Share />
      <Poster />
      <Coupon />
    </View>
  );
};
export default Index;
