import React from 'react';
import { View, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  const list = [
    {
      icon: 'my2',
      title: '待付款',
      num: 233,
    },
    {
      icon: 'my2',
      title: '待发货',
      num: 12,
    },
    {
      icon: 'my2',
      title: '待收货',
      num: 78.23,
    },
    {
      icon: 'my2',
      title: '待评价',
      num: 1278.23,
    },
    {
      icon: 'my2',
      title: '退款/售后',
      num: 1278.23,
    },
  ];

  return (
    <View className="card">
      <View className="my-orders-card">
        <View className="my-orders">
          <View>
            <Text>我的订单</Text>
          </View>
          <View className="my-orders-all">
            <Text>全部订单</Text>
            <Icon name="rect-right" size="10"></Icon>
          </View>
        </View>
        <View className="my-orders-list">
          {list.map((item, index) => (
            <View key={index} className="my-orders-list-item">
              <Icon name={item.icon} size="24"></Icon>
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
