import React from 'react';
import { View, Image } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
// import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  return (
    <View>
      <View className="cardHeader">
        <Icon name="rect-left" size="20"></Icon>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home8.png')}
          className="cardHeaderImage"
        ></Image>
        <Icon name="rect-right" size="20"></Icon>
      </View>
      <View className="cardImages">
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home8.png')}
          className="cardImagesItem"
        ></Image>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home8.png')}
          className="cardImagesItem"
        ></Image>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home8.png')}
          className="cardImagesItem"
        ></Image>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home8.png')}
          className="cardImagesItem"
        ></Image>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home8.png')}
          className="cardImagesItem"
        ></Image>
        <View className="cardImagesText">1/7</View>
      </View>
    </View>
  );
};
export default Index;
