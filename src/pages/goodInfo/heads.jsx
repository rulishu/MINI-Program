import React from 'react';
import { View, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  return (
    <View className="heads">
      <View className="title">
        <View style={{ marginRight: 19 }}>
          <Icon name="rect-left" size="15" onClick={() => Taro.navigateBack({ delta: 1 })}></Icon>
        </View>
        <View>
          <Text className="titleText">奋斗之露 · 喜庆</Text>
        </View>
      </View>
      <View className="detailIcon">
        <View style={{ marginRight: 19 }}>
          <Icon name="share-n" size="15"></Icon>
        </View>
        <View style={{ marginRight: 19 }}>
          <Icon name="message" size="15"></Icon>
        </View>
        <View>
          <Icon name="cart" size="15"></Icon>
        </View>
      </View>
    </View>
  );
};
export default Index;
