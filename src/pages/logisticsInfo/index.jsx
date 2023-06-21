/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Steps, Step, Tabs } from '@nutui/nutui-react-taro';
import { useRequest } from 'ahooks';
import { useSelector, useDispatch } from 'react-redux';
import { getBannerList } from '@/server/logisticsInfo';
import { logisticsList } from './item';
import './index.scss';

const Index = () => {
  const { id } = useSelector((state) => state.logisticsInfo);
  const [tab1value, setTab1value] = useState('0');
  const ImageList = [
    { imageUrl: require('@/assets/images/home8.png') },
    { imageUrl: require('@/assets/images/home8.png') },
    { imageUrl: require('@/assets/images/home8.png') },
  ];
  const tabList = [{ tabTitle: '包裹1' }, { tabTitle: '包裹2' }, { tabTitle: '包裹3' }];
  const dispatch = useDispatch();
  const updateFn = (payload) => {
    dispatch({
      type: 'logisticsInfo/update',
      payload: payload,
    });
  };
  const { run } = useRequest(getBannerList, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        updateFn({
          orderList: result && result?.records,
        });
        Taro.hideLoading();
      } else {
        Taro.hideLoading();
      }
    },
  });

  useEffect(() => {
    run({ id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="index">
      <Tabs
        value={tab1value}
        onChange={({ paneKey }) => {
          setTab1value(paneKey);
        }}
      >
        {tabList?.map((tabItem) => {
          return (
            <Tabs.TabPane title={tabItem?.tabTitle} className="tabPane" key={tabItem}>
              <View className="logisticsInfo">
                <View className="logisticsInfo-head">
                  {ImageList?.map((imageItem) => {
                    return (
                      <View key={imageItem} className="logisticsInfo-img">
                        <Image
                          mode="widthFix"
                          className="logisticsInfo-img"
                          // eslint-disable-next-line global-require
                          src={imageItem?.imageUrl}
                        ></Image>
                      </View>
                    );
                  })}
                </View>
                <View className="logisticsInfo-cont">
                  <View className="logisticsInfo-content">
                    <View className="logisticsInfo-content-head">
                      <View>中通快递 87897879</View>
                      <View style={{ marginLeft: 10, color: '#965A3C' }}>复制</View>
                    </View>
                    <View className="logisticsInfo-content-middle">
                      <View className="steps-wrapper">
                        <Steps direction="vertical" progressDot current={5}>
                          {logisticsList.map((item) => (
                            <Step
                              key={item.id}
                              icon={item.icon}
                              iconColor={item.icon === 'check-checked' ? '#222B45' : '#A85230'}
                              size="14"
                              activeIndex={item.id}
                              title={
                                <View className="title">
                                  <p className="state">{item.state}</p>
                                  <p className="time">{item.time}</p>
                                </View>
                              }
                              content={<View className="content">{item.content}</View>}
                            ></Step>
                          ))}
                        </Steps>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </View>
  );
};
export default Index;
