import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import my3 from '@/assets/images/my3.svg';
import my8 from '@/assets/images/my8.svg';
import my10 from '@/assets/images/my10.svg';
import my14 from '@/assets/images/my14.svg';
import my19 from '@/assets/images/my19.svg';
import Taro from '@tarojs/taro';
import { useDispatch } from 'react-redux';

import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const list = [
    {
      id: 1,
      icon: my3,
      title: '待付款',
      num: 233,
    },
    {
      id: 2,
      icon: my8,
      title: '待发货',
      num: 12,
    },
    {
      id: 3,
      icon: my10,
      title: '待收货',
      num: 78.23,
    },
    {
      id: 4,
      icon: my14,
      title: '待评价',
      num: 1278.23,
    },
    {
      id: 5,
      icon: my19,
      title: '退款/售后',
      num: 1278.23,
    },
  ];

  const goOrder = async (item) => {
    Taro.navigateTo({ url: '/pages/allOrders/index' });
    await dispatch({
      type: 'allOrders/update',
      payload: {
        orderActive: item.id,
      },
    });
  };

  // 跳转物流信息
  const goLogisticsInfo = () => {
    Taro.navigateTo({ url: '/pages/logisticsInfo/index' });
  };

  return (
    <View className="card">
      <View className="my-orders-card">
        <View className="my-orders">
          <View>
            <Text className="my-orders-title">我的订单</Text>
          </View>
          <View
            className="my-orders-all"
            onTap={async () => {
              Taro.navigateTo({ url: '/pages/allOrders/index' });
              await dispatch({
                type: 'allOrders/update',
                payload: {
                  orderActive: 0,
                },
              });
            }}
          >
            <Text>全部订单</Text>
            <Icon name="rect-right" size="10"></Icon>
          </View>
        </View>
        <View className="my-orders-list">
          {list.map((item, index) => (
            <View key={index} className="my-orders-list-item" onTap={() => goOrder(item)}>
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
            <View className="my-orders-logistics-info" onTap={() => goLogisticsInfo()}>
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
