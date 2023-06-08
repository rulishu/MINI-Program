import React, { useEffect, lazy } from 'react';
import { View, Text } from '@tarojs/components';
import { Tabs, Icon } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../component/navBar';
import './index.scss';

const Orders = lazy(() => import('./orders'));

const Index = () => {
  const { orderActive } = useSelector((state) => state.allOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Taro.getStorageSync('token');
    if (token !== '') {
      Taro.showLoading({ title: '获取订单中...', mask: true });
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
      children: <Orders keys={2} />,
    },
    {
      id: 3,
      title: '待收货',
      children: <Orders keys={3} />,
    },
    {
      id: 4,
      title: '待评价',
      children: <Orders keys={4} />,
    },
  ];
  //返回
  const goBack = () => {
    Taro.switchTab({ url: '/pages/my/index' });
  };

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
                <Icon size="18" name="rect-left" onTap={() => goBack()} />
              </View>
              <View className="navbar-head-right">
                <Text>全部订单</Text>
              </View>
            </View>
          }
        />
      </View>
      <View style={{ marginTop: 3 }}>
        <Tabs
          value={orderActive}
          background="#ffffff"
          onChange={({ paneKey }) => {
            Taro.showLoading({ title: '获取订单中...', mask: true });
            dispatch({
              type: 'allOrders/update',
              payload: {
                orderActive: parseInt(paneKey),
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
    </>
  );
};
export default Index;
