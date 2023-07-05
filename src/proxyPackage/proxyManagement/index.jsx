import React, { Fragment, useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Popup from './popup';
import { getAllOrders } from '@/server/allOrders';
import PullList from '@/component/pullList';
import { useDispatch, useSelector } from 'react-redux';
import Orders from './orders';
import { tabList } from './eumn';
import Tabs from '@/component/aTabs';
import { FilterOutlined, ArrowUp, ArrowDown, QuestionOutlined, Arrow } from '@taroify/icons';
import { Tag, Popover, Divider, Cell, CellGroup } from '@nutui/nutui-react-taro';
import './index.scss';
import Taro from '@tarojs/taro';

const Index = () => {
  const dispatch = useDispatch();
  const { orderActive } = useSelector((state) => state.proxyManagement);
  const [homeTopNavHeight, setHomeTopNavHeight] = useState(0);
  const [activeName, setActiveName] = useState('筛选');
  const [lightTheme, setLightTheme] = useState(false);
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

  const updateFn = (payload) => {
    dispatch({
      type: 'proxyManagement/update',
      payload: payload,
    });
  };

  const proxyUserInfo = {
    text: '杭州省代',
    type: '省级',
    city: '浙江省',
    numer: '18019118235',
  };

  // 提示
  const onPrompt = (type) => {
    updateFn({
      popupOpen: true,
      popType: type,
    });
  };

  const goDetails = () => {
    Taro.navigateTo({ url: `/proxyPackage/proxyDividendDetails/index` });
  };

  // 点击组织结构
  const onClickOrganization = (cellInfo) => {
    window.console.log(cellInfo);
  };

  const itemList = [
    { name: '全部' },
    { name: '奋斗者' },
    { name: '二级经销商' },
    { name: '一级经销商' },
  ];

  const organizationList = [
    { name: '杭州市代', type: '市代' },
    { name: '宁波市代', type: '市代' },
    { name: '绍兴市代', type: '市代' },
    { name: '萧山区代', type: '区/县级' },
  ];

  return (
    <View className="content">
      <View className="head">
        <View>
          <View className="head-name">{proxyUserInfo.text}</View>
          <View className="head-info">
            {proxyUserInfo.type} | {proxyUserInfo.city} | {proxyUserInfo.numer}
          </View>
        </View>
        <Divider styles={{ color: '#B3B3B3', marginTop: '10px', marginBottom: '0' }} />
        <View className="head-sharing">
          <View className="sharing-title">
            <View>
              <Text style={{ marginRight: '5px' }}>地盘分润 (发起方)</Text>
              <QuestionOutlined onClick={() => onPrompt(1)} />
            </View>
            <Arrow onClick={goDetails} />
          </View>
          <View className="sharing-info">
            <View className="info-item">
              <Text>今日预估分润</Text>
              <Text>12.00</Text>
            </View>
            <View className="info-item">
              <Text>本月预估分润</Text>
              <Text>12.00</Text>
            </View>
            <View className="info-item">
              <Text>累计分润</Text>
              <Text>12.00</Text>
            </View>
          </View>
        </View>
        <View className="head-sharing">
          <View className="sharing-title">
            <View>
              <Text style={{ marginRight: '5px' }}>地盘分润 (收件方)</Text>
              <QuestionOutlined onClick={() => onPrompt(1)} />
            </View>
            <Arrow onClick={goDetails} />
          </View>
          <View className="sharing-info">
            <View className="info-item">
              <Text>今日预估分润</Text>
              <Text>12.00</Text>
            </View>
            <View className="info-item">
              <Text>本月预估分润</Text>
              <Text>12.00</Text>
            </View>
            <View className="info-item">
              <Text>累计分润</Text>
              <Text>12.00</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="organization">
        <View className="organization-title">
          <Text style={{ marginRight: '5px' }}>组织结构</Text>
          <QuestionOutlined onClick={() => onPrompt(2)} />
        </View>
        <View className="cellgroup">
          <CellGroup>
            {organizationList?.map((item, index) => {
              return (
                <Cell
                  key={index}
                  onClick={() => {
                    onClickOrganization(item);
                  }}
                  title={
                    <View style={{ display: 'flex' }}>
                      <Tag color="#E9E9E9" textColor="#999999">
                        {item.type}
                      </Tag>
                      <View className="cell-title">{item.name}</View>
                    </View>
                  }
                  isLink
                />
              );
            })}
          </CellGroup>
        </View>
      </View>
      <View className="fans-body">
        <Tabs
          background="#F2F2F2"
          value={orderActive}
          onChange={(paneKey) => {
            updateFn({ orderActive: paneKey });
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
                  <View className="screen">
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
                        <View className="screen-text">
                          <View>{activeName}</View>
                          <FilterOutlined />
                        </View>
                      </View>
                    </Popover>
                  </View>
                </View>
                <PullList
                  request={getAllOrders}
                  params={{ orderStatus: orderActive }}
                  style={{ height: '70vh' }}
                  renderList={(dataSource, refresh) => {
                    return <Orders refresh={refresh} keys={item.id} dataSource={dataSource} />;
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
