/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Steps, Step, Empty } from '@nutui/nutui-react-taro';
import Tabs from '@/component/aTabs';
import { useRequest } from 'ahooks';
import { useSelector, useDispatch } from 'react-redux';
import { getPackageList } from '@/server/logisticsInfo';
import { logisticsList } from './item';
import './index.scss';

const Index = () => {
  const { id, packageActive, packageList } = useSelector((state) => state.logisticsInfo);
  const dispatch = useDispatch();
  const updateFn = (payload) => {
    dispatch({
      type: 'logisticsInfo/update',
      payload: payload,
    });
  };
  const { run } = useRequest(getPackageList, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        let list =
          result &&
          result?.map((item, index) => {
            return { ...item, title: `包裹${index + 1}`, id: index };
          });
        updateFn({
          packageList: list,
        });
        Taro.hideLoading();
      } else {
        Taro.hideLoading();
      }
    },
  });

  useEffect(() => {
    Taro.showLoading({ title: '加载中...', mask: true });
    run({ id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LogisticsInfo = (tabItem) => {
    return (
      <View className="logisticsInfo">
        <View className="logisticsInfo-head">
          {tabItem.items?.map((goodsItem) => {
            return (
              <View key={goodsItem} className="logisticsInfo-img">
                <Image className="logisticsInfo-img" src={goodsItem?.mainGraph}></Image>
              </View>
            );
          })}
        </View>
        {tabItem.logisticsCompany ? (
          <View className="logisticsInfo-cont">
            <View className="logisticsInfo-content">
              <View className="logisticsInfo-content-head">
                <View>
                  {tabItem.logisticsCompany} {tabItem.trackingNumber}
                </View>
                <View
                  style={{ marginLeft: 10, color: '#965A3C' }}
                  onClick={() => {
                    wx.setClipboardData({
                      data: tabItem.trackingNumber,
                    });
                  }}
                >
                  复制
                </View>
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
        ) : (
          <Empty description="无数据" className="empty" />
        )}
      </View>
    );
  };

  return (
    <View className="index">
      {packageList?.length > 1 ? (
        <Tabs
          value={packageActive}
          onChange={(paneKey) => {
            updateFn({
              packageActive: paneKey,
            });
          }}
          tabList={packageList?.map((tabItem) => {
            return {
              ...tabItem,
              children: LogisticsInfo(tabItem),
            };
          })}
        />
      ) : packageList?.length !== 0 ? (
        LogisticsInfo(packageList[0])
      ) : (
        <Empty description="无数据" className="empty" />
      )}
    </View>
  );
};
export default Index;
