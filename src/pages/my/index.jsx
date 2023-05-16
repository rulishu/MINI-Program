import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import './index.scss';
import Heads from './heads';
import Orders from './orders';
// import Seals from './seals';
import Option from './option';

const Index = () => {
  const onLout = () => {
    Taro.clearStorageSync();
    Taro.navigateTo({ url: '/pages/login/index' });
  };
  return (
    <View>
      <Heads />
      <Orders />
      {/* <Seals /> */}
      <Option />
      <View className="goOut">
        <Button type="primary" onTap={onLout}>
          退出
        </Button>
      </View>
    </View>
  );
};
export default Index;
