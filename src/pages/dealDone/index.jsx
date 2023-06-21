import React, { useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Empty, Icon, Button } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useDispatch } from 'react-redux';
import { min, aPrice } from '@/utils/min';
import NavBar from '../../component/navBar';
import homeAdd from '@/assets/images/homeAdd.svg';
import { list } from './item';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [homeTopNavHeight, setHomeTopNavHeight] = useState(0);
  useEffect(() => {
    //获取顶部导航栏位置
    let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const { top, height } = menuButtonInfo;
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res;
        const margin = top - statusBarHeight;
        const navHeight = height + statusBarHeight + margin * 2;
        setHomeTopNavHeight(navHeight);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 跳转商品详情
  const goGoodInfo = async (itm) => {
    Taro.navigateTo({ url: `/pages/goodInfo/index?id=${itm?.id}` });
  };

  // 返回首页
  const goHome = () => {
    Taro.switchTab({ url: '/pages/home/index' });
    dispatch({
      type: 'global/update',
      payload: {
        activeIndex: 0,
      },
    });
  };

  // 立即评价
  const goEvaluate = () => {};

  return (
    <View className="index">
      <View>
        <NavBar
          background="#A05635"
          color="white"
          renderCenter={
            <View className="navbar-head">
              <View className="navbar-head-left">
                <Icon size="18" name="rect-left" onTap={() => goHome()} />
              </View>
              <View className="navbar-head-right">
                <Text>交易完成</Text>
              </View>
            </View>
          }
        />
      </View>
      <View
        style={{
          position: 'fixed',
          left: 0,
          width: '100%',
          top: homeTopNavHeight,
        }}
      >
        <View className="option">
          <View style={{ marginRight: 10 }}>
            <Button size="small" plain shape="square" color="#AAAAAA" onClick={() => goHome()}>
              返回首页
            </Button>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Button size="small" plain shape="square" color="#AAAAAA" onClick={() => goEvaluate()}>
              立即评价
            </Button>
          </View>
        </View>
        <View className="middle-search-result">
          {list.length === 0 ? (
            <Empty className="empty" description="无数据" imageSize={100} />
          ) : (
            <View className="middle-search-result-info">
              {list.map((item) => (
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
                        <Text className="lastPrice">{min(item.itemSkuDtos) || '¥0'}</Text>
                        <Text className="firstPrice">
                          {aPrice(min(item.itemSkuDtos), item.itemSkuDtos)}
                        </Text>
                      </View>
                      <View className="searchCart">
                        <Image mode="widthFix" src={homeAdd} className="searchCart"></Image>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Index;
