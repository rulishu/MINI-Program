import React from 'react';
import { Button } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@taroify/core';
import { View } from '@tarojs/components';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { popupOpen } = useSelector((state) => state.dividendDetails);

  // 关闭
  const onClose = () => {
    dispatch({
      type: 'dividendDetails/update',
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
            <View className="title">可提现</View>
            <View>当前可提现，还未扣税的金额</View>
          </View>
          <View className="info-bottom">
            <View className="title">今日预估分润</View>
            <View>今日团队订单产生的分润 (含自购)，还未扣</View>
            <View>税的金额</View>
          </View>
          <View className="info-bottom">
            <View className="title">未结算分润</View>
            <View>还未结算的团队订单分润 (含自购) ，还未扣</View>
            <View>税的金额</View>
          </View>
          <View className="info-bottom">
            <View className="title">累积分润</View>
            <View>累积结算完到账，还未扣税的金额</View>
          </View>
          <View className="info-bottom">
            <View className="title">已提现</View>
            <View>已经提现的金额，不包含税费和手续费</View>
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
