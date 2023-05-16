import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Right from './right';
import './index.scss';

const Index = () => {
  const { categoriesList } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [tab5value, setTab5value] = useState('0');
  useEffect(() => {
    dispatch({
      type: 'categories/getList',
      payload: {
        categoryId: categoriesList.at(0)?.id,
      },
    });
  }, []);
  return (
    <View className="all">
      <Tabs
        value={tab5value}
        color="#C3A769"
        onChange={({ paneKey }) => {
          setTab5value(paneKey);
          dispatch({ type: 'categories/getCategoriesList' });
          dispatch({
            type: 'categories/getList',
            payload: {
              categoryId: parseInt(categoriesList[parseInt(paneKey)]?.id),
              onShelf: 2,
            },
          });
        }}
        titleScroll
        leftAlign
        tabStyle={
          {
            // display: 'flex', alignItems: 'flex-start',
          }
        }
        direction="vertical"
      >
        {categoriesList.map((item) => (
          <Tabs.TabPane key={item} title={item.categoryName}>
            <Right />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
