import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Icon } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  return (
    <View className="headerNav">
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View className="headerNavBox">
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="headerNavItem"
          ></Image>
          <View className="headerNavText">预制菜</View>
        </View>

        <View className="headerNavBox">
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="headerNavItem"
          ></Image>
          <View className="headerNavText">预制菜</View>
        </View>

        <View className="headerNavBox">
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="headerNavItem"
          ></Image>
          <View className="headerNavText">预制菜</View>
        </View>

        <View className="headerNavBox">
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="headerNavItem"
          ></Image>
          <View className="headerNavText">预制菜</View>
        </View>

        <View className="headerNavBox">
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home8.png')}
            className="headerNavItem"
          ></Image>
          <View className="headerNavText">预制菜</View>
        </View>

        <View>
          <View className="headerNavAll">
            <Text>全部</Text>
            <Icon></Icon>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;
