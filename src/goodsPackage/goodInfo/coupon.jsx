import React from 'react';
import { Popup, Button } from '@taroify/core';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '@tarojs/components';
import Coupons from '@/component/coupons';
import './index.scss';

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
      lastTime: '2023.6.10 12:12:12',
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
  const renderButton = (item) => {
    return (
      <Button
        className={
          item?.state === 1
            ? 'couponBorderBox-list-right-content-button'
            : 'couponBorderBox-list-right-content-buttoned'
        }
      >
        {item?.state === 1 ? '领取' : '已领取'}
      </Button>
    );
  };
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
          <Coupons
            key={item?.id}
            couponData={{
              discount: item?.discount,
              reduction: item?.reduction,
              title: item?.title,
              content: item?.content,
              fistTime: item?.fistTime,
              lastTime: item?.lastTime,
            }}
            renderButton={renderButton(item)}
          />
        ))}
      </View>
    </Popup>
  );
};
export default Index;
