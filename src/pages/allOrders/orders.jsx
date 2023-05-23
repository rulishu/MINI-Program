import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import { orderList } from './item';
import './index.scss';

const Index = () => {
  return (
    <View className="order">
      <View className="order-content">
        {orderList.map((item) => (
          <View key={item.id} className="order-item">
            <View className="order-item-top">
              <View>
                <Text>{item.time}</Text>
              </View>
              <View>
                <Text>{item.type}</Text>
              </View>
            </View>
            <View className="order-item-middle">
              <View className="order-item-middle-left">
                <View className="order-item-middle-left-img">
                  <Image
                    mode="widthFix"
                    className="order-img"
                    // eslint-disable-next-line global-require
                    src={require('@/assets/images/home8.png')}
                  ></Image>
                </View>
                <View className="order-item-middle-left-name">
                  <Text>{item.title}</Text>
                </View>
              </View>
              <View className="order-item-middle-right">
                <View>
                  <Text>¥{item.price}</Text>
                </View>
                <View className="order-item-middle-right-num">
                  <Text>共{item.num}件</Text>
                </View>
              </View>
            </View>
            <View className="order-item-bottom">
              <Button className="bottom-btn" plain size="small" type="default">
                查看发票
              </Button>
              <Button className="bottom-btn" plain size="small" type="default">
                退换/售后
              </Button>
              <Button className="bottom-btn" plain size="small" type="danger">
                再次购买
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Index;
