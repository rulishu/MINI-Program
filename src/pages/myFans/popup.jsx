import React from 'react';
import { Button } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '@taroify/core';
import { View } from '@tarojs/components';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { popupOpen } = useSelector((state) => state.myFans);

  // 关闭
  const onClose = () => {
    dispatch({
      type: 'myFans/update',
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
            <View className="title">我的粉丝</View>
            <View>我的粉丝=直属粉丝+跨级粉丝+普通粉丝</View>
          </View>
          <View className="info-bottom">
            <View className="title">直属粉丝</View>
            <View>通过我的邀请码或者分享链接完成注册的新</View>
            <View>用户</View>
          </View>
          <View className="info-bottom">
            <View className="title">跨级粉丝</View>
            <View>我的直属粉丝邀请注册的新用户</View>
          </View>
          <View className="info-bottom">
            <View className="title">普通粉丝</View>
            <View>团队中非直属非跨级的粉丝</View>
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
