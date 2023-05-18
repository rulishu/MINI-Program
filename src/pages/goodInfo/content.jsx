import React from 'react';
import { View, Text } from '@tarojs/components';
import { Price, Icon, Button } from '@nutui/nutui-react-taro';
// import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  return (
    <View>
      <View className="contentText">
        <View className="contentTextOne">
          <Text>奋斗之露·喜庆·5年佳酿</Text>
        </View>
        <View className="contentTextTwo">
          <Text>53度酱香型白酒 </Text>
        </View>
        <View className="contentTextThrid">
          <Text>500ml*6瓶/箱</Text>
          <Price className="cartCardRightPrice" price={1890} size="normal" needSymbol thousands />
        </View>
      </View>

      <View className="contentFooter">
        <View className="contentFooterText">
          <Text className="contentFooterOne">规格</Text>
          <Text className="contentFooterTwo">请选择商品规格</Text>
        </View>
        <View>
          <Icon name="rect-right" size="10"></Icon>
        </View>
      </View>

      <View className="contentDetail">
        <View className="contentDetailBox">
          <Text className="contentDetailText">商品详情</Text>
        </View>
        <View className="contentDetailImage"></View>
      </View>
      <View className="contentButton">
        <Button className="contentButtonOne" size="normal">
          +
        </Button>
        <Button type="primary" className="contentButtonTwo">
          立即购买
        </Button>
      </View>
    </View>
  );
};
export default Index;
