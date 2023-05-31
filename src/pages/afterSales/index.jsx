import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Button, Tag, Divider } from '@nutui/nutui-react-taro';
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
                <Text>售后单号:{item.time}</Text>
                <Tag
                  style={{ marginLeft: '5px' }}
                  color="#E9E9E9"
                  textColor="#999999"
                  onClick={() => {
                    wx.setClipboardData({
                      data: item.time,
                    });
                  }}
                >
                  复制
                </Tag>
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
                  <Text
                    className="order-item-middle-left-name-text"
                    style={{ width: '80%', fontSize: 15 }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className="order-item-middle-left-name-text"
                    style={{ width: '50%', fontSize: 10 }}
                  >
                    规格值,规格值
                  </Text>
                  <Tag style={{ width: 25 }} color="rgb(170, 170, 170)">
                    自营
                  </Tag>
                </View>
              </View>
            </View>
            <View className="order-item-bold">
              <View>状态: {item.state}</View>
              <View>退款金额:￥{item.price}</View>
            </View>

            <Divider styles={{ color: 'rgb(170, 170, 170)' }} />
            <View className="order-item-bottom">
              <Button shape="square" className="bottom-btn" plain size="small" type="default">
                取消售后
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Index;
