import React from 'react';
import { View } from '@tarojs/components';
// import { Button } from '@taroify/core';
import './index.scss';

export default ({ couponData = {}, renderButton }) => {
  return (
    <View className="nb-coupon__box">
      <View className="nb-coupon__main">
        <View className="couponBorderBox-list-left-box">
          <View className="font">{couponData.discount || '¥10'}</View>
          <View className="font">{couponData.reduction || '满100可用'}</View>
        </View>
        <View className="couponBorderBox-list-right">
          <View className="font">{couponData.title || '满100可用'}</View>
          <View className="font">{couponData.content || '酒类优惠卷'}</View>
          <View className="font">{`${couponData.fistTime || '2023.6.5'} 至 ${
            couponData.lastTime || '2023.6.10'
          }`}</View>
        </View>
      </View>
      <View className="nb-coupon__btns">
        {renderButton?.()}
        {/* {showButton && (
          <Button
            size="small"
            variant="contained"
            style={{ background: 'rgb(255, 255, 255)', color: '#fa2c19', border: 'none' }}
            shape="round"
          >
            立即领取
          </Button>
        )} */}
      </View>
      <View className="nb-coupon__label">
        <View>内购专享</View>
      </View>
    </View>
  );
};
