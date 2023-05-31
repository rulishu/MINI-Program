import React, { useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Empty, SearchBar } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import searchCart from '@/assets/images/searchCart.svg';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { pageNum, pageSize, selectLists, searchValue } = useSelector((state) => state.search);

  useEffect(() => {
    // 搜索历史
    dispatch({
      type: 'search/getHistory',
    });
    return () => {
      // 当前界面即将关闭
      dispatch({
        type: 'search/update',
        payload: {
          searchValue: '',
        },
      });
      // 在这里可以添加一些清理工作，例如取消未完成的请求等
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    await dispatch({
      type: 'search/getHistory',
    });
  };

  // 跳转商品详情
  const goGoodInfo = async (itm) => {
    await dispatch({
      type: 'goodInfo/infoDetails',
      payload: {
        id: itm?.id,
      },
    });
    Taro.navigateTo({ url: '/pages/goodInfo/index' });
  };

  return (
    <View className="index">
      <View className="header-search-new">
        <SearchBar
          placeholder="搜索"
          className="search-bar"
          value={searchValue}
          onSearch={(e) => onConfirm(e)}
        />
      </View>
      <View className="middle-search-result">
        {selectLists.length === 0 ? (
          <Empty className="empty" description="无数据" imageSize={100} />
        ) : (
          <View className="middle-search-result-info">
            {selectLists.map((item) => (
              <View
                className="middle-search-result-info-item"
                key={item.id}
                onTap={() => goGoodInfo(item)}
              >
                <View className="search-result-image">
                  <Image mode="widthFix" src={item.mainGraph} className="image"></Image>
                </View>
                <View className="search-result-content">
                  <View className="search-result-content-head">
                    <Text className="tag">{item.suppliersId === 1 ? '严选' : ''}</Text>
                    <Text className="title">{item.itemName}</Text>
                  </View>
                  <View className="search-result-content-middle">
                    {item?.savedPrice === 0 ? (
                      <Text></Text>
                    ) : (
                      <Text className="activity">{item.savedPrice}</Text>
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
