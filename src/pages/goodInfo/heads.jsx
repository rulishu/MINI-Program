import React, { useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
// import { Icon, } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import './index.scss';
import { useDispatch } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'goodInfo/infoDetails',
      payload: {
        id: 160,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View className="heads">
      <View className="title">
        <Image
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
  );
};
export default Index;
