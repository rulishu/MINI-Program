import React from 'react';
import { View, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  return (
    <View className="heads">
      <View className="title">
        <Icon name="rect-left" size="15" onClick={() => Taro.navigateBack({ delta: 1 })}></Icon>
        <Text className="titleText">奋斗之露 · 喜庆</Text>
      </View>
      <View className="detailIcon">
        <Icon name="share-n" size="15"></Icon>
        <Icon name="message" size="15"></Icon>
        <Icon name="cart" size="15"></Icon>
      </View>
    </View>
  );
};
export default Index;
