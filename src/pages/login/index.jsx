import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Image } from '@nutui/nutui-react-taro';
import log from '@/assets/images/logo.png';
import WeAppy from './weappy';
import './index.scss';

const Login = () => {
  const weappySys = Taro.getEnv() === 'WEAPP';

  return (
    <View class="onLand-container">
      <View class="onLand-container-top">
        <Image width="150" height="80" src={log} />
      </View>
      {/* <View>
        <Text className="onLand-app-name">圆满通运</Text>
      </View> */}
      <View className="onLand-container-center">{weappySys && <WeAppy />}</View>
    </View>
  );
};
export default Login;
