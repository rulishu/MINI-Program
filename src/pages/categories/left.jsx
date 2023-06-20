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
import { Sidebar, ConfigProvider } from '@taroify/core';

const Index = () => {
  const { getCategoriesTree } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = getCategoriesTree?.[value]?.id;
    if (id) {
      dispatch({
        type: 'categories/getList',
        payload: {
          id: id,
          onShelf: 2,
          groundType: 2,
        },
      });
    }
  }, [value, getCategoriesTree]);

  const onScrollToUpper = () => {
    if (value <= 0) return;
    let nextIndex = value - 1;
    setValue(nextIndex);
  };

  const onScrollToLower = () => {
    let nextIndex = value + 1;
    if (nextIndex === getCategoriesTree.length) return;
    setValue(nextIndex);
  };

  return (
    <View className="cate-list" style={{ display: 'flex' }}>
      <View className="left-nav">
        <Sidebar
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        >
          {getCategoriesTree?.map((item) => {
            return <Sidebar.Tab key={item.id}>{item?.marketingName}</Sidebar.Tab>;
          })}
        </Sidebar>
      </View>
      <View className="cate-body">
        <View>
          {getCategoriesTree.length > 0 ? (
            <Right onScrollToLower={onScrollToLower} onScrollToUpper={onScrollToUpper} />
          ) : (
            <View
              style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Empty image="empty" description="无数据" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Index;
