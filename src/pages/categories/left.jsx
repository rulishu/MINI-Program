import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Right from './right';
import './index.scss';

const Index = () => {
  const { getCategoriesTree, getCategoriesTwoTree } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [tab5value, setTab5value] = useState(0);
  let twoTree = getCategoriesTree?.find((el) => el?.id === getCategoriesTwoTree?.id) || [];

  let getCategoriesTwoTreeId = getCategoriesTree?.map((item) => item?.children);
  useEffect(() => {
    getSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoriesTwoTreeId?.flat()?.at(0)?.id]);
  const getSub = async () => {
    if (getCategoriesTwoTreeId?.flat().length > 0) {
      await dispatch({
        type: 'categories/getList',
        payload: {
          category: getCategoriesTwoTreeId?.flat()?.at(0)?.id,
          onShelf: 2,
          groundType: 2,
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
        onChange={async ({ paneKey }) => {
          setTab5value(paneKey);
          // dispatch({ type: 'categories/getCategoriesTreeList' });
          dispatch({
            type: 'categories/update',
            payload: {
              getCategoriesTwoTree: getCategoriesTree?.at(paneKey),
            },
          });
          await dispatch({
            type: 'categories/getList',
            payload: {
              category:
                getCategoriesTree?.at(paneKey)?.leafOrder === 1
                  ? getCategoriesTree?.at(paneKey)?.id
                  : getCategoriesTree?.at(paneKey)?.children?.at()?.id,
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
            <Tabs.TabPane key={item} title={item.label}>
              <Right
                getCategoriesTwoTreeItem={tab5value === 0 ? getCategoriesTree?.at(0) : twoTree}
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
