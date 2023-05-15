import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import { useDispatch } from 'react-redux';
import './index.scss';

const WeAppy = () => {
  const dispatch = useDispatch();

  const onGetphonenumber = (event) => {
    try {
      const detail = event.detail || {};
      if (detail.errMsg === 'getPhoneNumber:ok') {
        Taro.login({
          success: async (res) => {
            if (res.code) {
              dispatch({
                type: 'global/getPhone',
                payload: {
                  jsCode: res.code,
                  encryptedData: detail.encryptedData,
                  iv: detail.iv,
                },
              });
            } else {
              Taro.showToast({
                title: '登录失败！',
                icon: 'none',
                duration: 2000,
              });
            }
          },
        });
      } else {
        Taro.showToast({
          title: '获取手机号失败！',
          icon: 'none',
          duration: 2000,
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err);
    }
  };

  return (
    <View className="btn-container">
      <Button type="primary" block open-type="getPhoneNumber" onGetphonenumber={onGetphonenumber}>
        手机号授权
      </Button>
      <View className="onload-footer">
        <View>
          登录即代表您同意
          <Text style={{ color: '#A05635' }}>《服务条款》</Text>和
        </View>
        <View>
          <Text style={{ color: '#A05635' }}>《流隐私政策》</Text>
        </View>
      </View>
    </View>
  );
};
export default WeAppy;
