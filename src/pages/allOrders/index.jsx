import React, { useEffect, useState, Fragment } from 'react';
import { View, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../component/navBar';
import { getAllOrders } from '@/server/allOrders';
import './index.scss';
import Orders from './orders';
import PullList from '@/component/pullList';
import Tabs from './component/tabs';
import { tabList } from './eumn';

const Index = () => {
  const { orderActive } = useSelector((state) => state.allOrders);
  const [homeTopNavHeight, setHomeTopNavHeight] = useState(0);
  const dispatch = useDispatch();
  const updateFn = (payload) => {
    dispatch({
      type: 'allOrders/update',
      payload: payload,
    });
  };

  useEffect(() => {
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

  return (
    <Fragment>
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
                  onTap={() => {
                    Taro.switchTab({ url: '/pages/my/index' });
                    dispatch({
                      type: 'global/update',
                      payload: {
                        activeIndex: 4,
                      },
                    });
                  }}
                />
              </View>
              <View className="navbar-head-right">
                <Text>全部订单</Text>
              </View>
            </View>
          }
        />
      </View>
      <Tabs
        background="#ffffff"
        style={{
          position: 'fixed',
          left: 0,
          width: '100%',
          top: homeTopNavHeight,
        }}
        value={orderActive}
        onChange={(paneKey) => {
          updateFn({ orderActive: paneKey });
        }}
        tabList={tabList.map((item) => ({
          ...item,
          children: (
            <Fragment>
              <PullList
                request={getAllOrders}
                params={{ orderStatus: orderActive }}
                style={{ height: '100vh' }}
                renderList={(dataSource, refresh) => {
                  return <Orders refresh={refresh} keys={item.id} dataSource={dataSource} />;
                }}
                callback={({ refresh }) => {
                  refresh?.();
                }}
                emptyStyle={{ background: '#f2f2f2' }}
                defaultPageSize={3}
                scrollViewProps={{ lowerThreshold: 10 }}
                bottomHeight={homeTopNavHeight + 92}
              />
            </Fragment>
          ),
        }))}
      />
    </Fragment>
  );
};
export default Index;
