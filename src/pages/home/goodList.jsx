import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import homeAdd from '@/assets/images/homeAdd.svg';
import homeNoAdd from '@/assets/images/homeNoAdd.svg';
import { Skeleton } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { min, aPrice } from '@/utils/min';
import './index.scss';

const GoodList = (props) => {
  const { dataList } = props;
  // 跳转商品详情
  const goGoodInfo = async (itm) => {
    // if (itm.stock === 0) {
    //   return Taro.showToast({
    //     title: '该商品已售空',
    //     icon: 'none',
    //     duration: 2000,
    //   });
    // } else if (itm?.onShelf === 0) {
    //   return Taro.showToast({
    //     title: '商品已下架',
    //     icon: 'none',
    //     duration: 2000,
    //   });
    // } else if (itm?.isDelete === 1) {
    //   return Taro.showToast({
    //     title: '商品已删除',
    //     icon: 'none',
    //     duration: 2000,
    //   });
    // }
    Taro.navigateTo({
      url: `/goodsPackage/goodInfo/index?id=${itm?.id}`,
    });
  };

  return (
    <View className="list">
      {dataList?.map((item) => {
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
              {item.onShelf === 0 && (
                <View className="image-state">
                  <Text>{item.onShelf === 0 ? '已下架' : ''}</Text>
                </View>
              )}
              {item.isDelete === 1 && (
                <View className="image-state">
                  <Text>{item.isDelete === 1 ? '已删除' : ''}</Text>
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
                    {item.isActivityItem === true
                      ? '¥' + item.activityItemPrice
                      : min(item.itemSkuDtos)}
                  </Text>
                  <Text className="firstPrice">
                    {aPrice(min(item.itemSkuDtos), item.itemSkuDtos)}
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
