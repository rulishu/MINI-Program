import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

const Cards = () => {
  const data = [
    {
      title: '爆品酒',
      text: '5年佳酿 53度酱香型白酒 500ml*6瓶/箱',
      price: '￥1890.00',
    },
    {
      title: '爆品酒',
      text: '5年佳酿 53度酱香型白酒 500ml*6瓶/箱',
      price: '￥1890.00',
    },
  ];
  return (
    <View className="card">
      {data.map((item, index) => {
        return (
          <View key={index} className="card-items">
            <View className="card-item">
              <Image
                mode="widthFix"
                // eslint-disable-next-line global-require
                src={require('@/assets/images/home7.png')}
                className="page-homes-card-image"
              ></Image>
            </View>
            <View className="card-content">
              <View className="card-head">
                <Text className="card-title">{item.title}</Text>
                <Text className="card-text">{item.text}</Text>
              </View>
              <View className="card-foot">
                <Text className="card-price">{item.price}</Text>
                <View className="card-btn">
                  <Text className="card-btn-text">马上抢</Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default Cards;
