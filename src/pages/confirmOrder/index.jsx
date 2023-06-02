import React, { useEffect } from 'react';
import { Icon, Divider, Button } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector, useDispatch } from 'react-redux';
import payAddress from '@/assets/images/payAddress.svg';
import PopupInfo from './popupInfo';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch(); //queryInfo,
  const { goodsName, currentAddress, orderNotesInfo, shoppingCartVOList, orderToken, activeSku } =
    useSelector((state) => state.goodInfo);

  // 初始化收货地址内容
  // let delAddress = Taro.getStorageSync('defultAddress');
  const curAddress = JSON.stringify(currentAddress) === '{}' ? '添加收货地址' : currentAddress;

  // 处理确认订单展示数据
  const orderInfo = shoppingCartVOList?.at(0)?.cartVOList.at(0);
  // console.log('shoppingCartVOList', shoppingCartVOList, orderInfo)

  const shoppingCartVOLists = shoppingCartVOList?.at(0)?.cartVOList?.map((item) => {
    return {
      cartVOList: [
        {
          skuId: Number(item?.skuId),
          count: item?.count,
          defaultImage: item?.defaultImage,
          store: item?.store,
          totalPrice: item?.totalPrice,
          unitPrice: item?.unitPrice,
          whetherSpecialItem: item?.whetherSpecialItem,
        },
      ],
    };
  });

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

  // 选择地址
  const onSelectAddress = () => {
    Taro.navigateTo({ url: '/pages/address/index' });
  };

  // 订单备注
  const onOrderNotes = () => {
    dispatch({
      type: 'goodInfo/update',
      payload: {
        orderNotesOpen: true,
      },
    });
  };

  // 支付
  const onPay = async () => {
    if (curAddress?.id === undefined) {
      return Taro.showToast({
        title: '请添加收货地址',
        icon: 'none',
        duration: 2000,
      });
    }
    Taro.showLoading({ title: '加载中', mask: true });
    await dispatch({
      type: 'goodInfo/orderSubmit',
      payload: {
        orderToken: orderToken,
        receivingAddressId: curAddress?.id,
        skuId: Number(orderInfo?.skuId),
        totalPrice: orderInfo?.totalPrice,
        realName: curAddress?.consignee,
        status: 0,
        count: orderInfo?.count,
        remark: orderNotesInfo, //备注
        shoppingCartVOList: shoppingCartVOLists,
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
        paymentAmount: orderInfo?.totalPrice,
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
          Taro.navigateTo({ url: '/pages/allOrders/index' });
          dispatch({
            type: 'allOrders/update',
            payload: {
              orderActive: 0,
            },
          });
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
        <View className="address">
          <View className="address-left">
            <View className="address-left-icon">
              <Image src={payAddress} style={{ width: 16, height: 16 }} />
            </View>
            {JSON.stringify(currentAddress) === '{}' ? (
              <View className="address-info">
                <Text>添加收货地址</Text>
              </View>
            ) : (
              <View className="address-info">
                <View className="city">
                  <Text>
                    {currentAddress?.province + currentAddress?.city + currentAddress?.area}
                  </Text>
                </View>
                <View className="address-details">
                  <Text>{currentAddress?.addressDetails}</Text>
                </View>
                <View className="address-details">
                  <Text>{currentAddress?.consignee + ' ' + currentAddress?.phone}</Text>
                </View>
              </View>
            )}
          </View>
          <View onTap={() => onSelectAddress()}>
            <Icon name="rect-right" size="16" color="#7F7F7F" />
          </View>
        </View>
        <View className="goods-info">
          <View className="goods-info-head">
            <View className="goods-info-head-left">
              <View className="goods-info-head-img">
                {/* eslint-disable-next-line global-require */}
                <Image
                  mode="widthFix"
                  src={orderInfo?.defaultImage}
                  style={{ width: 128, height: 128 }}
                ></Image>
              </View>
              <View className="goods-info-head-info">
                <View className="goods-info-head-info-title">
                  <Text>{goodsName}</Text>
                </View>
                <View className="goods-info-head-info-doc">
                  {activeSku.map((item) => (
                    <Text key={item.id} className="doc">
                      {item.value},
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <View className="goods-info-head-right">
              <View className="goods-info-head-right-num">
                <Text>x{orderInfo?.count}</Text>
              </View>
              <View className="goods-info-head-right-price">
                <Text>￥{orderInfo?.unitPrice}.00</Text>
              </View>
            </View>
          </View>
          <Divider style={{ color: '#D7D7D7' }} />
          <View className="address-price">
            <View>
              <Text>运费</Text>
            </View>
            <View>
              <Text>免邮</Text>
            </View>
          </View>
          <View className="address-price">
            <View>
              <Text>订单备注</Text>
            </View>
            <View className="address-price-right-icon" onTap={() => onOrderNotes()}>
              <Icon name="rect-right" size="16" color="#7F7F7F" />
            </View>
          </View>
        </View>
        <View className="amount-details">
          <View className="card-title">
            <Text>价格明细</Text>
          </View>
          <Divider style={{ color: '#D7D7D7' }} />
          <View className="prices">
            <View className="address-price">
              <View>
                <Text>商品总价</Text>
              </View>
              <View>
                <Text>{orderInfo?.totalPrice}</Text>
              </View>
            </View>
            <View className="address-price">
              <View>
                <Text>运费</Text>
              </View>
              <View>
                <Text>免邮</Text>
              </View>
            </View>
            <View className="address-price">
              <View>
                <Text>优惠劵</Text>
              </View>
              <View className="address-price-right">
                <View>
                  <Text style={{ color: '#D9001B' }}>新人20元无门槛优惠劵</Text>
                </View>
                <View className="address-price-right-icon">
                  <Icon name="rect-right" size="16" style={{ marginLeft: 8 }} color="#7F7F7F" />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="pay">
          <View>
            <Text>支付方式</Text>
          </View>
          <View>
            <Text>微信支付</Text>
          </View>
        </View>
      </View>
      <View className="footer-height"></View>
      <View className="footer">
        <View className="footer-content">
          <View>
            <Text>合计：¥ {orderInfo?.totalPrice}</Text>
          </View>
          <View>
            <Button
              shape="square"
              type="primary"
              style={{ color: '#ffffff', borderRadius: 6 }}
              onClick={() => onPay()}
            >
              <Text style={{ fontSize: 14 }}>确认订单</Text>
            </Button>
          </View>
        </View>
      </View>
      <PopupInfo />
    </View>
  );
};
export default Index;
