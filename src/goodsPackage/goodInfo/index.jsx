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
    let goodsId;
    if (params?.scene?.split('%2C')[1]) {
      goodsId = params?.scene?.split('%2C')[1];
      Taro.setStorageSync('invitationCode', params?.scene?.split('%2C')[3]);
    } else {
      goodsId = params?.id;
      if (params?.invitationCode) {
        Taro.setStorageSync('invitationCode', params?.invitationCode);
      }
    }
    dispatch({
      type: 'goodInfo/infoDetails',
      payload: {
        id: Number(goodsId),
      },
    });
    dispatch({
      type: 'evaluate/evaluationList',
      payload: {
        productId: Number(goodsId),
        pageNum: 1,
        pageSize: 20,
      },
    });
    dispatch({
      type: 'goodInfo/selectCoupons',
      payload: {
        id: Number(goodsId),
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
