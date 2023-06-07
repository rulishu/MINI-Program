import React from 'react';
import { Popup, Button, Empty } from '@nutui/nutui-react-taro';
import { View, Image, Text } from '@tarojs/components';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const Index = () => {
  const { isConfirm, orderAmount } = useSelector((state) => state.orderDetails);
  const { orderList } = useSelector((state) => state.allOrders);
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
      {orderList.length !== 0 ? (
        orderList.map((item) => {
          return (
            <View className="pop_view" key={item?.id}>
              <View className="pop_title">确认收货</View>
              <View className="pop_img_view">
                <View className="pop_img_text">共{orderAmount}件</View>
                <Image mode="scaleToFill" className="pop_img" src={item.items[0].mainGraph}></Image>
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
                        id: item.id,
                        callBack: () => {
                          getList;
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
          );
        })
      ) : (
        <Empty description="无数据" />
      )}
    </Popup>
  );
};
export default Index;
