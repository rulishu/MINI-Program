import React from 'react';
import { View, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  const list = [
    {
      title: '我的粉丝',
      num: 233,
    },
    {
      title: '今日涨粉',
      num: 12,
    },
    {
      title: '今日分润',
      num: 78.23,
    },
    {
      title: '待提现金额',
      num: 1278.23,
    },
  ];

  return (
    <View>
      <View className="heads">
        <View className="my-title">
          <Text>我的</Text>
        </View>
        <View className="option-icon">
          <View>
            <Icon name="comment" size="20" style={{ marginRight: 20 }}></Icon>
            <Icon name="setting" size="20"></Icon>
          </View>
        </View>
      </View>
      <View className="head-info">
        <View className="my-headIcon"></View>
        <View className="head-infos">
          <View className="head-info-name">
            <Text>阿加西</Text>
            <Text className="head-info-name-xf">续费</Text>
          </View>
          <View className="head-info-id">
            <Text>经销商 ID：HZ-02-8876</Text>
          </View>
          <View className="head-info-id">
            <Text>加入融辉第 1389 天</Text>
          </View>
        </View>
      </View>
      <View className="head-list">
        {list.map((item, index) => (
          <View key={index} className="head-list-item">
            <View className="head-list-item-title">
              <Text>{item.num}</Text>
            </View>
            <View className="head-list-item-num">
              <Text>{item.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Index;
