import React, { useEffect, lazy } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Orders = lazy(() => import('./orders'));

const Index = () => {
  const { orderActive } = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Taro.getStorageSync('token');
    if (token !== '') {
      let orderStatus;
      if (orderActive === 1) {
        orderStatus = 1;
      }
      if (orderActive === 2) {
        orderStatus = 2;
      }
      if (orderActive === 3) {
        orderStatus = 3;
      }
      if (orderActive === 4) {
        orderStatus = 7;
      }
      dispatch({
        type: 'allOrders/getAllOrders',
        payload: {
          pageNum: 1,
          pageSize: 10,
          orderStatus,
        },
      });
    }
  }, []);

  const tabList = [
    {
      id: 0,
      title: '全部',
      children: <Orders keys={0} />,
    },
    {
      id: 1,
      title: '待付款',
      children: <Orders keys={1} />,
    },
    {
      id: 2,
      title: '待发货',
      children: <Orders keys={3} />,
    },
    {
      id: 3,
      title: '待收货',
      children: <Orders keys={4} />,
    },
    {
      id: 4,
      title: '待评价',
      children: <Orders keys={5} />,
    },
  ];

  return (
    <View style={{ marginTop: 3 }}>
      <Tabs
        value={orderActive}
        background="#ffffff"
        onChange={({ paneKey }) => {
          dispatch({
            type: 'allOrders/update',
            payload: {
              orderActive: paneKey,
            },
          });
          let orderStatus;
          if (paneKey === '1') {
            orderStatus = 1;
          }
          if (paneKey === '2') {
            orderStatus = 2;
          }
          if (paneKey === '3') {
            orderStatus = 3;
          }
          if (paneKey === '4') {
            orderStatus = 7;
          }
          dispatch({
            type: 'allOrders/getAllOrders',
            payload: {
              pageNum: 1,
              pageSize: 10,
              orderStatus,
            },
          });
        }}
      >
        {tabList.map((item) => (
          <Tabs.TabPane key={item.id} title={item.title} className="tabpane">
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
