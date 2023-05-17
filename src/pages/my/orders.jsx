import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import my3 from '@/assets/images/my3.svg';
import my8 from '@/assets/images/my8.svg';
import my10 from '@/assets/images/my10.svg';
import my14 from '@/assets/images/my14.svg';
import my19 from '@/assets/images/my19.svg';

import './index.scss';

const Index = () => {
  const list = [
    {
      icon: my3,
      title: '待付款',
      num: 233,
    },
    {
      icon: my8,
      title: '待发货',
      num: 12,
    },
    {
      icon: my10,
      title: '待收货',
      num: 78.23,
    },
    {
      icon: my14,
      title: '待评价',
      num: 1278.23,
    },
    {
      icon: my19,
      title: '退款/售后',
      num: 1278.23,
    },
  ];

  return (
    <View className="card">
      <View className="my-orders-card">
        <View className="my-orders">
          <View>
            <Text className="my-orders-title">我的订单</Text>
          </View>
          <View className="my-orders-all">
            <Text>全部订单</Text>
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
