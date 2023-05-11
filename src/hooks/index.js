import { useState } from 'react';
import Taro from '@tarojs/taro';

export const useGetUserInfo = ({ success, fail }) => {
  const [loading, setLoading] = useState(false);

  const get = () => {
    Taro.showLoading({
      title: '获取用户信息',
      mask: true,
    });
    setLoading(true);
    Taro.getUserProfile({
      lang: 'zh_CN',
      desc: '获取你的昵称、头像、地区及性别',
      success: (response) => {
        Taro.hideLoading();
        setLoading(false);
        if (response.errMsg === 'getUserProfile:ok') {
          success(response);
        }
      },
      fail: () => {
        Taro.hideLoading();
        fail();
      },
    });
  };
  return {
    get,
    loading,
  };
};

export const useLogin = ({ success, fail }) => {
  const [loading, setLoading] = useState(false);

  const login = () => {
    Taro.showLoading({
      title: '正在登录',
      mask: true,
    });
    setLoading(true);
    Taro.login({
      success: (res) => {
        if (res.errMsg === 'login:ok') {
          Taro.hideLoading();
          setLoading(false);
          success(res);
        }
      },
      fail: (error) => {
        fail(error);
      },
    });
  };
  return {
    login,
    loading,
  };
};
