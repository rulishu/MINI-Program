import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { data } from './item';
import { Avatar, Button } from '@nutui/nutui-react-taro';
import editIcon from '../../assets/images/edit.svg';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  // 添加
  const add = () => {
    Taro.navigateTo({ url: '/pages/addAddress/index' });
  };
  return (
    <View>
      <View className="address">
        {data.map((item, index) => {
          return (
            <View key={index} className="address-item">
              <View className="address-item-left">
                <View>
                  <Avatar bgColor="#B08B57">
                    <Text className="address-item-left-avatar-text">{item.name.at(0)}</Text>
                  </Avatar>
                </View>
                <View className="address-item-left-info">
                  <View className="address-item-left-info-top">
                    <View style={{ marginRight: 8 }}>
                      <Text>{item.name}</Text>
                    </View>
                    <View>
                      <Text>{item.phone}</Text>
                    </View>
                  </View>
                  <View className="address-item-left-info-bottom">
                    <Text>{item.address}</Text>
                  </View>
                </View>
              </View>
              <View className="address-item-right">
                <Image mode="widthFix" src={editIcon} style={{ width: 24, height: 24 }}></Image>
              </View>
            </View>
          );
        })}
      </View>
      <View className="add-address">
        <Button size="small" color="#B08B57" className="add-address-btn" onTap={() => add()}>
          <Text className="add-address-btn-text">添加收货地址</Text>
        </Button>
      </View>
    </View>
  );
};
export default Index;
