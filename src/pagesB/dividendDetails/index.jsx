import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Popup from './popup';
import { useDispatch } from 'react-redux';
import Orders from './orders';
import { tabList } from './eumn';
import { QuestionOutlined, Arrow } from '@taroify/icons';
import { Tag } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [activeTag, setActiveTag] = useState(0);

  const list = [
    {
      title: '今日预估分润',
      num: '12.00',
    },
    {
      title: '未结算分润',
      num: '59.00',
    },
    {
      title: '累积分润',
      num: '1299.00',
    },
    {
      title: '已提现',
      num: '100.00',
    },
  ];

  // 提示
  const onPrompt = () => {
    dispatch({
      type: 'dividendDetails/update',
      payload: {
        popupOpen: true,
      },
    });
  };

  return (
    <View className="fans">
      <View className="fans-head">
        <View className="fans-head-top">
          <View>可提现 0.01</View>
          <View className="fans-head-top-right">
            <View>立即提现</View>
            <Arrow />
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
        <View className="fans-head-foot">订单确认收货后，即完成收益结算，支持提现</View>
      </View>
      <View className="fans-body">
        <View className="fans-body-title">
          {tabList.map((a, index) => {
            return (
              <Tag
                plain
                onClick={() => {
                  setActiveTag(index);
                }}
                color={index !== activeTag ? '#999999' : '#965A3C'}
                key={index}
                className="tag"
              >
                {a.title}
              </Tag>
            );
          })}
        </View>
        <Orders />
      </View>
      <Popup />
    </View>
  );
};
export default Index;
