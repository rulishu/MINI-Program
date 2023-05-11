import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import { useDispatch } from 'react-redux';
import { useGetUserInfo, useLogin } from '@/hooks';
import './index.scss';

const WeAppy = () => {
  const dispatch = useDispatch();

  const { get } = useGetUserInfo({
    success: (response) => {
      dispatch({ type: 'global/update', payload: { userInfo: response.userInfo || {} } });
      Taro.setStorageSync('userInfo', response.userInfo);
      login();
    },
  });

  const { login } = useLogin({
    success: (res) => {
      window.console.log('调用登录接口', res);
    },
  });

  return (
    <View className="btn-container">
      <Button type="primary" block openType="getUserInfo" onClick={() => get()}>
        授权登录
      </Button>
      <View className="onload-footer">
        <View>
          登录即代表您同意
          <Text style={{ color: '#fd8a00' }}>《uiw服务条款》</Text>和
        </View>
        <View>
          <Text style={{ color: '#fd8a00' }}>《uiw流隐私政策》</Text>
        </View>
      </View>
    </View>
  );
};
export default WeAppy;
