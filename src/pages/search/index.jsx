import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Tag, SearchBar } from '@nutui/nutui-react-taro'; //Input
import Taro from '@tarojs/taro';
import NavBar from '../../component/navBar';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize, searchValue, historyLists } = useSelector((state) => state.search);
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
  };

  // 删除历史
  const onDel = async () => {
    Taro.showModal({
      content: '确认删除历史搜索记录吗?',
      success: function (res) {
        if (res.confirm) {
          dispatch({
            type: 'search/deleteHistory',
          }).then(() => {
            dispatch({
              type: 'search/getHistory',
            });
          });
        } else if (res.cancel) {
          return;
        }
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
              <SearchBar
                placeholder="搜索"
                value={searchValue}
                rightoutIcon={<Text style={{ color: '#ACACAC' }}>取消</Text>}
                onSearch={(e) => onConfirm(e)}
                onClickRightoutIcon={() => goBack()}
              />
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
                <Text style={{ color: '#ACACAC' }}>删除</Text>
              </View>
            </View>
            <View className="search-history-content">
              <View className="search-history-content-left">
                {historyLists.map((item, index) => (
                  <View
                    key={index}
                    className="search-history-tab"
                    onTap={async () => {
                      await dispatch({
                        type: 'search/update',
                        payload: {
                          searchValue: item.keyword,
                        },
                      });
                      await dispatch({
                        type: 'search/searchSelectList',
                        payload: {
                          itemName: item.keyword,
                          pageNum: pageNum,
                          pageSize: pageSize,
                          flag: true,
                        },
                      });
                      Taro.navigateTo({ url: '/pages/searchResult/index' });
                    }}
                  >
                    <Tag plain color="#BFBFBF">
                      {item.keyword}
                    </Tag>
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
