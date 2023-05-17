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
    getSub();
  }, []);
  const getSub = async () => {
    if (categoriesList.length > 0) {
      await dispatch({
        type: 'categories/getList',
        payload: {
          categoryId: categoriesList.at(0)?.id,
          onShelf: 2,
          pageNum: 1,
          pageSize: 20,
        },
      });
    }
  };
  return (
    <View>
      <Tabs
        value={tab5value}
        color="#B08B57"
        style={{ height: '100vh' }}
        autoHeight
        tabStyle={{ position: 'sticky', top: '0px', zIndex: 1, width: '30vw' }}
        onChange={({ paneKey }) => {
          setTab5value(paneKey);
          dispatch({ type: 'categories/getCategoriesList' });
          dispatch({
            type: 'categories/getList',
            payload: {
              categoryId: parseInt(categoriesList[parseInt(paneKey)]?.id),
              onShelf: 2,
              pageNum: 1,
              pageSize: 20,
            },
          });
        }}
        titleScroll
        leftAlign
        direction="vertical"
      >
        {categoriesList.map((item) => (
          <Tabs.TabPane key={item} title={item.categoryName}>
            <Right
              categoryName={item.categoryName}
              style={{ width: '70vw', backgroundColor: '#ffffff' }}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
