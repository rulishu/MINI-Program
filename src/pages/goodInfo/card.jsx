import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
// import Taro from '@tarojs/taro';
import './index.scss';
import { useSelector } from 'react-redux';

const Index = () => {
  const { queryInfo } = useSelector((state) => state.goodInfo);

  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <View className="cardHeader">
        <Icon name="rect-left" size="20" style={{ marginRight: 10, color: '#A0A1B4' }}></Icon>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={queryInfo?.mainGraph}
          className="cardHeaderImage"
        ></Image>
        <Icon name="rect-right" size="20" style={{ marginLeft: 10 }}></Icon>
      </View>
      <View className="cardImages">
        {queryInfo?.skuImages?.map((item, idx) => (
          <Image
            key={idx}
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={item}
            className="cardImagesItem"
          />
        ))}
        {/* <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="cardImagesItem"
          />
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="cardImagesItem"
          />
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="cardImagesItem"
          />
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="cardImagesItem"
          /> */}
        <View className="cardImagesTextBox">
          <Text className="cardImagesText"> 1/7</Text>
        </View>
      </View>
    </View>
  );
};
export default Index;
