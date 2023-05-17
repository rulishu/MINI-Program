import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import my3 from '@/assets/images/my3.svg';
import my5 from '@/assets/images/my5.svg';
import my20 from '@/assets/images/my20.svg';
import my1 from '@/assets/images/my1.svg';
import my10 from '@/assets/images/my10.svg';
import my16 from '@/assets/images/my16.svg';

import './index.scss';

const Index = () => {
  const list = [
    {
      icon: my3,
      title: '待付款',
      num: 233,
    },
    {
      icon: my5,
      title: '待签约',
      num: 12,
    },
    {
      icon: my20,
      title: '封坛中',
      num: 78.23,
    },
    {
      icon: my1,
      title: '待启封',
      num: 1278.23,
    },
    {
      icon: my10,
      title: '待收货',
      num: 1278.23,
    },
    {
      icon: my16,
      title: '退款/售后',
      num: 1278.23,
    },
  ];

  return (
    <View className="card">
      <View className="my-orders-card">
        <View className="my-orders">
          <View>
            <Text>我的封坛</Text>
          </View>
          <View className="my-orders-all">
            <Text>全部封坛</Text>
            <Icon name="rect-right" size="10"></Icon>
          </View>
        </View>
        <View className="my-orders-list">
          {list.map((item, index) => (
            <View key={index} className="my-orders-list-item">
              <Image mode="widthFix" src={item.icon} style={{ width: 24, height: 24 }}></Image>
              <View className="my-orders-list-item-num">
                <Text>{item.title}</Text>
              </View>
            </View>
          ))}
        </View>
        <View className="logistics">
          <View className="my-orders-logistics">
            <View className="my-orders-logistics-title">
              <Text>最近物流</Text>
            </View>
            <View className="my-orders-logistics-info">
              <View className="my-orders-logistics-headIcon"></View>
              <View className="my-orders-logistics-content">
                <View>
                  <Text> 运输中</Text>
                </View>
                <View>
                  <Text>【杭州市】大象国际快递员 老六 正在派件...</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
