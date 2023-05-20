import React from 'react';
import { Button } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import Foots from './foots';
import './index.scss';

const Index = () => {
  return (
    <View className="pay-success">
      <View className="card">
        <View className="card-image">
          <Image
            mode="widthFix"
            // eslint-disable-next-line global-require
            src={require('@/assets/images/success.svg')}
            style={{ width: 42, height: 42 }}
          ></Image>
        </View>
        <View className="card-price">
          <Text>￥4467.00</Text>
        </View>
        <View className="card-company">
          <Text>向 融辉有限公司 付款</Text>
        </View>
        <View className="card-button">
          <View style={{ width: '40%' }}>
            <Button plain className="footer-top-btn" shape="square" type="primary">
              联系客服
            </Button>
          </View>
          <View style={{ width: '40%' }}>
            <Button className="footer-top-btn order" type="primary" shape="square">
              查看订单
            </Button>
          </View>
        </View>
      </View>
      <View>
        <Foots />
      </View>
    </View>
  );
};
export default Index;
