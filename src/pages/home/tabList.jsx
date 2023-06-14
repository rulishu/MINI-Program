import React, { useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { useSelector } from 'react-redux';
import GoodList from './goodList';
import { getLevelList } from '@/server/home';
import Tabs from '@/component/tabs';
import './index.scss';
import PullList from '@/component/pullList';

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
        onChange={({ paneKey }) => {
          setTab4value(paneKey);
        }}
        titleScroll
        titleGutter="10"
        destroyInactiveTabPane
      >
        {levelTab?.map((item) => {
          return (
            <Tabs.TabPane
              key={item.id}
              title={item.marketingName}
              paneKey={item.id}
              className="tab-content"
            >
              <PullList
                request={fetchData}
                paramsCode="id"
                params={{ id: item.id }}
                tab4value={tab4value}
                style={{ height: '50vh' }}
                renderList={(dataSource) => <GoodList dataList={dataSource} />}
              />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </View>
  );
};
export default Index;
