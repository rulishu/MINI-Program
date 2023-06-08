import React, { useState, useEffect } from 'react';
import { View, ScrollView } from '@tarojs/components';
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

  const updateFn = (payload) => {
    dispatch({
      type: 'home/update',
      payload: payload,
    });
  };

  const { run, loading } = useRequest(getLevelList, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        updateFn({
          total: result.total,
          levelList:
            pageNum === 1 ? result?.records || [] : [...levelList, ...(result?.records || [])],
          refreshHasMore:
            pageNum === 1 ? false : [...levelList, ...(result.records || [])].length === total,
        });
        Taro.hideLoading();
      } else {
        Taro.hideLoading();
      }
    },
  });

  useEffect(() => {
    Taro.showLoading({ title: '加载中...', mask: true });
    run({
      pageNum: pageNum,
      pageSize: pageSize,
      id: parseInt(levelTab[parseInt(tab4value)]?.id),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, tab4value, levelTab.length]);

  const refesh = () => {
    if (levelTab.length > 0) {
      updateFn({ pageNum: 1 });
      Taro.showLoading({ title: '加载中...', mask: true });
      run({
        pageNum: 1,
        pageSize: pageSize,
        id: parseInt(levelTab.at(0)?.id),
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
            {levelList.length == 0 ? (
              <Empty description="无数据" />
            ) : (
              <ScrollView
                style={{ height: '50vh' }}
                scrollY
                scrollWithAnimation
                refresherEnabled
                lowerThreshold={50}
                refresherTriggered={loading}
                onScrollToLower={() => {
                  let maxPage = Math.ceil(total / pageSize);
                  if (maxPage > pageNum) {
                    updateFn({ pageNum: pageNum + 1 });
                  }
                }}
                onRefresherRefresh={refesh}
              >
                <GoodList dataList={levelList} />
              </ScrollView>
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
