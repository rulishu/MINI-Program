import React from 'react';
import { View } from '@tarojs/components';
import Coupons from '@/component/coupons';
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
        <Coupons
          key={item?.id}
          discount={item?.discount}
          reduction={item?.reduction}
          title={item?.title}
          content={item?.content}
          fistTime={item?.fistTime}
          lastTime={item?.lastTime}
          state={state}
        />
      ))}
    </View>
  );
};
export default Index;
