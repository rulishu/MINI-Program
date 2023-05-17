import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import my13 from '@/assets/images/my13.svg';
import my12 from '@/assets/images/my12.svg';
import my9 from '@/assets/images/my9.svg';
import my7 from '@/assets/images/my7.svg';
import my18 from '@/assets/images/my18.svg';
import my11 from '@/assets/images/my11.svg';
import my14 from '@/assets/images/my14.svg';
import my17 from '@/assets/images/my17.svg';
import my15 from '@/assets/images/my15.svg';
import my2 from '@/assets/images/my2.svg';
import my21 from '@/assets/images/my21.svg';

import './index.scss';

const Index = () => {
  const list = [
    {
      icon: my13,
      title: '我的客服',
    },
    {
      icon: my12,
      title: '我的合同',
    },
    {
      icon: my9,
      title: '开发票',
      num: 78.23,
    },
    {
      icon: my7,
      title: '地址管理',
    },
    {
      icon: my18,
      title: '体现管理',
    },
    {
      icon: my11,
      title: '专属海报',
    },
    {
      icon: my14,
      title: 'VIP权益',
    },
    {
      icon: my17,
      title: '分销分析',
    },
    {
      icon: my15,
      title: '我的收藏',
    },
    {
      icon: my2,
      title: '升级成代理',
    },
    {
      icon: my21,
      title: '积分商城',
    },
  ];

  return (
    <View className="option">
      <View className="option-list">
        {list.map((item, index) => (
          <View key={index} className="option-list-item">
            <Image mode="widthFix" src={item.icon} style={{ width: 24, height: 24 }}></Image>
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
