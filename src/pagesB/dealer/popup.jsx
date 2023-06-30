import React from 'react';
import { Button } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@taroify/core';
import { View } from '@tarojs/components';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { popupOpen } = useSelector((state) => state.dealer);

  // 关闭
  const onClose = () => {
    dispatch({
      type: 'dealer/update',
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
            <View className="title">直属粉丝</View>
            <View>通过我的邀请码或者分享链接完成注册的新</View>
            <View>用户</View>
          </View>
          <View className="info-bottom">
            <View className="title">团队消费额</View>
            <View>所有粉丝（包括我）的有效消费金额，确认</View>
            <View>收货后计算</View>
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
