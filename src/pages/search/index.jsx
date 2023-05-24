import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Input } from '@nutui/nutui-react-taro';
import { historyList } from './item';
import Taro from '@tarojs/taro';
import NavBar from '../../component/navBar';
import './index.scss';

const Index = () => {
  const [searchHeights, setSearchHeights] = useState(0); // 与胶囊按钮同高
  const [navHeights, setNavHeights] = useState(0); //导航栏总高
  const [searchWidths, setsearchWidths] = useState(0); // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度

  useEffect(() => {
    let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const { top, width, height, right } = menuButtonInfo;
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res;
        const margin = top - statusBarHeight;
        const navHeight = height + statusBarHeight + margin * 2; //导航栏总高
        // const searchMarginTop = statusBarHeight + margin // 状态栏 + 胶囊按钮边距
        const searchHeight = height; // 与胶囊按钮同高
        const searchWidth = right - width; // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
        setSearchHeights(searchHeight);
        setNavHeights(navHeight);
        setsearchWidths(searchWidth);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      content: '确认删除历史搜索记录吗?',
      success: function (res) {
        if (res.confirm) {
          return;
        } else if (res.cancel) {
          return;
        }
      },
    });
  };

  // 跳转搜索页
  const onConfirm = () => {
    // window.console.log('跳转搜索页', e.detail.value)
    Taro.navigateTo({ url: '/pages/searchResult/index' });
  };
  return (
    <View className="index">
      <View className="header-search-news">
        <NavBar
          background="#ffffff"
          color="#fff"
          renderCenter={
            <View className="header-search-new" style={{ width: searchWidths }}>
              <View className="header-search-input" style={{ marginLeft: 20, width: '80%' }}>
                <Input
                  className="input"
                  style={{ height: searchHeights }}
                  placeholder="搜索"
                  onConfirm={(e) => onConfirm(e)}
                />
              </View>
              <View
                onTap={() => goBack()}
                className="header-search-input-close"
                style={{ width: '20%' }}
              >
                <Text>取消</Text>
              </View>
            </View>
          }
        />
      </View>
      <View className="middle-search" style={{ top: navHeights }}>
        <View className="middle-search-info">
          <View className="search-history">
            <View className="search-history-head">
              <View className="search-title">
                <Text>历史记录</Text>
              </View>
              <View onTap={() => onDel()} className="search-title-del">
                <Text>删除</Text>
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
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
