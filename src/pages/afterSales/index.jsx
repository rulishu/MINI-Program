import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { Button, Tag, Divider, Empty, Icon } from '@nutui/nutui-react-taro';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from './Drawer';
import NavBar from '../../component/navBar';

const Index = () => {
  const { orderList } = useSelector((state) => state.sales);
  const [homeTopNavHeight, setHomeTopNavHeight] = useState(0);
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
    //获取顶部导航栏位置
    let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const { top, height } = menuButtonInfo;
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res;
        const margin = top - statusBarHeight;
        const navHeight = height + statusBarHeight + margin * 2;
        setHomeTopNavHeight(navHeight);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <View>
        <NavBar
          background="#ffffff"
          color="black"
          renderCenter={
            <View className="navbar-head">
              <View className="navbar-head-left">
                <Icon
                  size="18"
                  name="rect-left"
                  onTap={() => Taro.switchTab({ url: '/pages/my/index' })}
                />
              </View>
              <View className="navbar-head-right">
                <Text>售后</Text>
              </View>
            </View>
          }
        />
      </View>
      <View
        className="order"
        style={{
          position: 'fixed',
          left: 0,
          width: '100%',
          top: homeTopNavHeight,
        }}
      >
        {/* <ScrollView
        style={{ height: '100vh' }}
        scrollY
        scrollWithAnimation
        refresherEnabled
        lowerThreshold={50}
        onScrollToLower={() => updateFn({ pageNum: pageNum + 1 })}
        onRefresherRefresh={refesh}
      > */}
        <View className="order-content">
          {orderList.length !== 0 ? (
            orderList.map((item) => {
              // 订单收货类型
              let orderType;
              if (item.afterServiceType === 1) {
                orderType = '未发货仅退款';
              } else if (item.afterServiceType === 3) {
                orderType = '已发货仅退款';
              } else if (item.afterServiceType === 2) {
                orderType = '已发货退货退款';
              } else {
                orderType = '未知状态';
              }

              // 订单售后状态
              let orderState;

              if (item.status === -1) {
                orderState = '待审核';
              } else if (item.status === 3) {
                orderState = '退款中';
              } else if (item.status === 2 && !item?.returnOrderNumber) {
                orderState = '已拒绝售后';
              } else if (item.status === 6) {
                orderState = '已取消';
              } else if (item.status === 2 && item?.returnOrderNumber) {
                orderState = '商家已拒绝';
              } else if (item.status === 4) {
                orderState = '已退款';
              } else if (item.status === 1 && !item?.returnOrderNumber) {
                orderState = '待买家发货';
              } else if (item.status === 1 && item?.returnOrderNumber) {
                orderState = '待平台收货';
              }

              return (
                <View key={item.id} className="order-item">
                  <View className="order-item-top">
                    <View style={{ display: 'flex', width: '65%' }}>
                      <View className="order-item-top-text">
                        <Text>售后单号:{item.afterServiceCode}</Text>
                      </View>
                      <Tag
                        plain
                        style={{ marginLeft: '5px', height: '15px' }}
                        color="#A05635"
                        textColor="#A05635"
                        onClick={() => {
                          wx.setClipboardData({
                            data: item.returnOrderNumber,
                          });
                        }}
                      >
                        复制
                      </Tag>
                    </View>
                    <View style={{ color: '#A85230' }}>
                      <Text>{orderType}</Text>
                    </View>
                  </View>
                  {item.items.map((goodsItem) => (
                    <View key={goodsItem.id} className="order-item-middle">
                      <View className="order-item-middle-left">
                        <View className="order-item-middle-left-img">
                          <Image
                            mode="scaleToFill"
                            className="order-img"
                            // eslint-disable-next-line global-require
                            src={goodsItem.mainGraph}
                          ></Image>
                        </View>
                        <View className="order-item-middle-left-name">
                          <Text
                            className="order-item-middle-left-name-text"
                            style={{ width: '80%' }}
                          >
                            {goodsItem.itemName}
                          </Text>
                          <Text
                            className="order-item-middle-left-name-mes"
                            style={{ width: '80%' }}
                          >
                            {goodsItem.attributes.map((attributeItem) => {
                              let str = `${attributeItem.attributeName}:${attributeItem.value} `;
                              return str;
                            })}
                          </Text>
                          <View className="order-item-middle-left-name-tag">自营</View>
                        </View>
                      </View>
                      <View className="order-item-middle-right">
                        <View className="order-item-middle-right-num">
                          <Text>x{goodsItem.amount}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                  <View className="order-item-bold">
                    <View>
                      状态:<Text style={{ color: '#A85230' }}> {orderState}</Text>
                    </View>
                    <View>
                      退款金额:￥{item.items.reduce((total, obj) => total + obj.totalPrice, 0)}
                    </View>
                  </View>

                  <Divider styles={{ color: '#efefef', marginTop: '10px', marginBottom: '10px' }} />
                  <View className="order-item-bottom">
                    {item.status === 1 && item.status === 1 && !item?.returnOrderNumber ? (
                      <Button
                        shape="square"
                        className="bottom-btn"
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
                    ) : null}
                    {item.status === 1 && !item?.returnOrderNumber ? (
                      <Button
                        shape="square"
                        plain
                        className="bottom-btn"
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
                    ) : null}
                  </View>
                  {/* 运单号弹窗 */}
                  <Drawer id={item.id} />
                </View>
              );
            })
          ) : (
            <Empty style="background-color: #f2f2f2;" description="无数据" />
          )}
        </View>
        {/* </ScrollView> */}
      </View>
    </>
  );
};
export default Index;
