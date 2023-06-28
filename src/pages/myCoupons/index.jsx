import React, { useEffect, useState } from 'react';
import { Tabs } from '@taroify/core';
import { View } from '@tarojs/components';
import MyCoupons from './coupon';
import { useDispatch } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const list = [
    { state: 0, title: '待使用（3）' },
    { state: 1, title: '已使用' },
    { state: 2, title: '已过期' },
  ];
  useEffect(() => {
    dispatch({ type: 'myCoupons/couponUserAll' });
    dispatch({ type: 'myCoupons/couponUsedAll' });
    dispatch({ type: 'myCoupons/couponUsedStaleAll' });
  }, []);
  return (
    <View>
      <Tabs theme="card" value={value} onChange={setValue} style={{}}>
        {list?.map((item) => {
          return (
            <Tabs.TabPane title={item?.title} key={item?.index}>
              <MyCoupons state={item?.state} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </View>
  );
};
export default Index;
