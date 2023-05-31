import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Swiper, SwiperItem, Skeleton } from '@nutui/nutui-react-taro';

import './index.scss';

const Index = (props) => {
  const { data } = props;

  return (
    <View className="classification">
      {data?.map((item) => {
        return (
          <View key={item.id} className="classification-content">
            <View className="classification-content-title">
              <Text>{item.itemName}</Text>
            </View>
            <View className="classification-content-banner">
              <Swiper
                height={150}
                paginationColor="#426543"
                autoPlay="3000"
                initPage={0}
                paginationVisible
              >
                {item.bannerList?.map((val) => (
                  <SwiperItem key={val.id}>
                    <img src={val.img} alt="" />
                  </SwiperItem>
                ))}
              </Swiper>
            </View>
            <View className="classification-content-goods">
              {item?.goodsList?.map((vel) => (
                <View
                  className="middle-search-result-info-item"
                  key={vel.id}
                  onTap={() => goGoodInfo(vel)}
                >
                  <View className="search-result-image">
                    <Skeleton
                      loading={vel.mainGraph ? true : false}
                      width="auto"
                      height="auto"
                      title
                      animated
                      className="search-result-image"
                    >
                      <Image mode="widthFix" src={vel.mainGraph} className="image"></Image>
                    </Skeleton>
                  </View>
                  <View className="search-result-content">
                    <View className="search-result-content-head">
                      <Text className="title">{vel.itemName}</Text>
                    </View>

                    <View className="search-result-content-bottom">
                      <View>
                        <Text className="lastPrice">
                          <Text style={{ fontSize: 12 }}>¥ </Text>
                          {vel.costPrice || 0}
                        </Text>
                        <Text className="firstPrice">
                          <Text style={{ fontSize: 12 }}>¥ </Text>
                          {vel.price || 0}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default Index;
