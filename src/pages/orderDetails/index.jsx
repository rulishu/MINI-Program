import React from 'react';
import { Divider, Button } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import payAddress from '@/assets/images/payAddress.svg';
import { useDispatch, useSelector } from 'react-redux';
import PopupInfo from './popupInfo';
import Taro from '@tarojs/taro';
import AfterSales from './afterSales';
import { orderType, orderPay } from '../../utils/enum';
import { useCountDown } from 'ahooks';
import moment from 'moment';
import back from '@/assets/images/back.svg';
import NavBar from '../../component/navBar';
import usePay from '@/hooks/usePay';
import Confirm from './confirm';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { orderStatus, orderInfo } = useSelector((state) => state.orderDetails);
  const { predictEndTime } = orderInfo;
  const { payOrder } = usePay({
    success: () => {
      Taro.navigateTo({ url: '/pages/allOrders/index' });
      dispatch({
        type: 'allOrders/getAllOrders',
        payload: {
          pageNum: 1,
          pageSize: 10,
          orderStatus,
        },
      });
    },
    error: () => {},
  });

  // eslint-disable-next-line no-unused-vars
  const [countdown, formattedRes] = useCountDown({
    // leftTime: 60 * 100,
    leftTime: moment(predictEndTime).valueOf() - moment().valueOf(),
    onEnd: async () => {
      if (keys === orderActive) {
        orderInfo.filter((orderItem) => {
          if (orderItem.id === item.id) {
            orderItem.orderStatus = -2;
          }
        });
        await dispatch({
          type: 'orderDetails/update',
          payload: {
            orderInfo: orderInfo,
          },
        });
      }
    },
  });
  let { minutes, seconds } = formattedRes;
  if (seconds.toString().length === 1) {
    seconds = `0${seconds}`;
  }

  // 收货地址
  const address = orderInfo?.address?.split(' ');

  const list1 = (val) => {
    const data = [
      { id: 1, title: '订单编号', price: orderInfo.orderNumber },
      { id: 5, title: '创建时间', price: orderInfo.createTime },
    ];

    const data2 = [
      { id: 1, title: '订单编号', price: orderInfo.orderNumber },
      { id: 2, title: '买家留言', price: orderInfo?.remark },
      { id: 3, title: '支付方式', price: orderPay[orderInfo?.payType] },
      { id: 4, title: '支付单号', price: orderInfo?.paymentOrderNumber },
      { id: 5, title: '创建时间', price: orderInfo?.createTime },
      { id: 6, title: '支付时间', price: orderInfo?.payDate },
    ];
    if (val == 1 || val == -2) {
      return data;
    } else if (val == 2 || val === 3 || val === 4 || val === 7) {
      return data2;
    }
  };

  // 立即支付
  const onPay = async () => {
    if (minutes === 0 && seconds === '00') {
      Taro.navigateBack({
        delta: 1,
        success: () => {
          Taro.showToast({
            title: '未按时支付订单',
            icon: 'error',
            duration: 2000,
          });
        },
      });
      dispatch({
        type: 'allOrders/update',
        payload: {
          orderActive: 0,
        },
      });
    } else {
      Taro.showLoading({ title: '加载中', mask: true });
      payOrder({
        orderNo: orderInfo?.orderNumber,
        orderId: orderInfo?.id,
        gatewayId: 2,
        gatewayCode: 'WX_PAY',
        gatewayTerminal: 2,
        paymentAmount: orderInfo?.totalPrice,
        tradeType: 0,
      });
    }
  };

  // 申请退款
  const onOutOrder = (item) => {
    // 申请退款
    if (item.afterSaleStatus === 0) {
      dispatch({
        type: 'orderDetails/update',
        payload: {
          orderRefund: true,
          refundType: 'pendingRefund',
        },
      });
    } else if (item.afterSaleStatus === 1) {
      return Taro.navigateTo({ url: '/pages/afterSales/index' }); //'售后处理中';
    } else if (item.afterSaleStatus === 2) {
      return Taro.navigateTo({ url: '/pages/afterSales/index' }); //'售后完成';
    }
  };

  // 申请售后
  const onAfterSales = (item) => {
    const states = item.items?.at(0).afterSaleStatus;
    if (states === 0) {
      // 申请退款
      dispatch({
        type: 'orderDetails/update',
        payload: {
          orderAfterSales: true,
        },
      });
    } else if (states === 1) {
      return Taro.navigateTo({ url: '/pages/afterSales/index' }); //'售后处理中';
    } else if (states === 2) {
      return Taro.navigateTo({ url: '/pages/afterSales/index' }); //'售后完成';
    } else if (states === 3) {
      return Taro.navigateTo({ url: '/pages/afterSales/index' }); //'售后关闭';
    }
  };

  // 取消订单
  const onCloseOrder = () => {
    Taro.showModal({
      content: '确认取消订单吗?',
      success: function (res) {
        if (res.confirm) {
          dispatch({
            type: 'allOrders/cancelOrder',
            payload: {
              id: orderInfo?.id,
            },
          });
        } else if (res.cancel) {
          return;
        }
      },
    });
  };

  // 删除订单
  const onDelOrder = (item) => {
    Taro.showModal({
      content: '确定要删除订单吗?',
      success: function (res) {
        if (res.confirm) {
          dispatch({
            type: 'allOrders/deleteOrder',
            payload: {
              id: item.id,
              callBack: () => {
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
          Taro.navigateTo({ url: '/pages/allOrders/index' });
        } else if (res.cancel) {
          return;
        }
      },
    });
  };

  // 返回按钮
  const goBack = () => {
    Taro.navigateBack({
      delta: 1,
    });
  };

  // 到期时间计算
  const dateDiff = (date) => {
    const now = new Date();
    const target = new Date(date);
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}天${hours}小时`;
  };

  // 复制
  const onCopy = (e) => {
    if (e.title === '订单编号') {
      Taro.setClipboardData({
        data: e.price,
        success: function () {
          Taro.showToast({
            title: '复制成功',
            icon: 'none',
            duration: 2000,
          });
        },
        fail: function () {
          Taro.showToast({
            title: '复制失败',
            icon: 'none',
            duration: 2000,
          });
        },
      });
    }
  };
  // 退货退款
  const onStateBtn = (item) => {
    const states = item.items?.at(0).afterSaleStatus;
    if (states === 0) {
      return '申请退款';
    } else if (states === 1) {
      return '售后处理中';
    } else if (states === 2) {
      return '售后完成';
    } else if (states === 3) {
      return '售后关闭';
    }
  };

  //仅退款
  const onlyStateBtn = (item) => {
    if (item.afterSaleStatus === 0) {
      return '申请退款';
    } else if (item.afterSaleStatus === 1) {
      return '售后处理中';
    } else if (item.afterSaleStatus === 2) {
      return '售后完成';
    }
  };

  // 评价
  const onEvaluate = () => {
    Taro.navigateTo({ url: `/pages/evaluate/index?id=${Number(orderInfo.id)}` });
  };

  return (
    <>
      <View>
        <NavBar
          background="#ffffff"
          color="black"
          renderCenter={
            <View class="return_view">
              <Image mode="widthFix" src={back} className="return_img" onClick={goBack}></Image>
              <View className="return_text">
                <View>{orderType[orderStatus]}</View>
                {orderStatus === 2 && <View className="return_mes">买家已付款，等待卖家发货</View>}
                {orderStatus === 3 && (
                  <View className="return_mes">
                    {orderInfo.logisticsStatus === 0
                      ? '部分包裹已发货'
                      : `卖家已发货，${dateDiff(orderInfo.autoConfirmReceipt)}后自动确认`}
                  </View>
                )}
              </View>
            </View>
          }
        />
      </View>
      <View className="confirm">
        {/* <View class="return_view">
        <Image mode="widthFix" src={back} className="return_img" onClick={goBack}></Image>
        <View className="return_text">
          <View>{orderType[orderStatus]}</View>
          {orderStatus === 2 && <View className="return_mes">买家已付款，等待卖家发货</View>}
          {orderStatus === 3 && (
            <View className="return_mes">
              {orderInfo.logisticsStatus === 0
                ? '部分包裹已发货'
                : `卖家已发货，${dateDiff(orderInfo.autoConfirmReceipt)}后自动确认`}
            </View>
          )}
        </View>
      </View> */}
        <View className="confirm-order">
          <View className="address">
            <View className="address-left">
              <View className="address-left-icon">
                <Image src={payAddress} style={{ width: 16, height: 16 }} />
              </View>
              <View className="address-info">
                <View className="city">
                  <Text>{address?.slice(0, 3)}</Text>
                </View>
                <View className="address-details">
                  <Text>{address?.slice(3, 4)}</Text>
                </View>
                <View className="address-details">
                  <Text>{orderInfo?.consignee + ' ' + orderInfo?.phone}</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="goods-info">
            <View className="goods-info-head-top">
              <View className="goods-info-head-top-code">
                <Text>订单编号:{orderInfo?.orderNumber}</Text>
              </View>
              <View className="goods-info-head-top-phone">
                <Text>联系客服</Text>
              </View>
            </View>
            {orderInfo?.items?.map((a) => {
              return (
                <View className="goods-info-head" key={a.id}>
                  <View className="goods-info-head-left">
                    <View className="goods-info-head-img">
                      <Image
                        mode="widthFix"
                        src={a?.mainGraph}
                        className="goods-info-head-img"
                      ></Image>
                    </View>
                    <View className="goods-info-head-info">
                      <View className="goods-info-head-info-title">
                        <Text>{a.itemName}</Text>
                      </View>
                      <View className="goods-info-head-info-doc">
                        <Text className="doc">
                          {a.attributes.map((attributeItem) => {
                            let str = `${attributeItem.attributeName}:${attributeItem.value} `;
                            return str;
                          })}
                        </Text>
                      </View>
                      <View className="goods-info-head-info-doc ">
                        <Text className="doc-bg">{a?.suppliersId === 1 ? '自营' : '严选'}</Text>
                      </View>
                    </View>
                  </View>
                  <View className="goods-info-head-right">
                    <View className="goods-info-head-right-num">
                      <Text>x{a?.amount}</Text>
                    </View>
                    <View className="goods-info-head-right-price">
                      <Text>
                        <Text style={{ fontSize: 12 }}>¥</Text>
                        {a?.unitPrice}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
            {orderStatus === 3 && (
              <View className="after-sales">
                <Button
                  shape="square"
                  style={{ color: '#AAAAAA', fontWeight: 400 }}
                  plain
                  type="default"
                  onClick={() => onAfterSales(orderInfo)}
                >
                  <Text style={{ fontSize: 14 }}>{onStateBtn(orderInfo)}</Text>
                </Button>
              </View>
            )}
            <Divider style={{ color: '#D7D7D7' }} />
            <View className="address-price">
              <View>
                <Text>商品总价</Text>
              </View>
              <View>
                <Text>
                  <Text style={{ fontSize: 12 }}>¥</Text>
                  {orderInfo?.orderPrice}
                </Text>
              </View>
            </View>
            <View className="address-price">
              <View>
                <Text>运费</Text>
              </View>
              <View>
                <Text>
                  包邮
                  {/* <Text style={{ fontSize: 12 }}>¥</Text> */}
                </Text>
              </View>
            </View>
            <View className="address-price">
              <View>
                <Text>优惠劵</Text>
              </View>
              <View className="red-text">
                <Text>
                  <Text style={{ fontSize: 12 }}>¥</Text>
                  0.00
                </Text>
              </View>
            </View>
            <View className="address-price">
              <View>
                <Text>合计</Text>
              </View>
              <View className="red-text">
                <Text>
                  <Text style={{ fontSize: 12 }}>¥</Text>
                  {orderInfo?.orderPrice}
                </Text>
              </View>
            </View>
          </View>
          <View className="amount-details">
            {list1(orderStatus)?.map((a) => {
              return (
                <View key={a.id} className="address-price">
                  <View>
                    <Text>{a.title}</Text>
                  </View>
                  <View className="address-price-right">
                    <Text className="address-price-right-text">{a.price}</Text>
                    <Text
                      style={{ color: '#A05635', fontSize: 14, marginLeft: 10 }}
                      onClick={() => onCopy(a)}
                    >
                      {a.title === '订单编号' ? '复制' : ''}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          {/* <View className="pay">
          <Text>联系客服</Text>
        </View> */}
        </View>
        <View className="footer-height"></View>
        <View className="footer">
          <View className="footer-content">
            {orderStatus === 1 && (
              <>
                <View style={{ marginRight: 10 }}>
                  <Button
                    shape="square"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    size="small"
                    onClick={() => onCloseOrder()}
                    plain
                    type="default"
                  >
                    <Text style={{ fontSize: 14 }}>取消订单</Text>
                  </Button>
                </View>
                <View>
                  <Button
                    onClick={() => onPay()}
                    shape="square"
                    size="small"
                    type="danger"
                    style={{ color: '#ffffff', border: 'none', width: 140 }}
                  >
                    <Text>
                      立即支付 {minutes}:{seconds}
                    </Text>
                  </Button>
                </View>
              </>
            )}
            {orderStatus === 2 && (
              <View>
                <Button
                  size="small"
                  shape="square"
                  style={{ color: '#AAAAAA', fontWeight: 400 }}
                  onClick={() => onOutOrder(orderInfo)}
                  plain
                  type="default"
                >
                  <Text style={{ fontSize: 14 }}>{onlyStateBtn(orderInfo)}</Text>
                </Button>
              </View>
            )}
            {orderStatus === 3 && (
              <>
                <View style={{ marginRight: 10 }}>
                  <Button
                    shape="square"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    plain
                    size="small"
                    type="default"
                    onClick={() => {
                      dispatch({
                        type: 'logisticsInfo/update',
                        payload: {
                          id: Number(orderInfo.id),
                        },
                      });
                      Taro.navigateTo({ url: '/pages/logisticsInfo/index' });
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>查看物流</Text>
                  </Button>
                </View>
                {orderInfo.logisticsStatus === 1 && (
                  <View>
                    <Button
                      shape="square"
                      size="small"
                      type="primary"
                      style={{ color: '#ffffff', border: 'none' }}
                      onClick={() => {
                        dispatch({
                          type: 'orderDetails/update',
                          payload: {
                            isConfirm: true,
                            orderAmount: orderInfo.items.reduce(
                              (total, obj) => total + obj.amount,
                              0,
                            ),
                          },
                        });
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>确认收货</Text>
                    </Button>
                  </View>
                )}
              </>
            )}
            {orderStatus === 4 && (
              <>
                <View style={{ marginRight: 10 }}>
                  <Button
                    shape="square"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    plain
                    type="default"
                    size="small"
                    onClick={() => onDelOrder(orderInfo)}
                  >
                    <Text style={{ fontSize: 14 }}>删除订单</Text>
                  </Button>
                </View>
                <View style={{ marginRight: 10 }}>
                  <Button
                    shape="square"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    size="small"
                    plain
                    type="default"
                    onClick={() => {
                      dispatch({
                        type: 'logisticsInfo/update',
                        payload: {
                          id: Number(orderInfo.id),
                        },
                      });
                      Taro.navigateTo({ url: '/pages/logisticsInfo/index' });
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>查看物流</Text>
                  </Button>
                </View>
                <View>
                  <Button
                    shape="square"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    plain
                    size="small"
                    type="default"
                    onClick={() => onEvaluate()}
                  >
                    <Text style={{ fontSize: 14 }}>评价</Text>
                  </Button>
                </View>
              </>
            )}
            {orderStatus === 7 && (
              <>
                <View style={{ marginRight: 10 }}>
                  <Button
                    shape="square"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    size="small"
                    plain
                    type="default"
                    onClick={() => onDelOrder(orderInfo)}
                  >
                    <Text style={{ fontSize: 14 }}>删除订单</Text>
                  </Button>
                </View>
                <View>
                  <Button
                    shape="square"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    size="small"
                    plain
                    type="default"
                    onClick={() => {
                      dispatch({
                        type: 'logisticsInfo/update',
                        payload: {
                          id: Number(orderInfo.id),
                        },
                      });
                      Taro.navigateTo({ url: '/pages/logisticsInfo/index' });
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>查看物流</Text>
                  </Button>
                </View>
              </>
            )}
            {orderStatus === 6 && (
              <>
                <View style={{ marginRight: 10 }}>
                  <Button
                    shape="square"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    size="small"
                    plain
                    type="default"
                    onClick={() => onDelOrder(orderInfo)}
                  >
                    <Text style={{ fontSize: 14 }}>删除订单</Text>
                  </Button>
                </View>
                <View style={{ marginRight: 10 }}>
                  <Button
                    shape="square"
                    size="small"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    plain
                    type="default"
                    onClick={() => {
                      dispatch({
                        type: 'logisticsInfo/update',
                        payload: {
                          id: Number(orderInfo.id),
                        },
                      });
                      Taro.navigateTo({ url: '/pages/logisticsInfo/index' });
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>查看物流</Text>
                  </Button>
                </View>
                <View>
                  <Button
                    shape="square"
                    size="small"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    plain
                    type="default"
                  >
                    <Text style={{ fontSize: 14 }}>售后完成</Text>
                  </Button>
                </View>
              </>
            )}
            {orderStatus === -2 && (
              <>
                <View>
                  <Button
                    shape="square"
                    size="small"
                    style={{ color: '#AAAAAA', fontWeight: 400 }}
                    plain
                    type="default"
                    onClick={() => onDelOrder(orderInfo)}
                  >
                    <Text style={{ fontSize: 14 }}>删除订单</Text>
                  </Button>
                </View>
              </>
            )}
          </View>
        </View>
        <Confirm />
        <PopupInfo />
        <AfterSales />
      </View>
    </>
  );
};
export default Index;
