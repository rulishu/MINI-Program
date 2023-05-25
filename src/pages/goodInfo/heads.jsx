import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
// import { Icon, } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import NavBar from '../../component/navBar';
import searchLeft from '@/assets/images/searchLeft.svg';
import './index.scss';
// import { useDispatch } from 'react-redux';

const Index = () => {
  const [searchWidths, setsearchWidths] = useState(0); // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
  useEffect(() => {
    let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const { width, right } = menuButtonInfo;
    wx.getSystemInfo({
      success: () => {
        const searchWidth = right - width; // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
        setsearchWidths(searchWidth);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View className="heads">
      <View className="title">
        <NavBar
          background="#fff"
          color="#fff"
          renderCenter={
            <View className="heads" style={{ width: searchWidths }}>
              <View style={{ width: '10%' }} onClick={() => Taro.navigateBack({ delta: 1 })}>
                <Image mode="widthFix" src={searchLeft} style={{ width: 24, height: 24 }}></Image>
              </View>
              <View className="header-search-input" style={{ width: '50%' }}>
                <Text className="titleText">奋斗之露 · 喜庆</Text>
              </View>
              <View className="detailIcon" style={{ width: '40%' }}>
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src={require('@/assets/images/share.png')}
                  className="detailIconOne"
                ></Image>
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src={require('@/assets/images/message.png')}
                  className="detailIconTwo"
                ></Image>
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src={require('@/assets/images/shop.png')}
                  className="detailIconThird"
                ></Image>
              </View>
            </View>
          }
        />
        {/* <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/left.png')}
          className="headsTitleImages"
          onClick={() => Taro.navigateBack({ delta: 1 })}
        ></Image>
        <View>
          <Text className="titleText">奋斗之露 · 喜庆</Text>
        </View>
      </View>
      <View className="detailIcon">
        */}
      </View>
    </View>
  );
};
export default Index;
