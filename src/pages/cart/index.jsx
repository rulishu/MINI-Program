import React, { useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Swipe, Cell, Button, Checkbox } from '@nutui/nutui-react-taro';
import './index.scss';

const Index = () => {
  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = useState(true);
  return (
    <View className="index">
      {/* 地址 */}
      <View className="cartHeader">
        <Image
          mode="widthFix"
          // eslint-disable-next-line global-require
          src={require('@/assets/images/map.png')}
          className="cartHeaderMap"
        ></Image>
        <Text className="cartHeaderText">
          浙江省杭州市滨江区 长河街道 春波路 春波小区13幢1单元701室
        </Text>
      </View>

      {/* 商品信息 */}
      <Swipe
        rightAction={
          <>
            <Button shape="square" type="primary" className="swipeButtonBorderLeft">
              分享
            </Button>
            <Button shape="square" type="danger" className="swipeButtonBorderRight">
              删除
            </Button>
          </>
        }
      >
        <View className="swipeCell">
          <Cell className="swipeCellBorder">
            <View className="cartCardWrap">
              <Text className="cartCardText">奋斗之露,厚德载物</Text>
              <View className="cartCard">
                <Image
                  mode="widthFix"
                  // eslint-disable-next-line global-require
                  src={require('@/assets/images/home5.png')}
                  className="cartCardLeft"
                ></Image>
                <View className="cartCardRight">
                  <Text className="cartCardRightContent">20年佳酿 53度酱香型白酒</Text>
                  <Text className="cartCardRightContent"> 满1500减100 </Text>
                  <Text className="cartCardRightContent"> ¥ 1890.00 </Text>
                  <Text className="cartCardRightContent"> ➖ 01 ➕ </Text>
                </View>
              </View>
            </View>
          </Cell>
        </View>
      </Swipe>

      {/* 领劵结算 */}
      <View className="foot">
        <View className="cartFooter">
          <View className="cartFooterCheck">
            <Checkbox textPosition="left" label="复选框" checked={checked} />
            <Text>已选中1件,卷后合计¥1790</Text>
          </View>
          <Button type="primary" shape="square" style={{ borderRadius: 8 }}>
            领劵结算
          </Button>
        </View>
      </View>
    </View>
  );
};
export default Index;
