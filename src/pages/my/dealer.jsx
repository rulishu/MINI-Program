import React from 'react';
import { View, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Button, Swiper } from '@taroify/core';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { userInfos } = useSelector((state) => state.my);
  const info = {
    id: 1,
    type: 1,
    money: '0.00',
    withdrawal: '0.00',
  };

  const stepInfo = {
    0: [
      {
        title: '升级后，自购最高省30%',
      },
      {
        title: '再享最高30%粉丝订单分润',
      },
    ],
    1: [
      {
        title: '升级后可享自购+返10%',
      },
      {
        title: '+返跨级粉丝10%订单分润',
      },
    ],
    2: [
      {
        title: '已享顶级经销权益',
      },
    ],
  };

  return (
    <View className="card">
      <View className="my-orders-card">
        <View className="my-orders title-bg">
          <View>
            <Text className="my-orders-title" style={{ color: '#ffffff' }}>
              {userInfos?.level === '3'
                ? '奋斗者'
                : userInfos?.level === '1'
                ? '一级经销商'
                : '二级经销商'}
            </Text>
          </View>
          <View
            className="my-orders-all"
            style={{ color: '#ffffff' }}
            onTap={async () => {
              Taro.navigateTo({ url: '/pages/dealer/index' });
              await dispatch({
                type: 'allOrders/update',
                payload: {
                  orderActive: 0,
                },
              });
            }}
          >
            <View className="banner">
              <Swiper className="vertical-swiper" direction="vertical" autoplay={3000}>
                {stepInfo[userInfos?.level === '3' ? 0 : userInfos?.level === '1' ? 1 : 2].map(
                  (a, index) => {
                    return <Swiper.Item key={index}>{a.title}</Swiper.Item>;
                  },
                )}
              </Swiper>
            </View>
            <Icon name="rect-right" size="10"></Icon>
          </View>
        </View>
        <View className="my-orders">
          <View>
            <Text className="my-orders-title">
              累计分润 ¥<Text className="my-orders-title-money"> {info.money}</Text>元
            </Text>
          </View>
          <View
            className="my-orders-all"
            onTap={async () => {
              Taro.navigateTo({ url: '/pages/dividendDetails/index' });
              await dispatch({
                type: 'allOrders/update',
                payload: {
                  orderActive: 0,
                },
              });
            }}
          >
            <Icon name="rect-right" size="10"></Icon>
          </View>
        </View>
        <Divider
          style={{ color: '#D7D7D7', borderColor: '#D7D7D7', padding: '0 10px', margin: '10px 0' }}
        />
        <View className="withdrawal">
          <View className="title">可提现</View>
          <View className="withdrawal-info">
            <View className="moneys">
              ¥ <Text className="money">{info.withdrawal}</Text>元
            </View>
            <Button color="primary" size="mini" className="btn">
              去提现
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
