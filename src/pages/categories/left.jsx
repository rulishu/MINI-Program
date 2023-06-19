/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from '@tarojs/components';
import { Tabs, Empty } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '@/server/categories';
import { useRequest } from 'ahooks';
import Taro from '@tarojs/taro';
import Right from './right';
import './index.scss';

// function debounce(func, delay) {
//   // let timer;
//   let lastTime = 0;

//   return function () {
//     const currentTime = Date.now();

//     if (currentTime - lastTime >= delay) {
//       func.apply(this, arguments);
//       lastTime = currentTime;
//     }
//   };
// }

const Index = () => {
  const { getCategoriesTree, pageSize, pageNum, total, subList, isLoading } = useSelector(
    (state) => state.categories,
  );
  const { activeIndex } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [tab5value, setTab5value] = useState(0);

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
    if (!getCategoriesTree?.length > 0) return;
    setTab5value(getCategoriesTree?.[0]?.id);
  }, [getCategoriesTree?.length]);

  const onScrollToUpper = (index) => {
    // console.log("【 onScrollToUpper 】==>", index);
    if (index <= 0) return;

    // let nextIndex = index - 1;
    // setTab5value(getCategoriesTree[nextIndex]?.id);
  };

  const onScrollToLower = (index) => {
    let nextIndex = index + 1;
    nextIndex = Math.min(nextIndex, getCategoriesTree?.length - 1);
    setTab5value(getCategoriesTree[nextIndex]?.id);
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (tab5value && activeIndex === 1) {
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
    }
  }, [tab5value, activeIndex]);

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
                  style={{ height: '100vh' }}
                  scrollY
                  // enhanced
                  // lowerThreshold={150}
                  // upperThreshold={150}
                  scrollWithAnimation
                  refresherTriggered={loading}
                  // onScrollToLower={() => onScrollToLower(index)}
                  // onScrollToUpper={() => onScrollToUpper(index)}
                  // onScroll={(e, b, c) => console.log('onScroll', e, b, c)}
                >
                  <View style={{ height: '100vh' }}>
                    {/* <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View>
                    <View style={{ height: '10vh' }}>123</View> */}
                    <Right
                      getCategoriesTwoTree={item?.child}
                      style={{ width: '70vw', backgroundColor: '#ffffff' }}
                    />
                  </View>
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
