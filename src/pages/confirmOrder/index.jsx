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
    // eslint-disable-next-line global-require
  }, []);
  const { addressList } = useSelector((state) => state.address);

  // 默认地址
  const defultAddress = addressList
    .filter((item) => {
      return item.isDefault === 1;
    })
    .at(0);
  const { productDetails, confirmList } = useSelector((state) => state.goodInfo);
  const confirmListInfo = confirmList?.at(0);

  const list = [
    {
      icon: order1,
      title: '商品总价',
      price: confirmListInfo?.count * confirmListInfo?.price,
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
      price: confirmListInfo?.count * confirmListInfo?.price,
    },
  ];

  // 支付
  const onPay = () => {
    Taro.navigateTo({ url: '/pages/paySuccess/index' });
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
                  src={confirmListInfo?.defaultImage}
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
            <View onTap={() => Taro.navigateTo({ url: '/pages/address/index' })}>
              <Icon name="locationg3" size="18" style={{ marginRight: 8 }} />
            </View>
            <View className="address-info">
              <Text>
                [收货地址]{' '}
                {defultAddress?.province +
                  defultAddress?.city +
                  defultAddress?.area +
                  defultAddress?.addressDetails}
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
