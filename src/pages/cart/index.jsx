/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Swipe, Cell, Button, Checkbox, Price, InputNumber, Empty } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { vipTypeList } = useSelector((state) => state.cart);
  const [checked, setChecked] = useState(true);
  const [inputState, setInputState] = useState({
    val: 1,
  });

  useEffect(() => {
    dispatch({
      type: 'cart/goodsAll',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="index">
      {/* 地址 */}
      {vipTypeList.length > 0 ? (
        <>
          <View className="cartHeader">
            <Image
              mode="widthFix"
              // eslint-disable-next-line global-require
              src={require('@/assets/tabar/map.png')}
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
                <Button shape="square" className="swipeButtonBorderLeft">
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
                <View>
                  <Text className="cartCardText">奋斗之露,厚德载物</Text>
                  <Checkbox textPosition="left" checked={checked} />
                </View>
                <View className="cartCard">
                  <Image
                    mode="widthFix"
                    // eslint-disable-next-line global-require
                    src={require('@/assets/images/home5.png')}
                    className="cartCardLeft"
                  ></Image>
                  <View className="cartCardRight">
                    <Text className="cartCardRightTitle">20年佳酿 53度酱香型白酒</Text>
                    <Text className="cartCardRightContent"> 满1500减100 </Text>
                    <Price
                      className="cartCardRightPrice"
                      price={1890}
                      size="normal"
                      needSymbol
                      thousands
                    />
                    <InputNumber className="cartCardRightAdd" modelValue={inputState.val} />
                  </View>
                </View>
              </Cell>
            </View>
          </Swipe>

          {/* 领劵结算 */}
          <View className="foot">
            <View className="cartFooter">
              <View className="cartFooterCard">
                <Checkbox
                  className="cartFooterCheck"
                  textPosition="right"
                  label="全选"
                  checked={checked}
                />
                <View>
                  <Text className="cartFooterText">已选中1件,卷后合计:</Text>
                  <Price
                    price={1790}
                    size="normal"
                    needSymbol
                    thousands
                    style={{ color: '#0D0F23' }}
                  />
                </View>
              </View>
              <Button className="cartFooterButton" shape="square" style={{ borderRadius: 12 }}>
                领劵结算
              </Button>
            </View>
          </View>
        </>
      ) : (
        <View>
          <Empty className="empty" description="购物车空空如也～">
            <Button
              onClick={() => {
                Taro.switchTab({ url: '/pages/categories/index' });
                dispatch({
                  type: 'global/update',
                  payload: {
                    activeIndex: 1,
                  },
                });
              }}
              size="small"
              type="primary"
              style={{ marginTop: 20 }}
            >
              去逛逛
            </Button>
          </Empty>
        </View>
      )}
    </View>
  );
};
export default Index;
