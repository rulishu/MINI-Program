import React, { Fragment, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Button, Divider, Popup, Empty } from '@nutui/nutui-react-taro';
import { useSelector, useDispatch } from 'react-redux';
import { useCountDown } from 'ahooks';
import Taro from '@tarojs/taro';
import './index.scss';
import moment from 'moment';

const ListItem = ({ item, keys, orderActive, orderList }) => {
  const { predictEndTime } = item;
  // eslint-disable-next-line no-unused-vars
  const [countdown, formattedRes] = useCountDown({
    // leftTime: 60 * 100,
    leftTime: moment(predictEndTime).valueOf() - moment().valueOf(),
    onEnd: async () => {
      if (keys === orderActive) {
        orderList.filter((orderItem) => {
          if (orderItem.id === item.id) {
            orderItem.orderStatus = -2;
          }
        });
        await dispatch({
          type: 'allOrders/update',
          payload: {
            orderList: orderList,
          },
        });
      }
    },
  });
  const [isConfirm, setIsConfirm] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const { minutes, seconds } = formattedRes;
  const dispatch = useDispatch();
  const goOrderDetails = async (status, info) => {
    await dispatch({
      type: 'orderDetails/update',
      payload: {
        orderStatus: status,
        orderInfo: {},
      },
    });
    await dispatch({
      type: 'orderDetails/selectPrimaryKey',
      payload: {
        id: Number(info.id),
      },
    });
    Taro.navigateTo({ url: '/pages/orderDetails/index' });
  };
  const orderStatusEnum = {
    [0]: '待定价',
    [1]: '待付款',
    [2]: '待发货',
    [3]: '待收货',
    [4]: '已完成',
    [6]: '已退款',
    [7]: '待评价',
    [-2]: '已取消',
  };
  const wxPay = async () => {
    Taro.showLoading({ title: '加载中', mask: true });
    await dispatch({
      type: 'allOrders/wxpay',
      payload: {
        orderNo: item?.orderNumber,
        orderId: item?.id,
        gatewayId: 2,
        gatewayCode: 'WX_PAY',
        gatewayTerminal: 2,
        paymentAmount: item?.orderPrice,
        tradeType: 0,
        callBack: () => refesh(),
      },
    });
  };

  return (
    <Fragment>
      <View className="order-item">
        <View onClick={() => goOrderDetails(item.orderStatus, item)}>
          <View className="order-item-top">
            <View>
              <Text>订单编号：{item.orderNumber}</Text>
            </View>
            <View>
              <Text>{orderStatusEnum[item.orderStatus]}</Text>
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
                      let str = `${attributeItem.attributeName}:${attributeItem.value} `;
                      return str;
                    })}
                  </Text>
                  <View className="order-item-middle-left-name-tag">自营</View>
                </View>
              </View>
              <View className="order-item-middle-right">
                <View className="order-item-middle-right-num">
                  <Text>x{goodsItem.amount}</Text>
                </View>
              </View>
            </View>
          ))}
          <View style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 15, marginBottom: -5 }}>
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
                          callBack: () => refesh(),
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
            <Button
              shape="square"
              className="bottom-btn-pay"
              size="small"
              type="danger"
              onClick={wxPay}
            >
              <View style={{ display: 'flex' }}>
                立即支付 {minutes}:{seconds}
              </View>
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
                setOrderAmount(item.items.reduce((total, obj) => total + obj.amount, 0));
              }}
            >
              确认收货
            </Button>
          )}
        </View>
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
          <View className="pop_img_view">
            <View className="pop_img_text">共{orderAmount}件</View>
            <Image mode="scaleToFill" className="pop_img" src={item.items[0].mainGraph}></Image>
          </View>
          <View className="pop_text_view">
            <Text>为保证你的售后权益，请收到商品确</Text>
            <Text>认无误后再确认收货</Text>
          </View>
          <View className="pop_btn">
            <Button
              shape="square"
              size="large"
              type="info"
              onClick={() => {
                dispatch({
                  type: 'allOrders/receiptOrder',
                  payload: {
                    id: item.id,
                    callBack: () => {
                      refesh();
                      setIsConfirm(false);
                    },
                  },
                });
              }}
            >
              确定
            </Button>
          </View>
        </View>
      </Popup>
    </Fragment>
  );
};

const Index = ({ keys, refesh }) => {
  const { orderList, orderActive } = useSelector((state) => state.allOrders);
  return (
    <View className="order">
      <View className="order-content">
        {orderList.length !== 0 ? (
          (orderList || []).map((item) => {
            return (
              <ListItem
                item={item}
                keys={keys}
                refesh={refesh}
                orderActive={orderActive}
                orderList={orderList}
                key={item.id}
              />
            );
          })
        ) : (
          <Empty style={{ background: 'transparent' }} description="无数据" />
        )}
      </View>
    </View>
  );
};
export default Index;
