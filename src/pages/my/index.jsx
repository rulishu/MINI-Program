import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  const onLout = () => {
    Taro.clearStorageSync();
    Taro.navigateTo({ url: '/pages/login/index' });
  };
  return (
    <View>
      <Button type="primary" onTap={onLout}>
        退出
      </Button>
    </View>
  );
};
export default Index;
