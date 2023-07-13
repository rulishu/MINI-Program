import React, { useEffect } from 'react';
import { Icon, Divider, Button } from '@nutui/nutui-react-taro';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useSelector, useDispatch } from 'react-redux';
import payAddress from '@/assets/images/payAddress.svg';
import PopupInfo from './popupInfo';
import Coupon from './coupon';
import usePay from '@/hooks/usePay';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch(); //queryInfo,
  const {
    goodsName,
    currentAddress,
    orderNotesInfo,
    shoppingCartVOList,
    orderToken,
    activeSku,
    queryInfo,
    selectedCoupon,
    couponDtoList,
  } = useSelector((state) => state.goodInfo);
  const receiveCoupon = couponDtoList?.filter((item) => item.available === 1);
  const idData = couponDtoList?.filter((item) => item.selected === 1);

  const { payOrder } = usePay({
    success: () => {
      dispatch({
        type: 'allOrders/update',
        payload: {
          orderActive: 0,
        },
      });
      dispatch({
        type: 'global/update',
        payload: {
          activeIndex: 4,
        },
      });
      dispatch({
        type: 'goodInfo/update',
        payload: {
          currentAddress: {},
          orderNotesInfo: '',
          goodsName: '',
          activeSku: [],
          shoppingCartVOList: [],
        },
      });
      Taro.redirectTo({ url: '/orderPackage/allOrders/index' });
    },
    error: () => {
      Taro.redirectTo({ url: '/orderPackage/allOrders/index' });
      dispatch({
        type: 'allOrders/update',
        payload: {
          orderActive: 0,
        },
      });
      dispatch({
        type: 'goodInfo/update',
        payload: {
          currentAddress: {},
          orderNotesInfo: '',
          goodsName: '',
          activeSku: [],
          shoppingCartVOList: [],
        },
      });
    },
  });
  // 初始化收货地址内容
  let delAddress = Taro.getStorageSync('defultAddress');
  const curAddress = JSON.stringify(currentAddress) === '{}' ? delAddress : currentAddress;

  // 处理确认订单展示数据
  // console.log('shoppingCartVOList', shoppingCartVOList.map((item) => item?.cartVOList).flat());
  const orderInfo = shoppingCartVOList.map((item) => item?.cartVOList).flat();
  // shoppingCartVOList?.at(0)?.cartVOList.at(0);

  const shoppingCartVOLists = shoppingCartVOList?.at(0)?.cartVOList?.map((item) => {
    let list = [
      {
        skuId: Number(item?.skuId),
        count: item?.count,
        defaultImage: item?.defaultImage,
        store: item?.store,
        totalPrice: item?.totalPrice,
        unitPrice: item?.unitPrice,
        whetherSpecialItem: item?.whetherSpecialItem,
        spuId: item?.spuId,
        itemType: item?.itemType,
      },
    ];
    if (queryInfo?.isActivityItem) {
      list[0] = { ...list[0], activityId: queryInfo?.activityDto?.id };
    }
    return {
      cartVOList: list,
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
    Taro.navigateTo({
      url: `/userPackage/address/index?confirmAddress=${JSON.stringify(curAddress)}&count=${
        shoppingCartVOList[0]?.cartVOList[0]?.count
      }&skuId=${shoppingCartVOList[0]?.skuId}&activityId=${queryInfo?.activityDto?.id}`,
    });
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
    let params = {
      orderToken: orderToken,
      receivingAddressId: curAddress?.id,
      skuId: Number(orderInfo?.skuId),
      totalPrice: orderInfo?.totalPrice,
      realName: curAddress?.consignee,
      status: 0,
      count: orderInfo?.count,
      remark: orderNotesInfo, //备注
      shoppingCartVOList: shoppingCartVOLists,
      id: queryInfo?.id,
      userCouponId: Object.keys(selectedCoupon).length > 0 ? selectedCoupon?.id : idData?.at(0)?.id,
      callBack: () => {
        // 预订单
        let submitDetail = Taro.getStorageSync('submitInfo');
        // 支付
        payOrder({
          orderNo: submitDetail.orderNos?.at(0),
          orderId: submitDetail.orderIds?.at(0),
          gatewayId: 2,
          gatewayCode: 'WX_PAY',
          gatewayTerminal: 2,
          paymentAmount: orderInfo?.totalPrice,
          tradeType: 0,
        });
      },
    };
    if (queryInfo?.isActivityItem) {
      delete params.userCouponId;
      params = { ...params, activityId: queryInfo?.activityDto?.id };
    }
    dispatch({
      type: 'goodInfo/orderSubmit',
      payload: params,
    });
  };
  // 商品总价
  const orderTotalPrice = orderInfo
    ?.reduce((acc, item) => {
      return acc + item?.totalPrice;
    }, 0)
    .toFixed(2);
  // 合计
  const total = () => {
    if (!queryInfo?.isActivityItem) {
      if (orderTotalPrice >= selectedCoupon?.minimumConsumption) {
        return selectedCoupon.type === 2
          ? Number(orderTotalPrice - selectedCoupon?.price).toFixed(2)
          : electedCoupon.type === 3 && Number(orderTotalPrice * selectedCoupon?.price).toFixed(2);
      } else {
        if (idData?.at(0)?.price === undefined) {
          return Number(orderTotalPrice).toFixed(2);
        } else {
          return (
            Number(orderTotalPrice - idData?.at(0)?.price).toFixed(2) ||
            Number(orderTotalPrice).toFixed(2)
          );
        }
      }
    } else {
      return Number(orderTotalPrice).toFixed(2);
    }
  };

  return (
    <View className="confirm">
      <View className="confirm-order">
        <View className="address" onTap={() => onSelectAddress()}>
          <View className="address-left">
            <View className="address-left-icon">
              <Image src={payAddress} style={{ width: 16, height: 16 }} />
            </View>
            {curAddress === '添加收货地址' ? (
              <View className="address-info">
                <Text>添加收货地址</Text>
              </View>
            ) : (
              <View className="address-info">
                <View className="city">
                  <Text>{curAddress?.province + curAddress?.city + curAddress?.area}</Text>
                </View>
                <View className="address-details">
                  <Text>{curAddress?.addressDetails}</Text>
                </View>
                <View className="address-details">
                  <Text>{curAddress?.consignee + ' ' + curAddress?.phone}</Text>
                </View>
              </View>
            )}
          </View>
          <View>
            <Icon name="rect-right" size="16" color="#7F7F7F" />
          </View>
        </View>
        <View className="goods-info">
          {orderInfo?.map((data) => {
            return (
              <View className="goods-info-head" key={data?.id}>
                <View className="goods-info-head-left">
                  <View className="goods-info-head-img" style={{ width: 80, height: 80 }}>
                    <Image src={data?.defaultImage} style={{ width: 80, height: 80 }}></Image>
                  </View>
                  <View className="goods-info-head-info">
                    <View className="goods-info-head-info-title">
                      <Text>{goodsName}</Text>
                    </View>
                    <View className="goods-info-head-info-doc">
                      {Object.keys(activeSku).map((item) => {
                        return (
                          <Text key={item.id} className="doc">
                            {`${item}:${activeSku[item]?.value}`},
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <View className="goods-info-head-right">
                  <View className="goods-info-head-right-num">
                    <Text>x{data?.count}</Text>
                  </View>
                  <View className="goods-info-head-right-price">
                    <Text>￥{data?.unitPrice}</Text>
                  </View>
                </View>
              </View>
            );
          })}
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
              <Text>买家留言</Text>
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
                <Text>{orderTotalPrice}</Text>
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
            {!queryInfo?.isActivityItem ? (
              <View
                className="address-price"
                onClick={() => {
                  dispatch({ type: 'goodInfo/update', payload: { couponOrderVisible: true } });
                }}
              >
                <View>
                  <Text>优惠劵</Text>
                </View>
                <View className="address-price-right">
                  <View>
                    <Text style={{ color: '#D9001B' }}>
                      {receiveCoupon?.length > 0 && idData?.length > 0
                        ? `新人${idData?.at(0).price}元无门槛优惠券`
                        : `${receiveCoupon?.length}张可用券`}
                    </Text>
                  </View>
                  <View className="address-price-right-icon">
                    <Icon name="rect-right" size="16" style={{ marginLeft: 8 }} color="#7F7F7F" />
                  </View>
                </View>
              </View>
            ) : (
              ''
            )}
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
            <Text>合计：¥ {total()}</Text>
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
      <Coupon />
    </View>
  );
};
export default Index;
