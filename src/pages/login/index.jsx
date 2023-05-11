import React from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import log from '@/assets/images/favicon.png';
import './index.scss';
import WeAppy from './weappy';

const Login = () => {
  const weappySys = Taro.getEnv() === 'WEAPP';

  return (
    <View class="onLand-container">
      <View class="onLand-container-top">
        <Image class="onLand-container-top-img" src={log} />
      </View>
      <View className="onLand-container-center">{weappySys && <WeAppy />}</View>
    </View>
  );
};
export default Login;
