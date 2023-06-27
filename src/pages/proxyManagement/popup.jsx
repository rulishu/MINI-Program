import React from 'react';
import { Button } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@taroify/core';
import { View } from '@tarojs/components';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { popupOpen, popType } = useSelector((state) => state.proxyManagement);

  // 关闭
  const onClose = () => {
    dispatch({
      type: 'proxyManagement/update',
      payload: {
        popupOpen: false,
      },
    });
  };

  const sharingInfo = () => (
    <Dialog open={popupOpen} onClose={onClose}>
      <Dialog.Header>代理说明</Dialog.Header>
      <Dialog.Content>
        <View className="info">
          <View className="info-bottom">
            <View className="title">今日预估分润</View>
            <View>当前产生的预估分润金额，未结算</View>
          </View>
          <View className="info-bottom">
            <View className="title">本月预估分润</View>
            <View>本月累积产生的预估分润金额，未结算</View>
          </View>
          <View className="info-bottom">
            <View className="title">累积分润</View>
            <View>累积结算完到账的分润金额</View>
          </View>
          <View className="info-bottom">
            <View className="title">会员数</View>
            <View>本级地盘所有会员总数</View>
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onClick={onClose}>知道了</Button>
      </Dialog.Actions>
    </Dialog>
  );

  const organizationInfo = () => (
    <Dialog open={popupOpen} onClose={onClose}>
      <Dialog.Header>代理说明</Dialog.Header>
      <Dialog.Content>
        <View className="info">
          <View className="info-bottom">
            <View className="title">代理数</View>
            <View>直属代理+跨级代理总数</View>
          </View>
          <View className="info-bottom">
            <View className="title">一级经销数</View>
            <View>下属代理的全部一级经销商数量</View>
          </View>
          <View className="info-bottom">
            <View className="title">二级经销数</View>
            <View>下属代理的全部二级经销商数量</View>
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onClick={onClose}>知道了</Button>
      </Dialog.Actions>
    </Dialog>
  );

  return popType === 1 ? sharingInfo() : organizationInfo();
};
export default Index;
