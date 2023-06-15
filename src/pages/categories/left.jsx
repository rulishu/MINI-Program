import React, { useState, useEffect } from 'react';
import { View, ScrollView } from '@tarojs/components';
import { Tabs, Empty } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '@/server/categories';
import { useRequest } from 'ahooks';
import Taro from '@tarojs/taro';
import Right from './right';
import './index.scss';

const Index = () => {
  const { getCategoriesTree, pageSize, pageNum, total, subList } = useSelector(
    (state) => state.categories,
  );
  const dispatch = useDispatch();
  const [tab5value, setTab5value] = useState(getCategoriesTree?.[0]?.id);

  const updateFn = (payload) => {
    dispatch({
      type: 'categories/update',
      payload: payload,
    });
  };

  const { run, loading } = useRequest(getList, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        updateFn({
          total: result?.total,
          subList: pageNum === 1 ? result || [] : [...subList, ...(result || [])],
          refreshHasMore: pageNum === 1 ? false : [...subList, ...(result || [])].length === total,
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
      pageNum: 1,
      pageSize: pageSize,
      id: getCategoriesTree?.at(Number(tab5value))?.id,
      onShelf: 2,
      groundType: 2,
    });
  }, []);

  useEffect(() => {
    if (!getCategoriesTree?.length > 0) return;
    setTab5value(getCategoriesTree?.[0]?.id);
  }, [getCategoriesTree?.length]);

  const onScrollToUpper = async () => {
    //   if (0 < Number(tab5value) < getCategoriesTree.length - 1) {
    //     setTab5value(Number(tab5value - 1))
    //     await dispatch({
    //       type: 'categories/getList',
    //       payload: {
    //         id: getCategoriesTree?.at(Number(tab5value - 1))?.id,
    //         onShelf: 2,
    //         groundType: 2,
    //         pageNum: 1,
    //         pageSize: 20,
    //       },
    //     });
    //   }
  };

  useEffect(() => {
    if (tab5value) {
      dispatch({
        type: 'categories/getList',
        payload: {
          id: tab5value,
          onShelf: 2,
          groundType: 2,
          pageNum: 1,
          pageSize: 20,
        },
      });
    }
  }, [tab5value]);

  const onScrollToLower = async (index) => {
    let nextIndex = index + 1;
    nextIndex = Math.min(nextIndex, getCategoriesTree?.length - 1);
    setTab5value(getCategoriesTree[nextIndex]?.id);
  };

  return (
    <View>
      {getCategoriesTree.length > 0 ? (
        <Tabs
          value={tab5value}
          color="#B08B57"
          style={{ height: '100vh' }}
          autoHeight
          tabStyle={{ position: 'sticky', top: '0px', zIndex: 1, width: '30vw' }}
          onChange={async ({ paneKey }) => {
            setTab5value(paneKey);
          }}
          titleScroll
          leftAlign
          direction="vertical"
        >
          {getCategoriesTree?.map((item, index) => {
            return (
              <Tabs.TabPane
                key={item.id}
                title={item?.marketingName}
                className="tabpane"
                paneKey={item?.id}
              >
                <ScrollView
                  style={{ height: '90vh' }}
                  scrollY
                  // enhanced
                  // lowerThreshold={150}
                  // upperThreshold={150}
                  scrollWithAnimation
                  refresherTriggered={loading}
                  onScrollToLower={() => onScrollToLower(index)}
                  onScrollToUpper={() => onScrollToUpper(index)}
                  // onScroll={(e, b, c) => console.log('onScroll', e, b, c)}
                >
                  <Right
                    getCategoriesTwoTree={item?.child}
                    style={{ width: '70vw', backgroundColor: '#ffffff' }}
                  />
                </ScrollView>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
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
  );
};
export default Index;
