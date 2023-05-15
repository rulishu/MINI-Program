import React from 'react';
import { View } from '@tarojs/components';
import './index.scss';
import Left from './left';
import Right from './right';

const Index = () => {
  return (
    <View className="all">
      <View className="all-left">
        <Left />
      </View>
      <View className="all-right">
        <Right />
      </View>
    </View>
  );
};
export default Index;
