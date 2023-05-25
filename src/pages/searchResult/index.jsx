import React, { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Empty, SearchBar, Tag } from '@nutui/nutui-react-taro'; //Input
import searchLeft from '@/assets/images/searchLeft.svg';
import NavBar from '../../component/navBar';
import Taro from '@tarojs/taro';
import searchCart from '@/assets/images/searchCart.svg';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize, selectLists, searchValue } = useSelector((state) => state.search);
  // const [searchHeights, setSearchHeights] = useState(0); // 与胶囊按钮同高
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
        // const searchHeight = height; // 与胶囊按钮同高
        const searchWidth = right - width; // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
        // setSearchHeights(searchHeight);
        setNavHeights(navHeight);
        setsearchWidths(searchWidth);
      },
    });
    // 搜索历史
    dispatch({
      type: 'search/getHistory',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //返回
  const goBack = () => {
    wx.navigateBack({
      delta: 1,
    });
    dispatch({
      type: 'search/update',
      payload: {
        searchValue: '',
      },
    });
  };

  // 跳转搜索页
  const onConfirm = async (e) => {
    if (e.trim() === '') {
      return Taro.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 2000,
      });
    }
    await dispatch({
      type: 'search/update',
      payload: {
        searchValue: e,
      },
    });
    await dispatch({
      type: 'search/searchSelectList',
      payload: {
        itemName: e,
        pageNum: pageNum,
        pageSize: pageSize,
        flag: true,
      },
    });
  };
  return (
    <View className="index">
      <View className="header-search-news">
        <NavBar
          background="#fff"
          color="#fff"
          renderCenter={
            <View className="header-search-new" style={{ width: searchWidths }}>
              <SearchBar
                leftoutIcon={
                  <Image
                    mode="widthFix"
                    src={searchLeft}
                    style={{ width: 18, height: 18 }}
                    onTap={() => goBack()}
                  ></Image>
                }
                placeholder="搜索"
                onSearch={(e) => onConfirm(e)}
                value={searchValue}
              />
            </View>
          }
        />
      </View>
      <View className="middle-search-result" style={{ top: navHeights }}>
        {selectLists.length === 0 ? (
          <Empty className="empty" description="无数据" imageSize={100} />
        ) : (
          <View className="middle-search-result-info">
            {selectLists.map((item) => (
              <View className="middle-search-result-info-item" key={item.id}>
                <View className="search-result-image">
                  <Image mode="widthFix" src={item.mainGraph} className="image"></Image>
                </View>
                <View className="search-result-content">
                  <View className="search-result-content-head">
                    <Tag color="#AAAAAA" textColor="#ffffff">
                      {item.itemType === 1 ? '自营' : item.itemType === 2 ? '严选' : ''}
                    </Tag>
                    <Text className="title">{item.itemName}</Text>
                  </View>
                  <View className="search-result-content-middle">
                    {item?.activity === '' ||
                    item?.activity === null ||
                    item?.activity === undefined ? (
                        <Text></Text>
                      ) : (
                        <Text className="activity">{item.activity}</Text>
                      )}
                  </View>
                  <View className="search-result-content-bottom">
                    <View>
                      <Text className="lastPrice">
                        <Text style={{ fontSize: 12 }}>¥ </Text>
                        {item.costPrice || 0}
                      </Text>
                      <Text className="firstPrice">
                        <Text style={{ fontSize: 12 }}>¥ </Text>
                        {item.price || 0}
                      </Text>
                    </View>
                    <View className="searchCart">
                      <Image mode="widthFix" src={searchCart} className="searchCart"></Image>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
export default Index;
