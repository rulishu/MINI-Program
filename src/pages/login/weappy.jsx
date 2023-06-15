import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const WeAppy = () => {
  const dispatch = useDispatch();
  const { isGetPhone } = useSelector((state) => state.global);

  const login = () => {
    Taro.login({
      success: async (res) => {
        if (res.code) {
          dispatch({
            type: 'global/newLogin',
            payload: {
              jsCode: res.code,
              callBack: (id) => {
                dispatch({
                  type: 'my/getUserInfos',
                  payload: {
                    id: id,
                  },
                });
                dispatch({
                  type: 'my/getOrderNum',
                });
              },
            },
          });
        } else {
          Taro.showToast({
            title: '获取微信信息失败',
            icon: 'none',
            duration: 2000,
          });
        }
      },
    });
  };
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
                  callBack: (id) => {
                    dispatch({
                      type: 'my/getUserInfos',
                      payload: {
                        id: id,
                      },
                    });
                    dispatch({
                      type: 'my/getOrderNum',
                    });
                  },
                },
              });
              // Taro.reLaunch({
              //   url: '',
              //   success() {
              Taro.showToast({
                title: '登录成功！',
                icon: 'success',
                duration: 2000,
              });
              //   },
              // });
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
      {isGetPhone ? (
        <Button type="primary" block open-type="getPhoneNumber" onGetphonenumber={onGetphonenumber}>
          手机号授权
        </Button>
      ) : (
        <Button color="#09bb07" block onClick={login}>
          微信登录
        </Button>
      )}
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
