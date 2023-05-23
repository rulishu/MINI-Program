import React, { useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Input } from '@nutui/nutui-react-taro';
import left1 from '@/assets/images/left.svg';
import del from '@/assets/images/del.svg';
import bottom1 from '@/assets/images/bottom.svg';
import { historyList, hotList } from './item';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { hotLists } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch({
      type: 'search/searchHistoryList',
      payload: {
        terminal: 2,
      },
    });
    // eslint-disable-next-line global-require
  }, []);

  //返回
  const goBack = () => {
    wx.navigateBack({
      delta: 1,
    });
  };

  // 删除历史
  const onDel = () => {
    Taro.showModal({
      content: '确认删除全部历史记录？',
      success: function (res) {
        if (res.confirm) {
          return;
        } else if (res.cancel) {
          return;
        }
      },
    });
  };
  return (
    <View className="index">
      <View className="header-search">
        <View className="header-search-icon" onTap={() => goBack()}>
          <Image src={left1} />
        </View>
        <View className="header-search-input">
          <Input className="input" placeholder="奋斗之露" />
        </View>
      </View>
      <View className="middle-search">
        <View className="middle-search-info">
          <View className="search-history">
            <View className="search-history-head">
              <View className="search-title">
                <Text>搜索历史</Text>
              </View>
              <View onTap={() => onDel()}>
                <Image src={del} style={{ width: 18, height: 18 }} />
              </View>
            </View>
            <View className="search-history-content">
              <View className="search-history-content-left">
                {historyList.map((item, index) => (
                  <View key={index} className="search-history-tab">
                    <Text>{item.title}</Text>
                  </View>
                ))}
              </View>
              <View className="search-history-content-right">
                <Image src={bottom1} style={{ width: 12, height: 12 }} />
              </View>
            </View>
          </View>
          <View className="popular-searches">
            <View className="search-title">
              <Text>热门搜索</Text>
            </View>
            <View className="popular-searches-content">
              {hotLists.map((item, index) => (
                <View key={index} className="popular-searches-content-item">
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className="hot-list">
            <View className="hot-list-content">
              <View className="search-title hot-title">
                <Text>热门榜单</Text>
              </View>
              <View className="hot-list-content-data">
                {hotList.map((item, index) => (
                  <View key={index} className="hot-list-content-data-item">
                    <View className="hot-list-content-data-item-left">
                      <View className="left-num">
                        <Text>{index + 1}</Text>
                      </View>
                      <View className="left-title">
                        <Text>{item.title}</Text>
                      </View>
                    </View>
                    {item.icon && (
                      <View
                        className={
                          item.icon === '沸'
                            ? 'hot-list-content-data-item-right boiling-text'
                            : item.icon === '热'
                              ? 'hot-list-content-data-item-right hot-text'
                              : item.icon === '新'
                                ? 'hot-list-content-data-item-right new-text'
                                : ''
                        }
                      >
                        <Text>{item.icon}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
