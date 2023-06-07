import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { Button, Tag, Divider, Empty } from '@nutui/nutui-react-taro';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from './Drawer';

const Index = () => {
  const { orderList } = useSelector((state) => state.sales);
  const dispatch = useDispatch();
  useEffect(() => {
    Taro.showLoading({ title: '获取订单中...', mask: true });
    dispatch({
      type: 'sales/getAllOrders',
      payload: {
        pageNum: 1,
        pageSize: 10,
      },
    });
    // eslint-disable-next-line global-require
  }, []);
  return (
    <View className="order">
      <View className="order-content">
        {orderList.length !== 0 ? (
          orderList.map((item) => (
            <View key={item.id} className="order-item">
              <View className="order-item-top">
                <View>
                  <Text>售后单号:{item.time}</Text>
                  <Tag
                    style={{ marginLeft: '5px' }}
                    color="#E9E9E9"
                    textColor="#999999"
                    onClick={() => {
                      wx.setClipboardData({
                        data: item.time,
                      });
                    }}
                  >
                    复制
                  </Tag>
                </View>
                <View>
                  <Text>{item.type}</Text>
                </View>
              </View>
              <View className="order-item-middle">
                <View className="order-item-middle-left">
                  <View className="order-item-middle-left-img">
                    <Image
                      mode="widthFix"
                      className="order-img"
                      // eslint-disable-next-line global-require
                      src={require('@/assets/images/home8.png')}
                    ></Image>
                  </View>
                  <View className="order-item-middle-left-name">
                    <Text
                      className="order-item-middle-left-name-text"
                      style={{ width: '80%', fontSize: 15 }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      className="order-item-middle-left-name-text"
                      style={{ width: '50%', fontSize: 10 }}
                    >
                      规格值,规格值
                    </Text>
                    <Tag style={{ width: 25 }} color="rgb(170, 170, 170)">
                      自营
                    </Tag>
                  </View>
                </View>
              </View>
              <View className="order-item-bold">
                <View>状态: {item.state}</View>
                <View>退款金额:￥{item.price}</View>
              </View>

              <Divider styles={{ color: '#efefef', marginTop: '10px', marginBottom: '10px' }} />
              <View className="order-item-bottom">
                <Button
                  shape="square"
                  plain
                  size="small"
                  type="default"
                  onClick={() => {
                    Taro.showModal({
                      title: '提示',
                      content: '确定取消售后吗？',
                      success: function (res) {
                        if (res.confirm) {
                          Taro.showLoading({ title: '取消中...', mask: true });
                          dispatch({
                            type: 'sales/cancelOrder',
                            payload: {
                              id: item.id,
                            },
                          });
                        }
                      },
                    });
                  }}
                >
                  取消售后
                </Button>
                <Button
                  shape="square"
                  plain
                  size="small"
                  type="default"
                  onClick={() => {
                    dispatch({
                      type: 'sales/update',
                      payload: {
                        visible: true,
                      },
                    });
                  }}
                >
                  绑定运单号
                </Button>
              </View>
              {/* 运单号弹窗 */}
              <Drawer />
            </View>
          ))
        ) : (
          <Empty description="无数据" />
        )}
      </View>
    </View>
  );
};
export default Index;
