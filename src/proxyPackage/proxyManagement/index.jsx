import React, { Fragment, useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import Popup from './popup';
import { selectPage } from '@/server/myFans';
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
  const params = Taro.getCurrentInstance().router.params;
  const { id: userId } = params;
  const dispatch = useDispatch();
  const updateFn = (payload) => {
    dispatch({
      type: 'proxyManagement/update',
      payload: payload,
    });
  };
  const { orderActive, agentInfo } = useSelector((state) => state.proxyManagement);
  const { userAgent, subordinateAgent } = agentInfo;
  const [homeTopNavHeight, setHomeTopNavHeight] = useState(0);
  const [activeName, setActiveName] = useState('筛选');
  const [lightTheme, setLightTheme] = useState(false);
  const [addTime, setAddTime] = useState(true);
  const [fansNum, setFansNum] = useState(true);
  useEffect(() => {
    Taro.showLoading({ title: '加载中...', mask: true });
    dispatch({
      type: 'proxyManagement/getAgent',
      payload: { userId: userId },
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
    Taro.showLoading({ title: '加载中...', mask: true });
    dispatch({
      type: 'proxyManagement/getAgent',
      payload: { userId: cellInfo?.legalPersonId },
      // payload: {userId:userId},
    });
  };

  const itemList = [
    // 筛选弹窗数组
    { name: '全部' },
    { name: '奋斗者' },
    { name: '二级经销商' },
    { name: '一级经销商' },
  ];

  return (
    <View className="content">
      <View className="head">
        <View>
          <View className="head-name">{userAgent?.areaName + '代'}</View>
          <View className="head-info">
            {userAgent?.level === 1 ? '省级' : userAgent?.level === 2 ? '市代' : '区代'} |{' '}
            {userAgent?.areaName} | {userAgent?.consumerPhone}
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
              <Text>{agentInfo?.initiatorToday}</Text>
            </View>
            <View className="info-item">
              <Text>本月预估分润</Text>
              <Text>{agentInfo?.initiatorMonth}</Text>
            </View>
            <View className="info-item">
              <Text>累计分润</Text>
              <Text>{agentInfo?.initiatorTotal}</Text>
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
              <Text>{agentInfo?.recipientToday}</Text>
            </View>
            <View className="info-item">
              <Text>本月预估分润</Text>
              <Text>{agentInfo?.recipientMonth}</Text>
            </View>
            <View className="info-item">
              <Text>累计分润</Text>
              <Text>{agentInfo?.recipientTotal}</Text>
            </View>
          </View>
        </View>
      </View>
      {subordinateAgent && (
        <View className="organization">
          <View className="organization-title">
            <Text style={{ marginRight: '5px' }}>组织结构</Text>
            <QuestionOutlined onClick={() => onPrompt(2)} />
          </View>
          <View className="cellgroup">
            <CellGroup>
              {subordinateAgent?.map((item, index) => {
                return (
                  <Cell
                    key={index}
                    onClick={() => {
                      onClickOrganization(item);
                    }}
                    title={
                      <View style={{ display: 'flex' }}>
                        <Tag color="#E9E9E9" textColor="#999999">
                          {item?.level === 2 ? '市级' : '区/县级'}
                        </Tag>
                        <View className="cell-title">{item?.areaName + '代'}</View>
                      </View>
                    }
                    isLink
                  />
                );
              })}
            </CellGroup>
          </View>
        </View>
      )}
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
                    <View className="joined-icon" onClick={() => setAddTime(!addTime)}>
                      {addTime ? (
                        <>
                          <ArrowUp />
                          <ArrowDown style={{ color: '#A05635' }} />
                        </>
                      ) : (
                        <>
                          <ArrowUp style={{ color: '#A05635' }} />
                          <ArrowDown />
                        </>
                      )}
                    </View>
                  </View>
                  <View className="joined">
                    <Text>粉丝数量</Text>
                    <View
                      className="joined-icon"
                      onClick={() => {
                        setFansNum(!fansNum);
                      }}
                    >
                      {fansNum ? (
                        <>
                          <ArrowUp />
                          <ArrowDown style={{ color: '#A05635' }} />
                        </>
                      ) : (
                        <>
                          <ArrowUp style={{ color: '#A05635' }} />
                          <ArrowDown />
                        </>
                      )}
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
                  request={selectPage}
                  params={{
                    pageNum: 1,
                    pageSize: 20,
                    fansLevel: orderActive * 1 + 1,
                    sortByTime: addTime ? 0 : 1,
                    sortByFans: fansNum ? 0 : 1,
                    userLevel:
                      activeName === '一级经销商'
                        ? 1
                        : activeName === '二级经销商'
                        ? 2
                        : activeName === '奋斗者'
                        ? 3
                        : undefined,
                  }}
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
