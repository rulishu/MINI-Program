import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

const Foots = () => {
  const data = [
    {
      title: '奋斗之露·喜庆',
      text: '5年佳酿 53度酱香型白酒',
      price: '￥1290',
    },
    {
      title: '奋斗之露·喜庆',
      text: '5年佳酿 53度酱香型白酒',
      price: '￥1290',
    },
    {
      title: '奋斗之露·喜庆',
      text: '5年佳酿 53度酱香型白酒',
      price: '￥1290',
    },
    {
      title: '奋斗之露·喜庆',
      text: '5年佳酿 53度酱香型白酒',
      price: '￥1290',
    },
  ];
  return (
    <View className="foot">
      {data.map((item, index) => {
        return (
          <View key={index} className="foot-items">
            <View className="foot-item">
              <Image
                mode="widthFix"
                // eslint-disable-next-line global-require
                src={require('@/assets/images/home8.png')}
                className="foot-item"
              ></Image>
              <View className="foot-price">
                <View className="price">
                  <Text className="price-text">{item.price}</Text>
                </View>
              </View>
            </View>
            <View className="foot-content">
              <View>
                <Text className="foot-title">{item.title}</Text>
              </View>
              <View>
                <Text className="foot-text">{item.text}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default Foots;
