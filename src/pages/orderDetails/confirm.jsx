import React from 'react';
import { Popup, Button, Empty } from '@nutui/nutui-react-taro';
import { View, Image, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const Index = () => {
  const { isConfirm, orderAmount, infoDetail } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const dispatchFn = (params) => {
    dispatch({
      type: 'orderDetails/update',
      payload: params,
    });
  };
  return (
    <Popup
      visible={isConfirm}
      className="order_pop"
      position="bottom"
      onClose={() => dispatchFn({ isConfirm: false })}
    >
      {infoDetail?.items.length !== 0 ? (
        <View className="pop_view">
          <View className="pop_title">确认收货</View>
          <View className="pop_img_view">
            <View className="pop_img_text">共{orderAmount}件</View>
            <Image
              mode="scaleToFill"
              className="pop_img"
              src={infoDetail?.items[0].mainGraph}
            ></Image>
          </View>
          <View className="pop_text_view">
            <Text>为保证你的售后权益，请收到商品确</Text>
            <Text>认无误后再确认收货</Text>
          </View>
          <View className="pop_btn">
            <Button
              shape="square"
              size="large"
              type="info"
              onClick={() => {
                dispatch({
                  type: 'allOrders/receiptOrder',
                  payload: {
                    id: infoDetail.id,
                    callBack: () => {
                      dispatch({
                        type: 'orderDetails/selectPrimaryKey',
                        payload: {
                          id: Number(infoDetail.id),
                        },
                      });
                      dispatchFn({ isConfirm: false });
                    },
                  },
                });
              }}
            >
              确定
            </Button>
          </View>
        </View>
      ) : (
        <Empty description="无数据" />
      )}
    </Popup>
  );
};
export default Index;
