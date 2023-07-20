import React, { useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { useSelector } from 'react-redux';
import GoodList from './goodList';
import { getLevelList } from '@/server/home';
import './index.scss';
import PullList from '@/component/pullList';
import Tabs from '@/component/aTabs';

const Index = () => {
  const { levelTab } = useSelector((state) => state.home);
  const [tab4value, setTab4value] = useState(null);

  useEffect(() => {
    const defaultValue = levelTab && levelTab.length > 0 && levelTab[0].id;
    setTab4value(defaultValue);
  }, [levelTab]);

  const fetchData = useCallback(getLevelList, []);

  return (
    <View className="index">
      <Tabs
        value={tab4value}
        className="tabs"
        type="horizontal"
        titleScroll
        onChange={(paneKey) => setTab4value(paneKey)}
        tabList={levelTab.map((item) => ({
          title: item.marketingName,
          id: item.id,
          children: (
            <PullList
              request={fetchData}
              params={{ id: tab4value }}
              // style={{ height: '50vh' }}
              renderList={(dataSource) => <GoodList dataList={dataSource} />}
              callback={({ refresh }) => {
                refresh?.();
              }}
            />
          ),
        }))}
      />
    </View>
  );
};
export default Index;
