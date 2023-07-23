import React, { useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Empty, SearchBar } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import searchCart from '@/assets/images/searchCart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCurTimes } from '@/utils/min';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const token = Taro.getStorageSync('token');
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
    // 游客搜索
    if (token === '') {
      let searchHistory = Taro.getStorageSync('searchHistory');
      if (!searchHistory) {
        searchHistory = [];
      }
      searchHistory.push({
        keyword: e,
        searchTime: getCurTimes(),
      });
      Taro.setStorageSync('searchHistory', searchHistory);
      await dispatch({
        type: 'search/update',
        payload: {
          historyLists: searchHistory?.reverse(),
        },
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
    Taro.navigateTo({ url: `/goodsPackage/goodInfo/index?id=${itm?.id}` });
  };

  // 最低价
  const min = (data) => {
    const datas = data.filter((vel) => {
      return vel.price !== 0;
    });
    let str =
      datas?.reduce((prev, current) => {
        if (current?.membershipPrice < prev) {
          return current?.membershipPrice;
        } else {
          return prev;
        }
      }, Infinity) || 0;
    if (str === Infinity) {
      return '';
    } else {
      return '¥' + str;
    }
  };

  // 最高价
  const aPrice = (sma, item) => {
    if (sma === Infinity) {
      return;
    }
    let price = sma.replace(/[^0-9]/gi, '');
    let str = item
      ?.filter((a) => {
        return a.membershipPrice === Number(price);
      })
      .map((e) => e.referencePrice)
      .flat();
    // js 过滤空值
    let str2 = str?.filter((s) => {
      return s;
    });
    // js 最小值
    let str3 = Math.min(...str2);
    if (str3?.length === 0 || str3 === undefined || str3 === Infinity) {
      return;
    } else {
      return '¥' + str3?.toString();
    }
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
                    <Text className="tag">{item.suppliersId === 1 ? '自营' : '严选'}</Text>
                    <Text className="title">{item.itemName}</Text>
                  </View>
                  <View className="search-result-content-middle">
                    {item?.savedPrice === 0 ||
                    item?.savedPrice === '' ||
                    item?.savedPrice === undefined ? (
                      <Text></Text>
                    ) : (
                      <>
                        <Text className="activity">自购省</Text>
                        <Text className="activity-price">¥ {item?.savedPrice}</Text>
                      </>
                    )}
                  </View>
                  <View className="search-result-content-bottom">
                    <View>
                      <Text className="lastPrice">
                        {item.isActivityItem === true
                          ? '¥' + item.activityItemPrice
                          : min(item.itemSkuDtos)}
                      </Text>
                      <Text className="firstPrice">
                        {aPrice(min(item.itemSkuDtos), item.itemSkuDtos)}
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
