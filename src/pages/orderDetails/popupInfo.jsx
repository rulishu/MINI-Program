import React, { useState } from 'react';
import { Button, Popup, TextArea } from '@nutui/nutui-react-taro';
import { View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const Index = () => {
  const dispatch = useDispatch();
  const [value2, updateValue2] = useState('');
  const { orderRefund, refundType, orderInfo, orderStatus } = useSelector(
    (state) => state.orderDetails,
  );

  const onClose = () => {
    dispatch({
      type: 'orderDetails/update',
      payload: {
        orderRefund: false,
      },
    });
  };
  const onChange = (e) => {
    if (value2.length > 200) {
      return;
    }
    updateValue2(e);
  };

  // 仅退款
  const onClick = async (item) => {
    if (refundType === 'refundOnly') {
      await dispatch({
        type: 'orderDetails/serviceApply',
        payload: {
          afterServiceType: 1,
          reason: value2,
          id: item.id,
          orderId: item.id,
          itemIds: item?.items?.map((a) => Number(a.itemId)),
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
    } else if (refundType === 'returnsRefunds') {
      await dispatch({
        type: 'orderDetails/serviceApply',
        payload: {
          afterServiceType: 2,
          reason: value2,
          id: item.id,
          orderId: item.id,
          itemIds: item?.items?.map((a) => Number(a.itemId)),
        },
      });
    }
  };

  return (
    <Popup
      visible={orderRefund}
      style={{ height: '60%' }}
      position="bottom"
      onClose={() => onClose()}
    >
      <View className="popupInfo">
        <View className="popupInfo-title">
          <Text>{refundType === 'refundOnly' ? '仅退款' : '退货退款'}</Text>
        </View>
        <View className="popupInfo-pay">
          <View>
            <Text>退款金额:</Text>
          </View>
          <View className="popupInfo-pay-num">
            <Text>
              <Text style={{ fontSize: 12 }}>¥</Text>
              {orderInfo?.orderPrice}
            </Text>
          </View>
        </View>
        <View className="popupInfo-textArea">
          <View className="popupInfo-textArea-title">
            <Text>退款原因:</Text>
          </View>
          <TextArea
            maxlength="200"
            limitShow
            className="textArea-info"
            autoHeight
            defaultValue={value2}
            placeholder="请先和客服协商一致"
            onChange={(e) => onChange(e)}
          />
          <View className="textArea-page">
            <Text>{value2.length}/200</Text>
          </View>
        </View>
        <View className="popupInfo-button">
          <Button
            shape="square"
            color="#A05635"
            style={{ width: '80%', borderRadius: 8, border: 'none' }}
            onClick={() => onClick(orderInfo)}
          >
            申请退款
          </Button>
        </View>
      </View>
    </Popup>
  );
};
export default Index;
