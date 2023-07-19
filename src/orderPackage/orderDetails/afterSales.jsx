import React, { useState } from 'react';
import { Button, Popup, Image } from '@nutui/nutui-react-taro';
import { View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import { orderBtn } from '@/utils/enum';
import Taro from '@tarojs/taro';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [avtive, setActive] = useState();
  const { orderAfterSales, orderInfoItem } = useSelector((state) => state.orderDetails);
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
    if (avtive === 0) {
      // 仅退款
      dispatch({
        type: 'orderDetails/update',
        payload: {
          orderRefund: true,
          refundType: 'refundOnly',
        },
      });
    } else if (avtive === 1) {
      // 退货退款
      dispatch({
        type: 'orderDetails/update',
        payload: {
          orderRefund: true,
          refundType: 'returnsRefunds',
        },
      });
    } else {
      Taro.showToast({
        title: '请选择售后类型',
        icon: 'none',
        duration: 2000,
      });
    }
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
            <View style={{ marginRight: 20, display: 'flex' }}>
              {orderBtn?.map((str, index) => (
                <View key={index} style={{ marginRight: 20 }}>
                  <Button
                    shape="square"
                    style={{ color: avtive === index ? '#ffffff' : '#AAAAAA', fontWeight: 400 }}
                    plain={avtive === index ? false : true}
                    type={avtive == index ? 'primary' : 'default'}
                    onClick={() => setActive(index)}
                  >
                    <Text style={{ fontSize: 14 }}>{str}</Text>
                  </Button>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View className="popupInfo-textArea">
          {orderInfoItem?.map((item) => {
            return (
              <View className="popupInfo-textArea-box" key={item?.id}>
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
                        <Text className="doc">
                          {item?.attributes?.map((attributeItem) => {
                            let str = `${attributeItem.attributeName}:${attributeItem.value} `;
                            return str;
                          })}
                        </Text>
                      </View>
                    </View>
                    <View className="popupInfo-textArea-box-content-left-doc ">
                      <Text className="doc-bg">{item?.suppliersId === 1 ? '自营' : '严选'}</Text>
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
