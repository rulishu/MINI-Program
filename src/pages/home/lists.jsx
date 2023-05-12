import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.scss';

const Lists = () => {
  return (
    <View className="list">
      <View className="list1">
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home6.png')}
          className="page-homes-list1-image"
        ></Image>
      </View>
      <View className="list2">
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home5.png')}
          className="page-homes-list2-image"
        ></Image>
        <Text className="text">米面粮油</Text>
      </View>
      <View className="list3">
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/home5.png')}
          className="page-homes-list2-image"
        ></Image>
        <Text className="text">米面粮油</Text>
      </View>
    </View>
  );
};
export default Lists;
