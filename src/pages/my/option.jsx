import React from 'react';
import { View, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  const list = [
    {
      icon: 'my2',
      title: '我的客服',
    },
    {
      icon: 'my2',
      title: '我的合同',
    },
    {
      icon: 'my2',
      title: '开发票',
      num: 78.23,
    },
    {
      icon: 'my2',
      title: '地址管理',
    },
    {
      icon: 'my2',
      title: '体现管理',
    },
    {
      icon: 'my2',
      title: '专属海报',
    },
    {
      icon: 'my2',
      title: 'VIP权益',
    },
    {
      icon: 'my2',
      title: '分销分析',
    },
    {
      icon: 'my2',
      title: '我的收藏',
    },
    {
      icon: 'my2',
      title: '升级成代理',
    },
    {
      icon: 'my2',
      title: '积分商城',
    },
  ];

  return (
    <View className="option">
      <View className="option-list">
        {list.map((item, index) => (
          <View key={index} className="option-list-item">
            <Icon name={item.icon} size="30"></Icon>
            <View className="option-list-item-title">
              <Text>{item.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Index;
