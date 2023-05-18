import React from 'react';
import { View, Text } from '@tarojs/components';
import { Price, Icon, Button } from '@nutui/nutui-react-taro';
// import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  return (
    <View>
      <View
        style={{ paddingTop: 28, paddingLeft: 20, backgroundColor: '#ffffff', paddingBottom: 32 }}
      >
        <View className="contentTextOne">
          <Text>奋斗之露·喜庆·5年佳酿</Text>
        </View>
        <View className="contentTextTwo">
          <Text>53度酱香型白酒 </Text>
        </View>
        <View className="contentTextThrid">
          <Text>500ml*6瓶/箱</Text>
          <Price price={1890} size="normal" needSymbol thousands style={{ marginRight: 26 }} />
        </View>
      </View>

      <View style={{ height: 367 }}>
        <View className="contentFooter">
          <View style={{ paddingLeft: 20, backgroundColor: '#F7F7F7' }}>
            <Text className="contentFooterOne">规格</Text>
            <Text className="contentFooterTwo">请选择商品规格</Text>
          </View>
          <View>
            <Icon name="rect-right" size="10" style={{ marginRight: 30 }}></Icon>
          </View>
        </View>

        <View className="contentDetail">
          <View className="contentDetailBox">
            <Text className="contentDetailText">商品详情</Text>
          </View>
          <View className="contentDetailImage">111</View>
        </View>
      </View>

      <View className="contentButton">
        <Button className="contentButtonOne" size="normal">
          <Text style={{ fontSize: 15, lineHeight: 24 }}> + </Text>
        </Button>
        <Button type="primary" className="contentButtonTwo">
          <Text style={{ fontSize: 15, lineHeight: 24 }}>立即购买</Text>
        </Button>
      </View>
    </View>
  );
};
export default Index;
