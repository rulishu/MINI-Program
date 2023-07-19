import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Image } from '@nutui/nutui-react-taro';
import log from '@/assets/images/logo.png';
import WeAppy from './weappy';
import './index.scss';

const Login = () => {
  const weappySys = Taro.getEnv() === 'WEAPP';
  const params = Taro.getCurrentInstance().router.params;
  if (params?.scene?.split('%')[1]) {
    Taro.setStorageSync('invitationCode', params.scene.split('%')[1]);
  }
  return (
    <View class="onLand-container">
      <View class="onLand-container-top">
        <Image width="300px" height="100px" src={log} />
      </View>
      <View className="onLand-container-center">{weappySys && <WeAppy />}</View>
    </View>
  );
};
export default Login;
