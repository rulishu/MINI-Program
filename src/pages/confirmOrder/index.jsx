import React from 'react';
import { Icon, Button } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import { list, list1 } from './item';
import Taro from '@tarojs/taro';
import order2 from '@/assets/images/order2.svg';
import order3 from '@/assets/images/order3.svg';

import './index.scss';

const Index = () => {
  const onPay = () => {
    Taro.navigateTo({ url: '/pages/paySuccess/index' });
  };
  return (
    <View className="confirm">
      <View className="confirm-order">
        <View className="goods-info">
          <View className="card-title-goods">
            <Text>奋斗之露·厚德载物</Text>
          </View>
          <View className="goods-info-head">
            <View className="goods-info-head-left">
              <View className="goods-info-head-img">
                {/* eslint-disable-next-line global-require */}
                <Image
                  mode="widthFix"
                  src={require('@/assets/images/home4.png')}
                  style={{ width: 82, height: 108 }}
                ></Image>
              </View>
              <View className="goods-info-head-info">
                <View className="goods-info-head-info-title">
                  <Text>奋斗之露</Text>
                </View>
                <View className="goods-info-head-info-doc">
                  <Text>53度酱型白酒 </Text>
                </View>
              </View>
            </View>
            <View className="goods-info-head-right">
              <View className="goods-info-head-right-price">
                <Text>￥1890.00</Text>
              </View>
              <View className="goods-info-head-right-num">
                <Text>x1</Text>
              </View>
            </View>
          </View>
          <View className="address">
            <View>
              <Icon name="locationg3" size="18" style={{ marginRight: 8 }} />
            </View>
            <View className="address-info">
              <Text>[收货地址] 浙江省杭州市滨江区 长河街道 春波路春波小区13幢1单元701室</Text>
            </View>
          </View>
          <View className="address-price">
            <Text>快递￥10.00</Text>
          </View>
          <View className="card-list">
            {list1.map((item, index) => {
              return (
                <View key={index} className="card-list-item">
                  <View className="card-list-item-left">
                    <View>
                      <Image
                        mode="widthFix"
                        src={item.icon}
                        style={{ width: 13, height: 13 }}
                      ></Image>
                    </View>
                    <View className="card-list-item-left-title">
                      <Text>{item.title}</Text>
                    </View>
                  </View>
                  <View
                    className={
                      item.isPrice === false ? 'card-list-item-right2' : 'card-list-item-right'
                    }
                  >
                    <Text>{item.price}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View className="amount-details">
          <View className="card-title">
            <Text>金额明细</Text>
          </View>
          <View className="card-list">
            {list.map((item, index) => {
              return (
                <View key={index} className="card-list-item">
                  <View className="card-list-item-left">
                    <View style={{ width: 13, height: 13 }}>
                      {item.isICon === false ? (
                        ''
                      ) : (
                        <Image
                          mode="widthFix"
                          src={item.icon}
                          style={{ width: 13, height: 13 }}
                        ></Image>
                      )}
                    </View>
                    <View className="card-list-item-left-title">
                      <Text>{item.title}</Text>
                    </View>
                  </View>
                  <View className="card-list-item-right">
                    <Text>{item.price}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View className="footer-height"></View>
      <View className="footer">
        <View className="footer-conter">
          <View className="footer-top">
            <View style={{ width: '48%' }}>
              <Button className="footer-top-btn" shape="square" icon={order3}>
                <Text style={{ color: '#A85230' }}>联系客服</Text>
              </Button>
            </View>
            <View style={{ width: '48%' }}>
              <Button className="footer-top-btn" shape="square" icon={order2}>
                <Text style={{ color: '#A85230' }}>收藏</Text>
              </Button>
            </View>
          </View>
          <View>
            <Button
              className="footer-bottom"
              onClick={() => {
                onPay();
              }}
            >
              <Text style={{ fontSize: 15, lineHeight: 24 }}>确认订单</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
