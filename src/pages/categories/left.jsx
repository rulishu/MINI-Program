import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Right from './right';
import './index.scss';

const Index = () => {
  const { getCategoriesTree } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [tab5value, setTab5value] = useState(0);

  useEffect(() => {
    dispatch({
      type: 'categories/getList',
      payload: {
        id: getCategoriesTree?.at(0)?.id,
        onShelf: 2,
        groundType: 2,
        pageNum: 1,
        pageSize: 20,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoriesTree?.at(0)?.id]);

  return (
    <View>
      <Tabs
        value={tab5value}
        color="#B08B57"
        style={{ height: '100vh' }}
        autoHeight
        tabStyle={{ position: 'sticky', top: '0px', zIndex: 1, width: '30vw' }}
        onChange={async ({ paneKey }) => {
          setTab5value(paneKey);
          await dispatch({
            type: 'categories/getList',
            payload: {
              id: getCategoriesTree?.at(paneKey)?.id,
              onShelf: 2,
              groundType: 2,
              pageNum: 1,
              pageSize: 20,
            },
          });
        }}
        titleScroll
        leftAlign
        direction="vertical"
      >
        {getCategoriesTree?.map((item) => {
          return (
            <Tabs.TabPane key={item} title={item?.marketingName} className="tabpane">
              <Right
                getCategoriesTwoTree={item?.child}
                style={{ width: '70vw', backgroundColor: '#ffffff' }}
              />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </View>
  );
};
export default Index;
