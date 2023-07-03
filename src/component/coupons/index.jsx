import React from 'react';
import { View } from '@tarojs/components';
import './index.scss';

const Index = (props) => {
  const { key, couponData = {}, renderButton, state } = props;
  return (
    <View className="couponBorderBox-list" key={key}>
      <View className="couponBorderBox-list-left">
        <View className="couponBorderBox-list-left-box">
          <View>{couponData?.discount}</View>
          <View>{couponData?.reduction}</View>
        </View>
      </View>
      <View className="couponBorderBox-list-right">
        <View>{couponData?.title}</View>
        <View className="couponBorderBox-list-right-content">
          <View className="couponBorderBox-list-right-content-text">{couponData?.content}</View>
        </View>
        <View className="couponBorderBox-list-right-timeRange">
          {`${couponData?.fistTime} 至 ${couponData?.lastTime}`}
        </View>
      </View>
      <View className="couponBorderBox-list-renderButton">{renderButton}</View>
      {state === 1 ? (
        <View className="coupon-state">已使用</View>
      ) : state === 2 ? (
        <View className="coupon-state">已过期</View>
      ) : (
        ''
      )}
    </View>
  );
};
export default Index;
