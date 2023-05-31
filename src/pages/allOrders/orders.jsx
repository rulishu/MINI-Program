import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Button, Tag, Divider, Popup } from '@nutui/nutui-react-taro';
import { orderList } from './item';
import './index.scss';

const Index = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  useEffect(() => {}, []);
  return (
    <View className="order">
      <View className="order-content">
        {orderList.map((item) => (
          <View key={item.id} className="order-item">
            <View className="order-item-top">
              <View>
                <Text>订单编号：{item.time}</Text>
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
              <View className="order-item-middle-right">
                <View className="order-item-middle-right-num">
                  <Text>x{item.num}</Text>
                </View>
              </View>
            </View>
            <View style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 15 }}>
              实付款： ￥{item.price}
            </View>
            <Divider styles={{ color: 'rgb(170, 170, 170)' }} />
            <View className="order-item-bottom">
              {/* <Button shape="square" className="bottom-btn" plain size="small" type="default">
                查看物流
              </Button> */}
              <Button shape="square" className="bottom-btn" plain size="small" type="default">
                删除订单
              </Button>
              <Button shape="square" className="bottom-btn" size="small" type="danger">
                立即支付 14.59
              </Button>
              <Button
                shape="square"
                className="bottom-btn"
                size="small"
                type="info"
                onClick={() => {
                  setIsConfirm(true);
                }}
              >
                确认收货
              </Button>
            </View>
          </View>
        ))}
      </View>
      <Popup
        visible={isConfirm}
        className="order_pop"
        position="bottom"
        onClose={() => {
          setIsConfirm(false);
        }}
      >
        <View className="pop_view">
          <View className="pop_title">确认收货</View>
          <View>
            <Image mode="aspectFit" className="pop_img"></Image>
          </View>
          <View className="pop_text_view">
            <Text>为保证你的售后权益，请收到商品确</Text>
            <Text>认无误后再确认收货</Text>
          </View>
          <View className="pop_btn">
            <Button shape="square" size="large" type="info">
              确定
            </Button>
          </View>
        </View>
      </Popup>
    </View>
  );
};
export default Index;
