import React from 'react';
// import { useSelector } from 'react-redux';
import './index.scss';
import { View, Text, Image } from '@tarojs/components';
import { list } from './dataSource';

const Index = () => {
  // const { subList } = useSelector((state) => state.categories);
  return (
    <View className="right">
      <View>
        <Text className="right-title">爆品系列</Text>
      </View>
      <View>
        {list.map((item, index) => {
          return (
            <View key={index} className="right-content">
              <View>
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src="//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg"
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
          );
        })}
      </View>
    </View>
  );
};
export default Index;
