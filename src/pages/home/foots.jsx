import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { useSelector } from 'react-redux';
import './index.scss';

const Foots = () => {
  const { wineList } = useSelector((state) => state.home);
  return (
    <View className="foot">
      {wineList.map((item, index) => {
        return (
          <View key={index} className="foot-items">
            <View className="foot-item">
              <Image
                mode="widthFix"
                // eslint-disable-next-line global-require
                src={item.mainGraph}
                className="foot-item"
              ></Image>
              <View className="foot-price">
                <View className="price">
                  <Text className="price-text">{item.price}</Text>
                </View>
              </View>
            </View>
            <View className="foot-content">
              <View className="foot-title">
                <Text className="foot-title">{item.categoryName}</Text>
              </View>
              <View className="foot-text">
                <Text className="foot-text">{item.remark}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default Foots;
