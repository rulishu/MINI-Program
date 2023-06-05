import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { tabList } from './item';
import Orders from './orders';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

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
  return (
    <View className="index">
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
          <Tabs.TabPane key={item.id} title={item.title}>
            <Orders />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
