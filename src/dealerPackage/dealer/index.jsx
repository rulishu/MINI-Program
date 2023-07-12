import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Divider, Progress, Button } from '@taroify/core';
import { QuestionOutlined } from '@taroify/icons';
import Popup from './popup';
import Taro from '@tarojs/taro';
import { useDispatch } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const doc = '直属粉丝>=20人';
  const doc2 = '团队消费额>=3000';

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
        <Image
          className="dealer-crown-img"
          src="https://fendouzhilu.oss-cn-hangzhou.aliyuncs.com/FDZL/mall/20230616/000a889ada584c4f8b57a10610217134.png"
        />
        <View className="dealer-crown-info">
          <View className="name">Miracle-</View>
          <View className="type">奋斗者</View>
        </View>
      </View>
      <View className="dealer-mid">
        <View className="title">二级经销商 升级中</View>
        <View className="doc">满足以下条件后自动完成升级</View>
        <Divider
          style={{ color: '#D7D7D7', borderColor: '#D7D7D7', padding: '0 4px', margin: '10px 0' }}
        />
        <View className="dealer-mid-body">
          <View className="title">任务1：</View>
          <View className="dealer-mid-body-info">
            <View className="dealer-mid-body-info-left">
              <Progress percent={0} />
            </View>
            <View className="dealer-mid-body-info-right">
              <Button size="mini" className="btn" onClick={() => goPoster()}>
                去邀请
              </Button>
            </View>
          </View>
          <View className="dealer-mid-body-info-left-bot">
            <View className="doc">
              {doc}
              <QuestionOutlined
                style={{ marginLeft: 4, color: '#333333' }}
                onClick={() => onPrompt()}
              />
            </View>
            <View className="text">
              <Text className="text-active">0</Text>/10
            </View>
          </View>
        </View>
        <View className="dealer-mid-body">
          <View className="title">任务2：</View>
          <View className="dealer-mid-body-info">
            <View className="dealer-mid-body-info-left">
              <Progress percent={0} />
            </View>
            <View className="dealer-mid-body-info-right">
              <Button size="mini" className="btn" onClick={() => goHome()}>
                去完成
              </Button>
            </View>
          </View>
          <View className="dealer-mid-body-info-left-bot">
            <View className="doc">
              {doc2}
              <QuestionOutlined
                style={{ marginLeft: 4, color: '#333333' }}
                onClick={() => onPrompt()}
              />
            </View>
            <View className="text">
              <Text className="text-active">0</Text>/2000
            </View>
          </View>
        </View>
      </View>
      <View className="dealer-bot">
        <View className="title">二级经销商 权益</View>
        <View className="dealer-bot-info">享30%自购返佣</View>
        <View className="dealer-bot-info">享10%粉丝消费分润</View>
      </View>
      <View className="dealer-foot">分润基数为订单毛利，具体金额见收益明细</View>
      <Popup />
    </View>
  );
};
export default Index;
