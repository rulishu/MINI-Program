import React from 'react';
import { Button, Popup, Image } from '@nutui/nutui-react-taro';
import { View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const { orderAfterSales, orderInfo } = useSelector((state) => state.orderDetails);
  const onClose = () => {
    dispatch({
      type: 'orderDetails/update',
      payload: {
        orderAfterSales: false,
      },
    });
  };

  // 下一步
  const onClick = () => {
    Taro.showToast({
      title: '下一步',
      icon: 'none',
      duration: 2000,
    });
    dispatch({
      type: 'orderDetails/update',
      payload: {
        orderAfterSales: false,
      },
    });
  };

  // 仅退款
  const onRefundOnly = () => {
    dispatch({
      type: 'orderDetails/update',
      payload: {
        orderRefund: true,
        refundType: 'refundOnly',
      },
    });
  };

  // 退货退款
  const onReturnsRefunds = () => {
    dispatch({
      type: 'orderDetails/update',
      payload: {
        orderRefund: true,
        refundType: 'returnsRefunds',
      },
    });
  };

  return (
    <Popup
      visible={orderAfterSales}
      style={{ height: '60%' }}
      position="bottom"
      onClose={() => onClose()}
    >
      <View className="popupInfo">
        <View className="popupInfo-title">
          <Text>申请售后</Text>
        </View>
        <View className="popupInfo-after">
          <View>
            <Text>售后类型:</Text>
          </View>
          <View className="popupInfo-after popupInfo-after-btn">
            <View style={{ marginRight: 20 }}>
              <Button
                shape="square"
                style={{ color: '#AAAAAA', fontWeight: 400 }}
                plain
                type="default"
                onClick={() => onRefundOnly()}
              >
                <Text style={{ fontSize: 14 }}>仅退款</Text>
              </Button>
            </View>
            <View>
              <Button
                shape="square"
                style={{ color: '#AAAAAA', fontWeight: 400 }}
                plain
                type="default"
                onClick={() => onReturnsRefunds()}
              >
                <Text style={{ fontSize: 14 }}>退货退款</Text>
              </Button>
            </View>
          </View>
        </View>
        <View className="popupInfo-textArea">
          {orderInfo?.items?.map((item) => {
            return (
              <View className="popupInfo-textArea-box" key={item.id}>
                <View className="popupInfo-textArea-box-content">
                  <View>
                    <Image
                      mode="widthFix"
                      src={item?.mainGraph}
                      style={{ width: 100, height: 100 }}
                    ></Image>
                  </View>
                  <View className="popupInfo-textArea-box-content-left">
                    <View>
                      <View className="popupInfo-textArea-box-content-left-title">
                        <Text>{item.itemName}</Text>
                      </View>
                      <View className="popupInfo-textArea-box-content-left-doc">
                        {item.attributes.map((val) => (
                          <Text key={item.id} className="doc">
                            {val.value},
                          </Text>
                        ))}
                      </View>
                    </View>
                    <View className="popupInfo-textArea-box-content-left-doc ">
                      <Text className="doc-bg">自营</Text>
                    </View>
                  </View>
                </View>
                <View className="popupInfo-textArea-box-content-right">
                  <View className="popupInfo-textArea-box-content-right-num">
                    <Text>x{item?.amount}</Text>
                  </View>
                  <View className="popupInfo-textArea-box-content-right-price">
                    <Text>
                      <Text style={{ fontSize: 12 }}>¥</Text>
                      {item?.unitPrice}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View className="popupInfo-button">
          <Button
            shape="square"
            color="#A05635"
            style={{ width: '80%', borderRadius: 8, border: 'none' }}
            onClick={() => onClick()}
          >
            下一步
          </Button>
        </View>
      </View>
    </Popup>
  );
};
export default Index;
