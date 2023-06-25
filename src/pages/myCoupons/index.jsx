import React, { useState } from 'react';
import { Tabs } from '@taroify/core';
import { View } from '@tarojs/components';
import MyCoupons from './coupon';
import './index.scss';

const Index = () => {
  const [value, setValue] = useState(0);
  const list = [
    { index: 0, title: '待使用（3）' },
    { index: 1, title: '已使用' },
    { index: 2, title: '已过期' },
  ];
  return (
    <View>
      <Tabs theme="card" value={value} onChange={setValue} style={{}}>
        {list?.map((item) => {
          return (
            <Tabs.TabPane title={item?.title} key={item?.index}>
              <MyCoupons />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </View>
  );
};
export default Index;
