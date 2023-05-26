import React, { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { SearchBar } from '@nutui/nutui-react-taro'; //Input
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize, searchValue, historyLists } = useSelector((state) => state.search);

  useEffect(() => {
    // 搜索历史
    dispatch({
      type: 'search/getHistory',
    });
    dispatch({
      type: 'search/update',
      payload: {
        searchValue: '',
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
      <View className="header-search-new">
        <SearchBar
          placeholder="搜索"
          className="search-bar"
          value={searchValue}
          rightoutIcon={<Text style={{ color: '#ACACAC' }}>取消</Text>}
          onSearch={(e) => onConfirm(e)}
          onClickRightoutIcon={() => goBack()}
        />
      </View>
      <View className="middle-search">
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
                    <Text>{item.keyword}</Text>
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
