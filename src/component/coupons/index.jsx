import React from 'react';
import { View } from '@tarojs/components';
import './index.scss';

const Index = (props) => {
  const { key, discount, reduction, title, content, render, fistTime, lastTime, state } = props;
  return (
    <View className="couponBorderBox-list" key={key}>
      <View className="couponBorderBox-list-left">
        <View className="couponBorderBox-list-left-box">
          <View>{discount}</View>
          <View>{reduction}</View>
        </View>
      </View>
      <View className="couponBorderBox-list-right">
        <View>{title}</View>
        <View className="couponBorderBox-list-right-content">
          <View className="couponBorderBox-list-right-content-text">{content}</View>
          {render}
        </View>
        <View className="couponBorderBox-list-right-timeRange resize">
          {`${fistTime} 至 ${lastTime}`}
        </View>
        {state === 1 ? (
          <View className="coupon-state">已使用</View>
        ) : state === 2 ? (
          <View className="coupon-state">已过期</View>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};
export default Index;
