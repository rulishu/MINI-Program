import React, { useState, useEffect } from 'react';
import { Input, Button, Avatar } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const userInfo = Taro.getStorageSync('userInfo');
  const { userInfos } = useSelector((state) => state.my);
  useEffect(() => {
    const token = Taro.getStorageSync('token');
    if (token !== '') {
      dispatch({
        type: 'my/getUserInfos',
        payload: {
          id: userInfo.id,
        },
      });
    }
    // eslint-disable-next-line global-require
  }, []);
  const [avatar, setAvatar] = useState(userInfos.headUrl);
  const [nickname, setNickname] = useState(userInfos.nickName);

  // 获取头像
  const onChooseavatar = (e) => {
    let { avatarUrl } = e.detail;
    setAvatar(avatarUrl);
  };

  // 提交
  const onOk = async () => {
    await dispatch({
      type: 'my/editUserInfo',
      payload: {
        id: userInfo.id,
        headUrl: avatar,
        nickName: nickname,
      },
    });
    wx.navigateBack({
      delta: 1,
    });
    await dispatch({
      type: 'my/getUserInfos',
      payload: {
        id: userInfo.id,
      },
    });
  };

  return (
    <View>
      <Input
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        label="头像"
        placeholder=" "
        clearable
        readonly
        inputAlign="right"
        slotButton={
          <Button
            size="small"
            open-type="chooseAvatar"
            className="foot-btn-size"
            onChooseAvatar={(e) => onChooseavatar(e)}
          >
            {avatar === '' ? (
              <Avatar icon="my" class="avatar" iconSize="16" bgColor="#fff" />
            ) : (
              <Image
                style={{ width: 24, height: 24, background: '#fff' }}
                class="avatar"
                src={avatar}
              />
            )}
          </Button>
        }
      />
      <Input
        label="昵称"
        type="nickname"
        placeholder="请输入昵称"
        defaultValue={nickname}
        inputAlign="right"
        onChange={(val) => {
          setNickname(val);
        }}
      />
      <Text className="foot">昵称2-32个字符，一个汉字为2个字符</Text>
      <View className="foot-btn">
        <Button block color="#B08B57" onClick={() => onOk()}>
          确认
        </Button>
      </View>
    </View>
  );
};
export default Index;
