import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import homeAdd from '@/assets/images/homeAdd.svg';
import homeNoAdd from '@/assets/images/homeNoAdd.svg';
import { Skeleton } from '@nutui/nutui-react-taro';
import { useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const GoodList = (props) => {
  const dispatch = useDispatch();
  const { dataList } = props;

  // 跳转商品详情
  const goGoodInfo = async (itm) => {
    if (itm.stock === 0) {
      return Taro.showToast({
        title: '该商品已售空',
        icon: 'none',
        duration: 2000,
      });
    }
    await dispatch({
      type: 'goodInfo/infoDetails',
      payload: {
        id: itm?.id,
      },
    });
    Taro.navigateTo({ url: '/pages/goodInfo/index' });
  };

  // 最低价
  const min = (data) => {
    return (
      data?.reduce((prev, current) => {
        if (current?.membershipPrice < prev) {
          return current?.membershipPrice;
        } else {
          return prev;
        }
      }, Infinity) || 0
    );
  };

  // 最高价
  const max = (data) => {
    return (
      data?.reduce((prev, curr) => {
        return prev?.membershipPrice > curr?.membershipPrice ? prev : curr;
      })?.membershipPrice || 0
    );
  };

  return (
    <View className="list">
      {dataList.map((item) => {
        return (
          <View
            className="middle-search-result-info-item"
            key={item.id}
            onTap={() => goGoodInfo(item)}
          >
            <View className="search-result-image">
              <Skeleton
                loading={item.mainGraph ? true : false}
                width="auto"
                height="auto"
                title
                animated
                className="search-result-image"
              >
                <Image mode="widthFix" src={item.mainGraph} className="image"></Image>
              </Skeleton>
              {item.stock === 0 && (
                <View className="image-state">
                  <Text>{item.stock === 0 ? '已售空' : ''}</Text>
                </View>
              )}
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
                    <Text style={{ fontSize: 12 }}>¥ </Text>
                    {min(item.itemSkuDtos) || 0}
                  </Text>
                  <Text className="firstPrice">
                    <Text style={{ fontSize: 12 }}>¥ </Text>
                    {max(item.itemSkuDtos) || 0}
                  </Text>
                </View>
                <View className="searchCart">
                  <Image
                    mode="widthFix"
                    src={item.stock === 0 ? homeNoAdd : homeAdd}
                    className="searchCart"
                  ></Image>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default GoodList;
