import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Popup from './popup';
import { useDispatch } from 'react-redux';
import Orders from './orders';
import { tabList } from './eumn';
import { QuestionOutlined, FilterOutlined } from '@taroify/icons';
import { Tag, Popover } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [activeTag, setActiveTag] = useState(0);
  const [lightTheme, setLightTheme] = useState(false);
  const itemList = [{ name: '全部' }, { name: '发起方分润' }, { name: '收件方分润' }];

  const list = [
    {
      title: '今日地盘分润',
      num: '12.00',
    },
    {
      title: '本月地盘分润',
      num: '59.00',
    },
    {
      title: '累积地盘分润',
      num: '1299.00',
    },
    {
      title: '未结算地盘分润',
      num: '100.00',
    },
  ];

  // 提示
  const onPrompt = () => {
    dispatch({
      type: 'proxyDividendDetails/update',
      payload: {
        popupOpen: true,
      },
    });
  };

  return (
    <View className="fans">
      <View className="fans-head">
        <View className="fans-head-top">
          <View>账户余额 0.01</View>
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
        <View className="fans-head-foot">代理商分润由平台对公支付，暂不支持主动提现</View>
      </View>
      <View className="fans-body">
        <View className="fans-body-title">
          <View className="title-info">
            <View>
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
            <View className="screen">
              <Popover
                className="popover"
                visible={lightTheme}
                location="bottom-end"
                onClick={() => {
                  lightTheme ? setLightTheme(false) : setLightTheme(true);
                }}
                list={itemList}
              >
                <View className="screen">
                  <Text style={{ fontSize: 12, fontWeight: 300 }}>筛选</Text>
                  <FilterOutlined />
                </View>
              </Popover>
            </View>
          </View>
        </View>

        <Orders />
      </View>
      <Popup />
    </View>
  );
};
export default Index;
