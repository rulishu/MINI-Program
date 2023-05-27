import React, { useState } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import GoodList from './goodList';
import { data } from './item';
import './index.scss';

const Index = () => {
  const [tab4value, setTab4value] = useState('0');
  return (
    <View className="index">
      <Tabs
        value={tab4value}
        className="tabs"
        onChange={({ paneKey }) => {
          setTab4value(paneKey);
        }}
        titleScroll
        titleGutter="10"
      >
        {data.tabList?.map((item) => (
          <Tabs.TabPane key={item.id} title={item.tab} className="tab-content">
            <GoodList dataList={item.data} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
