import React, { useState } from 'react';
import { Input, Button, Avatar } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

const Index = () => {
  const [avatar, setAvatar] = useState('');
  const onChooseavatar = (e) => {
    let { avatarUrl } = e.detail;
    setAvatar(avatarUrl);
  };

  return (
    <View>
      <View className="head-photo">
        <View className="head-tex">
          <Text className="head-text">头像</Text>
        </View>
        <View>
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
                style={{ width: 30, height: 30, background: '#fff' }}
                class="avatar"
                src={avatar}
              />
            )}
          </Button>
        </View>
      </View>
      <Input label="昵称" type="nickname" placeholder="请输入昵称" inputAlign="right" />
      <Text className="foot">昵称2-32个字符，一个汉字为2个字符</Text>
      <View className="foot-btn">
        <Button block color="#B08B57">
          确认
        </Button>
      </View>
    </View>
  );
};
export default Index;
