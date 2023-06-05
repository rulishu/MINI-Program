import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Button, Tag, Divider, Popup, Empty } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
// import { useCountDown } from 'ahooks';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [isConfirm, setIsConfirm] = useState(false);
  const { orderList, orderActive } = useSelector((state) => state.allOrders);
  const orderState = (num) => {
    if (num === 0) {
      return '待定价';
    }
    if (num === 1) {
      return '待付款';
    }
    if (num === 2) {
      return '待发货';
    }
    if (num === 3) {
      return '待收货';
    }
    if (num === 4) {
      return '已完成';
    }
    if (num === -2) {
      return '已取消';
    }
    if (num === 6) {
      return '已退款';
    }
    if (num === 7) {
      return '待评价';
    }
  };

  const goOrderDetails = async (status) => {
    await dispatch({
      type: 'orderDetails/update',
      payload: {
        orderStatus: status,
      },
    });
    Taro.navigateTo({ url: '/pages/orderDetails/index' });
  };

  return (
    <View className="order">
      <View className="order-content">
        {orderList.length !== 0 ? (
          orderList.map((item) => (
            <>
              <View key={item.id} className="order-item">
                <View onClick={() => goOrderDetails(item.orderStatus)}>
                  <View className="order-item-top">
                    <View>
                      <Text>订单编号：{item.orderNumber}</Text>
                    </View>
                    <View>
                      <Text>{orderState(item.orderStatus)}</Text>
                    </View>
                  </View>
                  {item.items.map((goodsItem) => (
                    <View key={goodsItem.id} className="order-item-middle">
                      <View className="order-item-middle-left">
                        <View className="order-item-middle-left-img">
                          <Image
                            mode="scaleToFill"
                            className="order-img"
                            // eslint-disable-next-line global-require
                            src={goodsItem.mainGraph}
                          ></Image>
                        </View>
                        <View className="order-item-middle-left-name">
                          <Text
                            className="order-item-middle-left-name-text"
                            style={{ width: '80%', fontSize: 15 }}
                          >
                            {goodsItem.itemName}
                          </Text>
                          <Text
                            className="order-item-middle-left-name-text"
                            style={{ width: '70%', fontSize: 10 }}
                          >
                            {goodsItem.attributes.map((attributeItem) => {
                              let str = `${attributeItem.attributeName}:${attributeItem.value}`;
                              return str;
                            })}
                          </Text>
                          <Tag style={{ width: 25 }} color="rgb(170, 170, 170)">
                            自营
                          </Tag>
                        </View>
                      </View>
                      <View className="order-item-middle-right">
                        <View className="order-item-middle-right-num">
                          <Text>x{goodsItem.amount}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                  <View style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 15 }}>
                    实付款： ￥{item.payPrice}
                  </View>
                </View>
                <Divider styles={{ color: 'rgb(170, 170, 170)' }} />
                <View className="order-item-bottom">
                  {item.orderStatus === 3 && (
                    <Button shape="square" className="bottom-btn" plain size="small" type="default">
                      查看物流
                    </Button>
                  )}
                  {(item.orderStatus !== 1 || item.orderStatus !== 2 || item.orderStatus !== 3) && (
                    <Button
                      shape="square"
                      className="bottom-btn"
                      plain
                      size="small"
                      type="default"
                      onClick={() => {
                        Taro.showModal({
                          title: '提示',
                          content: '确定要删除订单吗？',
                          success: function (res) {
                            if (res.confirm) {
                              dispatch({
                                type: 'allOrders/deleteOrder',
                                payload: {
                                  id: item.id,
                                  callBack: () => {
                                    let orderStatus;
                                    if (orderActive === '1') {
                                      orderStatus = 1;
                                    }
                                    if (orderActive === '2') {
                                      orderStatus = 2;
                                    }
                                    if (orderActive === '3') {
                                      orderStatus = 3;
                                    }
                                    if (orderActive === '4') {
                                      orderStatus = 7;
                                    }
                                    dispatch({
                                      type: 'allOrders/getAllOrders',
                                      payload: {
                                        pageNum: 1,
                                        pageSize: 10,
                                        orderStatus,
                                      },
                                    });
                                  },
                                },
                              });
                            }
                          },
                        });
                      }}
                    >
                      删除订单
                    </Button>
                  )}
                  {item.orderStatus === 1 && (
                    <Button shape="square" className="bottom-btn-pay" size="small" type="danger">
                      <View style={{ display: 'flex' }}>立即支付 14:59</View>
                    </Button>
                  )}
                  {item.orderStatus === 3 && (
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
                  )}
                </View>
              </View>
            </>
          ))
        ) : (
          <Empty style={{ background: 'F5F5F5' }} description="无数据" />
        )}
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
