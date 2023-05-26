import React, { useEffect } from 'react';
import { Icon, Button } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import { list1 } from './item';
import Taro from '@tarojs/taro';
import order2 from '@/assets/images/order2.svg';
import order3 from '@/assets/images/order3.svg';
import { useSelector, useDispatch } from 'react-redux';
import order1 from '@/assets/images/order1.svg';

import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { productDetails, queryInfo, currentAddress } = useSelector((state) => state.goodInfo);

  // 默认地址
  let delAddress = Taro.getStorageSync('defultAddress');
  const curAddress = JSON.stringify(currentAddress) === '{}' ? delAddress : currentAddress;

  useEffect(() => {
    const token = Taro.getStorageSync('token');
    const userInfo = Taro.getStorageSync('userInfo');
    if (token === '') {
      Taro.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000,
      });
      return Taro.navigateTo({ url: '/pages/login/index' });
    }
    dispatch({
      type: 'address/getAddress',
      payload: {
        id: userInfo.id,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = [
    {
      icon: order1,
      title: '商品总价',
      price: productDetails.allGoodsPrice,
    },
    {
      icon: order1,
      title: '仓储费',
      price: 0,
    },
    {
      icon: order1,
      title: '保险费',
      price: 0,
    },
    {
      icon: order1,
      title: '优惠券',
      price: 0,
    },
    {
      icon: '',
      title: '共减',
      isICon: false,
      price: 0,
    },
    {
      icon: '',
      title: '合计',
      isICon: false,
      price: productDetails.allGoodsPrice,
    },
  ];

  // 选择地址
  const onSelectAddress = () => {
    Taro.navigateTo({ url: '/pages/address/index' });
  };

  // 支付
  const onPay = async () => {
    Taro.showLoading({ title: '加载中', mask: true });
    //确认订单
    await dispatch({
      type: 'goodInfo/orderConfirm',
      payload: {
        count: productDetails?.goodsTotalNum,
        skuId: Number(queryInfo.id),
      },
    });
    let orderDetail = Taro.getStorageSync('orderInfo');
    await dispatch({
      type: 'goodInfo/orderSubmit',
      payload: {
        orderToken: orderDetail.orderToken,
        receivingAddressId: curAddress?.id,
        skuId: Number(queryInfo.id),
        totalPrice: productDetails.allGoodsPrice,
        realName: curAddress?.consignee,
        status: 0,
        count: productDetails?.goodsTotalNum,
        shoppingCartVOList: [
          {
            couponUserId: 84,
            cartVOList: [
              {
                count: 1,
                defaultImage: '',
                freightFee: 0,
                giveCount: 0,
                price: 10,
                saleAttrs: '',
                sales: '',
                shoppingCartGoodsId: 0,
                skuId: Number(queryInfo.id),
                store: false,
                taxRatePrice: 0,
                title: '',
                weight: 0,
              },
            ],
          },
        ],
      },
    });
    // 预订单
    let submitDetail = Taro.getStorageSync('submitInfo');
    await dispatch({
      type: 'goodInfo/wxpay',
      payload: {
        orderNo: submitDetail.orderNos?.at(0),
        orderId: submitDetail.orderIds?.at(0),
        gatewayId: 2,
        gatewayCode: 'WX_PAY',
        gatewayTerminal: 2,
        paymentAmount: productDetails.allGoodsPrice,
        tradeType: 0,
      },
    });

    // 支付
    let payDetail = Taro.getStorageSync('payInfo');
    Taro.requestPayment({
      timeStamp: payDetail.timeStamp,
      nonceStr: payDetail.nonceStr,
      package: payDetail.package, // 订单包
      signType: payDetail.signType, // 加密方式统一'
      paySign: payDetail.paySign, // 后台支付签名返回
      provider: payDetail.provider, //支付类型
      appId: payDetail.appId, //小程序Appid
      success: function (res) {
        Taro.showToast({
          title: '支付成功',
          icon: 'none',
          duration: 2000,
        });
        if (res.errMsg === 'requestPayment:ok') {
          Taro.navigateTo({ url: '/pages/paySuccess/index' });
        }
        Taro.removeStorageSync('payInfo');
      },
      fail: function (res) {
        window.console.log('fail', res);
        Taro.showToast({
          title: '支付失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
    Taro.hideLoading();
  };

  return (
    <View className="confirm">
      <View className="confirm-order">
        <View className="goods-info">
          <View className="card-title-goods">
            <Text>{productDetails.categoryName}</Text>
          </View>
          <View className="goods-info-head">
            <View className="goods-info-head-left">
              <View className="goods-info-head-img">
                {/* eslint-disable-next-line global-require */}
                <Image
                  mode="widthFix"
                  src={productDetails?.goodsImage}
                  style={{ width: 82, height: 108 }}
                ></Image>
              </View>
              <View className="goods-info-head-info">
                <View className="goods-info-head-info-title">
                  <Text>{productDetails?.goodsName}</Text>
                </View>
                <View className="goods-info-head-info-doc">
                  <Text>{productDetails.details}</Text>
                </View>
              </View>
            </View>
            <View className="goods-info-head-right">
              <View className="goods-info-head-right-price">
                <Text>￥{productDetails.goodPrice}.00</Text>
              </View>
              <View className="goods-info-head-right-num">
                <Text>x{productDetails.goodsTotalNum}</Text>
              </View>
            </View>
          </View>
          <View className="address">
            <View onTap={() => onSelectAddress()}>
              <Icon name="locationg3" size="18" style={{ marginRight: 8 }} />
            </View>
            <View className="address-info">
              <Text>
                [收货地址]{' '}
                {curAddress?.province +
                  curAddress?.city +
                  curAddress?.area +
                  curAddress?.addressDetails}
              </Text>
            </View>
          </View>
          <View className="address-price">
            <Text>快递￥0.00</Text>
          </View>
          <View className="card-list">
            {list1.map((item, index) => {
              return (
                <View key={index} className="card-list-item">
                  <View className="card-list-item-left">
                    <View>
                      <Image
                        mode="widthFix"
                        src={item.icon}
                        style={{ width: 13, height: 13 }}
                      ></Image>
                    </View>
                    <View className="card-list-item-left-title">
                      <Text>{item.title}</Text>
                    </View>
                  </View>
                  <View
                    className={
                      item.isPrice === false ? 'card-list-item-right2' : 'card-list-item-right'
                    }
                  >
                    <Text>{item?.price}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View className="amount-details">
          <View className="card-title">
            <Text>金额明细</Text>
          </View>
          <View className="card-list">
            {list.map((item, index) => {
              return (
                <View key={index} className="card-list-item">
                  <View className="card-list-item-left">
                    <View style={{ width: 13, height: 13 }}>
                      {item.isICon === false ? (
                        ''
                      ) : (
                        <Image
                          mode="widthFix"
                          src={order1}
                          style={{ width: 13, height: 13 }}
                        ></Image>
                      )}
                    </View>
                    <View className="card-list-item-left-title">
                      <Text>{item.title}</Text>
                    </View>
                  </View>
                  <View className="card-list-item-right">
                    <Text>￥{item?.price}.00</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View className="footer-height"></View>
      <View className="footer">
        <View className="footer-conter">
          <View className="footer-top">
            <View style={{ width: '48%' }}>
              <Button className="footer-top-btn" shape="square" icon={order3}>
                <Text style={{ color: '#A85230' }}>联系客服</Text>
              </Button>
            </View>
            <View style={{ width: '48%' }}>
              <Button className="footer-top-btn" shape="square" icon={order2}>
                <Text style={{ color: '#A85230' }}>收藏</Text>
              </Button>
            </View>
          </View>
          <View>
            <Button
              className="footer-bottom"
              onClick={() => {
                onPay();
              }}
            >
              <Text style={{ fontSize: 15, lineHeight: 24 }}>确认订单</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Index;
