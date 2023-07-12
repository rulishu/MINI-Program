import React, { useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Divider, Progress, Button } from '@taroify/core';
import { QuestionOutlined } from '@taroify/icons';
import Popup from './popup';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const { userInfos, fansCount, consumptionAmount, fansPercent, amountPercent } = useSelector(
    (state) => state.dealer,
  );
  const dispatch = useDispatch();
  const params = Taro.getCurrentInstance().router.params;
  useEffect(() => {
    dispatch({
      // 获取用户信息
      type: 'dealer/getUserInfos',
      payload: {
        id: params?.id,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 提示
  const onPrompt = () => {
    dispatch({
      type: 'dealer/update',
      payload: {
        popupOpen: true,
      },
    });
  };

  // 首页
  const goHome = () => {
    Taro.switchTab({ url: '/pages/home/index' });
    dispatch({
      type: 'global/update',
      payload: {
        activeIndex: 0,
      },
    });
  };

  // 邀请海报
  const goPoster = () => {
    Taro.navigateTo({ url: '/userPackage/poster/index' });
  };

  return (
    <View className="dealer">
      <View className="dealer-crown">
        <Image className="dealer-crown-img" src={userInfos?.headUrl} />
        <View className="dealer-crown-info">
          <View className="name">{userInfos?.consumerName}</View>
          <View className="type">
            {userInfos?.level === '3'
              ? '奋斗者'
              : userInfos?.level === '1'
              ? '一级经销商'
              : '二级经销商'}
          </View>
        </View>
      </View>
      <View className="dealer-mid">
        <View className="title">
          {userInfos?.level === '3' ? '二级经销商 升级中' : '一级经销商 升级中'}
        </View>
        <View className="doc">满足以下条件后自动完成升级</View>
        <Divider
          style={{ color: '#D7D7D7', borderColor: '#D7D7D7', padding: '0 4px', margin: '10px 0' }}
        />
        <View className="dealer-mid-body">
          <View className="title">任务1：</View>
          <View className="dealer-mid-body-info">
            <View className="dealer-mid-body-info-left">
              <Progress percent={fansPercent} />
            </View>
            <View className="dealer-mid-body-info-right">
              <Button size="mini" className="btn" onClick={() => goPoster()}>
                去邀请
              </Button>
            </View>
          </View>
          <View className="dealer-mid-body-info-left-bot">
            <View className="doc">
              {userInfos?.level === '3' ? '直属粉丝>=10人' : '直属粉丝>=20人'}
              <QuestionOutlined
                style={{ marginLeft: 4, color: '#333333' }}
                onClick={() => onPrompt()}
              />
            </View>
            <View className="text">
              <Text className="text-active">{fansCount}</Text>/{userInfos?.level === '3' ? 10 : 20}
            </View>
          </View>
        </View>
        <View className="dealer-mid-body">
          <View className="title">任务2：</View>
          <View className="dealer-mid-body-info">
            <View className="dealer-mid-body-info-left">
              <Progress percent={amountPercent} />
            </View>
            <View className="dealer-mid-body-info-right">
              <Button size="mini" className="btn" onClick={() => goHome()}>
                去完成
              </Button>
            </View>
          </View>
          <View className="dealer-mid-body-info-left-bot">
            <View className="doc">
              {userInfos?.level === '3' ? '团队消费额>=3000' : '团队消费额>=20000'}
              <QuestionOutlined
                style={{ marginLeft: 4, color: '#333333' }}
                onClick={() => onPrompt()}
              />
            </View>
            <View className="text">
              <Text className="text-active">{consumptionAmount}</Text>/
              {userInfos?.level === '3' ? 3000 : 20000}
            </View>
          </View>
        </View>
      </View>
      <View className="dealer-bot">
        <View className="title">
          {userInfos?.level === '3' ? '二级经销商 权益' : '一级经销商 权益'}
        </View>
        <View className="dealer-bot-info">
          {userInfos?.level === '3' ? '享30%自购返佣' : '享40%自购返佣'}
        </View>
        <View className="dealer-bot-info">
          {userInfos?.level === '3' ? '享30%粉丝消费分润' : '享40%粉丝消费分润'}
        </View>
      </View>
      <View className="dealer-foot">分润基数为订单毛利，具体金额见收益明细</View>
      <Popup />
    </View>
  );
};
export default Index;
