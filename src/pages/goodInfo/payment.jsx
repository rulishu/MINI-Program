import React from 'react';
import { View, Text } from '@tarojs/components';
import { Popup, Icon, Price } from '@nutui/nutui-react-taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const { payVisible, productDetails } = useSelector((state) => state.goodInfo);
  const dispatch = useDispatch();

  return (
    <Popup
      visible={payVisible}
      style={{ height: 443, borderRadius: 24 }}
      position="bottom"
      onClose={() => {
        dispatch({
          type: 'goodInfo/update',
          payload: {
            payVisible: false,
          },
        });
      }}
    >
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <View className="payDetailTitle">金额明细</View>

        <View className="payDetailBox">
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingTop: 21,
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '10px 0',
            }}
          >
            <View>
              <Icon name="shop" size="12"></Icon>
              <Text style={{ marginLeft: 18 }}>商品总价</Text>
            </View>
            <View>
              <Price
                price={productDetails?.goodsPrice}
                size="normal"
                needSymbol
                thousands
                className="payDetailItemPrice"
              />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingTop: 17,
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '10px 0',
            }}
          >
            <View>
              <Icon name="jdl" size="12"></Icon>
              <Text style={{ marginLeft: 18 }}>仓储费</Text>
            </View>
            <View>
              <Price
                price={productDetails?.storageFee}
                size="normal"
                needSymbol
                thousands
                className="payDetailItemPrice"
              />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingTop: 17,
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '10px 0',
            }}
          >
            <View>
              <Icon name="date" size="12"></Icon>
              <Text style={{ marginLeft: 18 }}>保险费</Text>
            </View>
            <View>
              <Price
                price={productDetails?.insurancePremium}
                size="normal"
                needSymbol
                thousands
                className="payDetailItemPrice"
              />
            </View>
          </View>
          <View className="payDetailItemTwo">
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 17,
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '10px 0',
              }}
            >
              <View>
                <Icon name="home" size="12"></Icon>
                <Text style={{ marginLeft: 18 }}>优惠卷</Text>
              </View>
              <View>
                <Price
                  price={productDetails?.coupon}
                  size="normal"
                  needSymbol
                  thousands
                  className="payDetailItemPrice"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="payDetailReduceBox">
          <View className="payDetailReduce">
            <View>
              <Text>共减</Text>
            </View>
            <Price
              price={productDetails?.coSubtractive}
              size="normal"
              needSymbol
              thousands
              className="payDetailItemPrice"
            />
          </View>
          <View className="payDetailTotal">
            <Text>合计</Text>
            <Price
              price={productDetails?.allGoodsPrice}
              size="normal"
              needSymbol
              thousands
              className="payDetailItemPrice"
            />
          </View>
        </View>
      </View>
    </Popup>
  );
};
export default Index;
