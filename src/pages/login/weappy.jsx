import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, RichText } from '@tarojs/components';
import { Popup } from '@taroify/core';
import { Button, Checkbox } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const WeAppy = () => {
  const invitationCode = Taro.getStorageSync('invitationCode'); //邀请码
  const dispatch = useDispatch();
  const [isAgree, setIsAgree] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isGetPhone, htmlInfo } = useSelector((state) => state.global);
  const login = () => {
    if (isAgree) {
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
    } else {
      Taro.showToast({
        title: '请先同意服务条款及隐私协议',
        icon: 'none',
        duration: 2000,
      });
    }
  };
  const onGetphonenumber = (event) => {
    try {
      const detail = event.detail || {};
      if (detail.errMsg === 'getPhoneNumber:ok') {
        Taro.login({
          success: async (res) => {
            if (res.code) {
              let params = {
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
              };
              if (invitationCode !== '') {
                params = {
                  ...params,
                  invitationCode: invitationCode,
                };
              }
              dispatch({
                type: 'global/getPhone',
                payload: params,
              });
              // Taro.reLaunch({
              //   url: '',
              //   success() {
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

  const getHTML = (type) => {
    dispatch({
      type: 'global/getAgreement',
      payload: type,
    });
    setIsOpen(true);
    Taro.showLoading({ title: '加载中...', mask: true });
  };
  return (
    <View className="btn-container">
      {isGetPhone ? (
        <Button type="primary" block open-type="getPhoneNumber" onGetphonenumber={onGetphonenumber}>
          手机号快捷登录
        </Button>
      ) : (
        <Button color="#09bb07" block onClick={login}>
          一键登录
        </Button>
      )}
      <View className="onload-footer">
        <Checkbox
          checked={isAgree}
          onChange={(state) => {
            setIsAgree(state);
          }}
        />
        <View>
          登录即代表您同意
          <Text
            onClick={() => {
              getHTML(1);
            }}
            style={{ color: '#A05635' }}
          >
            《服务条款》
          </Text>
          和
        </View>
        <View>
          <Text
            onClick={() => {
              getHTML(2);
            }}
            style={{ color: '#A05635' }}
          >
            《流隐私政策》
          </Text>
        </View>
      </View>
      <Popup
        open={isOpen}
        style={{ height: '90%', width: '80%', background: '#FFFFFF' }}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Popup.Close />
        <RichText nodes={htmlInfo} />
      </Popup>
    </View>
  );
};
export default WeAppy;
