import React, { useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Avatar, Button } from '@nutui/nutui-react-taro';
import editIcon from '../../assets/images/edit.svg';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { addressList } = useSelector((state) => state.address);
  useEffect(() => {
    const userInfo = Taro.getStorageSync('userInfo');
    dispatch({
      type: 'address/getAddress',
      payload: {
        id: userInfo.id,
      },
    });
    // eslint-disable-next-line global-require
  }, []);
  // 添加
  const add = () => {
    Taro.navigateTo({ url: '/pages/addAddress/index' });
  };

  //编辑
  const edit = async (item) => {
    Taro.navigateTo({ url: '/pages/editAddress/index' });
    await dispatch({
      type: 'address/update',
      payload: {
        reData: item,
      },
    });
  };

  return (
    <View>
      <View className="address">
        {addressList?.map((item, index) => {
          return (
            <View key={index} className="address-item">
              <View className="address-item-left">
                <View>
                  <Avatar bgColor="#B08B57">
                    <Text className="address-item-left-avatar-text">{item.consignee?.at(0)}</Text>
                  </Avatar>
                </View>
                <View className="address-item-left-info">
                  <View className="address-item-left-info-top">
                    <View style={{ marginRight: 8 }}>
                      <Text>{item.consignee}</Text>
                    </View>
                    <View style={{ marginRight: 8 }}>
                      <Text>{item.phone}</Text>
                    </View>
                    {item.isDefault === 1 && (
                      <View className="address-item-left-info-top-mr">
                        <Text className="address-item-left-info-top-mr-text">默认</Text>
                      </View>
                    )}
                  </View>
                  <View className="address-item-left-info-bottom">
                    <Text>{item.province + item.city + item.area}</Text>
                  </View>
                </View>
              </View>
              <View className="address-item-right" onTap={() => edit(item)}>
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
