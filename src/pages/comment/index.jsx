import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

const Index = () => {
  const list = [
    {
      id: 1,
      image: '',
      name: 'Miracle-',
      time: '2023.06.02',
      from: '四川',
      content: '东西真的很不错，吃起来的时候一点都不输外面餐厅卖的大几百的，就是借款还款计划空间',
      imageList: [{ image: '' }, { image: '' }, { image: '' }, { image: '' }],
    },
    {
      id: 1,
      image: '',
      name: 'Miracle-',
      time: '2023.06.02',
      from: '四川',
      content: '东西真的很不错，吃起来的时候一点都不输外面餐厅卖的大几百的，就是借款还款计划空间',
      imageList: [{ image: '' }],
    },
    {
      id: 1,
      image: '',
      name: 'Miracle-',
      time: '2023.06.02',
      from: '四川',
      content: '东西真的很不错，吃起来的时候一点都不输外面餐厅卖的大几百的，就是借款还款计划空间',
    },
  ];
  return (
    <View>
      {list?.map((item) => {
        return (
          <View className="commentBorderBox" key={item?.id}>
            <View className="commentBorderBox-header">
              <View className="commentBorderBox-header-box">
                <View className="commentBorderBox-header-image">
                  <Image mode="widthFix" className="commentBorderBox-header-image"></Image>
                </View>
                <View className="commentBorderBox-header-text">Miracle-</View>
              </View>
              <View className="commentBorderBox-header-title">
                <Text className="commentBorderBox-header-title1">2023.06.02</Text>
                <Text className="commentBorderBox-header-title2">来自四川</Text>
              </View>
            </View>
            <View className="commentBorderBox-content">
              东西真的很不错，吃起来的时候一点都不输外面餐厅卖的大几百的，就是借款还款计划空间,就是借款还款计划空间,就是借款还款计划空间,就是借款还款计划空间,就是借款还款计划空间
            </View>
            <View className="commentBorderBox-ImageBox">
              {item?.imageList?.map((ima) => {
                return (
                  <View className="commentBorderBox-ImageItem" key={ima}>
                    <Image mode="widthFix" className="commentBorderBox-ImageItem"></Image>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};
export default Index;
