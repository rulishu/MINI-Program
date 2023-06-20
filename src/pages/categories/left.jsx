/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from '@tarojs/components';
import { Empty } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '@/server/categories';
import { useRequest } from 'ahooks';
import Taro from '@tarojs/taro';
import Right from './right';
import './index.scss';
import { Sidebar } from '@taroify/core';

const Index = () => {
  const { getCategoriesTree, subList } = useSelector((state) => state.categories);
  const { activeIndex } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [tab5value, setTab5value] = useState(0);

  const updateFn = (payload) => {
    dispatch({
      type: 'categories/update',
      payload: payload,
    });
  };

  useEffect(() => {
    if (!getCategoriesTree?.length > 0) return;
    setTab5value(getCategoriesTree?.[0]?.id);
  }, [getCategoriesTree?.length]);

  const onScrollToUpper = () => {
    if (tab5value <= 0) return;
    let nextIndex = tab5value - 1;
    setTab5value(nextIndex);
  };

  const onScrollToLower = () => {
    let nextIndex = tab5value + 1;
    if (nextIndex === getCategoriesTree.length) return;
    setTab5value(nextIndex);
  };

  useEffect(() => {
    const id = getCategoriesTree?.[tab5value]?.id;
    if (id && tab5value && activeIndex === 1) {
      dispatch({
        type: 'categories/getList',
        payload: {
          id: id,
          onShelf: 2,
          groundType: 2,
        },
      });
    }
  }, [tab5value, activeIndex]);

  return (
    <View className="cate-list" style={{ display: 'flex' }}>
      <View className="left-nav">
        <Sidebar
          style={{ height: '100vh' }}
          value={tab5value}
          onChange={(value) => {
            setTab5value(value);
          }}
        >
          {getCategoriesTree?.map((item) => {
            return <Sidebar.Tab key={item.id}>{item?.marketingName}</Sidebar.Tab>;
          })}
        </Sidebar>
      </View>
      <View className="cate-body">
        <ScrollView
          style={{ height: '100vh' }}
          scrollY
          lowerThreshold={10}
          upperThreshold={10}
          scrollWithAnimation
          onScrollToLower={onScrollToLower}
          onScrollToUpper={onScrollToUpper}
        >
          <View>
            {getCategoriesTree.length > 0 ? (
              <Right
                getCategoriesTwoTree={getCategoriesTree[tab5value]?.child || []}
                style={{ width: '70vw', backgroundColor: '#ffffff' }}
              />
            ) : (
              <View
                style={{
                  height: '90vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Empty image="empty" description="无数据" />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Index;
