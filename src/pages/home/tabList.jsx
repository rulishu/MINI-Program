import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import GoodList from './goodList';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { levelTab, levelList, pageNum, pageSize } = useSelector((state) => state.home);

  useEffect(() => {
    getSub();
    // eslint-disable-next-line global-require, react-hooks/exhaustive-deps
  }, [levelTab.length]);

  const getSub = async () => {
    if (levelTab.length > 0) {
      await dispatch({
        type: 'home/getLevelList',
        payload: {
          pageNum: 1,
          pageSize: 20,
          id: parseInt(levelTab.at(0)?.id),
        },
      });
    }
  };

  const [tab4value, setTab4value] = useState('0');
  return (
    <View className="index">
      <Tabs
        value={tab4value}
        className="tabs"
        onChange={({ paneKey }) => {
          setTab4value(paneKey);
          dispatch({
            type: 'home/getLevelList',
            payload: {
              id: parseInt(levelTab[parseInt(paneKey)]?.id),
              pageNum: pageNum,
              pageSize: pageSize,
            },
          });
        }}
        titleScroll
        titleGutter="10"
      >
        {levelTab?.map((item) => (
          <Tabs.TabPane key={item.id} title={item.marketingName} className="tab-content">
            <GoodList dataList={levelList} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
