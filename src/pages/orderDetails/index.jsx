import React, { useEffect } from 'react';
import { Divider, Button } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import payAddress from '@/assets/images/payAddress.svg';
import { useDispatch, useSelector } from 'react-redux';
import PopupInfo from './popupInfo';
import { list } from './item';
import Taro from '@tarojs/taro';
import AfterSales from './afterSales';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { orderStatus } = useSelector((state) => state.orderDetails);
  useEffect(() => {
    wx.setNavigationBarTitle({
      title:
        orderStatus === 1
          ? '待付款'
          : orderStatus === 2
            ? '待发货'
            : orderStatus === 3
              ? '待收货'
              : orderStatus === 4
                ? '已完成'
                : orderStatus === 5
                  ? '已取消'
                  : orderStatus === 6
                    ? '已退款'
                    : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list1 = (val) => {
    const data = [
      { id: 1, title: '订单编号', price: list.orderCode },
      { id: 5, title: '创建时间', isPrice: false, price: list.createTime },
    ];

    const data2 = [
      { id: 1, title: '订单编号', price: list.orderCode },
      { id: 2, title: '订单备注', isPrice: false, price: list.remark },
      { id: 3, title: '支付方式', isPrice: false, price: list.provider },
      { id: 4, isPrice: false, title: '支付单号', price: list.orderCode },
      { id: 5, title: '创建时间', isPrice: false, price: list.createTime },
      { id: 6, isPrice: false, title: '支付时间', price: list.payTime },
    ];
    if (val == 1 || val == 5) {
      return data;
    } else if (val == 2 || val === 3 || val === 4 || val === 6) {
      return data2;
    }
  };

  // 申请退款
  const onOutOrder = () => {
    dispatch({
      type: 'orderDetails/update',
      payload: {
        orderRefund: true,
      },
    });
  };

  // 申请售后
  const onAfterSales = () => {
    dispatch({
      type: 'orderDetails/update',
      payload: {
        orderAfterSales: true,
      },
    });
  };

  // 取消订单
  const onCloseOrder = () => {
    Taro.showModal({
      content: '确认取消订单吗?',
      success: function (res) {
        if (res.confirm) {
          return;
        } else if (res.cancel) {
          return;
        }
      },
    });
  };

  // 删除订单
  const onDelOrder = () => {
    Taro.showModal({
      content: '确定要删除订单吗?',
      success: function (res) {
        if (res.confirm) {
          return;
        } else if (res.cancel) {
          return;
        }
      },
    });
  };

  return (
    <View className="confirm">
      <View className="confirm-order">
        <View className="address">
          <View className="address-left">
            <View className="address-left-icon">
              <Image src={payAddress} style={{ width: 16, height: 16 }} />
            </View>

            <View className="address-info">
              <View className="city">
                <Text>
                  {list.addressInfo?.province + list.addressInfo?.city + list.addressInfo?.area}
                </Text>
              </View>
              <View className="address-details">
                <Text>{list.addressInfo?.addressDetails}</Text>
              </View>
              <View className="address-details">
                <Text>{list.addressInfo?.consignee + ' ' + list.addressInfo?.phone}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="goods-info">
          <View className="goods-info-head-top">
            <View className="goods-info-head-top-code">
              <Text>订单编号:{list.orderCode}</Text>
            </View>
            <View className="goods-info-head-top-phone">
              <Text>联系客服</Text>
            </View>
          </View>
          <View className="goods-info-head">
            <View className="goods-info-head-left">
              <View className="goods-info-head-img">
                <Image
                  mode="widthFix"
                  src={list?.defaultImage}
                  style={{ width: 128, height: 128 }}
                ></Image>
              </View>
              <View className="goods-info-head-info">
                <View className="goods-info-head-info-title">
                  <Text>{list.itemName}</Text>
                </View>
                <View className="goods-info-head-info-doc">
                  {list.activeSku.map((item) => (
                    <Text key={item.id} className="doc">
                      {item.value},
                    </Text>
                  ))}
                </View>
                <View className="goods-info-head-info-doc ">
                  <Text className="doc-bg">自营</Text>
                </View>
              </View>
            </View>
            <View className="goods-info-head-right">
              <View className="goods-info-head-right-num">
                <Text>x{list?.count}</Text>
              </View>
              <View className="goods-info-head-right-price">
                <Text>
                  <Text style={{ fontSize: 12 }}>¥</Text>
                  {list?.unitPrice}
                </Text>
              </View>
            </View>
          </View>
          {orderStatus === 3 && (
            <View className="after-sales">
              <Button
                shape="square"
                style={{ color: '#AAAAAA', fontWeight: 400 }}
                plain
                type="default"
                onClick={() => onAfterSales()}
              >
                <Text style={{ fontSize: 14 }}>申请售后</Text>
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
                {list?.unitPrice}
              </Text>
            </View>
          </View>
          <View className="address-price">
            <View>
              <Text>运费</Text>
            </View>
            <View>
              <Text>
                <Text style={{ fontSize: 12 }}>¥</Text>
                {list?.freight}
              </Text>
            </View>
          </View>
          <View className="address-price">
            <View>
              <Text>优惠劵</Text>
            </View>
            <View className="red-text">
              <Text>
                <Text style={{ fontSize: 12 }}>-¥</Text>
                {list?.coupon}
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
                {list?.totalPrice}
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
                  <Text>{a.price}</Text>
                  <Text style={{ color: '#000000', marginLeft: 10 }}>
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
                  onClick={() => onCloseOrder()}
                  plain
                  type="default"
                >
                  <Text style={{ fontSize: 14 }}>取消订单</Text>
                </Button>
              </View>
              <View>
                <Button shape="square" color="#FF374C" style={{ color: '#ffffff', border: 'none' }}>
                  <Text style={{ fontSize: 14 }}>立即支付 14.59</Text>
                </Button>
              </View>
            </>
          )}
          {orderStatus === 2 && (
            <View>
              <Button
                shape="square"
                style={{ color: '#AAAAAA', fontWeight: 400 }}
                onClick={() => onOutOrder()}
                plain
                type="default"
              >
                <Text style={{ fontSize: 14 }}>申请退款</Text>
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
                  type="default"
                >
                  <Text style={{ fontSize: 14 }}>查看物流</Text>
                </Button>
              </View>
              <View>
                <Button shape="square" type="primary" style={{ color: '#ffffff', border: 'none' }}>
                  <Text style={{ fontSize: 14 }}>确认收货</Text>
                </Button>
              </View>
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
                  onClick={() => onDelOrder()}
                >
                  <Text style={{ fontSize: 14 }}>删除订单</Text>
                </Button>
              </View>
              <View>
                <Button
                  shape="square"
                  style={{ color: '#AAAAAA', fontWeight: 400 }}
                  plain
                  type="default"
                >
                  <Text style={{ fontSize: 14 }}>查看物流</Text>
                </Button>
              </View>
            </>
          )}
          {orderStatus === 5 && (
            <>
              <View>
                <Button
                  shape="square"
                  style={{ color: '#AAAAAA', fontWeight: 400 }}
                  plain
                  type="default"
                  onClick={() => onDelOrder()}
                >
                  <Text style={{ fontSize: 14 }}>删除订单</Text>
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
                  plain
                  type="default"
                  onClick={() => onDelOrder()}
                >
                  <Text style={{ fontSize: 14 }}>删除订单</Text>
                </Button>
              </View>
              <View>
                <Button
                  shape="square"
                  style={{ color: '#AAAAAA', fontWeight: 400 }}
                  plain
                  type="default"
                >
                  <Text style={{ fontSize: 14 }}>售后完成</Text>
                </Button>
              </View>
            </>
          )}
        </View>
      </View>
      <PopupInfo />
      <AfterSales />
    </View>
  );
};
export default Index;
