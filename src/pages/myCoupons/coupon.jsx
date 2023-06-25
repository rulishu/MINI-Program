import React from 'react';
import { View } from '@tarojs/components';
import './index.scss';

const Index = (props) => {
  const { state } = props;
  const list = [
    {
      id: 1,
      discount: '¥10',
      reduction: '满100可用',
      title: '满100减10元券',
      content: '酒类优惠卷',
      fistTime: '2023.6.5',
      lastTime: '2023.6.10',
      state: 1,
    },
    {
      id: 2,
      discount: '9折',
      reduction: '满50可用',
      title: '满50打9折券',
      content: '白酒类优惠卷',
      fistTime: '2023.6.5',
      lastTime: '2023.6.10',
      state: 1,
    },
    {
      id: 3,
      discount: '¥5',
      reduction: '满50可用',
      title: '满50打减5元劵',
      content: '白酒类优惠卷',
      fistTime: '2023.6.5',
      lastTime: '2023.6.10',
      state: 1,
    },
    {
      id: 4,
      discount: '¥5',
      reduction: '满50可用',
      title: '满50打减5元劵',
      content: '白酒类优惠卷',
      fistTime: '2023.6.5',
      lastTime: '2023.6.10',
      state: 0,
    },
    {
      id: 5,
      discount: '¥5',
      reduction: '满50可用',
      title: '满50打减5元劵',
      content: '白酒类优惠卷',
      fistTime: '2023.6.5',
      lastTime: '2023.6.10',
      state: 1,
    },
  ];
  return (
    <View className="couponBorderBox">
      {list?.map((item) => (
        <View className="couponBorderBox-list" key={item?.id}>
          <View className="couponBorderBox-list-left">
            <View className="couponBorderBox-list-left-box">
              <View>{item?.discount}</View>
              <View>{item?.reduction}</View>
            </View>
          </View>
          <View className="couponBorderBox-list-right">
            <View>{item?.title}</View>
            <View className="couponBorderBox-list-right-content">
              <View className="couponBorderBox-list-right-content-text">{item?.content}</View>
            </View>
            <View className="couponBorderBox-list-right-timeRange resize">
              {`${item?.fistTime} 至 ${item?.lastTime}`}
            </View>
          </View>
          {state === 1 ? (
            <View className="coupon-state">已使用</View>
          ) : state === 2 ? (
            <View className="coupon-state">已过期</View>
          ) : (
            ''
          )}
        </View>
      ))}
    </View>
  );
};
export default Index;
