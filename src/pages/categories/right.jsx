import React from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import { View, Text, Image } from '@tarojs/components';

const Index = (props) => {
  const { categoryName } = props;
  const { subList } = useSelector((state) => state.categories);

  return (
    <View className="right" style={{ paddingBottom: 70, width: '64vw', margin: -10 }}>
      <View style={{ marginBottom: 8 }}>
        <Text className="right-title">{categoryName}</Text>
      </View>
      <View>
        {subList.map((item, index) => {
          return (
            <View key={index} className="right-content">
              <View>
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src={item.mainGraph}
                  className="rightImage"
                ></Image>
              </View>
              <View className="right-contents">
                <View className="right-content-texts">
                  <Text className="right-content-text">{item.itemName}</Text>
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
          );
        })}
      </View>
    </View>
  );
};
export default Index;
