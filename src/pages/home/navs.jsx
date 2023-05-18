import React from 'react';
import { View, Text } from '@tarojs/components'; //Image
import Taro from '@tarojs/taro';
import './index.scss';

const Navs = () => {
  return (
    <View
      className="nav"
      onTap={() => {
        Taro.navigateTo({ url: '/pages/goodInfo/index' });
      }}
    >
      {/* <View>
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home1.png')}
          className="page-homes-nav-image"
        ></Image>
      </View>
      <View className="nav-right">
        <View>
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/home2.png')}
            className="page-homes-nav-right-image"
          ></Image>
        </View>
        <View className="nav-right-bottom">
          <View>
            <Image
              mode="widthFix"
              // eslint-disable-next-line global-require
              src={require('@/assets/images/home4.png')}
              className="page-homes-nav-right-bottom-image"
            ></Image>
          </View>
          <View>
            <Image
              mode="widthFix"
              // eslint-disable-next-line global-require
              src={require('@/assets/images/home3.png')}
              className="page-homes-nav-right-bottom-image"
            ></Image>
          </View>
        </View>
      </View> */}
      <View class="nav-item">
        <Text>限时抢购</Text>
      </View>
    </View>
  );
};
export default Navs;
