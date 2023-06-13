import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from '@tarojs/components';
import { Tabs, Empty } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import GoodList from './goodList';
import { getLevelList } from '@/server/home';
import { useRequest } from 'ahooks';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { levelTab, levelList, pageNum, pageSize, total } = useSelector((state) => state.home);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [tab4value, setTab4value] = useState(null);
  const updateFn = (payload) => {
    dispatch({
      type: 'home/update',
      payload: payload,
    });
  };

  const { run } = useRequest(getLevelList, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        updateFn({
          total: result?.total,
          levelList:
            pageNum === 1 ? result?.records || [] : [...levelList, ...(result?.records || [])],
          refreshHasMore:
            pageNum === 1 ? false : [...levelList, ...(result.records || [])].length === total,
        });
        setRefreshLoading(false);
        Taro.hideLoading();
      } else {
        setRefreshLoading(false);
        Taro.hideLoading();
      }
    },
  });

  useEffect(() => {
    const defaultValue = levelTab && levelTab.length > 0 && levelTab[0].id;
    setTab4value(defaultValue);
  }, [levelTab]);

  useEffect(() => {
    Taro.showLoading({ title: '加载中...', mask: true });
    run({
      pageNum: 1,
      pageSize: pageSize,
      id: tab4value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab4value]);

  const pullList = ({ id }) => {
    let maxPage = Math.ceil(total / pageSize);
    if (maxPage > pageNum && id === tab4value) {
      updateFn({ pageNum: pageNum + 1 });
      Taro.showLoading({ title: '加载中...', mask: true });
      run({
        pageNum: pageNum,
        pageSize: pageSize,
        id: tab4value,
      });
    }
  };

  const refesh = ({ id }) => {
    if (!refreshLoading && levelTab.length > 0 && id === tab4value) {
      setRefreshLoading(true);
      updateFn({ pageNum: 1 });
      Taro.showLoading({ title: '加载中...', mask: true });
      run({
        pageNum: 1,
        pageSize: pageSize,
        id: tab4value,
      }).finally(() => {
        setRefreshLoading(false);
      });
    }
  };

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
        {levelTab?.map((item) => (
          <Tabs.TabPane
            key={item.id}
            title={item.marketingName}
            paneKey={item.id}
            className="tab-content"
          >
            <ScrollView
              style={{ height: '50vh' }}
              scrollY
              scrollWithAnimation
              refresherEnabled
              lowerThreshold={10}
              refresherTriggered={refreshLoading}
              onScrollToLower={() => pullList({ id: item.id })}
              onRefresherRefresh={() => refesh({ id: item.id })}
            >
              {levelList.length == 0 ? (
                <Empty description="无数据" />
              ) : (
                <GoodList dataList={levelList} />
              )}
            </ScrollView>
          </Tabs.TabPane>
        ))}
      </Tabs>
      <View className="pageEnd">
        <Text>——页面到底了——</Text>
      </View>
    </View>
  );
};
export default Index;
