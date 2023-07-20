import React from 'react';
import { View } from '@tarojs/components';
import moment from 'moment';
import './index.scss';

const Index = (props) => {
  const { key, couponData = {}, renderButton } = props;
  return (
    <View className="couponBorderBox-list" key={key}>
      <View className="couponBorderBox-list-left">
        <View className="couponBorderBox-list-left-box">
          <View>{couponData?.discount}</View>
          <View>{couponData?.reduction}</View>
        </View>
      </View>
      <View className="couponBorderBox-list-right">
        <View className="couponBorderBox-list-right-title">{couponData?.title}</View>
        <View className="couponBorderBox-list-right-content">
          <View className="couponBorderBox-list-right-content-text">{couponData?.content}</View>
        </View>
        <View className="couponBorderBox-list-right-timeRange">
          {`${moment(couponData?.fistTime).format('YYYY-MM-DD HH:MM:SS')} 至 ${moment(
            couponData?.lastTime,
          ).format('YYYY-MM-DD HH:MM:SS')}`}
        </View>
      </View>
      <View className="couponBorderBox-list-renderButton">{renderButton}</View>
    </View>
  );
};
export default Index;
