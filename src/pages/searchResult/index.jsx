import React, { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Input } from '@nutui/nutui-react-taro';
import { searchList } from './item';
import searchLeft from '@/assets/images/searchLeft.svg';
import NavBar from '../../component/navBar';
import home3 from '@/assets/images/home3.png';
import searchCart from '@/assets/images/searchCart.svg';
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
  return (
    <View className="index">
      <View className="header-search-news">
        <NavBar
          background="#fff"
          color="#fff"
          // iconTheme="black"
          // back
          renderCenter={
            <View className="header-search-new" style={{ width: searchWidths }}>
              <View style={{ width: '10%' }}>
                <Image mode="widthFix" src={searchLeft} style={{ width: 24, height: 24 }}></Image>
              </View>
              <View className="header-search-input" style={{ marginLeft: 10, width: '80%' }}>
                <Input className="input" style={{ height: searchHeights }} placeholder="搜索" />
              </View>
              <View
                onTap={() => goBack()}
                className="header-search-input-close"
                style={{ width: '10%' }}
              ></View>
            </View>
          }
        />
      </View>
      <View className="middle-search-result" style={{ top: navHeights }}>
        <View className="middle-search-result-info">
          {searchList.map((item) => (
            <View className="middle-search-result-info-item" key={item.id}>
              <View className="search-result-image">
                <Image mode="widthFix" src={home3} className="image"></Image>
              </View>
              <View className="search-result-content">
                <View className="search-result-content-head">
                  <Text className="name">{item.name}</Text>
                  <Text className="title">{item.title}</Text>
                </View>
                <View className="search-result-content-middle">
                  {item.activity !== '' && <Text className="activity">{item.activity}</Text>}
                </View>
                <View className="search-result-content-bottom">
                  <View>
                    <Text className="lastPrice">¥{item.lastPrice}</Text>
                    <Text className="firstPrice">¥{item.firstPrice}</Text>
                  </View>
                  <View className="searchCart">
                    <Image mode="widthFix" src={searchCart} className="searchCart"></Image>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
export default Index;
