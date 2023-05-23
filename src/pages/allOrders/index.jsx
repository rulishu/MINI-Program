import React, { useState } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import { tabList } from './item';
import Orders from './orders';
import { useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const { orderActive } = useSelector((state) => state.allOrders);

  const [tab3value, setTab3value] = useState(orderActive);
  return (
    <View className="index">
      <Tabs
        value={tab3value}
        background="#ffffff"
        onChange={({ paneKey }) => {
          setTab3value(paneKey);
        }}
      >
        {tabList.map((item) => (
          <Tabs.TabPane key={item.id} title={item.title}>
            <Orders />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
