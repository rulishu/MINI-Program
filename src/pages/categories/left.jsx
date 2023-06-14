import React, { useState, useEffect } from 'react';
import { View, ScrollView } from '@tarojs/components'; //ScrollView
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
    setTab5value(getCategoriesTree?.[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoriesTree?.length]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const onScrollToUpper = async () => {

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
  // };
  const onScrollToLower = async () => {
    const tabIndex = getCategoriesTree.findIndex((item) => item?.id === tab5value);
    if (tabIndex > -1) {
      if (tabIndex === getCategoriesTree.length - 1) {
      } else {
        setTab5value(getCategoriesTree[tabIndex + 1]?.id);
      }
      await dispatch({
        type: 'categories/getList',
        payload: {
          id: getCategoriesTree[tabIndex + 1]?.id,
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
      {getCategoriesTree.length > 0 ? (
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
              <Tabs.TabPane
                key={item}
                title={item?.marketingName}
                className="tabpane"
                paneKey={item?.id}
              >
                <ScrollView
                  style={{ height: '100%' }}
                  scrollY
                  // enhanced
                  lowerThreshold={500}
                  scrollWithAnimation
                  refresherTriggered={loading}
                  onScrollToLower={onScrollToLower}
                  // onScrollToUpper={onScrollToUpper}
                  // disableUpperScroll={Number(tab5value) < getCategoriesTree.length ? "" : "always"}
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
