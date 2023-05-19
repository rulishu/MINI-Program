import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
// import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <View className="cardHeader">
        <Icon name="rect-left" size="20" style={{ marginRight: 10 }}></Icon>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/wine.png')}
          className="cardHeaderImage"
        ></Image>
        <Icon name="rect-right" size="20" style={{ marginLeft: 10 }}></Icon>
      </View>
      <View className="cardImages">
        <View>
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
        </View>
        <View className="cardImagesTextBox">
          <Text className="cardImagesText"> 1/7</Text>
        </View>
      </View>
    </View>
  );
};
export default Index;
