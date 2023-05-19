import React from 'react';
import { View, Text } from '@tarojs/components';
import { Price, Icon, Button } from '@nutui/nutui-react-taro';
// import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { visible, payVisible, queryInfo } = useSelector((state) => state.goodInfo);
  return (
    <View>
      <View
        style={{ paddingTop: 28, paddingLeft: 20, backgroundColor: '#ffffff', paddingBottom: 32 }}
      >
        <View className="contentTextOne">
          <Text>{queryInfo?.categoryName}</Text>
        </View>
        <View className="contentTextTwo">
          <Text>{queryInfo?.itemName} </Text>
        </View>
        <View className="contentTextThrid">
          <Text>{queryInfo?.specifications}</Text>
          <Price
            price={queryInfo?.price}
            size="normal"
            needSymbol
            thousands
            style={{ marginRight: 26 }}
          />
        </View>
      </View>

      <View style={{ height: 367 }}>
        <View className="contentFooter">
          <View style={{ paddingLeft: 20, backgroundColor: '#F7F7F7' }}>
            <Text className="contentFooterOne">规格</Text>
            <Text className="contentFooterTwo">请选择商品规格</Text>
          </View>
          <View
            onTap={() =>
              dispatch({
                type: 'goodInfo/update',
                payload: {
                  visible: true,
                },
              })
            }
          >
            <Icon name="rect-right" size="10" style={{ marginRight: 30 }}></Icon>
          </View>
        </View>

        <View className="contentDetail">
          <View className="contentDetailBox">
            <Text className="contentDetailText">商品详情</Text>
          </View>
          <View className="contentDetailImage">{queryInfo?.details}</View>
        </View>
      </View>

      {!payVisible ? (
        <View
          className="contentButton"
          style={{ boxShadow: !visible ? '0px 0px 8px 0px rgba(0, 0, 0, 0.16)' : '' }}
        >
          <Button className="contentButtonOne" size="normal">
            <Text style={{ fontSize: 15, lineHeight: 24 }}> + </Text>
          </Button>
          <Button
            type="primary"
            className="contentButtonTwo"
            onClick={() => {
              if (visible === false) {
                dispatch({
                  type: 'goodInfo/update',
                  payload: {
                    visible: true,
                  },
                });
              } else {
                dispatch({
                  type: 'goodInfo/update',
                  payload: {
                    visible: false,
                    payVisible: true,
                  },
                });
              }
            }}
          >
            <Text style={{ fontSize: 15, lineHeight: 24 }}>立即购买</Text>
          </Button>
        </View>
      ) : (
        <View
          className="contentButton"
          style={{ boxShadow: !payVisible ? '0px 0px 8px 0px rgba(0, 0, 0, 0.16)' : '' }}
        >
          <Button type="primary" className="contentButtonPay" onClick={() => {}}>
            <Text style={{ fontSize: 15, lineHeight: 24 }}>结算</Text>
          </Button>
        </View>
      )}
    </View>
  );
};
export default Index;
