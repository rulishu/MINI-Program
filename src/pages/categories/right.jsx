import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';
import { list } from './dataSource';

const Index = () => {
  return (
    <View className="right">
      <View>
        <Text className="right-title">爆品系列</Text>
      </View>
      <View>
        {list.map((item, index) => (
          <View key={index} className="right-content">
            <View>
              <Image
                mode="widthFix"
                // eslint-disable-next-line global-require
                src={require('@/assets/images/home7.png')}
                className="rightImage"
              ></Image>
            </View>
            <View className="right-contents">
              <View className="right-content-texts">
                <Text className="right-content-text">{item.title}</Text>
              </View>
              <View className="right-content-bottom">
                <View>
                  <Text className="right-content-price">
                    <Text className="right-content-price-icon">¥</Text>
                    {item.price}
                    <Text className="right-content-price-icon">.00</Text>
                  </Text>
                </View>
                <View>
                  <Image
                    mode="widthFix"
                    // eslint-disable-next-line global-require
                    src={require('@/assets/images/car1.png')}
                    className="right-content-car"
                  ></Image>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Index;
