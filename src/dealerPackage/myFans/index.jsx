import React, { Fragment, useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { Tag } from '@taroify/core';
import Popup from './popup';
import { selectPage } from '@/server/myFans';
import PullList from '@/component/pullList';
import { useDispatch, useSelector } from 'react-redux';
import Orders from './orders';
// import { tabList } from './eumn';
import Tabs from '@/component/aTabs';
import { FilterOutlined, ArrowUp, ArrowDown, QuestionOutlined } from '@taroify/icons';
import { Popover } from '@nutui/nutui-react-taro';
import './index.scss';
import Taro from '@tarojs/taro';

const Index = () => {
  const dispatch = useDispatch();
  const { orderActive, myFansCountList } = useSelector((state) => state.myFans);
  const { userInfos } = useSelector((state) => state.my);
  const [activeName, setActiveName] = useState('筛选');
  const [homeTopNavHeight, setHomeTopNavHeight] = useState(0);
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
    const userInfo = Taro.getStorageSync('userInfo');
    dispatch({
      type: 'my/getUserInfos',
      payload: {
        id: userInfo.id,
      },
    });
    dispatch({
      type: 'myFans/myFansCount',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderActive]);

  const updateFn = (payload) => {
    dispatch({
      type: 'myFans/update',
      payload: payload,
    });
  };

  const list = [
    {
      title: '直属粉丝',
      num: myFansCountList.directFans || 0,
    },
    {
      title: '跨级粉丝',
      num: myFansCountList.crossFans || 0,
    },
    {
      title: '普通粉丝',
      num: myFansCountList.generalFans || 0,
    },
  ];

  const tabList = [
    {
      id: 0,
      title: `直属粉丝（${myFansCountList.directFans || 0}）`,
    },
    {
      id: 1,
      title: `跨级粉丝（${myFansCountList.crossFans || 0}）`,
    },
    {
      id: 2,
      title: `普通粉丝（${myFansCountList.generalFans || 0}） `,
    },
  ];

  // 提示
  const onPrompt = () => {
    dispatch({
      type: 'myFans/update',
      payload: {
        popupOpen: true,
      },
    });
  };

  const [lightTheme, setLightTheme] = useState(false);
  const itemList = [
    { name: '全部' },
    { name: '奋斗者' },
    { name: '二级经销商' },
    { name: '一级经销商' },
  ];
  return (
    <View className="fans">
      <View className="fans-head">
        <View className="fans-head-top">
          <View className="fans-head-top-text">
            <Text>我的粉丝</Text>
            <QuestionOutlined style={{ marginLeft: 4 }} onClick={() => onPrompt()} />
          </View>
          <View>
            <Tag style={{ backgroundColor: '#ffffff', color: '#000000' }} shape="rounded">
              {userInfos.level === '1'
                ? '一级经销商'
                : userInfos.level === '2'
                ? '二级经销商'
                : userInfos.level === '3'
                ? '奋斗者'
                : ''}
            </Tag>
          </View>
        </View>
        <View className="fans-head-mid">
          <View className="fans-head-mid-left">{myFansCountList.allFans || 0}</View>
          <View className="fans-head-mid-right">
            <View>昨日新增 {myFansCountList.monthFans || 0}</View>
            <View>今日新增 {myFansCountList.yesterdayFans || 0}</View>
          </View>
        </View>
        <View className="fans-head-bottom">
          {list.map((item, index) => (
            <View key={index} className="fans-head-bottom-item">
              <View className="fans-head-bottom-item-title">
                <Text>{item.title}</Text>
                <QuestionOutlined style={{ marginLeft: 4 }} onClick={() => onPrompt()} />
              </View>
              <View className="fans-head-bottom-item-num">
                <Text>{item.num}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View className="fans-body">
        <Tabs
          background="#F2F2F2"
          value={orderActive}
          onChange={(paneKey) => {
            updateFn({
              orderActive: paneKey,
            });
          }}
          tabList={tabList.map((item) => ({
            ...item,
            children: (
              <Fragment>
                <View className="fansList-crown">
                  <View className="joined">
                    <Text>加入时间</Text>
                    <View className="joined-icon">
                      <ArrowUp />
                      <ArrowDown />
                    </View>
                  </View>
                  <View className="joined">
                    <Text>粉丝数量</Text>
                    <View className="joined-icon">
                      <ArrowUp />
                      <ArrowDown />
                    </View>
                  </View>
                  <View className="joined screen">
                    <Popover
                      className="popover"
                      location="bottom-end"
                      visible={lightTheme}
                      onClick={() => {
                        lightTheme ? setLightTheme(false) : setLightTheme(true);
                      }}
                      onChoose={(it) => {
                        let name = it.name === '全部' ? '筛选' : it.name;
                        setActiveName(name);
                      }}
                      list={itemList}
                    >
                      <View className="screen">
                        <View>{activeName}</View>
                        <FilterOutlined />
                      </View>
                    </Popover>
                  </View>
                </View>
                <PullList
                  request={selectPage}
                  params={{
                    fansLevel: userInfos.level,
                    pageNum: 1,
                    pageSize: 20,
                    sortByFans: 0,
                    fansLevel: orderActive * 1 + 1,
                  }}
                  style={{ height: '70vh' }}
                  renderList={(dataSource, refresh) => {
                    return (
                      <>
                        <Orders refresh={refresh} keys={item.id} dataSource={dataSource} />
                      </>
                    );
                  }}
                  callback={({ refresh }) => {
                    refresh?.();
                  }}
                  emptyStyle={{ background: '#f2f2f2' }}
                  defaultPageSize={10}
                  scrollViewProps={{ lowerThreshold: 10 }}
                  bottomHeight={homeTopNavHeight + 92}
                />
              </Fragment>
            ),
          }))}
        />
      </View>
      <Popup />
    </View>
  );
};
export default Index;
