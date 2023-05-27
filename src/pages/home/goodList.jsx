import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import homeAdd from '@/assets/images/homeAdd.svg';
import './index.scss';

const GoodList = (props) => {
  const { dataList } = props;

  return (
    <View className="list">
      {dataList.map((item) => {
        return (
          <View className="middle-search-result-info-item" key={item.id}>
            <View className="search-result-image">
              <Image mode="widthFix" src={item.mainGraph} className="image"></Image>
            </View>
            <View className="search-result-content">
              <View className="search-result-content-head">
                <Text className="tag">
                  {item.itemType === 1 ? '自营' : item.itemType === 2 ? '严选' : ''}
                </Text>
                <Text className="title">{item.itemName}</Text>
              </View>
              <View className="search-result-content-middle">
                {item?.activity === '' ||
                item?.activity === null ||
                item?.activity === undefined ? (
                    <Text></Text>
                  ) : (
                    <>
                      <Text className="activity">{item.activity}</Text>
                      <Text className="activity-price">{item.activityPrice}</Text>
                    </>
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
                  <Image mode="widthFix" src={homeAdd} className="searchCart"></Image>
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
