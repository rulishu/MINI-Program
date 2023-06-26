import React from 'react';
import { Button } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@taroify/core';
import { View } from '@tarojs/components';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { popupOpen } = useSelector((state) => state.proxyDividendDetails);

  // 关闭
  const onClose = () => {
    dispatch({
      type: 'proxyDividendDetails/update',
      payload: {
        popupOpen: false,
      },
    });
  };

  return (
    <Dialog open={popupOpen} onClose={onClose}>
      <Dialog.Header>粉丝说明</Dialog.Header>
      <Dialog.Content>
        <View className="info">
          <View className="info-bottom">
            <View className="title">账户余额</View>
            <View>已结算，未打款的金额</View>
          </View>
          <View className="info-bottom">
            <View className="title">今日地盘分润(预估)</View>
            <View>今日地盘 (发起方+收件方) 订单分润.还未结算的金额</View>
            <View>算的金额</View>
          </View>
          <View className="info-bottom">
            <View className="title">本月地盘分润(预估)</View>
            <View>本月地盘 (发起方+收件方) 订单分润还未结</View>
            <View>算的金额</View>
          </View>
          <View className="info-bottom">
            <View className="title">累积地盘分润</View>
            <View>累积地盘 (发起方+收件方) 订单分润累积结</View>
            <View>算完到账的金额</View>
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onClick={onClose}>知道了</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
export default Index;
