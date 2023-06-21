import React from 'react';
import { Popup } from '@taroify/core';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '@tarojs/components';

const Index = () => {
  const { couponVisible } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();
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
    <Popup
      open={couponVisible}
      placement="bottom"
      style={{ height: '50%' }}
      onClose={() => {
        dispatch({ type: 'goodInfo/update', payload: { couponVisible: false } });
      }}
    >
      <Popup.Close />
      <View className="couponBorderBox">
        <View className="couponBorderBox-title">优惠卷</View>
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
                <View
                  className={
                    item?.state === 1
                      ? 'couponBorderBox-list-right-content-button'
                      : 'couponBorderBox-list-right-content-buttoned'
                  }
                >
                  {item?.state === 1 ? '领取' : '已领取'}
                </View>
              </View>
              <View className="couponBorderBox-list-right-timeRange resize">
                {`${item?.fistTime} 至 ${item?.lastTime}`}
              </View>
            </View>
          </View>
        ))}
      </View>
    </Popup>
  );
};
export default Index;
