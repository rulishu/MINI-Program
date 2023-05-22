/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Swipe, Cell, Button, Checkbox, Price, InputNumber, Empty } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { shoppingList } = useSelector((state) => state.cart);
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    dispatch({
      type: 'cart/goodsAll',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (data) => {
    setAmount(data?.goodsAmount);
    setPrice(data?.totalPrice);
  };
  const onChange = (check) => {
    if (check === true) {
      setChecked(true);
    }
    if (check === false) {
      setChecked(false);
    }
  };
  let shoppingItem = shoppingList.flat();
  return (
    <View className="index">
      {/* 地址 */}
      {shoppingList.length > 0 ? (
        <View style={{ paddingBottom: 190 }}>
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
          {shoppingItem.map((itm) => {
            return (
              <>
                <Swipe
                  rightAction={
                    <>
                      <Button shape="square" className="swipeButtonBorderLeft">
                        分享
                      </Button>
                      <Button
                        shape="square"
                        type="danger"
                        className="swipeButtonBorderRight"
                        onClick={() => {
                          dispatch({
                            type: 'cart/deleteGood',
                            payload: {
                              id: itm?.id,
                            },
                          });
                        }}
                      >
                        删除
                      </Button>
                    </>
                  }
                >
                  <View className="swipeCell">
                    <Cell className="swipeCellBorder">
                      <View style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text className="cartCardText">奋斗之露,厚德载物</Text>
                        <Checkbox checked={checked} onChange={() => handleChange(itm)} />
                      </View>
                      <View className="cartCard">
                        <Image
                          mode="widthFix"
                          // eslint-disable-next-line global-require
                          src={itm?.mainGraph}
                          className="cartCardLeft"
                        ></Image>
                        <View className="cartCardRight">
                          <Text className="cartCardRightTitle">{itm?.goodsName}</Text>
                          <Text className="cartCardRightContent">{itm?.goodsSpecification} </Text>
                          <Price
                            className="cartCardRightPrice"
                            price={itm?.goodsUnitPrice}
                            size="normal"
                            needSymbol
                            thousands
                          />
                          <InputNumber className="cartCardRightAdd" modelValue={itm?.goodsAmount} />
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
                        checked={false}
                        onChange={onChange}
                      />
                      <View>
                        <Text className="cartFooterText">已选中{amount}件,卷后合计:</Text>
                        <Price
                          price={price}
                          size="normal"
                          needSymbol
                          thousands
                          style={{ color: '#0D0F23' }}
                        />
                      </View>
                    </View>
                    <Button
                      className="cartFooterButton"
                      shape="square"
                      style={{ borderRadius: 12 }}
                    >
                      领劵结算
                    </Button>
                  </View>
                </View>
              </>
            );
          })}
        </View>
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
