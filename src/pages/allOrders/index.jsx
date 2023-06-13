import React, { useEffect, lazy, useState, useRef } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { Tabs, Icon } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../component/navBar';
import { getAllOrders } from '@/server/allOrders';
import './index.scss';

const Orders = lazy(() => import('./orders'));

const Index = () => {
  const { orderActive, pageNum, orderList, total, pageSize } = useSelector(
    (state) => state.allOrders,
  );
  const [homeTopNavHeight, setHomeTopNavHeight] = useState(0);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(orderActive);
  const updateFn = (payload) => {
    dispatch({
      type: 'allOrders/update',
      payload: payload,
    });
  };

  const { run } = useRequest(getAllOrders, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        updateFn({
          total: result.total, // you had 'result.result' here, changed to 'result.total' assuming 'total' is the correct property name
          orderList:
            pageNum === 1 ? result.records || [] : [...orderList, ...(result.records || [])],
          refreshHasMore:
            pageNum === 1 ? false : [...orderList, ...(result.records || [])].length === total,
        });
        Taro.hideLoading();
        setRefreshLoading(false);
      } else {
        setRefreshLoading(false);
        Taro.hideLoading();
      }
    },
  });

  useEffect(() => {
    Taro.showLoading({ title: '加载中...', mask: true });
    run({
      pageNum: 1,
      pageSize: 20,
      orderStatus: orderActive,
    });
    //获取顶部导航栏位置
    let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const { top, height } = menuButtonInfo;
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res;
        const margin = top - statusBarHeight;
        const navHeight = height + statusBarHeight + margin * 2;
        setHomeTopNavHeight(navHeight);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderActive]);

  const refesh = () => {
    if (ref.current === orderActive) {
      setRefreshLoading(true);
      updateFn({ pageNum: 1 });
      Taro.showLoading({ title: '加载中...', mask: true });
      run({
        pageNum: 1,
        pageSize: 20,
        orderStatus: orderActive,
      }).finally(() => {
        setRefreshLoading(false);
      });
    }
  };

  const pullList = () => {
    let maxPage = Math.ceil(total / pageSize);
    if (maxPage > pageNum && ref.current === orderActive) {
      updateFn({ pageNum: pageNum + 1 });
      Taro.showLoading({ title: '加载中...', mask: true });
      run({
        pageNum: pageNum,
        pageSize: 20,
        orderStatus: orderActive,
      });
    }
  };

  const tabList = [
    {
      id: 0,
      title: '全部',
      children: <Orders />,
    },
    {
      id: 1,
      title: '待付款',
      children: <Orders />,
    },
    {
      id: 2,
      title: '待发货',
      children: <Orders />,
    },
    {
      id: 3,
      title: '待收货',
      children: <Orders />,
    },
    {
      id: 4,
      title: '待评价',
      children: <Orders />,
    },
  ];

  return (
    <>
      <View>
        <NavBar
          background="#ffffff"
          color="black"
          // iconTheme="black"
          // back
          renderCenter={
            <View className="navbar-head">
              <View className="navbar-head-left">
                <Icon
                  size="18"
                  name="rect-left"
                  onTap={() => Taro.switchTab({ url: '/pages/my/index' })}
                />
              </View>
              <View className="navbar-head-right">
                <Text>全部订单</Text>
              </View>
            </View>
          }
        />
      </View>
      <View
        style={{
          position: 'fixed',
          left: 0,
          width: '100%',
          top: homeTopNavHeight,
        }}
      >
        <Tabs
          value={orderActive}
          background="#ffffff"
          onChange={({ paneKey }) => {
            updateFn({ orderActive: parseInt(paneKey) });
            ref.current = parseInt(paneKey);
          }}
        >
          {tabList.map((item) => {
            return (
              <Tabs.TabPane key={item.id} title={item.title} paneKey={item.id} className="tabpane">
                <ScrollView
                  style={{ height: '100vh' }}
                  scrollY
                  scrollWithAnimation
                  refresherEnabled
                  lowerThreshold={50}
                  refresherTriggered={refreshLoading}
                  onScrollToLower={pullList}
                  onRefresherRefresh={refesh}
                >
                  {React.cloneElement(item.children, {
                    keys: item.id,
                    refesh: refesh,
                  })}
                </ScrollView>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </View>
    </>
  );
};
export default Index;
